<template>
  <Page
    :dialogTitle="$t('customers.addCustomer')"
    :button-text="$t('customers.addCustomer')"
    ref="pageRef"
    @search="searchCustomer($event)"
  >
    <template #dialog-form>
      <AddCustomer @closeDialog="closeDialog"> </AddCustomer>
    </template>
    <!-- {{ store.filterListCustomer }} -->

    <div class="transition-all">
      <div
        v-if="selectList.length > 0"
        class="border-b-2 bg-white w-full flex justify-end items-end pl-3 py-2 transition-all"
      >
        <v-btn
          icon
          @click="deleteById"
          size="md"
          variant="text"
          color="danger"
          class="py-1"
        >
          <v-icon>mdi-trash-can-outline</v-icon>
        </v-btn>
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
            <th class="text-left">{{ $t("customers.name") }}</th>
            <th class="text-left">{{ $t("customers.email") }}</th>
            <th class="text-left">{{ $t("customers.phoneNumber") }}</th>
            <th class="text-left">{{ $t("customers.account") }}</th>
            <th class="text-left">{{ $t("customers.numQr") }}</th>
            <th class="text-left">{{ $t("customers.details") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in store.paginateListCustomer" :key="item.id">
            <td id="check">
              <v-checkbox
                v-model="selectSingalList"
                color="primary"
                :value="item.id"
                @select="removeItem"
                hide-details
                @change="selectAllSingal(item.id)"
              ></v-checkbox>
            </td>
            <td>{{ item.name }}</td>
            <td>{{ item.email }}</td>
            <td>{{ item.phoneNumber }}</td>
            <td>
              <v-chip
                class="ma-2 font-bold"
                text-color="white"
                style="padding: 3px 5px"
                :color="item.isBlocked ? 'red' : 'green'"
              >
                {{ item.isBlocked ? " غير مفعل" : " مفعل" }}
              </v-chip>
            </td>
            <td>{{ item.qrCount }}</td>
            <td>
              <v-btn
                icon
                @click="goToDetails(item.id)"
                size="md"
                variant="text"
              >
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
      <div class="flex justify-center items-center w-full bg-white border-t-2">
        <v-pagination
          v-model="pagination.pageIndex"
          :length="
            Math.ceil(store.filterListCustomer.length / pagination.pageSize)
          "
          rounded="circle"
          @update:modelValue="paginate"
          :total-visible="6"
        ></v-pagination>
      </div>
    </div>
  </Page>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";
import Page from "@/components/global/Page.vue";
import { useCustomerStore } from "@/stores/customers";
import { computed, ref, watch } from "vue";
import AddCustomer from "./components/addCustomer.vue";

interface Cusomers {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  isBlocked: boolean;
  qrCount: number;
}

const router = useRouter();
const pagination = computed(() => store.pagination);
const store = useCustomerStore();
const selectSingalList = ref<Array<string>>([]);
const selectList = ref<Array<string>>([]);
const isMulti = ref();
const pageRef = ref();
const customers = computed(() => store.customers);
const ids = ref<Array<string>>([]);

function deleteById() {
  store.deleteCustomer(selectList.value);
}
function closeDialog() {
  pageRef.value?.closeDialog();
}
function searchCustomer(e: any) {
  store.findCustomer(e);
}
function paginate(e: any) {
  store.paginationCustomer({
    pageSize: pagination.value.pageSize,
    pageIndex: e,
  });
}

//select all singal id
function selectAll() {
  customers.value?.forEach((element: any) => {
    selectSingalList.value.push(element.id);
  });
  isMulti.value = !isMulti.value;
}
function popSelectAll() {
  selectSingalList.value.splice(0, selectSingalList.value.length);
}
function goToDetails(id: string) {
  router.push(`customersAccount/${id}`);
}
//select singal id
function selectAllSingal(ids: any) {
  selectList.value.push(ids);
}
function removeItem(rows: Array<Cusomers>) {
  ids.value = rows.map((ele) => ele.id);
}
watch(selectList.value, () => {
  if (selectList.value.length > 0) {
    isMulti.value = true;
  } else {
    isMulti.value = false;
  }
});

store.GetAllCustomer();
</script>
