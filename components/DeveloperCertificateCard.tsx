import React, { useState } from 'react';
import { ExternalLink, Award, FileWarning } from 'lucide-react';
import { DeveloperCertificate } from './types';

interface DeveloperCertificateCardProps {
  certificate: DeveloperCertificate;
  isLoading?: boolean;
}

export const DeveloperCertificateCard: React.FC<DeveloperCertificateCardProps> = ({
  certificate,
  isLoading = false,
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Skeleton State
  if (isLoading || !certificate) {
    return (
      <div 
        className="w-full flex flex-col bg-slate-950/80 border border-slate-900 rounded-3xl overflow-hidden shadow-2xl animate-pulse"
        aria-hidden="true"
      >
        <div className="relative w-full aspect-[16/10] bg-slate-900" />
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900" />
            <div className="h-4 bg-slate-900 rounded w-1/4" />
          </div>
          <div className="space-y-2">
            <div className="h-6 bg-slate-900 rounded w-3/4" />
            <div className="h-4 bg-slate-900 rounded w-5/6" />
          </div>
          <div className="pt-4">
            <div className="h-11 bg-slate-900 rounded-xl w-full" />
          </div>
        </div>
      </div>
    );
  }

  const { title, issuer, description, image, logo, completedDate, certificateUrl } = certificate;

  return (
    <article className="group flex flex-col w-full bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-white/5 hover:border-blue-500/30 rounded-3xl overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_0_30px_rgba(59,130,246,0.12)] hover:-translate-y-2 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 focus-within:ring-offset-slate-950">
      
      {/* Partially visible Certificate Image Preview Top Section */}
      <div className="relative w-full h-52 sm:h-56 overflow-hidden bg-slate-950">
        
        {/* Dark vignette masking overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-slate-900 via-transparent to-black/30" />

        {/* Spinner during load */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-slate-950">
            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Fallback image */}
        {imageError ? (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-slate-500 px-4 text-center">
            <FileWarning className="w-12 h-12 mb-2 stroke-[1.2]" />
            <span className="text-xs font-semibold">Failed to load preview</span>
          </div>
        ) : (
          <img
            src={image}
            alt={`Certificate document for ${title}`}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            className={`w-full h-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05] ${
              imageLoaded ? 'opacity-70 scale-100' : 'opacity-0 scale-95'
            }`}
          />
        )}

        {/* Top-Right Verified Badge Overlay */}
        <div className="absolute top-4 right-4 z-20 bg-blue-500/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-blue-500/20 flex items-center gap-1.5 shadow-sm">
          <Award className="w-3.5 h-3.5 text-blue-400" />
          <span className="text-[9px] font-extrabold tracking-wider text-blue-400 uppercase">Verified Badge</span>
        </div>
      </div>

      {/* Content Middle & Bottom Section */}
      <div className="p-6 flex flex-col flex-grow relative -mt-8 z-20">
        
        {/* Issuer Info & Logo Row */}
        <div className="flex items-center gap-3 mb-4">
          {logo ? (
            <div className="w-11 h-11 rounded-xl overflow-hidden bg-slate-900 border border-white/10 flex items-center justify-center p-1.5 shrink-0 shadow-lg">
              <img src={logo} alt={`${issuer} Logo`} className="w-full h-full object-contain" />
            </div>
          ) : (
            <div className="w-11 h-11 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center shrink-0 shadow-lg text-blue-400">
              <Award className="w-5 h-5" />
            </div>
          )}
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-semibold text-slate-400 truncate">{issuer}</span>
            <span className="text-[10px] text-slate-500">{completedDate}</span>
          </div>
        </div>
        
        {/* Certificate Title */}
        <h3 className="text-lg font-bold text-white tracking-tight leading-snug group-hover:text-blue-400 transition-colors duration-300 mb-2">
          {title}
        </h3>
        
        {/* Short description */}
        <p className="text-sm leading-relaxed text-slate-400 mb-6 line-clamp-3">
          {description}
        </p>

        {/* Modern Glassmorphic View Certificate Action Button */}
        <div className="mt-auto">
          <a
            href={certificateUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View certificate details for ${title} issued by ${issuer}`}
            className="inline-flex items-center justify-center gap-2 w-full px-5 py-3.5 text-sm font-semibold rounded-xl text-slate-200 hover:text-white bg-white/5 hover:bg-blue-600/90 border border-white/10 hover:border-blue-500/30 backdrop-blur-md transition-all duration-300 outline-none focus:ring-2 focus:ring-blue-500 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] hover:shadow-[0_4px_20px_rgba(59,130,246,0.25)]"
          >
            <span>View Certificate</span>
            <ExternalLink className="w-4 h-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </article>
  );
};
