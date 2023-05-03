export type NavLink = {
    title: string,
    path: string,
    icon?: string,
    svg?: string,
    roles?: string[]
    isHeader?: boolean
    childrens?: NavLink[]
}