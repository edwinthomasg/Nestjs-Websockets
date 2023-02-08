import { MessageBody, OnGatewayConnection, OnGatewayInit, SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";

@WebSocketGateway() // can specify port number if needed default 3000 or app's port number
export class Gateway implements OnGatewayInit, OnGatewayConnection{
    handleConnection(client: any, ...args: any[]) {
        console.log("client : ",client.id)
    }
    afterInit(server: any) {
        console.log("log init")
    }

    @SubscribeMessage('newMessage')
    handleEvent(@MessageBody() data: string){
        console.log("message : ",data)
    }
}