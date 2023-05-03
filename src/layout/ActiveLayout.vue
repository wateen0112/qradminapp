<template>
  <!-- The App Will Render Here -->
  <component :is="activeComponent">

    <slot></slot>

  </component>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useAppStore } from "../stores/App";
import { storeToRefs } from "pinia";
import Dashboard from "./layouts/Dashboard.vue";
import FullScreen from "./layouts/FullScreen.vue";
import Normal from "./layouts/Normal.vue";
import { Layouts } from "../models/enums";
const AppStore = useAppStore();

// ? LAYOUTS COMPONENTS
const components = {
  Dashboard,
  FullScreen,
  Normal,
};

// ? GETTERS AND COMPUTED DATA
const { ActiveLayout } = storeToRefs(useAppStore());
const activeComponent = computed(() => components[ActiveLayout.value]);

// ? METHODS
const updateLayout = () => {
  AppStore.SET_LAYOUT(Layouts.Dashboard);
};
ActiveLayout.value = Layouts.FullScreen;

updateLayout();
</script>
