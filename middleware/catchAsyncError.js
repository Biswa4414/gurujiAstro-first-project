//In this we pass a function to catchAsyncErrors
const catchAsyncErrors = (func) => {
    return (req, res, next) => {
      Promise.resolve(func(req, res, next)).catch(next);
    };
  };
  
  module.exports = catchAsyncErrors;
  