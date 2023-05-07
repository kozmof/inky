// const {
//     contextBridge,
//     ipcRenderer
// } = require("electron");

const i18n = require('./i18n.js');

// This is only works for contextIsolation: true
// https://www.electronjs.org/docs/latest/tutorial/tutorial-preload
// contextBridge.exposeInMainWorld('process', {
//     'platform': process.platform
// })

window.addEventListener('DOMContentLoaded', () => {
    // auto-translate everything tagged with the i18n class
    const mustBeTranslated = ['innerText', 'title', 'placeholder'];
    document.querySelectorAll('.i18n').forEach(elem => {
        mustBeTranslated.forEach(key => {
            if (elem[key]) {
                elem[key] = i18n._(elem[key]);
            }
        });
    });
});
