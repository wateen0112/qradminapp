<template>
  <div>
    <v-app class="dashboard-layout position-relative">
      <!-- Layout Navbar -->
      <!-- <div></div> -->
      <!-- Layout Bread Crump -->
      <Sidebar></Sidebar>
      <!-- <Toolbar></Toolbar> -->

      <v-main>
        <Navbar></Navbar>
        <div class="px-3 mb-4">

          <slot></slot>
        </div>
      </v-main>
    </v-app>
  </div>
</template>

<script setup lang="ts">
import Navbar from "@components/layout/Navbar.vue";
import Sidebar from "@/core/components/layout/Sidebar.vue";

</script>

<style lang="scss" scoped>

</style>
