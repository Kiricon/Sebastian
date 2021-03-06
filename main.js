const {app, BrowserWindow, globalShortcut, Tray, Menu} = require('electron')
const remote = require("electron").remote;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;
let settingsWin;
let tray = null;

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
  		width: 400,
  		height: 56,
  		frame:false,
  		center: true,
  		skipTaskbar: true,
  		transparent: true,
  		alwaysOnTop: true
  	})

  // and load the index.html of the app.
  win.loadURL(`file://${__dirname}/pages/search.html`);
  tray = new Tray('icon.png');
  tray.on('click', () => {
    settingsWin = new BrowserWindow({
      height: 800,
      width: 1200,
      center: true,
      show: false,
      title: "Sebastion Settings"
    });
    settingsWin.loadURL(`file://${__dirname}/pages/settings.html`);
    settingsWin.once('ready-to-show', () => {
      settingsWin.show()
    })

  })
  tray.setHighlightMode("never");
  // Open the DevTools.
  win.webContents.openDevTools()

  //Wait for window to load before displaying
  /*
  win.once('ready-to-show', () => {
  	win.show()
	}) */
  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
  // Register a 'CommandOrControl+X' shortcut listener.
  const ret = globalShortcut.register('CommandOrControl+J', () => {
    win.show();
  })
}
app.dock.hide();
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)
// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
