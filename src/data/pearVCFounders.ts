
import { Founder, FounderStage, StatusType } from './types';

// Helper function to convert funding stage to founder stage
const fundingStageToFounderStage = (fundingStage: string): FounderStage => {
  if (fundingStage.includes('Pre-Seed') || fundingStage.includes('Seed')) {
    return 'Pre-Customer';
  } else if (fundingStage.includes('Series A')) {
    return 'Founder-Led Sales';
  } else if (fundingStage.includes('Series B') || fundingStage.includes('Series C')) {
    return 'Expansion';
  } else if (fundingStage.includes('Series D') || fundingStage.includes('Series E') || fundingStage.includes('IPO') || fundingStage.includes('Unicorn')) {
    return 'Expansion';
  } else {
    return 'Pre-Product';
  }
};

// Helper function to convert company status to status type
const companyStatusToStatusType = (status: string): StatusType => {
  if (status.includes('Active')) {
    return 'On Track';
  } else if (status.includes('Acquired') || status.includes('Public')) {
    return 'On Track';
  } else if (status.includes('Defunct') || status.includes('Out of Business')) {
    return 'At Risk';
  } else {
    return 'Needs Attention';
  }
};

// Helper function to generate a random date within a range
function getRandomDate(start: Date, end: Date): string {
  const date = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
  return date.toISOString();
}

// Helper function to get a random avatar URL
function getRandomAvatar(index: number): string {
  const avatarId = (index % 70) + 1;
  return `https://i.pravatar.cc/150?img=${avatarId}`;
}

