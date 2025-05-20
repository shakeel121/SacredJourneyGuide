import { useLanguage } from "@/hooks/use-language";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { QuoteIcon } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  name_ar: string;
  role: string;
  role_ar: string;
  quote: string;
  quote_ar: string;
  image: string;
  location: string;
  location_ar: string;
}

export default function TestimonialsSection() {
  const { t, language } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Abdullah Al-Hashemi",
      name_ar: "عبد الله الهاشمي",
      role: "First-time Hajj Pilgrim",
      role_ar: "حاج لأول مرة",
      quote: "This platform provided the most authentic guidance for my first Hajj journey. The detailed videos and step-by-step instructions helped me perform all rituals correctly according to the Sunnah.",
      quote_ar: "قدمت هذه المنصة أكثر التوجيهات أصالة لرحلة حجي الأولى. ساعدتني مقاطع الفيديو المفصلة والتعليمات خطوة بخطوة على أداء جميع المناسك بشكل صحيح وفقًا للسنة.",
      image: "https://randomuser.me/api/portraits/men/54.jpg",
      location: "Riyadh, Saudi Arabia",
      location_ar: "الرياض، المملكة العربية السعودية"
    },
    {
      id: 2,
      name: "Aisha Rahman",
      name_ar: "عائشة رحمن",
      role: "Islamic Studies Teacher",
      role_ar: "مدرسة الدراسات الإسلامية",
      quote: "I recommend this resource to all my students. The platform's commitment to authentic sources and proper references makes it a trustworthy guide for anyone seeking to perform Hajj and Umrah correctly.",
      quote_ar: "أوصي بهذا المورد لجميع طلابي. إن التزام المنصة بالمصادر الأصيلة والمراجع المناسبة يجعلها دليلاً موثوقًا لأي شخص يسعى لأداء الحج والعمرة بشكل صحيح.",
      image: "https://randomuser.me/api/portraits/women/54.jpg",
      location: "Dubai, UAE",
      location_ar: "دبي، الإمارات العربية المتحدة"
    },
    {
      id: 3,
      name: "Yusuf Mahmood",
      name_ar: "يوسف محمود",
      role: "Umrah Group Leader",
      role_ar: "قائد مجموعة عمرة",
      quote: "The interactive maps and video guides have been invaluable for our group's preparation. We especially appreciate the dual language support and the comprehensive duas collection with proper references.",
      quote_ar: "كانت الخرائط التفاعلية وأدلة الفيديو لا تقدر بثمن لإعداد مجموعتنا. نحن نقدر بشكل خاص دعم اللغة المزدوجة ومجموعة الأدعية الشاملة مع المراجع المناسبة.",
      image: "https://randomuser.me/api/portraits/men/36.jpg",
      location: "Amman, Jordan",
      location_ar: "عمان، الأردن"
    }
  ];
  
  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };
  
  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };
  
  const activeTestimonial = testimonials[activeIndex];
  
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-primary">
            {t("What Pilgrims Say About Us", "ما يقوله الحجاج عنا")}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t(
              "Hear from pilgrims and Islamic scholars who have used our authentic guidance for their sacred journeys.",
              "اسمع من الحجاج وعلماء الإسلام الذين استخدموا توجيهاتنا الأصيلة لرحلاتهم المقدسة."
            )}
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute -left-6 top-1/2 transform -translate-y-1/2 z-10">
              <button 
                onClick={prevTestimonial}
                className="rounded-full p-2 bg-white dark:bg-gray-800 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                aria-label="Previous testimonial"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><polyline points="15 18 9 12 15 6"></polyline></svg>
              </button>
            </div>
            
            <div className="absolute -right-6 top-1/2 transform -translate-y-1/2 z-10">
              <button 
                onClick={nextTestimonial}
                className="rounded-full p-2 bg-white dark:bg-gray-800 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                aria-label="Next testimonial"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </button>
            </div>
            
            <Card className="border-0 shadow-lg">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 bg-primary relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/80"></div>
                    <img 
                      src={activeTestimonial.image} 
                      alt={language === "en" ? activeTestimonial.name : activeTestimonial.name_ar}
                      className="w-full h-full object-cover opacity-25 mix-blend-overlay"
                    />
                    <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-6 text-center">
                      <img 
                        src={activeTestimonial.image} 
                        alt={language === "en" ? activeTestimonial.name : activeTestimonial.name_ar}
                        className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-white mb-4 object-cover"
                      />
                      <h3 className="text-xl font-bold">
                        {language === "en" ? activeTestimonial.name : activeTestimonial.name_ar}
                      </h3>
                      <p className="text-sm text-white/80 mb-1">
                        {language === "en" ? activeTestimonial.role : activeTestimonial.role_ar}
                      </p>
                      <p className="text-xs text-white/70">
                        {language === "en" ? activeTestimonial.location : activeTestimonial.location_ar}
                      </p>
                    </div>
                  </div>
                  
                  <div className="md:w-2/3 p-8 md:p-10 flex flex-col justify-center">
                    <div className="text-[#D4AF37] mb-4">
                      <QuoteIcon size={32} />
                    </div>
                    <p className="text-lg text-gray-700 dark:text-gray-300 italic mb-6">
                      "{language === "en" ? activeTestimonial.quote : activeTestimonial.quote_ar}"
                    </p>
                    
                    <div className="flex justify-center mt-auto">
                      {testimonials.map((_, index) => (
                        <button
                          key={index}
                          className={`w-3 h-3 rounded-full mx-1 transition-colors ${
                            index === activeIndex 
                              ? "bg-primary" 
                              : "bg-gray-300 dark:bg-gray-600 hover:bg-primary/50"
                          }`}
                          onClick={() => setActiveIndex(index)}
                          aria-label={`Go to testimonial ${index + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}