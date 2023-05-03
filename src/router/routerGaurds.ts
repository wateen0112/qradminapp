import type { Layouts } from "@/models/enums";
import { useAppStore } from "@/stores/App";
import type { RouteLocation } from "vue-router";
// import { useAuthStore } from "@/stores/Auth";
import { IsLoggedIn } from '../utils/authentication/index';

export const beforeEach = (
  to: RouteLocation,
  from: RouteLocation,
  next: any
  ) => {
  console.log('IsLoggedIn: ', IsLoggedIn());
   
  const appStore = useAppStore();
  appStore.SET_LAYOUT(to.meta?.layout as Layouts);
  if (to.meta.needAuth && !IsLoggedIn()) {

    next('/login')
  }
  else next()



};
