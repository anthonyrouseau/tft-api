const express = require('express');
const router = express.Router();
const keys = require('../keys');
const axios = require('axios');
const Summoner = require('../classes/summoner');
const Profile = require('../classes/profile');

router.get('/:name', async (req, res) => {
    let name = req.params.name;
    let summoner = new Summoner(await getSummonerInfo(name));
    await summoner.getLeague();
    res.json(new Profile(summoner));
});

async function getSummonerInfo(name){
    try {
        var response = await axios.get(`https://na1.api.riotgames.com/tft/summoner/v1/summoners/by-name/${name}?api_key=${keys.riot}`);
        return response.data
    } catch(err) {
        console.log(err);
    }
}

module.exports = router;