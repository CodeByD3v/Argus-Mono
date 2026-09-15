const { app, BrowserWindow, Menu, ipcMain } = require('electron');

const path = require('path');
const http = require('http');
const fs = require('fs');

// Disable standard menu bar globally
// Menu.setApplicationMenu(null);

let mainWindow = null;
let distWatcher = null;
let reloadTimeout = null;
let isInitialLoaded = false;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1536,
    height: 960,
    minWidth: 1200,
    minHeight: 800,
    frame: false, // Clean frameless design
    backgroundColor: '#050606',
    autoHideMenuBar: true,
    show: false,
    center: true,
    webPreferences: {
      preload: path.join(__dirname, 'electron', 'preload.cjs'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  mainWindow.once('ready-to-show', () => {
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.show();
      mainWindow.focus();
    }
  });

  const loadStaticDist = () => {
    const indexPath = path.join(__dirname, 'dist', 'index.html');
    if (fs.existsSync(indexPath)) {
      mainWindow.loadFile(indexPath).then(() => {
        isInitialLoaded = true;
        setupWatcher();
      }).catch((err) => {
        console.error('Error loading dist/index.html:', err);
      });
    } else {
      console.warn('dist/index.html does not exist yet. Please run `npm run build`.');
    }
  };

  const setupWatcher = () => {
    const distDir = path.join(__dirname, 'dist');
    if (fs.existsSync(distDir) && !distWatcher) {
      try {
        distWatcher = fs.watch(distDir, { recursive: true }, (eventType, filename) => {
          if (filename && (filename.endsWith('.html') || filename.endsWith('.js') || filename.endsWith('.css'))) {
            if (reloadTimeout) clearTimeout(reloadTimeout);
            reloadTimeout = setTimeout(() => {
              if (mainWindow && !mainWindow.isDestroyed() && isInitialLoaded) {
                console.log('Detected dist changes, reloading UI...');
                mainWindow.loadFile(path.join(__dirname, 'dist', 'index.html')).catch((e) => {
                  console.warn('Reload error:', e);
                });
              }
            }, 300);
          }
        });
      } catch (e) {
        console.warn('Could not watch dist directory:', e);
      }
    }
  };

  // Check if live Vite Dev Server is active on localhost:5173
  const req = http.get('http://localhost:5173', (res) => {
    if (res.statusCode === 200 || res.statusCode === 304) {
      console.log('Connected to Vite Live HMR Server on http://localhost:5173');
      mainWindow.loadURL('http://localhost:5173');
    } else {
      loadStaticDist();
    }
  });

  req.on('error', () => {
    loadStaticDist();
  });

  req.setTimeout(500, () => {
    req.destroy();
    loadStaticDist();
  });

  ipcMain.on('window-minimize', () => {
    if (mainWindow && !mainWindow.isDestroyed()) mainWindow.minimize();
  });

  ipcMain.on('window-maximize', () => {
    if (mainWindow && !mainWindow.isDestroyed()) {
      if (mainWindow.isMaximized()) {
        mainWindow.unmaximize();
      } else {
        mainWindow.maximize();
      }
    }
  });

  ipcMain.on('window-close', () => {
    if (mainWindow && !mainWindow.isDestroyed()) mainWindow.close();
  });

  mainWindow.on('closed', () => {
    if (distWatcher) {
      distWatcher.close();
      distWatcher = null;
    }
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
