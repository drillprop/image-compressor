import React from 'react';

type Props = {
  inputName: string;
  value: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  max?: number;
};

const RangeInput: React.FC<Props> = ({
  inputName,
  onChange,
  value,
  max = 100,
}) => {
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
      <span className='text-right'>{value}</span>
    </label>
  );
};

export default RangeInput;
