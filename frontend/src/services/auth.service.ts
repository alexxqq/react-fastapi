import { HttpService } from './http.service'
import { AuthEndpoint } from '../common/constants/auth.endpoint'

export class AuthService {
    constructor(private httpService: HttpService) {}

    async login(
        data: unknown,
        headers: Record<string, unknown> = {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                accept: 'application/json',
            },
        },
    ) {
        return this.httpService.post<string, unknown>(AuthEndpoint.Login, data, headers)
    }

    async registration(
        data: unknown,
        headers: Record<string, unknown> = {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                accept: 'application/json',
            },
        },
    ) {
        return this.httpService.post<string, unknown>(AuthEndpoint.Sign, data, headers)
    }

    async logout(
        headers: Record<string, unknown> = {
            withCredentials: true,
            headers: {
                accept: 'application/json',
            },
        },
    ) {
        return this.httpService.post<string, null>(AuthEndpoint.Logout, null, headers)
    }
    async verify() {
        return this.httpService.get<string>(AuthEndpoint.Verify)
    }
}

const authService = new AuthService(new HttpService())
export default authService
