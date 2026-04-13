const revealNodes = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.2,
    rootMargin: "0px 0px -10% 0px",
  }
);

revealNodes.forEach((node) => observer.observe(node));

const STORAGE_KEY = "evalauncher.locale";
const FALLBACK_LOCALE = "en";
const RTL_LOCALES = new Set(["ar"]);

const supportedLanguages = [
  { code: "en", label: "English" },
  { code: "zh-CN", label: "简体中文" },
  { code: "zh-TW", label: "繁體中文" },
  { code: "es", label: "Espanol" },
  { code: "pt-BR", label: "Portugues (Brasil)" },
  { code: "fr", label: "Francais" },
  { code: "de", label: "Deutsch" },
  { code: "ru", label: "Русский" },
  { code: "ja", label: "日本語" },
  { code: "ko", label: "한국어" },
  { code: "ar", label: "العربية" },
  { code: "hi", label: "हिन्दी" },
  { code: "tr", label: "Turkce" },
  { code: "id", label: "Bahasa Indonesia" },
  { code: "it", label: "Italiano" },
];

const localeAliases = {
  en: "en",
  "en-us": "en",
  "en-gb": "en",
  zh: "zh-CN",
  "zh-cn": "zh-CN",
  "zh-sg": "zh-CN",
  "zh-hans": "zh-CN",
  "zh-tw": "zh-TW",
  "zh-hk": "zh-TW",
  "zh-mo": "zh-TW",
  "zh-hant": "zh-TW",
  es: "es",
  "es-es": "es",
  "es-mx": "es",
  "es-419": "es",
  pt: "pt-BR",
  "pt-br": "pt-BR",
  "pt-pt": "pt-BR",
  fr: "fr",
  de: "de",
  ru: "ru",
  ja: "ja",
  ko: "ko",
  ar: "ar",
  hi: "hi",
  tr: "tr",
  id: "id",
  it: "it",
};

const baseTranslations = {
  "meta.title": "EvaLauncher | Character-First Android Launcher",
  "meta.description": "EvaLauncher is a character-first Android launcher with a floating action hub, searchable app drawer, and privacy-aware settings.",
  "brand.ariaLabel": "EvaLauncher home",
  "nav.ariaLabel": "Primary",
  "nav.features": "Features",
  "nav.gallery": "Screens",
  "nav.details": "Details",
  "language.label": "Language",
  "language.selectAria": "Language selector",
  "hero.eyebrow": "Official Global Site",
  "hero.title": "Turn your Android home screen into a living launcher.",
  "hero.lede": "EvaLauncher blends a Live2D companion, a floating quick-action hub, and an organized app drawer into one focused Android experience.",
  "hero.ctaPrimary": "See the interface",
  "hero.ctaSecondary": "Explore features",
  "hero.statsLabel": "Key highlights",
  "hero.stats.live2d.title": "Live2D",
  "hero.stats.live2d.body": "Animated character home",
  "hero.stats.hub.title": "Floating Hub",
  "hero.stats.hub.body": "One-tap actions and drawer access",
  "hero.stats.drawer.title": "Drawer Tools",
  "hero.stats.drawer.body": "Search, history, and folder organization",
  "hero.visualLabel": "Captured from emulator",
  "hero.visualAltMain": "EvaLauncher home screen with Live2D companion and floating launcher button",
  "hero.visualAltAccent": "EvaLauncher floating menu opened on the home screen",
  "features.eyebrow": "What makes it different",
  "features.title": "Built around presence, speed, and control.",
  "features.cards.home.title": "Character-first home",
  "features.cards.home.body": "The launcher opens on a stage-like home screen anchored by a Live2D companion, giving the interface more personality than a standard icon wall.",
  "features.cards.hub.title": "Floating action hub",
  "features.cards.hub.body": "A movable action button expands into quick shortcuts for settings, phone, messaging, browser, camera, and the app drawer.",
  "features.cards.drawer.title": "Structured app drawer",
  "features.cards.drawer.body": "The drawer supports recent history, search, and folder creation so large app collections stay easy to navigate.",
  "features.cards.settings.title": "Settings with clean boundaries",
  "features.cards.settings.body": "Floating-mode controls, language access, app settings, and the privacy policy are grouped into a dedicated settings flow.",
  "gallery.eyebrow": "Screens captured from a running emulator",
  "gallery.title": "Three surfaces, one launcher flow.",
  "gallery.cards.home.title": "Home",
  "gallery.cards.home.body": "Live2D companion with a clean floating launcher entry.",
  "gallery.cards.home.alt": "EvaLauncher emulator screenshot showing the Live2D home screen",
  "gallery.cards.actions.title": "Quick Actions",
  "gallery.cards.actions.body": "Open core actions from a radial menu without leaving the home screen.",
  "gallery.cards.actions.alt": "EvaLauncher emulator screenshot showing the expanded floating quick action menu",
  "gallery.cards.settings.title": "Settings",
  "gallery.cards.settings.body": "Manage floating behavior, language, app settings, and privacy access.",
  "gallery.cards.settings.alt": "EvaLauncher emulator screenshot showing the settings page",
  "details.eyebrow": "Product summary",
  "details.title": "EvaLauncher is for Android users who want more than a utility shell.",
  "details.body": "It combines a visual mascot layer with a launcher workflow that stays practical: quick entry points, searchable content, folder organization, and a settings surface that exposes permission-sensitive behavior instead of hiding it.",
  "details.items.interaction.title": "Interaction model",
  "details.items.interaction.body": "Live2D home, floating actions, bottom-sheet drawer, and configurable overlay mode.",
  "details.items.utilities.title": "Core utilities",
  "details.items.utilities.body": "Search, launch history, folders, system shortcuts, language access, and privacy handoff.",
  "details.items.design.title": "Design direction",
  "details.items.design.body": "Soft contrast, high legibility, motion-first presence, and a distinct character silhouette.",
};

