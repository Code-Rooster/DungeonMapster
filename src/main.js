const { app, BrowserWindow } = require("electron");
const path = require("path");

app.whenReady().then(() => {
    createWindow();
});

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 500
    })

    win.loadFile("./src/pages/index.html");
}