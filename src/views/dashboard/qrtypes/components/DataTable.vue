<template>
  <div>
    <div v-if="loading === status.waiting">
      <loading-component></loading-component>
    </div>
    <div
      v-else-if="loading === status.error"
      class="w-[100%] min-h-[80vh] flex justify-center items-center"
    >
      <errorComponent @refresh="store.getAll"></errorComponent>
    </div>
    <div v-else>
      <div class="transition-all">
        <div
          v-if="selectList.length > 0"
          class="border-b-2 bg-white w-full flex justify-end items-end pl-3 py-2 transition-all"
        >
          <v-btn icon size="md" variant="text" color="danger" class="py-1">
            <v-icon>mdi-trash-can-outline</v-icon>
          </v-btn>
        </div>

        <v-table>
          <thead>
            <tr>
              <th class="text-left">
                {{ $t("qrTypes.name") }}
                <v-icon
                  v-if="sortFlag"
                  class="pt-3 text-black"
                  @click="sortFunction('name', sortFlag)"
                  >mdi-menu-up
                </v-icon>
                <v-icon
                  v-else
                  class="pt-3 text-black"
                  @click="sortFunction('name', sortFlag, true)"
                  >mdi-menu-down
                </v-icon>
              </th>
              <th class="text-left">
                {{ $t("qrTypes.count") }}
                <v-icon
                  v-if="sortCountFlag"
                  class="pt-3 text-black"
                  @click="sortFunction('count', sortCountFlag)"
                  >mdi-menu-up
                </v-icon>
                <v-icon
                  v-else
                  class="pt-3 text-black"
                  @click="sortFunction('count', sortCountFlag, true)"
                  >mdi-menu-down
                </v-icon>
              </th>
              <th class="text-left min-w-[220px]">
                {{ $t("qrTypes.status") }}
                <v-icon
                  v-if="sortActivityFlag"
                  class="pt-3 text-black"
                  @click="sortFunction('isActive', sortActivityFlag, true)"
                  >mdi-menu-up
                </v-icon>
                <v-icon
                  v-else
                  class="pt-3 text-black"
                  @click="sortFunction('isActive', sortActivityFlag, true)"
                  >mdi-menu-down
                </v-icon>
              </th>

              <th class="text-left">{{ $t("qrTypes.actions") }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in store.paginateListQr" :key="item.id">
              <td>{{ item.name }}</td>
              <td>{{ item.count }}</td>
              <td>
                <v-chip
                  class="ma-2 font-bold"
                  text-color="white"
                  style="padding: 3px 5px"
                  :color="item.isActive ? 'green' : 'red'"
                >
                  {{
                    item.isActive
                      ? $t("qrTypes.active")
                      : $t("qrTypes.notActive")
                  }}
                </v-chip>
              </td>
              <!-- <td v-if="item.isActive">
                <span class="bg-success px-3 py-1 rounded-full">{{
                  $t("qrTypes.active")
                }}</span>
              </td>
              <td v-else>
                <span class="bg-error px-3 py-1 rounded-full"
                  >{{ $t("qrTypes.notActive") }}
                </span>
              </td> -->

              <td>
                <v-icon color="primary" @click="toggleSideBar(item.id)"
                  >mdi-dots-vertical</v-icon
                >
              </td>
            </tr>
          </tbody>
        </v-table>
      </div>
      <div class="flex justify-center items-center w-full bg-white border-t-2">
        <v-pagination
          v-model="pagination.pageIndex"
          :length="Math.ceil(store.filterListQr.length / pagination.pageSize)"
          rounded="circle"
          @update:modelValue="paginate"
          :total-visible="6"
        ></v-pagination>
      </div>
      <!-- <div class="flex w-[100%] justify-end px-5 bg-white border-t-2"></div> -->

      <!-- <v-table>
        <thead>
          <tr>
            <th class="text-left">
              {{ $t("qrTypes.name") }}
              <v-icon
                v-if="sortFlag"
                class="pt-3 text-black"
                @click="sortFunction('name', sortFlag)"
                >mdi-menu-up
              </v-icon>
              <v-icon
                v-else
                class="pt-3 text-black"
                @click="sortFunction('name', sortFlag, true)"
                >mdi-menu-down
              </v-icon>
            </th>
            <th class="text-left">
              {{ $t("qrTypes.count") }}
              <v-icon
                v-if="sortCountFlag"
                class="pt-3 text-black"
                @click="sortFunction('count', sortCountFlag)"
                >mdi-menu-up
              </v-icon>
              <v-icon
                v-else
                class="pt-3 text-black"
                @click="sortFunction('count', sortCountFlag, true)"
                >mdi-menu-down
              </v-icon>
            </th>
            <th class="text-left min-w-[220px]">
              {{ $t("qrTypes.status") }}
              <v-icon
                v-if="sortActivityFlag"
                class="pt-3 text-black"
                @click="sortFunction('isActive', sortActivityFlag, true)"
                >mdi-menu-up
              </v-icon>
              <v-icon
                v-else
                class="pt-3 text-black"
                @click="sortFunction('isActive', sortActivityFlag, true)"
                >mdi-menu-down
              </v-icon>
            </th>

            <th class="text-left">{{ $t("qrTypes.actions") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in qrTypes" :key="item.id">
            <td>{{ item.name }}</td>
            <td>{{ item.count }}</td>
            <td v-if="item.isActive">
              <span class="bg-success px-3 py-1 rounded-full">{{
                $t("qrTypes.active")
              }}</span>
            </td>
            <td v-else>
              <span class="bg-error px-3 py-1 rounded-full"
                >{{ $t("qrTypes.notActive") }}
              </span>
            </td>

            <td>
              <v-icon class="text-blue-600" @click="toggleSideBar(item.id)"
                >mdi-dots-vertical</v-icon
              >
            </td>
          </tr>
        </tbody>
      </v-table> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useQrTypeStore } from "@/stores/QrType";
import { storeToRefs } from "pinia";
import { ref, computed, watch, defineAsyncComponent, onBeforeMount } from "vue";
import { useDrawerStore } from "@/stores/drawer";
import { useAppStore } from "@/stores/App";
import { i18n } from "@/i18n";
import { object } from "yup";
import { status } from "@/stores/App";
const drawerStore = useDrawerStore();
const store = useQrTypeStore();
const { qrTypes, lang } = storeToRefs(store);
const emit = defineEmits(["details"]);
const selectSingalList = ref<Array<string>>([]);
const mainStore = useAppStore();
const { loading } = storeToRefs(mainStore);
const query = ref("");
//selectList to store All list ids
let sortFlag = false;
const pagination = computed(() => store.pagination);
function paginate(e: any) {
  store.paginationQuestion({
    pageSize: pagination.value.pageSize,
    pageIndex: e,
  });
}
const loadingComponent = defineAsyncComponent(
  () => import("./DataTableLoading.vue")
);
const errorComponent = defineAsyncComponent(
  () => import("./ErrorComponent.vue")
);
let sortCountFlag = false;
let sortActivityFlag = false;
const selectList = ref<Array<string>>([]);

const tempArray = qrTypes.value;
const selectedAll = ref(false);
const selectAll = function () {
  selectedAll.value = !selectedAll.value;
  qrTypes.value?.forEach((item) => {
    item.selected = selectedAll.value;
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
  qrTypes.value?.forEach((item) => {
    if (item.selected) {
      itemsToDelete.value.push(item.id);
    }
  });

  store.deletQrType(selectList.value);
  store.getAll(lang.value);
};
const { qrType } = storeToRefs(store);

const dto = computed(() => {
  return {
    id: qrType.value?.id,
    name: qrType.value?.name ?? "",
    count: parseInt((qrType.value?.count ?? 0) + ""),
    isActive: qrType.value?.isActive ?? false,
    description: qrType.value?.description,
  };
});
const modify = () => {
  console.log("object to be modified  : ", dto.value);
  store.modify(lang.value);
  store.getAll(lang.value);
  drawer.value = !drawer.value;
};
const toggleSideBar = (id: string) => {
  store.getById(id , lang.value);
  emit("details");
};

const sortFunction = (by: any, flag: boolean, isDisc = false) => {
  flag = isDisc;
  function compare(a: any, b: any) {
    if (a[by] < b[by]) {
      return isDisc ? -1 : 1;
    }
    if (a[by] > b[by]) {
      return isDisc ? 1 : -1;
    }
    return 0;
  }

  qrTypes.value?.sort(compare);
  qrTypes.value = qrTypes.value?.sort();
};
watch(lang, (id:string) => {
  store.getById(id ,lang.value);
})
// onBeforeMount(()=>{
//   store.getAll()
// })
</script>