const localeTranslations = {
  es: {
    "meta.title": "EvaLauncher | Lanzador Android centrado en personajes",
    "meta.description": "EvaLauncher es un lanzador Android centrado en personajes con centro flotante de acciones, cajon de apps con busqueda y ajustes orientados a la privacidad.",
    "nav.features": "Funciones",
    "nav.gallery": "Pantallas",
    "nav.details": "Detalles",
    "language.label": "Idioma",
    "language.selectAria": "Selector de idioma",
    "hero.eyebrow": "Sitio oficial global",
    "hero.title": "Convierte tu pantalla de inicio Android en un lanzador con vida propia.",
    "hero.lede": "EvaLauncher combina un acompanante Live2D, un centro flotante de acciones rapidas y un cajon de apps organizado en una experiencia Android mas enfocada.",
    "hero.ctaPrimary": "Ver la interfaz",
    "hero.ctaSecondary": "Explorar funciones",
    "hero.statsLabel": "Puntos clave",
    "hero.stats.live2d.body": "Inicio animado con personaje",
    "hero.stats.hub.title": "Centro flotante",
    "hero.stats.hub.body": "Acciones y acceso al cajon con un toque",
    "hero.stats.drawer.title": "Herramientas del cajon",
    "hero.stats.drawer.body": "Busqueda, historial y carpetas",
    "hero.visualLabel": "Capturado en emulador",
    "features.eyebrow": "Que lo hace distinto",
    "features.title": "Disenado en torno a presencia, velocidad y control.",
    "features.cards.home.title": "Inicio primero, personaje primero",
    "features.cards.home.body": "El lanzador se abre en una pantalla tipo escenario guiada por un acompanante Live2D, con mas personalidad que una pared comun de iconos.",
    "features.cards.hub.title": "Centro flotante de acciones",
    "features.cards.hub.body": "Un boton movil despliega accesos rapidos a ajustes, telefono, mensajes, navegador, camara y al cajon de apps.",
    "features.cards.drawer.title": "Cajon de apps estructurado",
    "features.cards.drawer.body": "El cajon incluye historial reciente, busqueda y creacion de carpetas para mantener grandes bibliotecas faciles de usar.",
    "features.cards.settings.title": "Ajustes con limites claros",
    "features.cards.settings.body": "Los controles flotantes, el idioma, los ajustes de la app y la politica de privacidad viven en un flujo de ajustes dedicado.",
    "gallery.eyebrow": "Pantallas capturadas desde un emulador en ejecucion",
    "gallery.title": "Tres superficies, un solo flujo de lanzador.",
    "gallery.cards.home.title": "Inicio",
    "gallery.cards.home.body": "Companero Live2D con una entrada flotante limpia al lanzador.",
    "gallery.cards.actions.title": "Acciones rapidas",
    "gallery.cards.actions.body": "Abre acciones esenciales desde un menu radial sin salir de la pantalla principal.",
    "gallery.cards.settings.title": "Ajustes",
    "gallery.cards.settings.body": "Gestiona comportamiento flotante, idioma, ajustes de la app y acceso a privacidad.",
    "details.eyebrow": "Resumen del producto",
    "details.title": "EvaLauncher es para quienes quieren mas que una simple carcasa utilitaria en Android.",
    "details.body": "Combina una capa visual de mascota con un flujo practico de lanzador: accesos rapidos, contenido buscable, organizacion por carpetas y ajustes transparentes ante permisos sensibles.",
    "details.items.interaction.title": "Modelo de interaccion",
    "details.items.interaction.body": "Inicio Live2D, acciones flotantes, cajon inferior y modo superpuesto configurable.",
    "details.items.utilities.title": "Utilidades clave",
    "details.items.utilities.body": "Busqueda, historial de apertura, carpetas, accesos del sistema, idioma y enlace a privacidad.",
    "details.items.design.title": "Direccion de diseno",
    "details.items.design.body": "Contraste suave, alta legibilidad, presencia basada en movimiento y una silueta de personaje distintiva.",
  },
  "pt-BR": {
    "meta.title": "EvaLauncher | Lancador Android centrado em personagem",
    "meta.description": "EvaLauncher e um lancador Android centrado em personagem com hub flutuante, gaveta de apps pesquisavel e configuracoes voltadas a privacidade.",
    "nav.features": "Recursos",
    "nav.gallery": "Telas",
    "nav.details": "Detalhes",
    "language.label": "Idioma",
    "language.selectAria": "Seletor de idioma",
    "hero.eyebrow": "Site oficial global",
    "hero.title": "Transforme sua tela inicial Android em um launcher com presenca viva.",
    "hero.lede": "EvaLauncher combina uma companheira Live2D, um hub flutuante de acoes rapidas e uma gaveta de apps organizada em uma experiencia Android mais focada.",
    "hero.ctaPrimary": "Ver a interface",
    "hero.ctaSecondary": "Explorar recursos",
    "hero.statsLabel": "Destaques principais",
    "hero.stats.live2d.body": "Tela inicial animada com personagem",
    "hero.stats.hub.title": "Hub flutuante",
    "hero.stats.hub.body": "Acoes e acesso a gaveta com um toque",
    "hero.stats.drawer.title": "Ferramentas da gaveta",
    "hero.stats.drawer.body": "Busca, historico e pastas",
    "hero.visualLabel": "Capturado no emulador",
    "features.eyebrow": "O que torna diferente",
    "features.title": "Construido em torno de presenca, velocidade e controle.",
    "features.cards.home.title": "Tela inicial centrada no personagem",
    "features.cards.home.body": "O launcher abre em uma tela com clima de palco ancorada por uma companheira Live2D, com mais personalidade do que uma parede comum de icones.",
    "features.cards.hub.title": "Hub flutuante de acoes",
    "features.cards.hub.body": "Um botao movel abre atalhos para configuracoes, telefone, mensagens, navegador, camera e gaveta de apps.",
    "features.cards.drawer.title": "Gaveta de apps estruturada",
    "features.cards.drawer.body": "A gaveta oferece historico recente, busca e criacao de pastas para manter colecoes grandes faceis de navegar.",
    "features.cards.settings.title": "Configuracoes com limites claros",
    "features.cards.settings.body": "Controles do modo flutuante, idioma, ajustes do app e politica de privacidade ficam em um fluxo dedicado de configuracoes.",
    "gallery.eyebrow": "Telas capturadas em um emulador em execucao",
    "gallery.title": "Tres superficies, um unico fluxo de launcher.",
    "gallery.cards.home.title": "Inicio",
    "gallery.cards.home.body": "Companheira Live2D com uma entrada flutuante limpa para o launcher.",
    "gallery.cards.actions.title": "Acoes rapidas",
    "gallery.cards.actions.body": "Abra acoes centrais por um menu radial sem sair da tela inicial.",
    "gallery.cards.settings.title": "Configuracoes",
    "gallery.cards.settings.body": "Gerencie comportamento flutuante, idioma, ajustes do app e acesso a privacidade.",
    "details.eyebrow": "Resumo do produto",
    "details.title": "EvaLauncher e para usuarios Android que querem mais do que uma casca utilitaria.",
    "details.body": "Ele combina uma camada visual de mascote com um fluxo pratico de launcher: atalhos rapidos, conteudo pesquisavel, organizacao por pastas e uma area de ajustes transparente para comportamentos sensiveis a permissoes.",
    "details.items.interaction.title": "Modelo de interacao",
    "details.items.interaction.body": "Tela Live2D, acoes flutuantes, gaveta em folha inferior e modo de sobreposicao configuravel.",
    "details.items.utilities.title": "Utilidades principais",
    "details.items.utilities.body": "Busca, historico de abertura, pastas, atalhos do sistema, idioma e atalho para privacidade.",
    "details.items.design.title": "Direcao de design",
    "details.items.design.body": "Contraste suave, alta legibilidade, presenca guiada por movimento e uma silhueta de personagem marcante.",
  },
  fr: {
    "meta.title": "EvaLauncher | Lanceur Android centre sur le personnage",
    "meta.description": "EvaLauncher est un lanceur Android centre sur le personnage, avec hub flottant, tiroir d'apps avec recherche et reglages penses pour la confidentialite.",
    "nav.features": "Fonctions",
    "nav.gallery": "Ecrans",
    "nav.details": "Details",
    "language.label": "Langue",
    "language.selectAria": "Selecteur de langue",
    "hero.eyebrow": "Site officiel mondial",
    "hero.title": "Transformez votre ecran d'accueil Android en lanceur vivant.",
    "hero.lede": "EvaLauncher reunit un compagnon Live2D, un hub flottant d'actions rapides et un tiroir d'apps organise dans une experience Android plus coherente.",
    "hero.ctaPrimary": "Voir l'interface",
    "hero.ctaSecondary": "Explorer les fonctions",
    "hero.statsLabel": "Points cles",
    "hero.stats.live2d.body": "Accueil anime avec personnage",
    "hero.stats.hub.title": "Hub flottant",
    "hero.stats.hub.body": "Actions et acces au tiroir en un geste",
    "hero.stats.drawer.title": "Outils du tiroir",
    "hero.stats.drawer.body": "Recherche, historique et dossiers",
    "hero.visualLabel": "Capture sur emulateur",
    "features.eyebrow": "Ce qui le distingue",
    "features.title": "Pense autour de la presence, de la vitesse et du controle.",
    "features.cards.home.title": "Accueil centre sur le personnage",
    "features.cards.home.body": "Le lanceur s'ouvre sur un ecran facon scene anime par un compagnon Live2D, plus expressif qu'un simple mur d'icones.",
    "features.cards.hub.title": "Hub flottant d'actions",
    "features.cards.hub.body": "Un bouton mobile deploye des raccourcis vers les reglages, le telephone, les messages, le navigateur, l'appareil photo et le tiroir d'apps.",
    "features.cards.drawer.title": "Tiroir d'apps structure",
    "features.cards.drawer.body": "Le tiroir prend en charge l'historique recent, la recherche et la creation de dossiers pour garder de grandes bibliotheques faciles a parcourir.",
    "features.cards.settings.title": "Reglages aux frontieres claires",
    "features.cards.settings.body": "Les controles flottants, la langue, les reglages de l'app et la politique de confidentialite sont reunis dans un flux dedie.",
    "gallery.eyebrow": "Ecrans captures depuis un emulateur en cours d'execution",
    "gallery.title": "Trois surfaces, un seul parcours de lanceur.",
    "gallery.cards.home.title": "Accueil",
    "gallery.cards.home.body": "Compagnon Live2D avec une entree flottante vers le lanceur.",
    "gallery.cards.actions.title": "Actions rapides",
    "gallery.cards.actions.body": "Ouvrez les actions cles depuis un menu radial sans quitter l'ecran d'accueil.",
    "gallery.cards.settings.title": "Reglages",
    "gallery.cards.settings.body": "Gerez le comportement flottant, la langue, les reglages de l'app et l'acces a la confidentialite.",
    "details.eyebrow": "Resume produit",
    "details.title": "EvaLauncher s'adresse aux utilisateurs Android qui veulent plus qu'une simple coque utilitaire.",
    "details.body": "Il combine une couche visuelle de mascotte avec un flux de lanceur pratique: points d'acces rapides, contenu recherchable, organisation en dossiers et reglages transparents pour les comportements sensibles aux permissions.",
    "details.items.interaction.title": "Modele d'interaction",
    "details.items.interaction.body": "Accueil Live2D, actions flottantes, tiroir en feuille basse et mode superposition configurable.",
    "details.items.utilities.title": "Utilitaires cles",
    "details.items.utilities.body": "Recherche, historique de lancement, dossiers, raccourcis systeme, acces a la langue et passerelle confidentialite.",
    "details.items.design.title": "Direction visuelle",
    "details.items.design.body": "Contraste doux, grande lisibilite, presence portee par le mouvement et silhouette de personnage marquante.",
  },
  de: {
    "meta.title": "EvaLauncher | Charakterorientierter Android-Launcher",
    "meta.description": "EvaLauncher ist ein charakterorientierter Android-Launcher mit schwebendem Aktionshub, durchsuchbarer App-Schublade und datenschutzbewussten Einstellungen.",
    "nav.features": "Funktionen",
    "nav.gallery": "Ansichten",
    "nav.details": "Details",
    "language.label": "Sprache",
    "language.selectAria": "Sprachauswahl",
    "hero.eyebrow": "Globale offizielle Website",
    "hero.title": "Verwandle deinen Android-Startbildschirm in einen Launcher mit echter Praesenz.",
    "hero.lede": "EvaLauncher verbindet einen Live2D-Begleiter, einen schwebenden Schnellaktions-Hub und eine organisierte App-Schublade zu einem fokussierten Android-Erlebnis.",
    "hero.ctaPrimary": "Oberflaeche ansehen",
    "hero.ctaSecondary": "Funktionen entdecken",
    "hero.statsLabel": "Wichtigste Highlights",
    "hero.stats.live2d.body": "Animierter Startbildschirm mit Figur",
    "hero.stats.hub.title": "Schwebender Hub",
    "hero.stats.hub.body": "Aktionen und Schubladenzugriff mit einem Tipp",
    "hero.stats.drawer.title": "Schubladen-Werkzeuge",
    "hero.stats.drawer.body": "Suche, Verlauf und Ordnerorganisation",
    "hero.visualLabel": "Im Emulator aufgenommen",
    "features.eyebrow": "Was ihn besonders macht",
    "features.title": "Gebaut fuer Praesenz, Tempo und Kontrolle.",
    "features.cards.home.title": "Charakterzentrierter Startbildschirm",
    "features.cards.home.body": "Der Launcher startet auf einer buehnenartigen Oberflaeche mit einem Live2D-Begleiter und wirkt damit persoenlicher als eine gewoehnliche Icon-Wand.",
    "features.cards.hub.title": "Schwebender Aktionshub",
    "features.cards.hub.body": "Ein beweglicher Button oeffnet Schnellzugriffe fuer Einstellungen, Telefon, Nachrichten, Browser, Kamera und die App-Schublade.",
    "features.cards.drawer.title": "Strukturierte App-Schublade",
    "features.cards.drawer.body": "Die Schublade bietet letzten Verlauf, Suche und Ordnererstellung, damit grosse App-Sammlungen uebersichtlich bleiben.",
    "features.cards.settings.title": "Einstellungen mit klaren Grenzen",
    "features.cards.settings.body": "Schwebemodus, Sprachzugang, App-Einstellungen und Datenschutzrichtlinie sind in einem eigenen Einstellungsfluss gebuendelt.",
    "gallery.eyebrow": "Aufnahmen aus einem laufenden Emulator",
    "gallery.title": "Drei Oberflaechen, ein Launcher-Ablauf.",
    "gallery.cards.home.title": "Startseite",
    "gallery.cards.home.body": "Live2D-Begleiter mit einem sauberen schwebenden Launcher-Einstieg.",
    "gallery.cards.actions.title": "Schnellaktionen",
    "gallery.cards.actions.body": "Oeffne zentrale Aktionen aus einem radialen Menue, ohne den Startbildschirm zu verlassen.",
    "gallery.cards.settings.title": "Einstellungen",
    "gallery.cards.settings.body": "Verwalte Schwebeverhalten, Sprache, App-Einstellungen und Datenschutz-Zugriff.",
    "details.eyebrow": "Produktueberblick",
    "details.title": "EvaLauncher ist fuer Android-Nutzer gedacht, die mehr als nur eine funktionale Huelle wollen.",
    "details.body": "Er kombiniert eine visuelle Maskottchen-Ebene mit einem praktischen Launcher-Ablauf: schnelle Zugaenge, durchsuchbare Inhalte, Ordnerorganisation und transparente Einstellungen fuer berechtigungssensible Funktionen.",
    "details.items.interaction.title": "Interaktionsmodell",
    "details.items.interaction.body": "Live2D-Startseite, schwebende Aktionen, Bottom-Sheet-Schublade und konfigurierbarer Overlay-Modus.",
    "details.items.utilities.title": "Kernfunktionen",
    "details.items.utilities.body": "Suche, Startverlauf, Ordner, System-Shortcuts, Sprachzugang und Datenschutz-Weiterleitung.",
    "details.items.design.title": "Gestaltungsrichtung",
    "details.items.design.body": "Sanfter Kontrast, hohe Lesbarkeit, bewegungsgetragene Praesenz und eine markante Charaktersilhouette.",
  },
  tr: {
    "meta.title": "EvaLauncher | Karakter odakli Android baslatici",
    "meta.description": "EvaLauncher; yuzen islem merkezi, aranabilir uygulama cekmecesi ve gizlilik odakli ayarlari olan karakter odakli bir Android baslaticidir.",
    "nav.features": "Ozellikler",
    "nav.gallery": "Ekranlar",
    "nav.details": "Detaylar",
    "language.label": "Dil",
    "language.selectAria": "Dil secici",
    "hero.eyebrow": "Kuresel resmi site",
    "hero.title": "Android ana ekranini yasayan bir baslaticiya donustur.",
    "hero.lede": "EvaLauncher, bir Live2D yoldasi, yuzen hizli islem merkezi ve duzenli bir uygulama cekmecesini daha odakli bir Android deneyiminde birlestirir.",
    "hero.ctaPrimary": "Arayuzu gor",
    "hero.ctaSecondary": "Ozellikleri kesfet",
    "hero.statsLabel": "One cikanlar",
    "hero.stats.live2d.body": "Animasyonlu karakter ana ekrani",
    "hero.stats.hub.title": "Yuzen merkez",
    "hero.stats.hub.body": "Tek dokunusla islem ve cekmece erisimi",
    "hero.stats.drawer.title": "Cekmece araclari",
    "hero.stats.drawer.body": "Arama, gecmis ve klasor duzeni",
    "hero.visualLabel": "Emulatorden alindi",
    "features.eyebrow": "Onu farkli yapan sey",
    "features.title": "Varlik, hiz ve kontrol etrafinda tasarlandi.",
    "features.cards.home.title": "Karakter oncelikli ana ekran",
    "features.cards.home.body": "Baslatici, merkezinde Live2D yoldasi bulunan sahne hissi veren bir ana ekranla acilir ve siradan ikon duvarindan daha fazla kisilik sunar.",
    "features.cards.hub.title": "Yuzen islem merkezi",
    "features.cards.hub.body": "Hareket ettirilebilen bir dugme; ayarlar, telefon, mesajlar, tarayici, kamera ve uygulama cekmecesi icin hizli kisayollar acar.",
    "features.cards.drawer.title": "Yapilandirilmis uygulama cekmecesi",
    "features.cards.drawer.body": "Cekmece; son kullanilanlar, arama ve klasor olusturmayi destekler, boylece buyuk koleksiyonlar kolay kalir.",
    "features.cards.settings.title": "Sinirlari net ayarlar",
    "features.cards.settings.body": "Yuzen mod kontrolleri, dil, uygulama ayarlari ve gizlilik politikasi tek bir ayar akisinda toplanir.",
    "gallery.eyebrow": "Calisan emulatorden alinan ekranlar",
    "gallery.title": "Uc yuzey, tek bir baslatici akisi.",
    "gallery.cards.home.title": "Ana ekran",
    "gallery.cards.home.body": "Temiz bir yuzen girise sahip Live2D yoldasi.",
    "gallery.cards.actions.title": "Hizli islemler",
    "gallery.cards.actions.body": "Ana ekrandan ayrilmadan radyal menuden temel islemleri acin.",
    "gallery.cards.settings.title": "Ayarlar",
    "gallery.cards.settings.body": "Yuzen davranisi, dili, uygulama ayarlarini ve gizlilik erisimini yonetin.",
    "details.eyebrow": "Urun ozeti",
    "details.title": "EvaLauncher, yalnizca islevsel bir kabuktan fazlasini isteyen Android kullanicilari icindir.",
    "details.body": "Gorsel maskot katmanini pratik bir baslatici akisiyla birlestirir: hizli giris noktalari, aranabilir icerik, klasor duzeni ve izin hassas davranislari gizlemeyen ayarlar.",
    "details.items.interaction.title": "Etkilesim modeli",
    "details.items.interaction.body": "Live2D ana ekrani, yuzen islemler, alt sayfa cekmecesi ve yapilandirilabilir katman modu.",
    "details.items.utilities.title": "Temel araclar",
    "details.items.utilities.body": "Arama, acilis gecmisi, klasorler, sistem kisayollari, dil erisimi ve gizlilik gecisi.",
    "details.items.design.title": "Tasarim yonu",
    "details.items.design.body": "Yumusak kontrast, yuksek okunabilirlik, hareket odakli varlik ve belirgin karakter silueti.",
  },
  id: {
    "meta.title": "EvaLauncher | Launcher Android berfokus karakter",
    "meta.description": "EvaLauncher adalah launcher Android berfokus karakter dengan hub aksi mengambang, laci aplikasi yang dapat dicari, dan pengaturan yang sadar privasi.",
    "nav.features": "Fitur",
    "nav.gallery": "Layar",
    "nav.details": "Detail",
    "language.label": "Bahasa",
    "language.selectAria": "Pemilih bahasa",
    "hero.eyebrow": "Situs resmi global",
    "hero.title": "Ubah layar utama Android Anda menjadi launcher yang terasa hidup.",
    "hero.lede": "EvaLauncher menggabungkan pendamping Live2D, hub aksi cepat mengambang, dan laci aplikasi yang tertata menjadi pengalaman Android yang lebih fokus.",
    "hero.ctaPrimary": "Lihat antarmuka",
    "hero.ctaSecondary": "Jelajahi fitur",
    "hero.statsLabel": "Sorotan utama",
    "hero.stats.live2d.body": "Beranda karakter animasi",
    "hero.stats.hub.title": "Hub mengambang",
    "hero.stats.hub.body": "Aksi dan akses laci sekali sentuh",
    "hero.stats.drawer.title": "Alat laci",
    "hero.stats.drawer.body": "Pencarian, riwayat, dan folder",
    "hero.visualLabel": "Diambil dari emulator",
    "features.eyebrow": "Apa yang membuatnya berbeda",
    "features.title": "Dibangun di sekitar kehadiran, kecepatan, dan kendali.",
    "features.cards.home.title": "Beranda yang mendahulukan karakter",
    "features.cards.home.body": "Launcher terbuka ke layar bergaya panggung dengan pendamping Live2D sebagai pusatnya, memberi lebih banyak kepribadian daripada dinding ikon biasa.",
    "features.cards.hub.title": "Hub aksi mengambang",
    "features.cards.hub.body": "Sebuah tombol yang dapat dipindah membuka pintasan cepat untuk pengaturan, telepon, pesan, browser, kamera, dan laci aplikasi.",
    "features.cards.drawer.title": "Laci aplikasi terstruktur",
    "features.cards.drawer.body": "Laci mendukung riwayat terbaru, pencarian, dan pembuatan folder agar koleksi aplikasi besar tetap mudah dinavigasi.",
    "features.cards.settings.title": "Pengaturan dengan batas yang jelas",
    "features.cards.settings.body": "Kontrol mode mengambang, bahasa, pengaturan aplikasi, dan kebijakan privasi dikumpulkan dalam satu alur pengaturan khusus.",
    "gallery.eyebrow": "Layar diambil dari emulator yang sedang berjalan",
    "gallery.title": "Tiga permukaan, satu alur launcher.",
    "gallery.cards.home.title": "Beranda",
    "gallery.cards.home.body": "Pendamping Live2D dengan pintu masuk launcher mengambang yang rapi.",
    "gallery.cards.actions.title": "Aksi cepat",
    "gallery.cards.actions.body": "Buka aksi inti dari menu radial tanpa meninggalkan layar utama.",
    "gallery.cards.settings.title": "Pengaturan",
    "gallery.cards.settings.body": "Kelola perilaku mengambang, bahasa, pengaturan aplikasi, dan akses privasi.",
    "details.eyebrow": "Ringkasan produk",
    "details.title": "EvaLauncher untuk pengguna Android yang menginginkan lebih dari sekadar cangkang utilitas.",
    "details.body": "Ia menggabungkan lapisan maskot visual dengan alur launcher yang praktis: pintu masuk cepat, konten yang bisa dicari, organisasi folder, dan layar pengaturan yang terbuka tentang perilaku sensitif izin.",
    "details.items.interaction.title": "Model interaksi",
    "details.items.interaction.body": "Beranda Live2D, aksi mengambang, laci bottom-sheet, dan mode overlay yang dapat diatur.",
    "details.items.utilities.title": "Utilitas inti",
    "details.items.utilities.body": "Pencarian, riwayat peluncuran, folder, pintasan sistem, akses bahasa, dan privasi.",
    "details.items.design.title": "Arah desain",
    "details.items.design.body": "Kontras lembut, keterbacaan tinggi, kehadiran berbasis gerak, dan siluet karakter yang khas.",
  },
  it: {
    "meta.title": "EvaLauncher | Launcher Android incentrato sul personaggio",
    "meta.description": "EvaLauncher e un launcher Android incentrato sul personaggio con hub di azioni flottante, cassetto app ricercabile e impostazioni attente alla privacy.",
    "nav.features": "Funzioni",
    "nav.gallery": "Schermi",
    "nav.details": "Dettagli",
    "language.label": "Lingua",
    "language.selectAria": "Selettore lingua",
    "hero.eyebrow": "Sito ufficiale globale",
    "hero.title": "Trasforma la schermata iniziale Android in un launcher vivo.",
    "hero.lede": "EvaLauncher unisce un compagno Live2D, un hub flottante di azioni rapide e un cassetto app organizzato in un'esperienza Android piu focalizzata.",
    "hero.ctaPrimary": "Guarda l'interfaccia",
    "hero.ctaSecondary": "Esplora le funzioni",
    "hero.statsLabel": "Punti chiave",
    "hero.stats.live2d.body": "Home animata con personaggio",
    "hero.stats.hub.title": "Hub flottante",
    "hero.stats.hub.body": "Azioni e accesso al cassetto con un tocco",
    "hero.stats.drawer.title": "Strumenti del cassetto",
    "hero.stats.drawer.body": "Ricerca, cronologia e cartelle",
    "hero.visualLabel": "Catturato da emulatore",
    "features.eyebrow": "Cosa lo rende diverso",
    "features.title": "Progettato intorno a presenza, velocita e controllo.",
    "features.cards.home.title": "Home con il personaggio al centro",
    "features.cards.home.body": "Il launcher si apre su una schermata in stile palco guidata da un compagno Live2D, con piu personalita rispetto a una normale griglia di icone.",
    "features.cards.hub.title": "Hub flottante di azioni",
    "features.cards.hub.body": "Un pulsante mobile apre scorciatoie rapide per impostazioni, telefono, messaggi, browser, fotocamera e cassetto app.",
    "features.cards.drawer.title": "Cassetto app strutturato",
    "features.cards.drawer.body": "Il cassetto supporta cronologia recente, ricerca e creazione di cartelle per mantenere facile la navigazione anche con molte app.",
    "features.cards.settings.title": "Impostazioni con confini chiari",
    "features.cards.settings.body": "Controlli della modalita flottante, lingua, impostazioni app e politica sulla privacy sono raccolti in un flusso dedicato.",
    "gallery.eyebrow": "Schermate catturate da un emulatore in esecuzione",
    "gallery.title": "Tre superfici, un solo flusso launcher.",
    "gallery.cards.home.title": "Home",
    "gallery.cards.home.body": "Compagno Live2D con un ingresso flottante pulito al launcher.",
    "gallery.cards.actions.title": "Azioni rapide",
    "gallery.cards.actions.body": "Apri le azioni principali da un menu radiale senza lasciare la schermata principale.",
    "gallery.cards.settings.title": "Impostazioni",
    "gallery.cards.settings.body": "Gestisci comportamento flottante, lingua, impostazioni app e accesso alla privacy.",
    "details.eyebrow": "Sintesi del prodotto",
    "details.title": "EvaLauncher e pensato per utenti Android che vogliono piu di una semplice shell utilitaria.",
    "details.body": "Combina un livello visivo da mascotte con un flusso launcher pratico: accessi rapidi, contenuti ricercabili, organizzazione in cartelle e impostazioni trasparenti per i comportamenti sensibili ai permessi.",
    "details.items.interaction.title": "Modello di interazione",
    "details.items.interaction.body": "Home Live2D, azioni flottanti, cassetto bottom-sheet e modalita overlay configurabile.",
    "details.items.utilities.title": "Utility principali",
    "details.items.utilities.body": "Ricerca, cronologia di avvio, cartelle, scorciatoie di sistema, accesso lingua e privacy.",
    "details.items.design.title": "Direzione del design",
    "details.items.design.body": "Contrasto morbido, alta leggibilita, presenza guidata dal movimento e una silhouette del personaggio distintiva.",
  },
};

