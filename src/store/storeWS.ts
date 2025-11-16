// store/wsStore.ts
import { create } from 'zustand'
import { storeChat } from './storeChat'
import { tokenManager } from '@/api/api'
import { WebSocketClient } from '@/api/wsClient'

type MessageCLtoSe = {
  type: string
  content: string
}

interface StoreWs {
  ws: WebSocketClient | null
  connect: (roomUUID: string) => void
  sendMessage: (msg: MessageCLtoSe) => void
  disconnect: () => void
}

export const storeWs = create<StoreWs>((set, get) => ({
  ws: null,

  connect: async (roomUUID: string) => {
    const client = new WebSocketClient({
      url: `wss://api.ozcoding.site/ws/chat/${roomUUID}/`,
      tokenManager,
      reconnect: true,
      reconnectInterval: 3000,

      onMessage: (event) => {
        const data = JSON.parse(event.data)
        storeChat.getState().addMessage(data)
      },
    })

    client.connect()
    set({ ws: client })
  },

  sendMessage: (msg) => {
    const ws = get().ws
    ws?.send(JSON.stringify(msg))
  },

  disconnect: () => {
    get().ws?.close()
    set({ ws: null })
  },
}))
