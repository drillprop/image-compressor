import {
  app,
  BrowserWindow,
  Menu,
  MenuItem,
  MenuItemConstructorOptions,
  ipcMain,
  dialog,
  protocol,
} from 'electron';
import * as path from 'path';
import sharp from 'sharp';

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
      webSecurity: false,
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
  protocol.registerFileProtocol('file', (request, callback) => {
    const pathname = request.url.replace('file:///', '');
    callback(pathname);
  });

  initializeAppWindow();

  const mainMenu = Menu.buildFromTemplate(menu);
  Menu.setApplicationMenu(mainMenu);
});

ipcMain.on('change:directory', async () => {
  if (!appWindow) return;
  const directoryDialog = await dialog.showOpenDialog(appWindow, {
    properties: ['openDirectory'],
  });
  if (!directoryDialog.canceled) {
    const [outputFolder] = directoryDialog.filePaths;
    appWindow.webContents.send('change:directory', outputFolder);
  }
});

ipcMain.on('image:upload', async () => {
  if (!appWindow) return;
  const fileDialog = await dialog.showOpenDialog(appWindow, {
    properties: ['openFile'],
    filters: [{ name: 'Images', extensions: ['jpg', 'png', 'jpeg', 'gif'] }],
  });
  if (!fileDialog.canceled) {
    const filePath = fileDialog.filePaths[0];
    const img = sharp(filePath);
    const { width, height } = await img.metadata();

    appWindow.webContents.send('image:upload', { filePath, width, height });
  }
});
