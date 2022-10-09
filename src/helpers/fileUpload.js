export const fileUpload = async(file) => {

    if(!file) throw new Error('No se encontró ningún archivo para subir');

    const cloudURL = 'https://api.cloudinary.com/v1_1/dqhtzp9q4/upload';
    const formData = new FormData();
    formData.append('upload_preset','react-journal');
    formData.append('file', file);

    try {
        
        const resp = await fetch(cloudURL, {
            method: 'POST',
            body: formData
        });

        if(!resp.ok) throw new Error('No se pudo subir la imagen');

        const cloudResponse = await resp.json();

        return cloudResponse.secure_url;

    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }

}