Object.assign(localeTranslations, {
  "zh-CN": {
    "meta.title": "EvaLauncher | 角色驱动的 Android 启动器",
    "meta.description": "EvaLauncher 是一款以角色体验为核心的 Android 启动器，集成悬浮快捷中心、可搜索应用抽屉和重视隐私的设置。",
    "nav.features": "功能",
    "nav.gallery": "界面",
    "nav.details": "详情",
    "language.label": "语言",
    "language.selectAria": "语言选择器",
    "hero.eyebrow": "全球官方站点",
    "hero.title": "把你的 Android 主屏变成真正有生命感的启动器。",
    "hero.lede": "EvaLauncher 将 Live2D 伙伴、悬浮快捷中心和有组织的应用抽屉融合成一个更专注的 Android 体验。",
    "hero.ctaPrimary": "查看界面",
    "hero.ctaSecondary": "浏览功能",
    "hero.statsLabel": "核心亮点",
    "features.eyebrow": "差异化亮点",
    "features.title": "围绕存在感、速度与掌控力打造。",
    "gallery.eyebrow": "来自运行中模拟器的截图",
    "gallery.title": "三个界面，串成一个启动器流程。",
    "details.eyebrow": "产品摘要",
    "details.title": "EvaLauncher 面向不满足于工具外壳的 Android 用户。"
  },
  "zh-TW": {
    "meta.title": "EvaLauncher | 角色導向的 Android 啟動器",
    "meta.description": "EvaLauncher 是一款以角色體驗為核心的 Android 啟動器，結合懸浮快捷中心、可搜尋的應用抽屜與重視隱私的設定。",
    "nav.features": "功能",
    "nav.gallery": "畫面",
    "nav.details": "詳情",
    "language.label": "語言",
    "language.selectAria": "語言選擇器",
    "hero.eyebrow": "全球官方網站",
    "hero.title": "把你的 Android 主畫面變成真正有生命感的啟動器。",
    "hero.lede": "EvaLauncher 將 Live2D 夥伴、懸浮快捷中心與有條理的應用抽屜整合成更專注的 Android 體驗。",
    "hero.ctaPrimary": "查看介面",
    "hero.ctaSecondary": "探索功能",
    "hero.statsLabel": "核心亮點",
    "features.eyebrow": "與眾不同之處",
    "features.title": "圍繞存在感、速度與掌控感打造。",
    "gallery.eyebrow": "來自運行中模擬器的截圖",
    "gallery.title": "三個介面，串成同一個啟動流程。",
    "details.eyebrow": "產品摘要",
    "details.title": "EvaLauncher 適合想要超越工具外殼的 Android 使用者。"
  },
  ru: {
    "meta.title": "EvaLauncher | Персонажный лаунчер для Android",
    "meta.description": "EvaLauncher — это Android-лаунчер с акцентом на персонажа, плавающим центром действий, поиском по списку приложений и настройками с упором на приватность.",
    "nav.features": "Возможности",
    "nav.gallery": "Экраны",
    "nav.details": "Детали",
    "language.label": "Язык",
    "language.selectAria": "Выбор языка",
    "hero.eyebrow": "Глобальный официальный сайт",
    "hero.title": "Превратите главный экран Android в лаунчер с живым присутствием.",
    "hero.lede": "EvaLauncher объединяет спутника Live2D, плавающий центр быстрых действий и организованный список приложений в более цельный Android-опыт.",
    "hero.ctaPrimary": "Посмотреть интерфейс",
    "hero.ctaSecondary": "Изучить возможности",
    "hero.statsLabel": "Ключевые преимущества",
    "features.eyebrow": "Что делает его особенным",
    "features.title": "Создан вокруг присутствия, скорости и контроля.",
    "gallery.eyebrow": "Скриншоты из работающего эмулятора",
    "gallery.title": "Три поверхности, один сценарий лаунчера.",
    "details.eyebrow": "Кратко о продукте",
    "details.title": "EvaLauncher создан для тех, кто хочет от Android большего, чем просто утилитарную оболочку."
  }
});

