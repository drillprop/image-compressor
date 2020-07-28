import { BrowserWindow } from 'electron';
import path from 'path';

export const initializeAboutWindow = () => {
  const aboutWindow = new BrowserWindow({
    title: 'About',
    width: 400,
    height: 600,
    resizable: false,
    closable: true,
  });

  aboutWindow.loadFile(path.join(__dirname, './about.html'));
};
