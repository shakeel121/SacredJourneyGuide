import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { useLanguage } from "@/hooks/use-language";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight } from "lucide-react";
import { HajjGuide } from "@shared/schema";

export default function HajjSection() {
  const { t, language } = useLanguage();
  const { data: guides, isLoading, error } = useQuery<HajjGuide[]>({
    queryKey: ['/api/hajj-guides'],
  });
  
  return (
    <section id="hajj" className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-4">
              {t("Virtual Hajj Guide", "دليل الحج الافتراضي")}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {t(
                "Learn the complete Hajj rituals following the authentic Sunnah with step-by-step guidance from Saudi Salafi scholars.",
                "تعلم مناسك الحج الكاملة باتباع السنة الأصيلة مع التوجيه خطوة بخطوة من علماء السلف السعوديين."
              )}
            </p>
            
            <div className="space-y-4 mb-6">
              {isLoading ? (
                Array(5).fill(0).map((_, i) => (
                  <div key={i} className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 mr-3">
                      <Skeleton className="w-6 h-6 rounded-full" />
                    </div>
                    <Skeleton className="h-5 w-48" />
                  </div>
                ))
              ) : error ? (
                <div className="text-red-500">
                  {t("Failed to load Hajj guides", "فشل تحميل أدلة الحج")}
                </div>
              ) : (
                guides?.map((guide, index) => (
                  <div key={guide.id} className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center mr-3">
                      {index + 1}
                    </div>
                    <span className="font-medium">
                      {language === "en" ? guide.title : guide.title_ar}
                    </span>
                  </div>
                ))
              )}
            </div>
            
            <Link href="/hajj">
              <a className="flex items-center text-primary">
                <span className="font-medium mr-2">
                  {t("View complete Hajj guide", "عرض دليل الحج الكامل")}
                </span>
                <ChevronRight className="w-4 h-4" />
              </a>
            </Link>
          </div>
          
          <div className="md:w-1/2">
            <div className="relative rounded-lg overflow-hidden h-80">
              <img 
                src="https://images.unsplash.com/photo-1519058082350-08716243d33a?q=80&w=2073&auto=format&fit=crop"
                alt={t("Pilgrims performing Tawaf around the Kaaba", "الحجاج يؤدون الطواف حول الكعبة")} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <span className="bg-primary text-white text-sm py-1 px-3 rounded">
                  {t("Interactive Guide", "دليل تفاعلي")}
                </span>
                <h3 className="text-white text-xl font-bold mt-2">
                  {t("Learn proper Tawaf procedures", "تعلم إجراءات الطواف الصحيحة")}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
