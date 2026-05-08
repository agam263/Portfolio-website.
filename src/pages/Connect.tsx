import { ArrowLeft, Mail, User, MessageSquare, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { Suspense, useState } from 'react';
import { ContactBot } from '../components/ContactBot';
import { CheckCircle2, Loader2 } from 'lucide-react';

export function Connect() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Simulate network request for premium feel
    setTimeout(() => {
      setStatus('success');
      
      // Fallback to mailto so the user can actually send the message natively
      window.location.href = `mailto:agam.p24@medhaviskillsuniversity.edu.in?subject=New Connection from ${name}&body=${message}%0A%0AContact Email: ${email}`;
    }, 1500);
  };

  return (
    <div className="bg-black min-h-screen text-foreground selection:bg-primary selection:text-black overflow-hidden relative">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-white/5 rounded-full blur-[150px] pointer-events-none" />

      {/* 3D Animated Background Character */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <Canvas camera={{ position: [0, 0, 4], fov: 45 }} dpr={[1, 1.5]} gl={{ antialias: false }}>
          <ambientLight intensity={1.5} />
          <directionalLight position={[10, 10, 5]} intensity={2} />
          <directionalLight position={[-10, -10, -5]} intensity={0.5} />
          <Suspense fallback={null}>
            <Float speed={2} rotationIntensity={0.2} floatIntensity={1}>
              <ContactBot />
            </Float>
          </Suspense>
        </Canvas>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 bg-black/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 text-white/50 hover:text-white transition-colors bg-white/5 px-4 py-2 rounded-full border border-white/10">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium tracking-wide">Back to Home</span>
          </Link>
          <div className="text-xl tracking-tight text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Agam<sup className="text-xs">*</sup>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-20 min-h-screen flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-10 md:mb-16"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-normal tracking-tight text-white mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Let's <em className="not-italic text-white/50">Connect</em>
          </h1>
          <p className="text-white/40 max-w-xl mx-auto text-base md:text-lg">
            Have a project in mind, or just want to say hi? Drop me a message and I'll get back to you as soon as possible.
          </p>
        </motion.div>


          <AnimatePresence mode="wait">
            {status !== 'success' ? (
              <motion.form 
                key="form"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                onSubmit={handleSubmit} 
                className="w-full max-w-xl mx-auto bg-white/[0.02] border border-white/10 p-6 md:p-10 rounded-[2rem] backdrop-blur-xl shadow-2xl"
              >
                <div className="flex flex-col gap-6 md:gap-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white/60 flex items-center gap-2">
                        <User className="w-4 h-4" /> Your Name
                      </label>
                      <input 
                        type="text" 
                        name="name" 
                        required
                        placeholder="John Doe"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white/60 flex items-center gap-2">
                        <Mail className="w-4 h-4" /> Email Address
                      </label>
                      <input 
                        type="email" 
                        name="email" 
                        required
                        placeholder="john@example.com"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/60 flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" /> Message
                    </label>
                    <textarea 
                      name="message" 
                      required
                      rows={5}
                      placeholder="Tell me about your project..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-white/40 focus:bg-white/10 transition-all resize-none"
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    disabled={status !== 'idle'}
                    className={`w-full mt-2 font-medium text-lg rounded-xl px-4 py-4 flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)] bg-white text-black hover:bg-white/90 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-80 disabled:cursor-not-allowed`}
                  >
                    {status === 'idle' && <><Send className="w-5 h-5" /> Send Message</>}
                    {status === 'submitting' && <><Loader2 className="w-5 h-5 animate-spin" /> Sending...</>}
                  </button>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
                className="w-full max-w-xl mx-auto bg-white/[0.02] border border-white/10 p-10 md:p-16 rounded-[2rem] backdrop-blur-xl shadow-2xl flex flex-col items-center justify-center text-center"
              >
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", bounce: 0.6 }}
                  className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6 border border-emerald-500/30"
                >
                  <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                </motion.div>
                <h3 className="text-3xl md:text-5xl text-white font-normal mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Yay! Message Sent
                </h3>
                <p className="text-white/60 text-lg mb-8 max-w-md">
                  Thank you for reaching out. I'll get back to you as soon as possible!
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-full transition-all hover:scale-105 active:scale-95"
                >
                  Send another message
                </button>
              </motion.div>
            )}
          </AnimatePresence>
      </div>
    </div>
  );
}
