import { Link } from "wouter";
import { Church, Mail, Phone, MapPin, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/use-language";
import { useToast } from "@/hooks/use-toast";

export default function Footer() {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    
    if (email) {
      toast({
        title: t("Subscribed successfully!", "تم الاشتراك بنجاح!"),
        description: t("You will receive our latest updates.", "سوف تتلقى آخر تحديثاتنا."),
      });
      form.reset();
    }
  };

  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <Church className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl">
                {t("Authentic Hajj & Umrah Guide", "دليل الحج والعمرة الأصيل")}
              </span>
            </div>
            <p className="text-gray-400 mb-4">
              {t(
                "Comprehensive virtual learning platform for authentic Islamic guidance on Hajj and Umrah rituals.", 
                "منصة تعليمية افتراضية شاملة للإرشاد الإسلامي الأصيل حول مناسك الحج والعمرة."
              )}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" fill="currentColor">
                  <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
                  <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor">
                  <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="currentColor">
                  <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("Quick Links", "روابط سريعة")}</h3>
            <ul className="space-y-2">
              <li><Link href="/"><a className="text-gray-400 hover:text-white transition">{t("Home", "الرئيسية")}</a></Link></li>
              <li><Link href="/hajj"><a className="text-gray-400 hover:text-white transition">{t("Hajj Guide", "دليل الحج")}</a></Link></li>
              <li><Link href="/umrah"><a className="text-gray-400 hover:text-white transition">{t("Umrah Guide", "دليل العمرة")}</a></Link></li>
              <li><Link href="/masjid"><a className="text-gray-400 hover:text-white transition">{t("Masjid e Nabawi", "المسجد النبوي")}</a></Link></li>
              <li><Link href="/duas"><a className="text-gray-400 hover:text-white transition">{t("Duas Collection", "مجموعة الأدعية")}</a></Link></li>
              <li><Link href="/scholars"><a className="text-gray-400 hover:text-white transition">{t("Scholars", "العلماء")}</a></Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("Resources", "الموارد")}</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition">{t("Preparation Checklist", "قائمة التحضير")}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">{t("Frequently Asked Questions", "الأسئلة المتكررة")}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">{t("Downloadable Guides", "الأدلة القابلة للتنزيل")}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">{t("References", "المراجع")}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">{t("Scholarly Articles", "المقالات العلمية")}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">{t("Video Tutorials", "الدروس المرئية")}</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("Contact", "اتصل بنا")}</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Mail className="text-primary mt-1 mr-3 h-4 w-4" />
                <span className="text-gray-400">contact@hajjguide.com</span>
              </li>
              <li className="flex items-start">
                <Phone className="text-primary mt-1 mr-3 h-4 w-4" />
                <span className="text-gray-400">+966 12 345 6789</span>
              </li>
              <li className="flex items-start">
                <MapPin className="text-primary mt-1 mr-3 h-4 w-4" />
                <span className="text-gray-400">{t("Makkah, Saudi Arabia", "مكة المكرمة، المملكة العربية السعودية")}</span>
              </li>
            </ul>
            
            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-2">{t("Subscribe to our newsletter", "اشترك في نشرتنا الإخبارية")}</h4>
              <form onSubmit={handleSubscribe} className="flex">
                <Input 
                  type="email" 
                  name="email"
                  placeholder={t("Your email", "بريدك الإلكتروني")} 
                  className="bg-gray-700 text-white rounded-r-none focus:ring-primary"
                  required
                />
                <Button type="submit" className="bg-primary hover:bg-primary/90 text-white rounded-l-none">
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-6 mt-6 text-center text-gray-500 text-sm">
          <p>{t("© 2023 Authentic Hajj & Umrah Guide. All rights reserved.", "© 2023 دليل الحج والعمرة الأصيل. جميع الحقوق محفوظة.")}</p>
          <div className="flex justify-center space-x-4 mt-2">
            <a href="#" className="hover:text-gray-400 transition">{t("Privacy Policy", "سياسة الخصوصية")}</a>
            <a href="#" className="hover:text-gray-400 transition">{t("Terms of Service", "شروط الخدمة")}</a>
            <a href="#" className="hover:text-gray-400 transition">{t("Advertise", "أعلن معنا")}</a>
          </div>
          <p className="mt-2">{t("Developed with adherence to authentic Islamic teachings and principles", "تم التطوير وفقًا للتعاليم والمبادئ الإسلامية الأصيلة")}</p>
        </div>
      </div>
    </footer>
  );
}
