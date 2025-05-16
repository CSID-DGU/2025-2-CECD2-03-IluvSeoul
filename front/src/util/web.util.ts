import RestAPI from "@/constant/RestAPI";
import axios, {AxiosRequestConfig} from "axios";

export namespace WebUtil {
    export async function get(url: string, config?: AxiosRequestConfig<any>): Promise<any> {
        return axios.get(RestAPI.SERVER_DOMAIN + url, config)
            .then(res => res.data.response)
            .catch(error => {
                console.log(error)
                throw error;
            })
    }
}