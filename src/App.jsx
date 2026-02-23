import { useState, Suspense, lazy } from 'react';
// import AutoScrollHandler from './components/AutoScrollHandler';
import Header from './components/Header';
// import Hero from './components/Hero';
// Lazy load heavy components
const SplineBot = lazy(() => import('./components/SplineBot'));
const MediaShowcase = lazy(() => import('./components/MediaShowcase'));

import WhatAitelzCovers from './components/WhatAitelzCovers';
import BusinessUseCases from './components/BusinessUseCases';
import CostComparison from './components/CostComparison';
import Pricing from './components/Pricing';
import BusinessSolution from './components/BusinessSolution';
import SetupSteps from './components/SetupSteps';
import HowToGetStarted from './components/HowToGetStarted';
import InteractiveFlow from './components/InteractiveFlow';
import CTA from './components/CTA';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      {/* <AutoScrollHandler /> */}
      <Header />
      <Suspense fallback={<div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading 3D Experience...</div>}>
        <SplineBot />
      </Suspense>
      {/* <Hero /> - Temporarily removed, file kept */}
      <Suspense fallback={<div style={{ height: '200px' }}></div>}>
        <MediaShowcase />
      </Suspense>
      <div style={{ position: 'relative' }}>
        {/* Keep content interactive and native cursor visible */}
        <div style={{ pointerEvents: 'auto' }}>
          <WhatAitelzCovers />
          <BusinessUseCases />
          <HowToGetStarted />
          <InteractiveFlow />
          <BusinessSolution />
          <SetupSteps />
          <Pricing />
          <CostComparison />
          <CTA />
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
