import { Layouts } from "../models/enums/index";
import { defineStore } from "pinia"
import { ref } from "vue"
export enum status {
waiting, loaded, error,

}
export const useAppStore = defineStore('app', () => {

  // ? STATE 
  
  const Sidebar = ref()
  const loading = ref (status.waiting);
   const lang = ref (localStorage.getItem('lang')??'en');
  const ActiveLayout = ref(Layouts.Dashboard);
  const ActiveTheme = ref('light')

  //  ?ACTIONS 

  function SET_SIDE_BAR(is: boolean) {
    Sidebar.value = is
  }
  function SET_THEME(theme: string) {
    ActiveTheme.value = theme
  }
  function SET_LAYOUT(layout: Layouts) {
    ActiveLayout.value = layout
  }
  return { SET_SIDE_BAR, SET_THEME, SET_LAYOUT, ActiveTheme, Sidebar, ActiveLayout,loading,lang}
})