Object.assign(localeTranslations, {
  ja: {
    "meta.title": "EvaLauncher | キャラクター中心のAndroidランチャー",
    "meta.description": "EvaLauncher は、フローティング操作ハブ、検索可能なアプリドロワー、プライバシー重視の設定を備えたキャラクター中心の Android ランチャーです。",
    "nav.features": "機能",
    "nav.gallery": "画面",
    "nav.details": "詳細",
    "language.label": "言語",
    "language.selectAria": "言語セレクター",
    "hero.eyebrow": "グローバル公式サイト",
    "hero.title": "Android のホーム画面を、生きた存在感のあるランチャーへ。",
    "hero.lede": "EvaLauncher は Live2D の相棒、フローティングクイックアクションハブ、整理されたアプリドロワーを組み合わせ、より集中した Android 体験を作ります。",
    "hero.ctaPrimary": "画面を見る",
    "hero.ctaSecondary": "機能を見る",
    "hero.statsLabel": "主な特長",
    "features.eyebrow": "違いを生むポイント",
    "features.title": "存在感、速さ、操作性を軸に設計。",
    "gallery.eyebrow": "動作中のエミュレーターから撮影した画面",
    "gallery.title": "3つの画面が、1つのランチャーフローになる。",
    "details.eyebrow": "製品概要",
    "details.title": "EvaLauncher は、単なる実用シェル以上を求める Android ユーザーのためのランチャーです。"
  },
  ko: {
    "meta.title": "EvaLauncher | 캐릭터 중심 Android 런처",
    "meta.description": "EvaLauncher는 플로팅 액션 허브, 검색 가능한 앱 서랍, 프라이버시 중심 설정을 갖춘 캐릭터 중심 Android 런처입니다.",
    "nav.features": "기능",
    "nav.gallery": "화면",
    "nav.details": "상세",
    "language.label": "언어",
    "language.selectAria": "언어 선택기",
    "hero.eyebrow": "글로벌 공식 사이트",
    "hero.title": "Android 홈 화면을 살아 있는 런처로 바꾸세요.",
    "hero.lede": "EvaLauncher는 Live2D 동반자, 플로팅 빠른 작업 허브, 정리된 앱 서랍을 하나의 집중된 Android 경험으로 묶습니다.",
    "hero.ctaPrimary": "인터페이스 보기",
    "hero.ctaSecondary": "기능 살펴보기",
    "hero.statsLabel": "핵심 포인트",
    "features.eyebrow": "무엇이 다른가",
    "features.title": "존재감, 속도, 제어감을 중심으로 설계했습니다.",
    "gallery.eyebrow": "실행 중인 에뮬레이터에서 캡처한 화면",
    "gallery.title": "세 개의 화면, 하나의 런처 흐름.",
    "details.eyebrow": "제품 요약",
    "details.title": "EvaLauncher는 단순한 유틸리티 셸 이상을 원하는 Android 사용자를 위한 런처입니다."
  },
  ar: {
    "meta.title": "EvaLauncher | مشغّل أندرويد يضع الشخصية في المركز",
    "meta.description": "EvaLauncher هو مشغّل أندرويد يتمحور حول الشخصية مع مركز إجراءات عائم ودرج تطبيقات قابل للبحث وإعدادات تراعي الخصوصية.",
    "nav.features": "المزايا",
    "nav.gallery": "الواجهات",
    "nav.details": "التفاصيل",
    "language.label": "اللغة",
    "language.selectAria": "محدد اللغة",
    "hero.eyebrow": "الموقع الرسمي العالمي",
    "hero.title": "حوّل شاشة Android الرئيسية إلى مشغّل نابض بالحياة.",
    "hero.lede": "يجمع EvaLauncher بين رفيق Live2D ومركز إجراءات سريع عائم ودرج تطبيقات منظم في تجربة Android أكثر تركيزًا.",
    "hero.ctaPrimary": "استعرض الواجهة",
    "hero.ctaSecondary": "اكتشف المزايا",
    "hero.statsLabel": "أبرز النقاط",
    "features.eyebrow": "ما الذي يميّزه",
    "features.title": "مصمم حول الحضور والسرعة والتحكم.",
    "gallery.eyebrow": "لقطات من محاكي قيد التشغيل",
    "gallery.title": "ثلاث واجهات ضمن تدفق مشغّل واحد.",
    "details.eyebrow": "ملخص المنتج",
    "details.title": "EvaLauncher موجّه لمستخدمي Android الذين يريدون أكثر من واجهة utilitarian بسيطة."
  },
  hi: {
    "meta.title": "EvaLauncher | कैरेक्टर-केंद्रित Android लॉन्चर",
    "meta.description": "EvaLauncher एक कैरेक्टर-केंद्रित Android लॉन्चर है, जिसमें फ्लोटिंग एक्शन हब, खोज योग्य ऐप ड्रॉअर और प्राइवेसी-फोकस सेटिंग्स हैं।",
    "nav.features": "फ़ीचर",
    "nav.gallery": "स्क्रीन",
    "nav.details": "विवरण",
    "language.label": "भाषा",
    "language.selectAria": "भाषा चयन",
    "hero.eyebrow": "वैश्विक आधिकारिक साइट",
    "hero.title": "अपने Android होम स्क्रीन को एक जीवंत लॉन्चर में बदलें।",
    "hero.lede": "EvaLauncher, Live2D साथी, फ्लोटिंग क्विक-एक्शन हब और सुव्यवस्थित ऐप ड्रॉअर को एक केंद्रित Android अनुभव में जोड़ता है।",
    "hero.ctaPrimary": "इंटरफ़ेस देखें",
    "hero.ctaSecondary": "फ़ीचर देखें",
    "hero.statsLabel": "मुख्य खासियतें",
    "features.eyebrow": "इसे अलग क्या बनाता है",
    "features.title": "प्रेज़ेन्स, स्पीड और कंट्रोल के आसपास बनाया गया।",
    "gallery.eyebrow": "चल रहे इम्युलेटर से ली गई स्क्रीन",
    "gallery.title": "तीन सतहें, एक लॉन्चर फ्लो।",
    "details.eyebrow": "उत्पाद सारांश",
    "details.title": "EvaLauncher उन Android उपयोगकर्ताओं के लिए है जो सिर्फ उपयोगितावादी शेल से अधिक चाहते हैं।"
  }
});

