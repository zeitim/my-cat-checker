module.exports = {
    dynamoEndPoint: 'https://fqvvjomns5.execute-api.us-east-2.amazonaws.com/atest',
    mailerEndPoint: 'https://e0axct794l.execute-api.us-east-2.amazonaws.com/test',
    warningTemplate: {
        subject: 'Cat Warning',
        message: 'The cat is hungry!',
        topicArn: 'arn:aws:sns:us-east-2:944103175660:feeding_warning'
    },
    backToNormalTemplate: {
        subject: 'Back To Normal',
        message: 'The cat is fine',
        topicArn: 'arn:aws:sns:us-east-2:944103175660:back_to_normal'
    }
};

// module.exports = {
//     dynamoEndPoint: 'YOUR END POINT TO READ FOR READING LAST MEAL TIMESTAMP',
//     mailerEndPoint: 'AWS API GATEWAY FOR UTILIZING SNS FOR EMAIL NOTIFICATIONS',
//     warningTemplate: {
//         subject: 'Cat Warning',
//         message: 'The cat is hungry!',
//         topicArn: 'WARNING TOPIC TOPIC ARN'
//     },
//     backToNormalTemplate: {
//         subject: 'Back To Normal',
//         message: 'The cat is fine',
//         topicArn: 'BACK TO NORMAL TOPIC ARN'
//     }
// };