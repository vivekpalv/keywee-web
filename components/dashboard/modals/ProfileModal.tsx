import { useState, useEffect, useRef } from "react";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { UserProfile } from "@/types/dashboard";
import { BASE_URL } from "@/utils/api";

const API_BASE_URL = BASE_URL;
const MAX_FILE_SIZE_BYTES = 40 * 1024 * 1024;

interface LocationSuggestion {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
}

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile | null;
  onSuccess: (updatedProfile: any) => void;
}

export default function ProfileModal({ isOpen, onClose, profile, onSuccess }: ProfileModalProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "", firmName: "", email: "", contact: "", experience: "", bio: "",
    city: "", state: "", address: "", lat: 0, long: 0, profilePictureUrl: "",
    minBudget: 0, maxBudget: 10000000
  });

  useEffect(() => {
    if (isOpen && profile) {
      const ad = profile.architectDetails;
      setForm({
        name: profile.name || "",
        firmName: ad?.firmName || "",
        email: ad?.email || "",
        contact: ad?.contact || profile.mobile || "",
        experience: ad?.experience?.toString() || "0",
        bio: ad?.bio || "",
        city: ad?.city || "",
        state: ad?.state || "",
        address: (ad as any)?.address || "",
        lat: (ad as any)?.lat || 0,
        long: (ad as any)?.long || 0,
        profilePictureUrl: ad?.profilePictureUrl || "",
        minBudget: ad?.minBudget || 0,
        maxBudget: ad?.maxBudget || 10000000
      });
      setProfileImagePreview(ad?.profilePictureUrl || null);
      setProfileImageFile(null);
    }
  }, [isOpen, profile]);

  useEffect(() => {
    const handleClickOutside = () => setShowDropdown(false);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  if (!isOpen) return null;

  const fetchLocationSuggestions = async (query: string) => {
    if (!query || query.length < 3) {
      setSuggestions([]);
      setIsSearching(false);
      return;
    }
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=jsonv2&limit=5`);
      const data = await res.json();
      setSuggestions(data);
    } catch (err) { console.error(err); } 
    finally { setIsSearching(false); }
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setForm({ ...form, address: value, lat: 0, long: 0 });
    setShowDropdown(true);
    setIsSearching(true);
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    searchTimeoutRef.current = setTimeout(() => fetchLocationSuggestions(value), 500);
  };

  const selectLocation = (suggestion: LocationSuggestion) => {
    setForm({ ...form, address: suggestion.display_name, lat: Number(suggestion.lat), long: Number(suggestion.lon) });
    setShowDropdown(false);
    setSuggestions([]);
  };

  const handleProfileImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > MAX_FILE_SIZE_BYTES) return alert("Image size exceeds 40MB limit.");
      setProfileImageFile(file);
      setProfileImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return;

    if (form.minBudget > form.maxBudget) return alert("Min budget cannot be greater than Max budget.");

    setIsSaving(true);
    try {
      let finalProfilePicUrl = form.profilePictureUrl;

      if (profileImageFile) {
        const formData = new FormData();
        formData.append("images", profileImageFile);
        const uploadRes = await fetch(`${API_BASE_URL}user/images`, { method: "POST", headers: { "Authorization": `Bearer ${token}` }, body: formData });
        const uploadData = await uploadRes.json();
        if (uploadData.success && uploadData.urls.length > 0) finalProfilePicUrl = uploadData.urls[0];
        else throw new Error("Image upload failed.");
      }

      const payload = { ...form, gender: profile?.gender || "MALE", profilePictureUrl: finalProfilePicUrl, minBudget: Number(form.minBudget), maxBudget: Number(form.maxBudget), experience: Number(form.experience) };

      const res = await fetch(`${API_BASE_URL}user/update`, { method: "PUT", headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` }, body: JSON.stringify(payload) });
      const data = await res.json();

      if (data.success) {
        onSuccess(payload);
        onClose();
      } else alert(data.message);
    } catch (err: any) { alert(err.message || "Error saving profile"); } 
    finally { setIsSaving(false); }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-900/60 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-zinc-900 rounded-4xl w-full max-w-2xl p-5 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl border border-zinc-200 dark:border-zinc-800">
        <h2 className="text-xl sm:text-2xl font-extrabold mb-6 text-zinc-900 dark:text-zinc-100">Update Profile Details</h2>
        <form onSubmit={handleSave} className="flex flex-col gap-4 sm:gap-5">
          
          <div className="flex flex-col items-center justify-center gap-3 mb-4">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 overflow-hidden relative group cursor-pointer shadow-sm">
              {profileImagePreview ? <img src={profileImagePreview} alt="Avatar Preview" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-4xl text-zinc-300 dark:text-zinc-600">👤</div>}
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><span className="text-white text-xs font-bold tracking-wide">Change</span></div>
              <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleProfileImageSelect} />
            </div>
            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Profile Image (Max 40MB)</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            <div>
              <label className="text-xs font-bold text-zinc-900 dark:text-zinc-300 uppercase tracking-wide mb-2 block">Full Name</label>
              <input required placeholder="Your Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 focus:border-[#EAB308] rounded-xl p-3.5 text-sm text-zinc-900 dark:text-zinc-100 outline-none transition-all" />
            </div>
            <div>
              <label className="text-xs font-bold text-zinc-900 dark:text-zinc-300 uppercase tracking-wide mb-2 block">Firm Name</label>
              <input required placeholder="e.g. Doe & Associates" value={form.firmName} onChange={(e) => setForm({ ...form, firmName: e.target.value })} className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 focus:border-[#EAB308] rounded-xl p-3.5 text-sm text-zinc-900 dark:text-zinc-100 outline-none transition-all" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            <div>
              <label className="text-xs font-bold text-zinc-900 dark:text-zinc-300 uppercase tracking-wide mb-2 block">Work Email</label>
              <input type="email" placeholder="Email Address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 focus:border-[#EAB308] rounded-xl p-3.5 text-sm text-zinc-900 dark:text-zinc-100 outline-none transition-all" />
            </div>
            <div>
              <label className="text-xs font-bold text-zinc-900 dark:text-zinc-300 uppercase tracking-wide mb-2 block">Direct Contact</label>
              <input placeholder="Contact Number" value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 focus:border-[#EAB308] rounded-xl p-3.5 text-sm text-zinc-900 dark:text-zinc-100 outline-none transition-all" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
            <div>
              <label className="text-xs font-bold text-zinc-900 dark:text-zinc-300 uppercase tracking-wide mb-2 block">Experience (Yrs)</label>
              <input type="number" min="0" required value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })} className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 focus:border-[#EAB308] rounded-xl p-3.5 text-sm text-zinc-900 dark:text-zinc-100 outline-none transition-all" />
            </div>
            <div>
              <label className="text-xs font-bold text-zinc-900 dark:text-zinc-300 uppercase tracking-wide mb-2 block">City</label>
              <input placeholder="City" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 focus:border-[#EAB308] rounded-xl p-3.5 text-sm text-zinc-900 dark:text-zinc-100 outline-none transition-all" />
            </div>
            <div>
              <label className="text-xs font-bold text-zinc-900 dark:text-zinc-300 uppercase tracking-wide mb-2 block">State</label>
              <input placeholder="State" value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 focus:border-[#EAB308] rounded-xl p-3.5 text-sm text-zinc-900 dark:text-zinc-100 outline-none transition-all" />
            </div>
          </div>

          {/* ADDRESS AUTOCOMPLETE */}
          <div className="relative sm:col-span-2" onClick={(e) => e.stopPropagation()}>
            <label className="text-xs font-bold text-zinc-900 dark:text-zinc-300 uppercase tracking-wide mb-2 block">Office Address</label>
            <input type="text" value={form.address} onChange={handleLocationChange} onFocus={() => { if(form.address) setShowDropdown(true) }} placeholder="Search and select your office address..." className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 focus:border-[#EAB308] rounded-xl p-3.5 text-sm text-zinc-900 dark:text-zinc-100 outline-none transition-all" />
            {showDropdown && (form.address.length >= 3) && (
              <div className="absolute z-[101] w-full mt-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl max-h-60 overflow-y-auto">
                {isSearching ? (
                  <div className="p-3 text-sm text-zinc-500 text-center">Searching...</div>
                ) : suggestions.length > 0 ? (
                  <ul className="py-1">
                    {suggestions.map((item) => (
                      <li key={item.place_id} onClick={() => selectLocation(item)} className="px-4 py-2.5 text-sm text-black dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer transition-colors border-b border-zinc-100 dark:border-zinc-800 last:border-0">{item.display_name}</li>
                    ))}
                  </ul>
                ) : <div className="p-3 text-sm text-zinc-500 text-center">No locations found.</div>}
              </div>
            )}
            {form.lat !== 0 && form.long !== 0 && <p className="mt-1.5 text-[10px] text-green-600 font-medium">✓ Valid location coordinates captured.</p>}
          </div>

          {/* BUDGET RANGE */}
          <div className="sm:col-span-2 mt-2">
            <label className="text-xs font-bold text-zinc-900 dark:text-zinc-300 uppercase tracking-wide mb-4 block">Project Budget Range</label>
            <div className="flex items-center gap-4 mb-5">
              <div className="flex-1 flex items-center bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-xl px-3 py-2 focus-within:border-[#EAB308] transition-all">
                <span className="text-zinc-500 font-semibold mr-1 text-sm">₹</span>
                <input type="number" min="0" value={form.minBudget} onChange={(e) => setForm({ ...form, minBudget: Math.min(Number(e.target.value), form.maxBudget - 1) })} className="w-full bg-transparent text-sm font-bold outline-none" />
              </div>
              <span className="text-zinc-400 font-medium text-sm">to</span>
              <div className="flex-1 flex items-center bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-xl px-3 py-2 focus-within:border-[#EAB308] transition-all">
                <span className="text-zinc-500 font-semibold mr-1 text-sm">₹</span>
                <input type="number" min={form.minBudget + 1} value={form.maxBudget} onChange={(e) => setForm({ ...form, maxBudget: Math.max(Number(e.target.value), form.minBudget + 1) })} className="w-full bg-transparent text-sm font-bold outline-none" />
              </div>
            </div>

            <div className="relative h-2 w-full bg-zinc-200 dark:bg-zinc-800 rounded-full flex items-center mt-2">
              <div className="absolute h-2 bg-[#EAB308] rounded-full pointer-events-none transition-all duration-75" style={{ left: `${Math.min(100, Math.max(0, (form.minBudget / 10000000) * 100))}%`, right: `${100 - Math.min(100, Math.max(0, (form.maxBudget / 10000000) * 100))}%` }}></div>
              <input type="range" min="0" max="10000000" step="100000" value={Math.min(form.minBudget, 10000000)} onChange={(e) => setForm({ ...form, minBudget: Math.min(Number(e.target.value), form.maxBudget - 1) })} className="absolute w-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#EAB308] [&::-webkit-slider-thumb]:cursor-pointer z-20" />
              <input type="range" min="0" max="10000000" step="100000" value={Math.min(form.maxBudget, 10000000)} onChange={(e) => setForm({ ...form, maxBudget: Math.max(Number(e.target.value), form.minBudget + 1) })} className="absolute w-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#EAB308] [&::-webkit-slider-thumb]:cursor-pointer z-30" />
            </div>
            <div className="flex justify-between text-[10px] font-medium text-zinc-400 mt-3"><span>₹0</span><span>₹1,00,00,000+</span></div>
          </div>

          <div>
            <label className="text-xs font-bold text-zinc-900 dark:text-zinc-300 uppercase tracking-wide mb-2 block">Professional Bio</label>
            <textarea placeholder="Write a brief professional bio..." value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} className="w-full bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 focus:border-[#EAB308] rounded-xl p-3.5 text-sm text-zinc-900 dark:text-zinc-100 outline-none transition-all resize-none" rows={4} />
          </div>

          <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4 mt-6 pt-6 border-t border-zinc-100 dark:border-zinc-800">
            <button type="button" onClick={onClose} disabled={isSaving} className="flex-1 py-3 sm:py-4 border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-xl font-extrabold transition-colors disabled:opacity-50">Cancel</button>
            <button type="submit" disabled={isSaving} className="flex-1 py-3 sm:py-4 flex items-center justify-center gap-2 bg-black dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white dark:text-black rounded-xl font-extrabold transition-colors shadow-sm disabled:opacity-50">
              {isSaving && <LoadingSpinner className="w-5 h-5 text-current mr-1" />}
              {isSaving ? "Saving..." : "Update Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}