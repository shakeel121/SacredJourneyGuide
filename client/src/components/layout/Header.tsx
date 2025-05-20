import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/use-language";
import { Church, Menu, FileText } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Header() {
  const [location] = useLocation();
  const { language, setLanguage, t } = useLanguage();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage on initial render
    if (typeof window !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true';
    }
    return false;
  });

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  };

  const navItems = [
    { href: "/", label: t("Home", "الرئيسية") },
    { href: "/hajj", label: t("Hajj", "الحج") },
    { href: "/umrah", label: t("Umrah", "العمرة") },
    { href: "/masjid", label: t("Masjid e Nabawi", "المسجد النبوي") },
    { href: "/duas", label: t("Duas", "الأدعية") },
    { href: "/scholars", label: t("Scholars", "العلماء") },
    { href: "/blog", label: t("Blog", "المدونة") },
  ];

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <Church className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl text-primary">
              {t("Authentic Hajj & Umrah Guide", "دليل الحج والعمرة الأصيل")}
            </span>
          </div>
          
          <nav className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <span className={`font-medium hover:text-primary transition cursor-pointer ${
                  location === item.href ? "text-primary" : ""
                }`}>
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>
          
          <div className="flex items-center space-x-4">
            <div className="border rounded-md overflow-hidden flex">
              <button 
                onClick={() => setLanguage("en")}
                className={`px-3 py-1 ${language === "en" ? "bg-primary text-white" : "hover:bg-gray-100 dark:hover:bg-gray-800"}`}
              >
                EN
              </button>
              <button 
                onClick={() => setLanguage("ar")}
                className={`px-3 py-1 ${language === "ar" ? "bg-primary text-white" : "hover:bg-gray-100 dark:hover:bg-gray-800"}`}
              >
                AR
              </button>
            </div>
            
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleDarkMode}
              className="hidden sm:flex"
            >
              {isDarkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                </svg>
              )}
            </Button>
            
            <Link href="/blog">
              <Button variant="ghost" size="icon" className="hidden sm:flex">
                <FileText className="h-5 w-5" />
              </Button>
            </Link>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side={language === "ar" ? "right" : "left"}>
                <div className="flex flex-col h-full">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center mr-2">
                      <Church className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-bold text-xl text-primary">
                      {t("Hajj & Umrah Guide", "دليل الحج والعمرة")}
                    </span>
                  </div>
                  
                  <nav className="flex flex-col space-y-4">
                    {navItems.map((item) => (
                      <Link key={item.href} href={item.href}>
                        <span className={`font-medium py-2 border-b border-gray-100 dark:border-gray-800 block cursor-pointer ${
                          location === item.href ? "text-primary" : ""
                        }`}>
                          {item.label}
                        </span>
                      </Link>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
