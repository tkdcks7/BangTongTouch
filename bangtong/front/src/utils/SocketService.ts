import { Client, Frame } from "@stomp/stompjs";
import SockJS from "sockjs-client";

class SocketService {
  client: Client;

  constructor() {
    this.client = new Client({
      webSocketFactory: () =>
        new SockJS(`${process.env.REACT_APP_BACKEND_URL}/signaling`),
      // new SockJS(`${process.env.REACT_APP_BACKEND_URL}/signaling`),
      onConnect: () => {
        console.log("Socket Connected");
      },
      onStompError: (frame) => {
        console.error("Broker reported error: " + frame.headers["message"]);
        console.error("Additional details: " + frame.body);
      },
    });
  }

  connect(): void {
    console.log("connect()");
    this.client.activate();
  }

  disconnect(): void {
    console.log("disconnect()");
    this.client.deactivate();
  }

  subscribe(destination: string, callback: (message: Frame) => void): void {
    console.log("subscribe()");
    this.client.subscribe(destination, callback);
  }

  send(destination: string, body: any): void {
    console.log("send()");
    console.log("destination: " + destination + ", body: " + body);

    this.client.publish({
      destination,
      body: JSON.stringify(body),
    });
  }
}

export default new SocketService();
