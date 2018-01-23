# Cat Checker

Periodically checks on the Cat hunger status.
Will send a warning if the cat is hungry, and will let you know once the cat is satisfied again.
Notification will be sent via AWS SNS.

## Setup

*Tested on Nodejs@9.2.0 but should be compatible with version >= 7.6*

Install dependencies:
```
npm install
```

We need to know when the cat was last fed.
This piece of data is stored externally to this program.
In this case I chose DynamoDB and expecting the response to be:

```
{
    "timestamp": 2018-01-22T07:32:11.393Z // e.g.
}
```
End point to database should be inserted in the config.js in the root folder.

A second end point for the SNS API Gateway should be inserted in the appropriate field in config file.
In addition two separate TopicARNs should be created for the events:
* A warning needs to be sent
* A back to normal notification need to be sent.

Great, your all set.

## Starting The Program

Simply run:
```
npm start
```



