// components/ui/Slider.tsx
import React, { useEffect, useRef, useState } from 'react';

interface SliderProps {
  min: number;
  max: number;
  step: number;
  value: [number, number];
  onValueChange: (value: [number, number]) => void;
}

const Slider: React.FC<SliderProps> = ({ min, max, step, value, onValueChange }) => {
  const [minVal, maxVal] = value;
  const range = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (range.current) {
      const minPercent = ((minVal - min) / (max - min)) * 100;
      const maxPercent = ((maxVal - min) / (max - min)) * 100;
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, maxVal, min, max]);

  return (
    <div className="relative h-2">
      <div className="absolute h-1 w-full rounded-full bg-gray-200" />
      <div
        ref={range}
        className="absolute h-1 rounded-full bg-blue-600"
      />
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={minVal}
        onChange={(e) => {
          const value = Math.min(Number(e.target.value), maxVal - 1);
          onValueChange([value, maxVal]);
        }}
        className="absolute w-full -top-1 h-1 appearance-none pointer-events-none bg-transparent"
      />
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={maxVal}
        onChange={(e) => {
          const value = Math.max(Number(e.target.value), minVal + 1);
          onValueChange([minVal, value]);
        }}
        className="absolute w-full -top-1 h-1 appearance-none pointer-events-none bg-transparent"
      />
    </div>
  );
};

export default Slider;