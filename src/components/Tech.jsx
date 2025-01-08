import React, { useState, useEffect } from "react";
import { BallCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import { motion } from "framer-motion";
import "react-vertical-timeline-component/style.min.css";

import { styles } from "../styles";
import { textVariant } from "../utils/motion";

const Tech = () => {
  const [visibleTech, setVisibleTech] = useState([]);

  useEffect(() => {
    // Mengecek lebar layar dan menampilkan maksimal 6 teknologi di mobile
    const updateTechList = () => {
      const isMobile = window.innerWidth <= 768;
      const techList = isMobile ? technologies.slice(0, 6) : technologies;
      setVisibleTech(techList);
    };

    // Panggil saat komponen pertama kali dimuat
    updateTechList();

    // Tambahkan event listener untuk menangani perubahan ukuran layar
    window.addEventListener("resize", updateTechList);

    // Bersihkan event listener saat komponen di-unmount
    return () => {
      window.removeEventListener("resize", updateTechList);
    };
  }, []);

  return (
    <motion.div variants={textVariant()}>
      <p className={`${styles.sectionSubText} text-center`}>
        What I have learned so far
      </p>
      <h2 className={`${styles.sectionHeadText} text-center mb-5`}>
        Tech Stack.
      </h2>

      <div className="flex flex-row flex-wrap justify-center gap-10 mt-5">
        {visibleTech.map((technology) => (
          <div className="w-28 h-28" key={technology.name}>
            <BallCanvas icon={technology.icon} />
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default SectionWrapper(Tech, "");
