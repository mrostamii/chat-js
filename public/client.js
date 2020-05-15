const socket = io();

const message = document.getElementById('message'),
    handle = document.getElementById('handle'),
    output = document.getElementById('output'),
    typing = document.getElementById('typing'),
    button = document.getElementById('button');

    // send typing event to server.js
    message.addEventListener('keypress', () =>{
        socket.emit('userTyping', handle.value)
    })

    //send message to other client
    button.addEventListener('click', () =>{
        socket.emit('userMessage', {
            handle: handle.value,
            message: message.value
        })
        document.getElementById('message').value="";
    })

    
    //listen for server's events
    socket.on("userMessage", (data) =>{
        typing.innerHTML = "";
        output.innerHTML += '<p> <strong>' + data.handle + ': </strong>' + data.message + '</p>'
    })

    socket.on('userTyping', (data)=>{
        typing.innerHTML = '<p><em>' + data + ' is typing... </em></p>'
    })