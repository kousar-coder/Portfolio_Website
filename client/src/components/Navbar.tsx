import React, { useEffect, useState } from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import axios from 'axios';

const Navbar: React.FC = () => {
  const [hireMe, setHireMe] = useState(false);

  useEffect(() => {
    axios.get('/api/hireme').then(res => setHireMe(res.data.hireMe));
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full bg-black/80 backdrop-blur-sm border-b border-gray-800 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Name */}
          <div className="flex items-center gap-4">
            <div className="text-white font-bold text-xl">Kousar Saeed</div>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${hireMe ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-300'}`}>
              {hireMe ? 'Available for Hire' : 'Not Available'}
            </span>
          </div>
          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#about" className="text-gray-300 hover:text-white transition-colors">About</a>
            <a href="#projects" className="text-gray-300 hover:text-white transition-colors">Projects</a>
            <a href="#skills" className="text-gray-300 hover:text-white transition-colors">Skills</a>
            <a href="#experience" className="text-gray-300 hover:text-white transition-colors">Experience</a>
            <a href="#contact" className="text-gray-300 hover:text-white transition-colors">Contact</a>
          </div>
          {/* Social Icons */}
          <div className="flex items-center space-x-4">
            <a href="https://github.com/kousar-coder" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
              <Github size={20} />
            </a>
            <a href="https://www.linkedin.com/in/kousar-saeed-65742124a/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
              <Linkedin size={20} />
            </a>
            <a href="mailto:kousarsaeed.narejo@gmail.com" className="text-gray-300 hover:text-white transition-colors">
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 