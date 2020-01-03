class Profile {
    constructor(summoner) {
        let league = summoner.league;
        this.tier = league.tier;
        this.rank = league.rank;
        this.wins = league.wins;
        this.losses = league.losses;
        this.hotStreak = league.hotStreak
        this.name = summoner.name;
        this.puuid = summoner.puuid;
        this.iconLink = `images/riot-assets-9.24.2/9.24.2/img/profileicon/${summoner.profileIconId}.png`;
        this.tierLink = `images/riot-assets-9.24.2/9.24.2/img/ranked-emblems/emblem_${this.tier}.png`;
    }
}

module.exports = Profile;