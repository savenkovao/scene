let io = require('socket.io-client');



export class SocketModule {
  constructor() {
    this.socket = io('http://174.138.6.107:3000/');
    this.socket.on('stats', (data) => {
      console.log(data);
    });
    this.socket.emit('subscribeStats');
  }
}