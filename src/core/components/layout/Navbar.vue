<template>
  <div class="d-flex justify-content-between w-100 shadow-sm bg-white p-2">
    <v-btn
      @click="AppStore.SET_SIDE_BAR(!Sidebar)"
      icon
      class="d-block d-lg-none"
    >
      <v-icon> mdi-menu </v-icon>
    </v-btn>

    <v-btn icon v-if="$route.meta.backBtn">
      <v-icon> mdi-arrow-left </v-icon>
    </v-btn>
    <div class="left">
      <v-breadcrumbs> </v-breadcrumbs>
    </div>
    <div class="d-flex align-center justify-content-end justify-space-between">
      <div>
        <v-select
          :items="langOptions"
          item-value="value"
          v-model="i18n.global.locale"
          item-title="name"
          variant="plain"
        ></v-select>
      </div>

      <UserInfo></UserInfo>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from "vue";
import { useAppStore } from "../../.././stores/App";
import UserInfo from "../app/user-info.vue";
import { storeToRefs } from "pinia";
import { i18n } from "@/i18n";

const AppStore = useAppStore();
const { lang } = storeToRefs(AppStore);
const Sidebar = computed(() => AppStore.Sidebar);
const langOptions = [
  {
    name: "Ar",
    value: "ar",
  },
  {
    name: "EN",
    value: "en",
  },
  {
    name: "DE",
    value: "de",
  },
];

watch(lang, (nv) => {
  if (nv == "en") {
    i18n.global.locale.value = "en";

    localStorage.setItem("lang", "en");
  } else if (nv == "de") {
    i18n.global.locale.value = "de";
    localStorage.setItem("lang", "de");
  } else {
    i18n.global.locale.value = "ar";

    localStorage.setItem("lang", "ar");
  }
});
</script>

<style lang="scss">
// @import "@vars";
.v-toolbar__content {
  width: 100%;
  display: flex;
  justify-content: space-between;
  position: relative;
}

.left,
.right {
  display: flex;
}
</style>
