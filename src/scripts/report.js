function sendMessage() {
    var messageInput = document.getElementById('message-input');
    var chatBox = document.getElementById('main-chat');
    if (messageInput.value.trim() !== '') {
        var newMessage = document.createElement('span');
        newMessage.classList.add('message');
        newMessage.textContent = messageInput.value;
        chatBox.prepend(newMessage);
        messageInput.value = '';
    }
}
document.getElementById('message-input').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
           event.preventDefault();
        sendMessage();
    }
});

function toggleChat() {
    var chatContainer = document.getElementById('select-midia');
    if (chatContainer.style.display === 'none' || chatContainer.style.display === '') {
        chatContainer.style.display = 'flex';
    } else {
        chatContainer.style.display = 'none';
    }
}

function uploadMedia(event, type) {
    var chatBox = document.getElementById('main-chat');
    var file = event.target.files[0];

    if (!file) return;

    var mediaElement;

    if (type === 'image') {
        mediaElement = document.createElement('img');
        mediaElement.src = URL.createObjectURL(file);
        mediaElement.alt = 'Imagem enviada';
        mediaElement.style.maxWidth = '240px';
        mediaElement.style.width = 'inherit';
        mediaElement.style.borderRadius = '8px';
    } else if (type === 'video') {
        mediaElement = document.createElement('video');
        mediaElement.src = URL.createObjectURL(file);
        mediaElement.controls = true;
        mediaElement.style.maxWidth = 'inherit';
        mediaElement.style.maxHeight = '350px';
        mediaElement.style.borderRadius = '8px';
    } else if (type === 'audio') {
        mediaElement = document.createElement('audio');
        mediaElement.src = URL.createObjectURL(file);
        mediaElement.controls = true;
        mediaElement.style.maxWidth = '100%';
        mediaElement.style.height = '25px';
        mediaElement.style.borderRadius = '8px';
    }

    var newMessage = document.createElement('div');
    newMessage.classList.add('message');
    newMessage.appendChild(mediaElement);

    chatBox.prepend(newMessage);

    event.target.value = '';

    var chatContainer = document.getElementById('select-midia');
    chatContainer.style.display = 'none';
}

function getLocation() {
    if (!navigator.geolocation) {
        alert("Seu navegador não suporta a funcionalidade de geolocalização.");
    } else {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    }
}

function showPosition(position) {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    var bbox = `${long - 0.01},${lat - 0.01},${long + 0.01},${lat + 0.01}`;

    var chatBox = document.getElementById('main-chat');
    var iframe = document.createElement('iframe');
    iframe.width = "100%";
    iframe.height = "300";
    iframe.src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${long}`;
    iframe.style.border = "2px solid rgba(0,0,0,0.4)";
    iframe.style.borderRadius = "10px";

    var newMessage = document.createElement('div');
    newMessage.classList.add('message');
    newMessage.appendChild(iframe);

    chatBox.prepend(newMessage);

    console.log(`Latitude: ${lat}, Longitude: ${long}`);

    var chatContainer = document.getElementById('select-midia');
    chatContainer.style.display = 'none';
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert("Usuário negou o pedido de geolocalização.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Informações de localização estão indisponíveis.");
            break;
        case error.TIMEOUT:
            alert("O pedido de localização expirou.");
            break;
        default:
            alert("Ocorreu um erro desconhecido.");
            break;
    }
}