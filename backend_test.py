import requests
import sys
import json
from datetime import datetime, timedelta

class LearnSphereAPITester:
    def __init__(self, base_url="https://lesson-master-8.preview.emergentagent.com/api"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def run_test(self, name, method, endpoint, expected_status, data=None, test_response_content=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}" if not endpoint.startswith('/') else f"{self.base_url}{endpoint}"
        headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)
            elif method == 'DELETE':
                response = requests.delete(url, headers=headers, timeout=10)
            elif method == 'PATCH':
                response = requests.patch(url, json=data, headers=headers, timeout=10)

            success = response.status_code == expected_status
            response_data = {}
            
            try:
                response_data = response.json() if response.text else {}
            except:
                response_data = {"raw_response": response.text[:200]}

            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                if test_response_content:
                    success = test_response_content(response_data)
                    if not success:
                        self.tests_passed -= 1
                        print(f"❌ Response content validation failed")
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"   Response: {response.text[:200]}")

            test_result = {
                "name": name,
                "method": method,
                "endpoint": endpoint,
                "expected_status": expected_status,
                "actual_status": response.status_code,
                "success": success,
                "response_data": response_data
            }
            self.test_results.append(test_result)
            
            return success, response_data

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            test_result = {
                "name": name,
                "method": method,
                "endpoint": endpoint,
                "expected_status": expected_status,
                "actual_status": "ERROR",
                "success": False,
                "error": str(e)
            }
            self.test_results.append(test_result)
            return False, {}

    def test_root_endpoint(self):
        """Test root API endpoint"""
        return self.run_test(
            "Root Endpoint",
            "GET",
            "/",
            200,
            test_response_content=lambda r: "message" in r and r["message"] == "Hello World"
        )

    def test_visitor_tracking(self):
        """Test visitor tracking endpoint"""
        session_id = f"test_session_{datetime.now().strftime('%H%M%S')}"
        
        # Test visit tracking
        visit_success, _ = self.run_test(
            "Visitor Track (Visit)",
            "POST",
            "/visitors/track",
            200,
            data={
                "session_id": session_id,
                "event_type": "visit",
                "page": "/",
                "user_agent": "Test Agent 1.0",
                "referrer": "https://google.com"
            },
            test_response_content=lambda r: r.get("status") == "tracked"
        )
        
        # Test leave tracking
        leave_success, _ = self.run_test(
            "Visitor Track (Leave)",
            "POST",
            "/visitors/track",
            200,
            data={
                "session_id": session_id,
                "event_type": "leave",
                "page": "/",
                "user_agent": "Test Agent 1.0",
                "referrer": ""
            },
            test_response_content=lambda r: r.get("status") == "tracked"
        )
        
        return visit_success and leave_success

    def test_demo_booking_flow(self):
        """Test complete demo booking CRUD flow"""
        # Create a demo booking
        test_booking = {
            "name": "Test Student",
            "email": f"test_{datetime.now().strftime('%H%M%S')}@example.com",
            "phone": "+1234567890",
            "grade_level": "Grade 9-10",
            "subject_interest": "Mathematics",
            "preferred_date": (datetime.now() + timedelta(days=7)).strftime("%Y-%m-%d"),
            "message": "This is a test booking"
        }
        
        # Test create booking
        create_success, create_response = self.run_test(
            "Create Demo Booking",
            "POST",
            "/demo-bookings",
            200,
            data=test_booking,
            test_response_content=lambda r: (
                "id" in r and 
                r["name"] == test_booking["name"] and
                r["email"] == test_booking["email"] and
                r["status"] == "pending"
            )
        )
        
        if not create_success or not create_response.get("id"):
            return False
            
        booking_id = create_response["id"]
        print(f"   Created booking with ID: {booking_id}")
        
        # Test get all bookings
        get_success, get_response = self.run_test(
            "Get All Demo Bookings",
            "GET",
            "/demo-bookings",
            200,
            test_response_content=lambda r: (
                isinstance(r, list) and
                len(r) > 0 and
                any(b["id"] == booking_id for b in r)
            )
        )
        
        # Test update booking status
        update_success, _ = self.run_test(
            "Update Booking Status",
            "PATCH",
            f"/demo-bookings/{booking_id}/status?status=confirmed",
            200,
            test_response_content=lambda r: r.get("message") == "Status updated"
        )
        
        # Test delete booking
        delete_success, _ = self.run_test(
            "Delete Demo Booking",
            "DELETE",
            f"/demo-bookings/{booking_id}",
            200,
            test_response_content=lambda r: r.get("message") == "Booking deleted"
        )
        
        return create_success and get_success and update_success and delete_success

    def test_admin_stats(self):
        """Test admin stats endpoint"""
        return self.run_test(
            "Admin Stats",
            "GET",
            "/admin/stats",
            200,
            test_response_content=lambda r: (
                "total_bookings" in r and
                "pending_bookings" in r and
                "total_visits" in r and
                "total_leaves" in r and
                "total_queries" in r and
                "total_contacts" in r and
                isinstance(r["total_bookings"], int) and
                isinstance(r["pending_bookings"], int) and
                isinstance(r["total_visits"], int) and
                isinstance(r["total_leaves"], int) and
                isinstance(r["total_queries"], int) and
                isinstance(r["total_contacts"], int)
            )
        )

    def test_subject_query_flow(self):
        """Test subject query creation"""
        test_query = {
            "name": "Test Student",
            "email": f"query_test_{datetime.now().strftime('%H%M%S')}@example.com",
            "phone": "+1234567890",
            "subject": "Mathematics",
            "query_type": "curriculum",
            "message": "What topics are covered in Grade 10 Mathematics?"
        }
        
        create_success, create_response = self.run_test(
            "Create Subject Query",
            "POST",
            "/subject-queries",
            200,
            data=test_query,
            test_response_content=lambda r: (
                "id" in r and
                r["name"] == test_query["name"] and
                r["subject"] == test_query["subject"]
            )
        )
        
        # Test get all queries
        get_success, _ = self.run_test(
            "Get Subject Queries",
            "GET",
            "/subject-queries",
            200,
            test_response_content=lambda r: isinstance(r, list)
        )
        
        return create_success and get_success

    def test_contact_message_flow(self):
        """Test contact message creation"""
        test_contact = {
            "name": "Test Contact",
            "email": f"contact_test_{datetime.now().strftime('%H%M%S')}@example.com",
            "phone": "+1234567890",
            "message": "I have a question about your tutoring services."
        }
        
        create_success, create_response = self.run_test(
            "Create Contact Message",
            "POST",
            "/contact-messages",
            200,
            data=test_contact,
            test_response_content=lambda r: (
                "status" in r and 
                r["status"] == "sent" and
                "id" in r
            )
        )
        
        get_success, _ = self.run_test(
            "Get Contact Messages",
            "GET",
            "/contact-messages",
            200,
            test_response_content=lambda r: isinstance(r, list)
        )
        
        return create_success and get_success

    def test_whatsapp_config(self):
        """Test WhatsApp configuration endpoint"""
        return self.run_test(
            "WhatsApp Config",
            "GET",
            "/whatsapp-config",
            200,
            test_response_content=lambda r: (
                "whatsapp_number" in r and
                r["whatsapp_number"] == "917009201851"
            )
        )

