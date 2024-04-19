import axios from "axios"

export const getImageFromURL = async (listImageURL) => {

    const images = [...listImageURL];

    const imageRequests = [];

    for (let url of images) {
        imageRequests.push(axios.get(url, {
            responseType: 'arraybuffer'
        }))
    }

    const responses = await axios.all(imageRequests);

    const data = responses.map(response => {
        const contentType = response.headers['content-type'];
        const extension = response.config.url.split('.').at(-1);
        //TODO: Hacer dinamico el nombre de la imagen
        return new File([response.data], `image.${extension}`, { type: contentType })
    })
    // const data = responses.map(response => response.data)

    return data
}