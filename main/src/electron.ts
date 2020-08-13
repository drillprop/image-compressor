import {
  app,
  BrowserWindow,
  Menu,
  MenuItem,
  MenuItemConstructorOptions,
  ipcMain,
  dialog,
} from 'electron';
import * as path from 'path';

const isDev = process.env.NODE_ENV === 'development';

let appWindow: BrowserWindow;

const devMenu: (MenuItemConstructorOptions | MenuItem)[] = [
  {
    label: 'Developer',
    submenu: [
      { role: 'reload' },
      { role: 'forceReload' },
      { type: 'separator' },
      { role: 'toggleDevTools' },
    ],
  },
];

const menu: (MenuItemConstructorOptions | MenuItem)[] = [
  {
    role: 'fileMenu',
  },
  ...(isDev ? devMenu : []),
];

const initializeAppWindow = () => {
  appWindow = new BrowserWindow({
    width: 400,
    height: 600,
    resizable: isDev ? true : false,
    x: isDev ? -600 : undefined, // show app in second screen
    y: isDev ? 0 : undefined,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    },
  });

  if (isDev) appWindow.webContents.openDevTools({ mode: 'undocked' });

  appWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );
  appWindow.on('closed', () => appWindow.destroy());
};

app.on('ready', () => {
  initializeAppWindow();

  const mainMenu = Menu.buildFromTemplate(menu);
  Menu.setApplicationMenu(mainMenu);
});

ipcMain.on('change:directory', async (e, options) => {
  if (!appWindow) return;
  const directory = await dialog.showOpenDialog(appWindow, {
    properties: ['openDirectory'],
  });
  if (!directory.canceled) {
    const [outputFolder] = directory.filePaths;
    appWindow.webContents.send('change:directory', outputFolder);
  }
});
