export type tasks = {
    date: string
    tag: string[]
    tags: string[]
    name: string
    description: string
    user: any
    id: number
}
export type task = {
    date: string
    tags: string[]
    name: string
    description: string
    user: any
    id: number
    shouldRender: any
}
export type addTask = {
    name: string
    description: string
    tags: string
}
export type message = {
    message: string
}
export type user = {
    username: string
    email: string
    id: number
}
export type taskRaw = {
    date: string
    tags: string[]
    name: string
    description: string
    user: user
    id: number
}