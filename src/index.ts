import { app, BrowserWindow } from 'electron';
import path from 'path';

const initializeAppWindow = () => {
  const appWindow = new BrowserWindow({
    width: 400,
    height: 600,
  });
  appWindow.loadFile(path.join(__dirname, '../index.html'));
};

app.on('ready', initializeAppWindow);
