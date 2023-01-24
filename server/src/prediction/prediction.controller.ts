import {Body, Controller, Get, Param, Post} from '@nestjs/common';
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

    @Post('/predict')
    predict(@Body() body) {
        return this.predictionService.predict(body.homeTeamId, body.awayTeamId);
    }
}
