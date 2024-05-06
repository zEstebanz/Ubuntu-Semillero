export const getQuestionsNotActive = async () => {
    try {
        const res = await ubuntuApi.get('/question/questionsNotActive', {
            headers: {
                Authorization: 'Bearer ' + getAccessToken(),
            }
        });
        console.log("Preguntas inactivas:", res.data);
        return res.data;
    } catch (error) {
        console.error('Error al obtener las preguntas inactivas:', error);
        return []; // Devuelve un array vacío en caso de error
    }
}
