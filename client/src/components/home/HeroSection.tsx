import { Link } from "wouter";
import { useLanguage } from "@/hooks/use-language";
import { useState, useEffect } from "react";

export default function HeroSection() {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const backgroundImages = [
    "https://images.unsplash.com/photo-1537031934600-7046ab816a21", // Kaaba
    "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa", // Masjid al-Nabawi
    "https://images.unsplash.com/photo-1538121661321-edc084adb513", // Pilgrims
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <section className="relative bg-[#0A6E43] text-white">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      {backgroundImages.map((img, index) => (
        <div 
          key={img}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
          style={{ 
            backgroundImage: `url(${img})`,
            filter: 'brightness(40%)'
          }} 
        />
      ))}
      <div className="relative container mx-auto px-4 py-20 flex flex-col items-center text-center z-10">
        <div className="animate-fadeIn">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="block">
              {t("Learn Authentic", "تعلم الأصيل")}
            </span>
            <span className="block text-[#D4AF37]">
              {t("Hajj & Umrah Rituals", "مناسك الحج والعمرة")}
            </span>
          </h1>
          <p className="text-xl max-w-3xl mb-8">
            {t(
              "Comprehensive virtual learning platform based on authentic guidance from Saudi Salafi Ulema with verified references.",
              "منصة تعليمية افتراضية شاملة تستند إلى توجيهات أصيلة من علماء السلف السعوديين مع مراجع موثقة."
            )}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/hajj">
              <span className="inline-block bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-md font-medium transition cursor-pointer">
                {t("Start Learning", "ابدأ التعلم")}
              </span>
            </Link>
            <Link href="/duas">
              <span className="inline-block bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-8 py-3 rounded-md font-medium transition cursor-pointer">
                {t("Explore Resources", "استكشف الموارد")}
              </span>
            </Link>
            <Link href="/blog">
              <span className="inline-block bg-[#D4AF37] hover:bg-[#B59125] text-white px-8 py-3 rounded-md font-medium transition cursor-pointer">
                {t("Read Blog", "اقرأ المدونة")}
              </span>
            </Link>
          </div>
        </div>
        
        <div className="absolute bottom-4 left-0 right-0 flex justify-center">
          {backgroundImages.map((_, index) => (
            <button 
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 mx-1 rounded-full ${
                index === currentSlide ? "bg-[#D4AF37]" : "bg-white opacity-50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
