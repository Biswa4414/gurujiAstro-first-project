const Queue = require('bull');

const taskQueue = new Queue('taskQueue', {
    redis: {
        host: '127.0.0.1',
        port: 6379
    }
});

module.exports = taskQueue;
