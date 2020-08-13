import React, { useState } from 'react';
import { ReactComponent as ImageIcon } from '../../assets/image-icon.svg';
import { useGlobalDispatch } from '../../context/GlobalContext';
import DragAndDrop from './DragAndDrop/DragAndDrop';
import ImagePreview from './ImagePreview/ImagePreview';

const UploadForm = () => {
  const [filePath, setFilePath] = useState('');
  const dispatch = useGlobalDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (filePath) dispatch({ type: 'SET_FILE_PATH', filePath });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilePath(e.currentTarget.value);
  };

  return (
    <form className='form' onSubmit={handleSubmit}>
      {filePath ? (
        <ImagePreview filePath={filePath} removeImage={() => setFilePath('')} />
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
