var Twitter = require('twitter');

var client = new Twitter({
    consumer_key: process.env.consumer_key,
    consumer_secret: process.env.consumer_secret,
    access_token_key: process.env.access_token_key,
    access_token_secret: process.env.access_token_secret
});

var remarks = [
    "Beep beep!",
    "Booooop!",
    "Beepbopbeep!",
    "~ROBOT CLANKING NOISE~",
    "Click, whirrrrrr.",
    "Breeepbeep!",
    "*Alarm sounds*"
];

function getRandomRemark() {
    return remarks[Math.floor(Math.random() * remarks.length)];
}

function getSinceId(then) {
    client.get('statuses/user_timeline', {
    }, function (error, tweets) {
       then(tweets[0].in_reply_to_status_id_str);
    });
}

function getTweets(since_id, then) {
    client.get('search/tweets', {
        q: 'seth blatter',
        result_type: 'recent',
        since_id: since_id
    }, then);
}

function handleTweets(tweets) {
    tweets.statuses.reverse().forEach(function (tweet) {
        if (// doesn't contain:
            tweet.text.indexOf("RT") === -1 &&
            tweet.text.toLowerCase().indexOf("sepp") === -1 &&
            tweet.text.toLowerCase().indexOf("@seth_blatter") === -1 &&
            tweet.text.toLowerCase().indexOf("@sepp_not_seth") === -1 &&
            tweet.text.toLowerCase().indexOf("via") === -1 &&
            tweet.text.toLowerCase().indexOf("sic") === -1 &&
            // does contain:
            tweet.text.toLowerCase().indexOf("seth blatter") !== -1
        ) {
            console.log(tweet.text);
            client.post('statuses/update', {
                status: '.@' + tweet.user.screen_name + ' ' + getRandomRemark() + ' It’s Sepp, not Seth.',
                in_reply_to_status_id: tweet.id_str
            }, function (error, tweet) {
                if (error) {
                    console.log(error);
                } else {
                    console.log(tweet.text);
                }
            });
        }
    });
}

exports.handler = function (event, context, callback) {
    getSinceId(function (since_id) {
        getTweets(since_id, function (error, tweets) {
            if (error) {
                callback(error);
            } else {
                handleTweets(tweets);
                callback(null, tweets);
            }
        });
    });
};
