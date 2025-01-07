import { BrowserRouter } from "react-router-dom";
import { About, Contact, Experience, Feedbacks, Hero, Navbar, Tech, Works, StarsCanvas } from "./components";
import ParticleBackground from "./utils/Particle.jsx"

const App = () => {
  return (
    <BrowserRouter>
      <div className='relative z-0 bg-primary'>
        {/* Wrapper untuk Navbar dan Hero dengan ParticleBackground */}
        <div className="relative">
          {/* ParticleBackground sebagai absolute positioned background */}
          <div className="absolute inset-0">
            <ParticleBackground 
              dotColor="#5cbdaa"
              lineColor="#5cbdaa"
              parallax={true}
              parallaxMultiplier={5}
            />
          </div>
          
          {/* Content di atas particle background */}
          <div className="relative z-10">
            <Navbar />
            <Hero />
          </div>
        </div>

        {/* Sections lainnya */}
        <About />
        {/* <Experience /> */}
        <Tech />
        <Works />
        {/* <Feedbacks /> */}
        <div className='relative z-0'>
          <Contact />
          <StarsCanvas />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;