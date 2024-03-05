import { HttpService } from './http.service'
import { TaskPath } from '../common/constants/task.endpoint'
import { addTask } from '../common/types/type'
export class TaskService {
    constructor(private httpService: HttpService) {}

    async readall() {
        return this.httpService.get<string>(TaskPath.ReadAll)
    }

    async create(
        data: addTask,
        header: Record<string, unknown> = {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                accept: 'application/json',
            },
        },
    ) {
        return this.httpService.post<string, addTask>(TaskPath.Create, data, header)
    }

    async delete(id:number,
        header: Record<string, unknown> = {
            withCredentials: true,
            headers: {
                accept: 'application/json',
            },
        },
        
        ) {
        return this.httpService.delete<string>(`${TaskPath.Delete}/${id}`,header)
    }
    async search(query: string) {
        const path = `${TaskPath.Search}/${query}`
        return this.httpService.get<string>(path)
    }
    async update(
        id:string,
        data: addTask,
        header: Record<string, unknown> = {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                accept: 'application/json',
            },
        },
    ) {
        const path =  `${TaskPath.Update}/${id}`
        console.log(id)
        return this.httpService.put<string, addTask>(path, data, header)
    }
    async getOne(id:string) {
        const path = `${TaskPath.GetOne}/${id}`
        return this.httpService.get<string>(path)
    }
}

const taskService = new TaskService(new HttpService())
export default taskService
