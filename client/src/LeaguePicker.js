import React, {useContext, useState} from 'react';

const LeaguePicker = ({league, setLeague}) => {
    const leagueNames = ['Premier League', 'La Liga', 'Serie A', 'Ligue 1', 'Bundesliga'];

    const [leagueModal, setLeagueModal] = useState(false);

    return <div className="block">
        <h3 className="block__header">
            Wybierz ligę
        </h3>

        <div className="block__leaguePicker flex">
            {leagueNames.map((item, index) => {
                return <button key={index}
                               className={league === index ? "btn btn--leaguePicker btn--leaguePicker--selected" : "btn btn--leaguePicker"}
                               onClick={() => { setLeague(index); }}>
                    {item}
                </button>
            })}
        </div>
    </div>
};

export default LeaguePicker;
