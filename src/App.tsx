import React from 'react';
import { Slider } from './component/Slider/Slider';
import discovery from './discovery_page.json';
import './App.scss';

const App: React.FC = () => {
  return (
    <div className="discovery-container">
      {discovery.sections.map((item, index) => (
        <div key={index} className="slider-container">
          <Slider item={item} />
        </div>
      ))}
    </div>
  );
};

export default App;
