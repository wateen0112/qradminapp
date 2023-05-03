<template>
  <ActiveLayout>
    <router-view v-slot="{ Component }">
      <!-- ? App.vue -->
      <template v-if="Component">
        <v-theme-provider>

          <!-- ? RouterView -->
          <Suspense>


            <component :is="Component">


              <template #fallback>

                <h2>loading</h2>
              </template>
            </component>
          </Suspense>




        </v-theme-provider>
        <!-- </ActiveLayout> -->
      </template>
    </router-view>

  </ActiveLayout>
      <Footer class="mt-5"/>
      
    
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { watch, onMounted } from 'vue'
import ActiveLayout from "@/layout/ActiveLayout.vue"
import Footer from '@/layout/layouts/Footer.vue'


const { locale } = useI18n();
function initHTML(l: string) {
  const html = document.querySelector('html');
  if (html && l) {
    localStorage.setItem('lang', l)
    html.setAttribute('dir', l === 'ar' ? "rtl" : "ltr");
    html.setAttribute('lang', l);
  }
}
watch(locale, (nv) => {
  if (nv)
    initHTML(nv)
})
onMounted(() => {
  const locale = localStorage.getItem('lang')
  initHTML(locale ? locale : "en")
})
</script>

<style>

</style>
