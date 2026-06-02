import React, { useState } from 'react';
import { ExternalLink, Award, FileWarning, HelpCircle, RefreshCw, PlayCircle } from 'lucide-react';
import { Certificate } from './types';

interface CertificateCardProps {
  certificate?: Certificate;
  isLoading?: boolean;
}

export const CertificateCard: React.FC<CertificateCardProps> = ({
  certificate,
  isLoading = false,
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Loading Skeleton State
  if (isLoading || !certificate) {
    return (
      <div 
        className="w-full flex flex-col bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm"
        aria-hidden="true"
      >
        <div className="relative w-full aspect-[16/10] bg-slate-100 dark:bg-slate-800 animate-pulse" />
        <div className="p-6 flex flex-col flex-grow space-y-4">
          <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded w-1/3 animate-pulse" />
          <div className="space-y-2">
            <div className="h-6 bg-slate-100 dark:bg-slate-800 rounded w-3/4 animate-pulse" />
            <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded w-5/6 animate-pulse" />
          </div>
          <div className="h-4 bg-slate-100 dark:bg-slate-800 rounded w-1/2 animate-pulse" />
          <div className="pt-4 mt-auto">
            <div className="h-11 bg-slate-100 dark:bg-slate-800 rounded-xl w-full animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  const { provider, title, description, image, credentialUrl, completedAt, status = 'verified', buttonText } = certificate;

  // Configuration mapper for statuses to render custom UI themes
  const getStatusConfig = () => {
    switch (status) {
      case 'expired':
        return {
          label: 'Expired',
          badgeClass: 'bg-rose-50/90 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400 border-rose-100/50 dark:border-rose-800/50',
          btnClass: 'hover:bg-rose-600 hover:border-rose-600 hover:text-white dark:hover:bg-rose-600 dark:hover:border-rose-600',
          icon: <RefreshCw className="w-4 h-4 text-rose-500" />,
          defaultBtnText: 'Renew Certificate',
        };
      case 'pending':
        return {
          label: 'Pending',
          badgeClass: 'bg-amber-50/90 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400 border-amber-100/50 dark:border-amber-800/50',
          btnClass: 'hover:bg-amber-600 hover:border-amber-600 hover:text-white dark:hover:bg-amber-600 dark:hover:border-amber-600',
          icon: <HelpCircle className="w-4 h-4 text-amber-500" />,
          defaultBtnText: 'Check Status',
        };
      case 'in_progress':
        return {
          label: 'In Progress',
          badgeClass: 'bg-blue-50/90 text-blue-755 dark:bg-blue-950/40 dark:text-blue-400 border-blue-100/50 dark:border-blue-800/50',
          btnClass: 'hover:bg-blue-600 hover:border-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:border-blue-600',
          icon: <PlayCircle className="w-4 h-4 text-blue-500" />,
          defaultBtnText: 'Resume Learning',
        };
      case 'verified':
      default:
        return {
          label: 'Verified',
          badgeClass: 'bg-emerald-50/90 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border-emerald-100/50 dark:border-emerald-800/50',
          btnClass: 'hover:bg-emerald-600 hover:border-emerald-600 hover:text-white dark:hover:bg-emerald-600 dark:hover:border-emerald-600',
          icon: <Award className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />,
          defaultBtnText: 'Verify Credential',
        };
    }
  };

  const statusConfig = getStatusConfig();
  const activeBtnText = buttonText || statusConfig.defaultBtnText;

  return (
    <article className="group flex flex-col w-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-850 rounded-3xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1.5 transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 dark:focus-within:ring-offset-slate-900">
      
      {/* Certificate Image Top Section */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-50 dark:bg-slate-950 border-b border-slate-100 dark:border-slate-850">
        
        {/* Spinner during load */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-50 dark:bg-slate-950">
            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Fallback image */}
        {imageError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 dark:text-slate-600 px-4 text-center">
            <FileWarning className="w-12 h-12 mb-2 stroke-[1.5]" />
            <span className="text-xs font-medium">Failed to load certificate preview</span>
          </div>
        ) : (
          <img
            src={image}
            alt={`Certificate preview of ${title} by ${provider}`}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            className={`w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.04] ${
              imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
          />
        )}

        {/* Dynamic Badge based on Status */}
        <div className={`absolute top-4 left-4 backdrop-blur-md px-3 py-1.5 rounded-full border flex items-center gap-1.5 shadow-sm ${statusConfig.badgeClass}`}>
          {statusConfig.icon}
          <span className="text-[10px] font-extrabold tracking-wider uppercase">{statusConfig.label}</span>
        </div>
      </div>

      {/* Content Middle Section */}
      <div className="p-6 flex flex-col flex-grow">
        
        {/* Provider Label */}
        <span className="text-[11px] font-extrabold tracking-wider uppercase text-blue-600 dark:text-blue-400 mb-1.5">
          {provider}
        </span>
        
        {/* Certificate Title */}
        <h3 className="text-lg font-bold text-slate-850 dark:text-slate-100 leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 mb-2">
          {title}
        </h3>
        
        {/* Description text */}
        <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400 mb-4 line-clamp-3">
          {description}
        </p>

        {/* Completion Date */}
        {completedAt && (
          <div className="mt-auto pt-3 pb-4 flex items-center text-xs text-slate-400 dark:text-slate-500 border-t border-slate-50 dark:border-slate-850">
            <span>{status === 'in_progress' ? 'Started' : 'Completed'} {completedAt}</span>
          </div>
        )}

        {/* Dynamic Action Button Bottom Section */}
        <div className={!completedAt ? 'mt-auto pt-2' : ''}>
          <a
            href={credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${activeBtnText} for ${title} by ${provider}`}
            className={`inline-flex items-center justify-center gap-2 w-full px-5 py-3 text-sm font-semibold rounded-xl text-slate-700 hover:text-white dark:text-slate-300 dark:hover:text-white bg-slate-50 dark:bg-slate-850 border border-slate-100 dark:border-slate-800 transition-all duration-200 outline-none focus:ring-2 focus:ring-blue-500 ${statusConfig.btnClass}`}
          >
            <span>{activeBtnText}</span>
            <ExternalLink className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </article>
  );
};
