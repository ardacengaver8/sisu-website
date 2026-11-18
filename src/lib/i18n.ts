export const locales = ["tr", "en", "de"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "tr";

export function isLocale(x: string): x is Locale {
  return (locales as readonly string[]).includes(x);
}

export const localeNames: Record<Locale, string> = { tr: "Türkçe", en: "English", de: "Deutsch" };

const tr = {
  meta: {
    title: "Sisu Danışmanlık — Değişimin pusulası",
    description:
      "Değişim yönetimi, kurumsallaşma, stratejik planlama ve kurum kültürü danışmanlığı. Uluslararası şirketlerde 30 yılı aşkın üst düzey yöneticilik deneyimi.",
  },
  nav: {
    manifesto: "Sisu",
    expertise: "Uzmanlıklar",
    team: "Ekip",
    clients: "Danışanlar",
    approach: "Yaklaşım",
    journal: "Yazılar",
    contact: "İletişim",
    menu: "Menü",
    close: "Kapat",
  },
  hero: {
    fig: "FIG. 00 — GENEL GÖRÜNÜM",
    eyebrow: "Sisu Danışmanlık · İstanbul",
    title: ["Değişimin", "pusulası."],
    lead: "Yeniden yapılanma, kurumsallaşma ve kültür dönüşümünde; uluslararası şirketlerde 30 yılı aşkın üst düzey yöneticilik deneyimiyle kurumunuza yön veriyoruz.",
    ctaPrimary: "Yola birlikte çıkalım",
    ctaSecondary: "Uzmanlık alanları",
    scroll: "Kaydırın — ibre yönünü bulur",
    hint: "Sürükleyin · tıklayın",
  },
  manifesto: {
    fig: "FIG. 01 — TANIM",
    word: "sisu",
    phon: "/ˈsi.su/",
    pos: "Fince · isim",
    definition: "Zorluklara karşı içsel güç, dayanıklılık, azim ve kararlılık.",
    body: "Değişim kolay değildir; hazırlıksız başlatılan dönüşümlerin çoğu yarıda kalır. Doğru yön, sabır ve kararlılık ister. Biz bu yolu kurumunuzla birlikte, adım adım yürürüz.",
  },
  expertise: {
    fig: "FIG. 02 — UZMANLIK ALANLARI",
    title: "Yedi yön, tek hedef.",
    heading: "YÖN",
    items: [
      {
        title: "Yeniden Yapılanma ve Değişim Yönetimi",
        body: "İç ve dış kaynaklı değişim süreçlerini bilinçli ve duyarlı biçimde yönetiyoruz. Hazırlıktan uygulamaya, değişimin kalıcı olması için gereken her adımda yanınızdayız.",
        tags: ["Değişim yol haritası", "Paydaş yönetimi", "İletişim planı"],
      },
      {
        title: "KOBİ'lerde Kurumsallaşma",
        body: "Kurum vizyonunuza uygun yönetim ve davranış ilkelerini birlikte kurguluyor, uygulamaya alıyor ve kalıcı hale getiriyoruz.",
        tags: ["Yönetişim", "Süreç tasarımı", "Rol ve yetki"],
      },
      {
        title: "Stratejik Planlama",
        body: "İç ve dış analizlerle sürdürülebilir rekabet üstünlüğü için yol haritası ve eylem planı hazırlıyor; düzenli gözden geçirme sistemleriyle ilerlemeyi takip ediyoruz.",
        tags: ["SWOT ve analiz", "Yol haritası", "Gözden geçirme"],
      },
      {
        title: "Operasyonel Üstünlük",
        body: "Üretim hatlarında verimlilik çalışmalarına ve çalışan katılımını artıran iyi uygulamaların devreye alınmasına öncülük ediyoruz.",
        tags: ["Verimlilik", "İyi uygulamalar", "Katılım"],
      },
      {
        title: "Ticari Üstünlük",
        body: "Müşteri memnuniyeti ve bağlılığı, servis kalitesi ve tedarik zinciri çözümlerini; finansal göstergeler ve sermaye disipliniyle dengeliyoruz.",
        tags: ["Müşteri bağlılığı", "Tedarik zinciri", "Sermaye disiplini"],
      },
      {
        title: "Organizasyonel Üstünlük",
        body: "Stratejinin tüm paydaşlarca benimsenmesini sağlıyor; yetenek ve görev dengesini kuran yüksek performanslı yapılar tasarlıyoruz.",
        tags: ["Organizasyon tasarımı", "Yetenek", "Performans"],
      },
      {
        title: "İş Güvenliği Kültürü",
        body: "Sıfır kaza hedefine ulaşmak için iş güvenliğini bir kural listesinden kurum kültürüne dönüştüren değişim planları uyguluyoruz.",
        tags: ["Sıfır kaza", "Davranış", "Liderlik"],
      },
    ],
  },
  numbers: {
    fig: "FIG. 03 — ÖLÇÜLER",
    items: [
      { v: "30", suffix: "+", k: "yıl üst düzey yöneticilik" },
      { v: "4", suffix: "", k: "ülkede görev: Türkiye, Almanya, Güney Afrika, Romanya" },
      { v: "7", suffix: "", k: "uzmanlık alanı" },
      { v: "CEO", suffix: "", k: "giriş seviyesinden en üst yönetime" },
    ],
  },
  founder: {
    fig: "FIG. 04 — KURUCU",
    name: "Mehmet Kurma",
    role: "Kurucu",
    bio: "Siemens ve Amcor gibi uluslararası şirketlerde giriş seviyesinden başlayıp genel müdürlük ve CEO'luğa uzanan bir kariyer. Bugün bu birikimi, uzman bir ekip ve geniş bir profesyonel ağla değişimi yönetmek isteyen kurumlarla paylaşıyor.",
    photo: "PORTRE — FOTOĞRAF EKLENECEK",
    linkedin: "LinkedIn profili",
    cols: ["Dönem", "Kurum", "Görev"],
    timeline: [
      { yr: "Eğitim", org: "İstanbul Alman Lisesi · WU Wien", role: "İşletme; örgüt psikolojisi uzmanlık tezi ve doktora çalışmaları" },
      { yr: "1992 — 2001", org: "Siemens", role: "Raporlama, yönetici adaylığı ve finans direktörlüğü görevleri" },
      { yr: "2001 — 2017", org: "Amcor Flexibles", role: "Finans direktörlüğü; ardından uzun yıllar genel müdür ve yönetim kurulu üyesi" },
      { yr: "2017 — 2022", org: "Etapak & Etap Enjeksiyon", role: "CEO ve yönetim kurulu üyesi" },
      { yr: "Bugün", org: "Sisu Danışmanlık", role: "Kurucu" },
    ],
    pressLabel: "BASINDA",
    pressRead: "Haberi oku",
    press: [
      {
        source: "Packworld Türkiye",
        date: "2016-01-14",
        title: "Baskılı Ambalajla Ciro Sıralamasında Devler Ligine Girdi",
        note: "Amcor Flexibles İstanbul genel müdürü olarak Mehmet Kurma, Tuzla tesisinin Amcor'un küresel ciro sıralamasında ilk 15'e girişini, 4,5 milyon euroluk yenileme yatırımını ve iş güvenliği programını anlatıyor.",
        url: "https://packworldturkiye.com/baskili-ambalajla-ciro-siralamasinda-devler-ligine-girdi",
      },
      {
        source: "Haberler.com",
        date: "2015-12-03",
        title: "Amcor'a İş Güvenliği Başkanlık Altın Ödülü",
        note: "Amcor Flexibles İstanbul, her hafta farklı bir çalışanın güvensiz davranışları takip ettiği \"Güvenlik Kaptanları\" programıyla Safety Awards altın ödülünü kazandı; tesis 1.092 gün kazasız çalıştı.",
        url: "https://www.haberler.com/guncel/amcor-a-is-guvenligi-baskanlik-altin-odulu-7933825-haberi/",
      },
    ],
  },
  team: {
    fig: "FIG. 05 — EKİBİMİZ",
    title: "Ekibimiz",
    intro: "Her projede, ihtiyaca göre genişleyen bir uzman ağıyla birlikte çalışan çekirdek ekibimiz.",
    photo: "FOTOĞRAF",
    members: [
      { name: "Mehmet Kurma", role: "Kurucu", note: "", img: "founder.jpg" },
      { name: "Defne Kurma", role: "Pazarlama Uzmanı", note: "", img: "team/defne-kurma.jpg" },
      { name: "Ali Yunus Türker", role: "Veri Analisti", note: "", img: "team/ali-yunus-turker.jpg" },
    ],
  },
  clients: {
    fig: "FIG. 06 — DANIŞANLARIMIZ",
    title: "Danışanlarımız",
    intro: "Değişim yolculuğunda birlikte çalıştığımız kurumlardan bazıları.",
    items: [
      { name: "Arimpeks Constantia", loc: "Stuttgart, Almanya" },
      { name: "Pal Plastik", loc: "İstanbul, Türkiye" },
      { name: "Boğaziçi Etiket", loc: "İstanbul, Türkiye" },
      { name: "Jim Lake Companies", loc: "Dallas, TX, ABD" },
    ],
  },
  approach: {
    fig: "FIG. 07 — YAKLAŞIM",
    title: "Yolu birlikte yürürüz.",
    items: [
      { t: "Saha deneyimi", b: "Önerilerimiz teoriden değil; bizzat yönetilmiş şirketlerden ve çözülmüş gerçek problemlerden gelir." },
      { t: "Uzman ekip", b: "Her projede, ihtiyaca göre bir araya gelen ve sizinle birlikte çalışan uzmanlardan oluşan bir ekip." },
      { t: "Size özel çözüm", b: "Hazır şablonlar yerine kurumunuzun kültürüne, hedeflerine ve gerçeklerine göre kurgulanan çözümler." },
      { t: "Geniş ağ", b: "Endüstriyel ilişkiler, teknik ve ticari bilgi birikimi ile güçlü bir profesyonel ağ." },
    ],
  },
  journal: {
    fig: "FIG. 08 — YAZILAR",
    title: "Yazılar",
    intro: "Değişim, liderlik ve kurum kültürü üzerine notlar.",
    all: "Tüm yazılar",
    read: "Oku",
    sample: "Örnek içerik",
    fallback: "Bu yazı yalnızca Türkçe olarak mevcuttur.",
    empty: "Yakında.",
    back: "Tüm yazılar",
    minutes: "dk okuma",
  },
  contact: {
    fig: "FIG. 09 — İLETİŞİM",
    title: ["Yola birlikte", "çıkalım."],
    lead: "Kurumunuzun önündeki değişimi konuşalım. Formu doldurun ya da doğrudan ulaşın.",
    form: {
      name: "Ad Soyad",
      company: "Şirket",
      email: "E-posta",
      message: "Mesajınız",
      send: "Gönder",
      sending: "Gönderiliyor…",
      sent: "Teşekkürler — en kısa sürede dönüş yapacağız.",
      error: "Bir sorun oluştu. Lütfen doğrudan e-posta ile ulaşın.",
      mailtoNote: "Gönder'e bastığınızda e-posta uygulamanız açılır.",
      subject: "Web sitesinden mesaj",
      label: "İLETİŞİM FORMU",
    },
    labels: { email: "E-posta", phone: "Telefon", address: "Adres" },
  },
  footer: { contact: "İLETİŞİM", address: "ADRES", rights: "Tüm hakları saklıdır." },
  compass: { label: "Pusula", sub: "Değişimin yönü" },
};

export type Dict = typeof tr;

const en: Dict = {
  meta: {
    title: "Sisu Consulting — A compass for change",
    description:
      "Change management, institutionalisation, strategic planning and corporate culture consulting, backed by 30+ years of senior leadership at international companies.",
  },
  nav: {
    manifesto: "Sisu",
    expertise: "Expertise",
    team: "Team",
    clients: "Clients",
    approach: "Approach",
    journal: "Journal",
    contact: "Contact",
    menu: "Menu",
    close: "Close",
  },
  hero: {
    fig: "FIG. 00 — GENERAL VIEW",
    eyebrow: "Sisu Consulting · Istanbul",
    title: ["A compass", "for change."],
    lead: "We guide organisations through restructuring, institutionalisation and cultural transformation, drawing on more than 30 years of senior leadership at international companies.",
    ctaPrimary: "Let's set out together",
    ctaSecondary: "Areas of expertise",
    scroll: "Scroll — the needle finds its heading",
    hint: "Drag · click",
  },
  manifesto: {
    fig: "FIG. 01 — DEFINITION",
    word: "sisu",
    phon: "/ˈsi.su/",
    pos: "Finnish · noun",
    definition: "Inner strength, resilience, perseverance and determination in the face of adversity.",
    body: "Change is never easy; most transformations launched without preparation stall halfway. It takes the right direction, patience and resolve. We walk that road with your organisation, step by step.",
  },
  expertise: {
    fig: "FIG. 02 — AREAS OF EXPERTISE",
    title: "Seven directions, one goal.",
    heading: "HDG",
    items: [
      {
        title: "Restructuring & Change Management",
        body: "We manage internally and externally driven change consciously and with care — from preparation to execution, at every step needed to make change last.",
        tags: ["Change roadmap", "Stakeholder management", "Communication plan"],
      },
      {
        title: "Institutionalisation for SMEs",
        body: "Together we design, implement and embed management and behavioural principles that match your company's vision.",
        tags: ["Governance", "Process design", "Roles & authority"],
      },
      {
        title: "Strategic Planning",
        body: "Internal and external analysis leading to a roadmap and action plan for sustainable competitive advantage, with regular review systems to track progress.",
        tags: ["SWOT & analysis", "Roadmap", "Reviews"],
      },
      {
        title: "Operational Excellence",
        body: "We lead efficiency work on production lines and the roll-out of good practices that increase employee engagement.",
        tags: ["Efficiency", "Good practices", "Engagement"],
      },
      {
        title: "Commercial Excellence",
        body: "We balance customer satisfaction and loyalty, service quality and supply-chain solutions with financial indicators and capital discipline.",
        tags: ["Customer loyalty", "Supply chain", "Capital discipline"],
      },
      {
        title: "Organisational Excellence",
        body: "We make sure strategy is owned by every stakeholder, and design high-performing structures that balance talent and roles.",
        tags: ["Organisation design", "Talent", "Performance"],
      },
      {
        title: "Safety Culture",
        body: "We implement change plans that turn occupational safety from a list of rules into a company culture — towards zero accidents.",
        tags: ["Zero accidents", "Behaviour", "Leadership"],
      },
    ],
  },
  numbers: {
    fig: "FIG. 03 — DIMENSIONS",
    items: [
      { v: "30", suffix: "+", k: "years of senior leadership" },
      { v: "4", suffix: "", k: "countries: Türkiye, Germany, South Africa, Romania" },
      { v: "7", suffix: "", k: "areas of expertise" },
      { v: "CEO", suffix: "", k: "from entry level to the top" },
    ],
  },
  founder: {
    fig: "FIG. 04 — FOUNDER",
    name: "Mehmet Kurma",
    role: "Founder",
    bio: "A career at international companies such as Siemens and Amcor that began at entry level and led to general management and the CEO's office. Today he shares that experience — together with a team of specialists and a broad professional network — with organisations that want to lead change.",
    photo: "PORTRAIT — PHOTO TO BE ADDED",
    linkedin: "LinkedIn profile",
    cols: ["Period", "Organisation", "Role"],
    timeline: [
      { yr: "Education", org: "Istanbul German High School · WU Vienna", role: "Business administration; thesis in organisational psychology and doctoral studies" },
      { yr: "1992 — 2001", org: "Siemens", role: "Reporting, management trainee and finance director roles" },
      { yr: "2001 — 2017", org: "Amcor Flexibles", role: "Finance director; then for many years general manager and board member" },
      { yr: "2017 — 2022", org: "Etapak & Etap Enjeksiyon", role: "CEO and board member" },
      { yr: "Today", org: "Sisu Consulting", role: "Founder" },
    ],
    pressLabel: "IN THE PRESS",
    pressRead: "Read the article",
    press: [
      {
        source: "Packworld Türkiye",
        date: "2016-01-14",
        title: "Baskılı Ambalajla Ciro Sıralamasında Devler Ligine Girdi",
        note: "As general manager of Amcor Flexibles Istanbul, Mehmet Kurma describes how the Tuzla plant entered the top 15 of Amcor's global revenue ranking, its €4.5 million renewal investment and its workplace-safety programme. (Article in Turkish.)",
        url: "https://packworldturkiye.com/baskili-ambalajla-ciro-siralamasinda-devler-ligine-girdi",
      },
      {
        source: "Haberler.com",
        date: "2015-12-03",
        title: "Amcor'a İş Güvenliği Başkanlık Altın Ödülü",
        note: "Amcor Flexibles Istanbul won a Safety Awards gold prize for its \"Safety Captains\" programme, in which a different employee watches for unsafe behaviour each week; the plant reached 1,092 days without an accident. (Article in Turkish.)",
        url: "https://www.haberler.com/guncel/amcor-a-is-guvenligi-baskanlik-altin-odulu-7933825-haberi/",
      },
    ],
  },
  team: {
    fig: "FIG. 05 — OUR TEAM",
    title: "Our team",
    intro: "Our core team, working alongside a network of specialists that grows with each project's needs.",
    photo: "PHOTO",
    members: [
      { name: "Mehmet Kurma", role: "Founder", note: "", img: "founder.jpg" },
      { name: "Defne Kurma", role: "Marketing Specialist", note: "", img: "team/defne-kurma.jpg" },
      { name: "Ali Yunus Türker", role: "Data Analyst", note: "", img: "team/ali-yunus-turker.jpg" },
    ],
  },
  clients: {
    fig: "FIG. 06 — OUR CLIENTS",
    title: "Our clients",
    intro: "Some of the organisations we have worked with on their journey of change.",
    items: [
      { name: "Arimpeks Constantia", loc: "Stuttgart, Germany" },
      { name: "Pal Plastik", loc: "Istanbul, Türkiye" },
      { name: "Boğaziçi Etiket", loc: "Istanbul, Türkiye" },
      { name: "Jim Lake Companies", loc: "Dallas, TX, USA" },
    ],
  },
  approach: {
    fig: "FIG. 07 — APPROACH",
    title: "We walk the road together.",
    items: [
      { t: "Field experience", b: "Our advice doesn't come from theory but from companies we have actually run and real problems we have solved." },
      { t: "Specialist team", b: "For every project, a team of specialists assembled around your needs and working alongside you." },
      { t: "Tailored solutions", b: "No off-the-shelf templates — solutions built around your culture, goals and realities." },
      { t: "Broad network", b: "Industrial relations, technical and commercial know-how, and a strong professional network." },
    ],
  },
  journal: {
    fig: "FIG. 08 — JOURNAL",
    title: "Journal",
    intro: "Notes on change, leadership and corporate culture.",
    all: "All articles",
    read: "Read",
    sample: "Sample content",
    fallback: "This article is only available in Turkish.",
    empty: "Coming soon.",
    back: "All articles",
    minutes: "min read",
  },
  contact: {
    fig: "FIG. 09 — CONTACT",
    title: ["Let's set out", "together."],
    lead: "Let's talk about the change ahead of your organisation. Fill in the form or reach out directly.",
    form: {
      name: "Full name",
      company: "Company",
      email: "Email",
      message: "Your message",
      send: "Send",
      sending: "Sending…",
      sent: "Thank you — we'll get back to you shortly.",
      error: "Something went wrong. Please reach out by email.",
      mailtoNote: "Pressing Send opens your email app.",
      subject: "Message from the website",
      label: "CONTACT FORM",
    },
    labels: { email: "Email", phone: "Phone", address: "Address" },
  },
  footer: { contact: "CONTACT", address: "ADDRESS", rights: "All rights reserved." },
  compass: { label: "Compass", sub: "The direction of change" },
};

const de: Dict = {
  meta: {
    title: "Sisu Beratung — Ein Kompass für Veränderung",
    description:
      "Change Management, Institutionalisierung, strategische Planung und Unternehmenskultur — mit über 30 Jahren Führungserfahrung in internationalen Konzernen.",
  },
  nav: {
    manifesto: "Sisu",
    expertise: "Expertise",
    team: "Team",
    clients: "Kunden",
    approach: "Ansatz",
    journal: "Beiträge",
    contact: "Kontakt",
    menu: "Menü",
    close: "Schließen",
  },
  hero: {
    fig: "FIG. 00 — GESAMTANSICHT",
    eyebrow: "Sisu Beratung · Istanbul",
    title: ["Ein Kompass", "für Wandel."],
    lead: "Wir geben Unternehmen Orientierung bei Restrukturierung, Institutionalisierung und Kulturwandel — mit über 30 Jahren Erfahrung in der Führung internationaler Konzerne.",
    ctaPrimary: "Gemeinsam aufbrechen",
    ctaSecondary: "Kompetenzfelder",
    scroll: "Scrollen — die Nadel findet ihren Kurs",
    hint: "Ziehen · klicken",
  },
  manifesto: {
    fig: "FIG. 01 — DEFINITION",
    word: "sisu",
    phon: "/ˈsi.su/",
    pos: "Finnisch · Substantiv",
    definition: "Innere Stärke, Widerstandskraft, Ausdauer und Entschlossenheit angesichts von Widrigkeiten.",
    body: "Veränderung ist nie leicht; die meisten unvorbereitet gestarteten Transformationen bleiben auf halber Strecke stehen. Sie braucht die richtige Richtung, Geduld und Entschlossenheit. Diesen Weg gehen wir gemeinsam mit Ihrem Unternehmen — Schritt für Schritt.",
  },
  expertise: {
    fig: "FIG. 02 — KOMPETENZFELDER",
    title: "Sieben Richtungen, ein Ziel.",
    heading: "KURS",
    items: [
      {
        title: "Restrukturierung & Change Management",
        body: "Wir steuern intern und extern getriebene Veränderungen bewusst und mit Feingefühl — von der Vorbereitung bis zur Umsetzung, bei jedem Schritt, der Wandel nachhaltig macht.",
        tags: ["Change-Roadmap", "Stakeholder-Management", "Kommunikationsplan"],
      },
      {
        title: "Institutionalisierung im Mittelstand",
        body: "Gemeinsam gestalten, implementieren und verankern wir Führungs- und Verhaltensprinzipien, die zur Vision Ihres Unternehmens passen.",
        tags: ["Governance", "Prozessdesign", "Rollen & Befugnisse"],
      },
      {
        title: "Strategische Planung",
        body: "Interne und externe Analysen münden in eine Roadmap und einen Maßnahmenplan für nachhaltige Wettbewerbsvorteile — mit regelmäßigen Reviews zur Fortschrittskontrolle.",
        tags: ["SWOT & Analyse", "Roadmap", "Reviews"],
      },
      {
        title: "Operative Exzellenz",
        body: "Wir leiten Effizienzprojekte in der Produktion und die Einführung bewährter Praktiken, die das Engagement der Mitarbeitenden stärken.",
        tags: ["Effizienz", "Best Practices", "Engagement"],
      },
      {
        title: "Kommerzielle Exzellenz",
        body: "Wir bringen Kundenzufriedenheit und -bindung, Servicequalität und Lieferkettenlösungen mit Finanzkennzahlen und Kapitaldisziplin in Einklang.",
        tags: ["Kundenbindung", "Lieferkette", "Kapitaldisziplin"],
      },
      {
        title: "Organisatorische Exzellenz",
        body: "Wir sorgen dafür, dass die Strategie von allen Beteiligten getragen wird, und gestalten leistungsstarke Strukturen im Gleichgewicht von Talent und Aufgabe.",
        tags: ["Organisationsdesign", "Talent", "Leistung"],
      },
      {
        title: "Arbeitssicherheitskultur",
        body: "Wir setzen Veränderungspläne um, die Arbeitssicherheit von einer Regelliste zur Unternehmenskultur machen — mit dem Ziel null Unfälle.",
        tags: ["Null Unfälle", "Verhalten", "Führung"],
      },
    ],
  },
  numbers: {
    fig: "FIG. 03 — MASSE",
    items: [
      { v: "30", suffix: "+", k: "Jahre Top-Management" },
      { v: "4", suffix: "", k: "Länder: Türkei, Deutschland, Südafrika, Rumänien" },
      { v: "7", suffix: "", k: "Kompetenzfelder" },
      { v: "CEO", suffix: "", k: "vom Berufseinstieg an die Spitze" },
    ],
  },
  founder: {
    fig: "FIG. 04 — GRÜNDER",
    name: "Mehmet Kurma",
    role: "Gründer",
    bio: "Eine Laufbahn in internationalen Konzernen wie Siemens und Amcor — vom Berufseinstieg bis zur Geschäftsführung und zum CEO. Heute teilt er diese Erfahrung, gemeinsam mit einem Expertenteam und einem breiten Netzwerk, mit Unternehmen, die Wandel gestalten wollen.",
    photo: "PORTRÄT — FOTO FOLGT",
    linkedin: "LinkedIn-Profil",
    cols: ["Zeitraum", "Organisation", "Funktion"],
    timeline: [
      { yr: "Ausbildung", org: "Deutsche Schule Istanbul · WU Wien", role: "Betriebswirtschaft; Diplomarbeit in Organisationspsychologie und Doktoratsstudium" },
      { yr: "1992 — 2001", org: "Siemens", role: "Reporting, Management-Trainee und Finanzdirektor" },
      { yr: "2001 — 2017", org: "Amcor Flexibles", role: "Finanzdirektor; danach viele Jahre Geschäftsführer und Vorstandsmitglied" },
      { yr: "2017 — 2022", org: "Etapak & Etap Enjeksiyon", role: "CEO und Vorstandsmitglied" },
      { yr: "Heute", org: "Sisu Beratung", role: "Gründer" },
    ],
    pressLabel: "IN DER PRESSE",
    pressRead: "Artikel lesen",
    press: [
      {
        source: "Packworld Türkiye",
        date: "2016-01-14",
        title: "Baskılı Ambalajla Ciro Sıralamasında Devler Ligine Girdi",
        note: "Als Geschäftsführer von Amcor Flexibles Istanbul berichtet Mehmet Kurma, wie das Werk in Tuzla unter die Top 15 im weltweiten Umsatzranking von Amcor kam, über die Modernisierungsinvestition von 4,5 Mio. € und das Arbeitssicherheitsprogramm. (Artikel auf Türkisch.)",
        url: "https://packworldturkiye.com/baskili-ambalajla-ciro-siralamasinda-devler-ligine-girdi",
      },
      {
        source: "Haberler.com",
        date: "2015-12-03",
        title: "Amcor'a İş Güvenliği Başkanlık Altın Ödülü",
        note: "Amcor Flexibles Istanbul erhielt für sein Programm „Sicherheitskapitäne“, bei dem jede Woche ein anderer Mitarbeiter auf unsicheres Verhalten achtet, einen Safety-Awards-Goldpreis; das Werk war 1.092 Tage unfallfrei. (Artikel auf Türkisch.)",
        url: "https://www.haberler.com/guncel/amcor-a-is-guvenligi-baskanlik-altin-odulu-7933825-haberi/",
      },
    ],
  },
  team: {
    fig: "FIG. 05 — UNSER TEAM",
    title: "Unser Team",
    intro: "Unser Kernteam — ergänzt durch ein Netzwerk von Fachleuten, das mit den Anforderungen jedes Projekts wächst.",
    photo: "FOTO",
    members: [
      { name: "Mehmet Kurma", role: "Gründer", note: "", img: "founder.jpg" },
      { name: "Defne Kurma", role: "Marketing-Spezialistin", note: "", img: "team/defne-kurma.jpg" },
      { name: "Ali Yunus Türker", role: "Datenanalyst", note: "", img: "team/ali-yunus-turker.jpg" },
    ],
  },
  clients: {
    fig: "FIG. 06 — UNSERE KUNDEN",
    title: "Unsere Kunden",
    intro: "Einige der Unternehmen, die wir auf ihrem Weg des Wandels begleitet haben.",
    items: [
      { name: "Arimpeks Constantia", loc: "Stuttgart, Deutschland" },
      { name: "Pal Plastik", loc: "Istanbul, Türkei" },
      { name: "Boğaziçi Etiket", loc: "Istanbul, Türkei" },
      { name: "Jim Lake Companies", loc: "Dallas, TX, USA" },
    ],
  },
  approach: {
    fig: "FIG. 07 — ANSATZ",
    title: "Wir gehen den Weg gemeinsam.",
    items: [
      { t: "Praxiserfahrung", b: "Unsere Empfehlungen stammen nicht aus der Theorie, sondern aus selbst geführten Unternehmen und gelösten Problemen." },
      { t: "Expertenteam", b: "Für jedes Projekt ein passend zusammengestelltes Team, das eng mit Ihnen zusammenarbeitet." },
      { t: "Maßgeschneidert", b: "Keine Schablonen — Lösungen, die auf Ihre Kultur, Ziele und Realität zugeschnitten sind." },
      { t: "Breites Netzwerk", b: "Arbeitsbeziehungen, technisches und kaufmännisches Know-how und ein starkes Netzwerk." },
    ],
  },
  journal: {
    fig: "FIG. 08 — BEITRÄGE",
    title: "Beiträge",
    intro: "Notizen zu Wandel, Führung und Unternehmenskultur.",
    all: "Alle Beiträge",
    read: "Lesen",
    sample: "Beispielinhalt",
    fallback: "Dieser Beitrag ist nur auf Türkisch verfügbar.",
    empty: "Demnächst.",
    back: "Alle Beiträge",
    minutes: "Min. Lesezeit",
  },
  contact: {
    fig: "FIG. 09 — KONTAKT",
    title: ["Brechen wir", "gemeinsam auf."],
    lead: "Lassen Sie uns über den Wandel sprechen, der vor Ihrem Unternehmen liegt. Formular ausfüllen oder direkt Kontakt aufnehmen.",
    form: {
      name: "Name",
      company: "Unternehmen",
      email: "E-Mail",
      message: "Ihre Nachricht",
      send: "Senden",
      sending: "Wird gesendet…",
      sent: "Vielen Dank — wir melden uns in Kürze.",
      error: "Etwas ist schiefgelaufen. Bitte schreiben Sie uns eine E-Mail.",
      mailtoNote: "Mit „Senden“ öffnet sich Ihr E-Mail-Programm.",
      subject: "Nachricht über die Website",
      label: "KONTAKTFORMULAR",
    },
    labels: { email: "E-Mail", phone: "Telefon", address: "Adresse" },
  },
  footer: { contact: "KONTAKT", address: "ADRESSE", rights: "Alle Rechte vorbehalten." },
  compass: { label: "Kompass", sub: "Die Richtung des Wandels" },
};

export const dictionaries: Record<Locale, Dict> = { tr, en, de };
export const getDict = (l: Locale) => dictionaries[l];

export const contact = {
  email: "mehmet.kurma@sisudanismanlik.com",
  phone: "+90 533 242 90 66",
  phoneHref: "tel:+905332429066",
  address: "Sıracevizler Cad. 57/9, Şişli, İstanbul 34381",
  mapHref: "https://maps.google.com/?q=Sıracevizler+Caddesi+57,+Şişli,+İstanbul",
  linkedin: "https://www.linkedin.com/in/mehmet-kurma-9165497a",
  // Paste a Formspree (or similar) endpoint here to receive form submissions directly.
  // While empty, the form opens the visitor's email app with the message pre-filled.
  formEndpoint: "",
};
