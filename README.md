# ManyChat
  * A fully functional private messaging system for Manyland.
  * I've had this idea for a while just never the backbone to follow through, but here it is.
  * I tried to make this look as engrained into the game as possible.
  * Anyway, I hope you enjoy.
  * Made by *Zoltar*

## Video Guide

[![](https://cdn.discordapp.com/attachments/614637022614782000/798317177529827388/thumbnail1.png)](https://www.youtube.com/watch?v=wiWOn3hwrrI)

### Deployment

Navigate to [Manyland](http://manyland.com).
Open your browsers **Developer Console** and run the following command.

```js

$.getScript('https://cdn.jsdelivr.net/gh/ZoltarML/ManyChat@0.2e/ManyChatClient.js')

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
* Once clicked a message window will be opened.

![](https://gyazo.com/b9bb8bd1e0bb5b2d4c5c4cf3e7ea5e87.gif)

## Tampermonkey Implementation

### What's Tampermonkey and why do I care?
* Tampermonkey is an extension that will allow you to run scripts automatically when loading into a webpage.
* What this means is that even after a page refresh the script will not go away, thus allowing you to be constantly connected to Many Chat.
* You can find Tampermonkey [here](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo). 

### How to use Many Chat with Tampermonkey
* First click `Create a new script` in the Tampermonkey drop down.

![](https://cdn.discordapp.com/attachments/614637022614782000/798112165886296104/unknown.png)

* You are now in the script editor menu.
* The code in your script editor needs to look exactly the same as the following image for it to work.

![](https://cdn.discordapp.com/attachments/614637022614782000/798113918391681054/unknown.png)

* Once done do `ctrl+s` to save the script.
* Upon going back to the Tampermonkey dashboard you should see your script toggled on.

![](https://cdn.discordapp.com/attachments/614637022614782000/798114481061232640/unknown.png)
* Once you refresh the page and wait a few seconds the script will load it self.





## Built With

* [Manyland Auto Deobfuscator](https://github.com/parseml/many-deobf) - Used to stay up to date with Manyland obfuscation.
* [Socket.io](https://socket.io/) - Used socket creation and handling.
* [Express](https://expressjs.com/) - Powerful web framework for Nodejs.
* [Request-Promise-Native](https://github.com/request/request-promise-native) - Used to send request to Manyland.


## Acknowledgments

* [Parse](https://pastebin.com/u/parseml) - *Created Manyland Auto Deobfuscator*


