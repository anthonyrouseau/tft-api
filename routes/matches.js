const express = require('express');
const router = express.Router();
const keys = require('../keys');
const axios = require('axios');
const Match = require('../classes/match');
const RiotError = require('../classes/error');

router.get('/:puuid', async (req, res, next) => {
    try{
        let count = req.query.count || 30;
        let response = await axios.get(`https://americas.api.riotgames.com/tft/match/v1/matches/by-puuid/${req.params.puuid}/ids?count=${count}&api_key=${keys.riot}`);
        let rawMatches = await getMatchData(response.data);
        let finsishedMatches = createMatches(rawMatches, req.params.puuid);
        res.json(finsishedMatches);
    }catch(err){
        next(new RiotError(err));
    }
})

async function getMatchData(ids) {
    let i = 0;
    let allMatches = [];
    let time = 0;
    let wait = 0;
    while(allMatches.length < ids.length){
        if((Date.now() - time)/1000 > wait){
            try{
                let response = await axios.get(`https://americas.api.riotgames.com/tft/match/v1/matches/${ids[i]}?api_key=${keys.riot}`);
                allMatches.push(response.data);
                i++;
            }catch(err){
                if(err.response.data.status.status_code === 429){
                    time = Date.now();
                    wait = err.response.headers['retry-after'];
                    continue
                }else{
                    throw err
                }
            }
        }
    }
    return await Promise.all(allMatches)
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