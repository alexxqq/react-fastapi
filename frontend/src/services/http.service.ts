import axios from 'axios'

export class HttpService {
    private baseURL: string
    constructor() {
        this.baseURL = import.meta.env.VITE_APP_API_KEY
    }
    getFullUrl(url: string): string {
        return `${this.baseURL}/${url}`
    }

    async get<T>(url: string): Promise<T> {
        const res = await axios.get<T>(this.getFullUrl(url), { withCredentials: true })

        return res.data
    }

    async post<T, D>(url: string, data: D, headers: any): Promise<T> {
        console.log(data)
        console.log(headers)
        const res = await axios.post<T>(this.getFullUrl(url), data, headers)

        return res.data
    }

    async put<T, D>(url: string, data: D, headers: any): Promise<T> {
        const res = await axios.put<T>(this.getFullUrl(url), data,headers)

        return res.data
    }

    async delete<T>(url: string, headers: any): Promise<T> {
        const res = await axios.delete<T>(this.getFullUrl(url), headers)

        return res.data
    }

    async patch<T, D>(url: string, data: D): Promise<T> {
        const res = await axios.patch<T>(this.getFullUrl(url), data, { withCredentials: true })

        return res.data
    }

    async options<T>(url: string): Promise<T> {
        const res = await axios.options<T>(this.getFullUrl(url), { withCredentials: true })

        return res.data
    }

    async head<T>(url: string): Promise<T> {
        const res = await axios.head<T>(this.getFullUrl(url), { withCredentials: true })

        return res.data
    }
}
