import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/hooks/use-language";
import { Helmet } from "react-helmet";
import { HajjGuide } from "@shared/schema";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ContentSection } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";
import { AdvertisementBanner } from "@/components/ui/advertisement-banner";
import { CheckCircle, BookOpen, Users, Map, Video, Image, Download, Share2, FileText, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import { Badge } from "@/components/ui/badge";

export default function HajjGuidePage() {
  const { t, language } = useLanguage();
  const { data: guides, isLoading, error } = useQuery<HajjGuide[]>({
    queryKey: ['/api/hajj-guides'],
  });
  
  const [activeGuideId, setActiveGuideId] = useState<number | null>(null);
  const [selectedTab, setSelectedTab] = useState("content");
  const [showVideo, setShowVideo] = useState(false);
  
  // Reference for scrolling to guide sections
  const guideRefs = useRef<{[key: string]: HTMLDivElement | null}>({});
  
  // Video data for different rituals
  const videoGuides = {
    1: "https://www.youtube.com/embed/nMRMV0Rve0E", // Preparations
    2: "https://www.youtube.com/embed/Q88P1gpOJxA", // Ihram
    3: "https://www.youtube.com/embed/6v-5HyVZSyI", // Tawaf
    4: "https://www.youtube.com/embed/BgTdOFi3rjc", // Sa'i
    5: "https://www.youtube.com/embed/dQw0Vplm52w", // Arafat
  };
  
  // Maps and image galleries
  const mapsAndImages = {
    1: [
      "https://images.unsplash.com/photo-1519058082350-08716243d33a?q=80&w=2073",
      "https://images.unsplash.com/photo-1519111124184-2c29466fe1cf?q=80&w=2070",
    ],
    2: [
      "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=2073",
      "https://images.unsplash.com/photo-1538121661321-edc084adb513?q=80&w=2070",
    ],
    3: [
      "https://images.unsplash.com/photo-1564769625673-cb844a3763ef?q=80&w=1974",
      "https://images.unsplash.com/photo-1564769643758-073bb9bcd9bd?q=80&w=1974",
    ],
  };
  
  // Effect to handle hash-based navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash && hash.startsWith('#section-')) {
        const guideId = parseInt(hash.replace('#section-', ''));
        setActiveGuideId(guideId);
        
        // Scroll to the guide section
        setTimeout(() => {
          const ref = guideRefs.current[`guide-${guideId}`];
          if (ref) {
            ref.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    };
    
    // Check on initial load
    handleHashChange();
    
    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <>
      <Helmet>
        <title>{t("Hajj Guide - Authentic Steps & Rituals", "دليل الحج - خطوات ومناسك أصيلة")}</title>
        <meta 
          name="description" 
          content={t(
            "Learn the complete Hajj rituals following the authentic Sunnah with step-by-step guidance from Saudi Salafi scholars.",
            "تعلم مناسك الحج الكاملة باتباع السنة الأصيلة مع التوجيه خطوة بخطوة من علماء السلف السعوديين."
          )}
        />
      </Helmet>

      <div className="bg-[#0A6E43] py-16 text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url(https://images.unsplash.com/photo-1538121661321-edc084adb513?q=80&w=2070)`,
            filter: 'brightness(30%)',
            zIndex: -1
          }} 
        />
        <div className="container mx-auto px-4 text-center relative">
          <Badge className="bg-[#D4AF37] mb-4 text-white">
            {t("Authentic Sources", "مصادر أصيلة")}
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("Complete Hajj Guide", "دليل الحج الكامل")}</h1>
          <p className="max-w-3xl mx-auto text-lg mb-8">
            {t(
              "Learn the complete Hajj rituals following the authentic Sunnah with step-by-step guidance from Saudi Salafi scholars.",
              "تعلم مناسك الحج الكاملة باتباع السنة الأصيلة مع التوجيه خطوة بخطوة من علماء السلف السعوديين."
            )}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-white text-[#0A6E43] hover:bg-white/90">
              <FileText className="mr-2 h-4 w-4" />
              {t("Download PDF Guide", "تحميل دليل PDF")}
            </Button>
            <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
              <Share2 className="mr-2 h-4 w-4" />
              {t("Share Guide", "مشاركة الدليل")}
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-[#f8f9fa] dark:bg-gray-800 py-8 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-30">
        <div className="container mx-auto px-4">
          <div className="overflow-auto pb-2">
            <div className="flex space-x-4 min-w-max">
              {!isLoading && !error && guides?.map((guide) => (
                <Button 
                  key={guide.id}
                  variant={activeGuideId === guide.id ? "default" : "outline"}
                  className="whitespace-nowrap"
                  onClick={() => {
                    setActiveGuideId(guide.id);
                    window.location.hash = `section-${guide.id}`;
                  }}
                >
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-2">
                    {guide.id}
                  </span>
                  {language === "en" ? guide.title : guide.title_ar}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <AdvertisementBanner location="banner" />

      <div className="container mx-auto px-4 py-12">
        {isLoading ? (
          <div className="grid grid-cols-1 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-8 w-48 mb-2" />
                  <Skeleton className="h-4 w-full" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-48 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500 text-xl">{t("Failed to load Hajj guides", "فشل تحميل أدلة الحج")}</p>
            <p className="text-gray-500 mt-2">{t("Please try again later", "يرجى المحاولة مرة أخرى لاحقًا")}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-16">
            {guides?.map((guide) => (
              <div 
                key={guide.id} 
                id={`section-${guide.id}`}
                ref={el => guideRefs.current[`guide-${guide.id}`] = el}
                className={`scroll-mt-32 ${activeGuideId === guide.id ? "ring-4 ring-primary/20 rounded-xl" : ""}`}
              >
                <Card className="overflow-hidden border-0 shadow-lg">
                  <CardHeader className="bg-light islamic-pattern dark:bg-gray-800 pt-8 pb-6">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary rounded-full text-white flex items-center justify-center text-xl font-bold">
                          {guide.id}
                        </div>
                        <div>
                          <CardTitle className="text-2xl md:text-3xl">
                            {language === "en" ? guide.title : guide.title_ar}
                          </CardTitle>
                          <CardDescription className="mt-2 text-base">
                            {language === "en" ? guide.description : guide.description_ar}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        {guide.is_essential && (
                          <div className="flex items-center gap-1 text-xs bg-[#D4AF37]/20 text-[#D4AF37] px-2 py-1 rounded-full">
                            <Award className="h-3 w-3" />
                            {t("Essential Ritual", "شعيرة أساسية")}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <Tabs 
                      defaultValue="content" 
                      value={selectedTab}
                      onValueChange={setSelectedTab}
                      className="w-full"
                    >
                      <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full">
                        <TabsTrigger value="content">
                          <BookOpen className="h-4 w-4 mr-2" />
                          {t("Step-by-Step Guide", "دليل خطوة بخطوة")}
                        </TabsTrigger>
                        <TabsTrigger value="video">
                          <Video className="h-4 w-4 mr-2" />
                          {t("Video Instructions", "تعليمات فيديو")}
                        </TabsTrigger>
                        <TabsTrigger value="images">
                          <Image className="h-4 w-4 mr-2" />
                          {t("Images & Maps", "الصور والخرائط")}
                        </TabsTrigger>
                        <TabsTrigger value="reference">
                          <Users className="h-4 w-4 mr-2" />
                          {t("Scholarly References", "المراجع العلمية")}
                        </TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="content" className="mt-6">
                        <div className="space-y-8">
                          {(language === "en" ? guide.content : guide.content_ar).sections.map((section: ContentSection, index: number) => (
                            <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                              <h3 className="text-xl font-semibold mb-4 flex items-center">
                                <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-3 text-sm">
                                  {index + 1}
                                </span>
                                {section.title}
                              </h3>
                              <p className="text-gray-600 dark:text-gray-300">{section.content}</p>
                              
                              {index < (language === "en" ? guide.content : guide.content_ar).sections.length - 1 && (
                                <Separator className="mt-6" />
                              )}
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="video" className="mt-6">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                          <h3 className="text-xl font-semibold mb-4 flex items-center">
                            <Video className="text-primary h-5 w-5 mr-2" />
                            {t("Detailed Video Instructions", "تعليمات فيديو مفصلة")}
                          </h3>
                          
                          <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                            <iframe 
                              src={videoGuides[guide.id as keyof typeof videoGuides] || videoGuides[1]} 
                              title={language === "en" ? guide.title : guide.title_ar}
                              allowFullScreen
                              className="w-full h-[500px] border-0"
                            ></iframe>
                          </div>
                          
                          <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                            <p>{t("Video sourced from authentic Islamic educational channels with proper permissions.", "الفيديو مصدره قنوات تعليمية إسلامية أصيلة بإذن مناسب.")}</p>
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="images" className="mt-6">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                          <h3 className="text-xl font-semibold mb-4 flex items-center">
                            <Map className="text-primary h-5 w-5 mr-2" />
                            {t("Visual Guidance & Maps", "التوجيه المرئي والخرائط")}
                          </h3>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {(mapsAndImages[guide.id as keyof typeof mapsAndImages] || mapsAndImages[1]).map((img, idx) => (
                              <div key={idx} className="rounded-lg overflow-hidden h-60 relative group">
                                <img 
                                  src={img} 
                                  alt={`${language === "en" ? guide.title : guide.title_ar} - ${idx + 1}`}
                                  className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                  <Button variant="outline" className="bg-white/80 hover:bg-white">
                                    <Image className="h-4 w-4 mr-2" />
                                    {t("View Larger", "عرض أكبر")}
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                          
                          <div className="mt-8">
                            <h4 className="font-medium mb-2">{t("Interactive Map", "خريطة تفاعلية")}</h4>
                            <div className="rounded-lg overflow-hidden h-80 bg-gray-200 dark:bg-gray-700">
                              <iframe 
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3714.2494192649066!2d39.82071807544338!3d21.422487377931747!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15c204b74c28d467%3A0xb2f543a618225767!2sKaaba!5e0!3m2!1sen!2sus!4v1716858071841!5m2!1sen!2sus"
                                width="100%" 
                                height="100%" 
                                style={{ border: 0 }} 
                                allowFullScreen 
                                loading="lazy" 
                                referrerPolicy="no-referrer-when-downgrade"
                              ></iframe>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="reference" className="mt-6">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                          <h3 className="text-xl font-semibold mb-4 flex items-center">
                            <Award className="text-[#D4AF37] h-5 w-5 mr-2" />
                            {t("Authentic References", "المراجع الأصيلة")}
                          </h3>
                          
                          <div className="flex items-start bg-[#0A6E43]/5 p-4 rounded-lg border border-[#0A6E43]/20">
                            <CheckCircle className="text-primary mr-3 h-5 w-5 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="font-medium text-gray-900 dark:text-gray-100">{t("Scholarly Reference", "المرجع العلمي")}</p>
                              <p className="text-gray-700 dark:text-gray-300 mt-1">{guide.reference}</p>
                              
                              <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                                <p>{t("This guidance is based on authentic sources from the Quran and Sunnah as understood by the righteous predecessors. All instructions have been verified by qualified scholars.", "هذا التوجيه مبني على مصادر أصيلة من القرآن والسنة كما فهمها السلف الصالح. تم التحقق من جميع التعليمات من قبل علماء مؤهلين.")}</p>
                              </div>
                              
                              <Button variant="link" className="mt-2 text-primary p-0 h-auto">
                                {t("View Detailed Citations", "عرض الاقتباسات المفصلة")}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t pt-6">
                    <div className="flex space-x-2">
                      <Button variant="outline" className="text-sm gap-1">
                        <Download className="h-4 w-4" />
                        {t("Download", "تحميل")}
                      </Button>
                      <Button variant="outline" className="text-sm gap-1">
                        <Share2 className="h-4 w-4" />
                        {t("Share", "مشاركة")}
                      </Button>
                    </div>
                    <div className="flex gap-2">
                      {guide.id > 1 && (
                        <Button 
                          variant="outline" 
                          className="gap-1"
                          onClick={() => {
                            setActiveGuideId(guide.id - 1);
                            window.location.hash = `section-${guide.id - 1}`;
                          }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><polyline points="15 18 9 12 15 6"></polyline></svg>
                          {t("Previous", "السابق")}
                        </Button>
                      )}
                      {guide.id < (guides?.length || 1) && (
                        <Button 
                          className="gap-1"
                          onClick={() => {
                            setActiveGuideId(guide.id + 1);
                            window.location.hash = `section-${guide.id + 1}`;
                          }}
                        >
                          {t("Next", "التالي")}
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><polyline points="9 18 15 12 9 6"></polyline></svg>
                        </Button>
                      )}
                    </div>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
