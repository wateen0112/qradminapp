<template>
  <button class="native-btn">
    <f-icon icon="home"></f-icon>
    <slot></slot>
  </button>
</template>

<style lang="scss">
@import "@vars";

.native-btn {
  display: flex;
  gap: 0.8rem;
  background-color: $light-1;
  padding: 0.8rem;

  svg {
    height: 20px;
  }
}
</style>
