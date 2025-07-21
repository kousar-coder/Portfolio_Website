import React from 'react';
import { motion } from 'framer-motion';
import { Github, Brain, Eye, Code, Database, HeartPulse, Film } from 'lucide-react';

const projects = [
  {
    title: 'ChessMind AI',
    description: 'A chess game featuring an AI-powered opponent built in Python.',
    github: 'https://github.com/kousar-coder/Chess-Game-AI-Project',
    icon: Brain,
  },
  {
    title: 'FaceTrack Attendance',
    description: 'Facial recognition–based attendance system using OpenCV and C++.',
    github: 'https://github.com/kousar-coder/Cpp-Attendance-System-Facial-Recog',
    icon: Eye,
  },
  {
    title: 'AlgoViz',
    description: 'An interactive algorithm visualizer with dynamic plotting.',
    github: 'https://github.com/kousar-coder/Algorithm-Visualizer',
    icon: Code,
  },
  {
    title: 'AI Prompt Sharing Platform',
    description: 'A modern web app to create, share, and discover AI prompts. Built with Next.js, MongoDB, NextAuth, and TailwindCSS.',
    github: 'https://github.com/kousar-coder/AI-Prompt-Sharing-Platform',
    icon: Brain,
  },
  {
    title: 'PatientPro Platform',
    description: 'A smart healthcare management system for streamlined hospital operations.',
    github: 'https://github.com/kousar-coder/PatientPro-Platform',
    icon: HeartPulse,
  },
  {
    title: 'CineMate Recommender',
    description: 'Movie recommendation engine using collaborative filtering techniques.',
    github: 'https://github.com/kousar-coder/Movie-Recommendation-System',
    icon: Film,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

const Projects: React.FC = () => (
  <section
    id="projects"
    className="w-full flex flex-col items-center justify-center bg-[#181A1B] py-24 px-4"
  >
    <div className="max-w-7xl w-full mx-auto">
      <h2 className="text-4xl sm:text-5xl font-extrabold mb-2 text-white text-center leading-tight tracking-tight">
        Featured Projects
      </h2>
      <p className="text-cyan-200 text-lg font-mono mb-12 text-center">
        A curated selection of my public development work, handpicked from GitHub.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
        {projects.map((project, idx) => {
          const Icon = project.icon;
          return (
            <motion.div
              key={project.title}
              className="relative bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl flex flex-col p-8 transition-transform duration-200 border border-slate-800 group hover:scale-105 hover:shadow-cyan-400/20 min-h-[180px]"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <Icon className="w-8 h-8 text-cyan-400 flex-shrink-0" />
                <span className="text-xl font-bold text-white tracking-wide">
                  {project.title}
                </span>
              </div>
              <p className="text-gray-300 text-base mb-8 flex-1">
                {project.description}
              </p>
              <div className="flex justify-end items-end mt-auto">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-cyan-700 text-white rounded-lg font-semibold shadow hover:bg-cyan-500 transition text-xs"
                  aria-label={`View ${project.title} on GitHub`}
                >
                  <Github size={16} /> GitHub
                </a>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

export default Projects; 