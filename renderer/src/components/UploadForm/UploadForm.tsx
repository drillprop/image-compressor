import React from 'react';

const UploadForm = () => {
  return (
    <form className='flex flex-col mt-10 items-center'>
      <h2 className='text-xl font-medium'>UPLOAD AN IMAGE</h2>
      <label className='mt-5 cursor-pointer w-full py-4 bg-blue-700 hover:bg-blue-800 text-white font-medium'>
        <span className='block'>Choose an Image</span>
        <input className='hidden' type='file' name='file' id='file' />
      </label>
      <h2 className='mt-3 text-xl font-medium'>OR</h2>
      <div
        className='mt-5 w-full h-48 flex items-center justify-center
       bg-blue-500 text-white font-medium'
      >
        Drag and drop file here
      </div>
    </form>
  );
};

export default UploadForm;
