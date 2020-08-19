import React from 'react';

type Props = {
  inputName: string;
  value: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  max?: number;
  bottomTooltip?: string;
};

const RangeInput = React.memo<Props>(
  ({ inputName, onChange, value, max = 100, bottomTooltip }) => {
    return (
      <label className='ranges-label'>
        <span className='text-left'>{inputName}</span>
        <input
          max={max}
          type='range'
          value={value}
          name={inputName}
          onChange={onChange}
          step={1}
        />
        <span className='text-right'>{bottomTooltip}</span>
      </label>
    );
  }
);

export default RangeInput;
