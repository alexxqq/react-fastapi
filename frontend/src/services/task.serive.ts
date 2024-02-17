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

    async delete(query:number) {
        const path = `${TaskPath.Search}/${query}`
        return this.httpService.delete<string>(path)
    }
    async search(query:string) {
      const path = `${TaskPath.Search}/${query}`
      return this.httpService.get<string>(path)
  }
  }

const taskService = new TaskService(new HttpService())
export default taskService
