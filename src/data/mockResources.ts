
import { Resource } from './types';

export const resources: Resource[] = [
  // Documents
  {
    id: "doc-1",
    founderId: "1",
    title: "Business Plan",
    description: "Initial business plan and market analysis",
    type: "Document",
    fileUrl: "/documents/business-plan.pdf",
    thumbnailUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    createdAt: "2025-01-15T10:30:00Z",
    updatedAt: "2025-01-15T10:30:00Z",
    tags: ["plan", "strategy", "market-analysis"]
  },
  {
    id: "doc-2",
    founderId: "1",
    title: "Pitch Deck",
    description: "Investor presentation for Series A",
    type: "Document",
    fileUrl: "/documents/pitch-deck.pptx",
    thumbnailUrl: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    createdAt: "2025-02-10T15:45:00Z",
    updatedAt: "2025-03-05T09:20:00Z",
    tags: ["pitch", "investors", "funding"]
  },
  // Call Recordings
  {
    id: "call-1",
    founderId: "1",
    title: "Initial Customer Interview",
    description: "First discussion with potential customer about pain points",
    type: "Call Recording",
    fileUrl: "/recordings/customer-interview-01.mp3",
    thumbnailUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    createdAt: "2025-01-20T13:00:00Z",
    updatedAt: "2025-01-20T13:00:00Z",
    tags: ["customer", "interview", "feedback"]
  },
  {
    id: "call-2",
    founderId: "1",
    title: "Investor Update Call",
    description: "Monthly progress update with lead investor",
    type: "Call Recording",
    fileUrl: "/recordings/investor-update-feb.mp3",
    thumbnailUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    createdAt: "2025-02-25T16:30:00Z",
    updatedAt: "2025-02-25T16:30:00Z",
    tags: ["investor", "update", "metrics"]
  },
  // Email Threads
  {
    id: "email-1",
    founderId: "1",
    title: "Partnership Negotiation",
    description: "Email thread discussing terms with potential distribution partner",
    type: "Email Thread",
    fileUrl: "/emails/partnership-thread.eml",
    thumbnailUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    createdAt: "2025-03-10T09:15:00Z",
    updatedAt: "2025-03-15T11:30:00Z",
    tags: ["partnership", "negotiation", "distribution"]
  },
  {
    id: "email-2",
    founderId: "2",
    title: "Customer Support Thread",
    description: "Resolution of technical issue with enterprise customer",
    type: "Email Thread",
    fileUrl: "/emails/support-thread.eml",
    thumbnailUrl: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    createdAt: "2025-03-22T14:20:00Z",
    updatedAt: "2025-03-23T10:05:00Z",
    tags: ["support", "customer", "technical"]
  },
  // Meeting Notes
  {
    id: "meeting-1",
    founderId: "2",
    title: "Product Roadmap Meeting",
    description: "Quarterly planning session for product development",
    type: "Meeting Note",
    fileUrl: "/notes/product-roadmap-q2.md",
    thumbnailUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    createdAt: "2025-04-05T11:00:00Z",
    updatedAt: "2025-04-05T11:00:00Z",
    tags: ["product", "roadmap", "planning"]
  },
  {
    id: "meeting-2",
    founderId: "3",
    title: "Board Meeting Notes",
    description: "Summary of quarterly board meeting discussions",
    type: "Meeting Note",
    fileUrl: "/notes/board-meeting-q1.md",
    thumbnailUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    createdAt: "2025-04-15T15:00:00Z",
    updatedAt: "2025-04-16T09:30:00Z",
    tags: ["board", "governance", "strategy"]
  }
];

// Helper function to get resources for a specific founder
export const getFounderResources = (founderId: string) => {
  return resources.filter(resource => resource.founderId === founderId);
};

// Helper function to get resources by type
export const getResourcesByType = (type: string) => {
  return resources.filter(resource => resource.type === type);
};

// Helper function to search resources
export const searchResources = (query: string) => {
  const lowercaseQuery = query.toLowerCase();
  return resources.filter(resource => 
    resource.title.toLowerCase().includes(lowercaseQuery) || 
    resource.description.toLowerCase().includes(lowercaseQuery) ||
    resource.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};
