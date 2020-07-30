import React from 'react';

const FileInput = () => {
  return (
    <label className='cursor-pointer w-full py-4 bg-gray-800 text-white font-medium'>
      <span className='block'>Choose an image</span>
      <input className='hidden' type='file' name='file' id='file' />
    </label>
  );
};

export default FileInput;