Object.assign(localeTranslations.es, {
  "brand.ariaLabel": "Inicio de EvaLauncher",
  "nav.ariaLabel": "Navegacion principal",
  "hero.stats.live2d.title": "Live2D",
  "hero.visualAltMain": "Pantalla principal de EvaLauncher con companera Live2D y boton flotante del launcher",
  "hero.visualAltAccent": "Menu flotante de EvaLauncher abierto en la pantalla principal",
  "gallery.cards.home.alt": "Captura del emulador de EvaLauncher mostrando la pantalla principal Live2D",
  "gallery.cards.actions.alt": "Captura del emulador de EvaLauncher mostrando el menu flotante expandido de acciones rapidas",
  "gallery.cards.settings.alt": "Captura del emulador de EvaLauncher mostrando la pagina de ajustes"
});

Object.assign(localeTranslations["pt-BR"], {
  "brand.ariaLabel": "Pagina inicial do EvaLauncher",
  "nav.ariaLabel": "Navegacao principal",
  "hero.stats.live2d.title": "Live2D",
  "hero.visualAltMain": "Tela inicial do EvaLauncher com companheira Live2D e botao flutuante do launcher",
  "hero.visualAltAccent": "Menu flutuante do EvaLauncher aberto na tela inicial",
  "gallery.cards.home.alt": "Captura do emulador do EvaLauncher mostrando a tela inicial Live2D",
  "gallery.cards.actions.alt": "Captura do emulador do EvaLauncher mostrando o menu flutuante expandido de acoes rapidas",
  "gallery.cards.settings.alt": "Captura do emulador do EvaLauncher mostrando a pagina de configuracoes"
});

Object.assign(localeTranslations.fr, {
  "brand.ariaLabel": "Accueil EvaLauncher",
  "nav.ariaLabel": "Navigation principale",
  "hero.stats.live2d.title": "Live2D",
  "hero.visualAltMain": "Ecran d'accueil EvaLauncher avec compagnon Live2D et bouton flottant du lanceur",
  "hero.visualAltAccent": "Menu flottant EvaLauncher ouvert sur l'ecran d'accueil",
  "gallery.cards.home.alt": "Capture de l'emulateur EvaLauncher montrant l'ecran d'accueil Live2D",
  "gallery.cards.actions.alt": "Capture de l'emulateur EvaLauncher montrant le menu flottant d'actions rapides ouvert",
  "gallery.cards.settings.alt": "Capture de l'emulateur EvaLauncher montrant la page des reglages"
});

Object.assign(localeTranslations.de, {
  "brand.ariaLabel": "EvaLauncher Startseite",
  "nav.ariaLabel": "Hauptnavigation",
  "hero.stats.live2d.title": "Live2D",
  "hero.visualAltMain": "EvaLauncher-Startbildschirm mit Live2D-Begleiter und schwebender Launcher-Schaltflaeche",
  "hero.visualAltAccent": "Geoeffnetes schwebendes EvaLauncher-Menue auf dem Startbildschirm",
  "gallery.cards.home.alt": "Emulatoraufnahme von EvaLauncher mit dem Live2D-Startbildschirm",
  "gallery.cards.actions.alt": "Emulatoraufnahme von EvaLauncher mit geoeffnetem Schnellaktionsmenue",
  "gallery.cards.settings.alt": "Emulatoraufnahme von EvaLauncher mit der Einstellungsseite"
});

Object.assign(localeTranslations.tr, {
  "brand.ariaLabel": "EvaLauncher ana sayfa",
  "nav.ariaLabel": "Ana gezinme",
  "hero.stats.live2d.title": "Live2D",
  "hero.visualAltMain": "Live2D yoldasi ve yuzen launcher dugmesiyle EvaLauncher ana ekrani",
  "hero.visualAltAccent": "Ana ekranda acilmis EvaLauncher yuzen menusu",
  "gallery.cards.home.alt": "Live2D ana ekranini gosteren EvaLauncher emulator goruntusu",
  "gallery.cards.actions.alt": "Genislemis hizli islem menusu gosteren EvaLauncher emulator goruntusu",
  "gallery.cards.settings.alt": "Ayarlar sayfasini gosteren EvaLauncher emulator goruntusu"
});

