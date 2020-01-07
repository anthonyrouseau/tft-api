const express = require('express');
const router = express.Router();
const keys = require('../keys');
const axios = require('axios');
const Summoner = require('../classes/summoner');
const Profile = require('../classes/profile');
const RiotError = require('../classes/error');

router.get('/:name', async (req, res, next) => {
    try {
        let summoner = new Summoner(await getSummonerInfo(req.params.name));
        res.json(new Profile(await summoner.setLeague()));
    }catch(err){
        next(new RiotError(err));
    }
});

async function getSummonerInfo(name){
    try {
        let res = await axios.get(`https://na1.api.riotgames.com/tft/summoner/v1/summoners/by-name/${name}?api_key=${keys.riot}`);
        return res.data
    } catch(err) {
        throw err
    }
}

module.exports = router;