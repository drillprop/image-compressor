import { AllElectron, IpcRenderer } from 'electron';
import React from 'react';
import RangesForm from './components/RangesForm/RangesForm';
import SuccessView from './components/SuccessView/SuccessView';
import UploadForm from './components/UploadForm/UploadForm';
import { useGlobalState } from './context/GlobalContext';

const electron: AllElectron = window.require('electron'); // require electron like this in all the files. Don't Use import from 'electron' syntax for importing IpcRender from electron.

const ipcRenderer: IpcRenderer = electron.ipcRenderer;

ipcRenderer.on('response', (_, args: any[]) => {
  console.log(args);
});

const App = () => {
  const state = useGlobalState();
  return (
    <div className='w-full bg-green-100 h-screen py-6'>
      <div className='text-center w-3/4 mx-auto'>
        <h1 className='font-bold uppercase text-2xl'>image compressor</h1>
        {state.step === 1 && <UploadForm />}
        {state.step === 2 && <RangesForm />}
        {state.step === 3 && <SuccessView />}
      </div>
    </div>
  );
};

export default App;
