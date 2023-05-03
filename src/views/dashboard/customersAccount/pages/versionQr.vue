<template>
  <div class="mt-10">
    <!-- {{ store.versionsQr }} -->
    <v-table>
      <thead>
        <tr>
          <th class="text-left">{{ $t("customers.versions") }}</th>
          <th class="text-left w-[150px]">
            {{ $t("customers.activation") }}
          </th>
          <th class="text-left">
            {{ $t("customers.versionStatus") }}
          </th>
          <th class="text-left">
            {{ $t("customers.versionsDetails") }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in store.versionsQr" :key="item.id">
          <td>{{ item.version }}</td>
          <td class="flex justify-center items-center w-[150px]">
            <v-checkbox
              v-model="item.isSelected"
              color="primary"
              hide-details
              @change="changeSelect(item.isSelected)"
            ></v-checkbox>
            <span>
              {{
                item.isSelected
                  ? $t("customers.enabled")
                  : $t("customers.disenabled")
              }}
            </span>
          </td>
          <td>{{ item.status }}</td>
          <td>
            <v-btn icon size="md" variant="text" @click="goToDetailsVersion">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
    <!-- <div class="flex justify-center items-center w-full bg-white border-t-2">
      <v-pagination
        v-model="pagModify.pageIndex"
        :length="slide(customerDetailsDto.qrsModified, i)"
        rounded="circle"
        @update:modelValue="paginate($event, i)"
        :total-visible="10"
        class="flex justify-center items-center w-full"
        ></v-pagination>
    </div> -->
  </div>
</template>
<script setup lang="ts">
import { useCustomerStore } from "@/stores/customers";
import { useRoute } from "vue-router";
import { AppConfig } from "@/app.config";
const route: any = useRoute();
const store = useCustomerStore();
store.getVersionQr(route.query.id, route.query.qrIndex);
function goToDetailsVersion() {
  window.open(
    `${AppConfig.DOMAIN_HOST_CUSTOMER}/dynamic/${route.query.qrIndex}/${route.query.id}`
  );
}

function changeSelect(val: boolean) {
  store.selectActivateVersion(
    {
      id: route.query.id,
      qrIndex: route.query.qrIndex,
    },
    val
  );
}
</script>
