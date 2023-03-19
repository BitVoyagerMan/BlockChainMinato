const SHA256 = require('crypto-js/sha256')
class Block{
    constructor(index, timestamp, data, previousHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }
    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}
class BlockChain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }
    createGenesisBlock() {
        return new Block(0, "01/01/2023", "Genesis Block", "0");
    }
    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }
    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }
    isChainValid(){
        for(let i = 1; i < this.chain.length; i ++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];
            if(currentBlock.previousHash !== previousBlock.hash) return false;
            if(currentBlock.hash !== currentBlock.calculateHash())return false;
            
        }
        return true;
    }
}

let minatoCoin = new BlockChain();
minatoCoin.addBlock(new Block(1, "01/01/2023", {amount: 4}));
minatoCoin.addBlock(new Block(2, "02/01/2023", {amount: 100}));
// console.log(JSON.stringify(minatoCoin, null, 4));
console.log("Is blockchain valid?" + minatoCoin.isChainValid());
minatoCoin.chain[1].data = {amount : 5};
console.log("Is blockchain valid?" + minatoCoin.isChainValid());