// Generate the Pear VC founders data
export const pearVCFounders: Founder[] = [
  // First batch - A to F companies
  {
    id: '1',
    name: 'Ethan Agarwal',
    companyName: 'Aaptiv',
    avatar: getRandomAvatar(1),
    stage: fundingStageToFounderStage('Series C'),
    arr: 5200000,
    firstInteraction: getRandomDate(new Date('2022-01-01'), new Date('2022-12-31')),
    lastInteraction: getRandomDate(new Date('2024-01-01'), new Date('2024-05-22')),
    status: companyStatusToStatusType('Active'),
    bio: 'Founded Aaptiv, a fitness/health tech company based in New York.',
    resources: {
      documents: Math.floor(Math.random() * 20) + 5,
      callRecordings: Math.floor(Math.random() * 15) + 3,
      emailThreads: Math.floor(Math.random() * 50) + 20,
      meetingNotes: Math.floor(Math.random() * 25) + 10,
    },
    metrics: {
      customerCount: Math.floor(Math.random() * 100) + 20,
      churnRate: Math.random() * 0.1,
      growthRate: Math.random() * 0.3 + 0.1,
    },
    milestones: [
      {
        id: 'm1',
        title: 'Secure Series C funding',
        description: 'Complete Series C funding round',
        completed: true,
        date: getRandomDate(new Date('2022-01-01'), new Date('2023-12-31'))
      },
      {
        id: 'm2',
        title: 'Expand user base to 1M',
        description: 'Reach 1 million active users',
        completed: true,
        date: getRandomDate(new Date('2023-01-01'), new Date('2023-12-31'))
      },
      {
        id: 'm3',
        title: 'Launch premium subscription tier',
        description: 'Introduce higher-priced subscription with additional features',
        completed: false
      }
    ]
  },
  {
    id: '2',
    name: 'Joe Lonsdale',
    companyName: 'Addepar',
    avatar: getRandomAvatar(2),
    stage: 'Expansion',
    arr: 120000000,
    firstInteraction: getRandomDate(new Date('2019-01-01'), new Date('2019-12-31')),
    lastInteraction: getRandomDate(new Date('2024-01-01'), new Date('2024-05-22')),
    status: 'On Track',
    bio: 'Co-founder of Addepar, a FinTech (Wealth Mgmt) company based in Mountain View, CA.',
    resources: {
      documents: Math.floor(Math.random() * 30) + 10,
      callRecordings: Math.floor(Math.random() * 25) + 5,
      emailThreads: Math.floor(Math.random() * 100) + 50,
      meetingNotes: Math.floor(Math.random() * 50) + 20,
    },
    metrics: {
      customerCount: Math.floor(Math.random() * 500) + 100,
      churnRate: Math.random() * 0.05,
      growthRate: Math.random() * 0.4 + 0.2,
    },
    milestones: [
      {
        id: 'm1',
        title: 'Achieve unicorn status',
        description: 'Reach $1B+ valuation',
        completed: true,
        date: getRandomDate(new Date('2020-01-01'), new Date('2021-12-31'))
      },
      {
        id: 'm2',
        title: 'Expand internationally',
        description: 'Open offices in Europe and Asia',
        completed: true,
        date: getRandomDate(new Date('2022-01-01'), new Date('2023-12-31'))
      },
      {
        id: 'm3',
        title: 'Prepare for IPO',
        description: 'Complete pre-IPO preparations and filings',
        completed: false
      }
    ]
  },
  {
    id: '3',
    name: 'Pavan Katepalli',
    companyName: 'Advex AI',
    avatar: getRandomAvatar(3),
    stage: 'Pre-Customer',
    arr: 300000,
    firstInteraction: getRandomDate(new Date('2023-01-01'), new Date('2023-12-31')),
    lastInteraction: getRandomDate(new Date('2024-01-01'), new Date('2024-05-22')),
    status: 'Needs Attention',
    bio: 'CEO of Advex AI, an AI/Analytics startup based in Pleasanton, CA.',
    resources: {
      documents: Math.floor(Math.random() * 10) + 2,
      callRecordings: Math.floor(Math.random() * 8) + 2,
      emailThreads: Math.floor(Math.random() * 30) + 10,
      meetingNotes: Math.floor(Math.random() * 15) + 5,
    },
    metrics: {
      customerCount: Math.floor(Math.random() * 10) + 2,
      churnRate: Math.random() * 0.2,
      growthRate: Math.random() * 0.5 + 0.2,
    },
    milestones: [
      {
        id: 'm1',
        title: 'Complete MVP',
        description: 'Finalize minimum viable product',
        completed: true,
        date: getRandomDate(new Date('2023-01-01'), new Date('2023-06-30'))
      },
      {
        id: 'm2',
        title: 'Secure first enterprise client',
        description: 'Sign first paying enterprise customer',
        completed: false
      }
    ]
  },
  {
    id: '4',
    name: 'Ray Zhou',
    companyName: 'Affinity',
    avatar: getRandomAvatar(4),
    stage: 'Expansion',
    arr: 15000000,
    firstInteraction: getRandomDate(new Date('2021-01-01'), new Date('2021-12-31')),
    lastInteraction: getRandomDate(new Date('2024-01-01'), new Date('2024-05-22')),
    status: 'On Track',
    bio: 'Co-founder & CEO of Affinity, a CRM/Networking platform based in San Francisco, CA.',
    resources: {
      documents: Math.floor(Math.random() * 25) + 8,
      callRecordings: Math.floor(Math.random() * 20) + 5,
      emailThreads: Math.floor(Math.random() * 80) + 40,
      meetingNotes: Math.floor(Math.random() * 40) + 15,
    },
    metrics: {
      customerCount: Math.floor(Math.random() * 300) + 50,
      churnRate: Math.random() * 0.08,
      growthRate: Math.random() * 0.35 + 0.15,
    },
    milestones: [
      {
        id: 'm1',
        title: 'Series C funding',
        description: 'Close Series C funding round',
        completed: true,
        date: getRandomDate(new Date('2022-01-01'), new Date('2023-12-31'))
      },
      {
        id: 'm2',
        title: 'Launch new product suite',
        description: 'Release integrated product suite for enterprise clients',
        completed: true,
        date: getRandomDate(new Date('2023-01-01'), new Date('2023-12-31'))
      },
      {
        id: 'm3',
        title: 'Expand market reach to finance sector',
        description: 'Adapt platform for financial services industry',
        completed: false
      }
    ]
  },
  {
    id: '5',
    name: 'Doma Tsai',
    companyName: 'AfterHour',
    avatar: getRandomAvatar(5),
    stage: 'Pre-Product',
    arr: 0,
    firstInteraction: getRandomDate(new Date('2023-06-01'), new Date('2023-12-31')),
    lastInteraction: getRandomDate(new Date('2024-01-01'), new Date('2024-05-22')),
    status: 'Needs Attention',
    bio: 'Founder of AfterHour, a social networking startup based in San Francisco, CA.',
    resources: {
      documents: Math.floor(Math.random() * 8) + 2,
      callRecordings: Math.floor(Math.random() * 6) + 1,
      emailThreads: Math.floor(Math.random() * 20) + 5,
      meetingNotes: Math.floor(Math.random() * 10) + 3,
    },
    metrics: {
      customerCount: 0,
      churnRate: 0,
      growthRate: 0,
    },
    milestones: [
      {
        id: 'm1',
        title: 'Complete proof of concept',
        description: 'Finish initial proof of concept and prototype',
        completed: true,
        date: getRandomDate(new Date('2023-06-01'), new Date('2023-12-31'))
      },
      {
        id: 'm2',
        title: 'Close seed funding round',
        description: 'Secure initial seed investment',
        completed: false
      }
    ]
  },
  {
    id: '6',
    name: 'Tom Faulhaber',
    companyName: 'Aklivity',
    avatar: getRandomAvatar(6),
    stage: 'Pre-Customer',
    arr: 200000,
    firstInteraction: getRandomDate(new Date('2022-01-01'), new Date('2022-12-31')),
    lastInteraction: getRandomDate(new Date('2024-01-01'), new Date('2024-05-22')),
    status: 'On Track',
    bio: 'Co-founder of Aklivity, a developer tools company based in East Brunswick, NJ.',
    resources: {
      documents: Math.floor(Math.random() * 12) + 4,
      callRecordings: Math.floor(Math.random() * 10) + 3,
      emailThreads: Math.floor(Math.random() * 35) + 15,
      meetingNotes: Math.floor(Math.random() * 20) + 8,
    },
    metrics: {
      customerCount: Math.floor(Math.random() * 15) + 5,
      churnRate: Math.random() * 0.1,
      growthRate: Math.random() * 0.4 + 0.1,
    },
    milestones: [
      {
        id: 'm1',
        title: 'Launch beta program',
        description: 'Release beta version to early adopters',
        completed: true,
        date: getRandomDate(new Date('2022-06-01'), new Date('2022-12-31'))
      },
      {
        id: 'm2',
        title: 'Secure first enterprise customers',
        description: 'Sign first paying enterprise clients',
        completed: true,
        date: getRandomDate(new Date('2023-01-01'), new Date('2023-12-31'))
      },
      {
        id: 'm3',
        title: 'Complete Series A funding',
        description: 'Raise Series A investment round',
        completed: false
      }
    ]
  },
  {
    id: '7',
    name: 'Adam Foroughi',
    companyName: 'AppLovin',
    avatar: getRandomAvatar(7),
    stage: 'Expansion',
    arr: 350000000,
    firstInteraction: getRandomDate(new Date('2018-01-01'), new Date('2018-12-31')),
    lastInteraction: getRandomDate(new Date('2024-01-01'), new Date('2024-05-22')),
    status: 'On Track',
    bio: 'Co-founder & CEO of AppLovin, an AdTech/Mobile Gaming company based in Palo Alto, CA.',
    resources: {
      documents: Math.floor(Math.random() * 40) + 15,
      callRecordings: Math.floor(Math.random() * 30) + 10,
      emailThreads: Math.floor(Math.random() * 150) + 80,
      meetingNotes: Math.floor(Math.random() * 70) + 30,
    },
    metrics: {
      customerCount: Math.floor(Math.random() * 5000) + 1000,
      churnRate: Math.random() * 0.03,
      growthRate: Math.random() * 0.25 + 0.15,
    },
    milestones: [
      {
        id: 'm1',
        title: 'Complete IPO',
        description: 'Successfully go public on NASDAQ',
        completed: true,
        date: '2021-04-15T10:00:00Z'
      },
      {
        id: 'm2',
        title: 'Expand into new markets',
        description: 'Launch services in APAC region',
        completed: true,
        date: getRandomDate(new Date('2022-01-01'), new Date('2022-12-31'))
      },
      {
        id: 'm3',
        title: 'Diversify revenue streams',
        description: 'Develop and launch new product lines',
        completed: true,
        date: getRandomDate(new Date('2023-01-01'), new Date('2023-12-31'))
      },
      {
        id: 'm4',
        title: 'Strategic acquisition',
        description: 'Acquire complementary technology company',
        completed: false
      }
    ]
  },
  {
    id: '8',
    name: 'Christopher Hopper',
    companyName: 'Aurora Solar',
    avatar: getRandomAvatar(8),
    stage: 'Expansion',
    arr: 25000000,
    firstInteraction: getRandomDate(new Date('2020-01-01'), new Date('2020-12-31')),
    lastInteraction: getRandomDate(new Date('2024-01-01'), new Date('2024-05-22')),
    status: 'On Track',
    bio: 'Co-founder & CEO of Aurora Solar, a Climate Tech (Solar) company based in San Francisco, CA.',
    resources: {
      documents: Math.floor(Math.random() * 30) + 10,
      callRecordings: Math.floor(Math.random() * 25) + 8,
      emailThreads: Math.floor(Math.random() * 90) + 40,
      meetingNotes: Math.floor(Math.random() * 45) + 20,
    },
    metrics: {
      customerCount: Math.floor(Math.random() * 400) + 100,
      churnRate: Math.random() * 0.06,
      growthRate: Math.random() * 0.35 + 0.2,
    },
    milestones: [
      {
        id: 'm1',
        title: 'Series C funding',
        description: 'Secure Series C investment round',
        completed: true,
        date: getRandomDate(new Date('2021-01-01'), new Date('2021-12-31'))
      },
      {
        id: 'm2',
        title: 'Launch enterprise platform',
        description: 'Release enterprise-grade solar design platform',
        completed: true,
        date: getRandomDate(new Date('2022-01-01'), new Date('2022-12-31'))
      },
      {
        id: 'm3',
        title: 'Expand internationally',
        description: 'Launch services in European markets',
        completed: false
      }
    ]
  },
  {
    id: '9',
    name: 'Yinudev Tran',
    companyName: 'Axle Health',
    avatar: getRandomAvatar(9),
    stage: 'Pre-Customer',
    arr: 450000,
    firstInteraction: getRandomDate(new Date('2022-01-01'), new Date('2022-12-31')),
    lastInteraction: getRandomDate(new Date('2024-01-01'), new Date('2024-05-22')),
    status: 'Needs Attention',
    bio: 'Co-founder of Axle Health, a Healthcare Services company based in Claymont, DE.',
    resources: {
      documents: Math.floor(Math.random() * 15) + 5,
      callRecordings: Math.floor(Math.random() * 12) + 4,
      emailThreads: Math.floor(Math.random() * 40) + 20,
      meetingNotes: Math.floor(Math.random() * 25) + 10,
    },
    metrics: {
      customerCount: Math.floor(Math.random() * 20) + 5,
      churnRate: Math.random() * 0.15,
      growthRate: Math.random() * 0.45 + 0.15,
    },
    milestones: [
      {
        id: 'm1',
        title: 'Launch MVP',
        description: 'Release minimum viable product to market',
        completed: true,
        date: getRandomDate(new Date('2022-06-01'), new Date('2022-12-31'))
      },
      {
        id: 'm2',
        title: 'First healthcare partnership',
        description: 'Secure first major healthcare provider partnership',
        completed: false
      }
    ]
  },
  {
    id: '10',
    name: 'Doug Dennerline',
    companyName: 'BetterWorks',
    avatar: getRandomAvatar(10),
    stage: 'Founder-Led Sales',
    arr: 8000000,
    firstInteraction: getRandomDate(new Date('2021-01-01'), new Date('2021-12-31')),
    lastInteraction: getRandomDate(new Date('2024-01-01'), new Date('2024-05-22')),
    status: 'On Track',
    bio: 'CEO of BetterWorks, an Enterprise Software company based in Redwood City, CA.',
    resources: {
      documents: Math.floor(Math.random() * 20) + 8,
      callRecordings: Math.floor(Math.random() * 18) + 7,
      emailThreads: Math.floor(Math.random() * 65) + 30,
      meetingNotes: Math.floor(Math.random() * 35) + 15,
    },
    metrics: {
      customerCount: Math.floor(Math.random() * 150) + 50,
      churnRate: Math.random() * 0.08,
      growthRate: Math.random() * 0.3 + 0.15,
    },
    milestones: [
      {
        id: 'm1',
        title: 'Series B funding',
        description: 'Secure Series B investment round',
        completed: true,
        date: getRandomDate(new Date('2021-06-01'), new Date('2021-12-31'))
      },
      {
        id: 'm2',
        title: 'Launch enhanced platform',
        description: 'Release new version with advanced features',
        completed: true,
        date: getRandomDate(new Date('2022-01-01'), new Date('2022-12-31'))
      },
      {
        id: 'm3',
        title: 'Expand sales team',
        description: 'Grow sales team to support expansion',
        completed: false
      }
    ]
  },
  {
    id: '11',
    name: 'Tony Xu',
    companyName: 'DoorDash',
    avatar: getRandomAvatar(11),
    stage: 'Expansion',
    arr: 800000000,
    firstInteraction: getRandomDate(new Date('2017-01-01'), new Date('2017-12-31')),
    lastInteraction: getRandomDate(new Date('2024-01-01'), new Date('2024-05-22')),
    status: 'On Track',
    bio: 'Co-founder & CEO of DoorDash, a Food Delivery platform based in Palo Alto, CA.',
    resources: {
      documents: Math.floor(Math.random() * 50) + 20,
      callRecordings: Math.floor(Math.random() * 40) + 15,
      emailThreads: Math.floor(Math.random() * 200) + 100,
      meetingNotes: Math.floor(Math.random() * 100) + 50,
    },
    metrics: {
      customerCount: Math.floor(Math.random() * 10000) + 5000,
      churnRate: Math.random() * 0.05,
      growthRate: Math.random() * 0.25 + 0.15,
    },
    milestones: [
      {
        id: 'm1',
        title: 'Complete IPO',
        description: 'Successfully go public on NYSE',
        completed: true,
        date: '2020-12-09T10:00:00Z'
      },
      {
        id: 'm2',
        title: 'International expansion',
        description: 'Launch services in multiple countries',
        completed: true,
        date: getRandomDate(new Date('2021-01-01'), new Date('2021-12-31'))
      },
      {
        id: 'm3',
        title: 'Diversify service offerings',
        description: 'Expand beyond food delivery to other categories',
        completed: true,
        date: getRandomDate(new Date('2022-01-01'), new Date('2022-12-31'))
      },
      {
        id: 'm4',
        title: 'Launch subscription service',
        description: 'Roll out premium subscription model globally',
        completed: true,
        date: getRandomDate(new Date('2023-01-01'), new Date('2023-12-31'))
      }
    ]
  },
  {
    id: '12',
    name: 'Drew Houston',
    companyName: 'Dropbox',
    avatar: getRandomAvatar(12),
    stage: 'Expansion',
    arr: 1500000000,
    firstInteraction: getRandomDate(new Date('2016-01-01'), new Date('2016-12-31')),
    lastInteraction: getRandomDate(new Date('2024-01-01'), new Date('2024-05-22')),
    status: 'On Track',
    bio: 'Co-founder & CEO of Dropbox, a Cloud Storage company based in San Francisco, CA.',
    resources: {
      documents: Math.floor(Math.random() * 60) + 25,
      callRecordings: Math.floor(Math.random() * 45) + 20,
      emailThreads: Math.floor(Math.random() * 250) + 120,
      meetingNotes: Math.floor(Math.random() * 120) + 60,
    },
    metrics: {
      customerCount: Math.floor(Math.random() * 20000) + 10000,
      churnRate: Math.random() * 0.04,
      growthRate: Math.random() * 0.18 + 0.12,
    },
    milestones: [
      {
        id: 'm1',
        title: 'Complete IPO',
        description: 'Successfully go public on NASDAQ',
        completed: true,
        date: '2018-03-23T10:00:00Z'
      },
      {
        id: 'm2',
        title: 'Launch Dropbox Paper',
        description: 'Release collaborative document product',
        completed: true,
        date: getRandomDate(new Date('2019-01-01'), new Date('2019-12-31'))
      },
      {
        id: 'm3',
        title: 'Expand enterprise offerings',
        description: 'Enhance products for enterprise customers',
        completed: true,
        date: getRandomDate(new Date('2020-01-01'), new Date('2020-12-31'))
      },
      {
        id: 'm4',
        title: 'Strategic acquisitions',
        description: 'Acquire complementary technology companies',
        completed: true,
        date: getRandomDate(new Date('2021-01-01'), new Date('2021-12-31'))
      }
    ]
  },
];

// Get the 8 most active founders based on lastInteraction date
export const getActiveFounders = () => {
  return [...pearVCFounders]
    .sort((a, b) => new Date(b.lastInteraction).getTime() - new Date(a.lastInteraction).getTime())
    .slice(0, 8);
};
