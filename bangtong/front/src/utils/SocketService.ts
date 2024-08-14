import { Client, Frame } from "@stomp/stompjs";
import SockJS from "sockjs-client";

class SocketService {
  private client: Client;

  constructor() {
    this.client = new Client({
      webSocketFactory: () =>
        new SockJS(`${process.env.REACT_APP_BACKEND_URL}/signaling`),
      onConnect: () => {
        console.log("Socket Connected");
      },
      onStompError: (frame) => {
        console.error("Broker reported error: " + frame.headers["message"]);
        console.error("Additional details: " + frame.body);
      },
    });
  }

  connect(): Promise<void> {
    return new Promise((resolve) => {
      this.client.onConnect = () => {
        console.log("Connected");
        resolve();
      };
      this.client.activate();
    });
  }

  disconnect(): void {
    this.client.deactivate();
  }

  subscribe(destination: string, callback: (message: Frame) => void): void {
    this.client.subscribe(destination, callback);
  }

  send(destination: string, body: any): void {
    this.client.publish({
      destination,
      body: JSON.stringify(body),
    });
  }
}

export default new SocketService();
