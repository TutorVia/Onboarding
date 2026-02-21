import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { Loader2, MessageCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export const SubjectQueryModal = ({ open, onOpenChange, subject = "" }) => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", query_type: "general", message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API}/subject-queries`, { ...form, subject });
      setSubmitted(true);
      toast.success("Query submitted! We'll get back to you shortly.");
      setForm({ name: "", email: "", phone: "", query_type: "general", message: "" });
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = (val) => {
    if (!val) { setSubmitted(false); setForm({ name: "", email: "", phone: "", query_type: "general", message: "" }); }
    onOpenChange(val);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[480px] bg-[#F9F8F6] border-[#E2E0D6]" data-testid="query-modal">
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl text-[#2C3333]">
            {submitted ? "Query Submitted!" : `Ask About ${subject}`}
          </DialogTitle>
          <DialogDescription className="text-[#6B7280]">
            {submitted ? "Our team will respond to your query within 24 hours." : "Have a question about this subject? Fill in your details and we'll help."}
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="flex flex-col items-center py-6 gap-3">
            <MessageCircle className="w-14 h-14 text-[#2F5D62]" />
            <p className="text-[#2C3333] font-medium">We'll respond within 24 hours.</p>
            <Button data-testid="query-close-btn" onClick={() => handleClose(false)} className="bg-[#2F5D62] hover:bg-[#23464A] text-white rounded-full mt-2">Close</Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4" data-testid="query-form">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-[#2C3333] text-sm">Full Name *</Label>
                <Input data-testid="query-name-input" placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="bg-white border-[#E2E0D6]" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[#2C3333] text-sm">Email *</Label>
                <Input data-testid="query-email-input" type="email" placeholder="you@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="bg-white border-[#E2E0D6]" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-[#2C3333] text-sm">Phone</Label>
              <Input data-testid="query-phone-input" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="bg-white border-[#E2E0D6]" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[#2C3333] text-sm">Query Type</Label>
              <Select defaultValue="general" onValueChange={(val) => setForm({ ...form, query_type: val })}>
                <SelectTrigger data-testid="query-type-select" className="bg-white border-[#E2E0D6]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General Question</SelectItem>
                  <SelectItem value="curriculum">Curriculum Details</SelectItem>
                  <SelectItem value="tutor">Tutor Matching</SelectItem>
                  <SelectItem value="pricing">Pricing Info</SelectItem>
                  <SelectItem value="demo">Book a Demo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-[#2C3333] text-sm">Your Question *</Label>
              <textarea data-testid="query-message-input" placeholder={`What would you like to know about ${subject}?`} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="flex min-h-[80px] w-full rounded-md border border-[#E2E0D6] bg-white px-3 py-2 text-sm placeholder:text-[#6B7280] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#2F5D62] resize-none" />
            </div>
            <Button data-testid="query-submit-btn" type="submit" disabled={loading} className="w-full bg-[#DF7861] hover:bg-[#C6604B] text-white rounded-full h-11 shadow-md hover:shadow-lg transition-all duration-300">
              {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              {loading ? "Submitting..." : "Submit Query"}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};
