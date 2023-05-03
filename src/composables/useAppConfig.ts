import { AppConfig } from '@/app.config';
import { ref } from 'vue';

export const useAppConfig = () => {
    const domainHost = ref(AppConfig.DOMAIN_HOST);
    const getFullPath = (url: string) => domainHost.value + '/' + url



    return { domainHost, getFullPath }
}