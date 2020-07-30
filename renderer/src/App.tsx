import React from 'react';
import { IpcRenderer } from 'electron';
const electron = window.require('electron'); // require electron like this in all the files. Don't Use import from 'electron' syntax for importing IpcRender from electron.

let ipcRenderer: IpcRenderer = electron.ipcRenderer;

ipcRenderer.on('response', (_, args: any[]) => {
  console.log(args);
});

function App() {
  return (
    <div className='mt-4 font-bold uppercase text-2xl'>
      Hello from electron with tailwindCSS
    </div>
  );
}

export default App;
