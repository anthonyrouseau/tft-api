const axios = require('axios');
const keys = require('../keys');

class Summoner {
    constructor(info) {
        this.profileIconId = info.profileIconId;
        this.name = info.name;
        this.puuid = info.puuid;
        this.summonerLevel = info.summonerLevel;
        this.accountId = info.accountId;
        this.id = info.id;
    }

    async setLeague() {
        if(this.league){
         return this.league
        }else {
            try {
                var response = await axios.get(`https://na1.api.riotgames.com/tft/league/v1/entries/by-summoner/${this.id}?api_key=${keys.riot}`);
                this.league = response.data[0]; // riot api returns an array
                return this
            }catch(err){
                throw err
            }
        }
    }
}

module.exports = Summoner;