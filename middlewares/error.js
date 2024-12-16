// Not Found Middleware
const notFound = (req,res,next) => {
    const error = new Error(`not found - ${req.originalUrl}`); // دا بيهندل النوت فاوند يعني لو الاورجنال رابط مش معملولو رات يرجعلو الايرور دا
    res.status(404);
    next(error); // يعطي الايرور دا للهاندل ايرور الي بعدو
}

// Error Handler Middleware
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode; // لو في ايرور والاستاتس كود 200 يحولو500  

    res.status(statusCode).json({
        message: err.message,  // يرحعلو الايرور  علي هيئة جيسون
        stack: process.env.NODE_ENV === "production" ? null : err.stack,  // ايرور الاستاك دا يعطينا مسار الايرور هو فين وايه هو الايرور كمان
    });
}
// بنستدعي بقي الايرور هاندلر دا  اخر حاجه تحت الراوت علشان يشتغل علي كلو

module.exports = {
    errorHandler,
    notFound
}