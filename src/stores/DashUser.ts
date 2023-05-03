import { defineStore } from "pinia";

// import api from "@/api/endpoints/DashUser";
import type { User, AddUsers } from "../models/dto/UserDto";
import { reactive, ref  ,computed} from "vue";
import { useApi } from "@/composables/useApi";
import { UserController } from "@/api";
interface Pagination {
  pageSize: number,
  pageIndex: number,
}
export const useUserStore = defineStore("User", () => {
  const { GET, POST, DELETE } = useApi();
  const UserDto = reactive<AddUsers>({
    id: "",
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    birthDate: "",
    isBlocked: true,
    role: [],
  });
  const User = reactive<User>({
    id: "",
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    addDate: "",
    isBlocked: false,
  });

      const Users = ref<any[]>([]);
    const filterVal = ref("");
  const tempList = ref<Array<User>>();
  const UserAd = ref<AddUsers>();
  const pagination = ref({
    pageSize: 10,
    pageIndex: 1,
  });
  //state
  function paginationUser(payload: Pagination) {
    pagination.value = {
      pageSize: payload.pageSize,
      pageIndex: payload.pageIndex,
    }
  }

      const paginateListUser = computed(() => {
        return filterListUser.value.slice(
          (pagination.value.pageIndex - 1) * pagination.value.pageSize,
          pagination.value.pageSize * pagination.value.pageIndex
        );
      });
      const filterListUser = computed(() => {
        return Users.value.filter(
          (ele: { email: string; name: string; phoneNumber: string }) =>
            ele.name.toLowerCase().includes(filterVal.value.toLowerCase()) ||
            ele.email.toLowerCase().includes(filterVal.value.toLowerCase()) ||
            !Users.value
        );
        // ele.phoneNumber.toLowerCase().includes(filterVal.value.toLowerCase()) ||
      });

  async function getUsers() {
    const response: any = await GET(UserController.GetUsersAll, {});
    Users.value = response.data;
    tempList.value = response.data;
  }
  async function addUsers(payload: AddUsers) {
    const { data } = await POST(UserController.addUsers, payload, {
      comfirm: false,
      error: true,
      success: "تمت اضافة المستخدم بنجاح",
    });
    Users.value?.unshift(data);
  }
  async function GetIdUser(id: any) {
    const { data } = await GET<any>(UserController.GetIdUser + id, { id });

    UserAd.value = data;
  }
  // UserController.deleteUsers,
  async function DeleteUsers(payload: any) {
    const { data } = await DELETE(UserController.deleteUsers, payload);
    payload.forEach((itemDleted: any) => {
      Users.value = Users.value?.filter((user: any) => itemDleted !== user.id);
    });
    // Users.value = data;
  }
  async function Modify(payload: any) {
    const { data } = await POST(UserController.modifyUsers, payload, {
      comfirm: false,
      error: true,
      success: "تمت اضافة التعديلات  بنجاح",
    });
    Users.value = data;
    Users.value = Users.value?.filter((el: any) => {
      return el.id != UserAd.value?.id, el.id;
    });
    Users.value?.push(data);
  }


  async function blockUser(id: any) {
    // console.log("my id", id);

    const { data } = await POST(UserController.BlockUser + id, {
      comfirm: false,
      error: true,
      success: "تم حظر المستخدم بنجاح",
    });

    UserAd.value = data;
  }
  async function UnBlockUser(id: any) {
    const { data } = await POST(UserController.UnBlockUser + id, {
      comfirm: false,
      error: true,
      success: "تمت إلغاء حضر المستخدم بنجاح",
    });
    UserAd.value = data;
  }
  return {
    paginateListUser,
    filterListUser,
    tempList,
    UserDto,
    User,
    Users,
    Modify,
    getUsers,
    paginationUser,
    addUsers,
    GetIdUser,
    DeleteUsers,
    UserAd,
    pagination,
    blockUser,
    UnBlockUser,
  };
});
