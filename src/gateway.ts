import {
    ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
  WsResponse,
} from '@nestjs/websockets';
import { from, map, Observable } from 'rxjs';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(3020, {namespace: "events"}) // can specify port number if needed default 3000 or app's port number
export class Gateway  {
  @WebSocketServer()
  server: Server;
//   handleConnection(client: any, ...args: any[]) {
//     console.log('client : ', client.id);
//   }
//   afterInit(server: any) {
//     console.log('log init');
//   }

  @SubscribeMessage('newMessage')
  handleEvent(client: Socket, data: string) {
    console.log('message : ', data);
    console.log('id : ',client.id)
    this.server.emit("notification", {
        message: data
    })
  }

  @SubscribeMessage('client-connected')
  connectClient(@MessageBody() data: string, @ConnectedSocket() client: Socket){
    console.log("data : ",data)
    client.emit("client-server", "client emits from server")
  }

  @SubscribeMessage("client-server")
  notifiyServer(client: Socket, data: string){
    console.log("client server : ",data, client.id)

  }
}

@WebSocketGateway(3030, {namespace: "sockets"})
export class GatewayConnection implements OnGatewayInit{ 

  afterInit(server: any) {
    console.log("gateway init ")
  }
  @SubscribeMessage("newMessage")
  getMessage(client: Socket, data: string){
    console.log("new message : ",data)
    const event = "newMessage"
    return {
      event,
      data: "hi client"
    }
  }

  @SubscribeMessage("async")
  asyncRes(@MessageBody() data: string): Observable<WsResponse<string>>{
    throw new WsException('invalid socket')
    const event = 'async'
    const nums = ["1","2","3"]
    return from(nums).pipe(map(num => ({
      event,
      data:num
    })))
  }
}