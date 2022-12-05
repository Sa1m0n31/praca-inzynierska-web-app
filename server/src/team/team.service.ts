import { Injectable } from '@nestjs/common';
import axios from "axios";

@Injectable()
export class TeamService {
    async getTeamsByLeague(league: number, season: number) {
        const res = await axios.get(`https://v3.football.api-sports.io/teams`, {
            params: {
                league, season
            },
            headers: {
                'Accept-Encoding': 'application/json'
            }
        });
        return res.data.response;
    }

    async getHead2Head(teamA: number, teamB: number) {
        const res = await axios.get(`https://v3.football.api-sports.io/fixtures/headtohead`, {
            params: {
                h2h: `${teamA}-${teamB}`,
                last: 10
            },
            headers: {
                'Accept-Encoding': 'application/json'
            }
        });
        return res.data.response;
    }

    async getSquad(id: number) {
        const res = await axios.get(`https://v3.football.api-sports.io/players/squads`, {
            params: {
                team: id
            },
            headers: {
                'Accept-Encoding': 'application/json'
            }
        });

        return res.data.response;
    }

    async getTeamMatches(team: number, season: number) {
        const res = await axios.get(`https://v3.football.api-sports.io/fixtures`, {
            params: {
                team, season
            },
            headers: {
                'Accept-Encoding': 'application/json'
            }
        });

        console.log(res);

        return res.data.response;
    }
}
