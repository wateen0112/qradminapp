<template>
    <div class="flex flex-col justify-center items-center">
        <h1 class="text-3xl">  ☹️💔 خطأ في تحميل البيانات  </h1>
  <v-btn
  @click="$emit('refresh')"
  class="mt-20 px-20 py-2 min-h-[60px] "><h3  class="font-bold text-teal-50">  إعادة المحاولة </h3></v-btn>
        
       </div>
</template>
<script setup>
const emit = defineEmits(["refresh" ]);


</script>