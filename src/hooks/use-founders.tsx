
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Founder, Milestone, FounderStage, StatusType } from "@/data/types";

export function useFounders() {
  // Helper to map a customers row to our Founder interface
  const mapCustomerToFounder = (customer: any): Founder => {
    const toStage = (status?: string | null): FounderStage => {
      switch ((status || '').toLowerCase()) {
        case 'prospect':
        case 'new':
          return 'Pre-Customer';
        case 'intro_trial':
          return 'Founder-Led Sales';
        case 'member':
          return 'Expansion';
        default:
          return 'Pre-Product';
      }
    };

    const toStatus = (c: any): StatusType => {
      const tlv = Number(c?.total_lifetime_value || 0);
      if (tlv > 0) return 'On Track';
      if ((c?.status || '').toLowerCase() === 'prospect' || (c?.status || '').toLowerCase() === 'new') return 'Needs Attention';
      return 'At Risk';
    };

    return {
      id: String(customer.id),
      name: customer.client_name || `${customer.first_name || ''} ${customer.last_name || ''}`.trim() || customer.client_email || 'Unknown Customer',
      companyName: customer.client_email || '—',
      avatar: 'https://i.pravatar.cc/150?img=1',
      stage: toStage(customer.status),
      arr: Number(customer.total_lifetime_value || 0),
      firstInteraction: customer.first_seen || new Date().toISOString(),
      lastInteraction: customer.last_seen || new Date().toISOString(),
      status: toStatus(customer),
      bio: customer.notes || '',
      resources: {
        documents: 0,
        callRecordings: 0,
        emailThreads: 0,
        meetingNotes: 0,
      },
      metrics: {
        customerCount: 0,
        churnRate: 0,
        growthRate: 0,
      },
      milestones: [],
    };
  };

  return useQuery({
    queryKey: ['founders'],
    queryFn: async (): Promise<Founder[]> => {
      console.log('Fetching customers from Supabase...');

      const { data: customersData, error: customersError } = await supabase
        .from('customers')
        .select('*');

      if (customersError) {
        console.error('Error fetching customers:', customersError);
        throw customersError;
      }

      console.log('Customers data fetched:', customersData);

      const founders: Founder[] = (customersData || []).map(mapCustomerToFounder);
      return founders;
    },
  });
}

export function useFounder(id: string) {
  // Reuse the same mapper
  const mapCustomerToFounder = (customer: any): Founder => {
    const toStage = (status?: string | null): FounderStage => {
      switch ((status || '').toLowerCase()) {
        case 'prospect':
        case 'new':
          return 'Pre-Customer';
        case 'intro_trial':
          return 'Founder-Led Sales';
        case 'member':
          return 'Expansion';
        default:
          return 'Pre-Product';
      }
    };

    const toStatus = (c: any): StatusType => {
      const tlv = Number(c?.total_lifetime_value || 0);
      if (tlv > 0) return 'On Track';
      if ((c?.status || '').toLowerCase() === 'prospect' || (c?.status || '').toLowerCase() === 'new') return 'Needs Attention';
      return 'At Risk';
    };

    return {
      id: String(customer.id),
      name: customer.client_name || `${customer.first_name || ''} ${customer.last_name || ''}`.trim() || customer.client_email || 'Unknown Customer',
      companyName: customer.client_email || '—',
      avatar: 'https://i.pravatar.cc/150?img=1',
      stage: toStage(customer.status),
      arr: Number(customer.total_lifetime_value || 0),
      firstInteraction: customer.first_seen || new Date().toISOString(),
      lastInteraction: customer.last_seen || new Date().toISOString(),
      status: toStatus(customer),
      bio: customer.notes || '',
      resources: {
        documents: 0,
        callRecordings: 0,
        emailThreads: 0,
        meetingNotes: 0,
      },
      metrics: {
        customerCount: 0,
        churnRate: 0,
        growthRate: 0,
      },
      milestones: [],
    };
  };

  return useQuery({
    queryKey: ['founder', id],
    queryFn: async (): Promise<Founder | null> => {
      console.log('Fetching customer from Supabase:', id);

      const numericId = Number(id);
      if (Number.isNaN(numericId)) {
        console.warn('Invalid customer id, expected number:', id);
        return null;
      }
      const { data: customerData, error: customerError } = await supabase
        .from('customers')
        .select('*')
        .eq('id', numericId)
        .maybeSingle();

      if (customerError) {
        console.error('Error fetching customer:', customerError);
        if ((customerError as any).code === 'PGRST116') {
          return null; // Not found
        }
        throw customerError;
      }

      console.log('Customer data fetched:', customerData);

      if (!customerData) return null;

      const founder: Founder = mapCustomerToFounder(customerData);
      return founder;
    },
    enabled: !!id,
  });
}
