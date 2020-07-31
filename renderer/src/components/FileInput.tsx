import React from 'react';

type Props = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const FileInput: React.FC<Props> = ({ value, onChange }) => {
  const fileName = value.split('\\').reverse()[0];
  return (
    <label
      className={`cursor-pointer w-full py-4 bg-gray-700 ${
        fileName && 'bg-gray-800'
      } hover:bg-gray-800 text-white font-medium`}
    >
      <span className='block'>{fileName ? fileName : 'Choose an image'}</span>
      <input
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
