const socket = io()
const messages = document.querySelector('.messages')
const form = document.querySelector('.form')
const input = document.querySelector('.input')
const nameBlock = document.querySelector('.name')

const userName = prompt('Ваш нік')
nameBlock.innerHTML = `${userName}`

form.addEventListener('submit', (e) => {
    e.preventDefault()

    if (input.value){
        socket.emit('chat message', {
            message: input.value, 
            name: userName})
        input.value = ''
    }
})

socket.on('chat message', (data) => {
    const item = document.createElement('li')
    item.innerHTML = `<span>${data.name}</span>: ${data.message}`
    messages.appendChild(item)
    window.scrollTo(0, document.body.scrollHeight)
})

function getRandomColorValue() {
    return Math.floor(Math.random() * 256);
}

function getRandomColor() {
    const red = getRandomColorValue();
    const green = getRandomColorValue();
    const blue = getRandomColorValue();
    return `rgb(${red}, ${green}, ${blue})`;
}

nameBlock.style.color = getRandomColor();
