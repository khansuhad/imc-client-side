import axios from 'axios';

const useCloudinaryUpload = () => {
  const uploadToCloudinary = async (file , fileType) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'PDF_UPLOAD'); // Set this in your Cloudinary settings
    formData.append('resource_type', `${fileType}`);
console.log(formData);
    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/dc3czyqsb/${fileType}/upload`,
        formData
      );
      return res.data.secure_url;
    } catch (error) {
      console.error('Cloudinary upload error:', error);
      return null;
    }
  };

  return { uploadToCloudinary };
};

export default useCloudinaryUpload;
