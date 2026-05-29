// ============================================================
// Portfolio Data — Muhammad Ainur Riziq
// Updated from CV: May 2026
// ============================================================

export const personal = {
  name:     "Muhammad Ainur Riziq",
  nickname: "Riziq",
  location: "Lamongan, Indonesia",
  tagline:  "Full-Stack Developer & AI/ML Engineer",
  bio:      "Teknik Informatika semester 8 di Politeknik Negeri Malang — passionate di software engineering, web, mobile, dan AI integration. Saya membangun produk nyata dengan React, Vue, Laravel, Flutter, FastAPI, dan Go.",
  email:    "riziqainur13@gmail.com",
  phone:    "+6281998166297",
  github:   "https://github.com/MuhammadAinurRiziq13",
  linkedin: "https://linkedin.com/in/muhammad-ainur-riziq",
  emailjs: {
    serviceId:  "service_t79988f",
    templateId: "template_lu8nbnp",
    publicKey:  "ij7l1omOSt2puPQAt",
  },
};

export const navLinks = [
  { id: "about",            label: "About"    },
  { id: "skills",           label: "Skills"   },
  { id: "experience",       label: "Experience" },
  { id: "projects",         label: "Projects" },
  { id: "certifications",   label: "Certs"    },
  { id: "contact",          label: "Contact"  },
];

export const services = [
  { title: "Web Developer",     icon: "🌐", accent: "cyan"   },
  { title: "Flutter Developer", icon: "📱", accent: "orange" },
  { title: "AI / ML Engineer",  icon: "🤖", accent: "purple" },
  { title: "UI / UX Designer",  icon: "🎨", accent: "pink"   },
];

// ── Skills ──────────────────────────────────────────────────
export type SkillCategory = "Language" | "Frontend" | "Backend" | "Mobile" | "Database" | "DevOps & Tools";

export interface Skill {
  name:     string;
  icon:     string;
  category: SkillCategory;
}

