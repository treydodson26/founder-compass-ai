
export type FounderStage = 'Pre-Product' | 'Pre-Customer' | 'Founder-Led Sales' | 'Expansion';

export type StatusType = 'On Track' | 'Needs Attention' | 'At Risk';

export type ResourceType = 'Document' | 'Call Recording' | 'Email Thread' | 'Meeting Note' | 'Metric';

export interface Founder {
  id: string;
  name: string;
  companyName: string;
  avatar: string;
  stage: FounderStage;
  arr: number;
  firstInteraction: string; // ISO date string
  lastInteraction: string; // ISO date string
  status: StatusType;
  bio: string;
  resources: {
    documents: number;
    callRecordings: number;
    emailThreads: number;
    meetingNotes: number;
  };
  metrics: {
    customerCount: number;
    churnRate: number;
    growthRate: number;
  };
  milestones: Milestone[];
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  date?: string; // ISO date string
}
