<template>
    <div>
        <label>{{ label }}</label>
        <div class="image-picker" @drop="dropHandler" @dragover="dragOverHandler">
            <label :for="`image-picker-${id}`">
                <svg v-if="loading" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                    style="margin: auto; background: none; display: block; shape-rendering: auto" width="204px"
                    height="204px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                    <g transform="translate(83,50)">
                        <g transform="rotate(0)">
                            <circle cx="0" cy="0" r="2" fill="#aeaeae" fill-opacity="1">
                                <animateTransform attributeName="transform" type="scale" begin="-1.2718600953895072s"
                                    values="3.48 3.48;1 1" keyTimes="0;1" dur="1.3513513513513513s"
                                    repeatCount="indefinite"></animateTransform>
                                <animate attributeName="fill-opacity" keyTimes="0;1" dur="1.3513513513513513s"
                                    repeatCount="indefinite" values="1;0" begin="-1.2718600953895072s"></animate>
                            </circle>
                        </g>
                    </g>
                    <g transform="translate(80.77158357034375,61.92097498417605)">
                        <g transform="rotate(21.176470588235293)">
                            <circle cx="0" cy="0" r="2" fill="#aeaeae" fill-opacity="0.9411764705882353">
                                <animateTransform attributeName="transform" type="scale" begin="-1.192368839427663s"
                                    values="3.48 3.48;1 1" keyTimes="0;1" dur="1.3513513513513513s"
                                    repeatCount="indefinite"></animateTransform>
                                <animate attributeName="fill-opacity" keyTimes="0;1" dur="1.3513513513513513s"
                                    repeatCount="indefinite" values="1;0" begin="-1.192368839427663s"></animate>
                            </circle>
                        </g>
                    </g>
                    <g transform="translate(74.38729426828175,72.23195624033639)">
                        <g transform="rotate(42.35294117647059)">
                            <circle cx="0" cy="0" r="2" fill="#aeaeae" fill-opacity="0.8823529411764706">
                                <animateTransform attributeName="transform" type="scale" begin="-1.1128775834658187s"
                                    values="3.48 3.48;1 1" keyTimes="0;1" dur="1.3513513513513513s"
                                    repeatCount="indefinite"></animateTransform>
                                <animate attributeName="fill-opacity" keyTimes="0;1" dur="1.3513513513513513s"
                                    repeatCount="indefinite" values="1;0" begin="-1.1128775834658187s"></animate>
                            </circle>
                        </g>
                    </g>
                    <g transform="translate(64.70936574062577,79.54038861471706)">
                        <g transform="rotate(63.52941176470588)">
                            <circle cx="0" cy="0" r="2" fill="#aeaeae" fill-opacity="0.8235294117647058">
                                <animateTransform attributeName="transform" type="scale" begin="-1.0333863275039745s"
                                    values="3.48 3.48;1 1" keyTimes="0;1" dur="1.3513513513513513s"
                                    repeatCount="indefinite"></animateTransform>
                                <animate attributeName="fill-opacity" keyTimes="0;1" dur="1.3513513513513513s"
                                    repeatCount="indefinite" values="1;0" begin="-1.0333863275039745s"></animate>
                            </circle>
                        </g>
                    </g>
                    <g transform="translate(53.04485586228897,82.85922781773614)">
                        <g transform="rotate(84.70588235294117)">
                            <circle cx="0" cy="0" r="2" fill="#aeaeae" fill-opacity="0.7647058823529411">
                                <animateTransform attributeName="transform" type="scale" begin="-0.9538950715421304s"
                                    values="3.48 3.48;1 1" keyTimes="0;1" dur="1.3513513513513513s"
                                    repeatCount="indefinite"></animateTransform>
                                <animate attributeName="fill-opacity" keyTimes="0;1" dur="1.3513513513513513s"
                                    repeatCount="indefinite" values="1;0" begin="-0.9538950715421304s"></animate>
                            </circle>
                        </g>
                    </g>
                    <g transform="translate(40.96912132762127,81.74024622470303)">
                        <g transform="rotate(105.88235294117648)">
                            <circle cx="0" cy="0" r="2" fill="#aeaeae" fill-opacity="0.7058823529411765">
                                <animateTransform attributeName="transform" type="scale" begin="-0.8744038155802861s"
                                    values="3.48 3.48;1 1" keyTimes="0;1" dur="1.3513513513513513s"
                                    repeatCount="indefinite"></animateTransform>
                                <animate attributeName="fill-opacity" keyTimes="0;1" dur="1.3513513513513513s"
                                    repeatCount="indefinite" values="1;0" begin="-0.8744038155802861s"></animate>
                            </circle>
                        </g>
                    </g>
                    <g transform="translate(30.11305699948454,76.33456850024791)">
                        <g transform="rotate(127.05882352941175)">
                            <circle cx="0" cy="0" r="2" fill="#aeaeae" fill-opacity="0.6470588235294118">
                                <animateTransform attributeName="transform" type="scale" begin="-0.794912559618442s"
                                    values="3.48 3.48;1 1" keyTimes="0;1" dur="1.3513513513513513s"
                                    repeatCount="indefinite"></animateTransform>
                                <animate attributeName="fill-opacity" keyTimes="0;1" dur="1.3513513513513513s"
                                    repeatCount="indefinite" values="1;0" begin="-0.794912559618442s"></animate>
                            </circle>
                        </g>
                    </g>
                    <g transform="translate(21.942834520922737,67.37226137495276)">
                        <g transform="rotate(148.23529411764704)">
                            <circle cx="0" cy="0" r="2" fill="#aeaeae" fill-opacity="0.5882352941176471">
                                <animateTransform attributeName="transform" type="scale" begin="-0.7154213036565977s"
                                    values="3.48 3.48;1 1" keyTimes="0;1" dur="1.3513513513513513s"
                                    repeatCount="indefinite"></animateTransform>
                                <animate attributeName="fill-opacity" keyTimes="0;1" dur="1.3513513513513513s"
                                    repeatCount="indefinite" values="1;0" begin="-0.7154213036565977s"></animate>
                            </circle>
                        </g>
                    </g>
                    <g transform="translate(17.561887710431243,56.06373408794682)">
                        <g transform="rotate(169.41176470588235)">
                            <circle cx="0" cy="0" r="2" fill="#aeaeae" fill-opacity="0.5294117647058824">
                                <animateTransform attributeName="transform" type="scale" begin="-0.6359300476947536s"
                                    values="3.48 3.48;1 1" keyTimes="0;1" dur="1.3513513513513513s"
                                    repeatCount="indefinite"></animateTransform>
                                <animate attributeName="fill-opacity" keyTimes="0;1" dur="1.3513513513513513s"
                                    repeatCount="indefinite" values="1;0" begin="-0.6359300476947536s"></animate>
                            </circle>
                        </g>
                    </g>
                    <g transform="translate(17.561887710431243,43.93626591205319)">
                        <g transform="rotate(190.58823529411762)">
                            <circle cx="0" cy="0" r="2" fill="#aeaeae" fill-opacity="0.47058823529411764">
                                <animateTransform attributeName="transform" type="scale" begin="-0.5564387917329093s"
                                    values="3.48 3.48;1 1" keyTimes="0;1" dur="1.3513513513513513s"
                                    repeatCount="indefinite"></animateTransform>
                                <animate attributeName="fill-opacity" keyTimes="0;1" dur="1.3513513513513513s"
                                    repeatCount="indefinite" values="1;0" begin="-0.5564387917329093s"></animate>
                            </circle>
                        </g>
                    </g>
                    <g transform="translate(21.942834520922734,32.62773862504726)">
                        <g transform="rotate(211.76470588235296)">
                            <circle cx="0" cy="0" r="2" fill="#aeaeae" fill-opacity="0.4117647058823529">
                                <animateTransform attributeName="transform" type="scale" begin="-0.4769475357710652s"
                                    values="3.48 3.48;1 1" keyTimes="0;1" dur="1.3513513513513513s"
                                    repeatCount="indefinite"></animateTransform>
                                <animate attributeName="fill-opacity" keyTimes="0;1" dur="1.3513513513513513s"
                                    repeatCount="indefinite" values="1;0" begin="-0.4769475357710652s"></animate>
                            </circle>
                        </g>
                    </g>
                    <g transform="translate(30.113056999484513,23.665431499752113)">
                        <g transform="rotate(232.9411764705882)">
                            <circle cx="0" cy="0" r="2" fill="#aeaeae" fill-opacity="0.35294117647058826">
                                <animateTransform attributeName="transform" type="scale" begin="-0.397456279809221s"
                                    values="3.48 3.48;1 1" keyTimes="0;1" dur="1.3513513513513513s"
                                    repeatCount="indefinite"></animateTransform>
                                <animate attributeName="fill-opacity" keyTimes="0;1" dur="1.3513513513513513s"
                                    repeatCount="indefinite" values="1;0" begin="-0.397456279809221s"></animate>
                            </circle>
                        </g>
                    </g>
                    <g transform="translate(40.96912132762126,18.25975377529697)">
                        <g transform="rotate(254.1176470588235)">
                            <circle cx="0" cy="0" r="2" fill="#aeaeae" fill-opacity="0.29411764705882354">
                                <animateTransform attributeName="transform" type="scale" begin="-0.3179650238473768s"
                                    values="3.48 3.48;1 1" keyTimes="0;1" dur="1.3513513513513513s"
                                    repeatCount="indefinite"></animateTransform>
                                <animate attributeName="fill-opacity" keyTimes="0;1" dur="1.3513513513513513s"
                                    repeatCount="indefinite" values="1;0" begin="-0.3179650238473768s"></animate>
                            </circle>
                        </g>
                    </g>
                    <g transform="translate(53.04485586228898,17.14077218226386)">
                        <g transform="rotate(275.2941176470589)">
                            <circle cx="0" cy="0" r="2" fill="#aeaeae" fill-opacity="0.23529411764705882">
                                <animateTransform attributeName="transform" type="scale" begin="-0.2384737678855326s"
                                    values="3.48 3.48;1 1" keyTimes="0;1" dur="1.3513513513513513s"
                                    repeatCount="indefinite"></animateTransform>
                                <animate attributeName="fill-opacity" keyTimes="0;1" dur="1.3513513513513513s"
                                    repeatCount="indefinite" values="1;0" begin="-0.2384737678855326s"></animate>
                            </circle>
                        </g>
                    </g>
                    <g transform="translate(64.70936574062574,20.459611385282937)">
                        <g transform="rotate(296.4705882352941)">
                            <circle cx="0" cy="0" r="2" fill="#aeaeae" fill-opacity="0.17647058823529413">
                                <animateTransform attributeName="transform" type="scale" begin="-0.1589825119236884s"
                                    values="3.48 3.48;1 1" keyTimes="0;1" dur="1.3513513513513513s"
                                    repeatCount="indefinite"></animateTransform>
                                <animate attributeName="fill-opacity" keyTimes="0;1" dur="1.3513513513513513s"
                                    repeatCount="indefinite" values="1;0" begin="-0.1589825119236884s"></animate>
                            </circle>
                        </g>
                    </g>
                    <g transform="translate(74.38729426828174,27.768043759663595)">
                        <g transform="rotate(317.6470588235294)">
                            <circle cx="0" cy="0" r="2" fill="#aeaeae" fill-opacity="0.11764705882352941">
                                <animateTransform attributeName="transform" type="scale" begin="-0.0794912559618442s"
                                    values="3.48 3.48;1 1" keyTimes="0;1" dur="1.3513513513513513s"
                                    repeatCount="indefinite"></animateTransform>
                                <animate attributeName="fill-opacity" keyTimes="0;1" dur="1.3513513513513513s"
                                    repeatCount="indefinite" values="1;0" begin="-0.0794912559618442s"></animate>
                            </circle>
                        </g>
                    </g>
                    <g transform="translate(80.77158357034375,38.07902501582395)">
                        <g transform="rotate(338.8235294117647)">
                            <circle cx="0" cy="0" r="2" fill="#aeaeae" fill-opacity="0.058823529411764705">
                                <animateTransform attributeName="transform" type="scale" begin="0s"
                                    values="3.48 3.48;1 1" keyTimes="0;1" dur="1.3513513513513513s"
                                    repeatCount="indefinite"></animateTransform>
                                <animate attributeName="fill-opacity" keyTimes="0;1" dur="1.3513513513513513s"
                                    repeatCount="indefinite" values="1;0" begin="0s"></animate>
                            </circle>
                        </g>
                    </g>
                    <!-- [ldio] generated by https://loading.io/ -->
                </svg>


                <slot v-else>
                    <!-- Drop File Icom -->
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path
                            d="M19,10a1,1,0,0,0-1,1v3.38L16.52,12.9a2.79,2.79,0,0,0-3.93,0l-.7.71L9.41,11.12a2.79,2.79,0,0,0-3.93,0L4,12.61V7A1,1,0,0,1,5,6h8a1,1,0,0,0,0-2H5A3,3,0,0,0,2,7V19.22A2.79,2.79,0,0,0,4.78,22H17.22a2.88,2.88,0,0,0,.8-.12h0a2.74,2.74,0,0,0,2-2.65V11A1,1,0,0,0,19,10ZM5,20a1,1,0,0,1-1-1V15.43l2.89-2.89a.78.78,0,0,1,1.1,0L15.46,20Zm13-1a1,1,0,0,1-.18.54L13.3,15l.71-.7a.77.77,0,0,1,1.1,0L18,17.21ZM21,4H20V3a1,1,0,0,0-2,0V4H17a1,1,0,0,0,0,2h1V7a1,1,0,0,0,2,0V6h1a1,1,0,0,0,0-2Z" />
                    </svg>


                </slot>


            </label>

            <input :id="`image-picker-${id}`" type="file" alt="choose image" v-bind="$attrs" @change="onFileChange" />
            <div v-if="isMulti && multiFiles.length" class="multi-container">
                <div class="image-picker-preview-wrapper">
                    <div class="preview multi rounded shadow" v-for="image in multiFiles" :key="image.id">
                        <img :src="image.base64" alt="Loading..." class="rounded w-100" v-if="image"
                            :class="{ contain: image.isDoc || contain, cover: cover }" />

                        <span class="preview-item-name" v-if="image.isDoc">{{
                        image.file.name
                        }}</span>
                        <div class="delete-btn" @click="deleteFile(image.id)">
                            <svg aria-hidden="true" focusable="false" fill="#fff" height="20px" data-prefix="far"
                                data-icon="trash-alt" class="svg-inline--fa fa-trash-alt fa-w-14" role="img"
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path
                                    d="M268 416h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12zM432 80h-82.41l-34-56.7A48 48 0 0 0 274.41 0H173.59a48 48 0 0 0-41.16 23.3L98.41 80H16A16 16 0 0 0 0 96v16a16 16 0 0 0 16 16h16v336a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128h16a16 16 0 0 0 16-16V96a16 16 0 0 0-16-16zM171.84 50.91A6 6 0 0 1 177 48h94a6 6 0 0 1 5.15 2.91L293.61 80H154.39zM368 464H80V128h288zm-212-48h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12z">
                                </path>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            <div v-else class="preview shadow">
                <img :src="fileImage.base64" alt="Loading..." v-if="!isMulti && fileImage.base64"
                    :class="{ contain: fileImage.isDoc || contain, cover: cover }" />
                <span class="preview-item-name" v-if="fileImage.isDoc || contain">{{
                fileImage.file.name
                }}</span>
                <div class="delete-btn" @click="deleteFile(0)" v-if="fileImage">
                    <svg aria-hidden="true" focusable="false" fill="#fff" height="20px" data-prefix="far"
                        data-icon="trash-alt" class="svg-inline--fa fa-trash-alt fa-w-14" role="img"
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path
                            d="M268 416h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12zM432 80h-82.41l-34-56.7A48 48 0 0 0 274.41 0H173.59a48 48 0 0 0-41.16 23.3L98.41 80H16A16 16 0 0 0 0 96v16a16 16 0 0 0 16 16h16v336a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128h16a16 16 0 0 0 16-16V96a16 16 0 0 0-16-16zM171.84 50.91A6 6 0 0 1 177 48h94a6 6 0 0 1 5.15 2.91L293.61 80H154.39zM368 464H80V128h288zm-212-48h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12z">
                        </path>
                    </svg>
                </div>
            </div>
        </div>

        <!-- Old Images Preview -->
        <div v-if="image || images.length">
            <label>الصور الحالية</label>
            <div class="old-images-container">
                <div v-if="isMulti && images.length" class="multi-container">
                    <div class="image-picker-preview-wrapper">
                        <div class="preview multi rounded shadow-sm" v-for="item in images" :key="item">
                            <img :src="item" alt="Loading..." class="rounded w-100" v-if="item" />

                            <div class="delete-btn" @click="deleteImages(item)">
                                <svg aria-hidden="true" focusable="false" fill="#fff" height="20px" data-prefix="far"
                                    data-icon="trash-alt" class="svg-inline--fa fa-trash-alt fa-w-14" role="img"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                    <path
                                        d="M268 416h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12zM432 80h-82.41l-34-56.7A48 48 0 0 0 274.41 0H173.59a48 48 0 0 0-41.16 23.3L98.41 80H16A16 16 0 0 0 0 96v16a16 16 0 0 0 16 16h16v336a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128h16a16 16 0 0 0 16-16V96a16 16 0 0 0-16-16zM171.84 50.91A6 6 0 0 1 177 48h94a6 6 0 0 1 5.15 2.91L293.61 80H154.39zM368 464H80V128h288zm-212-48h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12z">
                                    </path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-else class="preview image">
                    <img :src="image" alt="Loading..." v-if="image && !isMulti"
                        :class="{ contain: fileImage.isDoc || contain }" class="w-100" />

                    <span class="preview-item-name" v-if="fileImage.isDoc || contain">{{
                    fileImage.file.name
                    }}</span>

                    <div class="delete-btn" @click="deleteImage" v-if="fileImage">
                        <svg aria-hidden="true" focusable="false" fill="#fff" height="20px" data-prefix="far"
                            data-icon="trash-alt" class="svg-inline--fa fa-trash-alt fa-w-14" role="img"
                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path
                                d="M268 416h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12zM432 80h-82.41l-34-56.7A48 48 0 0 0 274.41 0H173.59a48 48 0 0 0-41.16 23.3L98.41 80H16A16 16 0 0 0 0 96v16a16 16 0 0 0 16 16h16v336a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128h16a16 16 0 0 0 16-16V96a16 16 0 0 0-16-16zM171.84 50.91A6 6 0 0 1 177 48h94a6 6 0 0 1 5.15 2.91L293.61 80H154.39zM368 464H80V128h288zm-212-48h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12z">
                            </path>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Compressor from "compressorjs";
