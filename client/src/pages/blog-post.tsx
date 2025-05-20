import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/hooks/use-language";
import { Helmet } from "react-helmet";
import { BlogPost } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { AdvertisementBanner } from "@/components/ui/advertisement-banner";
import { CalendarIcon, ChevronLeft, User, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface BlogPostWithDates extends Omit<BlogPost, 'created_at' | 'updated_at'> {
  created_at: Date;
  updated_at: Date;
}

// Sample blog posts for demonstration - same as in blog.tsx
const sampleBlogPosts: BlogPostWithDates[] = [
  {
    id: 1,
    title: "Essential Preparations for Your First Hajj Journey",
    title_ar: "التحضيرات الأساسية لرحلة الحج الأولى",
    slug: "essential-preparations-hajj",
    content: `<p>Embarking on your first Hajj journey is one of the most significant spiritual experiences in a Muslim's life. This sacred pilgrimage requires careful preparation on multiple levels: spiritual, physical, and logistical.</p>

<h2>Spiritual Preparation</h2>
<p>Before setting foot on your journey, ensure your heart and intentions are pure. The Prophet Muhammad ﷺ said: "Verily, deeds are only with intentions." Make sincere repentance (Tawbah) for past sins and resolve to begin a new chapter of devotion to Allah.</p>
<p>Study the rituals of Hajj thoroughly. Understand not just the mechanics but the deeper spiritual significance behind each ritual. The circumambulation of the Ka'bah (Tawaf), for instance, symbolizes that Allah should be the center of our lives.</p>

<h2>Physical Preparation</h2>
<p>Hajj involves considerable physical exertion: walking long distances, standing for extended periods, and navigating through crowds. Begin a moderate exercise regimen several months before departure to build stamina.</p>
<p>Consult with a healthcare provider for a thorough check-up and necessary vaccinations. If you have chronic conditions, ensure you have adequate medication for the entire journey, properly labeled with prescriptions.</p>

<h2>Financial and Logistical Preparation</h2>
<p>Hajj is a significant financial commitment. Ensure that your funds are from halal sources and that all debts are settled before departure. If possible, leave behind provisions for dependents.</p>
<p>Research and select a reputable Hajj tour group or guide with a track record of providing good service and accommodations. Verify that they are officially authorized by the relevant authorities.</p>

<h2>Practical Packing Tips</h2>
<ul>
  <li>Simple white ihram garments for men (women can wear modest clothing in any color)</li>
  <li>Comfortable walking shoes</li>
  <li>Minimal toiletries and unscented products (as fragrances are prohibited in ihram)</li>
  <li>First aid kit with basic medications</li>
  <li>Umbrella for sun protection</li>
  <li>Waist bag to keep important documents secure</li>
</ul>

<p>Remember that Hajj is not a vacation but a profound act of worship. Approach it with humility, patience, and the willingness to face challenges for the sake of Allah. The Prophet Muhammad ﷺ said: "For an accepted Hajj, there is no reward except Paradise."</p>`,
    content_ar: `<p>إن الشروع في رحلة الحج الأولى هي واحدة من أهم التجارب الروحية في حياة المسلم. هذه الرحلة المقدسة تتطلب استعدادًا دقيقًا على مستويات متعددة: روحية وجسدية ولوجستية.</p>

<h2>الاستعداد الروحي</h2>
<p>قبل بدء رحلتك، تأكد من طهارة قلبك ونواياك. قال النبي محمد ﷺ: "إنما الأعمال بالنيات". قم بالتوبة الصادقة عن الذنوب السابقة واعزم على بدء فصل جديد من التفاني لله.</p>
<p>ادرس مناسك الحج جيدًا. افهم ليس فقط آليات المناسك ولكن أيضًا المغزى الروحي العميق وراء كل شعيرة. الطواف حول الكعبة، على سبيل المثال، يرمز إلى أن الله يجب أن يكون محور حياتنا.</p>

<h2>الاستعداد البدني</h2>
<p>يتضمن الحج مجهودًا بدنيًا كبيرًا: المشي لمسافات طويلة، والوقوف لفترات طويلة، والتنقل وسط الحشود. ابدأ نظامًا معتدلًا للتمارين قبل عدة أشهر من المغادرة لبناء التحمل.</p>
<p>استشر مقدم الرعاية الصحية للحصول على فحص شامل والتطعيمات اللازمة. إذا كنت تعاني من حالات مزمنة، تأكد من أن لديك الأدوية الكافية للرحلة بأكملها، مع وصفات طبية مناسبة.</p>

<h2>الاستعداد المالي واللوجستي</h2>
<p>الحج التزام مالي كبير. تأكد من أن أموالك من مصادر حلال وأن جميع الديون تمت تسويتها قبل المغادرة. إذا أمكن، اترك مؤونة للمعالين.</p>
<p>ابحث واختر مجموعة حج أو مرشدًا ذو سمعة طيبة وسجل حافل في تقديم خدمة وإقامة جيدة. تحقق من أنهم مرخصون رسميًا من قبل السلطات المعنية.</p>

<h2>نصائح عملية للتعبئة</h2>
<ul>
  <li>ملابس إحرام بيضاء بسيطة للرجال (يمكن للنساء ارتداء ملابس محتشمة بأي لون)</li>
  <li>أحذية مريحة للمشي</li>
  <li>مستلزمات النظافة الشخصية البسيطة ومنتجات خالية من العطور (حيث أن العطور محظورة في الإحرام)</li>
  <li>حقيبة إسعافات أولية مع الأدوية الأساسية</li>
  <li>مظلة للحماية من الشمس</li>
  <li>حقيبة خصر للحفاظ على المستندات المهمة آمنة</li>
</ul>

<p>تذكر أن الحج ليس إجازة بل عبادة عميقة. تعامل معه بتواضع وصبر واستعداد لمواجهة التحديات من أجل الله. قال النبي محمد ﷺ: "الحج المبرور ليس له جزاء إلا الجنة."</p>`,
    excerpt: "Learn about the spiritual, physical, and financial preparations necessary for your first Hajj journey.",
    excerpt_ar: "تعرف على التحضيرات الروحية والجسدية والمالية اللازمة لرحلة الحج الأولى.",
    author_id: 1,
    featured_image: "https://images.unsplash.com/photo-1519058082350-08716243d33a?w=1200",
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
    content: `<p>Umrah, often referred to as the 'minor pilgrimage,' is a sacred journey that Muslims can undertake at any time of the year. Unlike Hajj, Umrah is not obligatory but highly recommended. It consists of a series of rituals performed in and around the Holy Kaaba in Makkah.</p>

<h2>The Essential Rituals of Umrah</h2>

<h3>1. Ihram - The State of Purity</h3>
<p>Before entering Makkah, pilgrims must enter into a state of Ihram, which represents purity and devotion to Allah. For men, this involves wearing two plain white sheets of cloth - one wrapped around the waist and the other draped over the shoulder. Women can wear any modest clothing that covers their body, usually in white.</p>
<p>While in Ihram, pilgrims must abstain from certain actions such as using perfume, cutting hair or nails, engaging in marital relations, hunting, or engaging in disputes. Upon donning the Ihram garments, pilgrims recite the Talbiyah: "Labbayk Allahumma Labbayk" (Here I am at Your service, O Lord).</p>

<h3>2. Tawaf - Circumambulation of the Kaaba</h3>
<p>Upon reaching Masjid Al-Haram, pilgrims perform Tawaf, which involves walking around the Kaaba seven times in a counterclockwise direction. This ritual symbolizes the unity of believers in the worship of One God, as they move in harmony around the sacred house built by Prophet Ibrahim (Abraham).</p>
<p>During Tawaf, it is recommended to touch or kiss the Black Stone (Hajar Al-Aswad) if possible, but due to crowds, many pilgrims simply point to it from a distance as they pass. Throughout the Tawaf, pilgrims engage in supplication and remembrance of Allah.</p>

<h3>3. Sa'i - Walking Between Safa and Marwa</h3>
<p>After Tawaf, pilgrims perform Sa'i, which commemorates the desperate search for water by Hajar (Hagar), the wife of Prophet Ibrahim, for her infant son Ismail. This ritual involves walking seven times between the hills of Safa and Marwa, now enclosed within Masjid Al-Haram.</p>
<p>The distance between the two hills is approximately 450 meters, and the total walking distance for seven circuits is about 3.15 kilometers. During Sa'i, pilgrims often recite prayers and supplications, particularly in the areas where Hajar ran.</p>

<h3>4. Halq or Taqsir - Trimming of Hair</h3>
<p>The final ritual of Umrah is Halq (shaving the head) or Taqsir (trimming the hair). For men, shaving the entire head is preferable, though trimming is acceptable. Women are required only to trim a small portion of their hair, typically the length of a fingertip.</p>
<p>This act symbolizes humility and represents the completion of Umrah. After the cutting of hair, the restrictions of Ihram are lifted, and pilgrims can resume their normal activities.</p>

<h2>Spiritual Significance</h2>
<p>Umrah is not merely a series of physical acts but a deeply spiritual journey. Each ritual carries profound symbolism and offers an opportunity for reflection, repentance, and renewal of faith. The journey represents a temporary departure from worldly concerns to focus solely on devotion to Allah.</p>
<p>The Prophet Muhammad (peace be upon him) said: "The performance of Umrah is an expiation for the sins committed between it and the previous Umrah." This highlights the spiritual cleansing aspect of the pilgrimage.</p>

<p>Performing Umrah with a clear understanding of its rituals and their meanings enhances the spiritual experience and ensures that pilgrims return home not only having fulfilled a religious obligation but also with increased faith, piety, and a deeper connection with Allah.</p>`,
    content_ar: `<p>العمرة، التي غالبًا ما يشار إليها باسم "الحج الأصغر"، هي رحلة مقدسة يمكن للمسلمين القيام بها في أي وقت من السنة. على عكس الحج، العمرة ليست واجبة ولكنها موصى بها بشدة. تتكون من سلسلة من المناسك تؤدى في وحول الكعبة المشرفة في مكة.</p>

<h2>المناسك الأساسية للعمرة</h2>

<h3>1. الإحرام - حالة الطهارة</h3>
<p>قبل دخول مكة، يجب على الحجاج الدخول في حالة الإحرام، التي تمثل النقاء والتفاني لله. بالنسبة للرجال، يتضمن ذلك ارتداء قطعتين بيضاء من القماش - واحدة ملفوفة حول الخصر والأخرى ملقاة على الكتف. يمكن للنساء ارتداء أي ملابس محتشمة تغطي جسدهن، عادة باللون الأبيض.</p>
<p>أثناء الإحرام، يجب على الحجاج الامتناع عن أعمال معينة مثل استخدام العطر، قص الشعر أو الأظافر، ممارسة العلاقات الزوجية، الصيد، أو الدخول في جدال. عند ارتداء ملابس الإحرام، يردد الحجاج التلبية: "لبيك اللهم لبيك" (أنا هنا في خدمتك يا رب).</p>

<h3>2. الطواف - الدوران حول الكعبة</h3>
<p>عند الوصول إلى المسجد الحرام، يؤدي الحجاج الطواف، الذي يتضمن المشي حول الكعبة سبع مرات في اتجاه عكس عقارب الساعة. هذا الطقس يرمز إلى وحدة المؤمنين في عبادة إله واحد، حيث يتحركون في انسجام حول البيت المقدس الذي بناه النبي إبراهيم.</p>
<p>خلال الطواف، يوصى بلمس أو تقبيل الحجر الأسود إن أمكن، ولكن بسبب الحشود، يشير الكثير من الحجاج إليه من بعيد عند مرورهم. طوال الطواف، ينخرط الحجاج في الدعاء وذكر الله.</p>

<h3>3. السعي - المشي بين الصفا والمروة</h3>
<p>بعد الطواف، يؤدي الحجاج السعي، الذي يخلّد البحث اليائس عن الماء من قبل هاجر، زوجة النبي إبراهيم، لابنها الرضيع إسماعيل. يتضمن هذا الطقس المشي سبع مرات بين جبلي الصفا والمروة، اللذين هما الآن داخل المسجد الحرام.</p>
<p>المسافة بين الجبلين حوالي 450 مترًا، والمسافة الإجمالية للمشي لسبعة أشواط حوالي 3.15 كيلومتر. خلال السعي، غالبًا ما يردد الحجاج الأدعية والتضرعات، خاصة في المناطق التي ركضت فيها هاجر.</p>

<h3>4. الحلق أو التقصير - قص الشعر</h3>
<p>الطقس النهائي للعمرة هو الحلق (حلق الرأس) أو التقصير (تقصير الشعر). بالنسبة للرجال، حلق الرأس بالكامل هو الأفضل، رغم أن التقصير مقبول. النساء مطالبات فقط بتقصير جزء صغير من شعرهن، عادة بطول طرف الإصبع.</p>
<p>هذا العمل يرمز إلى التواضع ويمثل إكمال العمرة. بعد قص الشعر، ترفع قيود الإحرام، ويمكن للحجاج استئناف أنشطتهم العادية.</p>

<h2>الأهمية الروحية</h2>
<p>العمرة ليست مجرد سلسلة من الأفعال الجسدية ولكنها رحلة روحية عميقة. كل طقس يحمل رمزية عميقة ويوفر فرصة للتأمل والتوبة وتجديد الإيمان. تمثل الرحلة ابتعادًا مؤقتًا عن الاهتمامات الدنيوية للتركيز فقط على التفاني لله.</p>
<p>قال النبي محمد (صلى الله عليه وسلم): "العمرة إلى العمرة كفارة لما بينهما". هذا يبرز جانب التطهير الروحي للحج.</p>

<p>أداء العمرة مع فهم واضح لمناسكها ومعانيها يعزز التجربة الروحية ويضمن أن يعود الحجاج إلى ديارهم ليس فقط بعد أداء واجب ديني ولكن أيضًا بإيمان متزايد وتقوى وارتباط أعمق مع الله.</p>`,
    excerpt: "Detailed explanation of each ritual in Umrah with authentic references from Salafi scholars.",
    excerpt_ar: "شرح مفصل لكل منسك في العمرة مع مراجع أصيلة من علماء السلف.",
    author_id: 2,
    featured_image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=1200",
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
    content: "Detailed content about Masjid al-Nabawi's history and significance...",
    content_ar: "محتوى مفصل عن تاريخ وأهمية المسجد النبوي...",
    excerpt: "Explore the rich history and significance of the Prophet's Mosque in Medina through the centuries.",
    excerpt_ar: "استكشف التاريخ الغني وأهمية المسجد النبوي في المدينة على مر القرون.",
    author_id: 3,
    featured_image: "https://images.unsplash.com/photo-1581559178851-b99664da71bd?w=1200",
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
    content: "Collection of authentic duas with detailed explanations...",
    content_ar: "مجموعة من الأدعية الأصيلة مع شروحات مفصلة...",
    excerpt: "Collection of authentic duas with references for each step of your Hajj and Umrah journey.",
    excerpt_ar: "مجموعة من الأدعية الأصيلة مع المراجع لكل خطوة من رحلة الحج والعمرة.",
    author_id: 1,
    featured_image: "https://images.unsplash.com/photo-1535538435402-d87a4388cf04?w=1200",
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

export default function BlogPostPage() {
  const { slug } = useParams();
  const { t, language } = useLanguage();
  
  // In a real application, fetch the specific blog post by slug from API
  const { data: post, isLoading } = useQuery<BlogPostWithDates | undefined>({
    queryKey: ['/api/blog-posts', slug],
    queryFn: () => Promise.resolve(sampleBlogPosts.find(post => post.slug === slug)),
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

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <Skeleton className="h-8 w-3/4 mb-4" />
          <div className="flex items-center gap-2 mb-8">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-24" />
          </div>
          <Skeleton className="h-64 w-full mb-8" />
          <div className="space-y-4 mb-8">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">{t("Post Not Found", "المقال غير موجود")}</h1>
        <p className="mb-8">{t("The blog post you're looking for doesn't exist or has been removed.", "المقال الذي تبحث عنه غير موجود أو تمت إزالته.")}</p>
        <Link href="/blog">
          <span className="inline-block bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-md font-medium transition cursor-pointer">
            {t("Return to Blog", "العودة إلى المدونة")}
          </span>
        </Link>
      </div>
    );
  }

  const author = getAuthorById(post.author_id);

  return (
    <>
      <Helmet>
        <title>{language === "en" ? post.title : post.title_ar} | {t("Islamic Blog", "المدونة الإسلامية")}</title>
        <meta 
          name="description" 
          content={language === "en" ? post.excerpt : post.excerpt_ar}
        />
      </Helmet>

      <div className="bg-[#0A6E43] relative">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ 
            backgroundImage: `url(${post.featured_image})`,
          }} 
        />
        <div className="relative container mx-auto px-4 py-20 text-white">
          <div className="max-w-4xl mx-auto">
            <Link href="/blog">
              <span className="inline-flex items-center text-white/90 hover:text-white mb-6 cursor-pointer">
                <ChevronLeft className="mr-1 h-4 w-4" />
                {t("Back to all articles", "العودة إلى جميع المقالات")}
              </span>
            </Link>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {language === "en" ? post.title : post.title_ar}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-white/90 mb-2">
              <div className="flex items-center">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formatDate(post.created_at)}
              </div>
              
              <Badge className="bg-[#D4AF37] hover:bg-[#D4AF37] text-white">
                {post.category}
              </Badge>
            </div>
            
            {author && (
              <div className="flex items-center mt-6">
                <img 
                  src={author.image} 
                  alt={author.name}
                  className="w-12 h-12 rounded-full border-2 border-white mr-3" 
                />
                <div>
                  <p className="font-medium">{author.name}</p>
                  <p className="text-sm text-white/80">{t("Author", "المؤلف")}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <AdvertisementBanner location="banner" />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div 
              dangerouslySetInnerHTML={{ 
                __html: language === "en" ? post.content : post.content_ar 
              }} 
            />
          </div>
          
          <div className="mt-10 pt-8 border-t">
            <h3 className="text-xl font-semibold mb-4">{t("Tags", "الوسوم")}</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags && post.tags.map(tag => (
                <Badge key={tag} variant="outline" className="cursor-pointer hover:bg-muted">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-muted/50">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">{t("Share this article", "شارك هذا المقال")}</h3>
                <div className="flex space-x-4">
                  <Button size="sm" variant="ghost" className="h-9 w-9 rounded-full p-0">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                    <span className="sr-only">Facebook</span>
                  </Button>
                  <Button size="sm" variant="ghost" className="h-9 w-9 rounded-full p-0">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                    <span className="sr-only">Twitter</span>
                  </Button>
                  <Button size="sm" variant="ghost" className="h-9 w-9 rounded-full p-0">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
                    <span className="sr-only">Instagram</span>
                  </Button>
                  <Button size="sm" variant="ghost" className="h-9 w-9 rounded-full p-0">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                    <span className="sr-only">LinkedIn</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-muted/50">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">{t("Related Articles", "مقالات ذات صلة")}</h3>
                <ul className="space-y-2">
                  {sampleBlogPosts
                    .filter(relatedPost => 
                      relatedPost.id !== post.id && 
                      (relatedPost.category === post.category || 
                        (relatedPost.tags && post.tags && 
                         relatedPost.tags.some(tag => post.tags?.includes(tag))))
                    )
                    .slice(0, 3)
                    .map(relatedPost => (
                      <li key={relatedPost.id}>
                        <Link href={`/blog/${relatedPost.slug}`}>
                          <span className="hover:text-primary cursor-pointer">
                            {language === "en" ? relatedPost.title : relatedPost.title_ar}
                          </span>
                        </Link>
                      </li>
                    ))
                  }
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}