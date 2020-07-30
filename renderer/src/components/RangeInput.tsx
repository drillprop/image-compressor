import React from 'react';

type Props = {
  inputName: string;
  wFull?: boolean;
};

const RangeInput: React.FC<Props> = ({ inputName, wFull }) => {
  return (
    <label className={`mt-6 ${wFull && 'w-full'}`}>
      <span className='block capitalize'>{inputName}</span>
      <input
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
