const schedule = require('node-schedule');
const utils = require('./utils');

// Set the cat satisfaction period in milliseconds
const SATISFACTION_DURATION = 15 * 60 * 1000; // 15 Minutes

// initializing flags
let didSendWarning = false;
let didSendBackToNormal = false;

/**
 * The checker logic.
 * Checks if the cat is hungry and based on didSendWarning and didSendBackToNormal flags
 * decides whether to take an action - either send a warning (only once) or send back to normal (once as well).
 *
 * @returns {Promise} Checker process promise
 **/
async function checker() {

    console.log('Starting check');

    let isHungry; //Initialize isHungry flag

    await utils.dynamoInstance.get('/feeder')
        .then( response => { // fetch last feeding timestamp
            let delta = utils.getFeedingDelta(response.data.timestamp);
            isHungry = delta > SATISFACTION_DURATION;
        }, error => {
            console.error(`Unable to check last feeding time: ${error}`);
            console.info('Assuming the cat is hungry. After all, it is a very gluttonous cat');
            isHungry = true;
        });

    if (isHungry && !didSendWarning) {
        //The cat is hungry and not warning has been sent for this hunger period
        console.info('Hungry - sending email');
        await utils.sendWarning()
            .then(()=>{
                didSendWarning = true;
                didSendBackToNormal = false;
            }, error => {
                console.error(`Unable to send warning: ${error}`);
            });
    } else if (!isHungry && !didSendBackToNormal && didSendWarning) {
        // The cat has been fed after a warning has been sent.
        // We should notify
        console.info('No longer hungry');
        await utils.sendBackToNormal()
            .then(()=>{
                didSendWarning = false;
            }, error => {
                console.error(`Unable to send back to normal message: ${error}`);
            });
    } else {
        console.log('No need for an action')
    }
}

function runChecker() {
    checker().then(()=>{
        console.log('Checking ran successfully');
    }, error => {
        console.log(`Something went wrong while checking on the cat: ${error}`);
    });
}

//First run as node-schedule will start only after 3 minuets (as per our configuration)
runChecker();

// The scheduled job
// Run checker every 3 minutes
let checkOnCat = schedule.scheduleJob('*/3 * * * *', ()=> {
    runChecker();
});