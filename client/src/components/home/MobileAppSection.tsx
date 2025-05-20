import { useLanguage } from "@/hooks/use-language";
import { Button } from "@/components/ui/button";
import { Download, Globe, CheckCircle } from "lucide-react";

export default function MobileAppSection() {
  const { t, language } = useLanguage();
  
  return (
    <section className="py-16 bg-gradient-to-r from-primary to-primary/80 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-4">
              {t("Take Guidance Wherever You Go", "خذ التوجيه أينما ذهبت")}
            </h2>
            <p className="text-white/90 mb-6">
              {t(
                "Download our mobile application for offline access to guides, duas, and maps during your Hajj or Umrah journey.",
                "قم بتنزيل تطبيقنا للهاتف المحمول للوصول دون اتصال إلى الأدلة والأدعية والخرائط أثناء رحلة الحج أو العمرة."
              )}
            </p>
            
            <div className="space-y-4 mb-8">
              {[
                t("Access all guides offline during your journey", "الوصول إلى جميع الأدلة دون اتصال بالإنترنت أثناء رحلتك"),
                t("GPS-enabled maps for important sites", "خرائط تعمل بنظام تحديد المواقع للمواقع المهمة"),
                t("Audio recitation of duas with translations", "تلاوة صوتية للأدعية مع الترجمات")
              ].map((feature, index) => (
                <div key={index} className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-3 text-[#D4AF37]" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Button className="bg-white text-primary hover:bg-white/90">
                <Download className="mr-2 h-4 w-4" />
                {t("Download for iOS", "تنزيل لنظام iOS")}
              </Button>
              <Button className="bg-white text-primary hover:bg-white/90">
                <Download className="mr-2 h-4 w-4" />
                {t("Download for Android", "تنزيل لنظام Android")}
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/10">
                <Globe className="mr-2 h-4 w-4" />
                {t("Web Version", "النسخة الإلكترونية")}
              </Button>
            </div>
          </div>
          
          <div className="md:w-1/2 relative">
            <div className="aspect-[9/16] max-w-[300px] mx-auto relative z-10">
              <img
                src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1974&auto=format&fit=crop"
                alt={t("Mobile App Preview", "معاينة تطبيق الهاتف المحمول")}
                className="w-full h-full object-cover rounded-[36px] shadow-lg border-[8px] border-white/20"
              />
              
              <div className="absolute -top-4 -right-4 bg-[#D4AF37] text-white rounded-full py-2 px-4 shadow-lg transform rotate-12">
                {t("New!", "جديد!")}
              </div>
              
              <div className="absolute inset-0 rounded-[36px] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                  <p className="text-white font-medium">Hajj & Umrah Guide</p>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-1/4 -left-8 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-1/4 -right-4 w-20 h-20 bg-[#D4AF37]/20 rounded-full blur-lg"></div>
          </div>
        </div>
      </div>
    </section>
  );
}