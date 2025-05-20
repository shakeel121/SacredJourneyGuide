import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { useLanguage } from "@/hooks/use-language";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight, PlayCircle, Book, Video, Award } from "lucide-react";
import { HajjGuide } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function HajjSection() {
  const { t, language } = useLanguage();
  const { data: guides, isLoading, error } = useQuery<HajjGuide[]>({
    queryKey: ['/api/hajj-guides'],
  });
  
  const [showVideo, setShowVideo] = useState(false);
  
  // Gallery of high-quality Hajj images for slider
  const hajjImages = [
    {
      url: "https://images.unsplash.com/photo-1519058082350-08716243d33a?q=80&w=2073&auto=format&fit=crop",
      caption: t("Pilgrims performing Tawaf around the Kaaba", "الحجاج يؤدون الطواف حول الكعبة")
    },
    {
      url: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=2073&auto=format&fit=crop",
      caption: t("Masjid al-Haram in Makkah", "المسجد الحرام في مكة")
    },
    {
      url: "https://images.unsplash.com/photo-1564769625673-cb844a3763ef?q=80&w=1974&auto=format&fit=crop",
      caption: t("Pilgrims at Mount Arafat", "الحجاج في جبل عرفات")
    }
  ];
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % hajjImages.length);
  };
  
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + hajjImages.length) % hajjImages.length);
  };
  
  return (
    <section id="hajj" className="py-16 bg-[#f8f9fa] dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-[#0A6E43]">
            {t("Virtual Hajj Guide", "دليل الحج الافتراضي")}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t(
              "Learn the complete Hajj rituals following the authentic Sunnah with step-by-step guidance from Saudi Salafi scholars.",
              "تعلم مناسك الحج الكاملة باتباع السنة الأصيلة مع التوجيه خطوة بخطوة من علماء السلف السعوديين."
            )}
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-1/2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="flex items-center mb-4">
                <Award className="text-[#D4AF37] w-6 h-6 mr-2" />
                <h3 className="text-xl font-semibold">
                  {t("Authentic Guidance", "التوجيه الأصيل")}
                </h3>
              </div>
              
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
                    <Link key={guide.id} href={`/hajj#section-${guide.id}`}>
                      <div className="flex items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition cursor-pointer">
                        <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center mr-3 shadow-md">
                          {index + 1}
                        </div>
                        <span className="font-medium">
                          {language === "en" ? guide.title : guide.title_ar}
                        </span>
                      </div>
                    </Link>
                  ))
                )}
              </div>
              
              <div className="flex space-x-4">
                <Link href="/hajj">
                  <span className="flex items-center text-primary hover:underline cursor-pointer">
                    <Book className="w-4 h-4 mr-2" />
                    <span className="font-medium">
                      {t("Complete Guide", "الدليل الكامل")}
                    </span>
                  </span>
                </Link>
                
                <Button 
                  variant="ghost"
                  className="text-[#D4AF37] hover:text-[#D4AF37]/90"
                  onClick={() => setShowVideo(true)}
                >
                  <Video className="w-4 h-4 mr-2" />
                  <span className="font-medium">
                    {t("Watch Videos", "مشاهدة الفيديوهات")}
                  </span>
                </Button>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2">
            <div className="relative rounded-xl overflow-hidden h-96 shadow-lg">
              {showVideo ? (
                <div className="w-full h-full bg-black flex items-center justify-center">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/Q88P1gpOJxA" 
                    title="Hajj Guide Video" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  ></iframe>
                  <Button 
                    className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white"
                    onClick={() => setShowVideo(false)}
                  >
                    {t("Show Images", "عرض الصور")}
                  </Button>
                </div>
              ) : (
                <>
                  <img 
                    src={hajjImages[currentImageIndex].url}
                    alt={hajjImages[currentImageIndex].caption} 
                    className="w-full h-full object-cover transition-transform duration-700 ease-in-out transform hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
                  
                  <button 
                    className="absolute top-1/2 left-4 bg-black/50 hover:bg-black/70 p-2 rounded-full text-white transform -translate-y-1/2"
                    onClick={prevImage}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                  </button>
                  
                  <button 
                    className="absolute top-1/2 right-4 bg-black/50 hover:bg-black/70 p-2 rounded-full text-white transform -translate-y-1/2"
                    onClick={nextImage}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                  </button>
                  
                  <div className="absolute bottom-0 left-0 p-6">
                    <div className="bg-primary text-white text-sm py-1 px-3 rounded-full inline-flex items-center">
                      <Award className="w-4 h-4 mr-1" />
                      {t("Authentic Sources", "مصادر أصيلة")}
                    </div>
                    <h3 className="text-white text-xl font-bold mt-2">
                      {hajjImages[currentImageIndex].caption}
                    </h3>
                    <Button 
                      className="mt-3 bg-[#D4AF37] hover:bg-[#D4AF37]/90 text-white"
                      onClick={() => setShowVideo(true)}
                    >
                      <PlayCircle className="mr-2 h-4 w-4" />
                      {t("Watch Video Guide", "مشاهدة الدليل المرئي")}
                    </Button>
                  </div>
                  
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                    {hajjImages.map((_, index) => (
                      <button 
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2.5 h-2.5 rounded-full transition-colors ${
                          index === currentImageIndex ? "bg-white" : "bg-white/50"
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        
        <div className="mt-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Book className="text-primary w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{t("Detailed Guidance", "توجيه مفصل")}</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t(
                  "Step-by-step instructions for every ritual with references to authentic sources and scholar opinions.",
                  "تعليمات خطوة بخطوة لكل شعيرة مع إشارات إلى المصادر الأصيلة وآراء العلماء."
                )}
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mb-4">
                <Video className="text-[#D4AF37] w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{t("Video Demonstrations", "عروض فيديو")}</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t(
                  "Watch high-quality video demonstrations of each ritual performed according to the Sunnah.",
                  "شاهد عروض فيديو عالية الجودة لكل شعيرة تؤدى وفقًا للسنة."
                )}
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 dark:text-green-400 w-6 h-6"><path d="m12 19-2 2-3-3 2-2"></path><path d="M7 16.5 8.5 15"></path><path d="M14 21v-5.5l1.5-1.5"></path><path d="M7 9.5 15.5 18"></path><path d="M16 7V3h4"></path><path d="M12 12 7 2"></path></svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">{t("Interactive Maps", "خرائط تفاعلية")}</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t(
                  "Interactive maps showing locations of important sites and the proper routes for each ritual.",
                  "خرائط تفاعلية توضح مواقع المواقع المهمة والمسارات المناسبة لكل شعيرة."
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
