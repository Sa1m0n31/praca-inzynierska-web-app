import React, {useEffect, useState} from 'react';
import backgroundImage from '../static/img/background.jpg'
import backgroundGrass from '../static/img/background-grass.jpg'
import LeaguePicker from "../components/LeaguePicker";
import TeamPicker from "../components/TeamPicker";
import {getHead2Head, getSquad, getTeamMatches, getTeamsByLeague} from "../helpers/teams";
import {footballApiLeagueIds} from "../helpers/content";
import Head2Head from "../components/Head2Head";
import Squads from "../components/Squads";
import LastMatches from "../components/LastMatches";

const Homepage = () => {
    const [league, setLeague] = useState(0);
    const [homeTeam, setHomeTeam] = useState(0);
    const [awayTeam, setAwayTeam] = useState(0);
    const [teams, setTeams] = useState([]);
    const [h2h, setH2h] = useState([]);
    const [homeTeamSquad, setHomeTeamSquad] = useState([]);
    const [awayTeamSquad, setAwayTeamSquad] = useState([]);
    const [homeTeamMatches, setHomeTeamMatches] = useState([]);
    const [awayTeamMatches, setAwayTeamMatches] = useState([]);

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
            getSquad(homeTeam.value)
                .then((res) => {
                    if(res?.data?.length) {
                        setHomeTeamSquad(res.data[0].players.map((item) => {
                            return {
                                name: item.name,
                                age: item.age,
                                position: item.position,
                                number: item.number
                            }
                        }));
                    }
                });

            getSquad(awayTeam.value)
                .then((res) => {
                    if(res?.data?.length) {
                        setAwayTeamSquad(res.data[0].players.map((item) => {
                            return {
                                name: item.name,
                                age: item.age,
                                position: item.position,
                                number: item.number
                            }
                        }));
                    }
                });

            getTeamMatches(homeTeam.value)
                .then((res) => {
                    if(res?.data) {
                        const matches = res.data.map((item) => {
                            return {
                                date: item.fixture.date,
                                league: item.league.name,
                                homeTeam: {
                                    name: item.teams.home.name,
                                    logo: item.teams.home.logo
                                },
                                awayTeam: {
                                    name: item.teams.away.name,
                                    logo: item.teams.away.logo
                                },
                                homeTeamScore: item.goals.home,
                                awayTeamScore: item.goals.away,
                                homeTeamHTScore: item.score.halftime.home,
                                awayTeamHTScore: item.score.halftime.away
                            }
                        }).filter((item) => (item.homeTeamScore !== null && item.homeTeamHTScore !== null)).reverse();
                        setHomeTeamMatches([...matches]);
                    }
                });

            getTeamMatches(awayTeam.value)
                .then((res) => {
                    if(res?.data) {
                        const matches = res.data.map((item) => {
                            return {
                                date: item.fixture.date,
                                league: item.league.name,
                                homeTeam: {
                                    name: item.teams.home.name,
                                    logo: item.teams.home.logo
                                },
                                awayTeam: {
                                    name: item.teams.away.name,
                                    logo: item.teams.away.logo
                                },
                                homeTeamScore: item.goals.home,
                                awayTeamScore: item.goals.away,
                                homeTeamHTScore: item.score.halftime.home,
                                awayTeamHTScore: item.score.halftime.away
                            }
                        }).filter((item) => (item.homeTeamScore !== null && item.homeTeamHTScore !== null)).sort((a, b) => {
                            const aDate = new Date(a.date);
                            const bDate = new Date(b.date);

                            return aDate < bDate ? 1 : -1;
                        });
                        setAwayTeamMatches([...matches]);
                    }
                })

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

    const predictResult = () => {

    }

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
            <Squads homeTeam={homeTeam}
                    awayTeam={awayTeam}
                    homeTeamSquad={homeTeamSquad}
                    awayTeamSquad={awayTeamSquad} />
            <LastMatches homeTeam={homeTeam}
                         homeTeamMatches={homeTeamMatches}
                         awayTeam={awayTeam}
                         awayTeamMatches={awayTeamMatches} />
            <Head2Head matches={h2h} />

            <button className="btn btn--submit" onClick={() => { predictResult(); }}>
                Przewiduj wynik
            </button>
        </div>
    </div>
};

export default Homepage;
