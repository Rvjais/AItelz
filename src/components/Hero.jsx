import { useState, useEffect, useRef } from 'react';
import './Hero.css';
import arushiVoice from '../assets/Voices/arushiVoice.aac';
import imranVoice from '../assets/Voices/imranVoice.aac';
import nehaVoice from '../assets/Voices/nehaVoice.aac';
import riyaVoice from '../assets/Voices/riyaVoice.aac';
import vikramVoice from '../assets/Voices/vikramVoice.aac';

const voiceSamples = [
  arushiVoice,
  imranVoice,
  nehaVoice,
  riyaVoice,
  vikramVoice
];

const Hero = () => {
  const [displayValue, setDisplayValue] = useState('+91 ');
  const [callState, setCallState] = useState('dialing'); // dialing, connecting, calling
  const [callSeconds, setCallSeconds] = useState(0);
  const [activeKey, setActiveKey] = useState(null);
  const [isBackspaceVisible, setIsBackspaceVisible] = useState(false);
  const [executionId, setExecutionId] = useState(null);

  // Audio state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVoiceIndex, setCurrentVoiceIndex] = useState(null);
  const audioRef = useRef(null);

  // Timer ref
  const timerRef = useRef(null);
  const pollTimerRef = useRef(null);
  const phoneRef = useRef(null);
  const callStateRef = useRef('dialing'); // keep in sync to avoid stale closure in polling

  const handlePhoneMouseMove = (e) => {
    const el = phoneRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);   // -1 to +1
    const dy = (e.clientY - cy) / (rect.height / 2);  // -1 to +1
    const rotX = -dy * 16;  // tilt forward/back
    const rotY = dx * 12;   // tilt left/right
    el.style.transform = `translate(-50%, -50%) perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-8px)`;
    el.style.boxShadow = `0 50px 80px -15px rgba(0,0,0,0.5), 0 0 30px rgba(99,102,241,0.25)`;
  };

  const handlePhoneMouseLeave = () => {
    const el = phoneRef.current;
    if (!el) return;
    el.style.transform = 'translate(-50%, -50%)';
    el.style.boxShadow = '';
  };

  const formatTime = (totalSeconds) => {
    const min = Math.floor(totalSeconds / 60);
    const sec = totalSeconds % 60;
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  const handleDigitClick = (digit) => {
    if (displayValue.length < 15) {
      setDisplayValue(prev => prev + digit);
      setIsBackspaceVisible(true);
      setActiveKey(digit);
      setTimeout(() => setActiveKey(null), 150);
    }
  };

  const handleBackspace = () => {
    setDisplayValue(prev => {
      if (prev.length > 4) {
        const newValue = prev.slice(0, -1);
        if (newValue.length <= 4) setIsBackspaceVisible(false);
        return newValue;
      }
      return prev;
    });
    setActiveKey('Backspace');
    setTimeout(() => setActiveKey(null), 150);
  };

  // Keep callStateRef in sync
  callStateRef.current = callState;

  const handleCall = async () => {
    const stripped = displayValue.replace(/\s+/g, '');
    if (stripped.length < 13) return; // need at least +91 + 10 digits

    setCallState('connecting');

    try {
      const response = await fetch('https://api.bolna.ai/call', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_BOLNA_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          agent_id: import.meta.env.VITE_BOLNA_AGENT_ID || '90b201bc-f59d-46b4-8e4f-f1250edd3828',
          recipient_phone_number: stripped
        })
      });

      if (response.ok) {
        const data = await response.json();
        const execId = data.execution_id || data.run_id || data.id;
        setExecutionId(execId);

        // Start polling for call status
        pollTimerRef.current = setInterval(() => {
          checkCallStatus(execId);
        }, 2000);
      } else {
        const errText = await response.text();
        console.error('Bolna API error:', response.status, errText);
        setCallState('dialing');
      }
    } catch (error) {
      console.error('Call failed (network error):', error);
      setCallState('dialing');
    }
  };

  const checkCallStatus = async (execId) => {
    if (!execId) return;
    try {
      const response = await fetch(`https://api.bolna.ai/executions/${execId}`, {
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_BOLNA_API_KEY}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        const status = data.status || data.state;

        if (status === 'in-progress' || status === 'answered') {
          // Use ref to avoid stale closure
          if (callStateRef.current !== 'calling') {
            setCallState('calling');
            if (!timerRef.current) {
              timerRef.current = setInterval(() => {
                setCallSeconds(prev => prev + 1);
              }, 1000);
            }
          }
        } else if (['completed', 'call-disconnected', 'no-answer', 'busy', 'failed', 'canceled', 'balance-low'].includes(status)) {
          handleEndCall();
        }
      }
    } catch (error) {
      console.error('Polling failed:', error);
    }
  };

  const handleEndCall = () => {
    setCallState('dialing');
    setCallSeconds(0);
    setExecutionId(null);
    if (timerRef.current) clearInterval(timerRef.current);
    if (pollTimerRef.current) clearInterval(pollTimerRef.current);
  };

  const handlePlaySample = (index) => {
    if (currentVoiceIndex === index && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      const audio = new Audio(voiceSamples[index]);
      audioRef.current = audio;
      audio.play();
      setIsPlaying(true);
      setCurrentVoiceIndex(index);

      audio.onended = () => {
        setIsPlaying(false);
      };
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ignore key events if the user is typing in some specific input (though ours is readOnly)
      if (e.target.tagName === 'INPUT' && !e.target.readOnly) return;
      if (e.target.tagName === 'TEXTAREA') return;

      const key = e.key;

      if (/^[0-9*#]$/.test(key)) {
        e.preventDefault();
        handleDigitClick(key);
      } else if (key === 'Backspace') {
        e.preventDefault();
        handleBackspace();
      } else if (key === 'Enter') {
        e.preventDefault();
        handleCall();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (timerRef.current) clearInterval(timerRef.current);
      if (pollTimerRef.current) clearInterval(pollTimerRef.current);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [displayValue, callState]);

  const DialButton = ({ digit, sub, large }) => (
    <button
      onClick={() => handleDigitClick(digit)}
      className={`dial-btn w-[46px] h-[46px] mx-auto rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 text-white font-light transition-all flex flex-col items-center justify-center shadow-sm ${activeKey === digit ? 'bg-white/30' : ''} ${large ? 'text-[28px] pt-1.5' : 'text-[22px] leading-tight pt-0.5'}`}
    >
      {digit}
      {sub && <span className="text-[6.5px] font-medium text-slate-400 mt-0 leading-none tracking-[0.15em]">{sub}</span>}
    </button>
  );

  return (
    <section className="hero w-full relative flex flex-col items-center pt-32 pb-12 min-h-screen text-slate-900 selection:bg-blue-100 selection:text-blue-900 overflow-hidden" id="home">

      {/* ── TOP CONTENT AREA ── Hero headline ── */}
      <div className="w-full max-w-[1200px] mx-auto px-6 pb-4 z-30 relative min-h-[260px] flex flex-col items-center justify-center text-center">
        {/* Badge */}
        <div className="hero-badge">
          <span className="hero-badge-dot" />
          AI-Powered Voice Calls
        </div>
        {/* Headline */}
        <h1 className="hero-headline">
          Talk to your customers<br />
          <span className="hero-headline-accent">without lifting a finger</span>
        </h1>
        {/* Sub-headline */}
        <p className="hero-subtext">
          <span className="hero-subtext-brand">AItelz</span> automates{' '}
          <span className="hero-subtext-highlight">inbound &amp; outbound calls</span>{' '}
          with <span className="hero-subtext-highlight">human-like AI voice agents</span> —{' '}
          so your team focuses on what matters most.
        </p>
      </div>

      <div className="relative w-full max-w-[1200px] h-[450px] md:h-[504px] mx-auto">

        {/* SVG Connecting Lines Layer */}
        <svg className="desktop-only absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f87171" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#a855f7" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          {/* LEFT SIDE MAIN PATHS */}
          <path className="diagram-path" d="M 220 50 L 330 50 Q 350 50 350 70 L 350 140 Q 350 160 370 160 L 460 160" />
          <path className="diagram-path" d="M 180 220 L 320 220 Q 340 220 340 230 L 340 240 Q 340 250 360 250 L 440 250" />
          <path className="diagram-path" d="M 260 310 L 440 310" />
          <path className="diagram-path" d="M 210 440 L 320 440 Q 340 440 340 420 L 340 390 Q 340 370 360 370 L 450 370" />
          <path className="diagram-path" d="M 280 560 L 340 560 Q 360 560 360 540 L 360 490 Q 360 470 380 470 L 460 470" />

          {/* Glowing Animated Trails - Left */}
          <path className="diagram-path-glow flow-right delay-1" d="M 220 50 L 330 50 Q 350 50 350 70 L 350 140 Q 350 160 370 160 L 460 160" />
          <path className="diagram-path-glow flow-right delay-2" d="M 180 220 L 320 220 Q 340 220 340 230 L 340 240 Q 340 250 360 250 L 440 250" />
          <path className="diagram-path-glow flow-right delay-3" d="M 260 310 L 440 310" />
          <path className="diagram-path-glow flow-right delay-4" d="M 210 440 L 320 440 Q 340 440 340 420 L 340 390 Q 340 370 360 370 L 450 370" />
          <path className="diagram-path-glow flow-right delay-5" d="M 280 560 L 340 560 Q 360 560 360 540 L 360 490 Q 360 470 380 470 L 460 470" />

          {/* RIGHT SIDE MAIN PATHS */}
          <path className="diagram-path" d="M 900 48 L 840 48 Q 820 48 820 68 L 820 120 Q 820 140 800 140 L 730 140" />
          <path className="diagram-path" d="M 960 120 L 860 120 Q 840 120 840 140 L 840 180 Q 840 200 820 200 L 730 200" />
          <path className="diagram-path" d="M 900 468 L 840 468 Q 820 468 820 448 L 820 400 Q 820 380 800 380 L 730 380" />
          <path className="diagram-path" d="M 984 528 L 880 528 Q 860 528 860 500 L 860 450 Q 860 430 840 430 L 730 430" />
          <path className="diagram-path" d="M 864 576 L 820 576 Q 800 576 800 556 L 800 490 Q 800 470 780 470 L 730 470" />

          {/* Glowing Animated Trails - Right */}
          <path className="diagram-path-glow flow-left delay-2" d="M 900 48 L 840 48 Q 820 48 820 68 L 820 120 Q 820 140 800 140 L 730 140" />
          <path className="diagram-path-glow flow-left delay-4" d="M 960 120 L 860 120 Q 840 120 840 140 L 840 180 Q 840 200 820 200 L 730 200" />
          <path className="diagram-path-glow flow-left delay-1" d="M 900 468 L 840 468 Q 820 468 820 448 L 820 400 Q 820 380 800 380 L 730 380" />
          <path className="diagram-path-glow flow-left delay-5" d="M 984 528 L 880 528 Q 860 528 860 500 L 860 450 Q 860 430 840 430 L 730 430" />
          <path className="diagram-path-glow flow-left delay-3" d="M 864 576 L 820 576 Q 800 576 800 556 L 800 490 Q 800 470 780 470 L 730 470" />
        </svg>

        {/* Faded Background Features - desktop only */}
        <div className="bg-faded-element desktop-only" style={{ top: '5%', left: '8%' }}>Deepgram ASR</div>
        <div className="bg-faded-element desktop-only" style={{ top: '22%', left: '5%' }}>ElevenLabs TTS</div>
        <div className="bg-faded-element desktop-only" style={{ top: '48%', left: '2%' }}>{'< 500ms Latency'}</div>
        <div className="bg-faded-element desktop-only" style={{ top: '65%', left: '7%' }}>Local Numbers</div>
        <div className="bg-faded-element desktop-only" style={{ top: '78%', left: '12%' }}>Toll-Free &amp; SIP</div>
        <div className="bg-faded-element desktop-only" style={{ top: '92%', left: '8%' }}>Auto-Retries</div>
        <div className="bg-faded-element desktop-only" style={{ top: '95%', left: '20%' }}>Custom Voices</div>

        <div className="bg-faded-element desktop-only" style={{ top: '4%', right: '18%' }}>Salesforce</div>
        <div className="bg-faded-element desktop-only" style={{ top: '15%', right: '5%' }}>HubSpot</div>
        <div className="bg-faded-element desktop-only" style={{ top: '28%', right: '12%' }}>SMS Fallback</div>
        <div className="bg-faded-element desktop-only" style={{ top: '71%', right: '25%' }}>Agent Handoff</div>
        <div className="bg-faded-element desktop-only" style={{ top: '80%', right: '8%' }}>IVR Menus</div>
        <div className="bg-faded-element desktop-only" style={{ top: '90%', right: '20%' }}>Webhooks &amp; API</div>
        <div className="bg-faded-element desktop-only" style={{ top: '97%', right: '5%' }}>Live Transcripts</div>

        {/* FOREGROUND NODES - LEFT */}
        <div className="feature-node animated delay-1 desktop-only" style={{ top: '5%', left: '18.3%' }}>AI VOICE AGENTS</div>
        <div className="feature-node animated delay-2 desktop-only" style={{ top: '25%', left: '15%' }}>SMART ROUTING</div>
        <div className="feature-node animated delay-3 desktop-only" style={{ top: '45%', left: '21.6%' }}>PHONE NUMBERS</div>
        <div className="feature-node animated delay-4 desktop-only" style={{ top: '65%', left: '17.5%' }}>CAMPAIGN MGMT</div>
        <div className="feature-node animated delay-5 desktop-only" style={{ top: '83%', left: '23.3%' }}>VOICE CLONING</div>

        {/* FOREGROUND NODES - RIGHT */}
        <div className="feature-node animated delay-2 desktop-only" style={{ top: '5%', left: '75%' }}>CRM INTEGRATIONS</div>
        <div className="feature-node animated delay-4 desktop-only" style={{ top: '25%', left: '80%' }}>WHATSAPP AUTOMATION</div>
        <div className="feature-node animated delay-1 desktop-only" style={{ top: '45%', left: '75%' }}>LIVE CALL TRANSFER</div>
        <div className="feature-node animated delay-5 desktop-only" style={{ top: '63%', left: '81%' }}>POST-CALL ACTIONS</div>
        <div className="feature-node animated delay-3 desktop-only" style={{ top: '82%', left: '72%' }}>ANALYTICS &amp; MONITORING</div>

        {/* ── Mobile Marquee Rows — behind the phone, hidden on desktop ── */}
        <div className="md:hidden absolute inset-0 flex flex-col justify-around py-6 overflow-hidden z-5 pointer-events-none">
          {/* Row 1: slides left, fast */}
          <div className="overflow-hidden">
            <div className="marquee-row marquee-left">
              {['AI VOICE AGENTS', 'SMART ROUTING', 'PHONE NUMBERS', 'CAMPAIGN MGMT', 'VOICE CLONING', 'AI VOICE AGENTS', 'SMART ROUTING', 'PHONE NUMBERS', 'CAMPAIGN MGMT', 'VOICE CLONING'].map((l, i) => (
                <span key={i} className="marquee-node">{l}</span>
              ))}
            </div>
          </div>
          {/* Row 2: slides right, medium */}
          <div className="overflow-hidden">
            <div className="marquee-row marquee-right">
              {['CRM INTEGRATIONS', 'WHATSAPP AUTOMATION', 'LIVE CALL TRANSFER', 'POST-CALL ACTIONS', 'ANALYTICS & MONITORING', 'CRM INTEGRATIONS', 'WHATSAPP AUTOMATION', 'LIVE CALL TRANSFER', 'POST-CALL ACTIONS', 'ANALYTICS & MONITORING'].map((l, i) => (
                <span key={i} className="marquee-node">{l}</span>
              ))}
            </div>
          </div>
          {/* Row 3: slides left, slow */}
          <div className="overflow-hidden">
            <div className="marquee-row marquee-left-slow">
              {['VOICE CLONING', 'PHONE NUMBERS', 'ANALYTICS & MONITORING', 'SMART ROUTING', 'CRM INTEGRATIONS', 'VOICE CLONING', 'PHONE NUMBERS', 'ANALYTICS & MONITORING', 'SMART ROUTING', 'CRM INTEGRATIONS'].map((l, i) => (
                <span key={i} className="marquee-node">{l}</span>
              ))}
            </div>
          </div>
        </div>

        {/* CENTRAL PHONE MOCKUP */}
        <div
          ref={phoneRef}
          onMouseMove={handlePhoneMouseMove}
          onMouseLeave={handlePhoneMouseLeave}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-[216px] md:w-[234px] h-[450px] rounded-[2.5rem] bg-gradient-to-b from-slate-200 via-slate-400 to-slate-300 p-[3px] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5),_0_0_0_1px_rgba(0,0,0,0.05)] cursor-pointer"
          style={{ transition: 'transform 0.12s ease-out, box-shadow 0.3s ease' }}
        >

          {/* Physical Hardware Buttons */}
          <div className="absolute top-[80px] -left-[3px] w-[3px] h-6 bg-slate-300 rounded-l-md shadow-[inset_1px_0_1px_rgba(255,255,255,0.6)]"></div>
          <div className="absolute top-[120px] -left-[3px] w-[3px] h-10 bg-slate-300 rounded-l-md shadow-[inset_1px_0_1px_rgba(255,255,255,0.6)]"></div>
          <div className="absolute top-[170px] -left-[3px] w-[3px] h-10 bg-slate-300 rounded-l-md shadow-[inset_1px_0_1px_rgba(255,255,255,0.6)]"></div>
          <div className="absolute top-[130px] -right-[3px] w-[3px] h-12 bg-slate-300 rounded-r-md shadow-[inset_-1px_0_1px_rgba(255,255,255,0.6)]"></div>

          {/* Inner Black Glass Bezel */}
          <div className="w-full h-full bg-[#111111] rounded-[2.4rem] p-[7px] shadow-[inset_0_0_5px_rgba(0,0,0,1)] relative overflow-hidden flex flex-col items-center">

            {/* Inner Screen */}
            <div className="w-full h-full bg-[#0d1326] relative flex flex-col overflow-hidden rounded-[2rem]">

              {/* Screen Glass Glare/Reflection */}
              <div className="absolute top-0 right-0 w-[150%] h-[100%] bg-gradient-to-tr from-transparent via-white/5 to-transparent transform -rotate-12 translate-x-1/4 -translate-y-1/4 pointer-events-none z-30"></div>

              {/* Top Status Bar Area */}
              <div className="absolute top-0 w-full h-10 flex justify-between items-center px-5 z-40 text-white text-[11px] font-semibold pointer-events-none tracking-wide">
                <span className="mt-1">9:41</span>
                <div className="flex space-x-1.5 items-center mt-1">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-2h2v2zm0-4h-2V7h2v6z" /></svg>
                  <svg className="w-[16px] h-[16px]" fill="currentColor" viewBox="0 0 24 24"><path d="M15.5 14.5c0-2.8 2.2-5 5-5 .36 0 .71.04 1.05.11L23.64 7c-.45-.34-4.93-4-11.64-4C5.28 3 .81 6.66.36 7l11.63 14.49.01.01.01-.01 3.49-4.35V14.5z" /></svg>
                  <div className="w-5 h-2.5 border border-white/80 rounded-[3px] p-[1px] relative flex items-center">
                    <div className="h-full bg-white rounded-[1.5px]" style={{ width: '80%' }}></div>
                    <div className="absolute -right-[2px] top-1/2 -translate-y-1/2 w-[2px] h-1 bg-white/80 rounded-r-[1.5px]"></div>
                  </div>
                </div>
              </div>

              {/* Realistic Dynamic Island */}
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-[66px] h-[20px] bg-black rounded-full z-40 flex items-center px-1.5 justify-end shadow-[inset_0px_1px_2px_rgba(255,255,255,0.15)]">
                <div className="w-2 h-2 rounded-full bg-[#0a0a2a] flex items-center justify-center mr-0.5 shadow-[inset_0px_0px_3px_rgba(255,255,255,0.3)]">
                  <div className="w-1 h-1 rounded-full bg-blue-900/60 blur-[0.5px]"></div>
                </div>
              </div>

              {/* Background Mesh/Glow inside phone */}
              <div className="absolute inset-0 z-0 opacity-40" style={{ background: 'radial-gradient(circle at top right, #3b82f6 0%, transparent 50%), radial-gradient(circle at bottom left, #8b5cf6 0%, transparent 50%)', mixBlendMode: 'screen' }}></div>

              {/* 1. DIALER UI SCREEN */}
              <div className={`absolute inset-0 flex flex-col justify-end pb-4 z-20 transition-all duration-500 transform ${callState === 'dialing' ? 'translate-y-0 opacity-100 pointer-events-auto' : '-translate-y-8 opacity-0 pointer-events-none'}`}>

                {/* Number Display */}
                <div className="h-10 flex items-center justify-center mb-2 px-2 mt-auto">
                  <input type="text" className="w-full bg-transparent text-center text-white text-[20px] font-light tracking-wider focus:outline-none placeholder-slate-600 truncate" value={displayValue} readOnly />
                </div>

                {/* Elegant Dialpad */}
                <div className="grid grid-cols-3 gap-y-2 gap-x-3 mb-4 mx-auto">
                  <DialButton digit="1" />
                  <DialButton digit="2" sub="ABC" />
                  <DialButton digit="3" sub="DEF" />
                  <DialButton digit="4" sub="GHI" />
                  <DialButton digit="5" sub="JKL" />
                  <DialButton digit="6" sub="MNO" />
                  <DialButton digit="7" sub="PQRS" />
                  <DialButton digit="8" sub="TUV" />
                  <DialButton digit="9" sub="WXYZ" />
                  <DialButton digit="*" large={true} />
                  <DialButton digit="0" sub="+" />
                  <DialButton digit="#" />
                </div>

                {/* Dialer Controls */}
                <div className="flex justify-between items-center px-4 w-full pb-0">
                  <div className="w-[50px]"></div> {/* Spacer */}

                  {/* Premium Call Button */}
                  <button onClick={handleCall} className="relative w-[56px] h-[56px] rounded-full bg-gradient-to-b from-[#34d399] to-[#059669] flex items-center justify-center text-white transition-all transform hover:scale-[1.03] active:scale-95 shadow-[0_10px_20px_rgba(16,185,129,0.3),inset_0_2px_4px_rgba(255,255,255,0.4)]">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" /></svg>
                  </button>

                  {/* Backspace */}
                  <button onClick={handleBackspace} className={`w-[50px] h-[50px] flex items-center justify-center text-slate-400 hover:text-white transition-all active:scale-90 ${isBackspaceVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} ${activeKey === 'Backspace' ? 'scale-90 text-white' : ''}`}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z"></path></svg>
                  </button>
                </div>
              </div>

              {/* 2. ACTIVE CALL SCREEN */}
              <div className={`absolute inset-0 flex flex-col z-20 pt-16 pb-8 transition-all duration-500 transform ${(callState === 'calling' || callState === 'connecting') ? 'translate-y-0 opacity-100 pointer-events-auto' : 'translate-y-8 opacity-0 pointer-events-none'}`}>

                {/* Main Call Content */}
                <div className="flex-grow flex flex-col items-center justify-center z-10 w-full mt-2">

                  {/* Glowing Avatar */}
                  <div className="relative w-20 h-20 mb-4">
                    <div className="absolute inset-0 bg-blue-500 rounded-full animate-pulse-ring z-0"></div>
                    <div className="relative w-full h-full bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center border-[2px] border-[#0d1326] shadow-xl z-10">
                      <span className="text-white text-2xl font-extrabold tracking-tighter">A</span>
                    </div>
                  </div>

                  {/* Caller Info */}
                  <h2 className="text-lg font-semibold text-white tracking-wide mb-1">AItelz Voice</h2>

                  {callState === 'connecting' ? (
                    <p className="text-slate-300 font-medium mb-6 text-sm animate-pulse">
                      Connecting...
                    </p>
                  ) : (
                    <>
                      <p className="text-slate-300 font-medium mb-6 text-sm">
                        {formatTime(callSeconds)}
                      </p>

                      {/* Voice Equalizer */}
                      <div className="flex items-end justify-center gap-[3px] h-8 mb-2" style={{ transform: 'scale(0.8)', transformOrigin: 'bottom center' }}>
                        <div className="w-1.5 h-full bg-blue-500 rounded-full animate-eq eq-1 shadow-[0_0_8px_rgba(59,130,246,0.6)]"></div>
                        <div className="w-1.5 h-full bg-indigo-400 rounded-full animate-eq eq-2 shadow-[0_0_8px_rgba(129,140,248,0.6)]"></div>
                        <div className="w-2 h-full bg-white rounded-full animate-eq eq-3 shadow-[0_0_8px_rgba(255,255,255,0.8)]"></div>
                        <div className="w-1.5 h-full bg-blue-400 rounded-full animate-eq eq-4 shadow-[0_0_8px_rgba(96,165,250,0.6)]"></div>
                        <div className="w-1.5 h-full bg-indigo-400 rounded-full animate-eq eq-5 shadow-[0_0_8px_rgba(129,140,248,0.6)]"></div>
                      </div>
                      <p className="text-slate-400 text-[9px] uppercase tracking-[0.1em] font-semibold">Active Agent</p>
                    </>
                  )}
                </div>

                {/* Call Controls */}
                <div className="w-full px-6 z-10 flex justify-between items-center mt-auto">
                  {/* Mute */}
                  <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all shadow-sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg>
                  </button>

                  {/* End Call */}
                  <button onClick={handleEndCall} className="relative w-[56px] h-[56px] rounded-full bg-gradient-to-b from-[#fb7185] to-[#e11d48] flex items-center justify-center text-white transition-all transform hover:scale-[1.03] active:scale-95 shadow-[0_10px_20px_rgba(225,29,72,0.3),inset_0_2px_4px_rgba(255,255,255,0.4)]">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" style={{ transform: 'rotate(135deg)' }}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                  </button>

                  {/* Speaker */}
                  <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all shadow-sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5 10.5a2.5 2.5 0 00-2.5 2.5v.5a2.5 2.5 0 002.5 2.5h3l4 4v-13l-4 4H5z"></path></svg>
                  </button>
                </div>
              </div>

              {/* Bottom Home Screen Indicator */}
              <div className="absolute bottom-2.5 left-1/2 transform -translate-x-1/2 w-15 h-1 bg-white/40 rounded-full z-40 backdrop-blur-sm"></div>
            </div>
          </div>
        </div>

      </div>

      {/* Audio Sample Buttons - Voice Demos Card - anchored to section bottom-right */}
      <div className="md:absolute md:bottom-6 md:right-6 relative mt-6 mx-auto md:mx-0 md:mt-0 z-[50] w-[320px] flex flex-col pb-6 md:pb-0">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-[0_15px_30px_-10px_rgba(0,0,0,0.15)] border border-slate-100 flex flex-col">

          {/* Card Header */}
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-base font-bold text-slate-800 tracking-tight">Voice Demos</h3>
            <div className="flex gap-1.5 hidden sm:flex">
              <button className="w-6 h-6 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-200 transition-colors">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button className="w-6 h-6 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-200 transition-colors">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>

          {/* Voice Avatars Row */}
          <div className="flex justify-between items-center gap-1.5 mb-3 px-1">
            {voiceSamples.map((sample, index) => {
              let rawName = sample.split('/').pop().split('.')[0];
              let finalName = rawName.replace(/Voice$/i, '');
              finalName = finalName.charAt(0).toUpperCase() + finalName.slice(1);

              const isActive = currentVoiceIndex === index && isPlaying;

              return (
                <div key={index} className="flex flex-col items-center gap-1.5">
                  <button
                    onClick={() => handlePlaySample(index)}
                    className={`w-[42px] h-[42px] rounded-full flex items-center justify-center transition-all ${isActive
                      ? 'bg-gradient-to-br from-[#8ba1e0] to-[#1e3a8a] text-white shadow-md shadow-blue-900/20 transform scale-110'
                      : 'bg-[#f0f4ff] text-slate-500 hover:bg-[#e0e7ff] hover:text-slate-700'
                      }`}
                  >
                    {isActive ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="ml-0.5">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    )}
                  </button>
                  <span className={`text-[10px] sm:text-[11px] font-medium leading-none ${isActive ? 'text-slate-900' : 'text-slate-400'}`}>
                    {finalName}
                  </span>
                </div>
              )
            })}
          </div>

          {/* Active Status Footer */}
          <div className="flex justify-between items-center mt-auto pt-2 border-t border-slate-100/80">
            <span className="text-slate-500 text-[11px]">
              {isPlaying ? 'Listening to:' : 'Select a voice'}
            </span>
            {isPlaying && currentVoiceIndex !== null && (
              <span className="text-blue-700 font-bold text-[11px] bg-blue-50 px-2.5 py-0.5 rounded-full">
                {(() => {
                  let rawName = voiceSamples[currentVoiceIndex].split('/').pop().split('.')[0];
                  let cleanName = rawName.replace(/Voice$/i, '');
                  return cleanName.charAt(0).toUpperCase() + cleanName.slice(1);
                })()}
              </span>
            )}
          </div>

        </div>
      </div>

    </section>
  );
};

export default Hero;
