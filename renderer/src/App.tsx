import React from 'react';
import { IpcRenderer } from 'electron';
import RangeInput from './components/RangeInput';
import FileInput from './components/FileInput';
const electron = window.require('electron'); // require electron like this in all the files. Don't Use import from 'electron' syntax for importing IpcRender from electron.

let ipcRenderer: IpcRenderer = electron.ipcRenderer;

ipcRenderer.on('response', (_, args: any[]) => {
  console.log(args);
});

function App() {
  return (
    <div className='text-center w-3/4 mx-auto'>
      <h1 className='mt-4 font-bold uppercase text-2xl'>image compressor</h1>
      <form className='flex flex-col mt-10 items-center'>
        <FileInput />
        <div className='mt-6 flex justify-between w-full'>
          <RangeInput inputName='width' />
          <RangeInput inputName='height' />
        </div>
        <RangeInput wFull inputName='quality' />
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
}

export default App;
