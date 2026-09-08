"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Squircle } from "@squircle-js/react";
import { useDemoStore } from "@/store/demo-store";
import type { AgendaItem, SpeakerItem, SponsorItem, RegistrationFormField } from "@/types";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Plus,
  Trash2,
  Calendar,
  Clock,
  MapPin,
  Upload,
  Globe,
  Users,
  ShieldCheck,
  FileText,
  Eye,
  HelpCircle,
} from "lucide-react";

export default function CreateEventMultiStepPage() {
  const router = useRouter();
  const createEvent = useDemoStore((s) => s.createEvent);

  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState<"submitted" | "draft" | null>(null);

  // Step 1: Basic Information
  const [title, setTitle] = useState("AI & Quantum Computing Symposium");
  const [category, setCategory] = useState("Conference");
  const [startDate, setStartDate] = useState("2026-11-10");
  const [endDate, setEndDate] = useState("2026-11-10");
  const [startTime, setStartTime] = useState("09:30 AM");
  const [endTime, setEndTime] = useState("05:30 PM");
  const [venue, setVenue] = useState("Main Auditorium, Block C");
  const [eventMode, setEventMode] = useState<"Online" | "Offline">("Offline");
  const [description, setDescription] = useState("A premier gathering on transformative AI technologies and quantum algorithms.");
  const [about, setAbout] = useState("Join researchers, developers, and industry architects for deep-dive technical explorations into autonomous intelligence and quantum computing frameworks.");
  const [bannerUrl, setBannerUrl] = useState("https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&auto=format&fit=crop&q=80");
  const [capacity, setCapacity] = useState(250);

  // Step 2: Agenda
  const [agenda, setAgenda] = useState<AgendaItem[]>([
    { id: "1", time: "09:30 AM", sessionTitle: "Inaugural Keynote & Dean's Welcome", description: "Welcome address and vision for university DeepTech research.", displayOrder: 1 },
    { id: "2", time: "11:30 AM", sessionTitle: "Masterclass: Quantum Error Mitigation", description: "Hands-on session using Qiskit runtime primitives.", displayOrder: 2 },
  ]);
  const [newAgendaTime, setNewAgendaTime] = useState("");
  const [newAgendaTitle, setNewAgendaTitle] = useState("");
  const [newAgendaDesc, setNewAgendaDesc] = useState("");

  // Step 3: Speakers
  const [speakers, setSpeakers] = useState<SpeakerItem[]>([
    { id: "1", name: "Dr. Vikram Sethi", designation: "Distinguished Scientist", organization: "Quantum AI Labs", bio: "Author of 40+ quantum computing papers.", photoUrl: null, linkedinUrl: "https://linkedin.com", displayOrder: 1 },
  ]);
  const [newSpeakerName, setNewSpeakerName] = useState("");
  const [newSpeakerDesig, setNewSpeakerDesig] = useState("");
  const [newSpeakerOrg, setNewSpeakerOrg] = useState("");
  const [newSpeakerBio, setNewSpeakerBio] = useState("");
  const [newSpeakerLinkedin, setNewSpeakerLinkedin] = useState("");

  // Step 4: Sponsors
  const [sponsors, setSponsors] = useState<SponsorItem[]>([
    { id: "1", name: "Apex Technologies", logoUrl: null, description: "Official hardware compute sponsor", websiteUrl: "https://apex.example.com", sponsorshipLevel: "Platinum", displayOrder: 1 },
  ]);
  const [newSponsorName, setNewSponsorName] = useState("");
  const [newSponsorDesc, setNewSponsorDesc] = useState("");
  const [newSponsorWebsite, setNewSponsorWebsite] = useState("");
  const [newSponsorLevel, setNewSponsorLevel] = useState("Gold");

  // Step 5: Registration Form Catalog
  const [registrationFields, setRegistrationFields] = useState<RegistrationFormField[]>([
    { id: "f-1", label: "First Name", fieldType: "text", required: true, isSystem: true, displayOrder: 1 },
    { id: "f-2", label: "Last Name", fieldType: "text", required: true, isSystem: true, displayOrder: 2 },
    { id: "f-3", label: "University Email", fieldType: "email", required: true, isSystem: true, displayOrder: 3 },
    { id: "f-4", label: "University ID", fieldType: "text", required: true, isSystem: true, displayOrder: 4 },
    { id: "f-5", label: "Department", fieldType: "select", required: true, isSystem: false, options: ["CSE", "IT", "ECE", "ME", "Other"], displayOrder: 5 },
    { id: "f-6", label: "GitHub Profile / Portfolio Link", fieldType: "text", required: false, isSystem: false, displayOrder: 6 },
  ]);
  const [newCustomLabel, setNewCustomLabel] = useState("");
  const [newCustomType, setNewCustomType] = useState<"text" | "select" | "textarea">("text");
  const [showFormPreview, setShowFormPreview] = useState(false);

  // Add Agenda Item
  const handleAddAgenda = () => {
    if (!newAgendaTitle || !newAgendaTime) return;
    setAgenda([
      ...agenda,
      {
        id: String(Date.now()),
        time: newAgendaTime,
        sessionTitle: newAgendaTitle,
        description: newAgendaDesc || null,
        displayOrder: agenda.length + 1,
      },
    ]);
    setNewAgendaTime("");
    setNewAgendaTitle("");
    setNewAgendaDesc("");
  };

  // Add Speaker Item
  const handleAddSpeaker = () => {
    if (!newSpeakerName) return;
    setSpeakers([
      ...speakers,
      {
        id: String(Date.now()),
        name: newSpeakerName,
        designation: newSpeakerDesig || null,
        organization: newSpeakerOrg || null,
        bio: newSpeakerBio || null,
        photoUrl: null,
        linkedinUrl: newSpeakerLinkedin || null,
        displayOrder: speakers.length + 1,
      },
    ]);
    setNewSpeakerName("");
    setNewSpeakerDesig("");
    setNewSpeakerOrg("");
    setNewSpeakerBio("");
    setNewSpeakerLinkedin("");
  };

  // Add Sponsor Item
  const handleAddSponsor = () => {
    if (!newSponsorName) return;
    setSponsors([
      ...sponsors,
      {
        id: String(Date.now()),
        name: newSponsorName,
        logoUrl: null,
        description: newSponsorDesc || null,
        websiteUrl: newSponsorWebsite || null,
        sponsorshipLevel: newSponsorLevel,
        displayOrder: sponsors.length + 1,
      },
    ]);
    setNewSponsorName("");
    setNewSponsorDesc("");
    setNewSponsorWebsite("");
  };

  // Add Custom Form Field
  const handleAddCustomField = () => {
    if (!newCustomLabel) return;
    setRegistrationFields([
      ...registrationFields,
      {
        id: `f-${Date.now()}`,
        label: newCustomLabel,
        fieldType: newCustomType,
        required: false,
        isSystem: false,
        displayOrder: registrationFields.length + 1,
      },
    ]);
    setNewCustomLabel("");
  };

  const handleToggleFieldRequired = (id: string) => {
    setRegistrationFields(
      registrationFields.map((f) =>
        f.id === id ? { ...f, required: !f.required } : f,
      ),
    );
  };

  const handleDeleteField = (id: string) => {
    setRegistrationFields(registrationFields.filter((f) => f.id !== id));
  };

  // Submit / Save Draft
  const handleFinish = (isDraft: boolean) => {
    createEvent(
      {
        title,
        description,
        about,
        aboutEvent: about,
        eventCategory: category,
        category,
        startDate,
        endDate,
        startTime,
        endTime,
        venue,
        eventMode,
        bannerUrl,
        capacity,
        agenda,
        speakers,
        sponsors,
        registrationFields,
      },
      isDraft,
    );
    setShowSuccess(isDraft ? "draft" : "submitted");
  };

  const glassStyle = {
    background: "hsl(0 0% 96% / 0.42)",
    backdropFilter: "blur(24px) saturate(1.4)",
    WebkitBackdropFilter: "blur(24px) saturate(1.4)",
    boxShadow: "0 2px 20px var(--shadow), inset 0 1px 0 hsl(0 0% 100% / 0.6)",
  };

  const inputClass =
    "w-full px-4 py-2.5 text-[0.84rem] text-[var(--col-primary)] font-[family-name:var(--font-ui)] outline-none bg-white/60 border border-black/10 rounded-xl focus:border-[var(--accent)] transition-all";

  const labelClass =
    "block text-[0.66rem] uppercase tracking-[0.14em] text-[var(--col-dim)] font-[family-name:var(--font-mono)] mb-1.5 font-medium";

  const stepLabels = [
    { num: 1, label: "Basic Info", screen: "Screen 07" },
    { num: 2, label: "Agenda", screen: "Screen 08" },
    { num: 3, label: "Speakers", screen: "Screen 09" },
    { num: 4, label: "Sponsors", screen: "Screen 10" },
    { num: 5, label: "Registration Form", screen: "Screen 11" },
    { num: 6, label: "Review & Submit", screen: "Screen 12" },
  ];

  return (
    <div className="max-w-[1020px] mx-auto pb-16">
      {/* Header */}
      <div className="mb-6">
        <Link
          href="/admin/events"
          className="inline-flex items-center gap-2 text-[0.78rem] text-[var(--col-secondary)] hover:text-[var(--col-primary)] transition-colors duration-200 font-[family-name:var(--font-ui)] mb-3"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to My Events
        </Link>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-[clamp(1.5rem,3vw,2rem)] font-bold tracking-[-0.03em] leading-[1.1] text-[var(--col-primary)] font-[family-name:var(--font-display)]">
              Create Event
              <span className="text-[var(--accent)] font-[family-name:var(--font-cursive)] font-normal text-[0.7em]"> .</span>
            </h1>
            <p className="mt-1.5 text-[0.84rem] text-[var(--col-secondary)] font-[family-name:var(--font-ui)]">
              Follow the 6-step builder to configure and submit your event for Super Admin approval.
            </p>
          </div>
          <span className="text-xs font-mono font-semibold px-3 py-1 rounded-full bg-black/5 text-[var(--col-dim)]">
            Step {currentStep} of 6
          </span>
        </div>
      </div>

      {/* Stepper Wizard Bar */}
      <div className="mb-8 overflow-x-auto pb-2">
        <div className="flex items-center gap-2 min-w-[680px]">
          {stepLabels.map((s, idx) => {
            const isCompleted = currentStep > s.num;
            const isCurrent = currentStep === s.num;
            return (
              <div key={s.num} className="flex-1 flex items-center">
                <button
                  onClick={() => setCurrentStep(s.num)}
                  className={`w-full flex items-center gap-2.5 p-2 rounded-xl transition-all text-left ${
                    isCurrent
                      ? "bg-[var(--col-primary)] text-[var(--bg)] shadow-md"
                      : isCompleted
                        ? "bg-white/70 text-[var(--col-primary)] hover:bg-white"
                        : "bg-black/5 text-[var(--col-dim)] opacity-60 hover:opacity-100"
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-lg flex items-center justify-center text-[0.68rem] font-bold font-mono ${
                      isCurrent
                        ? "bg-[var(--accent)] text-white"
                        : isCompleted
                          ? "bg-[hsl(142,50%,35%)] text-white"
                          : "bg-black/10 text-[var(--col-secondary)]"
                    }`}
                  >
                    {isCompleted ? "✓" : s.num}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[0.6rem] uppercase tracking-wider font-mono opacity-75 leading-tight">{s.screen}</p>
                    <p className="text-[0.76rem] font-semibold truncate leading-tight">{s.label}</p>
                  </div>
                </button>
                {idx < stepLabels.length - 1 && (
                  <div className="w-3 h-px bg-black/10 mx-1 flex-shrink-0" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* STEP CONTENT CONTAINER */}
      <div>
        {/* ================= STEP 1: BASIC INFORMATION (Screen 07) ================= */}
        {currentStep === 1 && (
          <Squircle cornerRadius={24} cornerSmoothing={1} className="p-7 space-y-6" style={glassStyle}>
            <div className="border-b border-black/5 pb-4">
              <p className="text-[0.65rem] uppercase tracking-[0.16em] text-[var(--col-dim)] font-mono">Screen 07</p>
              <h2 className="text-lg font-bold text-[var(--col-primary)] font-[family-name:var(--font-display)]">
                Step 1: Basic Information
              </h2>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className={labelClass}>Event Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Annual Tech Symposium 2026"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Event Category *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className={`${inputClass} cursor-pointer`}
                >
                  <option value="Conference">Conference</option>
                  <option value="Workshop">Workshop</option>
                  <option value="Competition">Competition</option>
                  <option value="Career">Career & Placement</option>
                  <option value="Cultural">Cultural</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>Event Mode *</label>
                <div className="flex gap-3 pt-1">
                  {(["Offline", "Online"] as const).map((mode) => (
                    <button
                      type="button"
                      key={mode}
                      onClick={() => setEventMode(mode)}
                      className={`flex-1 py-2 text-xs font-semibold rounded-xl border transition-all ${
                        eventMode === mode
                          ? "bg-[var(--col-primary)] text-white border-[var(--col-primary)]"
                          : "bg-white/50 text-[var(--col-secondary)] border-black/10 hover:bg-white"
                      }`}
                    >
                      {mode} Event
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className={labelClass}>Start Date *</label>
                <input
                  type="date"
                  required
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>End Date *</label>
                <input
                  type="date"
                  required
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Start Time *</label>
                <input
                  type="text"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  placeholder="e.g. 09:30 AM"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>End Time *</label>
                <input
                  type="text"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  placeholder="e.g. 05:30 PM"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Venue / Location *</label>
                <input
                  type="text"
                  required
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                  placeholder="e.g. Main Auditorium, Block C"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Capacity (Attendees) *</label>
                <input
                  type="number"
                  required
                  value={capacity}
                  onChange={(e) => setCapacity(Number(e.target.value))}
                  placeholder="e.g. 250"
                  className={inputClass}
                />
              </div>

              <div className="md:col-span-2">
                <label className={labelClass}>Short Description *</label>
                <textarea
                  rows={2}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="A concise summary of the event (1-2 sentences)..."
                  className={inputClass}
                />
              </div>

              <div className="md:col-span-2">
                <label className={labelClass}>Detailed About Event</label>
                <textarea
                  rows={4}
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  placeholder="Comprehensive event details, objectives, themes, and what attendees will learn..."
                  className={inputClass}
                />
              </div>

              <div className="md:col-span-2">
                <label className={labelClass}>Banner Image (Cloud URL / Upload)</label>
                <div className="flex gap-3 items-center">
                  <input
                    type="url"
                    value={bannerUrl}
                    onChange={(e) => setBannerUrl(e.target.value)}
                    placeholder="https://..."
                    className={inputClass}
                  />
                  <label className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-dashed border-black/20 bg-white/50 text-xs font-semibold text-[var(--col-secondary)] cursor-pointer hover:bg-white whitespace-nowrap">
                    <Upload className="w-3.5 h-3.5" />
                    Browse
                    <input type="file" className="hidden" />
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <Squircle
                cornerRadius={14}
                cornerSmoothing={1}
                className="inline-flex items-center gap-2 text-[0.82rem] font-medium tracking-[0.02em] px-6 py-2.5 bg-[var(--col-primary)] text-[var(--bg)] transition-all hover:opacity-85 cursor-pointer"
                asChild
              >
                <button type="button" onClick={() => setCurrentStep(2)}>
                  Next: Agenda
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </Squircle>
            </div>
          </Squircle>
        )}

        {/* ================= STEP 2: AGENDA (Screen 08) ================= */}
        {currentStep === 2 && (
          <Squircle cornerRadius={24} cornerSmoothing={1} className="p-7 space-y-6" style={glassStyle}>
            <div className="border-b border-black/5 pb-4 flex items-center justify-between">
              <div>
                <p className="text-[0.65rem] uppercase tracking-[0.16em] text-[var(--col-dim)] font-mono">Screen 08</p>
                <h2 className="text-lg font-bold text-[var(--col-primary)] font-[family-name:var(--font-display)]">
                  Step 2: Agenda & Schedule
                </h2>
              </div>
              <span className="text-xs text-[var(--col-dim)]">{agenda.length} Sessions</span>
            </div>

            {/* List of current agenda items */}
            <div className="space-y-3">
              {agenda.map((item, idx) => (
                <div
                  key={item.id}
                  className="p-4 rounded-xl bg-white/70 border border-black/5 flex items-start justify-between gap-4"
                >
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-md bg-[var(--accent)]/15 text-[var(--accent)] text-xs font-bold font-mono flex items-center justify-center flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-semibold text-[var(--accent)]">{item.time}</span>
                        <h4 className="text-sm font-semibold text-[var(--col-primary)]">{item.sessionTitle}</h4>
                      </div>
                      {item.description && (
                        <p className="text-xs text-[var(--col-secondary)] mt-1">{item.description}</p>
                      )}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setAgenda(agenda.filter((a) => a.id !== item.id))}
                    className="text-red-500 hover:text-red-700 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add Agenda Item Sub-form */}
            <div className="p-5 rounded-2xl bg-white/50 border border-black/10 space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-[var(--col-primary)]">Add Agenda Session</p>
              <div className="grid gap-3 sm:grid-cols-3">
                <div>
                  <label className={labelClass}>Time *</label>
                  <input
                    type="text"
                    value={newAgendaTime}
                    onChange={(e) => setNewAgendaTime(e.target.value)}
                    placeholder="e.g. 02:00 PM"
                    className={inputClass}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelClass}>Session Title *</label>
                  <input
                    type="text"
                    value={newAgendaTitle}
                    onChange={(e) => setNewAgendaTitle(e.target.value)}
                    placeholder="e.g. AI Architecture Workshop"
                    className={inputClass}
                  />
                </div>
                <div className="sm:col-span-3">
                  <label className={labelClass}>Description (Optional)</label>
                  <input
                    type="text"
                    value={newAgendaDesc}
                    onChange={(e) => setNewAgendaDesc(e.target.value)}
                    placeholder="Brief description of topics covered..."
                    className={inputClass}
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={handleAddAgenda}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-black/5 hover:bg-black/10 rounded-xl text-xs font-semibold text-[var(--col-primary)]"
              >
                <Plus className="w-3 h-3" />
                Add Agenda Item
              </button>
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="px-5 py-2.5 text-xs font-semibold rounded-xl bg-white/60 border border-black/10 text-[var(--col-secondary)] hover:bg-white"
              >
                Back
              </button>
              <Squircle
                cornerRadius={14}
                cornerSmoothing={1}
                className="inline-flex items-center gap-2 text-[0.82rem] font-medium tracking-[0.02em] px-6 py-2.5 bg-[var(--col-primary)] text-[var(--bg)] transition-all hover:opacity-85 cursor-pointer"
                asChild
              >
                <button type="button" onClick={() => setCurrentStep(3)}>
                  Next: Speakers
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </Squircle>
            </div>
          </Squircle>
        )}

        {/* ================= STEP 3: SPEAKERS (Screen 09) ================= */}
        {currentStep === 3 && (
          <Squircle cornerRadius={24} cornerSmoothing={1} className="p-7 space-y-6" style={glassStyle}>
            <div className="border-b border-black/5 pb-4 flex items-center justify-between">
              <div>
                <p className="text-[0.65rem] uppercase tracking-[0.16em] text-[var(--col-dim)] font-mono">Screen 09</p>
                <h2 className="text-lg font-bold text-[var(--col-primary)] font-[family-name:var(--font-display)]">
                  Step 3: Speakers & Guests
                </h2>
              </div>
              <span className="text-xs text-[var(--col-dim)]">{speakers.length} Speakers</span>
            </div>

            {/* List of speakers */}
            <div className="grid gap-3 sm:grid-cols-2">
              {speakers.map((sp) => (
                <div
                  key={sp.id}
                  className="p-4 rounded-xl bg-white/70 border border-black/5 flex items-start justify-between gap-3"
                >
                  <div>
                    <h4 className="text-sm font-semibold text-[var(--col-primary)]">{sp.name}</h4>
                    <p className="text-xs text-[var(--accent)] font-medium">{sp.designation} &middot; {sp.organization}</p>
                    {sp.bio && <p className="text-xs text-[var(--col-secondary)] mt-1.5 line-clamp-2">{sp.bio}</p>}
                  </div>
                  <button
                    type="button"
                    onClick={() => setSpeakers(speakers.filter((s) => s.id !== sp.id))}
                    className="text-red-500 hover:text-red-700 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add Speaker Form */}
            <div className="p-5 rounded-2xl bg-white/50 border border-black/10 space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-[var(--col-primary)]">Add Speaker / Guest</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>Name *</label>
                  <input
                    type="text"
                    value={newSpeakerName}
                    onChange={(e) => setNewSpeakerName(e.target.value)}
                    placeholder="e.g. Dr. Ananya Krishnan"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Designation</label>
                  <input
                    type="text"
                    value={newSpeakerDesig}
                    onChange={(e) => setNewSpeakerDesig(e.target.value)}
                    placeholder="e.g. Staff Research Scientist"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Organization</label>
                  <input
                    type="text"
                    value={newSpeakerOrg}
                    onChange={(e) => setNewSpeakerOrg(e.target.value)}
                    placeholder="e.g. Google DeepMind"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>LinkedIn URL</label>
                  <input
                    type="url"
                    value={newSpeakerLinkedin}
                    onChange={(e) => setNewSpeakerLinkedin(e.target.value)}
                    placeholder="https://linkedin.com/in/..."
                    className={inputClass}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelClass}>Bio / Profile</label>
                  <textarea
                    rows={2}
                    value={newSpeakerBio}
                    onChange={(e) => setNewSpeakerBio(e.target.value)}
                    placeholder="Speaker achievements and bio..."
                    className={inputClass}
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={handleAddSpeaker}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-black/5 hover:bg-black/10 rounded-xl text-xs font-semibold text-[var(--col-primary)]"
              >
                <Plus className="w-3 h-3" />
                Add Speaker
              </button>
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="px-5 py-2.5 text-xs font-semibold rounded-xl bg-white/60 border border-black/10 text-[var(--col-secondary)] hover:bg-white"
              >
                Back
              </button>
              <Squircle
                cornerRadius={14}
                cornerSmoothing={1}
                className="inline-flex items-center gap-2 text-[0.82rem] font-medium tracking-[0.02em] px-6 py-2.5 bg-[var(--col-primary)] text-[var(--bg)] transition-all hover:opacity-85 cursor-pointer"
                asChild
              >
                <button type="button" onClick={() => setCurrentStep(4)}>
                  Next: Sponsors
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </Squircle>
            </div>
          </Squircle>
        )}

        {/* ================= STEP 4: SPONSORS (Screen 10) ================= */}
        {currentStep === 4 && (
          <Squircle cornerRadius={24} cornerSmoothing={1} className="p-7 space-y-6" style={glassStyle}>
            <div className="border-b border-black/5 pb-4 flex items-center justify-between">
              <div>
                <p className="text-[0.65rem] uppercase tracking-[0.16em] text-[var(--col-dim)] font-mono">Screen 10</p>
                <h2 className="text-lg font-bold text-[var(--col-primary)] font-[family-name:var(--font-display)]">
                  Step 4: Sponsors & Partners
                </h2>
              </div>
              <span className="text-xs text-[var(--col-dim)]">{sponsors.length} Sponsors</span>
            </div>

            {/* List of sponsors */}
            <div className="grid gap-3 sm:grid-cols-2">
              {sponsors.map((spo) => (
                <div
                  key={spo.id}
                  className="p-4 rounded-xl bg-white/70 border border-black/5 flex items-start justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-semibold text-[var(--col-primary)]">{spo.name}</h4>
                      <span className="text-[0.62rem] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-800 font-bold uppercase">
                        {spo.sponsorshipLevel}
                      </span>
                    </div>
                    {spo.description && <p className="text-xs text-[var(--col-secondary)] mt-1">{spo.description}</p>}
                    {spo.websiteUrl && <p className="text-[0.65rem] text-[var(--accent)] mt-1 truncate">{spo.websiteUrl}</p>}
                  </div>
                  <button
                    type="button"
                    onClick={() => setSponsors(sponsors.filter((s) => s.id !== spo.id))}
                    className="text-red-500 hover:text-red-700 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add Sponsor Form */}
            <div className="p-5 rounded-2xl bg-white/50 border border-black/10 space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-[var(--col-primary)]">Add Sponsor</p>
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="sm:col-span-2">
                  <label className={labelClass}>Sponsor Name *</label>
                  <input
                    type="text"
                    value={newSponsorName}
                    onChange={(e) => setNewSponsorName(e.target.value)}
                    placeholder="e.g. GitHub Education"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Tier / Level</label>
                  <select
                    value={newSponsorLevel}
                    onChange={(e) => setNewSponsorLevel(e.target.value)}
                    className={`${inputClass} cursor-pointer`}
                  >
                    <option value="Title">Title Partner</option>
                    <option value="Platinum">Platinum</option>
                    <option value="Gold">Gold</option>
                    <option value="Silver">Silver</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className={labelClass}>Website URL</label>
                  <input
                    type="url"
                    value={newSponsorWebsite}
                    onChange={(e) => setNewSponsorWebsite(e.target.value)}
                    placeholder="https://sponsor.com"
                    className={inputClass}
                  />
                </div>
                <div className="sm:col-span-3">
                  <label className={labelClass}>Description / Offer</label>
                  <input
                    type="text"
                    value={newSponsorDesc}
                    onChange={(e) => setNewSponsorDesc(e.target.value)}
                    placeholder="e.g. Providing student cloud credits & swag"
                    className={inputClass}
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={handleAddSponsor}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-black/5 hover:bg-black/10 rounded-xl text-xs font-semibold text-[var(--col-primary)]"
              >
                <Plus className="w-3 h-3" />
                Add Sponsor
              </button>
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="px-5 py-2.5 text-xs font-semibold rounded-xl bg-white/60 border border-black/10 text-[var(--col-secondary)] hover:bg-white"
              >
                Back
              </button>
              <Squircle
                cornerRadius={14}
                cornerSmoothing={1}
                className="inline-flex items-center gap-2 text-[0.82rem] font-medium tracking-[0.02em] px-6 py-2.5 bg-[var(--col-primary)] text-[var(--bg)] transition-all hover:opacity-85 cursor-pointer"
                asChild
              >
                <button type="button" onClick={() => setCurrentStep(5)}>
                  Next: Registration Form
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </Squircle>
            </div>
          </Squircle>
        )}

        {/* ================= STEP 5: REGISTRATION FORM (Screen 11) ================= */}
        {currentStep === 5 && (
          <Squircle cornerRadius={24} cornerSmoothing={1} className="p-7 space-y-6" style={glassStyle}>
            <div className="border-b border-black/5 pb-4 flex items-center justify-between">
              <div>
                <p className="text-[0.65rem] uppercase tracking-[0.16em] text-[var(--col-dim)] font-mono">Screen 11</p>
                <h2 className="text-lg font-bold text-[var(--col-primary)] font-[family-name:var(--font-display)]">
                  Step 5: Registration Form Catalog
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setShowFormPreview(!showFormPreview)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-black/10 bg-white/60 text-xs font-medium text-[var(--col-primary)] hover:bg-white"
              >
                <Eye className="w-3.5 h-3.5 text-[var(--accent)]" />
                {showFormPreview ? "Hide Preview" : "Preview Form"}
              </button>
            </div>

            {/* Configured fields */}
            <div className="space-y-2.5">
              <p className="text-xs font-bold text-[var(--col-dim)] uppercase tracking-wider font-mono">
                Participant Form Fields
              </p>
              {registrationFields.map((field, idx) => (
                <div
                  key={field.id}
                  className="p-3.5 rounded-xl bg-white/70 border border-black/5 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-md bg-black/5 text-xs font-mono font-semibold flex items-center justify-center text-[var(--col-dim)]">
                      {idx + 1}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-[var(--col-primary)]">{field.label}</p>
                        {field.isSystem && (
                          <span className="text-[0.6rem] font-mono uppercase px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-700 font-bold">
                            Mandatory System
                          </span>
                        )}
                        <span className="text-[0.62rem] font-mono text-[var(--col-dim)]">
                          [{field.fieldType}]
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    {/* Required Toggle */}
                    <label className="flex items-center gap-1.5 cursor-pointer text-xs text-[var(--col-secondary)]">
                      <input
                        type="checkbox"
                        checked={field.required}
                        disabled={field.isSystem}
                        onChange={() => handleToggleFieldRequired(field.id)}
                        className="rounded accent-[var(--accent)]"
                      />
                      <span>Required</span>
                    </label>

                    {!field.isSystem && (
                      <button
                        type="button"
                        onClick={() => handleDeleteField(field.id)}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Add Custom Field */}
            <div className="p-5 rounded-2xl bg-white/50 border border-black/10 space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-[var(--col-primary)]">Add Custom Question</p>
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="sm:col-span-2">
                  <label className={labelClass}>Field Label *</label>
                  <input
                    type="text"
                    value={newCustomLabel}
                    onChange={(e) => setNewCustomLabel(e.target.value)}
                    placeholder="e.g. Any previous hackathon experience?"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Type</label>
                  <select
                    value={newCustomType}
                    onChange={(e) => setNewCustomType(e.target.value as any)}
                    className={`${inputClass} cursor-pointer`}
                  >
                    <option value="text">Text Input</option>
                    <option value="textarea">Paragraph</option>
                    <option value="select">Dropdown</option>
                  </select>
                </div>
              </div>
              <button
                type="button"
                onClick={handleAddCustomField}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-black/5 hover:bg-black/10 rounded-xl text-xs font-semibold text-[var(--col-primary)]"
              >
                <Plus className="w-3 h-3" />
                Add Field
              </button>
            </div>

            {/* Form Preview Drawer */}
            {showFormPreview && (
              <div className="p-6 rounded-2xl bg-white border border-black/10 shadow-sm space-y-4">
                <h4 className="text-sm font-bold text-[var(--col-primary)] border-b pb-2">
                  Participant Registration Preview
                </h4>
                <div className="space-y-3 max-w-md">
                  {registrationFields.map((f) => (
                    <div key={f.id} className="space-y-1">
                      <label className="text-xs font-medium text-[var(--col-primary)]">
                        {f.label} {f.required && <span className="text-red-500">*</span>}
                      </label>
                      {f.fieldType === "textarea" ? (
                        <textarea rows={2} disabled placeholder="Participant response..." className={inputClass} />
                      ) : (
                        <input type="text" disabled placeholder="Participant response..." className={inputClass} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => setCurrentStep(4)}
                className="px-5 py-2.5 text-xs font-semibold rounded-xl bg-white/60 border border-black/10 text-[var(--col-secondary)] hover:bg-white"
              >
                Back
              </button>
              <Squircle
                cornerRadius={14}
                cornerSmoothing={1}
                className="inline-flex items-center gap-2 text-[0.82rem] font-medium tracking-[0.02em] px-6 py-2.5 bg-[var(--col-primary)] text-[var(--bg)] transition-all hover:opacity-85 cursor-pointer"
                asChild
              >
                <button type="button" onClick={() => setCurrentStep(6)}>
                  Next: Review & Submit
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </Squircle>
            </div>
          </Squircle>
        )}

        {/* ================= STEP 6: REVIEW & SUBMIT (Screen 12) ================= */}
        {currentStep === 6 && (
          <Squircle cornerRadius={24} cornerSmoothing={1} className="p-7 space-y-6" style={glassStyle}>
            <div className="border-b border-black/5 pb-4">
              <p className="text-[0.65rem] uppercase tracking-[0.16em] text-[var(--col-dim)] font-mono">Screen 12</p>
              <h2 className="text-lg font-bold text-[var(--col-primary)] font-[family-name:var(--font-display)]">
                Step 6: Review & Submit for Approval
              </h2>
            </div>

            {/* Summary Cards */}
            <div className="grid gap-4 md:grid-cols-2">
              {/* Card 1: Basic Info */}
              <div className="p-5 rounded-2xl bg-white/70 border border-black/5 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider font-mono text-[var(--col-primary)]">
                    1. Basic Information
                  </h4>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="text-xs font-semibold text-[var(--accent)] hover:underline"
                  >
                    Edit
                  </button>
                </div>
                <p className="text-sm font-bold text-[var(--col-primary)]">{title}</p>
                <p className="text-xs text-[var(--col-secondary)] line-clamp-2">{description}</p>
                <div className="text-xs text-[var(--col-dim)] pt-2 space-y-1">
                  <p>Category: <span className="font-medium text-[var(--col-primary)]">{category}</span> ({eventMode})</p>
                  <p>Schedule: <span className="font-medium text-[var(--col-primary)]">{startDate} &middot; {startTime} - {endTime}</span></p>
                  <p>Venue: <span className="font-medium text-[var(--col-primary)]">{venue}</span> (Cap: {capacity})</p>
                </div>
              </div>

              {/* Card 2: Agenda Summary */}
              <div className="p-5 rounded-2xl bg-white/70 border border-black/5 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider font-mono text-[var(--col-primary)]">
                    2. Agenda ({agenda.length})
                  </h4>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="text-xs font-semibold text-[var(--accent)] hover:underline"
                  >
                    Edit
                  </button>
                </div>
                <div className="space-y-1.5 pt-1">
                  {agenda.slice(0, 3).map((a, i) => (
                    <div key={i} className="text-xs flex gap-2">
                      <span className="font-mono text-[var(--accent)]">{a.time}</span>
                      <span className="font-medium text-[var(--col-primary)] truncate">{a.sessionTitle}</span>
                    </div>
                  ))}
                  {agenda.length > 3 && (
                    <p className="text-[0.7rem] text-[var(--col-dim)] font-mono">+{agenda.length - 3} more sessions</p>
                  )}
                </div>
              </div>

              {/* Card 3: Speakers Summary */}
              <div className="p-5 rounded-2xl bg-white/70 border border-black/5 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider font-mono text-[var(--col-primary)]">
                    3. Speakers ({speakers.length})
                  </h4>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="text-xs font-semibold text-[var(--accent)] hover:underline"
                  >
                    Edit
                  </button>
                </div>
                <div className="space-y-1 pt-1">
                  {speakers.length === 0 ? (
                    <p className="text-xs text-[var(--col-dim)] italic">No speakers added.</p>
                  ) : (
                    speakers.map((s, i) => (
                      <p key={i} className="text-xs font-medium text-[var(--col-primary)]">
                        {s.name} <span className="text-[var(--col-dim)]">({s.organization || s.designation || "Speaker"})</span>
                      </p>
                    ))
                  )}
                </div>
              </div>

              {/* Card 4: Sponsors & Form Summary */}
              <div className="p-5 rounded-2xl bg-white/70 border border-black/5 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider font-mono text-[var(--col-primary)]">
                    4. Sponsors ({sponsors.length}) & Form ({registrationFields.length} Fields)
                  </h4>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(4)}
                    className="text-xs font-semibold text-[var(--accent)] hover:underline"
                  >
                    Edit
                  </button>
                </div>
                <p className="text-xs text-[var(--col-secondary)]">
                  Sponsors: {sponsors.map((sp) => sp.name).join(", ") || "None"}
                </p>
                <p className="text-xs text-[var(--col-secondary)]">
                  Registration Form: {registrationFields.filter((f) => f.required).length} required fields, {registrationFields.length} total.
                </p>
              </div>
            </div>

            {/* Approval Notice */}
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-800 text-xs flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Super Admin Review Process</p>
                <p className="mt-0.5 opacity-90">
                  Submitting will mark the event as <code className="font-mono font-bold">PENDING_APPROVAL</code>. Once reviewed, Super Admin can either APPROVE, REQUEST CHANGES, or REJECT it.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-black/5">
              <button
                type="button"
                onClick={() => setCurrentStep(5)}
                className="px-5 py-2.5 text-xs font-semibold rounded-xl bg-white/60 border border-black/10 text-[var(--col-secondary)] hover:bg-white"
              >
                Back
              </button>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleFinish(true)}
                  className="px-5 py-2.5 text-xs font-semibold rounded-xl bg-white/60 border border-black/15 text-[var(--col-primary)] hover:bg-white transition-colors"
                >
                  Save as Draft
                </button>

                <Squircle
                  cornerRadius={14}
                  cornerSmoothing={1}
                  className="inline-flex items-center gap-2 text-[0.82rem] font-medium tracking-[0.02em] px-6 py-2.5 bg-[var(--col-primary)] text-[var(--bg)] transition-all hover:opacity-85 cursor-pointer shadow-md"
                  asChild
                >
                  <button type="button" onClick={() => handleFinish(false)}>
                    Submit for Approval
                    <Check className="w-4 h-4" />
                  </button>
                </Squircle>
              </div>
            </div>
          </Squircle>
        )}
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <div
            className="absolute inset-0 bg-[hsl(0_0%_10%_/_0.4)] backdrop-blur-sm animate-fade-in"
            onClick={() => {
              setShowSuccess(null);
              router.push("/admin/events");
            }}
          />
          <Squircle
            cornerRadius={24}
            cornerSmoothing={1}
            className="relative z-10 w-full max-w-sm p-7 animate-scale-in text-center"
            style={{
              background: "hsl(0 0% 96% / 0.95)",
              backdropFilter: "blur(30px)",
              WebkitBackdropFilter: "blur(30px)",
              boxShadow: "0 8px 40px var(--shadow-lg), inset 0 1px 0 hsl(0 0% 100% / 0.6)",
            }}
          >
            <div className="w-12 h-12 rounded-full bg-[hsl(142_50%_45%_/_0.12)] flex items-center justify-center mx-auto mb-4">
              <Check className="w-5 h-5 text-[hsl(142,50%,35%)]" strokeWidth={2} />
            </div>
            <h3 className="text-[1.05rem] font-semibold text-[var(--col-primary)] font-[family-name:var(--font-display)] mb-1">
              {showSuccess === "draft" ? "Draft Saved" : "Event Submitted"}
            </h3>
            <p className="text-[0.82rem] text-[var(--col-secondary)] font-[family-name:var(--font-ui)] mb-6">
              {showSuccess === "draft"
                ? "Your event has been saved as a draft. You can continue editing anytime."
                : "Your event has been submitted to Super Admin with status PENDING_APPROVAL."}
            </p>
            <Squircle
              cornerRadius={14}
              cornerSmoothing={1}
              className="w-full text-center text-[0.8rem] font-medium py-[11px] bg-[var(--col-primary)] text-[var(--bg)] transition-all duration-300 hover:opacity-80 font-[family-name:var(--font-display)] cursor-pointer"
              asChild
            >
              <button
                onClick={() => {
                  setShowSuccess(null);
                  router.push("/admin/events");
                }}
              >
                View My Events
              </button>
            </Squircle>
          </Squircle>
        </div>
      )}
    </div>
  );
}
