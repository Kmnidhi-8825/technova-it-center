import React from 'react'
import { Navbar } from '../components/Navbar'
import {Hero} from '../components/Hero'
import { Stats } from '../components/Stats'
import { FeaturedCourses } from '../components/FeaturedCourses'
import { WhyChooseUs } from '../components/WhyChooseUs'
import { About } from '../components/About'
import { Services } from '../components/Services'
import { Testimonials } from '../components/Testimonials'
import {Contact} from '../components/Contact'
import {Footer} from '../components/Footer'

export const Home = () => {
  return (
<>
<Navbar/>
<Hero/>
<Stats/>
<FeaturedCourses/>
<WhyChooseUs/>
<About/>
<Services/>
<Testimonials/>
<Contact/>
<Footer/>
</>
  )
}





// import { Navbar } from "../components/Navbar";
// import { Hero } from "../components/Hero";
// import { Stats } from "../components/Stats";
// import { FeaturedCourses } from "../components/FeaturedCourses";
// import { About } from "../components/About";
// import { WhyChooseUs } from "../components/WhyChooseUs";
// import { Services } from "../components/Services";
// import { Placement } from "../components/Placement";
// import { Testimonials } from "../components/Testimonials";
// import { FAQ } from "../components/FAQ";
// import { Contact } from "../components/Contact";
// import { Footer } from "../components/Footer";

// export const Home = () => {
//   return (
//     <>
//       <Navbar />
//       <Hero />
//       <Stats />
//       <FeaturedCourses />
//       <About />
//       <WhyChooseUs />
//       <Services />
//       <Placement />
//       <Testimonials />
//       <FAQ />
//       <Contact />
//       <Footer />
//     </>
//   );
// };