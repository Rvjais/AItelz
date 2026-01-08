import { useState } from 'react';
import InteractiveCursor from './components/InteractiveCursor';
import AutoScrollHandler from './components/AutoScrollHandler';
import Header from './components/Header';
import Hero from './components/Hero';
import MediaShowcase from './components/MediaShowcase';
import WhatAitelzCovers from './components/WhatAitelzCovers';
import CostComparison from './components/CostComparison';
import Pricing from './components/Pricing';
import CustomDashboard from './components/CustomDashboard';
import HowToGetStarted from './components/HowToGetStarted';
import InteractiveFlow from './components/InteractiveFlow';
import CTA from './components/CTA';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <AutoScrollHandler />
      <Header />
      <Hero />
      <MediaShowcase />
      <div style={{ position: 'relative' }}>
        <InteractiveCursor />
        <div style={{ position: 'relative', zIndex: 1, pointerEvents: 'none' }}>
          {/* pointerEvents none on wrapper to let clicks pass to cursor if needed, but wait, 
                 actually we want the content to be interactive. 
                 The cursor is purely visual background. 
                 So content wrapper should have pointerEvents: 'auto' or default. 
                 If I set pointerEvents: none, buttons won't work.
                 So keeping default. 
                 The cursor canvas has pointer-events: none in CSS already.
             */}
          <div style={{ pointerEvents: 'auto' }}>
            <WhatAitelzCovers />
            <HowToGetStarted />
            <CustomDashboard />
            <InteractiveFlow />
            <Pricing />
            <CostComparison />
            <CTA />
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
