import {Controller, Get, Param} from '@nestjs/common';
import {PredictionService} from "./prediction.service";

@Controller('prediction')
export class PredictionController {
    constructor(
        private readonly predictionService: PredictionService
    ) {
    }

    @Get('/getLastGames/:team/:games')
    getLastGames(@Param('team') team, @Param('games') games) {
        return this.predictionService.getLastGamesByTeam(team, games);
    }
}
