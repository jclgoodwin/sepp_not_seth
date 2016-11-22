## What's this?

It's a [Twitter bot][twitter] helpfully correcting people who call the
disgraced Swiss football administrator Joseph "Sepp" Blatter "Seth".

I've [written about it on my blog][blog].

I run it on [AWS Lambda][lambda], using Node.js 4.3, the handler
`index.handler`, triggered by a scheduled event. The `consumer_key`,
`consumer_secret`, `access_token_key` and `access_token_secret` environment
variables all need to be set.

[twitter]: https://twitter.com/sepp_not_seth
[blog]: https://joshuagoodw.in/2015/06/sepp_not_seth
[lambda]: https://aws.amazon.com/lambda/details/
