<template>
  <div class="overflow-y-auto h-100 px-0">
    <v-list>
      <template v-for="(item, i) in navLinks" :key="i">
        <v-list-subheader  v-if="item.header"
          >{{ $t(item.header) }}
        </v-list-subheader>
  
        <div v-else>
          <v-list-item
            :to="item.path"
            class="my-5 text-black font-extrabold"
            rounded="lg"
            variant="text"
          >
            <template v-slot:prepend>
              <v-icon color="light" :icon="item.icon"></v-icon>
            </template>
            <v-list-item-title v-text="$t(item.title)"></v-list-item-title>
          </v-list-item>
        </div>
      </template>
    </v-list>
  </div>
</template>
<script lang="ts" setup>
import { I18n } from "vue-i18n";
import type { NavigationItem } from "../../../models/types/base";
import { NavLinks } from "../../../router/navigation";
import { computed } from "@vue/reactivity";
const navLinks = computed<NavigationItem[]>(() => NavLinks);
</script>
<style>
.icon {
  height: 13px;
}
</style>
