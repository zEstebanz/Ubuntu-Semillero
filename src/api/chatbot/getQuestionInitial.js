import { ubuntuApi } from "../../utils/services/axiosConfig";
import { getAccessToken } from "../../utils/helpers/localStorage";

export const getQuestionInitial = async () => {
    try {
        const res = await ubuntuApi.get(`/faq/initials`, {
            
            headers: {
                Authorization: 'Bearer' + getAccessToken(),
            }
        });
        console.log(res.data);

        return res.data;
    } catch (error) {
        console.log(error);
    }
}












