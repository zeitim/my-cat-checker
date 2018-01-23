const axios = require('axios');
const config = require('../config');

const dynamoInstance = axios.create({
    baseURL: config.dynamoEndPoint
});

const mailerInstance = axios.create({
    baseURL: config.mailerEndPoint
});

/**
 * Calculates the delta between now and a given timestamp
 * @param feedingTimestamp
 * @returns {number} The delta between now and the given timestamp
 */
function getFeedingDelta (feedingTimestamp) {
    let now = new Date();
    let lastFeedingTime = new Date(feedingTimestamp);
    return now - lastFeedingTime;
}

/**
 * Prepares the query params to send our mail to the the warning SNS Topic
 * @returns {AxiosPromise<any>} A request promise
 */
function sendWarning(){
    let message = `Message=${encodeURIComponent(config.warningTemplate.message)}`,
        subject = `Subject=${encodeURIComponent(config.warningTemplate.subject)}`,
        topicArn = `TopicArn=${encodeURIComponent(config.warningTemplate.topicArn)}`;
    return mailerInstance.post(`/warning?${message}&${subject}&${topicArn}`);
}

/**
 * Prepares the query params to send our mail to the the back to normal SNS Topic
 * @returns {AxiosPromise<any>} A request promise
 */
function sendBackToNormal() {
    let message = `Message=${encodeURIComponent(config.backToNormalTemplate.message)}`,
        subject = `Subject=${encodeURIComponent(config.backToNormalTemplate.subject)}`,
        topicArn = `TopicArn=${encodeURIComponent(config.backToNormalTemplate.topicArn)}`;
    return mailerInstance.post(`/normal?${message}&${subject}&${topicArn}`);
}

module.exports = {
    dynamoInstance,
    mailerInstance,
    getFeedingDelta,
    sendWarning,
    sendBackToNormal
};