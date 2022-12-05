import React, {useEffect, useState} from 'react';
import {getPosition} from "../helpers/others";

const Squads = ({homeTeam, awayTeam, homeTeamSquad, awayTeamSquad}) => {
    const [homeTeamAverageAge, setHomeTeamAverageAge] = useState(0);
    const [awayTeamAverageAge, setAwayTeamAverageAge] = useState(0);

    useEffect(() => {
        if(homeTeamSquad?.length) {
            const ageSum = homeTeamSquad.reduce((acc, curr) => {
                return acc + curr.age;
            }, 0);

            setHomeTeamAverageAge((ageSum / homeTeamSquad.length).toFixed(2));
        }
    }, [homeTeamSquad]);

    useEffect(() => {
        if(awayTeamSquad?.length) {
            const ageSum = awayTeamSquad.reduce((acc, curr) => {
                return acc + curr.age;
            }, 0);
            setAwayTeamAverageAge((ageSum / awayTeamSquad.length).toFixed(2));
        }
    }, [awayTeamSquad]);

    return <div className="flex teamPicker teamPicker--squads">
        <div className="block block--teamPicker block--squad">
            <h3 className="block__header">
                {homeTeam ? homeTeam.label : 'Gospodarze'}

                {homeTeamAverageAge ? <span className="squad__avgAge">
                    śr. wieku: <b>{homeTeamAverageAge}</b>
                </span> : ''}
            </h3>
            {homeTeamSquad.map((item, index, array) => {
                return <p className={(item.position !== array[index-1]?.position) && (index !== 0) ? "squad__item squad__item--borderTop" : "squad__item"}
                          key={index}>
                    <span className="squad__item__position">
                        {getPosition(item.position)}
                    </span>
                    <span className="squad__item__name">
                        {item.name}
                    </span>
                </p>
            })}
        </div>
        <div className="block block--teamPicker block--squad">
            <h3 className="block__header">
                {awayTeam ? awayTeam.label : 'Goście'}

                {awayTeamAverageAge ? <span className="squad__avgAge">
                    śr. wieku: <b>{awayTeamAverageAge}</b>
                </span> : ''}
            </h3>
            {awayTeamSquad.map((item, index, array) => {
                return <p className={(item.position !== array[index-1]?.position) && (index !== 0) ? "squad__item squad__item--borderTop" : "squad__item"}
                          key={index}>
                    <span className="squad__item__position">
                        {getPosition(item.position)}
                    </span>
                    <span className="squad__item__name">
                        {item.name}
                    </span>
                </p>
            })}
        </div>
    </div>
};

export default Squads;
