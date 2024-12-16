const mongoose = require("mongoose");
//  دا علشان لو المستخدم بيمرر الايدي رقم يرجعلو الايرور دا علي هيئة جيسون 
// لان الايدي عباره عن اوبجكت ولو دخلنالو غير كدا بيرجع ايرور html
// زدا علشان يخليه يرجعو جيسون
module.exports = (req,res,next) => {
    //  هيشيك الي جوا الفالديت دا  اوبجكن اي دي ولا لا
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        return res.status(400).json({ message: "invalid id" });
    }
    next();
}