Object.assign(localeTranslations.id, {
  "brand.ariaLabel": "Beranda EvaLauncher",
  "nav.ariaLabel": "Navigasi utama",
  "hero.stats.live2d.title": "Live2D",
  "hero.visualAltMain": "Layar utama EvaLauncher dengan pendamping Live2D dan tombol launcher mengambang",
  "hero.visualAltAccent": "Menu mengambang EvaLauncher terbuka di layar utama",
  "gallery.cards.home.alt": "Cuplikan emulator EvaLauncher yang menampilkan layar utama Live2D",
  "gallery.cards.actions.alt": "Cuplikan emulator EvaLauncher yang menampilkan menu aksi cepat mengambang yang terbuka",
  "gallery.cards.settings.alt": "Cuplikan emulator EvaLauncher yang menampilkan halaman pengaturan"
});

Object.assign(localeTranslations.it, {
  "brand.ariaLabel": "Home di EvaLauncher",
  "nav.ariaLabel": "Navigazione principale",
  "hero.stats.live2d.title": "Live2D",
  "hero.visualAltMain": "Schermata iniziale di EvaLauncher con compagno Live2D e pulsante launcher flottante",
  "hero.visualAltAccent": "Menu flottante di EvaLauncher aperto nella schermata iniziale",
  "gallery.cards.home.alt": "Schermata dell'emulatore EvaLauncher con la home Live2D",
  "gallery.cards.actions.alt": "Schermata dell'emulatore EvaLauncher con il menu di azioni rapide espanso",
  "gallery.cards.settings.alt": "Schermata dell'emulatore EvaLauncher con la pagina impostazioni"
});

Object.assign(localeTranslations["zh-CN"], {
  "brand.ariaLabel": "EvaLauncher 首页",
  "nav.ariaLabel": "主导航",
  "hero.stats.live2d.title": "Live2D",
  "hero.stats.live2d.body": "动态角色主屏",
  "hero.stats.hub.title": "悬浮中心",
  "hero.stats.hub.body": "一键操作与抽屉入口",
  "hero.stats.drawer.title": "抽屉工具",
  "hero.stats.drawer.body": "搜索、历史与文件夹整理",
  "hero.visualLabel": "模拟器截图",
  "hero.visualAltMain": "带有 Live2D 伙伴和悬浮启动按钮的 EvaLauncher 主屏",
  "hero.visualAltAccent": "主屏上展开的 EvaLauncher 悬浮菜单",
  "features.cards.home.title": "角色优先的主屏",
  "features.cards.home.body": "启动器以舞台感主屏展开，由 Live2D 伙伴作为视觉核心，比普通图标墙更有个性。",
  "features.cards.hub.title": "悬浮操作中心",
  "features.cards.hub.body": "可移动按钮可展开设置、电话、消息、浏览器、相机和应用抽屉等快捷入口。",
  "features.cards.drawer.title": "结构化应用抽屉",
  "features.cards.drawer.body": "抽屉支持最近记录、搜索和文件夹创建，让大量应用依然易于查找。",
  "features.cards.settings.title": "边界清晰的设置",
  "features.cards.settings.body": "悬浮模式、语言入口、应用设置和隐私政策被整理到统一的设置流程中。",
  "gallery.cards.home.title": "主页",
  "gallery.cards.home.body": "带有干净悬浮入口的 Live2D 伙伴主屏。",
  "gallery.cards.home.alt": "显示 Live2D 主屏的 EvaLauncher 模拟器截图",
  "gallery.cards.actions.title": "快捷操作",
  "gallery.cards.actions.body": "无需离开主屏，即可从径向菜单打开核心操作。",
  "gallery.cards.actions.alt": "显示展开快捷操作菜单的 EvaLauncher 模拟器截图",
  "gallery.cards.settings.title": "设置",
  "gallery.cards.settings.body": "管理悬浮行为、语言、应用设置与隐私访问。",
  "gallery.cards.settings.alt": "显示设置页面的 EvaLauncher 模拟器截图",
  "details.body": "它把视觉角色层与实用启动器流程结合起来：快捷入口、可搜索内容、文件夹整理，以及对权限敏感行为保持透明的设置界面。",
  "details.items.interaction.title": "交互模型",
  "details.items.interaction.body": "Live2D 主屏、悬浮操作、底部抽屉，以及可配置的悬浮覆盖模式。",
  "details.items.utilities.title": "核心能力",
  "details.items.utilities.body": "搜索、启动历史、文件夹、系统快捷方式、语言入口和隐私跳转。",
  "details.items.design.title": "设计方向",
  "details.items.design.body": "柔和对比、高可读性、强调动态存在感，以及鲜明的角色轮廓。"
});

Object.assign(localeTranslations["zh-TW"], {
  "brand.ariaLabel": "EvaLauncher 首頁",
  "nav.ariaLabel": "主導覽",
  "hero.stats.live2d.title": "Live2D",
  "hero.stats.live2d.body": "動態角色主畫面",
  "hero.stats.hub.title": "懸浮中心",
  "hero.stats.hub.body": "一鍵操作與抽屜入口",
  "hero.stats.drawer.title": "抽屜工具",
  "hero.stats.drawer.body": "搜尋、歷史與資料夾整理",
  "hero.visualLabel": "模擬器截圖",
  "hero.visualAltMain": "帶有 Live2D 夥伴與懸浮啟動按鈕的 EvaLauncher 主畫面",
  "hero.visualAltAccent": "主畫面上展開的 EvaLauncher 懸浮選單",
  "features.cards.home.title": "角色優先的主畫面",
  "features.cards.home.body": "啟動器以舞台感主畫面展開，由 Live2D 夥伴作為視覺核心，比傳統圖示牆更有個性。",
  "features.cards.hub.title": "懸浮操作中心",
  "features.cards.hub.body": "可移動按鈕可展開設定、電話、訊息、瀏覽器、相機與應用抽屜等快捷入口。",
  "features.cards.drawer.title": "結構化應用抽屜",
  "features.cards.drawer.body": "抽屜支援最近記錄、搜尋與資料夾建立，讓大量應用仍然容易整理。",
  "features.cards.settings.title": "邊界清楚的設定",
  "features.cards.settings.body": "懸浮模式、語言入口、應用設定與隱私政策被整理到一致的設定流程中。",
  "gallery.cards.home.title": "主畫面",
  "gallery.cards.home.body": "搭配乾淨懸浮入口的 Live2D 夥伴主畫面。",
  "gallery.cards.home.alt": "顯示 Live2D 主畫面的 EvaLauncher 模擬器截圖",
  "gallery.cards.actions.title": "快捷操作",
  "gallery.cards.actions.body": "不用離開主畫面，也能從放射選單打開核心操作。",
  "gallery.cards.actions.alt": "顯示展開快捷操作選單的 EvaLauncher 模擬器截圖",
  "gallery.cards.settings.title": "設定",
  "gallery.cards.settings.body": "管理懸浮行為、語言、應用設定與隱私存取。",
  "gallery.cards.settings.alt": "顯示設定頁面的 EvaLauncher 模擬器截圖",
  "details.body": "它將視覺角色層與實用啟動器流程結合：快捷入口、可搜尋內容、資料夾整理，以及對權限敏感行為保持透明的設定介面。",
  "details.items.interaction.title": "互動模型",
  "details.items.interaction.body": "Live2D 主畫面、懸浮操作、底部抽屜，以及可設定的懸浮覆蓋模式。",
  "details.items.utilities.title": "核心能力",
  "details.items.utilities.body": "搜尋、啟動歷史、資料夾、系統捷徑、語言入口與隱私跳轉。",
  "details.items.design.title": "設計方向",
  "details.items.design.body": "柔和對比、高可讀性、強調動態存在感，以及鮮明的角色輪廓。"
});

Object.assign(localeTranslations.ru, {
  "brand.ariaLabel": "Главная EvaLauncher",
  "nav.ariaLabel": "Основная навигация",
  "hero.stats.live2d.title": "Live2D",
  "hero.stats.live2d.body": "Анимированный экран с персонажем",
  "hero.stats.hub.title": "Плавающий центр",
  "hero.stats.hub.body": "Действия и доступ к списку в одно касание",
  "hero.stats.drawer.title": "Инструменты списка",
  "hero.stats.drawer.body": "Поиск, история и папки",
  "hero.visualLabel": "Снято в эмуляторе",
  "hero.visualAltMain": "Главный экран EvaLauncher с компаньоном Live2D и плавающей кнопкой запуска",
  "hero.visualAltAccent": "Открытое плавающее меню EvaLauncher на главном экране",
  "features.cards.home.title": "Главный экран с персонажем в центре",
  "features.cards.home.body": "Лаунчер открывается как сценический экран с компаньоном Live2D, поэтому выглядит выразительнее обычной сетки иконок.",
  "features.cards.hub.title": "Плавающий центр действий",
  "features.cards.hub.body": "Подвижная кнопка открывает быстрые ярлыки к настройкам, телефону, сообщениям, браузеру, камере и списку приложений.",
  "features.cards.drawer.title": "Структурированный список приложений",
  "features.cards.drawer.body": "Список поддерживает недавние действия, поиск и создание папок, чтобы большие коллекции оставались удобными.",
  "features.cards.settings.title": "Настройки с ясными границами",
  "features.cards.settings.body": "Параметры плавающего режима, язык, настройки приложения и политика конфиденциальности собраны в отдельный экран настроек.",
  "gallery.cards.home.title": "Главная",
  "gallery.cards.home.body": "Компаньон Live2D и аккуратная плавающая точка входа в лаунчер.",
  "gallery.cards.home.alt": "Скриншот эмулятора EvaLauncher с экраном Live2D",
  "gallery.cards.actions.title": "Быстрые действия",
  "gallery.cards.actions.body": "Открывайте основные действия из радиального меню, не покидая главный экран.",
  "gallery.cards.actions.alt": "Скриншот эмулятора EvaLauncher с раскрытым меню быстрых действий",
  "gallery.cards.settings.title": "Настройки",
  "gallery.cards.settings.body": "Управляйте плавающим поведением, языком, настройками приложения и доступом к приватности.",
  "gallery.cards.settings.alt": "Скриншот эмулятора EvaLauncher со страницей настроек",
  "details.body": "Он сочетает визуальный слой с маскотом и практичный сценарий лаунчера: быстрые входы, поиск по содержимому, папки и прозрачные настройки для функций, связанных с разрешениями.",
  "details.items.interaction.title": "Модель взаимодействия",
  "details.items.interaction.body": "Главный экран Live2D, плавающие действия, нижний список и настраиваемый режим наложения.",
  "details.items.utilities.title": "Основные инструменты",
  "details.items.utilities.body": "Поиск, история запусков, папки, системные ярлыки, доступ к языку и переход к приватности.",
  "details.items.design.title": "Дизайн-направление",
  "details.items.design.body": "Мягкий контраст, высокая читаемость, ощущение движения и выразительный силуэт персонажа."
});

