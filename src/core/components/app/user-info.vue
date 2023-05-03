<template>
  <div class="d-flex align-items-center flex gap-2">
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn
          id="_btn"
          variant="plain"
          color="transparent"
          v-bind="props"
          class="text-grey-darken-1 text-capitalize"
          append-icon="mdi-menu-down"
        >
          {{ GetUserDate.name }}
        </v-btn>
      </template>
      <v-list color="flat">
        <v-list-item v-for="(item, i) in items" :key="i" :value="item">
          <v-list-item-title v-text="item.text1"></v-list-item-title>
          <v-list-item-title
            v-text="item.text2"
            @click="logout"
          ></v-list-item-title>
          <template v-slot:prepend>
            <v-icon :icon="item.icon"> </v-icon>
          </template>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-avatar class="bg-primary bg-opacity-25">
      <v-icon>mdi-account</v-icon>
    </v-avatar>
  </div>
</template>

<script>
import router from "@/router";
export default {
  data: () => ({
    items: [
      { text1: "Profile", icon: "mdi-account" },
      { text2: "Logout", icon: "mdi-door-open" },
    ],
  }),
  computed: {
    GetUserDate() {
      const userData = localStorage.getItem("UserData");
      if (userData) {
        return JSON.parse(userData);
      } else return '';
    },
  },
  methods: {
    logout() {
      localStorage.removeItem("AccessToken");
      localStorage.removeItem("RefreshToken");
      localStorage.removeItem("UserData");
      router.push("/login");
    },
  },
};
</script>
<style lang="scss" scoped>
#_btn {
  font-size: 16px;
  font-weight: bold;
}
</style>
