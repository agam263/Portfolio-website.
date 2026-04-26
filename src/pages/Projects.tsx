import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { Float, Center, Bounds, Html, OrbitControls } from '@react-three/drei';
import { Suspense } from 'react';
import { ProjectModel } from '../components/ProjectModel';

export function Projects() {
  return (
    <div className="bg-black min-h-screen text-foreground selection:bg-primary selection:text-black overflow-hidden relative">
      
      {/* Background glow */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
        <div className="w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-white/5 rounded-full blur-[150px]" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 bg-transparent">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 text-white/50 hover:text-white transition-colors bg-white/5 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium tracking-wide">Back to Home</span>
          </Link>
          <div className="text-xl tracking-tight text-white" style={{ fontFamily: "'Instrument Serif', serif" }}>
            Agam<sup className="text-xs">*</sup>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 w-full h-screen flex flex-col items-center justify-center pt-20">
        
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-10 z-20 pointer-events-none"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-normal tracking-tight text-white mb-4" style={{ fontFamily: "'Instrument Serif', serif" }}>
            My <em className="not-italic text-white/50">Projects</em>
          </h1>
          <p className="text-white/40 max-w-xl mx-auto text-sm md:text-base">
            Exploring the intersection of code, design, and 3D experiences.
          </p>
        </motion.div>

        {/* 3D Car Model */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
          className="w-full h-[60vh] md:h-[70vh] relative z-10 cursor-grab active:cursor-grabbing"
        >
          <Canvas camera={{ position: [0, 2, 6], fov: 45 }}>
            <ambientLight intensity={2} />
            <directionalLight position={[10, 10, 5]} intensity={3} />
            <directionalLight position={[-10, -10, -5]} intensity={1} />
            <spotLight position={[0, 10, 0]} intensity={3} penumbra={1} />
            
            <Suspense fallback={<Html center><div className="text-white text-xl tracking-widest uppercase animate-pulse w-max whitespace-nowrap bg-black/50 p-4 rounded-xl border border-white/10 backdrop-blur-md">Loading Ferrari...</div></Html>}>
              <OrbitControls enableZoom={false} enablePan={false} />
              <Bounds fit clip observe margin={0.5}>
                <Center>
                  <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                    <ProjectModel />
                  </Float>
                </Center>
              </Bounds>
            </Suspense>
          </Canvas>
        </motion.div>
      </div>

      {/* Projects List Section */}
      <div className="max-w-6xl mx-auto px-6 pb-32 mt-20 md:mt-32">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16 md:mb-24"
        >
          <h3 className="text-sm md:text-base text-white/40 tracking-[0.3em] uppercase mb-4">Featured Work</h3>
          <div className="h-[1px] w-full bg-gradient-to-r from-white/20 to-transparent" />
        </motion.div>

        <div className="flex flex-col gap-12 md:gap-24">
          {[
            {
              title: "Subscription Manager",
              description: "A web application designed to help users easily manage and track their subscriptions in one place. It allows users to add, edit, and delete subscription details, monitor billing cycles, and receive reminders before renewal dates. The project focuses on improving organization and preventing missed payments through a simple and user-friendly interface.",
              github: "#",
              tags: ["Web App", "UI/UX", "Management", "Automation"]
            },
            {
              title: "Nexus RAG Assistant",
              description: "Developed MyRAG, an AI-powered Retrieval-Augmented Generation system that enables users to upload documents and receive accurate, context-aware answers based on the document content. The system processes files, converts them into embeddings, stores them in a vector database, and retrieves relevant information to generate intelligent responses using large language models.",
              github: "#",
              tags: ["AI", "RAG", "LLMs", "Vector DB"]
            }
          ].map((project, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ 
                scale: 1.02, 
                y: -10,
                transition: { duration: 0.4, ease: "easeOut" }
              }}
              viewport={{ once: true, margin: "-150px" }}
              transition={{ duration: 1, delay: idx * 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="group relative flex flex-col md:flex-row gap-8 md:gap-16 p-8 md:p-12 rounded-[2rem] border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/20 hover:shadow-[0_0_40px_rgba(255,255,255,0.05)] transition-all duration-500 overflow-hidden"
            >
              {/* Glass Shimmer on Hover */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:animate-shimmer pointer-events-none" />

              <div className="flex-1 flex flex-col justify-center">
                <div className="flex flex-wrap gap-3 mb-6">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="px-4 py-1.5 rounded-full border border-white/10 text-xs text-white/50 tracking-widest uppercase bg-white/5 backdrop-blur-md">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <h4 className="text-4xl md:text-6xl font-normal text-white mb-6" style={{ fontFamily: "'Instrument Serif', serif" }}>
                  {project.title}
                </h4>
                
                <p className="text-white/60 text-lg leading-relaxed mb-8 font-light max-w-2xl">
                  {project.description}
                </p>

                <a 
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 text-white w-max px-6 py-3 rounded-full border border-white/20 hover:bg-white hover:text-black transition-all duration-300"
                >
                  <span className="text-sm tracking-widest uppercase font-medium">View GitHub</span>
                  <ArrowLeft className="w-4 h-4 rotate-135" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
