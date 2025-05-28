import React from 'react';
import Navbar from './Navbar';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from '../pages/Home';
import Programs from '../pages/Programs';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Progress from '../pages/Progress';
import DailyInput from '../pages/DailyInput';


const App = () => {
  const location = useLocation();

  return (
    <div>
      {/* Show Navbar only on home page */}
      {location.pathname === '/' && <Navbar />}

      <div className="min-h-[70vh]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/daily-input" element={<DailyInput />} />

        </Routes>
      </div>
    </div>
  );
};

export default App;
