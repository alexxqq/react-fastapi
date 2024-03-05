import { HttpService } from './http.service'
import { ChatEndpoint } from '../common/constants/chat.endpoint'

export class ChatService {
    constructor(private httpService: HttpService) {}


    async getLastMessages() {
        return this.httpService.get<string>(ChatEndpoint.LastMessages)
    }
}

const chatService = new ChatService(new HttpService())
export default chatService
