import { defineStore } from "pinia";
import {ref} from 'vue';
export const useLoadingStore = defineStore('loading',()=>{
//my  state 


const loading = ref(1);
    return{loading};
})
