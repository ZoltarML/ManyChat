# Many Chat
  * A fully functional private messaging system for Manyland
  * I've had this idea for a while just never the backbone to follow through, but here it is.
  * I tried to make this look as engrained into the game as possible
  * Anyway, I hope you enjoy.
  * Made by *Zoltar*

## Video Guide

working on it ;)

### Deployment

Navigate to [Manyland](http://manyland.com).
Open your browsers **Developer Console** and run the following command.

```js

$.getScript('https://cdn.jsdelivr.net/gh/ZoltarML/ManyChat@latest/ManyChatClient.js')

```

Congrats! Many Chat has been successfully installed!

![](https://gyazo.com/e730a6be38dd45e1297396a81992f554.gif)

# **WARNING**
 * This will *not* work unless the person you are trying to message also has the script running.
 * If the script is not running on their end your message will be rejected. 

## Features

### Removing Conversation
 * While hovering over a conversation a small `x` will be visible. Upon clicking it will remove a conversation and its history.
 * Note that the other clients history will still be intact.
![](https://gyazo.com/9f98fcf1f4104172f1b84901c395d733.gif)
 

### Block Policy
 * If you have blocked a player normally within Manyland then you will be unable to recieve messages from that player.
 
 
### Send Message
* Upon right clicking a user a chat bubble icon will appear in their profile.
* Once clicked a message window will be opened
![](https://gyazo.com/b9bb8bd1e0bb5b2d4c5c4cf3e7ea5e87.gif)

## Built With

* [Manyland Auto Deobfuscator](https://github.com/parseml/many-deobf) - Used to stay up to date with Manyland obfuscation.
* [Socket.io](https://socket.io/) - Used socket creation and handling.
* [Express](https://expressjs.com/) - Powerful web framework for Nodejs.
* [Request-Promise-Native](https://github.com/request/request-promise-native) - Used to send request to Manyland.


## Acknowledgments

* [Parse](https://pastebin.com/u/parseml) - *Created Manyland Auto Deobfuscator*


