import { app, BrowserWindow } from 'electron';

const initializeAppWindow = () => {
  const appWindow = new BrowserWindow({
    width: 400,
    height: 600,
  });
};

app.on('ready', initializeAppWindow);
