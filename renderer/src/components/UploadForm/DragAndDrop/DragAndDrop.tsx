import React from 'react';
import { ReactComponent as UploadIcon } from '../../../assets/upload-icon.svg';

const DragAndDrop = () => {
  return (
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
  );
};

export default DragAndDrop;