export default {
    props: {
        value: null,
        base64: Boolean,
        quality: {
            type: Number,
            default: 0.7,
        },
        contain: {
            type: Boolean,
            default: false,
        },
        cover: {
            type: Boolean,
            default: true,
        },
        images: {
            type: Array,
            default: () => [],
        },
        image: String,
        label: String,
    },
    data() {
        return {
            fileImage: { base64: "", id: "", file: null },
            multiFiles: [],
            id: Math.random() * 100000,
            loading: false,
        };
    },
    computed: {
        isMulti() {
            return Object.keys(this.$attrs).includes("multiple");
        },
    },
    methods: {
        onFileChange(e) {
            let files = e.target.files;
            if (this.isMulti) {
                this.getMultiFiles(files);
            } else {
                this.getFile(files[0]);
            }
        },
        upload() {
            if (this.isMulti) this.$emit("input", this.multiFiles);
            else {
                this.$emit("input", this.fileImage);
            }
        },
        deleteEvent(v) {
            this.$emit("imageDelete", { deleted: v, images: this.images });
        },
        reset() {
            this.fileImage = { base64: "", id: "", file: null };
            this.multiFiles = [];
            this.loading = false;
            this.$emit("input", null);
        },
        getFile(file) {
            if (file) this.loading = true;
            this.toBase64(file).then((base64) => {
                if (!file) {
                    return;
                }
                let vm = this;
                if (this.isImage(this.getFileExt(file))) {
                    new Compressor(file, {
                        quality: vm.quality,
                        success(result) {
                            (vm.fileImage = {
                                base64,
                                file: new File([result], file.name, {
                                    lastModified: new Date().getTime(),
                                    type: result.type,
                                }),
                                id: Date.now(),
                            }),
                                vm.upload();
                            vm.loading = false;
                        },
                        error(err) {
                            alert(err.message);
                        },
                    });
                } else {
                    console.log("not Image", file);

                    this.fileImage = { file, base64, id: Date.now(), isDoc: true };
                    console.log(this.fileImage);
                    this.upload();
                    this.loading = false;
                }
            });
        },
        getMultiFiles(files) {
            for (const file of files) {
                this.loading = true;
                this.toBase64(file).then((base64) => {
                    if (!file) {
                        return;
                    }
                    let vm = this;
                    if (this.isImage(this.getFileExt(file))) {
                        new Compressor(file, {
                            quality: vm.quality,
                            success(result) {
                                vm.fileImage = {
                                    base64,
                                    file: new File([result], file.name, {
                                        lastModified: new Date().getTime(),
                                        type: result.type,
                                    }),
                                    id: Date.now(),
                                };
                                vm.multiFiles.push(vm.fileImage);
                                vm.loading = false;
                                vm.upload();
                            },
                            error(er) {
                                alert(er.message);
                            },
                        });
                    } else {
                        let fileImage = {
                            base64,
                            file: file,
                            id: Date.now(),
                            isDoc: true,
                        };
                        this.multiFiles.push(fileImage);
                        this.loading = false;
                        this.upload();
                    }
                });
            }
        },
        isImage(ext) {
            return ext === "jpg" || ext === "png" || ext === "jpeg" || ext === "webpg";
        },
        toBase64(file) {
            if (this.isImage(this.getFileExt(file))) {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = () => {
                        resolve(reader.result);
                    };
                    reader.onerror = (error) => reject(error);
                });
            } else
                return new Promise((res, rej) => {
                    if (file.type.includes("video")) res("/media/placeholder/video-placholder.png");
                    else res("/media/images/placeholders/file-placholder.png");
                    rej("not Support");
                });
        },
        deleteFile(id) {
            if (this.isMulti) {
                this.multiFiles = this.multiFiles.filter((img) => {
                    return img.id != id;
                });
            } else {
                this.fileImage = { base64: "", id: "", file: null };
            }
            this.upload();
        },
        prevent(e) {
            e.preventDefault();
        },
        drop(e) {
            e.preventDefault();
        },
        dropHandler(ev) {
            ev.preventDefault();
            let files = ev.dataTransfer.files;
            if (this.isMulti) {
                // Use DataTransferItemList interface to access the file(s)
                this.getMultiFiles(files);
            } else {
                this.getFile(ev.dataTransfer.files[0]);
            }
        },
        dragOverHandler(ev) {
            // Prevent default behavior (Prevent file from being opened)
            ev.preventDefault();
        },
        getFileExt(file) {
            let fileExt = file.name.split(".").pop();
            return fileExt;
        },
        deleteImage() {
            this.deleteEvent(this.image);
            this.image = "";
        },
        deleteImages(item) {
            this.deleteEvent(item);
            this.images = this.images.filter((el) => el != item);
        },

    },


};
</script>
<style lang="scss">
.contain {
    object-fit: contain !important;
}

