const path = require("path");
const multer = require("multer");
// تحميل الصور الاعدادات
// Photo Storage
const photoStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../images")); // هيخفظ الصور في محلد الصور
  },
  filename: function (req, file, cb) {
    if (file) {
      // cb دا يعني كول باك فنكشن
      cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname); // اضافة التاريخ قبل اسم الصوره وقص النقطتين الي في التاريع غلشان الايرور
  //   الابجيكت الي في النص الايذو بيحول الاسترنج لايزو استرنج
    } else {
      cb(null, false);
    }
  },
});

// Photo Upload Middleware
const photoUpload = multer({
  storage: photoStorage, // مكان التخزين والاسم الصوره الي هتيجي
  fileFilter: function (req, file, cb) { // عمل فيلتر للملفات الي هتيجي يخليها صور بس مش اي ملفات تيجي 
    if (file.mimetype.startsWith("image")) { // لو صوره هتتحمل الميم تايب دا النوع لو عملنا بعد الايمدج اسلاش ونوع صوره محدد مش هيستقبل غير النوع دا من الصور بس 
      cb(null, true);
    } else {
      cb({ message: "Unsupported file format" }, false); // لو مش صوره مش هتتحمل
    }
  },
  limits: { fileSize: 1024 * 1024 }, // 1 megabyte  يحدد حجم الصوره يعني المستخدم مينفعش يحمل صوره اكبر من ميجا بايت
  // لو عاايزين حجم الصوره اكبر مثلا 2 ميجا نضرب في 2 لو اكتر نضرب في العدد *2
});

module.exports = photoUpload;
