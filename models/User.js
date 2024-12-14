const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const passwordComplexity = require("joi-password-complexity");

// User Schema
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 100,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 100,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
    },
    profilePhoto: {
        type: Object, //نوع الداتا اوبجكت علشان الصوره هتبقي رابط
        default: {
            // يعني الصوره دي هتكون افتراضيه لاي يوزر وبعدين يقدر هو يعدلها ويحمل  صوره ليه هو
            url: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png", // دا رابط الايمدج الديفولت الافتراضي
            publicId: null,
        }
    },

    bio: {
        type: String,
    },
    isAdmin: {
        type:Boolean,
        default: false,
    },
    isAccountVerified: {
        type:Boolean,
        default: false,
    },
}, {
    timestamps: true, // اضافة تاريخ  اضافة اليوزر واخر تعديل له
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Populate Posts That Belongs To This User When he/she Get his/her Profile
UserSchema.virtual("posts", {
    ref: "Post",
    foreignField: "user",
    localField: "_id",
});

// Generate Auth Token
// الكود دا بينشئ ميثود جديدجوا الاسكيما فيها التوكن يعني بينشئ توكن  مع اليوزر وهي تعتبر كلاس وبكدا ممكن نستخدم this
//  الداله دي من نوع موديل يعني تعتبر موديل نستخدمها عادي وهنستخدمها لانشاء توكن في التسجيل الدخول كمان هنستدعيها بس
UserSchema.methods.generateAuthToken = function() {
    return jwt.sign({id: this._id, isAdmin: this.isAdmin}, process.env.JWT_SECRET);
}

// User Model
const User = mongoose.model("User", UserSchema);

// Validate Register User
function validateRegisterUser(obj) {
    const schema = Joi.object({
        username: Joi.string().trim().min(2).max(100).required(),
        email: Joi.string().trim().min(5).max(100).required().email(), // التوع ايميل
        password: passwordComplexity().required(), // الاول دا علشان يحلي الباسورد معقد
    });
    return schema.validate(obj);
}

// Validate Login User
function validateLoginUser(obj) {
    const schema = Joi.object({
        email: Joi.string().trim().min(5).max(100).required().email(),
        password: Joi.string().trim().min(8).required(),
    });
    return schema.validate(obj);
}

// Validate Update User
function validateUpdateUser(obj) {
    const schema = Joi.object({
        username: Joi.string().trim().min(2).max(100),
        password: passwordComplexity(),
        bio: Joi.string(),
    });
    return schema.validate(obj);
}

// Validate Email
function validateEmail(obj) {
    const schema = Joi.object({
        email: Joi.string().trim().min(5).max(100).required().email(),
    });
    return schema.validate(obj);
}

// Validate New Password
function validateNewPassword(obj) {
    const schema = Joi.object({
        password: passwordComplexity().required(),
    });
    return schema.validate(obj);
}

module.exports = {
    User,
    validateRegisterUser,
    validateLoginUser,
    validateUpdateUser,
    validateEmail,
    validateNewPassword
}

// const schema = Joi.object({
//     username: Joi.string().trim().min(2).max(100).messages({
//         'any.required': 'الاسم مطلوب',
//         'string.base': 'الاسم لازم يكون من نوع نص',
//         'string.empty': 'رجاء ادخال الاسم',
//         'string.min': 'لا يجوز الاسم يكون اقل من ثلاثة حروف',
//         'string.max': 'لا يجوز الاسم يكون اكثر من مئه حروف',
//     }),
// });
