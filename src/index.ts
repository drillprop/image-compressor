import {
  app,
  BrowserWindow,
  Menu,
  MenuItem,
  MenuItemConstructorOptions,
} from 'electron';
import path from 'path';

const isDev = process.env.NODE_ENV === 'development';

const menu: (MenuItemConstructorOptions | MenuItem)[] = [
  {
    role: 'fileMenu',
  },
];

const initializeAppWindow = () => {
  const appWindow = new BrowserWindow({
    width: 400,
    height: 600,
    resizable: isDev ? true : false,
    x: isDev ? -1000 : undefined, // show app in second screen
    y: isDev ? 0 : undefined,
  });

  appWindow.loadFile(path.join(__dirname, '../index.html'));
};

app.on('ready', () => {
  initializeAppWindow();

  const mainMenu = Menu.buildFromTemplate(menu);
  Menu.setApplicationMenu(mainMenu);
});
