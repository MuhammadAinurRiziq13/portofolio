import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  meta,
  starbucks,
  sekawan,
  tesla,
  shopify,
  carrent,
  jobit,
  tripguide,
  threejs,
  dart,
  flutter,
  laravel,
  php,
  python,
  postgre,
  mysql,
  vuejs,
  blog,
  canteen,
  port,
  presensia,
  lcquiz
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Web Developer",
    icon: web,
  },
  {
    title: "Flutter Developer",
    icon: mobile,
  },
  {
    title: "ML Engineer",
    icon: backend,
  },
  {
    title: "UI / UX",
    icon: creator,
  },
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Vue JS",
    icon: vuejs,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "PHP",
    icon: php,
  },
  {
    name: "Laravel",
    icon: laravel,
  },
  {
    name: "Flutter",
    icon: flutter,
  },
  {
    name: "Python",
    icon: python,
  },
  {
    name: "git",
    icon: git,
  },
];

const experiences = [
  {
    title: "Fullstack Developer Internship",
    company_name: "Sekawan Media",
    icon: sekawan,
    iconBg: "#0B1623",
    date: "Januari 2025 - Juni 2025",
    points: [
      "Developing and maintaining web applications using Laravel and other related technologies.",
      "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Building and consuming RESTful APIs for application functionality.",
      "Utilizing Git for version control and project collaboration."
    ],
  },
  
  // {
  //   title: "React Native Developer",
  //   company_name: "Tesla",
  //   icon: tesla,
  //   iconBg: "#E6DEDD",
  //   date: "Jan 2021 - Feb 2022",
  //   points: [
  //     "Developing and maintaining web applications using React.js and other related technologies.",
  //     "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
  //     "Implementing responsive design and ensuring cross-browser compatibility.",
  //     "Participating in code reviews and providing constructive feedback to other developers.",
  //   ],
  // },
  // {
  //   title: "Web Developer",
  //   company_name: "Shopify",
  //   icon: shopify,
  //   iconBg: "#383E56",
  //   date: "Jan 2022 - Jan 2023",
  //   points: [
  //     "Developing and maintaining web applications using React.js and other related technologies.",
  //     "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
  //     "Implementing responsive design and ensuring cross-browser compatibility.",
  //     "Participating in code reviews and providing constructive feedback to other developers.",
  //   ],
  // },
  // {
  //   title: "Full stack Developer",
  //   company_name: "Meta",
  //   icon: meta,
  //   iconBg: "#E6DEDD",
  //   date: "Jan 2023 - Present",
  //   points: [
  //     "Developing and maintaining web applications using React.js and other related technologies.",
  //     "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
  //     "Implementing responsive design and ensuring cross-browser compatibility.",
  //     "Participating in code reviews and providing constructive feedback to other developers.",
  //   ],
  // },
];

const testimonials = [
  {
    testimonial:
      "I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.",
    name: "Sara Lee",
    designation: "CFO",
    company: "Acme Co",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial:
      "I've never met a web developer who truly cares about their clients' success like Rick does.",
    name: "Chris Brown",
    designation: "COO",
    company: "DEF Corp",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial:
      "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
    name: "Lisa Wang",
    designation: "CTO",
    company: "456 Enterprises",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

const projects = [
  {
    name: "Blog Website",
    description: "A web-based blog platform built with Laravel that allows users to create, edit, and manage blog posts. The platform features an intuitive interface for easy content creation, user management, and publishing, ensuring a seamless blogging experience.",
    tags: [
      {
        name: "laravel",
        color: "pink-text-gradient",
      },
      {
        name: "mysql",
        color: "green-text-gradient",
      },
      {
        name: "bootstrap",
        color: "blue-text-gradient",
      },
    ],
    image: blog,
    source_code_link: "https://github.com/MuhammadAinurRiziq13/RXZ-Blog",
  },
  {
    name: "SIMACAN",
    description: "A cashier website built with native PHP that manages sales transactions efficiently. This system provides basic point-of-sale functionalities and integrates with a database to streamline the checkout process and enhance operational efficiency.",
    tags: [
      {
        name: "PHP",
        color: "blue-text-gradient"
      },
      {
        name: "MySQL",
        color: "green-text-gradient"
      },
      {
        name: "Bootstrap",
        color: "pink-text-gradient"
      }
    ],
    image: canteen,
    source_code_link: "https://github.com/MuhammadAinurRiziq13/web-kantin-mvc"
  },
  {
    name: "PORT-5",
    description: "PORT-05 is a citizen data management app for RT 05 RW 01, Ranuklindungan Village, built with Laravel and MySQL. It enables citizens to submit official documents like cover letters, track submissions, and receive updates via WhatsApp notifications.",
    tags: [
      {
        name: "Laravel",
        color: "blue-text-gradient"
      },
      {
        name: "mysql",
        color: "green-text-gradient"
      },
      {
        name: "Bootstrap",
        color: "pink-text-gradient"
      }
    ],
    image: port,
    source_code_link: "https://github.com/MuhammadAinurRiziq13/siwarga"
  },
  {
    name: "Presensia",
    description: "Presensia is an attendance and working hours tracking app that uses facial recognition and GPS. Built with Flutter, Laravel, FastAPI, and PostgreSQL, the app automates secure and fast attendance recording with real-time notifications and facial detection.",
    tags: [
      {
        name: "Flutter",
        color: "blue-text-gradient"
      },
      {
        name: "Laravel",
        color: "green-text-gradient"
      },
      {
        name: "PostgreSQL",
        color: "pink-text-gradient"
      }
    ],
    image: presensia,
    source_code_link: "https://github.com/MuhammadAinurRiziq13/presensia"
  },
  {
    name: "LC Quizz",
    description: "LC Quiz is a web application for managing quizzes, students, and teachers at Lembaga Bimbingan Belajar Lentera Cendekia, built using Laravel, InertiaJS, and VueJS, featuring interactive quizzes, user management, and result reporting.",
    tags: [
      {
        name: "Laravel",
        color: "pink-text-gradient"
      },
      {
        name: "Vuejs",
        color: "green-text-gradient"
      },
      {
        name: "PostgreSQL",
        color: "blue-text-gradient"
      }
    ],
    image: lcquiz,
    source_code_link: ""
  },
];


export { services, technologies, experiences, testimonials, projects };
