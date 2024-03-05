import { HttpService } from './http.service'
import { ChatEndpoint } from '../common/constants/chat.endpoint'

export class ChatService {
    private ws: WebSocket | null = null
    private url = import.meta.env.VITE_APP_WEBSOCKET
    constructor(private httpService: HttpService) {
        this.ws = null
    }

    async getLastMessages(){
        return this.httpService.get<string>(ChatEndpoint.LastMessages)
    }
    connect(email: string, handleMessageReceived: (event: MessageEvent) => void): boolean {
        try {
            this.ws = new WebSocket(`${this.url}/${email}`)
            this.ws.onmessage = handleMessageReceived
            return true
        } catch (e) {
            return false
        }
    }
    sendMessage(message: string): void {
        if (this.ws) {
            this.ws.send(message)
        }
    }
    disconnect(): void {
        if (this.ws) {
            this.ws.close()
            this.ws = null
        }
    }
}

const chatService = new ChatService(new HttpService())
export default chatService
