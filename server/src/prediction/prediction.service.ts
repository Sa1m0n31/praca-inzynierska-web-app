import { Injectable } from '@nestjs/common';
import axios from "axios";

@Injectable()
export class PredictionService {
    constructor() {
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

            lastGamesStats.push({
                homeTeamId: homeTeamId,
                awayTeamId: awayTeamId,
                homeTeamScore: game.goals.home,
                awayTeamScore: game.goals.away,
                homeTeamShots: getStat('Total shots', homeTeamStats),
                awayTeamShots: getStat('Total shots', awayTeamStats),
                homeTeamShotsOnTarget: getStat('Shots on goal', homeTeamStats),
                awayTeamShotsOnTarget: getStat('Shots on goal', awayTeamStats),
                homeTeamPasses: getStat('Total passes', homeTeamStats),
                awayTeamPasses: getStat('Total passes', awayTeamStats),
                homeTeamPossession: getStat('Ball Possession', homeTeamStats),
                awayTeamPossession: getStat('Ball Possession', awayTeamStats)
            });
        }

        return lastGamesStats;
    }
}
