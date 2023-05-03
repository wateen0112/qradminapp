<template>
  <div>
    <slot name="header">
      <v-toolbar class="page-header">
        <div class="flex gap-3 items-center">
          <h1 class="font-bold">{{ $route.matched[0].name }}</h1>
          <span>|</span>
          <v-breadcrumbs :items="breadCrumbItems"> </v-breadcrumbs>
        </div>
        <div class="w-50 d-flex align-center justify-end">
          <slot name="actions">
            <v-text-field
              type="text"
              v-if="search"
              prepend-inner-icon="mdi-magnify"
              @update:model-value="$emit('search', $event)"
              :label="props.placeholder"
            >
            </v-text-field>

            <slot name="action-button">
              <v-dialog
                v-model="dialog"
                scrollable
                persistent
                color="primary"
                width="720"
              >
                <template v-slot:activator="{ props }">
                  <v-btn
                    prepend-icon="mdi-plus"
                    v-if="add"
                    v-bind="props"
                    id="btn_btn"
                    variant="flat"
                  >
                    {{ buttonText }}
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title
                    class="text-lg px-5 flex justify-between items-center"
                  >
                    <span>
                      {{ dialogTitle }}
                    </span>

                    <v-btn
                      icon="mdi-close"
                      variant="text"
                      type="button"
                      color="black"
                      @click="rollbackEvent()"
                    />
                  </v-card-title>

                  <slot name="dialog-form"> </slot>
                  <slot name="dialog-details"> </slot>

                  <v-divider></v-divider>
                  <v-card-actions v-if="modalActions">
                    <v-btn variant="flat" @click="saveEvent"> حفظ </v-btn>
                    <v-btn variant="tonal" @click="rollbackEvent">
                      تراجع
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </slot>
          </slot>
        </div>
      </v-toolbar>
    </slot>

    <main>
      <slot> </slot>
    </main>
  </div>
</template>
<script lang="ts" setup>
import type BreadCrumb from "@/models/types/BreadCrumb";
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { boolean } from "yup";
import { useAppStore } from "../../stores/App";
const route = useRoute();
const breadCrumbItems = computed<BreadCrumb[]>(
  () => route.meta.breadCrumb as BreadCrumb[] | []
);
const emit = defineEmits(["save", "close", "search"]);
const props = defineProps({
  search: {
    type: Boolean,
    default: true,
  },
  placeholder: {
    type: String,
    default: "ابحث في الصفحة",
  },
  qury: {
    type: String,
  },
  add: {
    type: Boolean,
    default: true,
  },
  buttonText: {
    type: String,
    default: "New",
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  dialogTitle: {
    type: String,
    default: "Dialog Title",
  },
  modalActions: {
    type: Boolean,
    default: false,
  },
});
// REFS
const dialog = ref(false);

// Getters

// Functions
const openDialog = () => (dialog.value = true);
const closeDialog = () => (dialog.value = false);
const saveEvent = () => emit("save");
const rollbackEvent = () =>{
  closeDialog();
  emit('close')
}
defineExpose({
  openDialog,
  closeDialog,
});

</script>

<style lang="scss">
@import "@/assets/scss/variables.scss";

.page-header {
  background-color: transparentize($color: $white, $amount: 0.1) !important;
  padding: 0.8rem !important;
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: transparent !important;

  .left-side,
  .right-side {
    display: flex;
    align-items: center;
    gap: 2rem;

    .page-title {
      font-weight: bold;
    }
  }
}

.v-input__control {
  display: flex;
  grid-area: control;
  height: 3rem;
  align-items: center;
}

.svg {
  text-align: center;
  margin-top: 10px;
  color: rgb(140, 185, 65, 1);
}

.svg:hover {
  color: rgb(34, 51, 6);
}

#btn_btn {
  height: 55px !important;
  display: flex;
  text-align: center;
  margin-left: 10px;
  margin-right: 10px;
  align-items: center;
  justify-content: space-around;
  align-content: center;
}
</style>
