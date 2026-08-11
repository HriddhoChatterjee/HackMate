import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function Profile() {
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

  const { username } = useParams();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Replace with real fetch, e.g.:
    // fetch(`/api/users/${username || 'me'}`).then(r => r.json()).then(setUser).finally(() => setLoading(false));
    const timer = setTimeout(() => {
      setUser({
        name: 'Ada Lovelace',
        handle: username || 'adalovelace',
        title: 'Full-Stack Engineer & Hackathon Addict',
        bio: "Building weird little tools at 2am. Winner of 3 hackathons, loser of many more. Currently obsessed with generative AI and analog synths.",
        location: 'Bengaluru, India',
        avatar:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuBDKQPSOPEsH-uCSIgC_jCg3n-ONG2bW-Qu1OC6Ao0dhdEa_Wb85f0TVncYOJIg-vmAjgf2JhpUTWTctLmxVYJH1h9nKIrcRE824Mpu_JxQbWwhqIws610tYrwC9WRBsdpNHhebEEMN7DHP2OU88VnVMyYq4XpypF6Mqb-lWm7XnycekVbnwkvtz342wzXcIL8fI8Ba_vHNOJ6U9ucnnRflOrV10j2EPtH89lXoy6EiDYrg-dNh1BnZ',
        stats: { hackathons: 12, wins: 3, teams: 7, followers: 284 },
        skills: ['React', 'Node.js', 'Python', 'PyTorch', 'Solidity', 'Figma'],
        links: {
          github: 'github.com/adalovelace',
          website: 'adalovelace.dev',
        },
        projects: [
          {
            title: 'NeuroCore',
            desc: 'Real-time collaborative AI whiteboard for remote teams.',
            tags: ['React', 'WebRTC'],
            badge: 'WINNER',
            badgeBg: 'bg-[#0a7c3a]',
            img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCf0fugrCEAqrHvBWxRwzSKIqAXrn-9v8Bs3mkEHm8y861rugheo44Pgt1ssDbtN5fy3ccbW8rP6-uIx_mQHoBNlt6B1yB91IgsxAq97uNX-zgMQdpjvwNi7JocvHIocqFZdHT_rQE_wqeYMHobyqDs543q8CzkSH2N_VZVOPH0pud4_AMSCUnX2zht233rZQ2WjC-VzYUxaonUB6OIw_FGWAyFylwl_rOS5-ZUTOAtr9tSQbVCrO11',
          },
          {
            title: 'HyperSync',
            desc: 'Latency-free state sync engine for multiplayer web apps.',
            tags: ['TypeScript', 'CRDT'],
            badge: 'FEATURED',
            badgeBg: 'bg-[#2170e4]',
            img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCEX2iZXYhLK0cJnidHVcbl7OIqB03UDvdD7RFaK7ZoOGY2WVQMpsNQ1nMgkSMSUYYqq26LHLYtoZMFFBtW61BmlGhCrrSs0gOvd1sU12d4P6kpYE1gk63iuGQQRnqMXi0vB_P9QvXJRqRBwER2DsFgN7JOUeQ4qfZUpByKnfdKM_6yTcWIVPE-m10QE6CsT07KdCL9QeVTyUg6bRN5xziZwnlB-KjCXTN-y9Xxng9t9EGFMjQ-Ww5M',
          },
          {
            title: 'EchoForge',
            desc: 'Open-source toolkit for generative audio experiments.',
            tags: ['Python', 'PyTorch'],
            badge: 'NEW',
            badgeBg: 'bg-[#004395]',
            img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBzMEqDa-OkuFYwFF6RXGI8e1y-s0Bttgf6E47dMcrpglc4eYP9_7P0hsjjCKdNRvg2nOubs-qy1UhwpXBTV7osXvSa4FSNpN89_8r5OWdI5H9PsOW857fsAEwB8kbO1JbR_7q7tsN6La-cJQA2mhp4Vi6tzHoAmo-iq103k5TFp5cXSjzHN63zzRFnVKPs_R0ydfAHiTWanXRTD1oEJiO4gX1yZOpkwn5zNuPKDDpYWDvEOjBW1pe6',
          },
        ],
      });
      setLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [username]);

  const isOwnProfile = !username;

  return (
    <div className="bg-[#fef7ff] text-[#1d1a24] font-['Inter'] min-h-screen selection:bg-[#eaddff] selection:text-[#25005a]">
      <Navbar />
      <main className="px-8 py-16">
        {loading || !user ? (
          <ProfileSkeleton />
        ) : (
          <div className="max-w-5xl mx-auto space-y-12">
            {/* Header Card */}
            <div className="bg-white p-8 md:p-10 rounded-3xl border-2 border-[#1d1a24] shadow-[4px_4px_0px_0px_rgba(99,14,212,1)] relative overflow-hidden">
              <div
                className="absolute inset-0 opacity-[0.06] pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(circle, #630ed4 1px, transparent 1px)',
                  backgroundSize: '24px 24px',
                }}
              ></div>
              <div className="relative flex flex-col md:flex-row gap-8 items-start md:items-center">
                <div className="w-28 h-28 md:w-32 md:h-32 rounded-2xl overflow-hidden border-4 border-[#1d1a24] shadow-[4px_4px_0px_0px_rgba(99,14,212,1)] flex-shrink-0">
                  <img className="w-full h-full object-cover" src={user.avatar} alt={user.name} />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-1">
                    <h1 className="font-['Space_Grotesk'] text-3xl md:text-4xl font-bold text-[#1d1a24]">{user.name}</h1>
                    <span className="bg-[#eaddff] text-[#25005a] px-3 py-1 rounded-full border-2 border-[#1d1a24] font-['JetBrains_Mono'] text-xs font-bold">
                      @{user.handle}
                    </span>
                  </div>
                  <p className="text-[#630ed4] font-semibold mb-3">{user.title}</p>
                  <p className="text-[#4a4455] max-w-2xl mb-4">{user.bio}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-[#4a4455] font-['JetBrains_Mono']">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-base">location_on</span>
                      {user.location}
                    </span>
                    <a href={`https://${user.links.github}`} className="flex items-center gap-1 hover:text-[#630ed4]">
                      <span className="material-symbols-outlined text-base">code</span>
                      {user.links.github}
                    </a>
                    <a href={`https://${user.links.website}`} className="flex items-center gap-1 hover:text-[#630ed4]">
                      <span className="material-symbols-outlined text-base">link</span>
                      {user.links.website}
                    </a>
                  </div>
                </div>
                {isOwnProfile && (
                  <Link
                    to="/edit-profile"
                    className="neobrutalist-shadow flex items-center gap-2 bg-[#630ed4] text-white font-['Space_Grotesk'] px-6 py-3 rounded-xl border-2 border-[#1d1a24] shadow-[4px_4px_0px_0px_rgba(99,14,212,1)] font-semibold transition-all self-start"
                  >
                    <span className="material-symbols-outlined text-lg">edit</span>
                    Edit Profile
                  </Link>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Hackathons', value: user.stats.hackathons, icon: 'rocket_launch', bg: 'bg-[#ffdcc6]', text: 'text-[#301400]' },
                { label: 'Wins', value: user.stats.wins, icon: 'trophy', bg: 'bg-[#eaddff]', text: 'text-[#25005a]' },
                { label: 'Teams', value: user.stats.teams, icon: 'groups', bg: 'bg-[#d8e2ff]', text: 'text-[#001a42]' },
                { label: 'Followers', value: user.stats.followers, icon: 'favorite', bg: 'bg-[#ffdad4]', text: 'text-[#410001]' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white p-6 rounded-2xl border-2 border-[#1d1a24] shadow-[4px_4px_0px_0px_rgba(99,14,212,1)] flex flex-col gap-3"
                >
                  <div className={`w-10 h-10 ${stat.bg} ${stat.text} rounded-lg flex items-center justify-center border-2 border-[#1d1a24]`}>
                    <span className="material-symbols-outlined text-xl">{stat.icon}</span>
                  </div>
                  <div>
                    <p className="font-['Space_Grotesk'] text-2xl font-bold">{stat.value}</p>
                    <p className="text-[#4a4455] text-sm">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Skills */}
            <div>
              <h2 className="font-['Space_Grotesk'] text-2xl font-bold mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {user.skills.map((skill) => (
                  <span
                    key={skill}
                    className="bg-[#d8e2ff] text-[#001a42] px-3 py-1.5 rounded-lg border-2 border-[#1d1a24] text-sm font-bold"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Projects */}
            <div>
              <h2 className="font-['Space_Grotesk'] text-2xl font-bold mb-6">Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {user.projects.map((item, idx) => (
                  <div
                    key={idx}
                    className="rounded-3xl border-2 border-[#1d1a24] overflow-hidden bg-white hover:scale-[1.02] transition-transform"
                  >
                    <div className="h-40 relative overflow-hidden">
                      <img className="w-full h-full object-cover" src={item.img} alt={item.title} />
                      <div
                        className={`absolute top-4 left-4 ${item.badgeBg} text-white px-3 py-1 rounded-full border-2 border-[#1d1a24] font-['Space_Grotesk'] text-xs font-bold tracking-wider`}
                      >
                        {item.badge}
                      </div>
                    </div>
                    <div className="p-5 space-y-3">
                      <h3 className="font-['Space_Grotesk'] text-xl font-semibold">{item.title}</h3>
                      <p className="text-[#4a4455] text-sm">{item.desc}</p>
                      <div className="flex flex-wrap gap-2">
                        {item.tags.map((tag) => (
                          <span key={tag} className="bg-[#e8dfee] px-2 py-1 border border-[#7b7487] rounded font-['JetBrains_Mono'] text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

function ProfileSkeleton() {
  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-pulse">
      <div className="bg-white p-8 md:p-10 rounded-3xl border-2 border-[#1d1a24] shadow-[4px_4px_0px_0px_rgba(99,14,212,1)] flex flex-col md:flex-row gap-8 items-center">
        <div className="w-28 h-28 md:w-32 md:h-32 rounded-2xl bg-[#e8dfee] border-4 border-[#1d1a24] flex-shrink-0"></div>
        <div className="flex-1 space-y-3 w-full">
          <div className="h-8 bg-[#e8dfee] rounded w-1/3"></div>
          <div className="h-4 bg-[#e8dfee] rounded w-1/4"></div>
          <div className="h-4 bg-[#e8dfee] rounded w-2/3"></div>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border-2 border-[#1d1a24] h-28"></div>
        ))}
      </div>
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
