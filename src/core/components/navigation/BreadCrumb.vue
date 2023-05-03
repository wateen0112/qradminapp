<!--<template>
  <div class="breadcrumb">
    <ul>
      <li v-for="(item, i) in items" :key="i" :class="{ active: item.active }">
        <f-icon :icon="item.icon"></f-icon>
        <router-link class="mx-1" :disabled="item.active" :to="item.path">{{
          item.text
        }}</router-link>
        <f-icon icon="angle-right"></f-icon>
      </li>
    </ul>
  </div>
</template>

// <script setup lang="ts">
// import type BreadCrumbType from "../../../models/types/BreadCrumb";
// defineProps({
//   items: {
//     type: Array as () => Array<BreadCrumbType>,
//   },
// });
// </script>-->
//
<style scoped lang="scss">
// @import "@vars";
// .breadcrumb {
//   ul {
//     display: flex;
//     gap: 15px;
//     li {
//       display: flex;
//       align-items: center;
//       svg {
//         height: 14px;
//       }
//       a {
//         margin-left: 5px;
//         margin-right: 15px;
//       }

//       &.active,
//       &:hover {
//         a,
//         svg {
//           color: $gray-700;
//         }
//       }

//       &:last-child {
//         svg {
//           &:last-child {
//             display: none;
//           }
//         }
//       }
//     }
//   }
// }
//
</style>
