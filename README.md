### PiggyBank Smart Contract frontend app

PiggyBank is a custom Smart Contract on the Elrond blockchain. If you want to know more about preparing and deploying such a Smart Contract, check out separate [blog post](https://www.julian.io/articles/elrond-smart-contracts.html). Here we have a frontend app for it. 

- [Smart Contract repo](https://github.com/juliancwirko/elrond-simple-sc)

#### Working instance

- [https://elven-piggy-bank.netlify.app/](https://elven-piggy-bank.netlify.app/)

Remember that the testnet will be restarted from time to time. It means that preconfigured PiggyBank Smart Contract will stop working. I'll try to redeploy a new one in such a case, but this won't be automatic.

**This app is for learning and demonstration purposes only.**

#### How to start with local instance

1. Clone the repo
1. Remember to configure the .env file. Review and copy `.env.example` into `.env.local`
2. In `.env.local` configure your PiggyBank Smart Contract address. (Check how to deploy your custom one [here](https://www.julian.io/articles/elrond-smart-contracts.html). You can also use the one from this repo (of course if the testnet isn't restarted yet)).
3. You would also need some xEGLD on the testnet. There is one faucet which you can use: [https://r3d4.fr/elrond/testnet/](https://r3d4.fr/elrond/testnet/). **Important - sometimes it won't be able to send a lot of xEGLD**. You can also use devnet, where you should be able to use a web wallet's built-in faucet.
 
Generated using [CRA elrond-dapp template and Elrond tools](https://www.npmjs.com/package/cra-template-elrond-dapp)

 #### In case of questions contact me: 

 - [Twitter](https://twitter.com/JulianCwirko)
 - [GitHub](https://github.com/juliancwirko)
