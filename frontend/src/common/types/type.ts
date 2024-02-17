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
    shouldRender :any
}
export type addTask = {
    name: string
    description: string
    tags: string
}