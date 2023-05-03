/// <reference types="vite/client" />
/// <reference types="vite/client" />
/// <reference types="vite-plugin-pages/client" />

import type { Layouts, Roles } from '@/models/enums'
import 'vue-router'

declare module 'vue-router' {
    interface RouteMeta {
        needAuth: boolean,
        breadCrumb?: any[],
        title: string,
        pageTitle?:string,
        layout: Layouts,
        roleName: "Admin" | "Editor"
    }
}
