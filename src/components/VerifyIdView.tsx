import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, FileUp, ShieldCheck } from 'lucide-react';
import { StudentProfile } from '../types/app';

interface VerifyIdViewProps {
  profile: StudentProfile;
  onBack: () => void;
  onVerify: (updated: Partial<StudentProfile>) => void;
}

export const VerifyIdView: React.FC<VerifyIdViewProps> = ({
  profile,
  onBack,
  onVerify,
}) => {
  const [email, setEmail] = useState(profile.email);
  const [rollNo, setRollNo] = useState(profile.rollNo);
  const [hostel, setHostel] = useState(profile.hostel);
  const [idFileName, setIdFileName] = useState(profile.idFileName || '');
  const [savedBanner, setSavedBanner] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onVerify({
      email: email.trim() || profile.email,
      rollNo: rollNo.trim().toUpperCase() || profile.rollNo,
      hostel,
      verified: true,
      idCardUploaded: true,
      idFileName: idFileName || 'cupb_student_id.jpg',
    });
    setSavedBanner(true);
    setTimeout(() => setSavedBanner(false), 3000);
  };

  return (
    <div className="flex flex-col flex-1">
      {/* Contextual Header */}
      <header className="sticky top-0 z-20 bg-background/95 backdrop-blur-sm px-4 pt-4 pb-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            aria-label="Back to Profile"
            className="inline-flex items-center justify-center w-10 h-10 bg-surface border border-outline-subtle text-secondary rounded-full"
          >
            <ArrowLeft className="w-5 h-5" aria-hidden="true" />
          </button>
          <h1 className="font-headline text-xl font-bold text-secondary">Verify Student ID</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 pb-24 flex flex-col gap-4">
        {savedBanner && (
          <div className="bg-primary-container text-on-primary-container border border-primary/30 rounded-xl p-3.5 flex items-center gap-2 text-sm font-semibold">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>CUPB Student ID verified! All student discounts unlocked.</span>
          </div>
        )}

        {/* Promotional Banner Card */}
        <section className="bg-gradient-to-r from-primary-tint via-surface to-surface border border-primary/20 rounded-xl p-4 flex items-center justify-between gap-3 shadow-sm">
          <div className="flex flex-col gap-0.5">
            <span className="font-label text-xs font-semibold text-primary-deep">
              CUPB ONE PASS
            </span>
            <p className="font-title text-base font-semibold text-secondary">
              Unlock 40% off &amp; campus trust.
            </p>
          </div>
          <ShieldCheck className="w-6 h-6 text-primary-deep shrink-0" aria-hidden="true" />
        </section>

        {/* Verification Form */}
        <form
          id="verify-id-form"
          onSubmit={handleSubmit}
          className="bg-surface rounded-xl border border-outline-subtle shadow-sm p-4 flex flex-col gap-3.5"
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="univ-email" className="font-label text-xs font-semibold text-secondary">
              CUPB Email
            </label>
            <input
              id="univ-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@cup.edu.in"
              className="w-full bg-background border border-outline-subtle rounded-lg px-3 py-2.5 font-body text-sm text-on-surface focus:border-primary focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="roll-no" className="font-label text-xs font-semibold text-secondary">
              Roll Number
            </label>
            <input
              id="roll-no"
              type="text"
              value={rollNo}
              onChange={(e) => setRollNo(e.target.value)}
              placeholder="e.g. 24CUPB1042"
              className="w-full bg-background border border-outline-subtle rounded-lg px-3 py-2.5 font-mono text-xs text-on-surface focus:border-primary focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="hostel-select"
              className="font-label text-xs font-semibold text-secondary"
            >
              Hostel / Residence
            </label>
            <select
              id="hostel-select"
              value={hostel}
              onChange={(e) => setHostel(e.target.value)}
              className="w-full bg-background border border-outline-subtle rounded-lg px-3 py-2.5 font-body text-sm text-on-surface focus:border-primary focus:outline-none"
            >
              <option value="Hostel 4 (Boys)">Hostel 4 (Boys)</option>
              <option value="Hostel 2 (Girls)">Hostel 2 (Girls)</option>
              <option value="Day Scholar">Day Scholar</option>
            </select>
          </div>

          <div className="flex flex-col gap-1 pt-1">
            <span className="font-label text-xs font-semibold text-secondary">Student ID Card</span>
            <label className="w-full border border-dashed border-primary bg-primary-tint rounded-xl p-4 flex flex-col items-center gap-1 text-primary-deep cursor-pointer hover:bg-primary-container/40 transition-colors">
              <FileUp className="w-6 h-6" aria-hidden="true" />
              <span className="font-label text-xs font-semibold">
                {idFileName ? `Uploaded: ${idFileName}` : 'Upload ID Photo'}
              </span>
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setIdFileName(file.name);
                }}
                className="sr-only"
              />
            </label>
          </div>
        </form>
      </main>

      {/* Sticky Submit Bar */}
      <div className="sticky bottom-14 lg:bottom-0 z-20 bg-surface border-t border-outline-subtle px-4 py-3">
        <button
          type="submit"
          form="verify-id-form"
          className="w-full inline-flex items-center justify-center gap-2 bg-primary text-on-primary px-5 py-3.5 rounded-xl font-label text-sm font-semibold shadow-sm hover:opacity-95 transition-opacity"
        >
          <span>Verify CUPB ID</span>
        </button>
      </div>
    </div>
  );
};
