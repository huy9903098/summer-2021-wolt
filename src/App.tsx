import React, { useRef, useState, useEffect } from 'react';
import { Slider } from './component/Slider/Slider';
import discovery from './discovery_page.json';
import './App.scss';

const App: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const handleResize = () => {
      if (ref.current) {
        const cardWidth =
          ref.current.offsetWidth / 3 - 20 > 270
            ? ref.current.offsetWidth / 3 - 20
            : 270;
        setWidth(cardWidth);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [ref.current]);
  return (
    <div className="discovery-container">
      {discovery.sections.map((item, index) => (
        <div key={index} ref={ref} className="slider-container">
          {width !== 0 && <Slider item={item} width={width} />}
        </div>
      ))}
    </div>
  );
};

export default App;
