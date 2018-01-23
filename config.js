module.exports = {
    dynamoEndPoint: 'YOUR END POINT TO READ FOR READING LAST MEAL TIMESTAMP',
    mailerEndPoint: 'AWS API GATEWAY FOR UTILIZING SNS FOR EMAIL NOTIFICATIONS',
    warningTemplate: {
        subject: 'Cat Warning',
        message: 'The cat is hungry!',
        topicArn: 'WARNING TOPIC TOPIC ARN'
    },
    backToNormalTemplate: {
        subject: 'Back To Normal',
        message: 'The cat is fine',
        topicArn: 'BACK TO NORMAL TOPIC ARN'
    }
};
