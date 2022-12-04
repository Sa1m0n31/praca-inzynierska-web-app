import React, {useEffect, useState} from 'react';
import backgroundImage from './static/img/background.jpg'
import backgroundGrass from './static/img/background-grass.jpg'
import LeaguePicker from "./LeaguePicker";
import TeamPicker from "./TeamPicker";
import {getHead2Head, getTeamsByLeague} from "./helpers/teams";
import {footballApiLeagueIds} from "./helpers/content";
import Head2Head from "./Head2Head";

const Homepage = () => {
    const [league, setLeague] = useState(0);
    const [homeTeam, setHomeTeam] = useState(0);
    const [awayTeam, setAwayTeam] = useState(0);
    const [teams, setTeams] = useState([]);
    const [h2h, setH2h] = useState([]);

    useEffect(() => {
        setHomeTeam(0);
        setAwayTeam(0);
        setH2h([]);

        getTeamsByLeague(footballApiLeagueIds[(league+1).toString()])
            .then((res) => {
               if(res?.data) {
                   setTeams(res.data.map((item) => {
                       return {
                           label: item.team.name,
                           value: item.team.id
                       }
                   }));
               }
            });
    }, [league]);

    useEffect(() => {
        if(homeTeam && awayTeam) {
            getHead2Head(homeTeam.value, awayTeam.value)
                .then((res) => {
                    setH2h(res.data.map((item) => {
                        return {
                            date: item.fixture.date,
                            homeTeam: {
                                name: item.teams.home.name,
                                logo: item.teams.home.logo
                            },
                            awayTeam: {
                                name: item.teams.away.name,
                                logo: item.teams.away.logo
                            },
                            homeTeamScore: item.score.fulltime.home,
                            awayTeamScore: item.score.fulltime.away,
                            homeTeamHTScore: item.score.halftime.home,
                            awayTeamHTScore: item.score.halftime.away,
                            league: item.league.name
                        }
                    }));
                });
        }
    }, [homeTeam, awayTeam]);

    return <div className="container homepage">
        <img className="homepage__background" src={backgroundImage} alt="tlo" />
        <img className="homepage__grass" src={backgroundGrass} alt="trawa" />

        <div className="content">
            <LeaguePicker league={league} setLeague={setLeague} />
            <TeamPicker homeTeam={homeTeam}
                        setHomeTeam={setHomeTeam}
                        awayTeam={awayTeam}
                        setAwayTeam={setAwayTeam}
                        teams={teams} />
            <Head2Head matches={h2h} />
        </div>
    </div>
};

export default Homepage;
