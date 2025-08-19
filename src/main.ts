import { connectToServer } from './socket-cliente';
import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
  <h1>WebSocket -Client</h1>
  <input id="jwt-token" placeholder="Json Web Token">
  <button id="btn-connect">Connect</button>
  <br/>

  <span id="server-status">offiline</span>

  <ul id="clients-ul"></ul>

  <form id="message-form">
    <input placeholder="message" id="message-input"/>
  </form>

  <h3>Messages</h3>
  <ul id="messages-ul"></ul>
  </div>
`
// connectToServer();
// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)

const inputJwt = document.querySelector<HTMLInputElement>('#jwt-token')!;
const btnConnect = document.querySelector('#btn-connect')!;


btnConnect.addEventListener('click', () => {


  if(inputJwt.value.trim().length <= 0) return alert('Debes de ingresar un token valido')

  connectToServer(inputJwt.value.trim())
})

