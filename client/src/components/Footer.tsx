import React from 'react';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';

const Footer: React.FC = () => (
  <footer className="bg-[#181A1B] text-gray-300 pt-12 pb-4 px-4 border-t border-[#23272a]">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between md:items-start gap-10">
      {/* Company Description */}
      <div className="flex-1 mb-8 md:mb-0">
        <div className="text-2xl font-bold text-white mb-2">Kousar Saeed</div>
        <div className="text-gray-400 text-sm max-w-xs">
          Building intelligent systems for real-time solutions. AI Engineer, Full Stack Developer, Product Innovator.
        </div>
      </div>
      {/* Footer Links */}
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-8 w-full">
        <div>
          <div className="font-semibold text-white mb-3">Product</div>
          <ul className="space-y-2">
            <li><a href="#features" className="hover:text-blue-400 hover:underline transition">Features</a></li>
            <li><a href="#usecases" className="hover:text-blue-400 hover:underline transition">Use Cases</a></li>
            <li><a href="#demo" className="hover:text-blue-400 hover:underline transition">Demo</a></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold text-white mb-3">Resources</div>
          <ul className="space-y-2">
            <li><a href="#blog" className="hover:text-blue-400 hover:underline transition">Blog</a></li>
            <li><a href="#docs" className="hover:text-blue-400 hover:underline transition">Docs</a></li>
            <li><a href="https://github.com/kousar-coder" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 hover:underline transition">GitHub</a></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold text-white mb-3">Contact</div>
          <ul className="space-y-2">
            <li>
              <a href="mailto:kousarsaeed.narejo@gmail.com" className="flex items-center gap-2 group hover:text-blue-400 transition">
                <Mail size={18} className="group-hover:scale-110 group-hover:text-blue-400 transition-transform" />
                Email
              </a>
            </li>
            <li>
              <a href="https://www.linkedin.com/in/kousar-saeed-65742124a/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 group hover:text-blue-400 transition">
                <Linkedin size={18} className="group-hover:scale-110 group-hover:text-blue-400 transition-transform" />
                LinkedIn
              </a>
            </li>
            <li>
              <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 group hover:text-blue-400 transition">
                <Twitter size={18} className="group-hover:scale-110 group-hover:text-blue-400 transition-transform" />
                Twitter
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    {/* Copyright and Socials */}
    <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-[#23272a] flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
      <div className="text-gray-500">© 2025 Kousar Saeed. All rights reserved.</div>
      <div className="flex gap-4">
        <a href="https://github.com/kousar-coder" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition group">
          <Github size={20} className="group-hover:scale-110 group-hover:text-blue-400 transition-transform" />
        </a>
        <a href="https://www.linkedin.com/in/kousar-saeed-65742124a/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition group">
          <Linkedin size={20} className="group-hover:scale-110 group-hover:text-blue-400 transition-transform" />
        </a>
        <a href="mailto:kousarsaeed.narejo@gmail.com" className="hover:text-blue-400 transition group">
          <Mail size={20} className="group-hover:scale-110 group-hover:text-blue-400 transition-transform" />
        </a>
        <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition group">
          <Twitter size={20} className="group-hover:scale-110 group-hover:text-blue-400 transition-transform" />
        </a>
      </div>
    </div>
  </footer>
);

export default Footer; 