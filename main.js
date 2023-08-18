const { app, BrowserWindow, Menu } = require('electron')
const path = require("path")
const os = require("os")

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 500,
    backgroundColor: "#234",
    show: true,
    icon: path.join(__dirname, "assets", "icon.png"),
    webPreferences: {
      nodeIntegration: true,
    }
  })

  win.loadFile('./src/index.html')

  win.webContents.openDevTools()

  // Menu da aplicação
  const menuTemplate = [
    {
      label: app.name,
      submenu: [
        { label: "Preferências", click: () => { } },
        { label: "Pasta de destino", click: () => { } }
      ]
    },
    {
      label: "Arquivo",
      submenu: [{ role: "close" }]
    }

  ]
  const menu = Menu.buildFromTemplate(menuTemplate)
  Menu.setApplicationMenu(menu)

}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  createWindow()
})