import React, { useRef, useEffect } from 'react';
import { useGlobalContext } from '../../context/GlobalContext';

const RangesForm = () => {
  const { state, dispatch } = useGlobalContext();
  const { width, height, quality } = state;
  const outputInputRef = useRef<HTMLInputElement>(null);

  const handleChangeRange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    if (name === 'quality' || name === 'width' || name === 'height') {
      dispatch({
        type: 'CHANGE_FILE_PROPERTY',
        property: name,
        value: parseInt(value),
      });
    }
  };

  return (
    <form className='form'>
      <h2 className='form-heading'>CHANGE SIZE</h2>
      <label className='ranges-label'>
        <span className='text-left'>width</span>
        <input
          type='range'
          value={width}
          name='width'
          onChange={handleChangeRange}
        />
        <span className='text-right'>{width}</span>
      </label>
      <label className='ranges-label'>
        <span className='text-left '>height</span>
        <input
          type='range'
          value={height}
          name='height'
          onChange={handleChangeRange}
        />
        <span className='text-right '>{height}</span>
      </label>
      <h2 className='form-heading'>CHANGE QUALITY</h2>
      <label className='ranges-label'>
        <span className='text-left '>quality</span>
        <input
          type='range'
          value={quality}
          name='quality'
          onChange={handleChangeRange}
        />
        <span className='text-right'>{quality}</span>
      </label>
      <label className='mt-1 w-full font-medium m-auto'>
        <span className='text-sm'>OUTPUT FOLDER</span>
        <div className='m-auto rounded mt-1 cursor-pointer w-10/12 py-3 font-medium border-2 border-dashed border-green-400 '>
          <span>c:/image-compressor</span>
          <input
            className='hidden'
            name='directory'
            id='directory'
            ref={outputInputRef}
          />
        </div>
      </label>
      <button className='btn' type='submit'>
        COMPRESS
      </button>
    </form>
  );
};

export default RangesForm;