export const skills: Skill[] = [
  // Languages
  { name: "HTML5",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",             category: "Language" },
  { name: "CSS3",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",               category: "Language" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",   category: "Language" },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",   category: "Language" },
  { name: "PHP",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",                 category: "Language" },
  { name: "Python",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",           category: "Language" },
  { name: "Dart",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg",               category: "Language" },
  { name: "Go",         icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg",                   category: "Language" },
  { name: "Kotlin",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg",           category: "Mobile" },

  // Frontend
  { name: "React",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",             category: "Frontend" },
  { name: "Vue JS",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",             category: "Frontend" },
  { name: "Svelte",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg",           category: "Frontend" },
  { name: "Tailwind",   icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg", category: "Frontend" },

  // Backend
  { name: "Laravel",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg",  category: "Backend" },
  { name: "FastAPI",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",         category: "Backend" },

  // Mobile
  { name: "Flutter",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",         category: "Mobile" },

  // Database
  { name: "MySQL",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",             category: "Database" },
  { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",   category: "Database" },
  { name: "Redis",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",             category: "Database" },

  // DevOps & Tools
  { name: "Docker",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",           category: "DevOps & Tools" },
  { name: "Git",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",                 category: "DevOps & Tools" },
  { name: "Firebase",   icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-original.svg",       category: "DevOps & Tools" },
  { name: "Figma",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",             category: "DevOps & Tools" },
];

// ── Education ───────────────────────────────────────────────
export const education = [
  {
    institution: "Politeknik Negeri Malang",
    major:       "Teknik Informatika",
    period:      "2022 – Sekarang",
    gpa:         "3.85",
  },
  {
    institution: "MAN 1 Gresik",
    major:       "Matematika dan IPA",
    period:      "2019 – 2022",
    gpa:         null,
  },
];

// ── Experience ──────────────────────────────────────────────
export const experiences = [
  {
    title:   "Fullstack Developer Intern",
    company: "PT. Teknologi Sunan Drajat",
    period:  "2025",
    points: [
      "Mengembangkan dua aplikasi SaaS berbasis web menggunakan Laravel dan React.",
      "Membangun sistem informasi manajemen santri dengan fitur-fitur lengkap.",
      "Mengembangkan platform manajemen pembayaran ISP end-to-end.",
      "Implementasi fitur bisnis kompleks, optimasi performa, dan debugging.",
      "Kolaborasi aktif dalam tim pengembangan software industri.",
    ],
  },
  {
    title:   "Fullstack Developer Intern",
    company: "Sekawan Media Informatika",
    period:  "2025",
    points: [
      "Mengembangkan aplikasi manajemen audit dan arsip berbasis web.",
      "Menggunakan stack Laravel, React, dan CodeIgniter secara bersamaan.",
      "Pengembangan fitur full-stack dari UI hingga database layer.",
      "Optimasi performa aplikasi dan debugging pada lingkungan produksi.",
      "Berkolaborasi lintas tim dalam siklus pengembangan software industri.",
    ],
  },
];

// ── Projects ────────────────────────────────────────────────
// ── RizzMeet
import rizzmeetCover    from "../assets/rizzmeet/cover.png";
import rizzmeetImg1     from "../assets/rizzmeet/Screenshot 2026-05-25 101859.png";
import rizzmeetImg2     from "../assets/rizzmeet/Screenshot 2026-05-25 102127.png";
import rizzmeetImg3     from "../assets/rizzmeet/Screenshot 2026-05-25 102246.png";

// ── Password Manager
import passmanagerCover  from "../assets/passmanager/cover.png";
import passmanagerImg1   from "../assets/passmanager/Screenshot 2026-05-25 103449.png";
import passmanagerImg2   from "../assets/passmanager/Screenshot 2026-05-25 103502.png";
import passmanagerImg3   from "../assets/passmanager/Screenshot 2026-05-25 103552.png";

// ── Recolor
import recolorCover     from "../assets/recolor/cover.png";
import recolorImg1      from "../assets/recolor/Screenshot 2026-05-25 100913.png";
import recolorImg2      from "../assets/recolor/Screenshot 2026-05-25 101032.png";

// ── StrokeMonitor
import strokemonitorCover from "../assets/strokemonitor/cover.png";
import strokemonitorImg1  from "../assets/strokemonitor/Screenshot 2026-05-25 110111.png";
import strokemonitorImg2  from "../assets/strokemonitor/sm1.jpeg";
import strokemonitorImg3  from "../assets/strokemonitor/sm2.jpeg";
import strokemonitorImg4  from "../assets/strokemonitor/sm3.jpeg";

// ── Presensia
import presensiacover    from "../assets/presensia/cover.jpeg";
import presensia1        from "../assets/presensia/Screenshot 2026-05-26 222315.png";

// ── PORT-05
import portCover        from "../assets/port/cover.jpeg";
import portImg1         from "../assets/port/image (6).png";
import portImg2         from "../assets/port/image (7).png";

// ── LCQuis
import lcquisCover      from "../assets/lcquis/cover.jpeg";
import lcquisImg1       from "../assets/lcquis/6.png";

// ── BillNet
import billnetImg1      from "../assets/billnet/image.png";
import billnetImg2      from "../assets/billnet/image (1).png";
import billnetImg3      from "../assets/billnet/image (2).png";
import billnetImg4      from "../assets/billnet/image (3).png";

// ── SIMACAM
import canteenCover     from "../assets/canteen/cover.jpeg";


export const projects = [
  {
    name:        "RizzMeet",
    description: "Platform video conference real-time berbasis WebRTC dengan fitur screen sharing, collaborative whiteboard, dan live chat. Dibangun dengan Vue 3, TypeScript, Go, dan WebSocket.",
    tags:        ["Vue 3", "TypeScript", "Go", "WebSocket", "PostgreSQL"],
    images:      [rizzmeetCover, rizzmeetImg1, rizzmeetImg2, rizzmeetImg3],
    githubLink:  "",
    highlight:   true,
  },
  {
    name:        "Password Manager & Remote Access",
    description: "Sistem credential management dan remote access SSH/RDP via browser menggunakan Apache Guacamole, dengan fitur real-time session dan Redis caching.",
    tags:        ["Go", "SvelteKit", "PostgreSQL", "Redis", "WebSocket"],
    images:      [passmanagerCover, passmanagerImg1, passmanagerImg2, passmanagerImg3],
    githubLink:  "",
    highlight:   true,
  },
  {
    name:        "Recolor – Batik AI Colorizer",
    description: "Aplikasi AI colorization untuk motif batik menggunakan deep learning (Stable Diffusion + ControlNet + OpenCV). Upload gambar batik grayscale, dapatkan versi berwarna otomatis.",
    tags:        ["React", "FastAPI", "PyTorch", "Stable Diffusion", "OpenCV"],
    images:      [recolorCover, recolorImg1, recolorImg2],
    githubLink:  "",
    highlight:   true,
  },
  {
    name:        "StrokeMonitor",
    description: "Sistem monitoring pasien stroke dengan deteksi gesture real-time menggunakan MediaPipe dan TensorFlow Lite, notifikasi Firebase, dan UI Android Jetpack Compose.",
    tags:        ["FastAPI", "MediaPipe", "TensorFlow Lite", "Firebase", "Android"],
    images:      [strokemonitorCover, strokemonitorImg1, strokemonitorImg2, strokemonitorImg3, strokemonitorImg4],
    githubLink:  "",
    highlight:   false,
  },
  {
    name:        "Presensia",
    description: "Aplikasi presensi berbasis face recognition dengan verifikasi lokasi GPS. Dibangun dengan Flutter, Laravel, FastAPI, dan PostgreSQL dengan notifikasi real-time.",
    tags:        ["Flutter", "Laravel", "FastAPI", "PostgreSQL", "GPS"],
    images:      [presensiacover, presensia1],
    githubLink:  "https://github.com/MuhammadAinurRiziq13/presensia",
    highlight:   false,
  },
  {
    name:        "PORT-05",
    description: "Sistem manajemen data warga RT 05 RW 01. Warga dapat mengajukan surat resmi, melacak pengajuan, dan menerima notifikasi via WhatsApp API dengan SPK TOPSIS.",
    tags:        ["Laravel", "MySQL", "WhatsApp API"],
    images:      [portCover, portImg1, portImg2],
    githubLink:  "https://github.com/MuhammadAinurRiziq13/siwarga",
    highlight:   false,
  },
  {
    name:        "LCQuis",
    description: "Aplikasi kuis online dengan fitur leaderboard real-time, manajemen soal, dan sistem skor. Dibangun untuk kebutuhan evaluasi pembelajaran interaktif.",
    tags:        ["Laravel", "MySQL", "Bootstrap"],
    images:      [lcquisCover, lcquisImg1],
    githubLink:  "",
    highlight:   false,
  },
  {
    name:        "BillNet",
    description: "Aplikasi web SaaS untuk manajemen sistem pembayaran ISP (Internet Service Provider). Fitur meliputi manajemen tagihan pelanggan, pengelolaan paket layanan internet, pelaporan keuangan, dan integrasi REST API antar layanan.",
    tags:        ["Laravel", "React", "MySQL"],
    images:      [billnetImg1, billnetImg2, billnetImg3, billnetImg4],
    githubLink:  "",
    highlight:   false,
  },
  {
    name:        "SIMACAM",
    description: "Sistem transaksi dan pelaporan penjualan kasir berbasis web. Dibangun dengan PHP Native menggunakan arsitektur MVC, terintegrasi dengan MySQL.",
    tags:        ["PHP Native", "MySQL", "Bootstrap", "MVC"],
    images:      [canteenCover],
    githubLink:  "https://github.com/MuhammadAinurRiziq13/web-kantin-mvc",
    highlight:   false,
  },
];

// ── Certifications ──────────────────────────────────────────
export const certifications = [
  { title: "Junior Mobile Programmer",     issuer: "BNSP",        icon: "🏅" },
  { title: "KodeBisat Full Stack Laravel", issuer: "Codepolitan",  icon: "🏅" },
  { title: "React Developer Learning Path",issuer: "Dicoding",    icon: "🏅" },
  { title: "TOEIC — Score 700",            issuer: "TOEIC",       icon: "🏅" },
  { title: "PECT — Score 725",             issuer: "PECT",        icon: "🏅" },
];
