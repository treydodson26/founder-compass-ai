
import { useQuery } from "@tanstack/react-query";
import { resources as mockResources } from "@/data/mockResources";
import { Resource } from "@/data/types";

export function useResources(founderId?: string) {
  return useQuery({
    queryKey: founderId ? ['resources', founderId] : ['resources'],
    queryFn: async (): Promise<Resource[]> => {
      console.log('Fetching resources from mock dataset...', founderId ? `for founder ${founderId}` : 'all');
      const list = founderId ? mockResources.filter(r => r.founderId === founderId) : mockResources;
      return list;
    },
  });
}

export function useResource(id: string) {
  return useQuery({
    queryKey: ['resource', id],
    queryFn: async (): Promise<Resource | null> => {
      console.log('Fetching resource from mock dataset:', id);
      const item = mockResources.find(r => r.id === id) || null;
      return item;
    },
    enabled: !!id,
  });
}
