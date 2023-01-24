import { Injectable } from '@nestjs/common';
import axios from "axios";

@Injectable()
export class PredictionService {
    constructor() {
    }
    
    getMean(arr) {
        const sum = arr.reduce((prev, curr) => {
            return prev + curr;
        }, 0);

        return sum / arr.length;
    }

    async predict(homeTeamId: number, awayTeamId: number) {
        const homeTeamLastGames = await this.getLastGamesByTeam(homeTeamId, 10);
        const awayTeamLastGames = await this.getLastGamesByTeam(awayTeamId, 10);

        const home_team_goals_diff = this.getMean(homeTeamLastGames.map((item) => (item.goalDiff)));
        const away_team_goals_diff = this.getMean(awayTeamLastGames.map((item) => (item.goalDiff)));
        const home_team_pass_diff = this.getMean(homeTeamLastGames.map((item) => (item.passDiff)));
        const away_team_pass_diff = this.getMean(awayTeamLastGames.map((item) => (item.passDiff)));

        return axios.post(`http://localhost:5000/predict`, {
            home_team_goals_diff,
            away_team_goals_diff,
            home_team_pass_diff,
            away_team_pass_diff
        });
    }

    async getLastGamesByTeam(teamId: number, numberOfGames: number) {
        const lastGames = await axios.get(`https://v3.football.api-sports.io/fixtures`, {
            params: {
                team: teamId,
                last: numberOfGames
            }
        });
        const games = lastGames.data.response;

        let lastGamesStats = [];

        const getStat = (name, allStats) => {
            return allStats.find((item) => {
                return item.type === name;
            })?.value;
        }

        for(const game of games) {
            const homeTeamId = game.teams.home.id;
            const awayTeamId = game.teams.away.id;

            const gameStats = await axios.get(`https://v3.football.api-sports.io/fixtures/statistics`, {
                params: {
                    fixture: game.fixture.id
                }
            });
            const stats = gameStats.data.response;

            const homeTeamStats = stats.find((item) => {
                return item.team.id === homeTeamId;
            });
            const awayTeamStats = stats.find((item) => {
                return item.team.id === awayTeamId;
            });

            const homeTeamPasses = getStat('Total passes', homeTeamStats);
            const awayTeamPasses = getStat('Total passes', awayTeamStats);

            lastGamesStats.push({
                goalDiff: homeTeamId === teamId ? game.goals.home - game.goals.away : game.goals.away - game.goals.home,
                passDiff: homeTeamId === teamId ? homeTeamPasses - awayTeamPasses : awayTeamPasses - homeTeamPasses
            });
        }

        return lastGamesStats;
    }
}
