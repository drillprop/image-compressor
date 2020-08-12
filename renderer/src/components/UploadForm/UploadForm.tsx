import React from 'react';
import slash from 'slash';
import { ReactComponent as ImageIcon } from '../../assets/image-icon.svg';
import { useGlobalContext } from '../../context/GlobalContext';
import ImagePreview from './ImagePreview/ImagePreview';
import DragAndDrop from './DragAndDrop/DragAndDrop';

const UploadForm = () => {
  const { state, dispatch } = useGlobalContext();
  const { path } = state;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (path) {
      dispatch({ type: 'INC_STEP' });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'CHANGE_FILE', path: e.currentTarget.value });
  };

  return (
    <form className='form' onSubmit={handleSubmit}>
      {path ? (
        <ImagePreview />
      ) : (
        <>
          <h2 className='form-heading'>UPLOAD AN IMAGE</h2>
          <label className='flex items-center justify-center rounded mt-3 cursor-pointer w-full py-4 bg-green-700 hover:bg-green-800 text-white font-medium'>
            <div className='mr-2'>
              <ImageIcon />
            </div>
            <span>Choose an image</span>
            <input
              onChange={handleChange}
              accept='.jpeg, .png, .jpg, .bmp'
              className='hidden'
              type='file'
              name='file'
              id='file'
            />
          </label>
          <DragAndDrop />
        </>
      )}
    </form>
  );
};

export default UploadForm;
