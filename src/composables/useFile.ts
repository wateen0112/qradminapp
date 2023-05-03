import { axiosIns } from "~/libs/axios"

export const useFile = () => {
    const IMAGE_EXTENTIONS = ['jpg', 'png', 'jpeg', 'webp', 'svg']
    const WORD_EXTENTIONS = ['docm', 'docx', 'dot', 'dotx']
    const EXCEL_EXTENTIONS = ['xlsx', 'xlsm', 'xlsb', 'xltx', 'csv']
    const PDF_EXTENTIONS = ['pdf', 'ps']
    const VIDEO_EXTENTIONS = ["mp4", "mov", "mkv", "flv", "avi", "webm"]

    const toBase64 = (file: File) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                resolve(reader.result);
            };
            reader.onerror = (error) => reject(error);
        });
    }
    const getFileExt = (filePath = ''): string => {
        const ext = filePath.split('.').pop();
        if (ext && typeof (ext) == 'string') {
            return ext
        }
        else return ''
    }
    const isImage = (fileExt: string) => {
        return IMAGE_EXTENTIONS.includes(fileExt.trim())
    }
    const isVideo = (fileExt: string) => {
        return VIDEO_EXTENTIONS.includes(fileExt)
    }
    const isWord = (fileExt: string) => {
        return WORD_EXTENTIONS.includes(fileExt)
    }
    const isExcel = (fileExt: string) => {
        return EXCEL_EXTENTIONS.includes(fileExt)
    }
    const isPdf = (fileExt: string) => {
        return PDF_EXTENTIONS.includes(fileExt)
    }

    const getFileName = (fileName: string) => {
        const name = fileName.split("_")[1];
        if (name) return name;
        return fileName;
    }

    const getFileSize = (size: string | number) => {
        return `${(+size / 1000000).toFixed(2)}MB`;
    }
    function getFileType(fileExt: string) {
        if (isVideo(fileExt))
            return "video";
        else if (isImage(fileExt))
            return "image";
        else return "document"
    }


    async function downloadFile(fileUrl: string, decrypted = false) {

        axiosIns.get(fileUrl, { responseType: 'blob' }).then(({ data }) => {
            const downloadUrl = window.URL.createObjectURL(new Blob([data]));
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.setAttribute('download', fileUrl); //any other extensio
            document.body.appendChild(link);
            link.click();
            link.remove();
        })
    }


    // Todo   ShowInputFile():File
    return {
        toBase64,
        getFileSize,
        getFileName,
        downloadFile,
        getFileExt,
        getFileType,
        isVideo,
        isImage,
        isExcel,
        isWord,
        isPdf,
        EXCEL_EXTENTIONS,
        IMAGE_EXTENTIONS,
        PDF_EXTENTIONS,
        VIDEO_EXTENTIONS,
        WORD_EXTENTIONS
    }
}
