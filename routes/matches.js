const express = require('express');
const router = express.Router();
const keys = require('../keys');
const axios = require('axios');
const Match = require('../classes/match');

router.get('/:puuid', async (req, res) => {
    let count = req.query.count || 15;
    let response = await axios.get(`https://americas.api.riotgames.com/tft/match/v1/matches/by-puuid/${req.params.puuid}/ids?count=${count}&api_key=${keys.riot}`);
    let rawMatches = await getMatchData(response.data);
    let finsishedMatches = createMatches(rawMatches, req.params.puuid);
    res.json(finsishedMatches);
})

async function getMatchData(ids) {
    let matches = ids.map(async id => {
        let response = await axios.get(`https://americas.api.riotgames.com/tft/match/v1/matches/${id}?api_key=${keys.riot}`);
        return response.data
    });
    return Promise.all(matches)
}

function createMatches(matches, puuid) {
    let finishedMatches = matches.map( match => {
        let finishedMatch = new Match(match, puuid);
        finishedMatch.setPlayerStats(match.info.participants);
        return finishedMatch
    })
    return finishedMatches
}


module.exports = router;