import React from 'react';
import { AllElectron } from 'electron';

const { ipcRenderer }: AllElectron = window.require('electron');

type Props = {
  value: string;
};

const ChangeOutputInput = ({ value }: Props) => {
  const handleChangeOutput = (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    e.preventDefault();
    ipcRenderer.send('change:directory');
  };

  return (
    <label className='mt-1 w-full font-medium m-auto'>
      <span className='text-sm'>OUTPUT FOLDER</span>
      <div className='m-auto rounded mt-1 cursor-pointer w-10/12 py-3 font-medium border-2 border-dashed border-green-400 '>
        <span>{value}</span>
        <input
          className='hidden'
          name='directory'
          id='directory'
          type='file'
          onClick={handleChangeOutput}
        />
      </div>
    </label>
  );
};

export default ChangeOutputInput;
