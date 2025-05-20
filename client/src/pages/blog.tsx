import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/hooks/use-language";
import { Helmet } from "react-helmet";
import { BlogPost } from "@shared/schema";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AdvertisementBanner } from "@/components/ui/advertisement-banner";
import { Link } from "wouter";
import { CalendarIcon, User, Tag, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface BlogPostWithDates extends Omit<BlogPost, 'created_at' | 'updated_at'> {
  created_at: Date;
  updated_at: Date;
}

// Sample blog posts for demonstration
const sampleBlogPosts: BlogPostWithDates[] = [
  {
    id: 1,
    title: "Essential Preparations for Your First Hajj Journey",
    title_ar: "التحضيرات الأساسية لرحلة الحج الأولى",
    slug: "essential-preparations-hajj",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    content_ar: "لوريم إيبسوم دولور سيت أميت، كونسيكتيتور أديبيسينج إليت. سيد دو إيوسمود تيمبور انكيديديونت أوت لابوري إيت دولور ماجنا أليكوا.",
    excerpt: "Learn about the spiritual, physical, and financial preparations necessary for your first Hajj journey.",
    excerpt_ar: "تعرف على التحضيرات الروحية والجسدية والمالية اللازمة لرحلة الحج الأولى.",
    author_id: 1,
    featured_image: "https://images.unsplash.com/photo-1519058082350-08716243d33a?w=600",
    published: true,
    category: "Hajj",
    tags: ["preparation", "first-time", "spiritual"],
    created_at: new Date("2023-07-15"),
    updated_at: new Date("2023-07-15")
  },
  {
    id: 2,
    title: "Understanding the Rituals of Umrah",
    title_ar: "فهم مناسك العمرة",
    slug: "understanding-umrah-rituals",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    content_ar: "لوريم إيبسوم دولور سيت أميت، كونسيكتيتور أديبيسينج إليت. سيد دو إيوسمود تيمبور انكيديديونت أوت لابوري إيت دولور ماجنا أليكوا.",
    excerpt: "Detailed explanation of each ritual in Umrah with authentic references from Salafi scholars.",
    excerpt_ar: "شرح مفصل لكل منسك في العمرة مع مراجع أصيلة من علماء السلف.",
    author_id: 2,
    featured_image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=600",
    published: true,
    category: "Umrah",
    tags: ["rituals", "guidance", "practical"],
    created_at: new Date("2023-08-21"),
    updated_at: new Date("2023-08-22")
  },
  {
    id: 3,
    title: "The Historical Significance of Masjid al-Nabawi",
    title_ar: "الأهمية التاريخية للمسجد النبوي",
    slug: "historical-significance-masjid-nabawi",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    content_ar: "لوريم إيبسوم دولور سيت أميت، كونسيكتيتور أديبيسينج إليت. سيد دو إيوسمود تيمبور انكيديديونت أوت لابوري إيت دولور ماجنا أليكوا.",
    excerpt: "Explore the rich history and significance of the Prophet's Mosque in Medina through the centuries.",
    excerpt_ar: "استكشف التاريخ الغني وأهمية المسجد النبوي في المدينة على مر القرون.",
    author_id: 3,
    featured_image: "https://images.unsplash.com/photo-1581559178851-b99664da71bd?w=600",
    published: true,
    category: "Masjid",
    tags: ["history", "architecture", "significance"],
    created_at: new Date("2023-09-05"),
    updated_at: new Date("2023-09-05")
  },
  {
    id: 4,
    title: "The Most Powerful Duas for Hajj and Umrah",
    title_ar: "أقوى الأدعية للحج والعمرة",
    slug: "powerful-duas-hajj-umrah",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    content_ar: "لوريم إيبسوم دولور سيت أميت، كونسيكتيتور أديبيسينج إليت. سيد دو إيوسمود تيمبور انكيديديونت أوت لابوري إيت دولور ماجنا أليكوا.",
    excerpt: "Collection of authentic duas with references for each step of your Hajj and Umrah journey.",
    excerpt_ar: "مجموعة من الأدعية الأصيلة مع المراجع لكل خطوة من رحلة الحج والعمرة.",
    author_id: 1,
    featured_image: "https://images.unsplash.com/photo-1535538435402-d87a4388cf04?w=600",
    published: true,
    category: "Duas",
    tags: ["prayers", "supplications", "guidance"],
    created_at: new Date("2023-10-12"),
    updated_at: new Date("2023-10-14")
  }
];

const authors = [
  { id: 1, name: "Dr. Abdullah Ahmad", image: "https://randomuser.me/api/portraits/men/32.jpg" },
  { id: 2, name: "Ustadh Muhammad Salih", image: "https://randomuser.me/api/portraits/men/22.jpg" },
  { id: 3, name: "Dr. Aisha Rahman", image: "https://randomuser.me/api/portraits/women/44.jpg" }
];

export default function BlogPage() {
  const { t, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  // In a real application, fetch blog posts from API
  const { data: blogPosts, isLoading } = useQuery<BlogPostWithDates[]>({
    queryKey: ['/api/blog-posts', selectedCategory, searchQuery],
    queryFn: () => Promise.resolve(sampleBlogPosts),
  });

  // Get unique categories
  const categories = blogPosts ? Array.from(new Set(blogPosts.map(post => post.category))) : [];
  
  // Filter posts based on category and search query
  const filteredPosts = blogPosts?.filter(post => {
    const matchesCategory = selectedCategory ? post.category === selectedCategory : true;
    const matchesSearch = searchQuery.trim() === "" ? true : 
      (language === "en" ? 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) :
        post.title_ar.includes(searchQuery) || 
        post.excerpt_ar.includes(searchQuery));
    
    return matchesCategory && matchesSearch;
  });

  const getAuthorById = (authorId: number) => {
    return authors.find(author => author.id === authorId);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat(language === "en" ? "en-US" : "ar-SA", {
      year: "numeric",
      month: "long",
      day: "numeric"
    }).format(date);
  };

  return (
    <>
      <Helmet>
        <title>{t("Islamic Blog - Hajj & Umrah Insights", "المدونة الإسلامية - رؤى الحج والعمرة")}</title>
        <meta 
          name="description" 
          content={t(
            "Authentic articles and insights about Hajj, Umrah, and Islamic practices with verified references from Saudi scholars.",
            "مقالات ورؤى أصيلة عن الحج والعمرة والممارسات الإسلامية مع مراجع موثقة من علماء سعوديين."
          )}
        />
      </Helmet>

      <div className="bg-[#0A6E43] py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">{t("Islamic Knowledge Blog", "مدونة المعرفة الإسلامية")}</h1>
          <p className="max-w-3xl mx-auto text-lg">
            {t(
              "Authentic articles and insights about Hajj, Umrah, and Islamic practices with verified references.",
              "مقالات ورؤى أصيلة عن الحج والعمرة والممارسات الإسلامية مع مراجع موثقة."
            )}
          </p>
        </div>
      </div>

      <AdvertisementBanner location="banner" />

      <div className="container mx-auto px-4 py-12">
        <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <Input
              placeholder={t("Search articles...", "البحث في المقالات...")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <Select onValueChange={(value) => setSelectedCategory(value === "all" ? null : value)}>
              <SelectTrigger>
                <SelectValue placeholder={t("Filter by category", "تصفية حسب الفئة")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("All Categories", "جميع الفئات")}</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <CardHeader>
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/4 mb-2" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </CardHeader>
                <CardFooter>
                  <Skeleton className="h-10 w-full" />
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : filteredPosts?.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">{t("No articles found", "لم يتم العثور على مقالات")}</h3>
            <p className="text-gray-500">{t("Try adjusting your search or filters", "حاول تعديل البحث أو الفلاتر")}</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts?.map((post) => {
                const author = getAuthorById(post.author_id);
                return (
                  <Card key={post.id} className="overflow-hidden hover:shadow-lg transition">
                    <div className="h-48 overflow-hidden">
                      <img
                        src={post.featured_image || "https://via.placeholder.com/600x400"}
                        alt={language === "en" ? post.title : post.title_ar}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="bg-primary bg-opacity-10 text-primary border-none">
                          {post.category}
                        </Badge>
                        <div className="flex items-center text-sm text-gray-500">
                          <CalendarIcon className="h-3 w-3 mr-1" />
                          {formatDate(post.created_at)}
                        </div>
                      </div>
                      <CardTitle className="line-clamp-2">
                        {language === "en" ? post.title : post.title_ar}
                      </CardTitle>
                      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 mt-2">
                        {language === "en" ? post.excerpt : post.excerpt_ar}
                      </p>
                    </CardHeader>
                    <CardFooter className="flex items-center justify-between">
                      <div className="flex items-center">
                        {author && (
                          <>
                            <img 
                              src={author.image} 
                              alt={author.name} 
                              className="w-8 h-8 rounded-full mr-2" 
                            />
                            <span className="text-sm">{author.name}</span>
                          </>
                        )}
                      </div>
                      <Link href={`/blog/${post.slug}`}>
                        <span className="text-primary font-medium text-sm flex items-center cursor-pointer">
                          {t("Read more", "قراءة المزيد")}
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </span>
                      </Link>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
            
            <div className="mt-12 text-center">
              <Button className="bg-primary hover:bg-primary/90 text-white">
                {t("Load More Articles", "تحميل المزيد من المقالات")}
              </Button>
            </div>
          </>
        )}
        
        <div className="mt-16 bg-light islamic-pattern rounded-lg p-8 dark:bg-gray-800">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold">{t("Join Our Newsletter", "انضم إلى نشرتنا الإخبارية")}</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mt-2">
              {t(
                "Subscribe to receive authentic Islamic content, Hajj & Umrah tips, and exclusive resources directly to your inbox.",
                "اشترك لتلقي محتوى إسلامي أصيل، نصائح للحج والعمرة، وموارد حصرية مباشرة إلى بريدك الإلكتروني."
              )}
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto">
            <Input 
              placeholder={t("Your email address", "عنوان بريدك الإلكتروني")} 
              className="md:flex-grow"
            />
            <Button className="bg-[#D4AF37] hover:bg-[#B59125] text-white">
              {t("Subscribe", "اشترك")}
            </Button>
          </div>
          
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
            {t(
              "By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.",
              "بالاشتراك، فإنك توافق على سياسة الخصوصية الخاصة بنا وتوافق على تلقي تحديثات من شركتنا."
            )}
          </p>
        </div>
      </div>
    </>
  );
}