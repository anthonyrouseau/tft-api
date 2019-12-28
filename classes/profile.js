class Profile {
    constructor(summoner) {
        let league = summoner.league;
        this.tier = league.tier;
        this.rank = league.rank;
        this.wins = league.wins;
        this.losses = league.losses;
        this.hotStreak = league.hotStreak
        this.name = summoner.name;
        this.icon = summoner.profileIconId;
    }
}

module.exports = Profile;