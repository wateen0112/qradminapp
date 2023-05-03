<template>
  <div class="px-3 mx-8">
    <div class="w-[94%] justify-end">
      <div
        class="bottom-0 h-[40px] flex md:flex-row flex-col justify-between text-center md:justify-between"
      >
        <!-- 👉 Footer: left content -->
         <div>
          <span class="md:flex text-center gap-x-2">
          
            {{ new Date().getFullYear() }}
            &copy;
            <a
              href="https://www.facebook.com/Elkood?mibextid=ZbWKwL"
              target="_blank"
              rel="noopener noreferrer"
              class="text-yellow-400 ms-1"
              >ELKOOD</a
            >
            <span> {{ $t("nfcService.Powered") }}</span>

          </span>
        </div>
        <!-- 👉 Footer: right content -->

        <div>
          <span class="md:flex gap-x-2">
            <a class="text-yellow-400" href="" target="noopener noreferrer"
              >QR
            </a>
            <span> {{ $t("nfcService.Reserved") }}</span>
          </span> 
        </div>

       
      </div>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
