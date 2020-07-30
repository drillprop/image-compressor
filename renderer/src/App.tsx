import React, { useState } from 'react';
import { IpcRenderer, AllElectron } from 'electron';
import RangeInput from './components/RangeInput';
import FileInput from './components/FileInput';
import useRangeInput from './hooks/useRangeInput';

const electron: AllElectron = window.require('electron'); // require electron like this in all the files. Don't Use import from 'electron' syntax for importing IpcRender from electron.

let ipcRenderer: IpcRenderer = electron.ipcRenderer;

ipcRenderer.on('response', (_, args: any[]) => {
  console.log(args);
});

const App = () => {
  const { handleRanges, ranges } = useRangeInput({
    width: 0,
    height: 0,
    quality: 0,
  });

  return (
    <div className='text-center w-3/4 mx-auto'>
      <h1 className='mt-4 font-bold uppercase text-2xl'>image compressor</h1>
      <form className='flex flex-col mt-10 items-center'>
        <FileInput />
        <div className='mt-6 flex justify-between w-full'>
          <RangeInput
            onChange={handleRanges}
            value={ranges.width}
            inputName='width'
          />
          <RangeInput
            onChange={handleRanges}
            value={ranges.height}
            inputName='height'
          />
        </div>
        <RangeInput
          onChange={handleRanges}
          value={ranges.quality}
          wFull
          inputName='quality'
        />
        <button
          className='mt-10 w-full py-2 cursor-not-allowed bg-gray-500 text-white font-medium'
          type='submit'
          disabled
        >
          Resize
        </button>
      </form>
    </div>
  );
};

export default App;