Object.assign(localeTranslations.ja, {
  "brand.ariaLabel": "EvaLauncher ホーム",
  "nav.ariaLabel": "メインナビゲーション",
  "hero.stats.live2d.title": "Live2D",
  "hero.stats.live2d.body": "アニメーションするキャラクターホーム",
  "hero.stats.hub.title": "フローティングハブ",
  "hero.stats.hub.body": "ワンタップ操作とドロワー起動",
  "hero.stats.drawer.title": "ドロワーツール",
  "hero.stats.drawer.body": "検索、履歴、フォルダー整理",
  "hero.visualLabel": "エミュレーターで撮影",
  "hero.visualAltMain": "Live2D の相棒とフローティング起動ボタンがある EvaLauncher のホーム画面",
  "hero.visualAltAccent": "ホーム画面で開いた EvaLauncher のフローティングメニュー",
  "features.cards.home.title": "キャラクターが主役のホーム",
  "features.cards.home.body": "ランチャーは Live2D の相棒が中心に立つステージのようなホームから始まり、一般的なアイコンの壁よりも強い個性を与えます。",
  "features.cards.hub.title": "フローティング操作ハブ",
  "features.cards.hub.body": "移動できるボタンから、設定、電話、メッセージ、ブラウザ、カメラ、アプリドロワーへ素早くアクセスできます。",
  "features.cards.drawer.title": "構造化されたアプリドロワー",
  "features.cards.drawer.body": "最近使った履歴、検索、フォルダー作成に対応し、アプリ数が多くても探しやすく保てます。",
  "features.cards.settings.title": "境界の明確な設定画面",
  "features.cards.settings.body": "フローティングモード、言語、アプリ設定、プライバシーポリシーを一つの設定導線にまとめています。",
  "gallery.cards.home.title": "ホーム",
  "gallery.cards.home.body": "Live2D の相棒と、すっきりしたフローティング起点。",
  "gallery.cards.home.alt": "Live2D ホーム画面を表示している EvaLauncher のエミュレーター画像",
  "gallery.cards.actions.title": "クイックアクション",
  "gallery.cards.actions.body": "ホームを離れずに、放射状メニューから主要操作を開けます。",
  "gallery.cards.actions.alt": "クイックアクションメニューを開いた EvaLauncher のエミュレーター画像",
  "gallery.cards.settings.title": "設定",
  "gallery.cards.settings.body": "フローティング挙動、言語、アプリ設定、プライバシーへのアクセスを管理します。",
  "gallery.cards.settings.alt": "設定ページを表示している EvaLauncher のエミュレーター画像",
  "details.body": "視覚的なマスコットレイヤーと実用的なランチャーフローを組み合わせ、素早い導線、検索可能な内容、フォルダー整理、権限に関わる動作を隠さない設定画面を提供します。",
  "details.items.interaction.title": "操作モデル",
  "details.items.interaction.body": "Live2D ホーム、フローティング操作、ボトムシート型ドロワー、設定可能なオーバーレイモード。",
  "details.items.utilities.title": "主要ユーティリティ",
  "details.items.utilities.body": "検索、起動履歴、フォルダー、システムショートカット、言語導線、プライバシー導線。",
  "details.items.design.title": "デザイン方針",
  "details.items.design.body": "やわらかなコントラスト、高い可読性、動きを軸にした存在感、印象的なキャラクターシルエット。"
});

Object.assign(localeTranslations.ko, {
  "brand.ariaLabel": "EvaLauncher 홈",
  "nav.ariaLabel": "기본 탐색",
  "hero.stats.live2d.title": "Live2D",
  "hero.stats.live2d.body": "애니메이션 캐릭터 홈",
  "hero.stats.hub.title": "플로팅 허브",
  "hero.stats.hub.body": "원탭 액션과 서랍 진입",
  "hero.stats.drawer.title": "서랍 도구",
  "hero.stats.drawer.body": "검색, 기록, 폴더 정리",
  "hero.visualLabel": "에뮬레이터 캡처",
  "hero.visualAltMain": "Live2D 동반자와 플로팅 런처 버튼이 있는 EvaLauncher 홈 화면",
  "hero.visualAltAccent": "홈 화면에서 열린 EvaLauncher 플로팅 메뉴",
  "features.cards.home.title": "캐릭터 중심 홈",
  "features.cards.home.body": "런처는 Live2D 동반자가 중심이 되는 무대 같은 홈 화면으로 열리며, 일반적인 아이콘 벽보다 더 강한 개성을 제공합니다.",
  "features.cards.hub.title": "플로팅 액션 허브",
  "features.cards.hub.body": "움직일 수 있는 버튼이 설정, 전화, 메시지, 브라우저, 카메라, 앱 서랍으로 빠르게 확장됩니다.",
  "features.cards.drawer.title": "구조화된 앱 서랍",
  "features.cards.drawer.body": "최근 기록, 검색, 폴더 생성을 지원해 앱이 많아도 쉽게 정리할 수 있습니다.",
  "features.cards.settings.title": "경계가 분명한 설정",
  "features.cards.settings.body": "플로팅 모드 제어, 언어, 앱 설정, 개인정보처리방침을 하나의 전용 설정 흐름에 모았습니다.",
  "gallery.cards.home.title": "홈",
  "gallery.cards.home.body": "깔끔한 플로팅 진입점이 있는 Live2D 동반자 홈 화면입니다.",
  "gallery.cards.home.alt": "Live2D 홈 화면을 보여주는 EvaLauncher 에뮬레이터 스크린샷",
  "gallery.cards.actions.title": "빠른 작업",
  "gallery.cards.actions.body": "홈 화면을 떠나지 않고 방사형 메뉴에서 핵심 작업을 엽니다.",
  "gallery.cards.actions.alt": "확장된 빠른 작업 메뉴를 보여주는 EvaLauncher 에뮬레이터 스크린샷",
  "gallery.cards.settings.title": "설정",
  "gallery.cards.settings.body": "플로팅 동작, 언어, 앱 설정, 개인정보 접근을 관리합니다.",
  "gallery.cards.settings.alt": "설정 페이지를 보여주는 EvaLauncher 에뮬레이터 스크린샷",
  "details.body": "시각적인 마스코트 레이어와 실용적인 런처 흐름을 결합해 빠른 진입점, 검색 가능한 콘텐츠, 폴더 정리, 권한 민감 동작을 숨기지 않는 설정 화면을 제공합니다.",
  "details.items.interaction.title": "상호작용 모델",
  "details.items.interaction.body": "Live2D 홈, 플로팅 액션, 바텀시트 서랍, 설정 가능한 오버레이 모드.",
  "details.items.utilities.title": "핵심 유틸리티",
  "details.items.utilities.body": "검색, 실행 기록, 폴더, 시스템 바로가기, 언어 접근, 개인정보 이동.",
  "details.items.design.title": "디자인 방향",
  "details.items.design.body": "부드러운 대비, 높은 가독성, 움직임 중심의 존재감, 또렷한 캐릭터 실루엣."
});