def main():
    print("🚀 Starting LearnSphere Backend API Tests")
    print("=" * 50)
    
    tester = LearnSphereAPITester()
    
    # Run all tests
    print("\n📍 Testing Basic Connectivity...")
    tester.test_root_endpoint()
    
    print("\n📊 Testing Visitor Tracking...")
    tester.test_visitor_tracking()
    
    print("\n📋 Testing Demo Booking Flow...")
    tester.test_demo_booking_flow()
    
    print("\n❓ Testing Subject Query Flow...")
    tester.test_subject_query_flow()
    
    print("\n📧 Testing Contact Message Flow...")
    tester.test_contact_message_flow()
    
    print("\n📱 Testing WhatsApp Config...")
    tester.test_whatsapp_config()
    
    print("\n📈 Testing Admin Stats...")
    tester.test_admin_stats()
    
    # Print final results
    print("\n" + "=" * 50)
    print(f"📊 Final Results: {tester.tests_passed}/{tester.tests_run} tests passed")
    
    if tester.tests_passed == tester.tests_run:
        print("🎉 All backend tests passed!")
        return 0
    else:
        print("❌ Some backend tests failed!")
        print("\nFailed tests:")
        for result in tester.test_results:
            if not result["success"]:
                print(f"  - {result['name']}: {result.get('error', 'Status code mismatch')}")
        return 1

if __name__ == "__main__":
    sys.exit(main())