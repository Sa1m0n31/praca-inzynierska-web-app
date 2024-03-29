import {Controller, Get, Param} from '@nestjs/common';
import {TeamService} from "./team.service";

@Controller('team')
export class TeamController {
    constructor(
        private readonly teamService: TeamService
    ) {
    }

    @Get('/getTeamsByLeague/:league/:season')
    getTeamsByLeague(@Param('league') league, @Param('season') season) {
        return this.teamService.getTeamsByLeague(league, season);
    }

    @Get('/getHead2Head/:home/:away')
    getHead2Head(@Param('home') home, @Param('away') away) {
        return this.teamService.getHead2Head(home, away);
    }

    @Get('/getSquad/:team')
    getSquad(@Param('team') team) {
        return this.teamService.getSquad(team);
    }

    @Get('/getMatches/:team/:season')
    getMatches(@Param('team') team, @Param('season') season) {
        return this.teamService.getTeamMatches(team, season);
    }
}
