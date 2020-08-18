import React from 'react';
import slash from 'slash';
import { ReactComponent as CloseIcon } from '../../../assets/close-icon.svg';

type Props = {
  filePath: string;
  removeImage: () => void;
};

const ImagePreview = ({ filePath, removeImage }: Props) => {
  const fileName = slash(filePath).split('/').pop();
  const handleRemoveImg = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    removeImage();
  };
  return (
    <>
      <h2 className='form-heading'>UPLOADED IMAGE</h2>
      <div className='mt-4 w-full'>
        <div className='border border-gray-500 rounded-sm w-full py-32 relative'>
          <img src={slash(filePath)} alt={fileName} />
          <button
            className='absolute top-0 right-0 mr-2 mt-2'
            onClick={handleRemoveImg}
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
