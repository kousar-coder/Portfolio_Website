import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Linkedin, Github, Mail } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

const AnimatedBlob = () => (
  <motion.svg
    className="absolute -top-20 left-1/2 -translate-x-1/2 z-0 opacity-40 blur-2xl select-none pointer-events-none"
    width="480" height="320" viewBox="0 0 480 320" fill="none"
    initial={{ scale: 0.95, rotate: 0 }}
    animate={{ scale: [0.95, 1.05, 0.95], rotate: [0, 8, -8, 0] }}
    transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
    aria-hidden="true"
  >
    <defs>
      <radialGradient id="blobGradient" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#181A1B" stopOpacity="0" />
      </radialGradient>
    </defs>
    <ellipse cx="240" cy="160" rx="200" ry="120" fill="url(#blobGradient)" />
  </motion.svg>
);

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const [hireMe, setHireMe] = useState(false);
  const [loadingHireMe, setLoadingHireMe] = useState(true);
  const [adminMode, setAdminMode] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    axios.get('/api/hireme').then(res => {
      setHireMe(res.data.hireMe);
      setLoadingHireMe(false);
    });
  }, []);

  const handleHireMeToggle = async () => {
    if (!isAuthenticated) return;
    const newStatus = !hireMe;
    setHireMe(newStatus);
    setLoadingHireMe(true);
    setAuthError('');
    try {
      await axios.post('/api/hireme', { hireMe: newStatus, password: adminPassword });
    } catch (err: any) {
      if (err.response && err.response.status === 401) {
        setAuthError('Incorrect admin password.');
        setIsAuthenticated(false);
      }
    } finally {
      setLoadingHireMe(false);
    }
  };

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setLoadingHireMe(true);
    try {
      await axios.post('/api/hireme', { hireMe, password: adminPassword });
      setIsAuthenticated(true);
      setAdminMode(false);
    } catch (err: any) {
      setAuthError('Incorrect admin password.');
      setIsAuthenticated(false);
    } finally {
      setLoadingHireMe(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Sending...');
    try {
      await axios.post('/api/contact', form);
      setStatus('Message sent!');
      setForm({ name: '', email: '', message: '' });
    } catch {
      setStatus('Failed to send.');
    }
  };

  return (
    <motion.section
      id="contact"
      ref={ref}
      className="w-full bg-[#181A1B] py-20 px-4 relative overflow-hidden"
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, ease: 'easeOut' }}
    >
      <AnimatedBlob />
      <div className="max-w-3xl mx-auto relative z-10">
        <h2 className="text-4xl font-extrabold mb-8 text-white">Get in Touch</h2>
        <form onSubmit={handleSubmit} className="space-y-6 bg-[#23272a] p-8 rounded-2xl shadow-xl mb-8">
          <div>
            <label className="block text-gray-300 mb-2 font-semibold" htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              className="w-full bg-[#181A1B] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/40 transition-all duration-200 hover:border-cyan-300 hover:shadow-cyan-400/10 hover:shadow"
              required
              autoComplete="name"
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2 font-semibold" htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              className="w-full bg-[#181A1B] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/40 transition-all duration-200 hover:border-cyan-300 hover:shadow-cyan-400/10 hover:shadow"
              required
              autoComplete="email"
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2 font-semibold" htmlFor="message">Message</label>
            <textarea
              name="message"
              id="message"
              placeholder="Message"
              value={form.message}
              onChange={handleChange}
              className="w-full bg-[#181A1B] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/40 transition-all duration-200 hover:border-cyan-300 hover:shadow-cyan-400/10 hover:shadow"
              rows={5}
              required
            />
          </div>
          <motion.button
            type="submit"
            className="w-full bg-cyan-700 text-white py-3 rounded-lg font-semibold shadow-lg hover:bg-cyan-500 focus:bg-cyan-500 transition-all focus:ring-2 focus:ring-cyan-400/40 outline-none ring-0"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            aria-label="Send Message"
          >
            Send Message
          </motion.button>
          {status && <div className="text-center text-sm mt-2">{status}</div>}
        </form>
        <div className="text-center text-gray-400 mb-6">Or connect with me on</div>
        <div className="flex flex-col items-center gap-3 mb-8">
          <a href="https://www.linkedin.com/in/kousar-saeed-65742124a/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-200 hover:text-cyan-400 text-lg font-medium"><Linkedin size={20}/> LinkedIn</a>
          <a href="https://github.com/kousar-coder" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-200 hover:text-cyan-400 text-lg font-medium"><Github size={20}/> GitHub</a>
          <a href="mailto:kousarsaeed.narejo@gmail.com" className="flex items-center gap-2 text-gray-200 hover:text-cyan-400 text-lg font-medium"><Mail size={20}/> Email</a>
        </div>
        <div className="flex items-center justify-between mt-8">
          <div className="text-gray-400 text-sm">
            <span className="font-semibold text-white">Hire Me</span><br />
            <span>Available for freelance and startup projects</span>
          </div>
          <div className="flex flex-col items-end">
            {!isAuthenticated && !adminMode && (
              <button onClick={() => setAdminMode(true)} className="mb-2 text-xs text-cyan-400 hover:underline">Admin Login</button>
            )}
            {adminMode && !isAuthenticated && (
              <form onSubmit={handleAdminLogin} className="flex items-center gap-2 mb-2">
                <input
                  type="password"
                  value={adminPassword}
                  onChange={e => setAdminPassword(e.target.value)}
                  placeholder="Admin Password"
                  className="px-2 py-1 rounded bg-[#181A1B] border border-gray-700 text-white text-xs focus:outline-none"
                  disabled={loadingHireMe}
                />
                <button type="submit" className="px-3 py-1 rounded bg-cyan-700 text-white text-xs font-semibold hover:bg-cyan-500 transition" disabled={loadingHireMe}>Login</button>
              </form>
            )}
            {authError && <div className="text-xs text-red-400 mb-1">{authError}</div>}
            <label className="inline-flex items-center cursor-pointer">
              <input type="checkbox" checked={hireMe} onChange={handleHireMeToggle} className="sr-only peer" disabled={!isAuthenticated || loadingHireMe} />
              <div className={`w-11 h-6 rounded-full peer transition-all duration-300 relative ${hireMe ? 'bg-cyan-700' : 'bg-gray-700'}`}>
                <div className={`absolute left-1 top-1 w-4 h-4 rounded-full transition-all duration-300 ${hireMe ? 'bg-white translate-x-5' : 'bg-gray-400'}`}></div>
              </div>
            </label>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact; 