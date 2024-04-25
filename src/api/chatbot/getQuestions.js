import { ubuntuApi } from "../../utils/services/axiosConfig";

export const getInitialQuestions = async () => {
    try {
        const res = await ubuntuApi.get('/faq/initials')
    
        return res.data;
    } catch (error) {
        console.log(error)
    }
}