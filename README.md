# practice-express-socketio

![](https://img.shields.io/badge/typescript-4.8.3-blue)
![](https://img.shields.io/badge/express-4.18.1-blue)
![](https://img.shields.io/badge/socket.io-4.5.2-9cf)

Refreshing `Express` and `Socket.IO` from scratch

- https://expressjs.com/
- https://socket.io

# Content

1. [Initialize node project](#initialize-node-project)
2. [Install Express](#install-express)
3. [Install dev dependencies](#install-dev-dependencies)
4. [Initialize Typescript](#initialize-typescript)
5. [Create folder structure](#create-folder-structure)
6. [Update package](#update-packagejson)
7. [Prepare HTML Content](#prepare-html-content)
8. [Install Socket.io](#install-socketio)
9. [Create Server for Socket.io](#create-server---socketio)
10. [Create Client for Socket.io](#create-client---socketio)

# Initialize Node Project

```
npm init -y
```

# Install Express

```
npm i express
```

# Install Dev Dependencies

```
npm i -D @types/express nodemon typescript ts-node
```

# Initialize Typescript

```
npx tsc --init
```

# Create folder structure

```
└── src/
    │   app.ts
    │   index.html
    │   main.ts
```

**app.ts**

```ts
import express from 'express';
import { resolve } from 'path';

export const app = express();

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'index.html'));
});
```

**main.ts**

```ts
import { app } from './app';

function start(): void {
  app.listen(3000, () => {
    console.log(`listening to port:3000`);
  });
}

start();
```

**index.html**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body></body>
</html>
```

# Update package.json

```json
{
  "scripts": {
    "start": "nodemon src/main.ts --watch src"
  }
}
```

# Prepare HTML content

Feel free to make any web content at this point

# Install Socket.io

```
npm i socket.io
```

# Create Server - Socket.io

**app.ts**

```diff
 import express from 'express';
 import { resolve } from 'path';
+import { Server } from 'socket.io';
+import { createServer } from 'http';

 export const app = express();

+export const server = createServer(server);

 app.get('/', (req, res) => {
   res.sendFile(resolve(__dirname, 'index.html'));
 });

+io.on('connection', (socket) => {
+    console.log('someone got connected', socket.id)
+
+    socket.on('request', (payload) => {
+        client.broadcast.emit('response', payload);
+    })
+})
```

**main.ts**

```diff
-import { app } from "./app";
+import { server } from "./app";

 function start(): void {

-    app.listen(3000, () => {
+    server.listen(3000, () => {
         console.log(`listening to port:3000`);
     });

 }

 start();
```

# Create Client - Socket.io

Inject the client from `Socket.io` in the browser client

```html
<script src="/socket.io/socket.io.js"></script>
```

This will generate a global `io` for the client.

Write somewhere in the client script (javascript/typescript)

```ts
const socket = io();

// Listen to server
socket.on('response', (data) => {});

// Send request to server
socket.emit('request', data);
```
