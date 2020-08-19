import { AllElectron } from 'electron';
import React, { useEffect, useState } from 'react';
import { ReactComponent as ImageIcon } from '../../assets/image-icon.svg';
import { useGlobalDispatch } from '../../context/GlobalContext';
import DragAndDrop from './DragAndDrop/DragAndDrop';
import ImagePreview from './ImagePreview/ImagePreview';

const { ipcRenderer }: AllElectron = window.require('electron');

const initialState = {
  imgPath: '',
  width: 0,
  height: 0,
};

const UploadForm = () => {
  const [imgFile, setimgFile] = useState(initialState);
  const dispatch = useGlobalDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (imgFile) dispatch({ type: 'SET_FILE', payload: imgFile });
  };

  useEffect(() => {
    ipcRenderer.on('image:upload', (_, imgFile) => {
      setimgFile({ ...imgFile });
    });
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    ipcRenderer.send('image:upload');
  };

  return (
    <form className='form' onSubmit={handleSubmit}>
      {imgFile.imgPath ? (
        <ImagePreview
          imgPath={imgFile.imgPath}
          removeImage={() => setimgFile(initialState)}
        />
      ) : (
        <>
          <h2 className='form-heading'>UPLOAD AN IMAGE</h2>
          <label className='flex items-center justify-center rounded mt-3 cursor-pointer w-full py-4 bg-green-700 hover:bg-green-800 text-white font-medium'>
            <div className='mr-2'>
              <ImageIcon />
            </div>
            <span>Choose an image</span>
            <input
              onClick={handleClick}
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
