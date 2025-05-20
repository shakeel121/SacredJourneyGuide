import { Link } from "wouter";
import { useLanguage } from "@/hooks/use-language";
import { useState, useEffect } from "react";
import { ImageSlider } from "@/components/ui/image-slider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Video, Map, Award } from "lucide-react";

export default function HeroSection() {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  
  const heroImages = [
    {
      url: "https://images.unsplash.com/photo-1537031934600-7046ab816a21?q=80&w=2070&auto=format&fit=crop", 
      alt: "Kaaba during Hajj",
      caption: t("Kaaba - The Sacred House of Allah", "الكعبة - بيت الله الحرام")
    },
    {
      url: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=2070&auto=format&fit=crop", 
      alt: "Masjid al-Nabawi",
      caption: t("Masjid al-Nabawi - The Prophet's Mosque", "المسجد النبوي - مسجد النبي")
    },
    {
      url: "https://images.unsplash.com/photo-1538121661321-edc084adb513?q=80&w=2070&auto=format&fit=crop", 
      alt: "Pilgrims during Hajj",
      caption: t("Millions of Muslims gather for the annual pilgrimage", "يجتمع ملايين المسلمين للحج السنوي")
    },
    {
      url: "https://images.unsplash.com/photo-1564769625673-cb844a3763ef?q=80&w=1974&auto=format&fit=crop", 
      alt: "Mount Arafat",
      caption: t("Mount Arafat - Where pilgrims gather on the Day of Arafah", "جبل عرفات - حيث يجتمع الحجاج في يوم عرفة")
    },
    {
      url: "https://images.unsplash.com/photo-1519058082350-08716243d33a?q=80&w=2073&auto=format&fit=crop", 
      alt: "Tawaf around Kaaba",
      caption: t("Pilgrims performing Tawaf around the Kaaba", "الحجاج يؤدون الطواف حول الكعبة")
    }
  ];
  
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  return (
    <section className="relative h-[85vh] min-h-[600px] bg-[#0A6E43] text-white">
      <div className="absolute inset-0 z-0">
        <ImageSlider 
          images={heroImages} 
          height="h-full" 
          className="rounded-none"
          overlay={true}
          autoPlay={true}
          interval={6000}
        />
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/60 z-10"></div>
      
      <div className="relative container mx-auto px-4 h-full flex flex-col items-center justify-center text-center z-20">
        <div className={`transition-all duration-1000 ease-in-out transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <Badge 
            className="bg-[#D4AF37] text-white mb-4 py-1.5 px-4 text-sm border-none"
          >
            {t("Authentic Islamic Guidance", "التوجيه الإسلامي الأصيل")}
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            <span className="block">
              {t("Learn Authentic", "تعلم الأصيل")}
            </span>
            <span className="block text-[#D4AF37]">
              {t("Hajj & Umrah Rituals", "مناسك الحج والعمرة")}
            </span>
          </h1>
          
          <p className="text-xl max-w-3xl mx-auto mb-10 text-white/90">
            {t(
              "Comprehensive virtual learning platform based on authentic guidance from Saudi Salafi Ulema with verified references.",
              "منصة تعليمية افتراضية شاملة تستند إلى توجيهات أصيلة من علماء السلف السعوديين مع مراجع موثقة."
            )}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/hajj">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8">
                {t("Start Learning", "ابدأ التعلم")}
              </Button>
            </Link>
            <Link href="/duas">
              <Button size="lg" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20 px-8">
                {t("Explore Resources", "استكشف الموارد")}
              </Button>
            </Link>
            <Link href="/blog">
              <Button size="lg" className="bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-white px-8">
                {t("Read Blog", "اقرأ المدونة")}
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex flex-col items-center text-center hover:bg-white/20 transition">
              <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 flex items-center justify-center mb-2">
                <BookOpen className="h-5 w-5 text-[#D4AF37]" />
              </div>
              <h3 className="font-medium text-sm">{t("Step-by-Step Guides", "أدلة خطوة بخطوة")}</h3>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex flex-col items-center text-center hover:bg-white/20 transition">
              <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 flex items-center justify-center mb-2">
                <Video className="h-5 w-5 text-[#D4AF37]" />
              </div>
              <h3 className="font-medium text-sm">{t("Video Demonstrations", "عروض الفيديو")}</h3>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex flex-col items-center text-center hover:bg-white/20 transition">
              <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 flex items-center justify-center mb-2">
                <Map className="h-5 w-5 text-[#D4AF37]" />
              </div>
              <h3 className="font-medium text-sm">{t("Interactive Maps", "خرائط تفاعلية")}</h3>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex flex-col items-center text-center hover:bg-white/20 transition">
              <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 flex items-center justify-center mb-2">
                <Award className="h-5 w-5 text-[#D4AF37]" />
              </div>
              <h3 className="font-medium text-sm">{t("Authentic References", "مراجع أصيلة")}</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
