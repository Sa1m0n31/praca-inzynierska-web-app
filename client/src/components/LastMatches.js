import React, {useEffect, useState} from 'react';

const LastMatches = ({homeTeam, awayTeam, homeTeamMatches, awayTeamMatches}) => {
    const [numberOfHomeTeamMatches, setNumberOfHomeTeamMatches] = useState(5);
    const [numberOfAwayTeamMatches, setNumberOfAwayTeamMatches] = useState(5);
    const [homeTeamSeries, setHomeTeamSeries] = useState([]);
    const [awayTeamSeries, setAwayTeamSeries] = useState([]);

    useEffect(() => {
        let series = [];
        const homeTeamName = homeTeam.label;

        for(const item of homeTeamMatches) {
            if(homeTeamName === item.homeTeam.name) {
                if(item.homeTeamScore > item.awayTeamScore) series.push('W');
                else if(item.homeTeamScore === item.awayTeamScore) series.push('D');
                else series.push('L');
            }
            else {
                if(item.homeTeamScore < item.awayTeamScore) series.push('W');
                else if(item.homeTeamScore === item.awayTeamScore) series.push('D');
                else series.push('L');
            }
        }

        setHomeTeamSeries(series);
    }, [homeTeamMatches]);

    useEffect(() => {
        let series = [];
        const awayTeamName = awayTeam.label;

        for(const item of homeTeamMatches) {
            if(awayTeamName === item.homeTeam.name) {
                if(item.homeTeamScore > item.awayTeamScore) series.push('W');
                else if(item.homeTeamScore === item.awayTeamScore) series.push('D');
                else series.push('L');
            }
            else {
                if(item.homeTeamScore < item.awayTeamScore) series.push('W');
                else if(item.homeTeamScore === item.awayTeamScore) series.push('D');
                else series.push('L');
            }
        }

        setAwayTeamSeries(series);
    }, [awayTeamMatches]);

    const getTeamOpponent = (team, match) => {
        if(team === match.homeTeam.name) return `vs ${match.awayTeam.name}`;
        return `@ ${match.homeTeam.name}`;
    }

    const getTeamScore = (team, match) => {
        if(team === match.homeTeam.name) {
            return `${match.homeTeamScore} - ${match.awayTeamScore} (${match.homeTeamHTScore} : ${match.awayTeamHTScore})`;
        }
        else {
            return `${match.awayTeamScore} - ${match.homeTeamScore} (${match.awayTeamHTScore} : ${match.homeTeamHTScore})`;
        }
    }

    return <div className="flex teamPicker teamPicker--squads">
        <div className="block block--teamPicker block--squad">
            <h3 className="block__header">
                {homeTeam ? homeTeam.label : 'Gospodarze'}
            </h3>
            <div className="lastMatches">
                <div className="lastMatches__picker">
                    <span className="lastMatches__picker__header">
                        Liczba ostatnich meczów:
                    </span>
                    <button className={numberOfHomeTeamMatches === 3 ? "btn btn--lastMatches btn--lastMatches--selected" : "btn btn--lastMatches"}
                            onClick={() => { setNumberOfHomeTeamMatches(3); }}>
                        3
                    </button>
                    <button className={numberOfHomeTeamMatches === 5 ? "btn btn--lastMatches btn--lastMatches--selected" : "btn btn--lastMatches"}
                            onClick={() => { setNumberOfHomeTeamMatches(5); }}>
                        5
                    </button>
                    <button className={numberOfHomeTeamMatches === 10 ? "btn btn--lastMatches btn--lastMatches--selected" : "btn btn--lastMatches"}
                            onClick={() => { setNumberOfHomeTeamMatches(10); }}>
                        10
                    </button>
                    <button className={numberOfHomeTeamMatches === 15 ? "btn btn--lastMatches btn--lastMatches--selected" : "btn btn--lastMatches"}
                            onClick={() => { setNumberOfHomeTeamMatches(15); }}>
                        15
                    </button>
                    <button className={numberOfHomeTeamMatches === 20 ? "btn btn--lastMatches btn--lastMatches--selected" : "btn btn--lastMatches"}
                            onClick={() => { setNumberOfHomeTeamMatches(20); }}>
                        20
                    </button>
                </div>

                <div className="lastMatches__series">
                    {homeTeamSeries.map((item, index) => {
                        if(index < numberOfHomeTeamMatches) {
                            if(item === 'W') {
                                return <span className="series series--win" key={index}>
                                    W
                                </span>
                            }
                            else if(item === 'D') {
                                return <span className="series series--draw" key={index}>
                                    D
                                </span>
                            }
                            else {
                                return <span className="series series--lost" key={index}>
                                    L
                                </span>
                            }
                        }
                    })}
                </div>

                {homeTeamMatches.map((item, index) => {
                    if(index < numberOfHomeTeamMatches) {
                        const score = getTeamScore(homeTeam.label, item);
                        const teamScore = parseInt(score.split('-')[0]);
                        const opponentScore = parseInt(score.split('-')[1]);

                        return <div className="lastMatches__match" key={index}>
                            <span className={teamScore > opponentScore ? "d-block teamWin" : (teamScore < opponentScore ? 'd-block teamLost' : 'd-block teamDraw')}>
                                <span className="lastMatches__match__opponent">
                                    {getTeamOpponent(homeTeam.label, item)}, <b>{score}</b>
                                </span>
                            </span>
                            <span className="d-block">
                                <span className="lastMatches__match__date">
                                    {item.date.substring(0, 10)}
                                </span>
                                <span className="lastMatches__match__league">
                                    {item.league}
                                </span>
                            </span>
                        </div>
                    }
                })}
            </div>
        </div>
        <div className="block block--teamPicker block--squad">
            <h3 className="block__header">
                {awayTeam ? awayTeam.label : 'Goście'}
            </h3>
            <div className="lastMatches">
                <div className="lastMatches__picker">
                    <span className="lastMatches__picker__header">
                        Liczba ostatnich meczów:
                    </span>
                    <button className={numberOfAwayTeamMatches === 3 ? "btn btn--lastMatches btn--lastMatches--selected" : "btn btn--lastMatches"}
                            onClick={() => { setNumberOfAwayTeamMatches(3); }}>
                        3
                    </button>
                    <button className={numberOfAwayTeamMatches === 5 ? "btn btn--lastMatches btn--lastMatches--selected" : "btn btn--lastMatches"}
                            onClick={() => { setNumberOfAwayTeamMatches(5); }}>
                        5
                    </button>
                    <button className={numberOfAwayTeamMatches === 10 ? "btn btn--lastMatches btn--lastMatches--selected" : "btn btn--lastMatches"}
                            onClick={() => { setNumberOfAwayTeamMatches(10); }}>
                        10
                    </button>
                    <button className={numberOfAwayTeamMatches === 15 ? "btn btn--lastMatches btn--lastMatches--selected" : "btn btn--lastMatches"}
                            onClick={() => { setNumberOfAwayTeamMatches(15); }}>
                        15
                    </button>
                    <button className={numberOfAwayTeamMatches === 20 ? "btn btn--lastMatches btn--lastMatches--selected" : "btn btn--lastMatches"}
                            onClick={() => { setNumberOfAwayTeamMatches(20); }}>
                        20
                    </button>
                </div>

                <div className="lastMatches__series">
                    {awayTeamSeries.map((item, index) => {
                        if(index < numberOfHomeTeamMatches) {
                            if(item === 'W') {
                                return <span className="series series--win" key={index}>
                                    W
                                </span>
                            }
                            else if(item === 'D') {
                                return <span className="series series--draw" key={index}>
                                    D
                                </span>
                            }
                            else {
                                return <span className="series series--lost" key={index}>
                                    L
                                </span>
                            }
                        }
                    })}
                </div>

                {awayTeamMatches.map((item, index) => {
                    if(index < numberOfHomeTeamMatches) {
                        const score = getTeamScore(homeTeam.label, item);
                        const teamScore = parseInt(score.split('-')[0]);
                        const opponentScore = parseInt(score.split('-')[1]);

                        return <div className="lastMatches__match" key={index}>
                            <span className={teamScore > opponentScore ? "d-block teamWin" : (teamScore < opponentScore ? 'd-block teamLost' : 'd-block teamDraw')}>
                                <span className="lastMatches__match__opponent">
                                    {getTeamOpponent(homeTeam.label, item)}, <b>{score}</b>
                                </span>
                            </span>
                            <span className="d-block">
                                <span className="lastMatches__match__date">
                                    {item.date.substring(0, 10)}
                                </span>
                                <span className="lastMatches__match__league">
                                    {item.league}
                                </span>
                            </span>
                        </div>
                    }
                })}
            </div>
        </div>
    </div>
};

export default LastMatches;
