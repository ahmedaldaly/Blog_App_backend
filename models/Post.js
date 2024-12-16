const mongoose = require("mongoose");
const Joi = require("joi");

// Post Schema
// الاسكيما الخاصه بالبوستات 
const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 200,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId, //نوع البيانات ابوجيكت اي دي  بيستخدم لتحديد المستندات من داخل قاعدة البيانات يعني اليوزر هيحتوي 
      //  علي معرف اي دي من  مستند اخر وهو من اسكيما بتاعت اليوزر
      ref: "User",// يستخدم للاشاره الي مخطط الاسكيما الي هيجيب منو الداتا
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    image: {
      type: Object,
      default: {
        url: "",
        publicId: null,
      },
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId, //هنا بقي هتاخد بيانات اليوزر الي هيعمل لايك نخزنو في الاري دي
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
    // دول علشان الفيرجوال
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

//Populate Comment For This Post
PostSchema.virtual("comments", { // عمل فيرجوال للكومينت الخاصه بالبوست يعني  كل ما نرجع البوست هنرجع كومنتاتو معاه
  ref: "Comment", // المودل الي هنجيب منو الكومنتات
  foreignField: "postId", // اي دي البوست من الكومنت 
  localField: "_id" // اي دي البوست من هنا علشان يتقارنو ببعض ويتربط دا بدا
});

// Post Model
const Post = mongoose.model("Post", PostSchema);

// Validate Create Post
function validateCreatePost(obj) {
  const schema = Joi.object({
    title: Joi.string().trim().min(2).max(200).required(),
    description: Joi.string().trim().min(10).required(),
    category: Joi.string().trim().required(),
  });
  return schema.validate(obj);
}

// Validate Update Post
function validateUpdatePost(obj) {
  const schema = Joi.object({
    title: Joi.string().trim().min(2).max(200),
    description: Joi.string().trim().min(10),
    category: Joi.string().trim(),
  });
  return schema.validate(obj);
}

module.exports = {
  Post,
  validateCreatePost,
  validateUpdatePost,
};
