const {ipcRenderer, contextBridge}=require("electron")

window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
      const element = document.getElementById(selector)
      if (element) element.innerText = text
    }
  
    for (const type of ['chrome', 'node', 'electron']) {
      replaceText(`${type}-version`, process.versions[type])
    }
  })
  const API={
    window:{
      close:()=>ipcRenderer.send('app/close'),
      minimize:()=>ipcRenderer.send('app/minimize'),
      maximize:()=>ipcRenderer.send('app/maximize')
    }
  }

  contextBridge.exposeInMainWorld("app", API)