const twitchBase = "https://addons-ecs.forgesvc.net/";
const axios = require("axios");
const mongoose = require('mongoose');


mongoose.connect(`mongodb+srv://${process.env.USER}@cluster0-7aolm.azure.mongodb.net/cf?authSource=admin&replicaSet=Cluster0-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true`, {useNewUrlParser: true, useUnifiedTopology: true});
const mod = mongoose.model('Mod', {
    id: Number,
    downloadCount: Number,
    popularityScore: Number,
    gamePopularityRank: Number,
    time:Date,
    rank:Number
});
const modpack = mongoose.model('Modpack', {
    id: Number,
    downloadCount: Number,
    popularityScore: Number,
    gamePopularityRank: Number,
    time:Date,
    rank:Number

});
let doIt = async ()=>{
    let ra = 1;
    let rd = 1;
    for (let i = 0; i < 100; i++) {
        console.log(i);
        let res;
        try{
            res = await axios.get(twitchBase + `api/v2/addon/search?gameId=432&index=${100 * i}&pageSize=100&sort=1&sectionId=4471`);
        }catch (e) {
            console.log(e)
        }
        for (let i of res.data) {
            new modpack({...i,time:new Date(),rank:ra++}).save();

        }
        try{
            res = await axios.get(twitchBase + `api/v2/addon/search?gameId=432&index=${100 * i}&pageSize=100&sort=1&sectionId=6`);
        }catch (e) {
            console.log(e)
        }
        for (let i of res.data) {
            new mod({...i,time:new Date(),rank:rd++}).save();
        }
    }
};

doIt();