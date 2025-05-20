import {
  User, InsertUser, 
  HajjGuide, InsertHajjGuide,
  UmrahGuide, InsertUmrahGuide,
  MasjidGuide, InsertMasjidGuide,
  Dua, InsertDua,
  Scholar, InsertScholar,
  Advertisement, InsertAdvertisement
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserProgress(userId: number, progress: Record<string, any>): Promise<User | undefined>;

  // Hajj Guide operations
  getHajjGuides(): Promise<HajjGuide[]>;
  getHajjGuide(id: number): Promise<HajjGuide | undefined>;
  createHajjGuide(guide: InsertHajjGuide): Promise<HajjGuide>;

  // Umrah Guide operations
  getUmrahGuides(): Promise<UmrahGuide[]>;
  getUmrahGuide(id: number): Promise<UmrahGuide | undefined>;
  createUmrahGuide(guide: InsertUmrahGuide): Promise<UmrahGuide>;

  // Masjid Guide operations
  getMasjidGuides(): Promise<MasjidGuide[]>;
  getMasjidGuide(id: number): Promise<MasjidGuide | undefined>;
  getMasjidGuidesByCategory(category: string): Promise<MasjidGuide[]>;
  createMasjidGuide(guide: InsertMasjidGuide): Promise<MasjidGuide>;

  // Dua operations
  getDuas(): Promise<Dua[]>;
  getDua(id: number): Promise<Dua | undefined>;
  getDuasByCategory(category: string): Promise<Dua[]>;
  createDua(dua: InsertDua): Promise<Dua>;

  // Scholar operations
  getScholars(): Promise<Scholar[]>;
  getScholar(id: number): Promise<Scholar | undefined>;
  createScholar(scholar: InsertScholar): Promise<Scholar>;

  // Advertisement operations
  getAdvertisements(): Promise<Advertisement[]>;
  getAdvertisementsByLocation(location: string): Promise<Advertisement[]>;
  createAdvertisement(ad: InsertAdvertisement): Promise<Advertisement>;
  toggleAdvertisement(id: number, isActive: boolean): Promise<Advertisement | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private hajjGuides: Map<number, HajjGuide>;
  private umrahGuides: Map<number, UmrahGuide>;
  private masjidGuides: Map<number, MasjidGuide>;
  private duas: Map<number, Dua>;
  private scholars: Map<number, Scholar>;
  private advertisements: Map<number, Advertisement>;

  private currentUserId: number;
  private currentHajjGuideId: number;
  private currentUmrahGuideId: number;
  private currentMasjidGuideId: number;
  private currentDuaId: number;
  private currentScholarId: number;
  private currentAdvertisementId: number;

  constructor() {
    this.users = new Map();
    this.hajjGuides = new Map();
    this.umrahGuides = new Map();
    this.masjidGuides = new Map();
    this.duas = new Map();
    this.scholars = new Map();
    this.advertisements = new Map();

    this.currentUserId = 1;
    this.currentHajjGuideId = 1;
    this.currentUmrahGuideId = 1;
    this.currentMasjidGuideId = 1;
    this.currentDuaId = 1;
    this.currentScholarId = 1;
    this.currentAdvertisementId = 1;

    // Seed initial data
    this.seedInitialData();
  }

  private seedInitialData() {
    // Seed scholars
    const scholars = [
      {
        id: this.currentScholarId++,
        name: "Sheikh Abdul Aziz Ibn Baaz",
        name_ar: "الشيخ عبد العزيز بن باز",
        title: "Former Grand Mufti of Saudi Arabia",
        title_ar: "المفتي السابق للمملكة العربية السعودية",
        bio: "Known for his vast knowledge in Islamic jurisprudence and his comprehensive guidance on Hajj and Umrah rituals according to the Quran and Sunnah.",
        bio_ar: "معروف بمعرفته الواسعة في الفقه الإسلامي وإرشاداته الشاملة حول مناسك الحج والعمرة وفقًا للقرآن والسنة.",
        expertise: ["Hajj", "Umrah", "Fiqh"]
      },
      {
        id: this.currentScholarId++,
        name: "Sheikh Muhammad ibn al Uthaymeen",
        name_ar: "الشيخ محمد بن العثيمين",
        title: "Prominent Saudi Arabian Islamic scholar",
        title_ar: "عالم إسلامي سعودي بارز",
        bio: "Renowned for his clear explanations and detailed guidance on the proper performance of Hajj and Umrah rituals according to the Sunnah.",
        bio_ar: "اشتهر بشرحه الواضح وإرشاداته المفصلة حول الأداء الصحيح لمناسك الحج والعمرة وفقًا للسنة.",
        expertise: ["Hajj", "Umrah", "Aqeedah"]
      },
      {
        id: this.currentScholarId++,
        name: "Sheikh Salih Al-Fawzan",
        name_ar: "الشيخ صالح الفوزان",
        title: "Member of the Council of Senior Scholars",
        title_ar: "عضو مجلس كبار العلماء",
        bio: "Known for his scholarly work on Islamic jurisprudence and his guidance on the correct practice of Hajj and Umrah rituals.",
        bio_ar: "معروف بعمله العلمي في الفقه الإسلامي وإرشاداته حول الممارسة الصحيحة لمناسك الحج والعمرة.",
        expertise: ["Hajj", "Umrah", "Fiqh", "Tawheed"]
      }
    ];

    scholars.forEach(scholar => {
      this.scholars.set(scholar.id, scholar as Scholar);
    });

    // Seed Hajj guides
    const hajjGuides = [
      {
        id: this.currentHajjGuideId++,
        title: "Preparations before Hajj",
        title_ar: "الاستعدادات قبل الحج",
        description: "Learn about the essential preparations before embarking on your Hajj journey.",
        description_ar: "تعرف على الاستعدادات الأساسية قبل الشروع في رحلة الحج.",
        content: {
          sections: [
            {
              title: "Physical Preparation",
              content: "Ensure good health and physical fitness before Hajj. Consult with your doctor and get necessary vaccinations."
            },
            {
              title: "Financial Preparation",
              content: "Make sure all debts are settled and you have sufficient funds for the journey and for dependents while away."
            },
            {
              title: "Spiritual Preparation",
              content: "Learn about the rituals, make sincere repentance, seek forgiveness from others, and purify your intention."
            }
          ]
        },
        content_ar: {
          sections: [
            {
              title: "الاستعداد البدني",
              content: "تأكد من الصحة الجيدة واللياقة البدنية قبل الحج. استشر طبيبك واحصل على التطعيمات اللازمة."
            },
            {
              title: "الاستعداد المالي",
              content: "تأكد من تسوية جميع الديون ولديك أموال كافية للرحلة وللمعالين أثناء غيابك."
            },
            {
              title: "الاستعداد الروحي",
              content: "تعلم عن المناسك، واعمل توبة صادقة، واطلب المغفرة من الآخرين، وصفي نيتك."
            }
          ]
        },
        order: 1,
        image_url: "https://images.unsplash.com/photo-1566378246598-c3cc0ca3d831",
        reference: "Based on teachings from Sheikh Abdul Aziz Ibn Baaz",
        scholar_id: 1,
        is_essential: true
      },
      {
        id: this.currentHajjGuideId++,
        title: "Ihram and its requirements",
        title_ar: "الإحرام ومتطلباته",
        description: "Understanding the state of Ihram and the proper way to enter it.",
        description_ar: "فهم حالة الإحرام والطريقة الصحيحة للدخول فيه.",
        content: {
          sections: [
            {
              title: "What is Ihram",
              content: "Ihram is a sacred state that pilgrims enter before performing Hajj or Umrah, signifying purity and devotion."
            },
            {
              title: "Ihram Clothing",
              content: "Men wear two white unsewn sheets, while women wear regular modest clothes. Avoid perfume, cutting nails or hair."
            },
            {
              title: "Talbiyah",
              content: "After entering Ihram, recite the Talbiyah: 'Labbayk Allahumma labbayk, labbayk la shareeka laka labbayk, innal-hamda wan-ni'mata laka wal-mulk, la shareeka lak.'"
            }
          ]
        },
        content_ar: {
          sections: [
            {
              title: "ما هو الإحرام",
              content: "الإحرام هو حالة مقدسة يدخل فيها الحجاج قبل أداء الحج أو العمرة، مما يدل على النقاء والتفاني."
            },
            {
              title: "ملابس الإحرام",
              content: "يرتدي الرجال قطعتين بيضاء غير مخيطة، بينما ترتدي النساء ملابس محتشمة عادية. تجنب العطر، قص الأظافر أو الشعر."
            },
            {
              title: "التلبية",
              content: "بعد دخول الإحرام، رتل التلبية: 'لبيك اللهم لبيك، لبيك لا شريك لك لبيك، إن الحمد والنعمة لك والملك، لا شريك لك.'"
            }
          ]
        },
        order: 2,
        image_url: "https://images.unsplash.com/photo-1581559178851-b99664da71bd",
        reference: "Sahih Bukhari 1549",
        scholar_id: 2,
        is_essential: true
      }
    ];

    hajjGuides.forEach(guide => {
      this.hajjGuides.set(guide.id, guide as HajjGuide);
    });

    // Seed Umrah guides
    const umrahGuides = [
      {
        id: this.currentUmrahGuideId++,
        title: "Ihram",
        title_ar: "الإحرام",
        description: "Entering the sacred state with proper intention and wearing the prescribed clothing.",
        description_ar: "الدخول في الحالة المقدسة بالنية الصحيحة وارتداء الملابس الموصوفة.",
        content: {
          sections: [
            {
              title: "Meeqat Locations",
              content: "These are specific locations where pilgrims must enter into ihram. For those coming from Madinah, it's Dhul-Hulaifah (Abyar Ali)."
            },
            {
              title: "How to Enter Ihram",
              content: "Take a shower (ghusl), put on ihram garments (for men), make intention (niyyah) for Umrah, and recite the talbiyah."
            },
            {
              title: "Prohibitions During Ihram",
              content: "Avoid perfume, cutting hair/nails, covering the head (men), wearing gloves (women), hunting, marriage contracts, and intimate relations."
            }
          ]
        },
        content_ar: {
          sections: [
            {
              title: "مواقع الميقات",
              content: "هذه مواقع محددة يجب على الحجاج الدخول منها في الإحرام. بالنسبة للقادمين من المدينة، فهي ذو الحليفة (آبار علي)."
            },
            {
              title: "كيفية دخول الإحرام",
              content: "خذ حمامًا (غسل)، ارتدِ ملابس الإحرام (للرجال)، انوي (نية) للعمرة، وردد التلبية."
            },
            {
              title: "المحظورات أثناء الإحرام",
              content: "تجنب العطر، قص الشعر/الأظافر، تغطية الرأس (للرجال)، ارتداء القفازات (للنساء)، الصيد، عقود الزواج، والعلاقات الحميمة."
            }
          ]
        },
        order: 1,
        image_url: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa",
        reference: "Sahih Bukhari 1549",
        scholar_id: 1,
        is_essential: true
      },
      {
        id: this.currentUmrahGuideId++,
        title: "Tawaf",
        title_ar: "الطواف",
        description: "Circumambulation of the Kaaba seven times in a counterclockwise direction.",
        description_ar: "الطواف حول الكعبة سبع مرات في اتجاه عكس عقارب الساعة.",
        content: {
          sections: [
            {
              title: "Preparation for Tawaf",
              content: "Ensure you are in a state of wudu (ablution). Begin at the Black Stone or in line with it."
            },
            {
              title: "How to Perform Tawaf",
              content: "Walk around the Kaaba seven times counterclockwise, with the Kaaba on your left. Men perform raml (brisk walking) in the first three rounds if possible."
            },
            {
              title: "Supplications During Tawaf",
              content: "There is no specific dua for tawaf. You can recite Quran, make personal dua, or use the reported dua: 'Rabbana atina fid-dunya hasanatan wa fil akhirati hasanatan wa qina adhaban-nar.'"
            }
          ]
        },
        content_ar: {
          sections: [
            {
              title: "الاستعداد للطواف",
              content: "تأكد من أنك في حالة وضوء. ابدأ عند الحجر الأسود أو في خط معه."
            },
            {
              title: "كيفية أداء الطواف",
              content: "السير حول الكعبة سبع مرات عكس اتجاه عقارب الساعة، مع وجود الكعبة على يسارك. يؤدي الرجال الرمل (المشي السريع) في الأشواط الثلاثة الأولى إذا أمكن."
            },
            {
              title: "الأدعية أثناء الطواف",
              content: "لا يوجد دعاء محدد للطواف. يمكنك تلاوة القرآن، عمل دعاء شخصي، أو استخدام الدعاء المأثور: 'ربنا آتنا في الدنيا حسنة وفي الآخرة حسنة وقنا عذاب النار.'"
            }
          ]
        },
        order: 2,
        image_url: "https://images.unsplash.com/photo-1537031934600-7046ab816a21",
        reference: "Sahih Muslim 1218",
        scholar_id: 2,
        is_essential: true
      },
      {
        id: this.currentUmrahGuideId++,
        title: "Sa'i",
        title_ar: "السعي",
        description: "Walking seven times between the hills of Safa and Marwah inside the mosque.",
        description_ar: "المشي سبع مرات بين جبلي الصفا والمروة داخل المسجد.",
        content: {
          sections: [
            {
              title: "Preparation for Sa'i",
              content: "Sa'i is performed after Tawaf. Begin at Safa and end at Marwah. Wudu is recommended but not required."
            },
            {
              title: "How to Perform Sa'i",
              content: "Start at Safa, recite 'Innas-safa wal-marwata min sha'a'irillah', climb Safa and face Kaaba, raise hands and make dua. Walk to Marwah at normal pace, with brisk walking in the marked green area (men only). At Marwah, face Kaaba and make dua. This completes one round. Repeat for seven rounds (ending at Marwah)."
            },
            {
              title: "Significance of Sa'i",
              content: "Sa'i commemorates Hajar's search for water for her son Ismail. It symbolizes perseverance, trust in Allah, and striving in worship."
            }
          ]
        },
        content_ar: {
          sections: [
            {
              title: "الاستعداد للسعي",
              content: "يتم أداء السعي بعد الطواف. ابدأ عند الصفا وانتهِ عند المروة. الوضوء مستحب ولكنه ليس مطلوبًا."
            },
            {
              title: "كيفية أداء السعي",
              content: "ابدأ عند الصفا، وردد 'إن الصفا والمروة من شعائر الله'، اصعد الصفا وواجه الكعبة، ارفع يديك وادع. امشِ إلى المروة بوتيرة عادية، مع المشي السريع في المنطقة الخضراء المحددة (للرجال فقط). عند المروة، واجه الكعبة وادع. هذا يكمل شوطًا واحدًا. كرر لمدة سبعة أشواط (تنتهي عند المروة)."
            },
            {
              title: "أهمية السعي",
              content: "السعي يخلد ذكرى بحث هاجر عن الماء لابنها إسماعيل. وهو يرمز إلى المثابرة والثقة في الله والسعي في العبادة."
            }
          ]
        },
        order: 3,
        image_url: "https://images.unsplash.com/photo-1590559911732-638a8f7d2272",
        reference: "Sahih Bukhari 1643",
        scholar_id: 3,
        is_essential: true
      },
      {
        id: this.currentUmrahGuideId++,
        title: "Halq/Taqseer",
        title_ar: "الحلق/التقصير",
        description: "Shaving or trimming the hair to mark the end of the Umrah rituals.",
        description_ar: "حلق أو تقصير الشعر للإشارة إلى نهاية مناسك العمرة.",
        content: {
          sections: [
            {
              title: "Halq vs. Taqseer",
              content: "Men can choose either to shave their entire head (halq - preferred) or to trim their hair (taqseer). Women should only trim their hair by the length of a fingertip."
            },
            {
              title: "Proper Method",
              content: "For halq, the entire head should be shaved. For taqseer, hair should be cut from all parts of the head, not just from one side."
            },
            {
              title: "Completion of Umrah",
              content: "After halq/taqseer, all restrictions of ihram are lifted and the Umrah is complete. Change back to regular clothes."
            }
          ]
        },
        content_ar: {
          sections: [
            {
              title: "الحلق مقابل التقصير",
              content: "يمكن للرجال اختيار إما حلق رأسهم بالكامل (الحلق - مفضل) أو تقصير شعرهم (التقصير). يجب على النساء فقط تقصير شعرهن بطول طرف الإصبع."
            },
            {
              title: "الطريقة الصحيحة",
              content: "للحلق، يجب حلق الرأس بالكامل. للتقصير، يجب قص الشعر من جميع أجزاء الرأس، وليس فقط من جانب واحد."
            },
            {
              title: "إتمام العمرة",
              content: "بعد الحلق/التقصير، ترفع جميع قيود الإحرام وتكتمل العمرة. غير ملابسك إلى الملابس العادية."
            }
          ]
        },
        order: 4,
        image_url: "https://images.unsplash.com/photo-1564769610726-59a8889badc4",
        reference: "Sahih Muslim 1301",
        scholar_id: 1,
        is_essential: true
      }
    ];

    umrahGuides.forEach(guide => {
      this.umrahGuides.set(guide.id, guide as UmrahGuide);
    });

    // Seed Masjid Guides
    const masjidGuides = [
      {
        id: this.currentMasjidGuideId++,
        title: "Rawdah (Garden of Paradise)",
        title_ar: "الروضة (حديقة الجنة)",
        description: "The area between the Prophet's house and his minbar, described as a garden from the gardens of Paradise.",
        description_ar: "المنطقة بين بيت النبي ومنبره، توصف بأنها روضة من رياض الجنة.",
        content: {
          sections: [
            {
              title: "Location and Significance",
              content: "The Rawdah is located between the Prophet's ﷺ tomb and his minbar (pulpit). The Prophet ﷺ said: 'Between my house and my minbar is a garden from the gardens of Paradise.'"
            },
            {
              title: "Visiting Etiquette",
              content: "Due to its special status, many Muslims desire to pray in the Rawdah. Be patient and respectful, as it can get very crowded. Men and women have separate visiting times."
            },
            {
              title: "Worship in Rawdah",
              content: "Praying in the Rawdah carries special virtue, but is not a requirement. Focus on the quality of your worship rather than the quantity."
            }
          ]
        },
        content_ar: {
          sections: [
            {
              title: "الموقع والأهمية",
              content: "تقع الروضة بين قبر النبي ﷺ ومنبره (المنبر). قال النبي ﷺ: 'ما بين بيتي ومنبري روضة من رياض الجنة.'"
            },
            {
              title: "آداب الزيارة",
              content: "نظرًا لمكانتها الخاصة، يرغب الكثير من المسلمين في الصلاة في الروضة. كن صبورًا ومحترمًا، حيث يمكن أن تصبح مزدحمة جدًا. للرجال والنساء أوقات زيارة منفصلة."
            },
            {
              title: "العبادة في الروضة",
              content: "الصلاة في الروضة تحمل فضيلة خاصة، ولكنها ليست مطلوبة. ركز على جودة عبادتك بدلاً من الكمية."
            }
          ]
        },
        category: "Sacred Area",
        location: "Inside the main mosque",
        location_ar: "داخل المسجد الرئيسي",
        image_url: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa",
        reference: "Sahih Al-Bukhari 1196"
      },
      {
        id: this.currentMasjidGuideId++,
        title: "Main Prayer Hall",
        title_ar: "قاعة الصلاة الرئيسية",
        description: "The vast prayer area that can accommodate over a million worshippers with its magnificent architecture.",
        description_ar: "منطقة الصلاة الواسعة التي يمكن أن تستوعب أكثر من مليون مصلي بهندستها المعمارية الرائعة.",
        content: {
          sections: [
            {
              title: "Architecture and Expansion",
              content: "The main prayer hall has undergone numerous expansions throughout history. It features beautiful carpets, marble floors, and ornate pillars, with a mix of traditional Islamic and modern architectural elements."
            },
            {
              title: "Prayer Times and Organization",
              content: "The mosque organizes rows with clear markings on the carpet. Follow the guidance of the attendants for a smooth experience. The five daily prayers are called by beautiful voices of the muezzins."
            },
            {
              title: "Virtue of Prayer",
              content: "The Prophet ﷺ said: 'One prayer in my mosque is better than a thousand prayers elsewhere, except for Masjid Al-Haram (in Makkah).'"
            }
          ]
        },
        content_ar: {
          sections: [
            {
              title: "العمارة والتوسع",
              content: "خضعت قاعة الصلاة الرئيسية للعديد من التوسعات على مر التاريخ. تتميز بالسجاد الجميل والأرضيات الرخامية والأعمدة المزخرفة، مع مزيج من العناصر المعمارية الإسلامية التقليدية والحديثة."
            },
            {
              title: "أوقات الصلاة والتنظيم",
              content: "ينظم المسجد الصفوف بعلامات واضحة على السجاد. اتبع إرشادات المشرفين للحصول على تجربة سلسة. يتم النداء للصلوات الخمس اليومية بأصوات جميلة من المؤذنين."
            },
            {
              title: "فضل الصلاة",
              content: "قال النبي ﷺ: 'صلاة في مسجدي أفضل من ألف صلاة فيما سواه، إلا المسجد الحرام (في مكة).'"
            }
          ]
        },
        category: "Prayer Area",
        location: "Central area of the mosque",
        location_ar: "المنطقة المركزية للمسجد",
        image_url: "https://images.unsplash.com/photo-1564769610726-59a8889badc4",
        reference: "Sahih Muslim 1394"
      },
      {
        id: this.currentMasjidGuideId++,
        title: "Historical Sites",
        title_ar: "المواقع التاريخية",
        description: "Explore the various historical markers, minarets, and the expansion history of the mosque through centuries.",
        description_ar: "استكشف المعالم التاريخية المختلفة والمآذن وتاريخ توسع المسجد عبر القرون.",
        content: {
          sections: [
            {
              title: "The Green Dome",
              content: "This distinctive feature marks the location of the Prophet's ﷺ tomb. Built in the early Islamic era, it was painted green during the Ottoman period and has become the iconic symbol of the mosque."
            },
            {
              title: "The Ten Minarets",
              content: "The mosque features ten minarets of varying heights and designs, representing different periods of expansion. The tallest ones stand at 105 meters high."
            },
            {
              title: "Historical Sections",
              content: "Each expansion of the mosque reflects the architectural style of its era. Notice the different styles from the Ottoman, Saudi, and modern periods, each with unique characteristics."
            }
          ]
        },
        content_ar: {
          sections: [
            {
              title: "القبة الخضراء",
              content: "تميز هذه الميزة المميزة موقع قبر النبي ﷺ. بنيت في العصر الإسلامي المبكر، وطليت باللون الأخضر خلال الفترة العثمانية وأصبحت الرمز الأيقوني للمسجد."
            },
            {
              title: "المآذن العشر",
              content: "يضم المسجد عشر مآذن بارتفاعات وتصاميم متنوعة، تمثل فترات مختلفة من التوسع. أطولها يبلغ ارتفاعها 105 متر."
            },
            {
              title: "الأقسام التاريخية",
              content: "يعكس كل توسع للمسجد الطراز المعماري لعصره. لاحظ الأنماط المختلفة من الفترات العثمانية والسعودية والحديثة، ولكل منها خصائص فريدة."
            }
          ]
        },
        category: "Historical Landmarks",
        location: "Throughout the mosque complex",
        location_ar: "في جميع أنحاء مجمع المسجد",
        image_url: "https://images.unsplash.com/photo-1537031934600-7046ab816a21",
        reference: "Various historical sources"
      }
    ];

    masjidGuides.forEach(guide => {
      this.masjidGuides.set(guide.id, guide as MasjidGuide);
    });

    // Seed Duas
    const duas = [
      {
        id: this.currentDuaId++,
        title: "Dua for Entering Ihram",
        title_ar: "دعاء دخول الإحرام",
        arabic_text: "لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ، لَا شَرِيكَ لَكَ",
        transliteration: "Labbayk Allahumma labbayk, labbayk la shareeka laka labbayk, innal-hamda wan-ni'mata laka wal-mulk, la shareeka lak.",
        translation: "Here I am, O Allah, here I am. Here I am, You have no partner, here I am. Verily all praise, grace and sovereignty belong to You. You have no partner.",
        translation_ar: "لبيك اللهم لبيك، لبيك لا شريك لك لبيك، إن الحمد والنعمة لك والملك، لا شريك لك",
        reference: "Sahih Bukhari 1549",
        category: "Hajj & Umrah",
        tags: ["Ihram", "Talbiyah", "Hajj", "Umrah"]
      },
      {
        id: this.currentDuaId++,
        title: "Dua When Seeing the Kaaba",
        title_ar: "دعاء عند رؤية الكعبة",
        arabic_text: "اللَّهُمَّ زِدْ بَيْتَكَ هَذَا تَشْرِيفًا وَتَعْظِيمًا وَتَكْرِيمًا وَمَهَابَةً، وَزِدْ مِنْ شَرَّفَهُ وَعَظَّمَهُ مِمَّنْ حَجَّهُ أَوْ اعْتَمَرَهُ تَشْرِيفًا وَتَكْرِيمًا وَتَعْظِيمًا وَبِرًّا",
        transliteration: "Allahumma zid hatha al-bayta tashreefan wa ta'dheeman wa takreeman wa mahabatan, wa zid man sharrafahu wa 'adhdhamahu mimman hajjahu aw i'tamarahu tashreefan wa takreeman wa ta'dheeman wa birran.",
        translation: "O Allah, increase this House in honor, dignity, reverence and awe, and increase those who honor and revere it among those who come to it for Hajj or 'Umrah in honor, dignity, reverence and righteousness.",
        translation_ar: "اللهم زد هذا البيت تشريفًا وتعظيمًا وتكريمًا ومهابةً، وزد من شرفه وعظمه ممن حجه أو اعتمره تشريفًا وتكريمًا وتعظيمًا وبرًا",
        reference: "Reported by Ibn 'Umar",
        category: "Hajj & Umrah",
        tags: ["Kaaba", "Tawaf", "Hajj", "Umrah"]
      },
      {
        id: this.currentDuaId++,
        title: "Dua Between Safa and Marwah",
        title_ar: "دعاء بين الصفا والمروة",
        arabic_text: "رَبِّ اغْفِرْ وَارْحَمْ إِنَّكَ أَنْتَ الْأَعَزُّ الْأَكْرَمُ",
        transliteration: "Rabbighfir warham innaka antal a'azzul akram.",
        translation: "O Lord, forgive and have mercy, indeed You are the Most Mighty, the Most Noble.",
        translation_ar: "رب اغفر وارحم إنك أنت الأعز الأكرم",
        reference: "Reported by Ibn 'Abbas",
        category: "Hajj & Umrah",
        tags: ["Sa'i", "Hajj", "Umrah"]
      }
    ];

    duas.forEach(dua => {
      this.duas.set(dua.id, dua as Dua);
    });

    // Seed Advertisements
    const advertisements = [
      {
        id: this.currentAdvertisementId++,
        title: "Verified Hajj travel packages",
        description: "Premium Hajj travel services with authentic guidance and support",
        link: "https://example.com/hajj-packages",
        image_placeholder: "hajj-travel-ad",
        location: "sidebar",
        is_active: true
      },
      {
        id: this.currentAdvertisementId++,
        title: "Islamic books and resources",
        description: "Authentic Islamic literature for Hajj and Umrah preparation",
        link: "https://example.com/islamic-books",
        image_placeholder: "islamic-books-ad",
        location: "sidebar",
        is_active: true
      },
      {
        id: this.currentAdvertisementId++,
        title: "Accommodation near holy sites",
        description: "Convenient and comfortable accommodation options near Masjid Al-Haram",
        link: "https://example.com/accommodation",
        image_placeholder: "accommodation-ad",
        location: "sidebar",
        is_active: true
      },
      {
        id: this.currentAdvertisementId++,
        title: "Hajj visa services",
        description: "Professional visa processing for your pilgrimage journey",
        link: "https://example.com/visa-services",
        image_placeholder: "visa-ad",
        location: "homepage",
        is_active: true
      }
    ];

    advertisements.forEach(ad => {
      this.advertisements.set(ad.id, ad as Advertisement);
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }

  async createUser(user: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const newUser: User = { ...user, id, progress: {} };
    this.users.set(id, newUser);
    return newUser;
  }

  async updateUserProgress(userId: number, progress: Record<string, any>): Promise<User | undefined> {
    const user = await this.getUser(userId);
    if (!user) return undefined;
    
    const updatedUser = {
      ...user,
      progress: {
        ...user.progress,
        ...progress
      }
    };
    
    this.users.set(userId, updatedUser);
    return updatedUser;
  }

  // Hajj Guide methods
  async getHajjGuides(): Promise<HajjGuide[]> {
    return Array.from(this.hajjGuides.values()).sort((a, b) => a.order - b.order);
  }

  async getHajjGuide(id: number): Promise<HajjGuide | undefined> {
    return this.hajjGuides.get(id);
  }

  async createHajjGuide(guide: InsertHajjGuide): Promise<HajjGuide> {
    const id = this.currentHajjGuideId++;
    const newGuide: HajjGuide = { ...guide, id };
    this.hajjGuides.set(id, newGuide);
    return newGuide;
  }

  // Umrah Guide methods
  async getUmrahGuides(): Promise<UmrahGuide[]> {
    return Array.from(this.umrahGuides.values()).sort((a, b) => a.order - b.order);
  }

  async getUmrahGuide(id: number): Promise<UmrahGuide | undefined> {
    return this.umrahGuides.get(id);
  }

  async createUmrahGuide(guide: InsertUmrahGuide): Promise<UmrahGuide> {
    const id = this.currentUmrahGuideId++;
    const newGuide: UmrahGuide = { ...guide, id };
    this.umrahGuides.set(id, newGuide);
    return newGuide;
  }

  // Masjid Guide methods
  async getMasjidGuides(): Promise<MasjidGuide[]> {
    return Array.from(this.masjidGuides.values());
  }

  async getMasjidGuide(id: number): Promise<MasjidGuide | undefined> {
    return this.masjidGuides.get(id);
  }

  async getMasjidGuidesByCategory(category: string): Promise<MasjidGuide[]> {
    return Array.from(this.masjidGuides.values()).filter(
      guide => guide.category === category
    );
  }

  async createMasjidGuide(guide: InsertMasjidGuide): Promise<MasjidGuide> {
    const id = this.currentMasjidGuideId++;
    const newGuide: MasjidGuide = { ...guide, id };
    this.masjidGuides.set(id, newGuide);
    return newGuide;
  }

  // Dua methods
  async getDuas(): Promise<Dua[]> {
    return Array.from(this.duas.values());
  }

  async getDua(id: number): Promise<Dua | undefined> {
    return this.duas.get(id);
  }

  async getDuasByCategory(category: string): Promise<Dua[]> {
    return Array.from(this.duas.values()).filter(
      dua => dua.category === category
    );
  }

  async createDua(dua: InsertDua): Promise<Dua> {
    const id = this.currentDuaId++;
    const newDua: Dua = { ...dua, id };
    this.duas.set(id, newDua);
    return newDua;
  }

  // Scholar methods
  async getScholars(): Promise<Scholar[]> {
    return Array.from(this.scholars.values());
  }

  async getScholar(id: number): Promise<Scholar | undefined> {
    return this.scholars.get(id);
  }

  async createScholar(scholar: InsertScholar): Promise<Scholar> {
    const id = this.currentScholarId++;
    const newScholar: Scholar = { ...scholar, id };
    this.scholars.set(id, newScholar);
    return newScholar;
  }

  // Advertisement methods
  async getAdvertisements(): Promise<Advertisement[]> {
    return Array.from(this.advertisements.values());
  }

  async getAdvertisementsByLocation(location: string): Promise<Advertisement[]> {
    return Array.from(this.advertisements.values()).filter(
      ad => ad.location === location && ad.is_active
    );
  }

  async createAdvertisement(ad: InsertAdvertisement): Promise<Advertisement> {
    const id = this.currentAdvertisementId++;
    const newAd: Advertisement = { ...ad, id };
    this.advertisements.set(id, newAd);
    return newAd;
  }

  async toggleAdvertisement(id: number, isActive: boolean): Promise<Advertisement | undefined> {
    const ad = await this.advertisements.get(id);
    if (!ad) return undefined;
    
    const updatedAd = { ...ad, is_active: isActive };
    this.advertisements.set(id, updatedAd);
    return updatedAd;
  }
}

export const storage = new MemStorage();
