import { useState, type FormEvent } from "react";

interface ProfileProps {
  name: string;
  email: string;
  phone: string;
  photoUrl?: string;
  onBack: () => void;
  onSave: (data: { name: string; email: string; phone: string; photoUrl?: string }) => void;
}

export default function Profile({
  name,
  email,
  phone,
  photoUrl,
  onBack,
  onSave,
}: ProfileProps) {
  const [formName, setFormName] = useState(name);
  const [formEmail, setFormEmail] = useState(email);
  const [formPhone, setFormPhone] = useState(phone);
  const [formPhotoUrl, setFormPhotoUrl] = useState(photoUrl || "");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave({
      name: formName.trim(),
      email: formEmail.trim(),
      phone: formPhone.trim(),
      photoUrl: formPhotoUrl.trim() || undefined,
    });
  };

  const isVerified = formPhone.trim().length > 0;

  return (
    <div>
      <button
        onClick={onBack}
        className="text-blue-600 mb-4 underline"
      >
        ← Back
      </button>

      <h2 className="text-lg font-semibold mb-4">Your Profile</h2>

      <div className="mb-4 flex items-center gap-3">
        <div className="h-12 w-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg font-semibold overflow-hidden">
          {formPhotoUrl ? (
            <img
              src={formPhotoUrl}
              alt="Profile"
              className="h-full w-full object-cover"
            />
          ) : (
            (formName || "U").charAt(0).toUpperCase()
          )}
        </div>

        <div className="flex flex-col">
          <span className="font-medium">{formName || "New User"}</span>
          <span
            className={`text-xs mt-1 px-2 py-0.5 rounded-full w-fit ${
              isVerified
                ? "bg-green-100 text-green-800"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {isVerified ? "Verified (phone added)" : "Unverified"}
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded-lg shadow">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
            placeholder="Your name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            value={formEmail}
            onChange={(e) => setFormEmail(e.target.value)}
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone (for verification)
          </label>
          <input
            type="tel"
            value={formPhone}
            onChange={(e) => setFormPhone(e.target.value)}
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
            placeholder="+91 98765 43210"
          />
          <p className="text-xs text-gray-500 mt-1">
            In future, we&apos;ll verify this via OTP.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Profile Photo URL (optional)
          </label>
          <input
            type="url"
            value={formPhotoUrl}
            onChange={(e) => setFormPhotoUrl(e.target.value)}
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm"
            placeholder="https://example.com/photo.jpg"
          />
        </div>

        <button
          type="submit"
          className="mt-2 w-full bg-blue-600 text-white py-2.5 rounded-lg text-sm font-medium"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
}
