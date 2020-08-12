import React from 'react';

const RangesForm = () => {
  return (
    <form className='form'>
      <h2 className='mt-5 form-heading'>CHANGE SIZE</h2>
      <label className='ranges-label'>
        <span className='text-left'>width</span>
        <input type='range' name='' id='' />
        <span className='text-right'>2330px</span>
      </label>
      <label className='ranges-label'>
        <span className='text-left '>height</span>
        <input type='range' name='' id='' />
        <span className='text-right '>2330px</span>
      </label>
      <h2 className='text-lg form-heading'>CHANGE QUALITY</h2>
      <label className='ranges-label'>
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
      <button className='btn' type='submit'>
        COMPRESS
      </button>
    </form>
  );
};

export default RangesForm;
