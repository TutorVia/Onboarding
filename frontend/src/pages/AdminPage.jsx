import { useState, useEffect } from "react";
import axios from "axios";
import { ArrowLeft, Users, CalendarDays, Eye, Clock, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function AdminPage() {
  const [stats, setStats] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [statsRes, bookingsRes] = await Promise.all([
        axios.get(`${API}/admin/stats`),
        axios.get(`${API}/demo-bookings`),
      ]);
      setStats(statsRes.data);
      setBookings(bookingsRes.data);
    } catch {
      toast.error("Failed to load admin data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/demo-bookings/${id}`);
      toast.success("Booking deleted");
      fetchData();
    } catch {
      toast.error("Failed to delete booking");
    }
  };

  const statCards = stats ? [
    { label: "Total Bookings", value: stats.total_bookings, icon: CalendarDays, color: "bg-[#2F5D62]" },
    { label: "Pending", value: stats.pending_bookings, icon: Clock, color: "bg-[#DF7861]" },
    { label: "Total Visits", value: stats.total_visits, icon: Eye, color: "bg-[#ECB390]" },
    { label: "Visitors Left", value: stats.total_leaves, icon: Users, color: "bg-[#6B7280]" },
  ] : [];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F9F8F6] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#2F5D62]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F8F6]" data-testid="admin-page">
      {/* Header */}
      <div className="bg-white border-b border-[#E2E0D6]">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              data-testid="admin-back-btn"
              variant="ghost"
              size="icon"
              onClick={() => window.location.href = "/"}
              className="text-[#2C3333] hover:bg-[#ECEBE4]"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="font-heading text-xl font-bold text-[#2C3333]">Admin Dashboard</h1>
              <p className="text-xs text-[#6B7280]">Demo bookings & visitor analytics</p>
            </div>
          </div>
          <Button
            data-testid="admin-refresh-btn"
            variant="outline"
            size="sm"
            onClick={fetchData}
            className="border-[#E2E0D6] text-[#2C3333]"
          >
            Refresh
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8" data-testid="admin-stats-grid">
          {statCards.map((card) => (
            <div
              key={card.label}
              data-testid={`admin-stat-${card.label.toLowerCase().replace(/\s/g, "-")}`}
              className="bg-white rounded-2xl p-5 border border-[#E2E0D6]/50 shadow-[0_2px_10px_rgb(0,0,0,0.02)]"
            >
              <div className={`w-10 h-10 ${card.color} rounded-xl flex items-center justify-center mb-3`}>
                <card.icon className="w-5 h-5 text-white" />
              </div>
              <p className="font-heading text-2xl font-bold text-[#2C3333]">{card.value}</p>
              <p className="text-sm text-[#6B7280] mt-0.5">{card.label}</p>
            </div>
          ))}
        </div>

        {/* Bookings Table */}
        <div className="bg-white rounded-2xl border border-[#E2E0D6]/50 shadow-[0_2px_10px_rgb(0,0,0,0.02)] overflow-hidden" data-testid="admin-bookings-table">
          <div className="p-5 border-b border-[#E2E0D6]/50">
            <h2 className="font-heading font-semibold text-[#2C3333] text-lg">Demo Bookings</h2>
            <p className="text-sm text-[#6B7280]">{bookings.length} total bookings</p>
          </div>

          {bookings.length === 0 ? (
            <div className="p-12 text-center">
              <CalendarDays className="w-12 h-12 text-[#E2E0D6] mx-auto mb-3" />
              <p className="text-[#6B7280]">No demo bookings yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-[#F9F8F6]/50">
                    <TableHead className="font-heading text-[#2C3333]">Name</TableHead>
                    <TableHead className="font-heading text-[#2C3333]">Email</TableHead>
                    <TableHead className="font-heading text-[#2C3333]">Phone</TableHead>
                    <TableHead className="font-heading text-[#2C3333]">Grade</TableHead>
                    <TableHead className="font-heading text-[#2C3333]">Subject</TableHead>
                    <TableHead className="font-heading text-[#2C3333]">Date</TableHead>
                    <TableHead className="font-heading text-[#2C3333]">Status</TableHead>
                    <TableHead className="font-heading text-[#2C3333]">Booked At</TableHead>
                    <TableHead className="font-heading text-[#2C3333]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookings.map((b) => (
                    <TableRow key={b.id} data-testid={`booking-row-${b.id}`}>
                      <TableCell className="font-medium text-[#2C3333]">{b.name}</TableCell>
                      <TableCell className="text-[#6B7280]">{b.email}</TableCell>
                      <TableCell className="text-[#6B7280]">{b.phone}</TableCell>
                      <TableCell className="text-[#6B7280]">{b.grade_level}</TableCell>
                      <TableCell className="text-[#6B7280]">{b.subject_interest}</TableCell>
                      <TableCell className="text-[#6B7280]">{b.preferred_date}</TableCell>
                      <TableCell>
                        <Badge className={b.status === "pending" ? "bg-[#ECB390]/20 text-[#2C3333] border-[#ECB390]/30" : "bg-[#2F5D62]/10 text-[#2F5D62]"}>
                          {b.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-[#6B7280] text-xs">
                        {new Date(b.created_at).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Button
                          data-testid={`delete-booking-${b.id}`}
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(b.id)}
                          className="text-red-400 hover:text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
