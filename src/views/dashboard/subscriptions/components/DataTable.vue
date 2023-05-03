<template>
  <div>
  

    <div v-if="loading === status.waiting">
      <loading-component></loading-component>
    </div>
    <div
      v-else-if="loading === status.error"
      class="w-[100%] min-h-[80vh] flex justify-center items-center"
    >
      <errorComponent @refresh="store.getAllSubscription"></errorComponent>
    </div>
    <div v-else>
      <div
    
        class="flex w-[100%] justify-end px-5 bg-white border-t-2"
      >
        <v-icon
          @click="deleteItems"
          class="pt-8 text-red-600 hover:opacity-[0.5] cursor-pointer"
          >mdi-delete</v-icon
        >
      </div>

      <v-table>
        <thead>
          <tr>
            <th class="text-left" id="check">
              <v-checkbox
                v-if="!isMulti"
                :value="selectList"
                v-model="selectList"
                color="primary"
                hide-details
                @change="selectAll"
              ></v-checkbox>
              <v-checkbox
                v-else
                v-model="isMulti"
                indeterminate
                color="primary"
                hide-details
                @change="popSelectAll"
              ></v-checkbox>
            </th>

            <th class="text-left">
              {{ $t("subsecriptionTypes.name") }}
              <v-icon
                v-if="sortNameFlag"
                class="pt-3 text-black"
                @click="sortFunction('name', sortNameFlag)"
                >mdi-menu-up
              </v-icon>
              <v-icon
                v-else
                class="pt-3 text-black"
                @click="sortFunction('name', sortNameFlag, true)"
                >mdi-menu-down
              </v-icon>
            </th>
            <th class="text-left min-w-[220px]">
              {{ $t("subsecriptionTypes.count") }}
              <v-icon
                v-if="sortCountFlag"
                class="pt-3 text-black"
                @click="sortFunction('subscriptionsCount', sortCountFlag, true)"
                >mdi-menu-up
              </v-icon>
              <v-icon
                v-else
                class="pt-3 text-black"
                @click="sortFunction('isActive', sortCountFlag, true)"
                >mdi-menu-down
              </v-icon>
            </th>
            <th class="text-left">
              {{ $t("subsecriptionTypes.price") }}
              <v-icon
                v-if="sortPriceFlag"
                class="pt-3 text-black"
                @click="sortFunction('price', sortPriceFlag)"
                >mdi-menu-up
              </v-icon>
              <v-icon
                v-else
                class="pt-3 text-black"
                @click="sortFunction('price', sortPriceFlag, true)"
                >mdi-menu-down
              </v-icon>
            </th>

            <th class="text-left">
              {{ $t("subsecriptionTypes.isActive") }}
              <v-icon
                v-if="sortActiveFlag"
                class="pt-3 text-black"
                @click="sortFunction('isActive', sortActiveFlag)"
                >mdi-menu-up
              </v-icon>
              <v-icon
                v-else
                class="pt-3 text-black"
                @click="sortFunction('isActive', sortActiveFlag, true)"
                >mdi-menu-down
              </v-icon>
            </th>
            <th class="text-left">
              {{ $t("subsecriptionTypes.addedDate") }}
              <v-icon
                v-if="sortDateFlag"
                class="pt-3 text-black"
                @click="sortFunction('addedDate', sortDateFlag)"
                >mdi-menu-up
              </v-icon>
              <v-icon
                v-else
                class="pt-3 text-black"
                @click="sortFunction('addedDate', sortDateFlag, true)"
                >mdi-menu-down
              </v-icon>
            </th>

            <th class="text-left">{{ $t("subsecriptionTypes.actions") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in subsecriptions?.slice(
              (pag - 1) * 4,
              pagPage * 4
            )"
            :key="item.id"
          >
            <td id="check">
              <v-checkbox
                v-model="selectSingalList"
                color="primary"
                :value="item.id"
                hide-details
                @change="selectAllSingal(item.id)"
              ></v-checkbox>
            </td>
            <td>{{ item.name }}</td>
            <td>{{ item.subscriptionsCount }}</td>
            <td>{{ item.price }}</td>
            <td v-if="item.isActive">
              <span class="bg-success px-3 py-1 rounded-full">{{
                $t("subsecriptionTypes.active")
              }}</span>
            </td>
            <td v-else>
              <span class="bg-error px-3 py-1 rounded-full"
                >{{ $t("subsecriptionTypes.notActive") }}
              </span>
            </td>

            <td>{{ item.addedDate.split("T")[0] }}</td>
            <td>
              <v-icon class="text-blue-600" @click="toggleSideBar(item)"
                >mdi-dots-vertical</v-icon
              >
            </td>
          </tr>
        </tbody>
      </v-table>
      <div
        v-if="subsecriptions?.length === 0"
        class="w-[100%] bg-white rounded-md p-5 text-center font-semibold text-lg"
      >
        {{ $t("subsecriptionTypes.noData") }}
      </div>
    </div>
    <div class="text-center">
      <v-pagination
        v-model="pagPage"
        :length="(arrLength % 4 > 0?arrLength / 4  +1:arrLength / 4  )"
        rounded="circle"
      ></v-pagination>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useSubStore } from "@/stores/subsecription";
import { storeToRefs } from "pinia";
import { ref, computed, watch, defineAsyncComponent, onBeforeMount } from "vue";
import { useDrawerStore } from "@/stores/drawer";
import { useAppStore } from "@/stores/App";
import { status } from "@/stores/App";

const drawerStore = useDrawerStore();
const store = useSubStore();
store.getAllSubscription();
const { subsecriptions, subsecription } = storeToRefs(store);
const pagPage = ref(1);
const selectSingalList = ref<Array<string>>([]);
const mainStore = useAppStore();
const { loading } = storeToRefs(mainStore);
const arrLength = computed(() => {
  return subsecriptions.value?.length ?? 1;
});
//selectList to store All list ids
let sortNameFlag = ref(false);
let sortCountFlag = ref(false);
let sortPriceFlag = ref(false);
let sortActiveFlag = ref(false);
let sortDateFlag = ref(false);
const loadingComponent = defineAsyncComponent(
  () => import("./DataTableLoading.vue")
);
const errorComponent = defineAsyncComponent(
  () => import("./ErrorComponent.vue")
);

const selectList = ref<Array<string>>([]);

const tempArray = subsecriptions.value;
const selectedAll = ref(false);
const selectAll = function () {
  selectedAll.value = !selectedAll.value;
  subsecriptions.value?.forEach((item) => {
    item.selected = true;
  });
};

function selectAllSingal(ids: any) {
  selectList.value.push(ids);
}

const itemsToDelete = ref();
const { drawer } = storeToRefs(drawerStore);
const isMulti = ref();
const selected = ref([]);
// watch selectList to change checkbox
watch(selectList.value, () => {
  if (selectList.value.length > 0) {
    isMulti.value = true;
  } else {
    isMulti.value = false;
  }
});
function popSelectAll() {
  selectSingalList.value.splice(0, selectSingalList.value.length);
}

const deleteItems = function () {
  itemsToDelete.value = []; //to avoid server errors if it sent empt
  subsecriptions.value?.forEach((item) => {
    if (item.selected) {
      itemsToDelete.value.push(item.id);
    }
  });

  store.deleteSubsecriber(selectList.value);
  store.getAllSubscription();
};

const emit = defineEmits(['details'])
const toggleSideBar = (item:any) => {
  subsecription.value = item
   emit('details');
};

const sortFunction = (by: any, flag: boolean, isDisc = false) => {
  flag = !flag;
  function compare(a: any, b: any) {
    if (a[by] < b[by]) {
      return isDisc ? -1 : 1;
    }
    if (a[by] > b[by]) {
      return isDisc ? 1 : -1;
    }
    return 0;
  }

  subsecriptions.value?.sort(compare);
  subsecriptions.value = subsecriptions.value?.sort();
};

// onBeforeMount(()=>{
//   store.getAll()
// })
</script>

<style scoped>
* {
  transition: 0.4s;
}
td {
  min-width: 200px;
}
</style>
