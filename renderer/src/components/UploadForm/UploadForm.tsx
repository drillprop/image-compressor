import React from 'react';
import { ReactComponent as ImageIcon } from '../../assets/image-icon.svg';
import { ReactComponent as UploadIcon } from '../../assets/upload-icon.svg';

const UploadForm = () => {
  return (
    <form className=' mt-5 flex flex-col items-center'>
      <h2 className='text-lg font-bold'>UPLOAD AN IMAGE</h2>
      <label className=' flex items-center justify-center rounded mt-3 cursor-pointer w-10/12 py-4 bg-green-700 hover:bg-green-800 text-white font-medium'>
        <div className='mr-2'>
          <ImageIcon />
        </div>
        <span> Choose an Image</span>
        <input className='hidden' type='file' name='file' id='file' />
      </label>
      <h2 className='mt-5 text-xl font-bold'>OR</h2>
      <div
        className='rounded mt-3 w-full h-48 flex items-center justify-center
         bg-green-600 text-white font-medium'
      >
        <div className='rounded w-11/12 h-40 flex items-center justify-center border-2 border-dashed border-green-400'>
          <div className='mr-2'>
            <UploadIcon />
          </div>
          Drag and drop file here
        </div>
      </div>
    </form>
  );
};

export default UploadForm;
