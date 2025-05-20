import { useAdvertisements } from "@/hooks/use-advertisement";
import { useLanguage } from "@/hooks/use-language";
import { Skeleton } from "@/components/ui/skeleton";

interface AdvertisementBannerProps {
  location: string;
}

export function AdvertisementBanner({ location }: AdvertisementBannerProps) {
  const { data: advertisements, isLoading, error } = useAdvertisements(location);
  const { t } = useLanguage();
  
  if (isLoading) {
    return (
      <div className="bg-gray-100 dark:bg-gray-800 p-4 text-center">
        <div className="container mx-auto border border-gray-300 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-900">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{t("ADVERTISEMENT", "إعلان")}</p>
          <div className="h-24 flex items-center justify-center">
            <Skeleton className="h-full w-full" />
          </div>
        </div>
      </div>
    );
  }
  
  if (error || !advertisements || advertisements.length === 0) {
    return null;
  }
  
  // Get a random advertisement from the available ones
  const ad = advertisements[Math.floor(Math.random() * advertisements.length)];
  
  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-4 text-center">
      <div className="container mx-auto border border-gray-300 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-900">
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{t("ADVERTISEMENT", "إعلان")}</p>
        <a 
          href={ad.link} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="block h-24 flex items-center justify-center bg-gray-200 dark:bg-gray-800 rounded hover:bg-gray-300 dark:hover:bg-gray-700 transition"
        >
          <p className="text-gray-700 dark:text-gray-300 font-medium">{ad.title} - {ad.description}</p>
        </a>
      </div>
    </div>
  );
}
