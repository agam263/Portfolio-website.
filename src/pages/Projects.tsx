import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { Float, Center, Bounds, OrbitControls } from '@react-three/drei';
import { Suspense } from 'react';
import { ProjectModel } from '../components/ProjectModel';
import { GeometricModel } from '../components/GeometricModel';
import { TorusNodeModel } from '../components/TorusNodeModel';

export function Projects() {
  return (
    <div className="bg-black min-h-screen text-white selection:bg-amber-500 selection:text-black font-sans pb-32 relative overflow-hidden">
      
      {/* Cinematic Background Glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-amber-500/5 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] bg-white/5 rounded-full blur-[100px] mix-blend-screen" />
      </div>

      {/* Cinematic HUD Elements (Static) */}
      <div className="fixed top-24 left-8 md:left-12 flex flex-col gap-2 z-0 hidden sm:block pointer-events-none opacity-50">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 border-t border-l border-amber-500/50" />
          <span className="text-[10px] tracking-[0.4em] text-white/40 font-mono uppercase">Telemetry Link - Live</span>
        </div>
      </div>
      <div className="fixed top-24 right-8 md:right-12 flex flex-col items-end gap-2 z-0 hidden sm:block pointer-events-none opacity-50">
        <div className="flex items-center gap-3">
          <span className="text-[10px] tracking-[0.4em] text-white/40 font-mono uppercase">Core Status 93.0%</span>
          <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
          <div className="w-3 h-3 border-t border-r border-amber-500/50" />
        </div>
      </div>
      <div className="fixed bottom-12 left-8 md:left-12 flex items-end gap-3 z-0 hidden sm:flex pointer-events-none opacity-50">
        <div className="w-3 h-3 border-b border-l border-amber-500/50" />
        <span className="text-[10px] tracking-[0.4em] text-white/20 font-mono uppercase">SEQ 005 / 169</span>
      </div>
      <div className="fixed bottom-12 right-8 md:right-12 flex items-end justify-end gap-3 z-0 hidden sm:flex pointer-events-none opacity-50">
        <span className="text-[10px] tracking-[0.4em] text-white/20 font-mono uppercase">System // Deployments</span>
        <div className="w-3 h-3 border-b border-r border-amber-500/50" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full p-6 md:px-12 flex justify-between items-center z-50 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-[2px]">
        <Link to="/" className="group flex items-center gap-4 text-white hover:text-amber-500 transition-colors">
          <div className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center transition-all group-hover:bg-amber-500/10 group-hover:border-amber-500/30 group-hover:-translate-x-2">
            <ArrowLeft className="w-4 h-4" />
          </div>
          <span className="text-xs tracking-[0.2em] uppercase font-mono text-white/60 group-hover:text-amber-500">Back</span>
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
          <div className="text-xs tracking-[0.3em] text-white/80 uppercase font-mono hidden sm:block">
            Agam <span className="text-white/40">/ Projects</span>
          </div>
        </div>
      </nav>

      {/* Main Content & Projects List Section */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pb-32 pt-40 flex flex-col">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-24 relative"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="h-[1px] w-12 bg-amber-500/50" />
            <span className="text-amber-500 tracking-[0.3em] font-mono text-xs uppercase">Protocol - Deployments</span>
          </div>
          <h1 className="text-6xl md:text-8xl lg:text-[9rem] font-normal text-white mb-6 tracking-tighter leading-[0.9]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            My Projects<span className="text-amber-500">*</span>
          </h1>
          <p className="text-white/40 text-sm md:text-base font-mono tracking-widest max-w-2xl border-l border-amber-500/30 pl-6 uppercase mt-8">
            Exploring the intersection of code, design, and interactive 3D experiences.
          </p>
        </motion.div>

        <div className="flex flex-col gap-12 md:gap-24">
          {[
            {
              title: "Portfolio Template",
              description: "A professional and visually premium portfolio website template featuring refined scroll physics, sophisticated micro-interactions, and high-performance 3D animations.",
              github: "https://github.com/agam263/-Protfolio-Templet-",
              url: "https://protfolio-templet.vercel.app",
              tags: ["Portfolio", "Web Design", "UI/UX", "React"]
            },
            {
              title: "Subscription Manager",
              description: "A web application designed to help users easily manage and track their subscriptions in one place. It allows users to add, edit, and delete subscription details, monitor billing cycles, and receive reminders before renewal dates. The project focuses on improving organization and preventing missed payments through a simple and user-friendly interface.",
              github: "https://github.com/agam263/subscription-manager",
              url: "https://submanager-production-e3a7.up.railway.app/",
              tags: ["Web App", "UI/UX", "Management", "Automation"]
            },
            {
              title: "Nexus RAG Assistant",
              description: "Developed MyRAG, an AI-powered Retrieval-Augmented Generation system that enables users to upload documents and receive accurate, context-aware answers based on the document content. The system processes files, converts them into embeddings, stores them in a vector database, and retrieves relevant information to generate intelligent responses using large language models.",
              github: "https://github.com/agam263/rag",
              url: "https://nzwnxm5l6oq6abkwf4xwzd.streamlit.app/",
              tags: ["AI", "RAG", "LLMs", "Vector DB"]
            }
          ].map((project, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ 
                scale: 1.02, 
                transition: { duration: 0.4, ease: "easeOut" }
              }}
              viewport={{ once: true, margin: "-150px" }}
              transition={{ duration: 1, delay: idx * 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="group relative flex flex-col md:flex-row gap-8 md:gap-16 p-8 md:p-12 border border-white/10 bg-white/[0.02] backdrop-blur-sm overflow-hidden hover:bg-white/[0.04] hover:border-amber-500/30 transition-all duration-500"
            >
              {/* Tech Corner Accents */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/20 group-hover:border-amber-500/50 transition-colors" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/20 group-hover:border-amber-500/50 transition-colors" />

              <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.15]">
                <Canvas 
                  camera={{ position: [0, 2, 6], fov: 45 }} 
                  dpr={[1, 1.5]} 
                  gl={{ antialias: false, powerPreference: "high-performance" }}
                >
                  <ambientLight intensity={2} />
                  <directionalLight position={[10, 10, 5]} intensity={3} />
                  <directionalLight position={[-10, -10, -5]} intensity={1} />
                  <spotLight position={[0, 10, 0]} intensity={3} penumbra={1} />
                  <Suspense fallback={null}>
                    <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} autoRotate autoRotateSpeed={1} />
                    <Bounds fit clip observe margin={0.5}>
                      <Center>
                        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                          {idx === 0 && <ProjectModel />}
                          {idx === 1 && <GeometricModel />}
                          {idx === 2 && <TorusNodeModel />}
                        </Float>
                      </Center>
                    </Bounds>
                  </Suspense>
                </Canvas>
              </div>
              
              {/* Amber Glow on Canvas Hover */}
              <div className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-[0.05] bg-amber-500 transition-opacity duration-500" />

              {/* Glass Shimmer on Hover */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-amber-500/10 to-transparent group-hover:animate-shimmer pointer-events-none z-0" />

              <div className="flex-1 flex flex-col justify-center relative z-10">
                <div className="flex flex-wrap gap-3 mb-6">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="px-4 py-1.5 rounded-none border border-white/10 text-[10px] text-white/50 tracking-widest uppercase bg-black/40 backdrop-blur-md group-hover:border-amber-500/30 transition-colors font-mono">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <h4 className="text-4xl md:text-6xl font-normal text-white mb-6 tracking-wide" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {project.title}
                </h4>
                
                <p className="text-white/50 text-sm md:text-base leading-relaxed mb-8 font-light max-w-2xl">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-4 mt-auto">
                  {project.github && project.github !== "#" && (
                    <a 
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="liquid-glass inline-flex items-center gap-3 text-white px-6 py-3 border border-white/20 hover:border-amber-500/50 transition-all duration-300 font-mono text-[10px] tracking-widest uppercase group/btn"
                    >
                      <span className="group-hover/btn:text-amber-500 transition-colors">GitHub</span>
                      <ArrowLeft className="w-3 h-3 rotate-135 group-hover/btn:text-amber-500 transition-colors" />
                    </a>
                  )}
                  {project.url && (
                    <a 
                      href={project.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-3 text-black bg-white/90 px-6 py-3 border border-transparent hover:bg-amber-500 hover:text-black hover:border-amber-500 transition-all duration-300 font-mono text-[10px] tracking-widest uppercase group/btn"
                    >
                      <span>Live Demo</span>
                      <ArrowLeft className="w-3 h-3 rotate-135" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
