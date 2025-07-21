import './ProgressBar.scss';
import {useRef, forwardRef, useImperativeHandle} from 'react';
import React from 'react';
import classNames from 'classnames';

type SliderProps = {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number) => void;
  className?: string;
}

export type SliderHandle = {
  setProgress: (percent: number) => void;
};

export const ProgressBar = forwardRef<SliderHandle, SliderProps>((props, ref) => {
  const {
    value,
    min,
    max,
    step,
    className,
    onChange
  } = props;
  const fillRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    setProgress: (percent: number) => {
      if (fillRef.current) {
        fillRef.current.style.transform = `translateX(${percent - 100}%)`;
      }
    }
  }));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    onChange(newValue);
  };

  return (
    <div className={classNames('progress', className)}>
      <div className="progress__track">
        <div className="progress__fill" ref={fillRef}></div>
      </div>
      <input
        className="progress-input"
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
})
