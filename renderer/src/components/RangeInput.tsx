import React from 'react';

type Props = {
  inputName: string;
  wFull?: boolean;
  value: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const RangeInput: React.FC<Props> = ({ inputName, wFull, onChange, value }) => {
  return (
    <label className={`mt-6 ${wFull && 'w-full'}`}>
      <span className='block capitalize'>{inputName}</span>
      <input
        onChange={onChange}
        value={value}
        className='bg-gray-500 block w-full mt-3'
        min='0'
        max='100'
        type='range'
        name={inputName}
      />
    </label>
  );
};

export default RangeInput;
