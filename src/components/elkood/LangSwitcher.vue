<script lang="ts" setup>
import { ref } from "vue";

const emit = defineEmits(['update:modelValue'])
const langs = ref([
  {
    label: 'العربية',
    icon: '',
    value: 'ar',
  },
  {
    label: 'English',
    icon: '',
    value: 'en',
  },
  {
    label: 'Germany',
    icon: '',
    value: 'de',
  },
])

function emitEvent(v: string) {
  emit('update:modelValue', v)
}
</script>

<template>
  <VSelect variant="plain" model-value="ar" class="w-44 my-4 flex justify-start items-center"
    prepend-icon="mdi-web" color="primary" item-title="label"
    :items="langs" item-value="value" @update:model-value="emitEvent" />
</template>
