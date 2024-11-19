import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HeroSection from './components/HeroSection/Hero';
import LearnMorePage from './components/LearnMore/LearnMore';
import StartJourneyPage from './components/StartJourney/StartJourney';
import './App.css';

function App() {
    return (
        <Routes>
            <Route path="/" element={<HeroSection />} />
            <Route path="/learn-more" element={<LearnMorePage />} />
            <Route path="/start-journey" element={<StartJourneyPage />} />
        </Routes>
    );
}

export default App;