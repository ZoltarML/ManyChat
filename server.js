
var express = require('express');
let http = require('http')
const app = express();
const server = http.createServer(app);

app.get('/', function (req, res, next) {
    res.send('...')
});

let request = require('request-promise-native');
let cookieJar = request.jar();

request = request.defaults({ jar: cookieJar });

const io = require("socket.io")(server, {
    cors: {
        origin: '*',
    }
});

server.listen(process.env.PORT || 3125);

let currentConnections = {};

io.sockets.on('connection', function (client) {

    let senderInformation;
    let lastUserState;

    client.on('MLUID', async MLSignature => {
        senderInformation = await getSenderInformation(MLSignature.connectId);
        lastUserState = JSON.parse(MLSignature.user);

        if (senderInformation.isFullAccount) {
            if (senderInformation.rank === lastUserState.rank && senderInformation.screenName === lastUserState.screenName) {
                currentConnections[client.id] = { socket: client };
                currentConnections[client.id].MLIdentity = MLSignature.connectId;

            } else {
                client.emit('reject', "Something seems off... Disconnecting.")
                client.disconnect();
            }
            
        } else {
            client.emit('reject', "Please login and create an account to use this feature.")
            client.disconnect();
        }
    });

    client.on('disconnect', function () {
        if (Object.keys(currentConnections).includes(client.id)) {
            delete currentConnections[client.id];
        }
    });

    client.on('send-message', async data => {
        if (senderInformation.rank === lastUserState.rank && senderInformation.screenName === lastUserState.screenName) {
            if (data.id !== currentConnections[client.id].MLIdentity) {
                let reciever = null;
                Object.keys(currentConnections).forEach(user => {
                    if (currentConnections[user].MLIdentity === data.id) {
                         reciever = currentConnections[user].socket
                        
                    }
                })
                reciever !== null ? reciever.emit('receive-message', {date: Date(), message: data.message, senderId: currentConnections[client.id].MLIdentity}) : client.emit('reject', "Player doesn't appear to be connected to ManyChat. If you would like to chat with them privately, you may need to ask them to install ManyChat.");
                    
            }
        } else {
            client.emit('reject', "Something seems off... Please try again.")
        }


    })
});


const root = 'http://manyland.com/'

async function getSenderInformation(id) {

    // Populate cookie jar
    await request(root);
    await request(root + '?c');
    await request(root);

    request = request.defaults({ headers: { 'X-CSRF': cookieJar.getCookies(root).filter(cookie => cookie.key === 'act')[0].value } });

    let userData = await request({
        method: 'POST',
        url: 'http://manyland.com/j/u/pi/',
        form: {
            'id': id,
            'planeId': 0,
            'areaID': '5f163f57be72d462f412bf5d'
        },
        json: true
    });

    return userData;
}