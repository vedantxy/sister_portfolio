export interface Certificate {
  id: string;
  provider: string;
  title: string;
  description: string;
  image: string;
  credentialUrl: string;
  completedAt?: string;
  status?: 'verified' | 'expired' | 'pending' | 'in_progress';
  buttonText?: string;
}

export interface DeveloperCertificate {
  title: string;
  issuer: string;
  description: string;
  image: string;
  logo?: string;
  completedDate: string;
  certificateUrl: string;
}
