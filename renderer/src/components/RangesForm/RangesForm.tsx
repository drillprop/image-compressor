import React from 'react';

const RangesForm = () => {
  return (
    <form className='flex flex-col mt-5 items-center bg-g'>
      <h2 className='mt-5 text-lg font-bold'>CHANGE SIZE</h2>
      <label className='flex flex-col rounded mt-1 cursor-pointer w-full font-medium text-sm'>
        <span className='text-left'>width</span>
        <input type='range' name='' id='' />
        <span className='text-right'>2330px</span>
      </label>
      <label className='flex flex-col rounded mt-1 cursor-pointer w-full font-medium text-sm'>
        <span className='text-left '>height</span>
        <input type='range' name='' id='' />
        <span className='text-right '>2330px</span>
      </label>
      <h2 className='text-lg font-bold mt-2'>CHANGE QUALITY</h2>
      <label className='flex flex-col rounded mt-1 cursor-pointer w-full font-medium text-sm'>
        <span className='text-left '>quality</span>
        <input type='range' name='' id='' />
        <span className='text-right'>80%</span>
      </label>
      <label className='mt-3 w-full font-medium m-auto'>
        <span className='text-sm'>OUTPUT FOLDER</span>
        <div className='m-auto rounded mt-1 cursor-pointer w-10/12 py-3 font-medium border-2 border-dashed border-green-400 '>
          <span>c:/image-compressor</span>
          <input className='hidden' type='file' name='file' id='file' />
        </div>
      </label>
      <button
        className='mt-8 bg-green-700 text-white font-medium p-3 rounded w-full'
        type='submit'
      >
        compress
      </button>
    </form>
  );
};

export default RangesForm;
