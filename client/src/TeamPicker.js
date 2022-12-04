import React from 'react';
import Select from 'react-select';

const TeamPicker = ({homeTeam, setHomeTeam, awayTeam, setAwayTeam, teams}) => {
    return <div className="flex teamPicker">
        <div className="block block--teamPicker">
            <h3 className="block__header">
                Wybierz zespół gospodarzy
            </h3>
            <Select
                defaultValue={{label: 'Manchester City',
                    value: 12}}
                options={teams}
                className="select"
                placeholder="Wybierz gospodarza"
                value={homeTeam}
                onChange={setHomeTeam} />
        </div>
    </div>
};

export default TeamPicker;
