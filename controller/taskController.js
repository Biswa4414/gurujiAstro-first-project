const taskQueue = require("../queues/taskQueue");
const catchAsyncErrors = require("../middleware/catchAsyncError");

const enqueueTask = catchAsyncErrors(async (req, res, next) => {
  const { request } = req.body;

  if (!request) {
    return next(new ErrorHandler("Request data is required", 400));
  }

  await taskQueue.add({ request });

  res.status(200).json({
    success: true,
    message: "Task enqueued successfully",
  });
});

module.exports = enqueueTask;
