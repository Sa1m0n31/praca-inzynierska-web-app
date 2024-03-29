import React from 'react';
import Select from 'react-select';

const TeamPicker = ({homeTeam, setHomeTeam, awayTeam, setAwayTeam, teams}) => {
    return <div className="flex teamPicker">
        <div className="block block--teamPicker">
            <h3 className="block__header">
                Wybierz zespół gospodarzy
            </h3>
            <Select
                defaultValue={teams[0]}
                options={teams}
                className="select"
                placeholder="Wybierz gospodarza"
                value={homeTeam}
                onChange={setHomeTeam} />
        </div>
        <div className="block block--teamPicker">
            <h3 className="block__header">
                Wybierz zespół gości
            </h3>
            <Select
                defaultValue={teams[0]}
                options={teams}
                className="select"
                placeholder="Wybierz gościa"
                value={awayTeam}
                onChange={setAwayTeam} />
        </div>
    </div>
};

export default TeamPicker;
