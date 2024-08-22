const moment = require('moment');
// utils.js
module.exports.subtractSecondsFromCurrentTime = function (seconds) {
    const currentTime = new Date();
    return new Date(currentTime.getTime() - seconds * 1000);
  };