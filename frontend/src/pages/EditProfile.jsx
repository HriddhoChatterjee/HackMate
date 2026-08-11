import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AVAILABLE_SKILLS = [
  'React', 'Node.js', 'Python', 'PyTorch', 'Solidity', 'Figma',
  'TypeScript', 'Next.js', 'Go', 'Rust', 'Swift', 'Kotlin',
];

export default function EditProfile() {
  // Simulates the neo-brutalist button press shadow mechanics cleanly in React
  useEffect(() => {
    const handleMouseDown = (e) => {
      const btn = e.target.closest('.neobrutalist-shadow');
      if (btn) {
        btn.style.transform = 'translate(2px, 2px)';
        btn.style.boxShadow = '0px 0px 0px 0px rgba(99,14,212,1)';
      }
    };

    const handleMouseUp = (e) => {
      const btn = e.target.closest('.neobrutalist-shadow');
      if (btn) {
        btn.style.transform = 'translate(-2px, -2px)';
        btn.style.boxShadow = '4px 4px 0px 0px rgba(99,14,212,1)';
      }
    };

    const handleMouseLeave = (e) => {
      const btn = e.target.closest('.neobrutalist-shadow');
      if (btn) {
        btn.style.transform = '';
        btn.style.boxShadow = '';
      }
    };

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave, true);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
    };
  }, []);

  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [serverError, setServerError] = useState('');
  const [errors, setErrors] = useState({});
  const [skillInput, setSkillInput] = useState('');
  const [showSkillSuggestions, setShowSkillSuggestions] = useState(false);

  const [form, setForm] = useState({
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBDKQPSOPEsH-uCSIgC_jCg3n-ONG2bW-Qu1OC6Ao0dhdEa_Wb85f0TVncYOJIg-vmAjgf2JhpUTWTctLmxVYJH1h9nKIrcRE824Mpu_JxQbWwhqIws610tYrwC9WRBsdpNHhebEEMN7DHP2OU88VnVMyYq4XpypF6Mqb-lWm7XnycekVbnwkvtz342wzXcIL8fI8Ba_vHNOJ6U9ucnnRflOrV10j2EPtH89lXoy6EiDYrg-dNh1BnZ',
    name: '',
    handle: '',
    title: '',
    bio: '',
    location: '',
    github: '',
    website: '',
    skills: [],
  });

  useEffect(() => {
    // Replace with real fetch, e.g.:
    // fetch('/api/users/me').then(r => r.json()).then(data => setForm(prev => ({ ...prev, ...data }))).finally(() => setLoading(false));
    const timer = setTimeout(() => {
      setForm({
        avatar:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuBDKQPSOPEsH-uCSIgC_jCg3n-ONG2bW-Qu1OC6Ao0dhdEa_Wb85f0TVncYOJIg-vmAjgf2JhpUTWTctLmxVYJH1h9nKIrcRE824Mpu_JxQbWwhqIws610tYrwC9WRBsdpNHhebEEMN7DHP2OU88VnVMyYq4XpypF6Mqb-lWm7XnycekVbnwkvtz342wzXcIL8fI8Ba_vHNOJ6U9ucnnRflOrV10j2EPtH89lXoy6EiDYrg-dNh1BnZ',
        name: 'Ada Lovelace',
        handle: 'adalovelace',
        title: 'Full-Stack Engineer & Hackathon Addict',
        bio: 'Building weird little tools at 2am. Winner of 3 hackathons, loser of many more. Currently obsessed with generative AI and analog synths.',
        location: 'Bengaluru, India',
        github: 'github.com/adalovelace',
        website: 'adalovelace.dev',
        skills: ['React', 'Node.js', 'Python', 'PyTorch', 'Solidity', 'Figma'],
      });
      setLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
    setSaved(false);
  };

  const handleAvatarClick = () => fileInputRef.current?.click();

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setErrors((prev) => ({ ...prev, avatar: 'Please choose an image file' }));
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setForm((prev) => ({ ...prev, avatar: reader.result }));
      setErrors((prev) => ({ ...prev, avatar: '' }));
      setSaved(false);
    };
    reader.readAsDataURL(file);
  };

  const addSkill = (skill) => {
    const clean = skill.trim();
    if (!clean) return;
    setForm((prev) => {
      if (prev.skills.some((s) => s.toLowerCase() === clean.toLowerCase())) return prev;
      if (prev.skills.length >= 10) return prev;
      return { ...prev, skills: [...prev.skills, clean] };
    });
    setSkillInput('');
    setShowSkillSuggestions(false);
    setSaved(false);
  };

  const removeSkill = (skill) => {
    setForm((prev) => ({ ...prev, skills: prev.skills.filter((s) => s !== skill) }));
    setSaved(false);
  };

  const handleSkillKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addSkill(skillInput);
    } else if (e.key === 'Backspace' && !skillInput && form.skills.length > 0) {
      removeSkill(form.skills[form.skills.length - 1]);
    }
  };

  const filteredSuggestions = AVAILABLE_SKILLS.filter(
    (s) =>
      s.toLowerCase().includes(skillInput.toLowerCase()) &&
      !form.skills.some((added) => added.toLowerCase() === s.toLowerCase())
  );

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = 'Name is required';
    if (!form.handle.trim()) next.handle = 'Handle is required';
    else if (!/^[a-zA-Z0-9_]+$/.test(form.handle)) next.handle = 'Only letters, numbers, and underscores';
    if (form.bio.length > 280) next.bio = 'Keep it under 280 characters';
    return next;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    setSaved(false);
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setSaving(true);
    try {
      // Replace with real update call, e.g.:
      // const res = await fetch('/api/users/me', {
      //   method: 'PATCH',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(form),
      // });
      // if (!res.ok) throw new Error('Could not save changes');
      await new Promise((resolve) => setTimeout(resolve, 800));
      setSaved(true);
    } catch (err) {
      setServerError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => navigate('/profile');

  return (
    <div className="bg-[#fef7ff] text-[#1d1a24] font-['Inter'] min-h-screen selection:bg-[#eaddff] selection:text-[#25005a]">
      <Navbar />
      <main className="px-8 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="mb-10">
            <div className="inline-block bg-[#2170e4] text-[#fefcff] font-['JetBrains_Mono'] px-4 py-1 rounded-full border-2 border-[#1d1a24] -rotate-3 text-sm font-medium mb-6">
              $ hackmate edit --profile
            </div>
            <h1 className="font-['Space_Grotesk'] text-4xl md:text-5xl text-[#630ed4] font-bold leading-none mb-3">
              Edit Your Profile.
            </h1>
            <p className="text-[#4a4455] text-lg">
              Keep your info fresh so squads know exactly who they're teaming up with.
            </p>
          </div>

          {loading ? (
            <EditProfileSkeleton />
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              className="bg-white p-8 rounded-3xl border-2 border-[#1d1a24] shadow-[4px_4px_0px_0px_rgba(99,14,212,1)] space-y-8"
            >
              {serverError && (
                <div className="bg-[#ffdad4] text-[#410001] border-2 border-[#1d1a24] rounded-xl px-4 py-3 font-['JetBrains_Mono'] text-sm">
                  [ERROR] {serverError}
                </div>
              )}
              {saved && (
                <div className="bg-[#d4f4dd] text-[#0a3818] border-2 border-[#1d1a24] rounded-xl px-4 py-3 font-['JetBrains_Mono'] text-sm flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg">check_circle</span>
                  Profile saved successfully.
                </div>
              )}

              {/* Avatar */}
              <div>
                <label className="block font-['Space_Grotesk'] font-semibold text-sm mb-3">Profile Photo</label>
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-2xl overflow-hidden border-4 border-[#1d1a24]">
                      <img className="w-full h-full object-cover" src={form.avatar} alt="Your avatar" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={handleAvatarClick}
                      className="neobrutalist-shadow flex items-center gap-2 bg-white text-[#1d1a24] font-['Space_Grotesk'] px-5 py-2.5 rounded-xl border-2 border-[#1d1a24] shadow-[4px_4px_0px_0px_rgba(99,14,212,1)] font-semibold transition-all text-sm"
                    >
                      <span className="material-symbols-outlined text-lg">upload</span>
                      Upload New Photo
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="hidden"
                    />
                    <p className="text-xs text-[#7b7487] font-['JetBrains_Mono']">PNG or JPG, up to 5MB</p>
                    {errors.avatar && <p className="text-[#ba1a1a] text-sm font-['JetBrains_Mono']">{errors.avatar}</p>}
                  </div>
                </div>
              </div>

              <div className="h-px bg-[#e8dfee]"></div>

              {/* Name + Handle */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block font-['Space_Grotesk'] font-semibold text-sm mb-2">
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Ada Lovelace"
                    className={`w-full px-4 py-3 rounded-xl border-2 bg-[#fef7ff] font-['Inter'] focus:outline-none focus:ring-2 focus:ring-[#630ed4] transition-shadow ${
                      errors.name ? 'border-[#ba1a1a]' : 'border-[#1d1a24]'
                    }`}
                  />
                  {errors.name && <p className="text-[#ba1a1a] text-sm font-['JetBrains_Mono'] mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="handle" className="block font-['Space_Grotesk'] font-semibold text-sm mb-2">
                    Handle
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7b7487] font-['JetBrains_Mono']">@</span>
                    <input
                      id="handle"
                      name="handle"
                      type="text"
                      value={form.handle}
                      onChange={handleChange}
                      placeholder="adalovelace"
                      className={`w-full pl-9 pr-4 py-3 rounded-xl border-2 bg-[#fef7ff] font-['JetBrains_Mono'] focus:outline-none focus:ring-2 focus:ring-[#630ed4] transition-shadow ${
                        errors.handle ? 'border-[#ba1a1a]' : 'border-[#1d1a24]'
                      }`}
                    />
                  </div>
                  {errors.handle && <p className="text-[#ba1a1a] text-sm font-['JetBrains_Mono'] mt-1">{errors.handle}</p>}
                </div>
              </div>

              {/* Title */}
              <div>
                <label htmlFor="title" className="block font-['Space_Grotesk'] font-semibold text-sm mb-2">
                  Headline
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Full-Stack Engineer & Hackathon Addict"
                  className="w-full px-4 py-3 rounded-xl border-2 border-[#1d1a24] bg-[#fef7ff] font-['Inter'] focus:outline-none focus:ring-2 focus:ring-[#630ed4] transition-shadow"
                />
              </div>

              {/* Bio */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="bio" className="block font-['Space_Grotesk'] font-semibold text-sm">
                    Bio
                  </label>
                  <span className={`text-xs font-['JetBrains_Mono'] ${form.bio.length > 280 ? 'text-[#ba1a1a]' : 'text-[#7b7487]'}`}>
                    {form.bio.length}/280
                  </span>
                </div>
                <textarea
                  id="bio"
                  name="bio"
                  rows={4}
                  value={form.bio}
                  onChange={handleChange}
                  placeholder="Tell squads what you build and what you're into..."
                  className={`w-full px-4 py-3 rounded-xl border-2 bg-[#fef7ff] font-['Inter'] resize-none focus:outline-none focus:ring-2 focus:ring-[#630ed4] transition-shadow ${
                    errors.bio ? 'border-[#ba1a1a]' : 'border-[#1d1a24]'
                  }`}
                />
                {errors.bio && <p className="text-[#ba1a1a] text-sm font-['JetBrains_Mono'] mt-1">{errors.bio}</p>}
              </div>

              {/* Location */}
              <div>
                <label htmlFor="location" className="block font-['Space_Grotesk'] font-semibold text-sm mb-2">
                  Location
                </label>
                <input
                  id="location"
                  name="location"
                  type="text"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="Bengaluru, India"
                  className="w-full px-4 py-3 rounded-xl border-2 border-[#1d1a24] bg-[#fef7ff] font-['Inter'] focus:outline-none focus:ring-2 focus:ring-[#630ed4] transition-shadow"
                />
              </div>

              <div className="h-px bg-[#e8dfee]"></div>

              {/* Links */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="github" className="block font-['Space_Grotesk'] font-semibold text-sm mb-2">
                    GitHub
                  </label>
                  <input
                    id="github"
                    name="github"
                    type="text"
                    value={form.github}
                    onChange={handleChange}
                    placeholder="github.com/username"
                    className="w-full px-4 py-3 rounded-xl border-2 border-[#1d1a24] bg-[#fef7ff] font-['JetBrains_Mono'] text-sm focus:outline-none focus:ring-2 focus:ring-[#630ed4] transition-shadow"
                  />
                </div>
                <div>
                  <label htmlFor="website" className="block font-['Space_Grotesk'] font-semibold text-sm mb-2">
                    Website
                  </label>
                  <input
                    id="website"
                    name="website"
                    type="text"
                    value={form.website}
                    onChange={handleChange}
                    placeholder="yourname.dev"
                    className="w-full px-4 py-3 rounded-xl border-2 border-[#1d1a24] bg-[#fef7ff] font-['JetBrains_Mono'] text-sm focus:outline-none focus:ring-2 focus:ring-[#630ed4] transition-shadow"
                  />
                </div>
              </div>

              <div className="h-px bg-[#e8dfee]"></div>

              {/* Skills */}
              <div>
                <label htmlFor="skills" className="block font-['Space_Grotesk'] font-semibold text-sm mb-2">
                  Skills <span className="text-[#7b7487] font-normal">(up to 10)</span>
                </label>
                <div className="relative">
                  <div className="w-full min-h-[52px] px-3 py-2 rounded-xl border-2 border-[#1d1a24] bg-[#fef7ff] flex flex-wrap gap-2 items-center focus-within:ring-2 focus-within:ring-[#630ed4] transition-shadow">
                    {form.skills.map((skill) => (
                      <span
                        key={skill}
                        className="flex items-center gap-1 bg-[#d8e2ff] text-[#001a42] px-3 py-1 rounded-lg border-2 border-[#1d1a24] text-sm font-bold"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => removeSkill(skill)}
                          className="material-symbols-outlined text-sm hover:text-[#ba1a1a]"
                          aria-label={`Remove ${skill}`}
                        >
                          close
                        </button>
                      </span>
                    ))}
                    <input
                      id="skills"
                      type="text"
                      value={skillInput}
                      onChange={(e) => {
                        setSkillInput(e.target.value);
                        setShowSkillSuggestions(true);
                      }}
                      onFocus={() => setShowSkillSuggestions(true)}
                      onBlur={() => setTimeout(() => setShowSkillSuggestions(false), 150)}
                      onKeyDown={handleSkillKeyDown}
                      disabled={form.skills.length >= 10}
                      placeholder={form.skills.length >= 10 ? '' : 'Type a skill and press Enter'}
                      className="flex-1 min-w-[140px] bg-transparent focus:outline-none py-1 font-['Inter'] text-sm disabled:cursor-not-allowed"
                    />
                  </div>
                  {showSkillSuggestions && skillInput && filteredSuggestions.length > 0 && (
                    <div className="absolute z-10 mt-2 w-full bg-white border-2 border-[#1d1a24] rounded-xl shadow-[4px_4px_0px_0px_rgba(99,14,212,1)] overflow-hidden">
                      {filteredSuggestions.slice(0, 6).map((s) => (
                        <button
                          key={s}
                          type="button"
                          onMouseDown={() => addSkill(s)}
                          className="w-full text-left px-4 py-2 hover:bg-[#f3ebfa] font-['JetBrains_Mono'] text-sm"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  type="submit"
                  disabled={saving}
                  className="neobrutalist-shadow flex-1 bg-[#630ed4] text-white font-['Space_Grotesk'] text-lg px-8 py-3.5 rounded-xl border-2 border-[#1d1a24] shadow-[4px_4px_0px_0px_rgba(99,14,212,1)] font-semibold transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {saving ? 'Saving…' : 'Save Changes'}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="neobrutalist-shadow flex-1 bg-white text-[#1d1a24] font-['Space_Grotesk'] text-lg px-8 py-3.5 rounded-xl border-2 border-[#1d1a24] shadow-[4px_4px_0px_0px_rgba(99,14,212,1)] font-semibold transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

function EditProfileSkeleton() {
  return (
    <div className="bg-white p-8 rounded-3xl border-2 border-[#1d1a24] shadow-[4px_4px_0px_0px_rgba(99,14,212,1)] space-y-8 animate-pulse">
      <div className="flex items-center gap-6">
        <div className="w-24 h-24 rounded-2xl bg-[#e8dfee] border-4 border-[#1d1a24]"></div>
        <div className="h-10 w-40 bg-[#e8dfee] rounded-xl"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="h-12 bg-[#e8dfee] rounded-xl"></div>
        <div className="h-12 bg-[#e8dfee] rounded-xl"></div>
      </div>
      <div className="h-12 bg-[#e8dfee] rounded-xl"></div>
      <div className="h-24 bg-[#e8dfee] rounded-xl"></div>
    </div>
  );
}

// ----------------------------------------------------------------------
// Sub-Components (shared shell, matches Landing.jsx)
// ----------------------------------------------------------------------

function Navbar() {
  return (
    <nav className="bg-[#fef7ff] border-b-2 border-[#1d1a24] shadow-[4px_4px_0px_0px_rgba(99,14,212,1)] sticky top-0 z-50">
      <div className="flex justify-between items-center w-full px-8 py-4 max-w-full mx-auto">
        <div className="flex items-center gap-8">
          <Link className="font-['Space_Grotesk'] text-2xl text-[#630ed4] tracking-tighter font-bold" to="/">
            HackMate
          </Link>
          <div className="hidden md:flex gap-6">
            {['Discovery', 'Teams', 'Workspace'].map((link) => (
              <Link
                key={link}
                className="text-[#4a4455] font-medium hover:translate-y-[-2px] hover:translate-x-[-2px] transition-transform active:translate-y-0 active:translate-x-0"
                to={`/${link.toLowerCase()}`}
              >
                {link}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="material-symbols-outlined text-[#630ed4] p-2 border-2 border-[#1d1a24] rounded-lg shadow-[4px_4px_0px_0px_rgba(99,14,212,1)] bg-white hover:bg-[#e8dfee] transition-colors">
            notifications
          </button>
          <Link to="/profile" className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#1d1a24]">
            <img
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDKQPSOPEsH-uCSIgC_jCg3n-ONG2bW-Qu1OC6Ao0dhdEa_Wb85f0TVncYOJIg-vmAjgf2JhpUTWTctLmxVYJH1h9nKIrcRE824Mpu_JxQbWwhqIws610tYrwC9WRBsdpNHhebEEMN7DHP2OU88VnVMyYq4XpypF6Mqb-lWm7XnycekVbnwkvtz342wzXcIL8fI8Ba_vHNOJ6U9ucnnRflOrV10j2EPtH89lXoy6EiDYrg-dNh1BnZ"
              alt="Your avatar"
            />
          </Link>
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="bg-[#1d1a24] w-full mt-16 border-t-4 border-[#630ed4]">
      <div className="w-full py-6 px-8 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start gap-4">
          <span className="font-['Space_Grotesk'] text-2xl text-white font-bold">HackMate</span>
          <p className="font-['JetBrains_Mono'] text-sm text-[#e8dfee] max-w-sm text-center md:text-left">
            © 2024 HackMate. Built with ☕️ and 💻 by student builders.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          {['Privacy', 'Terms', 'API Docs', 'Support'].map((item) => (
            <Link
              key={item}
              className="font-['JetBrains_Mono'] text-sm text-[#e8dfee] hover:text-[#eaddff] transition-colors"
              to={`/${item.toLowerCase().replace(' ', '-')}`}
            >
              {item}
            </Link>
          ))}
        </div>
        <div className="flex gap-4">
          <button className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-white hover:bg-white hover:text-[#1d1a24] transition-colors">
            <span className="material-symbols-outlined text-sm">terminal</span>
          </button>
          <button className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-white hover:bg-white hover:text-[#1d1a24] transition-colors">
            <span className="material-symbols-outlined text-sm">groups</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
