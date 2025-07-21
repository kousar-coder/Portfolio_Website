import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Monitor, Server, Database, Settings, PenTool, Brain } from 'lucide-react';

const skills = [
  {
    name: 'Frontend',
    icon: Monitor,
    subskills: ['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind', 'Next.js', 'TypeScript'],
  },
  {
    name: 'Backend',
    icon: Server,
    subskills: ['Node.js', 'Express.js', 'Python', 'Django', 'Django Rest Framework', 'REST APIs', 'JWT', 'GraphQL'],
  },
  {
    name: 'Databases',
    icon: Database,
    subskills: ['MySQL', 'MongoDB', 'Firebase', 'Redis'],
  },
  {
    name: 'DevOps & Tools',
    icon: Settings,
    subskills: ['Git', 'GitHub', 'Postman', 'Docker', 'Vercel', 'Netlify', 'CI/CD (GitHub Actions)'],
  },
  {
    name: 'AI/ML & LLM Integration',
    icon: Brain,
    subskills: ['OpenAI API', 'Langchain', 'Hugging Face', 'Pinecone', 'Whisper', 'RAG Pipeline Concepts'],
  },
  {
    name: 'Design & Others',
    icon: PenTool,
    subskills: ['Figma', 'Canva'],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

const Skills: React.FC = () => {
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <section
      id="skills"
      className="w-full flex flex-col items-center justify-center bg-[#181A1B] py-24 px-4"
    >
      <div className="max-w-7xl w-full mx-auto">
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-6 text-white text-center leading-tight tracking-tight">
          Skills
        </h2>
        <p className="text-cyan-200 text-lg font-mono mb-12 text-center">
          My core technologies and strengths.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full">
          {skills.map((skill, i) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={skill.name}
                className="relative bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl flex flex-col items-center justify-center p-10 transition-transform duration-200 border border-slate-800 group cursor-pointer min-h-[200px] overflow-hidden"
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                whileHover={{ scale: 1.04, boxShadow: '0 8px 32px 0 #22d3ee44' }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Main skill name and icon */}
                <div className={`flex flex-col items-center justify-center transition-opacity duration-300 ${hovered === i ? 'opacity-0' : 'opacity-100'}`}>
                  <Icon className="w-14 h-14 text-cyan-400 mb-4 group-hover:text-cyan-300 transition" />
                  <span className="text-xl font-bold text-white tracking-wide text-center">
                    {skill.name}
                  </span>
                </div>
                {/* Subskills: reveal on hover with fade/slide */}
                <motion.ul
                  initial={{ opacity: 0, y: 10 }}
                  animate={hovered === i ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                  className={`absolute inset-0 flex flex-row flex-wrap justify-center items-center gap-2 px-4 text-center pointer-events-none ${hovered === i ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
                  style={{ background: hovered === i ? 'rgba(24,26,27,0.96)' : 'transparent', overflow: 'visible' }}
                >
                  {skill.subskills.map(sub => (
                    <li key={sub} className="text-cyan-200 text-base font-semibold bg-[#181A1B] bg-opacity-80 rounded-full px-4 py-1 shadow border border-[#23272a]">
                      {sub}
                    </li>
                  ))}
                </motion.ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills; 