Object.assign(localeTranslations.ar, {
  "brand.ariaLabel": "الصفحة الرئيسية لـ EvaLauncher",
  "nav.ariaLabel": "التنقل الرئيسي",
  "hero.stats.live2d.title": "Live2D",
  "hero.stats.live2d.body": "شاشة رئيسية متحركة مع شخصية",
  "hero.stats.hub.title": "مركز عائم",
  "hero.stats.hub.body": "إجراءات ودخول إلى الدرج بلمسة واحدة",
  "hero.stats.drawer.title": "أدوات الدرج",
  "hero.stats.drawer.body": "بحث وسجل وتنظيم بالمجلدات",
  "hero.visualLabel": "ملتقط من المحاكي",
  "hero.visualAltMain": "شاشة EvaLauncher الرئيسية مع رفيق Live2D وزر تشغيل عائم",
  "hero.visualAltAccent": "قائمة EvaLauncher العائمة المفتوحة على الشاشة الرئيسية",
  "features.cards.home.title": "واجهة رئيسية تضع الشخصية أولًا",
  "features.cards.home.body": "يفتتح المشغّل بشاشة تشبه المسرح ترتكز على رفيق Live2D، ما يمنح الواجهة شخصية أوضح من جدار أيقونات تقليدي.",
  "features.cards.hub.title": "مركز إجراءات عائم",
  "features.cards.hub.body": "زر متحرك يفتح اختصارات سريعة للإعدادات والهاتف والرسائل والمتصفح والكاميرا ودرج التطبيقات.",
  "features.cards.drawer.title": "درج تطبيقات منظّم",
  "features.cards.drawer.body": "يدعم الدرج السجل الحديث والبحث وإنشاء المجلدات كي تبقى المجموعات الكبيرة سهلة التصفح.",
  "features.cards.settings.title": "إعدادات بحدود واضحة",
  "features.cards.settings.body": "تم جمع عناصر التحكم العائمة واللغة وإعدادات التطبيق وسياسة الخصوصية في مسار إعدادات مخصص.",
  "gallery.cards.home.title": "الرئيسية",
  "gallery.cards.home.body": "رفيق Live2D مع نقطة دخول عائمة وأنيقة إلى المشغّل.",
  "gallery.cards.home.alt": "لقطة محاكي EvaLauncher تعرض الشاشة الرئيسية مع Live2D",
  "gallery.cards.actions.title": "إجراءات سريعة",
  "gallery.cards.actions.body": "افتح الإجراءات الأساسية من قائمة شعاعية من دون مغادرة الشاشة الرئيسية.",
  "gallery.cards.actions.alt": "لقطة محاكي EvaLauncher تعرض قائمة الإجراءات السريعة الموسعة",
  "gallery.cards.settings.title": "الإعدادات",
  "gallery.cards.settings.body": "أدِر السلوك العائم واللغة وإعدادات التطبيق والوصول إلى الخصوصية.",
  "gallery.cards.settings.alt": "لقطة محاكي EvaLauncher تعرض صفحة الإعدادات",
  "details.body": "يجمع بين طبقة بصرية لشخصية وبين تدفق مشغّل عملي: نقاط دخول سريعة ومحتوى قابل للبحث وتنظيم بالمجلدات وإعدادات تكشف السلوكيات الحساسة للأذونات بدل إخفائها.",
  "details.items.interaction.title": "نموذج التفاعل",
  "details.items.interaction.body": "واجهة Live2D رئيسية وإجراءات عائمة ودرج سفلي ووضع تراكب قابل للضبط.",
  "details.items.utilities.title": "الأدوات الأساسية",
  "details.items.utilities.body": "بحث وسجل تشغيل ومجلدات واختصارات النظام والوصول إلى اللغة والخصوصية.",
  "details.items.design.title": "اتجاه التصميم",
  "details.items.design.body": "تباين ناعم ووضوح عالٍ وحضور قائم على الحركة وظل شخصية مميز."
});

Object.assign(localeTranslations.hi, {
  "brand.ariaLabel": "EvaLauncher होम",
  "nav.ariaLabel": "मुख्य नेविगेशन",
  "hero.stats.live2d.title": "Live2D",
  "hero.stats.live2d.body": "एनिमेटेड कैरेक्टर होम",
  "hero.stats.hub.title": "फ्लोटिंग हब",
  "hero.stats.hub.body": "एक टैप में एक्शन और ड्रॉअर एक्सेस",
  "hero.stats.drawer.title": "ड्रॉअर टूल्स",
  "hero.stats.drawer.body": "खोज, हिस्ट्री और फ़ोल्डर संगठन",
  "hero.visualLabel": "इम्युलेटर से कैप्चर",
  "hero.visualAltMain": "Live2D साथी और फ्लोटिंग लॉन्चर बटन के साथ EvaLauncher होम स्क्रीन",
  "hero.visualAltAccent": "होम स्क्रीन पर खुला EvaLauncher फ्लोटिंग मेनू",
  "features.cards.home.title": "कैरेक्टर-फर्स्ट होम",
  "features.cards.home.body": "यह लॉन्चर एक स्टेज-जैसी होम स्क्रीन पर खुलता है, जिसकी केंद्रबिंदु Live2D साथी है, इसलिए यह साधारण आइकन ग्रिड से अधिक व्यक्तित्व देता है।",
  "features.cards.hub.title": "फ्लोटिंग एक्शन हब",
  "features.cards.hub.body": "एक मूवेबल बटन सेटिंग्स, फ़ोन, मैसेज, ब्राउज़र, कैमरा और ऐप ड्रॉअर के लिए क्विक शॉर्टकट खोलता है।",
  "features.cards.drawer.title": "संरचित ऐप ड्रॉअर",
  "features.cards.drawer.body": "ड्रॉअर में हालिया हिस्ट्री, खोज और फ़ोल्डर बनाना शामिल है, ताकि बड़ी ऐप लाइब्रेरी भी आसानी से संभाली जा सके।",
  "features.cards.settings.title": "साफ सीमाओं वाली सेटिंग्स",
  "features.cards.settings.body": "फ्लोटिंग मोड कंट्रोल, भाषा, ऐप सेटिंग्स और प्राइवेसी पॉलिसी को एक समर्पित सेटिंग फ्लो में रखा गया है।",
  "gallery.cards.home.title": "होम",
  "gallery.cards.home.body": "Live2D साथी और साफ फ्लोटिंग लॉन्चर एंट्री।",
  "gallery.cards.home.alt": "Live2D होम स्क्रीन दिखाने वाला EvaLauncher इम्युलेटर स्क्रीनशॉट",
  "gallery.cards.actions.title": "क्विक एक्शन",
  "gallery.cards.actions.body": "होम स्क्रीन छोड़े बिना रेडियल मेनू से मुख्य एक्शन खोलें।",
  "gallery.cards.actions.alt": "विस्तारित क्विक एक्शन मेनू दिखाने वाला EvaLauncher इम्युलेटर स्क्रीनशॉट",
  "gallery.cards.settings.title": "सेटिंग्स",
  "gallery.cards.settings.body": "फ्लोटिंग व्यवहार, भाषा, ऐप सेटिंग्स और प्राइवेसी एक्सेस प्रबंधित करें।",
  "gallery.cards.settings.alt": "सेटिंग्स पेज दिखाने वाला EvaLauncher इम्युलेटर स्क्रीनशॉट",
  "details.body": "यह विजुअल मैस्कॉट लेयर को एक व्यावहारिक लॉन्चर फ्लो के साथ जोड़ता है: तेज़ एंट्री पॉइंट, खोज योग्य सामग्री, फ़ोल्डर संगठन और ऐसी सेटिंग्स जो परमिशन-सेंसिटिव व्यवहार को छिपाने के बजाय स्पष्ट करती हैं।",
  "details.items.interaction.title": "इंटरैक्शन मॉडल",
  "details.items.interaction.body": "Live2D होम, फ्लोटिंग एक्शन, बॉटम-शीट ड्रॉअर और कॉन्फ़िगरेबल ओवरले मोड।",
  "details.items.utilities.title": "मुख्य उपयोगिताएँ",
  "details.items.utilities.body": "खोज, लॉन्च हिस्ट्री, फ़ोल्डर, सिस्टम शॉर्टकट, भाषा एक्सेस और प्राइवेसी हैंडऑफ़।",
  "details.items.design.title": "डिज़ाइन दिशा",
  "details.items.design.body": "सॉफ्ट कॉन्ट्रास्ट, उच्च पठनीयता, मोशन-फर्स्ट प्रेज़ेन्स और अलग कैरेक्टर सिलुएट।"
});

function translate(locale, key) {
  const localeMap = localeTranslations[locale] || {};
  return localeMap[key] || baseTranslations[key] || "";
}

function normalizeLocale(candidate) {
  if (!candidate) {
    return null;
  }

  const normalized = candidate.toLowerCase();
  if (localeAliases[normalized]) {
    return localeAliases[normalized];
  }

  const base = normalized.split("-")[0];
  return localeAliases[base] || null;
}

function detectInitialLocale() {
  const stored = normalizeLocale(window.localStorage.getItem(STORAGE_KEY));
  if (stored) {
    return stored;
  }

  const browserLocales = Array.isArray(navigator.languages) ? navigator.languages : [navigator.language];
  for (const locale of browserLocales) {
    const normalized = normalizeLocale(locale);
    if (normalized) {
      return normalized;
    }
  }

  return FALLBACK_LOCALE;
}

function populateLanguageOptions(select) {
  const fragment = document.createDocumentFragment();

  supportedLanguages.forEach(({ code, label }) => {
    const option = document.createElement("option");
    option.value = code;
    option.textContent = label;
    fragment.appendChild(option);
  });

  select.appendChild(fragment);
}

function applyTranslations(locale) {
  document.documentElement.lang = locale;
  document.documentElement.dir = RTL_LOCALES.has(locale) ? "rtl" : "ltr";
  document.title = translate(locale, "meta.title");

  const metaDescription = document.getElementById("meta-description");
  if (metaDescription) {
    metaDescription.setAttribute("content", translate(locale, "meta.description"));
  }

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = translate(locale, node.getAttribute("data-i18n"));
  });

  document.querySelectorAll("[data-i18n-attrs]").forEach((node) => {
    node
      .getAttribute("data-i18n-attrs")
      .split(";")
      .map((pair) => pair.trim())
      .filter(Boolean)
      .forEach((mapping) => {
        const [attribute, key] = mapping.split(":");
        if (attribute && key) {
          node.setAttribute(attribute.trim(), translate(locale, key.trim()));
        }
      });
  });

  const localeSelect = document.getElementById("locale-select");
  if (localeSelect) {
    localeSelect.value = locale;
    localeSelect.setAttribute("aria-label", translate(locale, "language.selectAria"));
  }

  window.localStorage.setItem(STORAGE_KEY, locale);
}

const localeSelect = document.getElementById("locale-select");
if (localeSelect) {
  populateLanguageOptions(localeSelect);
  applyTranslations(detectInitialLocale());
  localeSelect.addEventListener("change", (event) => {
    applyTranslations(event.target.value);
  });
}
