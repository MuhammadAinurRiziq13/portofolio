import React from "react";
import { BallCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import { motion } from "framer-motion";
import "react-vertical-timeline-component/style.min.css";

import { styles } from "../styles";
import { textVariant } from "../utils/motion";

const Tech = () => {
  return (
    <motion.div variants={textVariant()}>
      <p className={`${styles.sectionSubText} text-center`}>
        What I have learned so far
      </p>
      <h2 className={`${styles.sectionHeadText} text-center mb-5`}>
        Tech Stack.
      </h2>

      <div className='flex flex-row flex-wrap justify-center gap-10 mt-5'>
        {technologies.map((technology) => (
          <div className='w-28 h-28' key={technology.name}>
            <BallCanvas icon={technology.icon} />
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default SectionWrapper(Tech, "");
