import RestAPI from "@/constant/RestAPI";
import axios, {AxiosRequestConfig} from "axios";

export namespace WebUtil {
    export async function get(url: string, config?: AxiosRequestConfig<any>): Promise<any> {
        try {
            const res = await axios.get(RestAPI.SERVER_DOMAIN + url, config)
            return res.data.response;
        } catch (error) {
            console.log(error)
            return null;
        }
    }
}