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
import imagemin from 'imagemin';
import jpegplugin from 'imagemin-mozjpeg';
import pngplugin from 'imagemin-pngquant';
import slash from 'slash';

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

ipcMain.on(
  'image:compress',
  async (_, { quality, width, height, filePath, outputFolder }) => {
    if (!appWindow) return;
    const fileName = slash(filePath).split('/').pop()?.split('.').shift();
    const newFilePath = slash(`${outputFolder}/${fileName}-compressed.jpg`);

    try {
      // resize with sharp
      await sharp(filePath).resize({ width, height }).toFile(newFilePath);

      // change quality with imagemin
      await imagemin([newFilePath], {
        destination: outputFolder,
        plugins: [
          jpegplugin({ quality }),
          pngplugin({ quality: [quality / 10, quality / 10] }),
        ],
      });
    } catch (error) {
      console.log(error);
    }

    appWindow.webContents.send('image:compress', newFilePath);
  }
);
