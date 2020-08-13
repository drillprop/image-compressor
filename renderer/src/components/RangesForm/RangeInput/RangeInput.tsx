import React from 'react';

type Props = {
  inputName: string;
  value: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const RangeInput: React.FC<Props> = ({ inputName, onChange, value }) => {
  return (
    <label className='ranges-label'>
      <span className='text-left'>{inputName}</span>
      <input type='range' value={value} name={inputName} onChange={onChange} />
      <span className='text-right'>{value}</span>
    </label>
  );
};

export default RangeInput;
