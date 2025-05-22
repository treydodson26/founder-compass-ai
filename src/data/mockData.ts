
import { Founder } from './types';

function getDaysAgo(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString();
}

export const founders: Founder[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    companyName: 'DataMesh',
    avatar: 'https://i.pravatar.cc/150?img=1',
    stage: 'Founder-Led Sales',
    arr: 125000,
    firstInteraction: getDaysAgo(180),
    lastInteraction: getDaysAgo(2),
    status: 'On Track',
    bio: 'Former Google PM building a data orchestration platform for ML teams.',
    resources: {
      documents: 7,
      callRecordings: 12, 
      emailThreads: 45,
      meetingNotes: 23,
    },
    metrics: {
      customerCount: 8,
      churnRate: 0.05,
      growthRate: 0.15
    },
    milestones: [
      {
        id: 'm1',
        title: 'Complete 10+ customer discovery calls',
        description: 'Gather insights from potential customers to validate product-market fit',
        completed: true,
        date: getDaysAgo(150)
      },
      {
        id: 'm2',
        title: 'Define pricing model',
        description: 'Establish a clear pricing strategy based on customer feedback',
        completed: true,
        date: getDaysAgo(120)
      },
      {
        id: 'm3',
        title: 'Close first 3 customers',
        description: 'Convert early adopters to paying customers',
        completed: true,
        date: getDaysAgo(90)
      },
      {
        id: 'm4',
        title: 'Document repeatable sales process',
        description: 'Create playbook for sales interactions and follow-ups',
        completed: false
      },
      {
        id: 'm5',
        title: 'Hire first sales rep',
        description: 'Bring on dedicated sales talent to scale beyond founder-led sales',
        completed: false
      }
    ]
  },
  {
    id: '2',
    name: 'Michael Rodriguez',
    companyName: 'SupplyAI',
    avatar: 'https://i.pravatar.cc/150?img=3',
    stage: 'Pre-Customer',
    arr: 0,
    firstInteraction: getDaysAgo(90),
    lastInteraction: getDaysAgo(14),
    status: 'Needs Attention',
    bio: 'Supply chain expert building AI tools for inventory optimization.',
    resources: {
      documents: 5,
      callRecordings: 8,
      emailThreads: 27,
      meetingNotes: 12,
    },
    metrics: {
      customerCount: 0,
      churnRate: 0,
      growthRate: 0
    },
    milestones: [
      {
        id: 'm1',
        title: 'Validate problem statement',
        description: 'Confirm the problem exists and is worth solving',
        completed: true,
        date: getDaysAgo(75)
      },
      {
        id: 'm2',
        title: 'Build MVP',
        description: 'Create minimum viable product to demonstrate to potential customers',
        completed: true,
        date: getDaysAgo(45)
      },
      {
        id: 'm3',
        title: 'Secure 5 beta testers',
        description: 'Find companies willing to test early version',
        completed: false
      }
    ]
  },
  {
    id: '3',
    name: 'Aisha Johnson',
    companyName: 'Finovo',
    avatar: 'https://i.pravatar.cc/150?img=5',
    stage: 'Expansion',
    arr: 2100000,
    firstInteraction: getDaysAgo(450),
    lastInteraction: getDaysAgo(5),
    status: 'On Track',
    bio: 'Fintech entrepreneur revolutionizing financial workflows for SMBs.',
    resources: {
      documents: 24,
      callRecordings: 42,
      emailThreads: 156,
      meetingNotes: 87,
    },
    metrics: {
      customerCount: 87,
      churnRate: 0.02,
      growthRate: 0.22
    },
    milestones: [
      {
        id: 'm1',
        title: 'Reach $1M ARR',
        description: 'Milestone of $1M annual recurring revenue',
        completed: true,
        date: getDaysAgo(180)
      },
      {
        id: 'm2',
        title: 'Hire VP of Sales',
        description: 'Bring on experienced sales leadership',
        completed: true,
        date: getDaysAgo(150)
      },
      {
        id: 'm3',
        title: 'Establish customer success team',
        description: 'Create dedicated team for customer success',
        completed: true,
        date: getDaysAgo(120)
      },
      {
        id: 'm4',
        title: 'Launch premium tier',
        description: 'Release enterprise version with advanced features',
        completed: true,
        date: getDaysAgo(60)
      },
      {
        id: 'm5',
        title: 'Raise Series B',
        description: 'Secure growth funding round',
        completed: false
      }
    ]
  },
  {
    id: '4',
    name: 'David Park',
    companyName: 'DevFlow',
    avatar: 'https://i.pravatar.cc/150?img=8',
    stage: 'Pre-Product',
    arr: 0,
    firstInteraction: getDaysAgo(30),
    lastInteraction: getDaysAgo(7),
    status: 'At Risk',
    bio: 'Former engineering lead building next-gen CI/CD tools.',
    resources: {
      documents: 3,
      callRecordings: 4,
      emailThreads: 12,
      meetingNotes: 6,
    },
    metrics: {
      customerCount: 0,
      churnRate: 0,
      growthRate: 0
    },
    milestones: [
      {
        id: 'm1',
        title: 'Create MVP concept',
        description: 'Define clear scope for minimum viable product',
        completed: true,
        date: getDaysAgo(20)
      },
      {
        id: 'm2',
        title: 'Conduct initial user interviews',
        description: 'Gather feedback from potential users',
        completed: false
      }
    ]
  },
  {
    id: '5',
    name: 'Elena Vasquez',
    companyName: 'Healthlink',
    avatar: 'https://i.pravatar.cc/150?img=9',
    stage: 'Founder-Led Sales',
    arr: 75000,
    firstInteraction: getDaysAgo(210),
    lastInteraction: getDaysAgo(1),
    status: 'On Track',
    bio: 'Healthcare technologist connecting patients with clinical trials.',
    resources: {
      documents: 9,
      callRecordings: 18,
      emailThreads: 52,
      meetingNotes: 34,
    },
    metrics: {
      customerCount: 5,
      churnRate: 0,
      growthRate: 0.18
    },
    milestones: [
      {
        id: 'm1',
        title: 'Secure HIPAA compliance',
        description: 'Complete all requirements for HIPAA compliance',
        completed: true,
        date: getDaysAgo(180)
      },
      {
        id: 'm2',
        title: 'Partner with first hospital',
        description: 'Establish first major healthcare provider partnership',
        completed: true,
        date: getDaysAgo(120)
      },
      {
        id: 'm3',
        title: 'Complete patient beta',
        description: 'Test platform with initial patient group',
        completed: false
      }
    ]
  },
  {
    id: '6',
    name: 'Jamal Williams',
    companyName: 'Edumetrics',
    avatar: 'https://i.pravatar.cc/150?img=12',
    stage: 'Pre-Customer',
    arr: 0,
    firstInteraction: getDaysAgo(120),
    lastInteraction: getDaysAgo(4),
    status: 'Needs Attention',
    bio: 'EdTech specialist creating learning analytics platform for K-12.',
    resources: {
      documents: 7,
      callRecordings: 9,
      emailThreads: 31,
      meetingNotes: 15,
    },
    metrics: {
      customerCount: 0,
      churnRate: 0,
      growthRate: 0
    },
    milestones: [
      {
        id: 'm1',
        title: 'Complete product prototype',
        description: 'Develop working prototype to demo to schools',
        completed: true,
        date: getDaysAgo(60)
      },
      {
        id: 'm2',
        title: 'Conduct pilot program',
        description: 'Run initial program with 2-3 school districts',
        completed: false
      }
    ]
  }
];
