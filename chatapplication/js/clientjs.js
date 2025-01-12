
const socket = io('http://localhost:8000');

const form = document.getElementById('send-container')
const messageInp = document.getElementById('messageInp')
const messageConatiner = document.querySelector(".container")
var audio = new Audio('iphone.mp3');

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageInp.value;
    append( `you: ${message}`,'right');
    socket.emit('send',message);
    messageInp.value='';
})
const append = (message,position)=>{
    const messageElement= document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageConatiner.append(messageElement);
    if(position=='left'){
        audio.play();
    }
}
const user = prompt("Enter your name ");

socket.emit('new-user-joined',user);

socket.on('user-joined',name =>{
    console.log("user",name)
    append(`${name} joined the chat`,'right')
})

socket.on('receive',data =>{
    append(`${data.name}:${data.message}`,'left')
})

socket.on('left',name =>{
    append(`${name} left the chat`,'left')
})