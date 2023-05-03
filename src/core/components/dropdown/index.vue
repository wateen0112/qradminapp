<template>
  <div class="dropdown">
    <button class="dropdown-toggler" @click="open = !open">
      <slot></slot>
    </button>

    <div class="dropdown-menu" :class="{ hidden: !open }">
      <slot name="menu"> </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const open = ref(false);
</script>

<style scoped lang="scss">
@import "@vars";
.dropdown {
  position: relative;
  .dropdown-menu {
    box-shadow: 0 0 5px -2px $dark;
    position: absolute;
    z-index: 10;
    background-color: $light;
    width: 100%;

    &.hidden {
      display: none;
    }
  }
}
</style>
