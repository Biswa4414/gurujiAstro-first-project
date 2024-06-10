const taskQueue = require("../queues/taskQueue");

taskQueue.process(async (job) => {
    console.log(`Processing job for user ${job.data.userId}:`, job.data.request);
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(`Completed job for user ${job.data.userId}`);
});
