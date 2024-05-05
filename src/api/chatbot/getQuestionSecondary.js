import { ubuntuApi } from "../../utils/services/axiosConfig";
import { getAccessToken } from "../../utils/helpers/localStorage";

export const getQuestionSecondary = async () => {
    try {
        const res = await ubuntuApi.get(`/faq/answer/2`, {
            headers: {
                Authorization: 'Bearer' + getAccessToken(),
            }
        });
        console.log("Preguntas secundarias", res.data);

        return res.data;
    } catch (error) {
        console.log(error);
    }
}