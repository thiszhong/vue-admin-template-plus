import { RouteRecordRaw } from 'vue-router'

export type MenuRouteRecordRaw = RouteRecordRaw & { fullpath: string; children?: MenuRouteRecordRaw[] }
