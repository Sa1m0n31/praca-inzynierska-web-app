import React, {useEffect, useState} from 'react';
import backgroundImage from './static/img/background.jpg'
import backgroundGrass from './static/img/background-grass.jpg'
import LeaguePicker from "./LeaguePicker";
import TeamPicker from "./TeamPicker";

const Homepage = () => {
    const [league, setLeague] = useState(0);
    const [homeTeam, setHomeTeam] = useState(0);
    const [awayTeam, setAwayTeam] = useState(0);
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        // TODO: API CALL
        setTeams([
            {
                label: 'Manchester City',
                value: 12
            },
            {
                label: 'Arsenal',
                value: 213
            }
        ]);
    }, [league]);

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
        </div>
    </div>
};

export default Homepage;
