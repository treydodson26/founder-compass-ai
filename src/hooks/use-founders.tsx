
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Founder, Milestone } from "@/data/types";

export function useFounders() {
  return useQuery({
    queryKey: ['founders'],
    queryFn: async (): Promise<Founder[]> => {
      console.log('Fetching founders from Supabase...');
      
      const { data: foundersData, error: foundersError } = await supabase
        .from('founders')
        .select(`
          *,
          milestones (*)
        `);

      if (foundersError) {
        console.error('Error fetching founders:', foundersError);
        throw foundersError;
      }

      console.log('Founders data fetched:', foundersData);

      // Transform the data to match our Founder interface
      const founders: Founder[] = foundersData.map((founder) => ({
        id: founder.id,
        name: founder.name,
        companyName: founder.company_name,
        avatar: founder.avatar || 'https://i.pravatar.cc/150?img=1',
        stage: founder.stage || 'Pre-Product',
        arr: founder.arr || 0,
        firstInteraction: founder.first_interaction || new Date().toISOString(),
        lastInteraction: founder.last_interaction || new Date().toISOString(),
        status: founder.status || 'On Track',
        bio: founder.bio || '',
        resources: {
          documents: founder.documents_count || 0,
          callRecordings: founder.call_recordings_count || 0,
          emailThreads: founder.email_threads_count || 0,
          meetingNotes: founder.meeting_notes_count || 0,
        },
        metrics: {
          customerCount: founder.customer_count || 0,
          churnRate: founder.churn_rate || 0,
          growthRate: founder.growth_rate || 0,
        },
        milestones: (founder.milestones || []).map((milestone: any): Milestone => ({
          id: milestone.id,
          title: milestone.title,
          description: milestone.description || '',
          completed: milestone.completed,
          date: milestone.date,
        })),
      }));

      return founders;
    },
  });
}

export function useFounder(id: string) {
  return useQuery({
    queryKey: ['founder', id],
    queryFn: async (): Promise<Founder | null> => {
      console.log('Fetching founder from Supabase:', id);
      
      const { data: founderData, error: founderError } = await supabase
        .from('founders')
        .select(`
          *,
          milestones (*)
        `)
        .eq('id', id)
        .single();

      if (founderError) {
        console.error('Error fetching founder:', founderError);
        if (founderError.code === 'PGRST116') {
          return null; // Not found
        }
        throw founderError;
      }

      console.log('Founder data fetched:', founderData);

      if (!founderData) return null;

      // Transform the data to match our Founder interface
      const founder: Founder = {
        id: founderData.id,
        name: founderData.name,
        companyName: founderData.company_name,
        avatar: founderData.avatar || 'https://i.pravatar.cc/150?img=1',
        stage: founderData.stage || 'Pre-Product',
        arr: founderData.arr || 0,
        firstInteraction: founderData.first_interaction || new Date().toISOString(),
        lastInteraction: founderData.last_interaction || new Date().toISOString(),
        status: founderData.status || 'On Track',
        bio: founderData.bio || '',
        resources: {
          documents: founderData.documents_count || 0,
          callRecordings: founderData.call_recordings_count || 0,
          emailThreads: founderData.email_threads_count || 0,
          meetingNotes: founderData.meeting_notes_count || 0,
        },
        metrics: {
          customerCount: founderData.customer_count || 0,
          churnRate: founderData.churn_rate || 0,
          growthRate: founderData.growth_rate || 0,
        },
        milestones: (founderData.milestones || []).map((milestone: any): Milestone => ({
          id: milestone.id,
          title: milestone.title,
          description: milestone.description || '',
          completed: milestone.completed,
          date: milestone.date,
        })),
      };

      return founder;
    },
    enabled: !!id,
  });
}
