import React, { useState } from 'react';
import { CertificateCard } from './CertificateCard';
import { DeveloperCertificateCard } from './DeveloperCertificateCard';
import { Certificate, DeveloperCertificate } from './types';
import { Award, Layers, Loader, RefreshCw, Moon, Sun, Terminal } from 'lucide-react';

export const CertificateShowcase: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true); // Default dark for developer portfolio aesthetics
  const [emptyState, setEmptyState] = useState(false);

  // Standard Platform certificates
  const standardCertificates: Certificate[] = [
    {
      id: 'cert-1',
      provider: 'Public Health Ontario',
      title: 'Reprocessing: Cleaning',
      description: 'Professional certification covering core principles, steps, and safety guidelines for the cleaning stage of medical device reprocessing.',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800',
      credentialUrl: '#',
      completedAt: 'Nov 2025',
      status: 'verified',
    },
    {
      id: 'cert-2',
      provider: 'AixSafety.com',
      title: 'WHMIS 2015 Certification',
      description: 'Workplace Hazardous Materials Information System compliance standard training covering safety data sheets, hazard pictograms, and safe chemical management.',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800',
      credentialUrl: '#',
      completedAt: 'Dec 2024',
      status: 'expired',
    },
    {
      id: 'cert-3',
      provider: 'Ministry of Labour, Training and Skills Development',
      title: 'Worker Health & Safety Awareness',
      description: 'Ministry-approved occupational health and safety training covering workplace rights, duties, and safety responsibilities.',
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800',
      credentialUrl: '#',
      completedAt: 'Jan 2026',
      status: 'pending',
    },
    {
      id: 'cert-4',
      provider: 'Trillium College, Ontario',
      title: 'MLA/T Clinical Practicum Block A',
      description: 'Hands-on clinical internship training in real healthcare settings practicing blood draw, collections, and sample accessioning.',
      image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=800',
      credentialUrl: '#',
      completedAt: 'May 2026',
      status: 'in_progress',
    }
  ];

  // Developer portfolio premium certificates (dark theme + logos + partial previews)
  const developerCertificates: DeveloperCertificate[] = [
    {
      title: 'Meta Front-End Developer Specialization',
      issuer: 'Meta / Coursera',
      description: 'Nine-course series covering HTML5, CSS3, JavaScript ES6, React development, UX/UI design foundations, API integration, and responsive frameworks.',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800',
      logo: 'https://cdn.iconscout.com/icon/free/png-256/free-meta-logo-icon-download-in-svg-png-gif-formats--brand-social-media-brands-pack-logos-icons-4819775.png',
      completedDate: 'Jan 2026',
      certificateUrl: '#',
    },
    {
      title: 'AWS Certified Cloud Practitioner',
      issuer: 'Amazon Web Services',
      description: 'Validation of cloud fluency covering architectural core concepts, security protocols, pricing strategies, and compute/storage server operations.',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
      logo: 'https://img.icons8.com/color/512/amazon-web-services.png',
      completedDate: 'Feb 2026',
      certificateUrl: '#',
    },
    {
      title: 'Google Advanced Data Analytics',
      issuer: 'Google',
      description: 'Advanced professional credential detailing regression analysis, statistical modeling, machine learning setups, and Python data visualization libraries.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
      logo: 'https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png',
      completedDate: 'Mar 2026',
      certificateUrl: '#',
    }
  ];

  return (
    <div className={isDarkMode ? 'dark bg-slate-950' : 'bg-slate-50'}>
      <div className="min-h-screen text-slate-800 dark:text-slate-100 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
        
        {/* Container */}
        <div className="max-w-7xl mx-auto">
          
          {/* Header Controls Banner */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-slate-200 dark:border-slate-800 pb-8 mb-12 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Award className="w-6 h-6 text-blue-500" />
                <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Showcase System</span>
              </div>
              <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Verified Credentials</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Explore standard platform designs and premium developer portfolio card layouts.
              </p>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm"
              >
                {isDarkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
                Theme: {isDarkMode ? 'Dark' : 'Light'}
              </button>

              <button
                onClick={() => setLoading(!loading)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm"
              >
                <Loader className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                Loading Skeletons: {loading ? 'ON' : 'OFF'}
              </button>

              <button
                onClick={() => setEmptyState(!emptyState)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm"
              >
                <Layers className="w-3.5 h-3.5" />
                State: {emptyState ? 'Empty' : 'Data'}
              </button>
            </div>
          </div>

          {/* Render Area */}
          {emptyState ? (
            <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-900 shadow-sm max-w-lg mx-auto">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center text-blue-500 mb-4">
                <Award className="w-8 h-8 stroke-[1.5]" />
              </div>
              <h3 className="text-lg font-bold text-slate-850 dark:text-white mb-1">No Certificates Found</h3>
              <p className="text-sm text-slate-400 dark:text-slate-500 max-w-sm mb-6">
                You haven't added any certificate records to your learning platform account yet.
              </p>
              <button
                onClick={() => setEmptyState(false)}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-md shadow-blue-500/10"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Reload Demo Records
              </button>
            </div>
          ) : (
            <div className="space-y-16">
              
              {/* Section 1: Developer Portfolio Cards (Premium Dark Theme) */}
              <div>
                <div className="flex items-center gap-2.5 mb-6">
                  <Terminal className="w-5 h-5 text-blue-500" />
                  <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Developer Portfolio Showcase</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {loading
                    ? Array.from({ length: 3 }).map((_, idx) => (
                        <DeveloperCertificateCard key={`dev-sk-${idx}`} isLoading={true} certificate={undefined as any} />
                      ))
                    : developerCertificates.map((cert, index) => (
                        <DeveloperCertificateCard key={`dev-${index}`} certificate={cert} />
                      ))}
                </div>
              </div>

              {/* Section 2: Standard Platform Cards */}
              <div>
                <div className="flex items-center gap-2.5 mb-6">
                  <Layers className="w-5 h-5 text-emerald-500" />
                  <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Standard Platform Showcase</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {loading
                    ? Array.from({ length: 4 }).map((_, idx) => (
                        <CertificateCard key={`std-sk-${idx}`} isLoading={true} />
                      ))
                    : standardCertificates.map((cert) => (
                        <CertificateCard key={cert.id} certificate={cert} />
                      ))}
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
