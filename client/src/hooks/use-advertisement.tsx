import { useQuery } from "@tanstack/react-query";
import { Advertisement } from "@shared/schema";

export function useAdvertisements(location: string) {
  return useQuery<Advertisement[]>({
    queryKey: ['/api/advertisements', location],
    queryFn: () => fetch(`/api/advertisements?location=${location}`).then(res => res.json()),
  });
}