.cover {
    object-fit: cover !important;
}

.old-images-container {
    border: 1.5px dashed #ccc;
    border-radius: 0.5rem;
}

.preview {
    position: relative;
    overflow: hidden;
    border-radius: 0.5rem !important;
    transition: 0.3s;

    &-item-name {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 20%;
        width: auto;
    }

    .delete-btn {
        right: 0;
        cursor: pointer;
        border: none;
        padding: 0.4rem 0.8rem;
        background-color: rgb(206, 35, 35);
        color: #fff;
        box-shadow: -4px 5px 15px -5px #000 !important;
        position: absolute;
        z-index: 10;
        top: 0px;
        border-radius: 0 0 0 5px;
    }

    img {
        transition: 1s;
        width: 100%;
        height: 250px;
        object-fit: fill;
        border-radius: 0.5rem;
        user-select: none;
    }
}

.image-picker-preview-wrapper {
    display: flex;
    flex-wrap: wrap;

    .preview.multi {
        flex: 0 0 50%;
        margin: 0.4rem 0;
        padding: 0 0.3rem;

        img {
            object-fit: cover;
            height: 100%;
        }

        .delete-btn {
            right: 0.3rem;
        }
    }

    @media (min-width: 992px) {
        .preview.multi {
            flex: 0 0 22.33333333%;
        }
    }

    @media (max-width: 768px) {
        .preview.multi {
            flex: 0 0 100%;
        }
    }
}

.multi-container {
    max-height: 420px;
    overflow: auto;

    &::-webkit-scrollbar {
        background-color: #eee;
        width: 10px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #acacac;
        border-radius: 25px;
        width: 10px;
    }

    @keyframes rotate {
        from {
            transform: rotate(0);
        }

        to {
            transform: rotate(360deg);
        }
    }
}

.image-picker {
    border: 1.5px dashed #ccc;
    border-radius: 0.5rem;

    &:hover {
        border-color: #919191;
    }

    label {
        cursor: pointer;
        height: 70px;
        width: 100%;
        background-color: transparent;
        margin: auto;
        display: flex;
        justify-content: center;
        align-items: center;

        svg {
            width: 35px;
            height: 35px;

            path {
                fill: #878383;
            }
        }
    }

    input[type="file"] {
        display: none;
    }

    .image-picker-placeholder {
        padding: 10px;
        border-radius: 5px;
    }

    .loading-spinner {
        animation: rotate 1s linear infinite;
    }
}
</style>
