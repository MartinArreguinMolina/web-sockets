import {Manager, Socket} from 'socket.io-client';

let socket: Socket;

export const connectToServer = (token: string) => {
    const manager = new Manager('http://localhost:3000/socket.io/socket.io.js', {
        extraHeaders: {
            authentication: token
        }
    });

    // Existe el socket borra todos los listener anteriores
    socket?.removeAllListeners();
    socket = manager.socket('/');
    // console.log({socket})

    addListeners();
}

const addListeners = () => {
    const servetStatusLabel = document.querySelector('#server-status')!;
    // TODO #clients-ul
    const clientsUL = document.querySelector('#clients-ul')!;

    const messageForm = document.querySelector<HTMLFormElement>('#message-form')!;
    const messageInput = document.querySelector<HTMLInputElement>('#message-input')!;
    const messagesUl = document.querySelector<HTMLUListElement>('#messages-ul')!;

    // El metodo on son los listeners o escuchar el servidor
    socket.on('connect', () => {
        servetStatusLabel.innerHTML = 'connected';
    })

     socket.on('disconnect', () => {
        servetStatusLabel.innerHTML = 'disconnected';
    })

    socket.on('clients-updated', (clients: string[]) => {
        let clientsHtml = '';
        clients.forEach(clientsId => {
            clientsHtml += `<li>${clientsId}</li>`
        })

        clientsUL.innerHTML = clientsHtml;
    });

    messageForm.addEventListener('submit', (event) => {
        event.preventDefault();

        if(messageInput.value.trim().length <= 0) return;

        // HABLAR CON EL SERVIDOR EMITIR UN VALOR
        socket.emit('message-from-client', {id: 'YO', message: messageInput.value})

        messageInput.value = '';
    })

    socket.on('message-from-server', (payload: {fullName: string, message: string}) => {
        const newMessage = `

            <li>
                <strong>${payload.fullName}</strong>
                <span>${payload.message}</span>
            </li>
        `;

        const li = document.createElement('li');
        li.innerHTML = newMessage;
        messagesUl.append(li)
    })
}