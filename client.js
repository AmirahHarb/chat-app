/*Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla rutrum ultricies volutpat. 
Sed euismod magna vel rhoncus fermentum. Suspendisse potenti. Proin ornare arcu dignissim 
placerat egestas. Quisque id risus fringilla, dapibus neque a, tristique lorem. Cras pretium 
i quis augue sodales efficitur quis in nibh. Curabitur condimentum vel urna in sagittis. 
Integer sollicitudin dui ut venenatis varius.*/ 


const socket = io('http://localhost:3000')
const sendForm = document.getElementById('send-form')
const sendInput = document.getElementById('message-text')
const messageContainer = document.getElementById('message-cont')


//prompting new user for their name
 //const username = prompt("Enter your name")
 const username = ""
 socket.emit('user-name', username)


//receiving message from server
socket.on('sent-message', message => {
    console.log(message)
    displayMessage(message, "recipient")
})

//sending message to server
sendForm.addEventListener('submit', e => {
    e.preventDefault()//preventing page refresh to avoid losing previously received messages
    const message = sendInput.value
    
    socket.emit('send-message', message)
    //displaying message for sender
    const senderM = "You: " + message
    displayMessage(message, "sender")
    sendInput.value = ''//clearing textbox after send
})



function displayMessage(message, recipient){
    const messageElement = document.createElement('div')
    

    messageElement.style.maxWidth = "60%"
    messageElement.innerText = message
    messageElement.style.fontFamily = "sans-serif"
    messageElement.style.padding = "2px 10px 2px 10px"
    messageElement.style.marginBottom = "10px"

    //sender, recipient styling 
    if(recipient == 'sender'){
        messageElement.style.marginLeft = "auto"
        messageElement.style.backgroundColor = "#9795BC"
        messageElement.style.borderRadius = "10px 3px 10px 10px "
        messageElement.style.marginRight = "10px"
    }

    if(recipient == 'recipient'){
        messageElement.style.marginRight = "auto"
        messageElement.style.backgroundColor = "#e0e1dd"
        messageElement.style.borderRadius = "3px 10px 10px 10px"
        messageElement.style.marginLeft = "10px"
    }

    messageContainer.append(messageElement)
}






