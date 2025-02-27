import axios from "axios";
import { defineStore } from "pinia";
import { instance } from ".";

interface IWebSocketState {
  socket: WebSocket | null;
  isConnected: boolean;
  messages: IPayload[];
}

export interface IPayload {
  nome: string;
  para: string;
  mensagem: string;
}

const ws = import.meta.env.VITE_WS_URL;

export const store = defineStore("websocket", {
  state: (): IWebSocketState => ({
    socket: null,
    isConnected: false,
    messages: [],
  }),

  actions: {
    connect() {
      if (this.socket && this.isConnected) return;

      this.socket = new WebSocket(ws);

      this.socket.onopen = () => {
        this.isConnected = true;
      };

      this.socket.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          this.messages.push(message);
        } catch (error) {
          console.error("Erro ao processar mensagem WebSocket:", error);
        }
      };

      this.socket.onclose = () => {
        this.isConnected = false;
      };

      this.socket.onerror = (error) => {
        console.error("Erro no WebSocket:", error);
      };
    },

    send(payload: IPayload) {
      return axios
        .post(`/api/mensagens`, payload)
        .then((response) => response.data);
    },

    close() {
      if (this.socket) {
        this.socket.close();
      }
    },
  },
});

export const useWebSocketStore = store(instance);
