const Token = artifacts.require('./Token');
require("chai").use(require('chai-as-promised')).should();

contract("Token", ([owner, reciver]) => {
    let token;
    beforeEach( async () => {
        token = await Token.new();
    });

    describe("Deployment", () =>{
        it("Track the token name", async () =>{
            const result = await token.name();
            result.should.equal("Arabic token");
            //assert.equal(result, "Arabic token")
        }),
        it("Track the token symbol", async () =>{
            const result = await token.symbol();
            result.should.equal("ARAB");
            //assert.equal(result, "Arabic token")
        }),
        it("Track the token decimal", async () =>{
            const result = await token.decimal();
            result.toString().should.equal("10");
            //assert.equal(result, "Arabic token")
        }),
        it("Track the token totalSupply", async () =>{
            const result = await token.totalSupply();
            result.toString().should.equal("20000000000000");
            //assert.equal(result, "Arabic token")
        })
    });

    describe("Transfare Tokens" , async() => {
        it("check token balances", async() => {
            let balanceof;
            balanceof = await token.balanceOf(owner)
            //console.log(`The balance of the owner is ${balanceof}`);
            
            balanceof = await token.balanceOf(reciver)
            //console.log(`The balance of the reciver is ${balanceof}`);

            await token.transfer(reciver,"20000000000000",{from:owner});

            balanceof = await token.balanceOf(owner)
            //console.log(`The balance of the owner is ${balanceof}`);
            
            balanceof = await token.balanceOf(reciver)
            //console.log(`The balance of the reciver is ${balanceof}`);
        })

        it("emit the transfer", async() => {
            const result = await token.transfer(reciver,"20000000000000",{from:owner});
            //console.log(result);
            const log = result.logs[0];
            log.event.should.equal("Transfer")
            //log.args._from.should.equal(owner,"This is from correct addres")
            //console.log(log.args._from.toString());

            log.args._from.toString().should.equal(owner,"This is the owner..")
        })
    })
})