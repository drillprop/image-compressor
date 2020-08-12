import React from 'react';
import slash from 'slash';
import { ReactComponent as CloseIcon } from '../../../assets/close-icon.svg';
import { useGlobalContext } from '../../../context/GlobalContext';

const ImagePreview = () => {
  const { dispatch, state } = useGlobalContext();
  const { path } = state;
  const fileName = slash(path).split('/').pop();
  return (
    <>
      <h2 className='form-heading'>UPLOADED IMAGE</h2>
      <div className='mt-4 w-full'>
        <div className='border border-gray-500 rounded-sm w-full py-32 relative'>
          <button
            className='absolute top-0 right-0 mr-2 mt-2'
            onClick={() => dispatch({ type: 'CHANGE_FILE', path: '' })}
          >
            <CloseIcon />
          </button>
          {fileName}
        </div>
        <button type='submit' className='btn'>
          UPLOAD
        </button>
      </div>
    </>
  );
};

export default ImagePreview;
