import React from 'react';

type Props = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const FileInput: React.FC<Props> = ({ value, onChange }) => {
  return (
    <label className='cursor-pointer w-full py-4 bg-gray-800 text-white font-medium'>
      <span className='block'>Choose an image</span>
      <input
        value={value}
        className='hidden'
        onChange={onChange}
        type='file'
        name='file'
        id='file'
      />
    </label>
  );
};

export default FileInput;
