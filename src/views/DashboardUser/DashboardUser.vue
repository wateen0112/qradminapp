<template>
  <Page :dialogTitle="'إضافة مستخدم'" @save="addUsers" @search="SearchVal" ref="pageRef">
    <template #dialog-form>
      <addUser @closeDialog="closeDialog"></addUser>
    </template>

    <!-- <template >
    </template> -->

    <div class="px-5 py-5">
      <div class="delete">
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
              >
              </v-checkbox>
            </th>
            <th class="text-left">{{ $t("customers.name") }}</th>
            <th class="text-left">{{ $t("customers.email") }}</th>
            <th class="text-left">{{ $t("customers.phoneNumber") }}</th>
            <th class="text-left">{{ $t("customers.date") }}</th>
            <th class="text-left">{{ $t("customers.status") }}</th>
            <th class="text-left">{{ $t("customers.Details") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in store.paginateListUser" :key="item.id">
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
            <td>
              {{ item.phoneNumber }}
            </td>
            <td>
              {{ new Date(item.addDate).toLocaleDateString() }}
            </td>
            <td v-if="item.isBlocked">
              <span class="bg-error px-3 py-1 rounded-full">Blocked</span>
            </td>
            <td v-else>
              <span class="bg-success px-3 py-1 rounded-full">Not Blocked</span>
            </td>
            <td>
              <v-btn icon @click="goToDetails(item)" id="detail_bg" variant="text">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </v-table>
      <div class="flex justify-center items-center w-full bg-white border-t-2">
        <v-pagination
          v-model="pagination.pageIndex"
          :length="Math.ceil(store.filterListUser.length / pagination.pageSize)"
          rounded="circle"
          @update:modelValue="paginate"
          :total-visible="6"
        ></v-pagination>
      </div>
    </div>
  </Page>
</template>
<script lang="ts" setup>
import { ref, watch, computed } from "vue";
import Page from "../../components/global/Page.vue";
import { useUserStore } from "../../stores/DashUser";
import { useRouter } from "vue-router";
import { AppConfig } from "../../app.config";
import addUser from "./components/addUsers.vue";
import UserById from "./components/detailsUsers.vue";
import Sidebar from "@/core/components/layout/Sidebar.vue";
import { storeToRefs } from "pinia";
import type { AddUsers, User } from "../../models/dto/UserDto";
const ids = ref<Array<string>>([]);
const store = useUserStore();
const { Users, tempList } = storeToRefs(store);
const router = useRouter();
const pagination = computed(() => store.pagination);
const addUsers = store.addUsers;
const selectSingalList = ref<Array<string>>([]);
const selectList = ref<Array<string>>([]);
const isMulti = ref();
const pageRef = ref<InstanceType<typeof Page> | null>(null);
const Useres = computed(() => store.Users);
function removeItem(rows: Array<User>) {
  ids.value = rows.map((ele) => ele.id);
}
function deleteById() {
  store.DeleteUsers(selectList.value);
  store.getUsers();
}

function selectAll() {
  Users.value?.forEach((element: any) => {
    selectSingalList.value.push(element.id);
  });
  isMulti.value = !isMulti.value;
}
function popSelectAll() {
  selectSingalList.value.splice(0, selectSingalList.value.length);
}

function paginate(e: any) {
  store.paginationUser({
    pageSize: pagination.value.pageSize,
    pageIndex: e,
  });
}

function goToDetails(usr: any) {
  console.log("my dam dto ", usr);

  store.$patch({
    UserDto: {
      name: usr.name,
      birthDate: usr.birthDate,
      email: usr.email,
      id: usr.id,
      password: usr.password,
      phoneNumber: usr.phoneNumber,
      role: usr.role,
      isBlocked: usr.isBlocked,
    },
  });
  pageRef.value?.openDialog();
}
store.getUsers();
function closeDialog() {
  pageRef.value?.closeDialog();
}
const SearchVal = (el: any) => {
  Users.value = tempList.value;
  Users.value = Users.value?.filter((e: any) =>
    e.name.toLowerCase().includes(el.toLowerCase())
  );
};

function selectAllSingal(ids: any) {
  selectList.value.push(ids);
}
watch(selectList.value, () => {
  if (selectList.value.length > 0) {
    isMulti.value = true;
  } else {
    isMulti.value = false;
  }
});
</script>
<style lang="scss">
// #check {
//   width: 80px;
//   border-right: #c2c2c2 solid 1px;
//   margin: 0;
// }

// .delete {
//   height: 40px;
//   align-items: center;
//   justify-content: flex-end;
//   background-color: #fff;
//   display: flex;
//   padding: 10px;
// }

// tr {
//   border-top: #c2c2c2 solid 0.5px;
//   border-bottom: #c2c2c2 solid 0.5px;
// }

#detail_bg {
  width: 30px;
  height: 30px;
  background-color: transparent;
}

// #Delete {
//   display: flex;
//   height: 30px;
//   width: 30px;
//   align-items: center;
//   justify-content: center;
//   border-radius: 50%;
// }

// #Delete:hover {
//   background-color: #f0f0f0;
// }
</style>
