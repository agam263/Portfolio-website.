import { useEffect, useRef } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Connect() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const script = document.createElement('script');
      script.src = "https://static-bundles.visme.co/forms/vismeforms-embed.js";
      script.async = true;
      containerRef.current.appendChild(script);
    }
  }, []);

  return (
    <div className="bg-black min-h-screen text-foreground selection:bg-primary selection:text-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-6 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 text-white hover:text-primary transition-colors bg-white/10 px-4 py-2 rounded-full">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium tracking-wide">Back to Home</span>
          </Link>
          <div className="text-xl tracking-tight text-foreground" style={{ fontFamily: "'Instrument Serif', serif" }}>
            Agam<sup className="text-xs">*</sup>
          </div>
        </div>
      </nav>

      {/* Visme Form Container */}
      <div className="w-full min-h-screen pt-[80px] relative" ref={containerRef}>
        <style>
          {`
            /* Attempt to hide Visme branding injected into the DOM */
            [class*="visme"] a, 
            a[href*="visme.co"], 
            .visme-branding, 
            .v-branding, 
            .visme-logo, 
            div[style*="z-index: 9999999"],
            iframe + div > a,
            .visme-badge {
              display: none !important;
              opacity: 0 !important;
              visibility: hidden !important;
              pointer-events: none !important;
            }
          `}
        </style>
        <div 
          className="visme_d" 
          data-title="B2B Newsletter Subscription" 
          data-url="p9njweje-b2b-newsletter-subscription?fullPage=true" 
          data-domain="forms" 
          data-full-page="true" 
          data-min-height="100vh" 
          data-form-id="175707"
        ></div>
      </div>

      {/* Visme Watermark Cover-Up Hack */}
      <div className="fixed bottom-0 left-0 right-0 h-16 bg-black z-40 pointer-events-none flex items-center justify-center">
        {/* Covers the bottom 64px to hide the 'Powered by Visme' pill */}
      </div>
    </div>
  );
}
