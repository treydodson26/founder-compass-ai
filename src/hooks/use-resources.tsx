
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Resource } from "@/data/types";

export function useResources(founderId?: string) {
  return useQuery({
    queryKey: founderId ? ['resources', founderId] : ['resources'],
    queryFn: async (): Promise<Resource[]> => {
      console.log('Fetching resources from Supabase...', founderId ? `for founder ${founderId}` : 'all');
      
      let query = supabase
        .from('resources')
        .select('*')
        .order('created_at', { ascending: false });

      if (founderId) {
        query = query.eq('founder_id', founderId);
      }

      const { data: resourcesData, error: resourcesError } = await query;

      if (resourcesError) {
        console.error('Error fetching resources:', resourcesError);
        throw resourcesError;
      }

      console.log('Resources data fetched:', resourcesData);

      // Transform the data to match our Resource interface
      const resources: Resource[] = (resourcesData || []).map((resource) => ({
        id: resource.id,
        founderId: resource.founder_id || '',
        title: resource.title,
        description: resource.description || '',
        type: resource.type,
        fileUrl: resource.file_url || '',
        fileType: resource.file_type || '',
        thumbnailUrl: resource.thumbnail_url || '',
        createdAt: resource.created_at || new Date().toISOString(),
        updatedAt: resource.updated_at || new Date().toISOString(),
        tags: resource.tags || [],
      }));

      return resources;
    },
  });
}

export function useResource(id: string) {
  return useQuery({
    queryKey: ['resource', id],
    queryFn: async (): Promise<Resource | null> => {
      console.log('Fetching resource from Supabase:', id);
      
      const { data: resourceData, error: resourceError } = await supabase
        .from('resources')
        .select('*')
        .eq('id', id)
        .single();

      if (resourceError) {
        console.error('Error fetching resource:', resourceError);
        if (resourceError.code === 'PGRST116') {
          return null; // Not found
        }
        throw resourceError;
      }

      console.log('Resource data fetched:', resourceData);

      if (!resourceData) return null;

      // Transform the data to match our Resource interface
      const resource: Resource = {
        id: resourceData.id,
        founderId: resourceData.founder_id || '',
        title: resourceData.title,
        description: resourceData.description || '',
        type: resourceData.type,
        fileUrl: resourceData.file_url || '',
        fileType: resourceData.file_type || '',
        thumbnailUrl: resourceData.thumbnail_url || '',
        createdAt: resourceData.created_at || new Date().toISOString(),
        updatedAt: resourceData.updated_at || new Date().toISOString(),
        tags: resourceData.tags || [],
      };

      return resource;
    },
    enabled: !!id,
  });
}
