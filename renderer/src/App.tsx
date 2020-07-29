import React from 'react';
import { IpcRenderer } from 'electron';
const electron = window.require('electron'); // require electron like this in all the files. Don't Use import from 'electron' syntax for importing IpcRender from electron.

let ipcRenderer: IpcRenderer = electron.ipcRenderer;

ipcRenderer.on('response', (_, args: any[]) => {
  console.log(args);
});

function App() {
  return <div className='App'>Hello from electron</div>;
}

export default App;
