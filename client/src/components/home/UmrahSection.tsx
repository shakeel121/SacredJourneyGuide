import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { useLanguage } from "@/hooks/use-language";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle, ChevronRight, MapPin, Video, BookOpen, Star } from "lucide-react";
import { UmrahGuide } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function UmrahSection() {
  const { t, language } = useLanguage();
  const { data: guides, isLoading, error } = useQuery<UmrahGuide[]>({
    queryKey: ['/api/umrah-guides'],
  });
  
  return (
    <section id="umrah" className="py-16 bg-light islamic-pattern">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            {t("Complete Umrah Guide", "دليل العمرة الكامل")}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t(
              "Learn the proper way to perform Umrah with step-by-step guidance based on authentic sources and scholarly references.",
              "تعلم الطريقة الصحيحة لأداء العمرة مع إرشادات خطوة بخطوة استنادًا إلى مصادر أصيلة ومراجع علمية."
            )}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {isLoading ? (
            Array(4).fill(0).map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition">
                <div className="flex justify-between items-start mb-4">
                  <Skeleton className="w-12 h-12 rounded-full" />
                  <Skeleton className="h-6 w-20" />
                </div>
                <Skeleton className="h-7 w-24 mb-2" />
                <Skeleton className="h-16 w-full mb-4" />
                <Skeleton className="h-4 w-full mb-4" />
                <Skeleton className="h-4 w-24 mt-4" />
              </div>
            ))
          ) : error ? (
            <div className="col-span-4 text-center text-red-500">
              {t("Failed to load Umrah guides", "فشل تحميل أدلة العمرة")}
            </div>
          ) : (
            guides?.slice(0, 4).map((guide, index) => (
              <div key={guide.id} className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden hover:shadow-lg transition">
                <div className="h-36 bg-primary/10 relative">
                  <img 
                    src={`https://images.unsplash.com/photo-156476965${2570 + index}?q=80&w=1974&auto=format`} 
                    alt={language === "en" ? guide.title : guide.title_ar} 
                    className="w-full h-full object-cover opacity-60"
                  />
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/50"></div>
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-secondary">
                      {t("Essential", "أساسي")}
                    </Badge>
                  </div>
                  <div className="absolute bottom-2 left-2 flex space-x-2">
                    <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <BookOpen className="h-3.5 w-3.5 text-white" />
                    </div>
                    <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <Video className="h-3.5 w-3.5 text-white" />
                    </div>
                    <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <MapPin className="h-3.5 w-3.5 text-white" />
                    </div>
                  </div>
                  <div className="absolute top-2 left-2">
                    <div className="w-9 h-9 bg-primary rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                      {index + 1}
                    </div>
                  </div>
                </div>
                
                <div className="p-5">
                  <h3 className="text-xl font-semibold mb-2">
                    {language === "en" ? guide.title : guide.title_ar}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm line-clamp-3">
                    {language === "en" ? guide.description : guide.description_ar}
                  </p>
                  <div className="flex items-center text-sm">
                    <div className="flex items-center">
                      <Star className="text-[#D4AF37] h-4 w-4" />
                      <Star className="text-[#D4AF37] h-4 w-4" />
                      <Star className="text-[#D4AF37] h-4 w-4" />
                      <Star className="text-[#D4AF37] h-4 w-4" />
                      <Star className="text-[#D4AF37] h-4 w-4" />
                      <span className="ml-1 text-xs text-gray-500">({Math.floor(Math.random() * 300) + 50})</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-xs mt-3 text-gray-500">
                    <CheckCircle className="text-primary mr-1 h-3 w-3" />
                    <span>{t("Authentic Reference", "المرجع الأصيل")}</span>
                  </div>
                  
                  <div className="mt-4 flex">
                    <Link href={`/umrah-guide#section-${guide.id}`}>
                      <Button variant="link" className="text-primary p-0 h-auto text-sm flex items-center">
                        {t("Learn more", "تعلم المزيد")}
                        <ChevronRight className="ml-1 h-3 w-3" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        <div className="mt-10 text-center">
          <Link href="/umrah-guide">
            <Button className="bg-primary hover:bg-primary/90 text-white">
              {t("View detailed Umrah guide", "عرض دليل العمرة المفصل")}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
