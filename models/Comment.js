const mongoose = require("mongoose");
const Joi = require("joi");

// Comment Schema
const CommentSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId, //id البوست
        ref: "Post",
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, // id المستخدم الي كاتب التعليق
        ref: "User",
        required: true,
    },
    text: {
        type: String, // التعليق 
        required: true,
    },
    username: {
        type: String, //  اسم المستخدم الخاص بالي كاتب التعليق
        required: true,
    },
}, {
    timestamps: true,
});

// Comment Model
const Comment = mongoose.model("Comment", CommentSchema);

// Validate Create Comment
function validateCreateComment(obj) {
    const schema = Joi.object({
        postId: Joi.string().required().label("Post ID"), // دا بيغير الرساله الي بتيجي في الايرور بتاعها تقريبا يعني هو اجباري نمرر البوست اي دي
        //  لو ممررناش بيجي رساله انو اجباري دا بقي التحكم في الرساله الي بتظهر بس مش كلها الاسم بس يعني نغر بوست اي دي لاي اسم بس
        // حاجه كدا شبه الليبل بتاع الفورم تسميه توضحيه
        text: Joi.string().trim().required().label("Text"),
    });
    return schema.validate(obj);
}

// Validate Update Comment
function validateUpdateComment(obj) {
    const schema = Joi.object({
        text: Joi.string().trim().required(),
    });
    return schema.validate(obj);
}

module.exports = {
    Comment,
    validateCreateComment,
    validateUpdateComment,
}