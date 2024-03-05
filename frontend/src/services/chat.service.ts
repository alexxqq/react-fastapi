import { HttpService } from './http.service'
import { ChatEndpoint } from '../common/constants/chat.endpoint'

export class ChatService {
    private websocket: string
    constructor(private httpService: HttpService) {
        this.websocket = import.meta.env.WEBSOCKET
    }


    async getLastMessages() {
        return this.httpService.get<string>(ChatEndpoint.LastMessages)
    }
    getURL(){
        return this.websocket
    }
}

const chatService = new ChatService(new HttpService())
export default chatService
