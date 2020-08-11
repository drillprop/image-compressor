import { AllElectron, IpcRenderer } from 'electron';
import React from 'react';
import UploadForm from './components/UploadForm/UploadForm';

const electron: AllElectron = window.require('electron'); // require electron like this in all the files. Don't Use import from 'electron' syntax for importing IpcRender from electron.

const ipcRenderer: IpcRenderer = electron.ipcRenderer;

ipcRenderer.on('response', (_, args: any[]) => {
  console.log(args);
});

const App = () => {
  return (
    <div className='w-full bg-green-100 h-screen py-6'>
      <div className='text-center w-3/4 mx-auto'>
        <h1 className='font-bold uppercase text-2xl'>image compressor</h1>
        <UploadForm />
      </div>
    </div>
  );
};

export default App;
