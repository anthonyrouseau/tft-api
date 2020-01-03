class Match {
    constructor(matchDto, puuid) {
        this.id = matchDto.metadata.match_id;
        this.playerId = puuid;
        this.timeStart = matchDto.info.game_datetime;
        this.gameLength = matchDto.info.game_length;
        this.playerStats = {};

    }

    setPlayerStats(players) {
        let playerStats = players.filter(player => player.puuid === this.playerId);
        let stats = playerStats[0];
        this.playerStats.placement = stats.placement;
        this.playerStats.level = stats.level;
        this.lastRound = stats.last_round;
        this.timeEliminated = stats.time_eliminated;
        this.playersEliminated = stats.players_eliminated;
        this.goldLeft = stats.gold_left;
        this.units = stats.units;
        this.units.map( unit => { // map item numbers to objects with item id and image path and replace units list
            let newItems = unit.items.map( item => {
                return {
                    id: item, 
                    imageLink: `images/riot-assets-9.24.2/9.24.2/img/item/${item}.png`
                }
            });
            unit.items = newItems;
        })
        this.traits = stats.traits;

    }
}

module.exports = Match;