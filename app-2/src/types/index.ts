export type VerificationStatus = 'Verified' | 'In Review' | 'Unverified';
export type TrackingStatus = 'Not Started' | 'Live' | 'Completed';
export type RiskLevel = 'Low' | 'Medium' | 'High';
export type Sector = 'Energy' | 'Waste' | 'Nature-based' | 'Transport' | 'Buildings';
export type SDG = '7' | '11' | '12' | '13' | '15';

export interface Milestone {
  id: string;
  name: string;
  amount: number;
  dueDate: string;
  status: 'Pending' | 'In Progress' | 'Completed';
}

export interface Document {
  id: string;
  type: string;
  name: string;
  url: string;
  uploadedAt: string;
}

export interface UpdateFeed {
  id: string;
  date: string;
  summary: string;
  attachments: string[];
  progressPercent: number;
}

export interface Project {
  id: string;
  title: string;
  location: string;
  sector: Sector;
  description: string;
  sdgTags: SDG[];
  co2eAnnual: number;
  co2eLifetime: number;
  fundingRequired: number;
  timelineMonths: number;
  verificationStatus: VerificationStatus;
  trackingStatus: TrackingStatus;
  riskLevel: RiskLevel;
  milestones: Milestone[];
  documents: Document[];
  updateFeed: UpdateFeed[];
  imageUrl: string;
  problem: string;
  solution: string;
  outcome: string;
  methodology: string;
}

export interface Corporate {
  id: string;
  companyName: string;
  industry: string;
  budgetRange: string;
  sdgPriorities: SDG[];
  riskPreference: RiskLevel;
  email: string;
}

export interface GreenCompany {
  id: string;
  companyName: string;
  registrationId: string;
  email: string;
  phone: string;
  projectOwnerName: string;
}

export interface User {
  id: string;
  email: string;
  role: 'corporate' | 'green_company' | 'admin';
  name: string;
}

export interface Report {
  id: string;
  title: string;
  generatedAt: string;
  type: 'CSR' | 'ESG';
  projectIds: string[];
  downloadUrl: string;
}

export interface DashboardWidget {
  title: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
}
