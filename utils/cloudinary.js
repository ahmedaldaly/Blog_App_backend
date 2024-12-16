const cloudinary = require("cloudinary");
// نظبط اعدادات الكونفيج بتاعتنا نحط الداتا بتاع الفاير بيز الي مديهالنا
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Cloudinary Upload Image
//  نحميل الصوره علي الكلاود
const cloudinaryUploadImage = async (fileToUpload) => {
  try {
    //  المتغير داتا  بيعمل ابلود للصوره الي هتجيلو كابراميتر 
    const data = await cloudinary.uploader.upload(fileToUpload, {
      resource_type: "auto",
    });
    return data; // يرجع الداتا الصوره يعني

  } catch (error) {
    console.log(error);
    throw new Error("Internal Server Error (cloudinary)");
  }
};

// Cloudinary Remove Image 
//  حذف الصوره  من الفاير بيز
const cloudinaryRemoveImage = async (imagePublicId) => {
  try {
    // الداله ديستوري دي بتحذف 
    const result = await cloudinary.uploader.destroy(imagePublicId);
    return result;
  } catch (error) {
    console.log(error);
    throw new Error("Internal Server Error (cloudinary)");
  }
};

// Cloudinary Remove Multiple Image 
// حذف كل الصور   بتاع كل البابلك اي دي مره واحده الي هتتمررو
const cloudinaryRemoveMultipleImage = async (publicIds) => {
  try {
    const result = await cloudinary.v2.api.delete_resources(publicIds);
    return result;
  } catch (error) {
    console.log(error);
    throw new Error("Internal Server Error (cloudinary)");
  }
};

module.exports = {
  cloudinaryUploadImage,
  cloudinaryRemoveImage,
  cloudinaryRemoveMultipleImage,
};
