import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Landing() {
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

  return (
    <div className="bg-[#fef7ff] text-[#1d1a24] font-['Inter'] min-h-screen selection:bg-[#eaddff] selection:text-[#25005a]">
      <Navbar />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <LiveChallengesSection />
        <WallOfFameSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}

// ----------------------------------------------------------------------
// Sub-Components
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
          <Link to="/register" className="hidden md:flex items-center gap-2 bg-[#630ed4] text-white px-6 py-2 rounded-lg border-2 border-[#1d1a24] shadow-[4px_4px_0px_0px_rgba(99,14,212,1)] font-bold hover:translate-y-[-2px] hover:translate-x-[-2px] transition-transform active:translate-y-0 active:translate-x-0">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>terminal</span>
            Start Hacking
          </Link>
        </div>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section className="relative px-8 py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-8">
          <div className="inline-block bg-[#2170e4] text-[#fefcff] font-['JetBrains_Mono'] px-4 py-1 rounded-full border-2 border-[#1d1a24] -rotate-3 text-sm font-medium">
            v2.0.4-stable is here 🚀
          </div>
          <h1 className="font-['Space_Grotesk'] text-5xl md:text-6xl text-[#630ed4] leading-none font-bold">
            Build the Future,<br />
            One Hackathon<br />
            at a Time.
          </h1>
          <p className="font-['Inter'] text-lg text-[#4a4455] max-w-lg">
            The ultimate playground for builders, designers, and dreamers. Join global squads, crush technical challenges, and turn your late-night side projects into the next big thing.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/register" className="bg-[#630ed4] text-white font-['Space_Grotesk'] text-xl px-10 py-4 rounded-xl border-2 border-[#1d1a24] shadow-[4px_4px_0px_0px_rgba(99,14,212,1)] font-semibold hover:translate-y-[-4px] hover:translate-x-[-4px] transition-all inline-block text-center">
              🚀 Start Hacking
            </Link>
            <Link to="/login" className="bg-[#fef7ff] text-[#1d1a24] font-['Space_Grotesk'] text-xl px-10 py-4 rounded-xl border-2 border-[#1d1a24] shadow-[4px_4px_0px_0px_rgba(99,14,212,1)] font-semibold hover:translate-y-[-4px] hover:translate-x-[-4px] transition-all inline-block text-center">
              Browse Teams
            </Link>
          </div>
        </div>

        {/* Playful Terminal Illustration */}
        <div className="flex-1 w-full max-w-2xl animate-[float_3s_ease-in-out_infinite]">
          <div className="bg-[#1d1a24] rounded-xl border-4 border-[#630ed4] p-1 shadow-[12px_12px_0px_0px_rgba(99,14,212,1)]">
            <div className="bg-[#1d1a24] p-3 flex gap-2 border-b border-[#7b7487]">
              <div className="w-3 h-3 rounded-full bg-[#ba1a1a]"></div>
              <div className="w-3 h-3 rounded-full bg-[#ffb784]"></div>
              <div className="w-3 h-3 rounded-full bg-[#2170e4]"></div>
              <span className="ml-4 font-['JetBrains_Mono'] text-xs text-[#7b7487]">hackmate --init</span>
            </div>
            <div className="p-6 font-['JetBrains_Mono'] text-white text-base space-y-2">
              <p className="text-[#adc6ff]">$ hackmate join-squad --id nebula-ai</p>
              <p className="text-[#e8dfee]">Checking credentials...</p>
              <p className="text-[#ffdcc6]">[SUCCESS] Squad joined! 5 members active.</p>
              <p className="text-[#adc6ff]">$ hackmate deploy --prod</p>
              <p className="text-[#e8dfee]">Building assets... [##########] 100%</p>
              <div className="h-4 w-full bg-[#4a4455] rounded-sm mt-4 border border-[#7b7487]">
                <div 
                  className="h-full w-[70%]" 
                  style={{
                    backgroundImage: 'linear-gradient(90deg, #FACC15 0%, #FACC15 70%, transparent 70%, transparent 100%)',
                    backgroundSize: '15px 100%'
                  }}
                ></div>
              </div>
              <p className="text-[#d2bbff] mt-4">&gt;&gt; Project "NeuroCore" is live at neuro-core.hackmate.io</p>
              <div className="pt-4 border-t border-[#7b7487] flex gap-4">
                <div className="w-12 h-12 bg-[#630ed4] rounded-lg border-2 border-white"></div>
                <div className="flex flex-col justify-center">
                  <span className="text-white font-bold">HackMate CLI v2.0</span>
                  <span className="text-xs text-[#7b7487]">Active Session: 03:42 AM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    {
      icon: 'search',
      bgIcon: 'bg-[#ffdcc6]',
      textIcon: 'text-[#301400]',
      title: '1. Find Your Fight',
      desc: 'Browse through hundreds of live hackathons from fintech to space-tech. Find the one that sparks your fire.',
      translate: ''
    },
    {
      icon: 'groups',
      bgIcon: 'bg-[#eaddff]',
      textIcon: 'text-[#25005a]',
      title: '2. Forge a Squad',
      desc: "Don't go alone. Use our matchmaking AI to find developers and designers who complement your skill set.",
      translate: 'md:translate-y-8'
    },
    {
      icon: 'rocket_launch',
      bgIcon: 'bg-[#d8e2ff]',
      textIcon: 'text-[#001a42]',
      title: '3. Ship & Win',
      desc: 'Build in our integrated workspaces, deploy with a click, and submit your project to win major prizes.',
      translate: ''
    }
  ];

  return (
    <section className="bg-[#f3ebfa] px-8 py-16 border-y-4 border-[#1d1a24]">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-['Space_Grotesk'] text-4xl mb-12 text-[#630ed4] text-center font-bold">How it Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <div 
              key={idx} 
              className={`bg-white p-8 rounded-3xl border-2 border-[#1d1a24] shadow-[4px_4px_0px_0px_rgba(99,14,212,1)] flex flex-col gap-6 ${step.translate}`}
            >
              <div className={`w-16 h-16 ${step.bgIcon} ${step.textIcon} rounded-xl flex items-center justify-center border-2 border-[#1d1a24]`}>
                <span className="material-symbols-outlined text-4xl">{step.icon}</span>
              </div>
              <h3 className="font-['Space_Grotesk'] text-2xl font-semibold">{step.title}</h3>
              <p className="text-[#4a4455] font-['Inter'] text-base">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LiveChallengesSection() {
  const challenges = [
    {
      title: 'EthGlobal Tokyo',
      prize: '$50,000',
      desc: 'Build the future of decentralized finance on the Ethereum network.',
      tags: ['Solidity', 'Web3'],
      badge: 'ENDING SOON',
      badgeBg: 'bg-[#7d3d00]',
      rotate: '-rotate-3',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBEvRBJJSpcc6ggAG9uh1WT7i43MzP-JYO2fa_M6Zja7-OesvSI-mkuQ5898TpvJFyTNBe1lZ-OXtO9zffVudECPKqCA5-UNtErlkYpuJxRNdbR7XXDDJ72mvWQe7q1BUkfqMSzqcTBhAxoWEFBPHYLhBwDsCKVvV8u1DUCAATNbMOJ2m0adT47OQU4cp11KsG82cmyLNG03OzNKoS_SYgQae0PwnolsYLyGqsrkrpv9C_muHEkjtJL'
    },
    {
      title: 'AI Forge 2024',
      prize: '$25,000',
      desc: 'Create transformative generative AI applications using the latest LLM models.',
      tags: ['Python', 'PyTorch'],
      badge: 'FEATURED',
      badgeBg: 'bg-[#2170e4]',
      rotate: 'rotate-3',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCEX2iZXYhLK0cJnidHVcbl7OIqB03UDvdD7RFaK7ZoOGY2WVQMpsNQ1nMgkSMSUYYqq26LHLYtoZMFFBtW61BmlGhCrrSs0gOvd1sU12d4P6kpYE1gk63iuGQQRnqMXi0vB_P9QvXJRqRBwER2DsFgN7JOUeQ4qfZUpByKnfdKM_6yTcWIVPE-m10QE6CsT07KdCL9QeVTyUg6bRN5xziZwnlB-KjCXTN-y9Xxng9t9EGFMjQ-Ww5M'
    },
    {
      title: 'Hacker Summer',
      prize: '$10,000',
      desc: 'A student-focused build-a-thon for open source contributions and web tools.',
      tags: ['React', 'Next.js'],
      badge: 'NEW',
      badgeBg: 'bg-[#004395]',
      rotate: '-rotate-3',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBzMEqDa-OkuFYwFF6RXGI8e1y-s0Bttgf6E47dMcrpglc4eYP9_7P0hsjjCKdNRvg2nOubs-qy1UhwpXBTV7osXvSa4FSNpN89_8r5OWdI5H9PsOW857fsAEwB8kbO1JbR_7q7tsN6La-cJQA2mhp4Vi6tzHoAmo-iq103k5TFp5cXSjzHN63zzRFnVKPs_R0ydfAHiTWanXRTD1oEJiO4gX1yZOpkwn5zNuPKDDpYWDvEOjBW1pe6'
    }
  ];

  return (
    <section className="px-8 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="font-['Space_Grotesk'] text-4xl text-[#630ed4] font-bold">Live Challenges</h2>
            <p className="font-['Inter'] text-lg text-[#4a4455]">Active arenas where the world is building right now.</p>
          </div>
          <Link className="hidden md:block font-['JetBrains_Mono'] text-[#630ed4] font-bold hover:underline" to="/discovery">
            View All Challenges →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {challenges.map((item, idx) => (
            <div key={idx} className="rounded-3xl border-2 border-[#1d1a24] overflow-hidden bg-white hover:scale-[1.02] transition-transform">
              <div className="h-48 relative overflow-hidden">
                <img className="w-full h-full object-cover" src={item.img} alt={item.title} />
                <div className={`absolute top-4 left-4 ${item.badgeBg} text-white px-3 py-1 rounded-full border-2 border-[#1d1a24] ${item.rotate} font-['Space_Grotesk'] text-xs font-bold tracking-wider`}>
                  {item.badge}
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-['Space_Grotesk'] text-2xl font-semibold">{item.title}</h3>
                  <span className="bg-[#e8dfee] px-3 py-1 border border-[#7b7487] rounded-lg font-['JetBrains_Mono'] text-xs">{item.prize}</span>
                </div>
                <p className="text-[#4a4455] text-base">{item.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map(tag => (
                    <span key={tag} className="bg-[#d8e2ff] text-[#001a42] px-2 py-1 rounded border border-[#1d1a24] text-xs font-bold">
                      {tag}
                    </span>
                  ))}
                </div>
                <Link to="/register" className="w-full py-3 bg-white text-[#1d1a24] border-2 border-[#1d1a24] rounded-xl font-bold shadow-[4px_4px_0px_0px_rgba(99,14,212,1)] hover:bg-[#f9f1ff] transition-colors inline-block text-center">
                  Join Challenge
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WallOfFameSection() {
  return (
    <section className="bg-[#1d1a24] text-white px-8 py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-['Space_Grotesk'] text-4xl text-[#d2bbff] font-bold">Wall of Fame</h2>
          <p className="font-['Inter'] text-lg text-[#7b7487]">Projects that started here and went to the moon.</p>
        </div>
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1 space-y-6">
            <div className="bg-[#332f39] border-2 border-[#d2bbff] p-8 rounded-3xl shadow-[4px_4px_0px_0px_rgba(99,14,212,1)] -rotate-3">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#630ed4]">
                  <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDKQPSOPEsH-uCSIgC_jCg3n-ONG2bW-Qu1OC6Ao0dhdEa_Wb85f0TVncYOJIg-vmAjgf2JhpUTWTctLmxVYJH1h9nKIrcRE824Mpu_JxQbWwhqIws610tYrwC9WRBsdpNHhebEEMN7DHP2OU88VnVMyYq4XpypF6Mqb-lWm7XnycekVbnwkvtz342wzXcIL8fI8Ba_vHNOJ6U9ucnnRflOrV10j2EPtH89lXoy6EiDYrg-dNh1BnZ" alt="User Profile" />
                </div>
                <div>
                  <h4 className="font-['Space_Grotesk'] text-xl text-white font-semibold">Project: HyperSync</h4>
                  <p className="text-[#d2bbff] text-sm font-['JetBrains_Mono']">Winner: Global Hack 2023</p>
                </div>
              </div>
              <p className="italic text-[#e8dfee]">
                "HackMate didn't just give us a platform, it gave us a community. We met our lead dev in the Team Discovery section, and 48 hours later, we had a prototype that secured our pre-seed funding."
              </p>
            </div>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-4">
            <div className="aspect-square bg-white rounded-2xl overflow-hidden border-2 border-[#1d1a24] rotate-3">
              <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCf0fugrCEAqrHvBWxRwzSKIqAXrn-9v8Bs3mkEHm8y861rugheo44Pgt1ssDbtN5fy3ccbW8rP6-uIx_mQHoBNlt6B1yB91IgsxAq97uNX-zgMQdpjvwNi7JocvHIocqFZdHT_rQE_wqeYMHobyqDs543q8CzkSH2N_VZVOPH0pud4_AMSCUnX2zht233rZQ2WjC-VzYUxaonUB6OIw_FGWAyFylwl_rOS5-ZUTOAtr9tSQbVCrO11" alt="HyperSync Logo" />
            </div>
            <div className="aspect-square bg-white rounded-2xl overflow-hidden border-2 border-[#1d1a24] translate-y-8">
              <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1ruram-1Td80yJmBKU9-G2JX-wDPogBkuVaQ8w2QjLtpHR-B7xGLPPcAT7vWjH64RnlmOB6-17C6FNNJsD4LXNlQTx28EPM7nOw3D9n4NoruFwY5qZaoCc2rybEkgHpLjM8lNOjiV3L2fzKIT-B9l3TRlr6qXHPNEM-lU1-tIe8HMLFiVH-x2RBBfKYqZUIZFVohVeyf4vPg_D7hgzygqWt25z3sUHQB1LxA0Eafcw9yDqjI8AU5W" alt="Hacker Celebration" />
            </div>
            <div className="aspect-square bg-white rounded-2xl overflow-hidden border-2 border-[#1d1a24] -rotate-3">
              <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCa3lvIzpBon1Mo6nvQFKTbS2SlPkcfAPkUDirywLqYiiVYGI9wjdcA_6YDz75_L0ETmOGupxiMcxN4FYetbUNcfPdv3fLhPfkn2ZcwQA_QULvsL6BB_TaTA6HNND3lU0U6N8WRwoaIsdjxCkK8yiE6tPMkMjAurMJLcSOj1IFu7CIzW7xGbRm5bLfj6LtOCokkm_-kqw-PV1C5o0qe-9QNPZbcNR3rmCgTZ3_AtRKxfzmcrbyst-22" alt="Trophy Asset" />
            </div>
            <div className="aspect-square bg-white rounded-2xl overflow-hidden border-2 border-[#1d1a24]">
              <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBaulZAAxuYetYyiEZPvSu3vRgXBB3w-aCa6zWfxEn2bGIhMd93iaZHz31Oj7FUw9RngfIkK9g7NOkYOUW3dum5z6DYaYH-Sp1ZPl8qna0UhAlipKiA1MapMdgKUl2wfmRGcTEccaoWVU7qOgmxjhVyfDJdOys95MHB4M2CNW4I6XonPFg5N3KcmBtoRB3Gdv5tW589BZ-3P1_VQkZmFlTqcXtSVTKH4J5CJGkQO69jAuufagO9m8zC" alt="IDE Editor" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="px-8 py-16">
      <div className="max-w-4xl mx-auto bg-[#630ed4] text-white p-12 rounded-[3rem] border-4 border-[#1d1a24] shadow-[4px_4px_0px_0px_rgba(99,14,212,1)] text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        <h2 className="font-['Space_Grotesk'] text-4xl mb-6 relative z-10 font-bold">Ready to build something legendary?</h2>
        <p className="font-['Inter'] text-lg text-[#eaddff] mb-8 relative z-10">Join 50,000+ builders already building the future on HackMate.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
          <Link to="/register" className="bg-white text-[#630ed4] font-['Space_Grotesk'] text-xl px-12 py-4 rounded-xl border-2 border-[#1d1a24] shadow-[4px_4px_0px_0px_rgba(99,14,212,1)] font-semibold hover:translate-y-[-4px] hover:translate-x-[-4px] transition-all inline-block text-center">
            Create Your Profile
          </Link>
          <Link to="/login" className="bg-[#1d1a24] text-white font-['Space_Grotesk'] text-xl px-12 py-4 rounded-xl border-2 border-[#eaddff] shadow-[4px_4px_0px_0px_rgba(99,14,212,1)] font-semibold hover:translate-y-[-4px] hover:translate-x-[-4px] transition-all inline-block text-center">
            Explore Hackathons
          </Link>
        </div>
      </div>
    </section>
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
            <Link key={item} className="font-['JetBrains_Mono'] text-sm text-[#e8dfee] hover:text-[#eaddff] transition-colors" to={`/${item.toLowerCase().replace(' ', '-')}`}>
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