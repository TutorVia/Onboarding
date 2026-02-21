import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { toast } from "sonner";
import axios from "axios";
import { CalendarDays, CheckCircle2, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const demoSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(5, "Please enter a valid phone number"),
  grade_level: z.string().min(1, "Please select your grade level"),
  subject_interest: z.string().min(1, "Please select a subject"),
  preferred_date: z.string().min(1, "Please select a preferred date"),
  message: z.string().optional(),
});

const gradeOptions = [
  "Grade 1-5", "Grade 6-8", "Grade 9-10", "Grade 11-12", "College", "Competitive Exams", "Other"
];
const subjectOptions = [
  "Mathematics", "Physics", "Chemistry", "Biology", "English", "Computer Science", "History", "Music", "Other"
];

export const DemoModal = ({ open, onOpenChange }) => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [calendarOpen, setCalendarOpen] = useState(false);

  const { register, handleSubmit, setValue, formState: { errors }, reset, watch } = useForm({
    resolver: zodResolver(demoSchema),
    defaultValues: { name: "", email: "", phone: "", grade_level: "", subject_interest: "", preferred_date: "", message: "" },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await axios.post(`${API}/demo-bookings`, data);
      setSubmitted(true);
      toast.success("Demo booked successfully! We'll reach out shortly.");
      reset();
      setSelectedDate(null);
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = (val) => {
    if (!val) {
      setSubmitted(false);
      reset();
      setSelectedDate(null);
    }
    onOpenChange(val);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] bg-[#F9F8F6] border-[#E2E0D6]" data-testid="demo-modal">
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl text-[#2C3333]">
            {submitted ? "You're All Set!" : "Book Your Free Demo"}
          </DialogTitle>
          <DialogDescription className="text-[#6B7280]">
            {submitted
              ? "Thank you for your interest. Our team will contact you shortly."
              : "Fill in your details and we'll set up a personalized learning session for you."}
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="flex flex-col items-center py-8 gap-4" data-testid="demo-success">
            <CheckCircle2 className="w-16 h-16 text-[#2F5D62]" />
            <p className="text-center text-[#2C3333] font-medium">We received your booking request!</p>
            <Button
              data-testid="demo-close-btn"
              onClick={() => handleClose(false)}
              className="bg-[#2F5D62] hover:bg-[#23464A] text-white rounded-full mt-2"
            >
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" data-testid="demo-form">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="name" className="text-[#2C3333] text-sm">Full Name *</Label>
                <Input id="name" data-testid="demo-name-input" placeholder="John Doe" {...register("name")} className="bg-white border-[#E2E0D6] focus-visible:ring-[#2F5D62]" />
                {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-[#2C3333] text-sm">Email *</Label>
                <Input id="email" data-testid="demo-email-input" type="email" placeholder="john@example.com" {...register("email")} className="bg-white border-[#E2E0D6] focus-visible:ring-[#2F5D62]" />
                {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="phone" className="text-[#2C3333] text-sm">Phone Number *</Label>
              <Input id="phone" data-testid="demo-phone-input" placeholder="+1 234 567 8900" {...register("phone")} className="bg-white border-[#E2E0D6] focus-visible:ring-[#2F5D62]" />
              {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-[#2C3333] text-sm">Grade Level *</Label>
                <Select onValueChange={(val) => setValue("grade_level", val, { shouldValidate: true })}>
                  <SelectTrigger data-testid="demo-grade-select" className="bg-white border-[#E2E0D6]">
                    <SelectValue placeholder="Select grade" />
                  </SelectTrigger>
                  <SelectContent>
                    {gradeOptions.map((g) => (
                      <SelectItem key={g} value={g}>{g}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.grade_level && <p className="text-xs text-red-500">{errors.grade_level.message}</p>}
              </div>
              <div className="space-y-1.5">
                <Label className="text-[#2C3333] text-sm">Subject *</Label>
                <Select onValueChange={(val) => setValue("subject_interest", val, { shouldValidate: true })}>
                  <SelectTrigger data-testid="demo-subject-select" className="bg-white border-[#E2E0D6]">
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjectOptions.map((s) => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.subject_interest && <p className="text-xs text-red-500">{errors.subject_interest.message}</p>}
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-[#2C3333] text-sm">Preferred Date *</Label>
              <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button
                    data-testid="demo-date-trigger"
                    variant="outline"
                    className={`w-full justify-start text-left font-normal bg-white border-[#E2E0D6] ${!selectedDate ? "text-[#6B7280]" : "text-[#2C3333]"}`}
                  >
                    <CalendarDays className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    data-testid="demo-calendar"
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => {
                      setSelectedDate(date);
                      setValue("preferred_date", date ? format(date, "yyyy-MM-dd") : "", { shouldValidate: true });
                      setCalendarOpen(false);
                    }}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {errors.preferred_date && <p className="text-xs text-red-500">{errors.preferred_date.message}</p>}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="message" className="text-[#2C3333] text-sm">Message (Optional)</Label>
              <textarea
                id="message"
                data-testid="demo-message-input"
                {...register("message")}
                placeholder="Any specific topics or goals you'd like to discuss?"
                className="flex min-h-[80px] w-full rounded-md border border-[#E2E0D6] bg-white px-3 py-2 text-sm placeholder:text-[#6B7280] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#2F5D62] resize-none"
              />
            </div>

            <Button
              data-testid="demo-submit-btn"
              type="submit"
              disabled={loading}
              className="w-full bg-[#2F5D62] hover:bg-[#23464A] text-white rounded-full h-11 shadow-md hover:shadow-lg transition-all duration-300"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              {loading ? "Booking..." : "Book My Free Demo"}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};
