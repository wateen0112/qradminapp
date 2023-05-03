<template>
  <v-navigation-drawer :location="$i18n.locale === 'ar' ? 'right' : 'left'" 
  :dir="$i18n.locale === 'ar' ? 'rtl' : 'ltr'"
    :rail="!expand && breakpoints.isGreater('sm')" rail-width="85"
    :expand-on-hover="true" class="sidebar shadow-lg d-flex"
    v-model="AppStore.Sidebar" app width="280">
    <div class="sidebar px-3 z-40">
      <div class="flex justify-between items-center my-2">
        <img src="@/assets/logoDash.svg" class="w-[55%]"/>
        <v-btn class="hidden md:block" variant="plain"
          @click="expand = !expand">
          <div class="border-4 border-primary h-6 w-6 rounded-full"
            :class="{ 'bg-primary': expand }"></div>
        </v-btn>
      </div>

      <div class="sidebar-body">
        <SidebarMenu></SidebarMenu>
      </div>
    </div>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref } from "vue";
import SidebarMenu from "./SidebarMenu.vue";
import { useAppStore } from "@/stores/App";
import { useBreakpoints, breakpointsTailwind } from '@vueuse/core'
// ? Define
const AppStore = useAppStore();
const expand = ref(false);
const breakpoints = useBreakpoints(breakpointsTailwind);
</script>

<style lang="scss" scoped>
* {
  font-family: "Almarai", sans-serif;
  transition: 0.4s;
}

.sidebar {
  max-height: 100vh !important;
}
</style>
