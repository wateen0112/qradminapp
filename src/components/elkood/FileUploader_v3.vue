<template>
    <div class="ek-file-uploader">
        <label :for="`file-uploader-${id}`">

            <input placeholder="Upload File" />
        </label>
        <input disabled :id="`file-uploader-${id}`" type="file" hidden />
    </div>
</template>

<script setup lang="ts">
const id = Date.now() * (Math.random() * 10000)




</script>




<style scoped lang="scss">
.ek-file-uploader {
    width: 100%;
    text-align: center;
    border: 1px dashed;
    height: max-content;
    background-color: #ffffff;

    label {
        input {
            margin: auto;
            text-align: center;

        }
    }
}
</style>