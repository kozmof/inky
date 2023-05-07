// const {remote} = require('electron')
const remote = require('@electron/remote');
const {Menu, MenuItem} = remote

const menu = new Menu()
menu.append(new MenuItem({ role: 'cut' }))
menu.append(new MenuItem({ role: 'copy' }))
menu.append(new MenuItem({ role: 'paste' }))
menu.append(new MenuItem({ role: 'selectall' }))

window.addEventListener('contextmenu', (e) => {
    e.preventDefault()
    menu.popup(remote.getCurrentWindow())
}, false);