let inboxOpen = false;
let chatMenuOpen = false;

let conversationList = {}

function dragElement(elmnt, selmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
        // if present, the header is where you move the DIV from:
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        selmnt.style.top = (selmnt.offsetTop - pos2) + "px";
        selmnt.style.left = (selmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

// Inbox
let conversationHolder = document.createElement('div');
conversationHolder.classList.add('conversation-holder');
conversationHolder.style.top = `0px`;
conversationHolder.style.left = `0px`;
conversationHolder.id = "CVHolder";

let conversationBar = document.createElement('div');
conversationBar.classList.add('conversation-bar');
conversationBar.id = "CVBar";
conversationHolder.appendChild(conversationBar);


let conversationWrapper = document.createElement('div');
conversationWrapper.classList.add('conversation-wrapper');
conversationHolder.appendChild(conversationWrapper)

let image1 = document.createElement('img')
image1.width = "35";
image1.height = "35";
image1.src = 'https://cdn.discordapp.com/attachments/614637022614782000/911026015957045248/f2b902c3b15eeed.png';
image1.classList.add('exit-button');
conversationBar.appendChild(image1)

image1.onclick = function () {
    ig.game.sounds.click.play();
    conversationHolder.style.visibility = 'hidden';
    inboxOpen = false;
}

// Chat Menu
let chatHolder = document.createElement('div');
chatHolder.classList.add('chat-holder');
chatHolder.style.top = `0px`;
chatHolder.style.left = `0px`;
chatHolder.id = "CHHolder";

let chatBar = document.createElement('div');
chatBar.classList.add('chat-bar');
chatBar.id = "CHBar";
chatHolder.appendChild(chatBar);

let chatWrapper = document.createElement('div');
chatWrapper.classList.add('chat-wrapper');
chatWrapper.id = "0";
chatHolder.appendChild(chatWrapper)

let image2 = document.createElement('img')
image2.width = "35";
image2.height = "35";
image2.src = 'https://cdn.discordapp.com/attachments/614637022614782000/911026015957045248/f2b902c3b15eeed.png';
image2.classList.add('exit-button2');
chatBar.appendChild(image2)

image2.onclick = function () {
    ig.game.sounds.click.play();
    chatHolder.style.visibility = 'hidden';
    chatMenuOpen = false;
    chatWrapper.id = "0";
}

let image3 = document.createElement('img')
image3.width = "45";
image3.height = "26";
image3.src = 'https://cdn.discordapp.com/attachments/614637022614782000/911026619609649219/9b9dc652038a7a1.png';
image3.classList.add('arrow-button');
chatBar.appendChild(image3)

image3.onclick = function () {
    ig.game.sounds.click.play();
    chatHolder.style.visibility = 'hidden';
    chatMenuOpen = false;
    chatWrapper.id = "0";

    conversationHolder.style.visibility = 'visible';
    inboxOpen = true;
}

//70 height
let messageComposer = document.createElement('div');
messageComposer.classList.add('message-composer');
chatHolder.appendChild(messageComposer);

let messageBox = document.createElement('input');
messageBox.classList.add('message-box');
messageBox.placeholder = "Message..";
messageBox.autocomplete = "off";
messageBox.id = "msgBx"

messageBox.addEventListener('keydown', event => {
    if (event.key === 'Enter' && messageBox.value !== '') {
        socket.emit('send-message', { id: chatWrapper.id, message: messageBox.value })
        conversationList[chatWrapper.id].messages.push({ content: ig.game.player.screenName.toUpperCase() + ":" + messageBox.value, sender: ig.game.player[id] });

        messageBox.value = '';
    }
})
messageComposer.appendChild(messageBox)


function createEntry(name, id) {
    if (name.length >= 15) {
        name = name.substring(0, 11) + "...";
    }
    let senderId = id;
    // Style
    let conversationEntry = document.createElement('div');
    conversationEntry.classList.add('conversation-entry');
    // Configure
    conversationEntry.id = senderId;

    let senderName = document.createElement('p');
    senderName.classList.add('inbox-sender-name');
    senderName.innerHTML = name.toUpperCase();
    conversationEntry.appendChild(senderName)

    // Style
    let closeConvo = document.createElement('img')
    closeConvo.classList.add('conversation-closer');
    // Configure
    closeConvo.width = "21";
    closeConvo.height = "21";
    closeConvo.src = 'https://cdn.discordapp.com/attachments/614637022614782000/911027064419807292/65d975657775e47.png';
    conversationEntry.appendChild(closeConvo)
    // Change to red x when hovered
    closeConvo.onmouseover = () => { closeConvo.setAttribute('src', 'https://cdn.discordapp.com/attachments/614637022614782000/911026950049525821/a9a48516cc1de12.png') }
    closeConvo.onmouseout = () => { closeConvo.setAttribute('src', 'https://cdn.discordapp.com/attachments/614637022614782000/911027064419807292/65d975657775e47.png') }
    // removes entry and clears conversation history
    closeConvo.onclick = () => {
        ig.game.sounds.collapse.play()
        delete conversationList[senderId];
        conversationWrapper.removeChild(closeConvo.parentElement);
        if (chatMenuOpen && chatWrapper.id === senderId) {
            chatMenuOpen = false;
            chatHolder.style.visibility = 'hidden';
            chatWrapper.id = "0";
        }
    }

    conversationEntry.onmouseover = () => { closeConvo.style.visibility = 'visible' }
    conversationEntry.onmouseout = () => { closeConvo.style.visibility = 'hidden' }

    conversationEntry.onmousedown = () => { if (closeConvo.src !== 'https://cdn.discordapp.com/attachments/614637022614782000/911026950049525821/a9a48516cc1de12.png') { closeConvo.style.visibility = 'hidden'; conversationEntry.style.backgroundColor = 'rgba(75, 75, 75, 0.45)'; } }
    conversationEntry.onmouseup = () => {
        if (closeConvo.src !== 'https://cdn.discordapp.com/attachments/614637022614782000/911026950049525821/a9a48516cc1de12.png') {
            conversationEntry.style.backgroundColor = '';
            if (!chatMenuOpen) {
                conversationHolder.style.visibility = 'hidden';
                inboxOpen = false;
            }
            openChatMenu(senderId);


        }
    }
    conversationWrapper.appendChild(conversationEntry);
}

function createMessage(contents, senderId) {
    // Style
    let chatEntry = document.createElement('div');
    chatEntry.classList.add('chat-entry');
    // Configure
    chatEntry.id = senderId;
    chatWrapper.appendChild(chatEntry)
    // Style
    let senderName = document.createElement('div');
    senderName.classList.add('message-sender-name');
    senderId === ig.game.player[id] ? senderName.style.color = '#1c6c0c' : senderName.style.color = '#4f4d4c';
    // Configure
    senderName.innerText = contents.split(':')[0];
    chatEntry.appendChild(senderName);
    // Style
    let messageBody = document.createElement('div');
    messageBody.classList.add('message-body');
    // Configure
    messageBody.innerText = contents.split(':')[1];
    senderName.appendChild(messageBody)

}

let previousChildCount = chatWrapper.children.length;
let previousScrollHeight = chatWrapper.scrollHeight - 360;

function updateChat() {
    requestAnimationFrame(updateChat)
    if (chatWrapper.id === "0") return;
    if (chatWrapper.children.length !== conversationList[chatWrapper.id].messages.length) {
        chatWrapper.innerHTML = '';
        for (let message of conversationList[chatWrapper.id].messages) {
            createMessage(message.content, message.sender)
        }
    }
    if (chatWrapper.children.length !== previousChildCount) {
        previousChildCount = chatWrapper.children.length;
        if (chatWrapper.scrollTop == previousScrollHeight) {
            chatWrapper.scrollTop = chatWrapper.scrollHeight - 360;

        }
        previousScrollHeight = chatWrapper.scrollHeight - 360;
    }
}

getCircularReplacer = () => {
    const seen = new WeakSet();
    return (key, value) => {
        if (typeof value === "object" && value !== null) {
            if (seen.has(value)) return;
            seen.add(value);
        }
        return value;
    };
};

// Getting CSS
async function loadCSS() {
    fetch('https://cdn.jsdelivr.net/gh/ZoltarML/ManyChat@latest/ManyChat.css').then(resp => resp.text()).then(css => {
        let style = document.createElement('style');
        style.innerHTML = css;
        $('head')[0].appendChild(style);
    })
}

// Getting Parses deobfuscator and Socket.io
!async function main() {
    if (typeof io !== 'undefined')
        return

    await $.getScript('https://cdn.jsdelivr.net/gh/socketio/socket.io-client/dist/socket.io.min.js');


    loadCSS().then(
        async () => {
            if (typeof Deobfuscator === 'undefined')
                // Parses deobf
                await $.getScript("https://cdn.jsdelivr.net/gh/parseml/many-deobf@latest/deobf.js");

            init();
        }
    );
}()

function init() {

    // Appending menus
    $('body')[0].appendChild(conversationHolder);
    $('body')[0].appendChild(chatHolder);

    $('#canvas').on('click', () => $('#msgBx').blur())
    
    // Making menus able to be dragged
    dragElement(document.getElementById("CVBar"), document.getElementById("CVHolder"));
    dragElement(document.getElementById("CHBar"), document.getElementById("CHHolder"));

    updateChat();

    // Getting blocked info
    let playerInfo = Deobfuscator.object(ig.game, 'myPeople');
    let blockFunction = Deobfuscator.function(playerInfo, '.push(a)');
    let blockList = Deobfuscator.keyBetween(blockFunction, 'b.', '.push');

    // User interface hijacking
    eval('ig.game.bottomMenu.subMenus[0].draw = function(){' + ig.game.bottomMenu.subMenus[0].draw.toString().split('function(){')[1].split('()}').join('()').split('"Help"').join('"Inbox"') + '}')
    let helpCall = Deobfuscator.function(ml.Misc, 'var b="/info";', true)
    ml.Misc[helpCall] = function () {
        openInbox();
    }

    checkAd = Deobfuscator.function(ig.game.bottomMenu, 'var a="bottom: "', true);

    ig.game.bottomMenu.messageAlert = function (a, b) {
        var f;
        f = "" + ('<span class="pseudolink" onclick="' + ("ig.game.playerDialog.openForPlayerId('" + a + "')") + '">' + b + "</span>");
        f += " has sent you a message.";
        let ad;
        eval(`ad = this.${checkAd}()`)

        jQuery('<div id="pingFromFriend" style="' + ad + '">' + f + "</div>").appendTo("body")
        ig.game.sounds.ping.play()
        setTimeout(() => jQuery("#pingFromFriend").remove(), 3000)

    }

    // Socket Setup
    socket = io('https://many-chat.herokuapp.com')
    socket.emit('MLUID', { connectId: ig.game.player[id], user: JSON.stringify(ig.game.player, getCircularReplacer()) })
    socket.on('receive-message', async info => {
        if(playerInfo[blockList].includes(info.senderId)) return;

        let senderData = await jQuery.ajax({
            url: "/j/u/pi/",
            type: "POST",
            data: {
                id: info.senderId,
                planeId: 0,
                areaId: '5f163f57be72d462f412bf5d'
            }
        })

        let children = conversationWrapper.children;
        let exists = false;
        if (children.length > 0) {
            for (let i = 0; i < children.length; i++) {
                if (info.senderId === children[i].id) {
                    exists = true;
                    break;
                }
            }
        }
        if (!exists) {
            createEntry(senderData.screenName, info.senderId);
            conversationList[info.senderId] = { messages: [{ content: senderData.screenName.toUpperCase() + ":" + info.message, sender: info.senderId }] }
        } else {
            conversationList[info.senderId].messages.push({ content: senderData.screenName.toUpperCase() + ":" + info.message, sender: info.senderId });
        }

        if (!inboxOpen && chatWrapper.id !== info.senderId) {
            ig.game.bottomMenu.messageAlert(info.senderId, senderData.screenName)
        }
    })

    // If the server rejects a request this is what happens
    socket.on('reject', reason => {
        ig.game.sounds.nocando.play();
        ig.game.alertDialog.open('<h4>' + reason + '<h4>', true)
    })
}


function getDistance(x1, y1, x2, y2) {
    let xDistance = x2 - x1;
    let yDistance = y2 - y1;

    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

let img = new Image()

img.src = 'https://cdn.discordapp.com/attachments/614637022614782000/911027270628544552/05a896880addfd3.png';
ig.game.playerDialog.old_draw = ig.game.playerDialog.draw;

ig.game.playerDialog.draw = function () {
    ig.game.playerDialog.old_draw();

    if (this.isOpen) {
        clickedPlayer = Deobfuscator.object(ig.game.playerDialog, 'rank')
        if (clickedPlayer.id !== ig.game.player[id]) {


            ig.system.context.globalAlpha = 0.5;
            if (ig.game.player.isEditorHere) {
                ig.system.context.drawImage(img, (this.pos.x + 103) * ig.system.scale, (this.pos.y + 91) * ig.system.scale, 16 * ig.system.scale, 12 * ig.system.scale);
            } else {
                ig.system.context.drawImage(img, (this.pos.x + 117) * ig.system.scale, (this.pos.y + 91) * ig.system.scale, 16 * ig.system.scale, 12 * ig.system.scale);
            }

            ig.system.context.globalAlpha = 1;
        }

    } else {

        document.removeEventListener("click", () => { });
    }
}

document.addEventListener("click", () => {
    if (ig.game.isEditorHere) {
        if (ig.game.playerDialog.isOpen && getDistance(ig.input.mouse.x, ig.input.mouse.y, ig.game.playerDialog.pos.x + 103, ig.game.playerDialog.pos.y + 91) <= 16 && clickedPlayer.id !== ig.game.player[id]) {
            ig.game.sounds.click.play();
            openChatMenu(clickedPlayer.id, clickedPlayer.name);
        }
    } else {
        if (ig.game.playerDialog.isOpen && getDistance(ig.input.mouse.x, ig.input.mouse.y, ig.game.playerDialog.pos.x + 117, ig.game.playerDialog.pos.y + 91) <= 16 && clickedPlayer.id !== ig.game.player[id]) {
            ig.game.sounds.click.play();
            openChatMenu(clickedPlayer.id, clickedPlayer.name);
        }
    }

});


function openChatMenu(cid, cscn) {
    if (typeof conversationList[cid] == 'undefined') {
        createEntry(cscn, cid);
        conversationList[cid] = { messages: [] }
    }



    if (!chatMenuOpen) {
        chatHolder.style.visibility = 'visible';
        chatMenuOpen = true;
        chatWrapper.id = cid;

    } else {
        chatWrapper.id = cid;
    }

}

function openInbox() {
    if (!inboxOpen) {
        ig.game.sounds.click.play();
        conversationHolder.style.visibility = 'visible';

        inboxOpen = true;
    }
}
