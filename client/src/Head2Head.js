import React from 'react';

const Head2Head = ({matches}) => {
    return <div className="block">
        <h3 className="block__header">
            Ostatnie mecze między drużynami
        </h3>

        {matches?.map((item, index) => {
            return <div className="block__singleH2HMatch" key={index}>
                <div className="block__team">
                    <img className="img" src={item.homeTeam.logo} alt="logo" />
                    <p className={item.homeTeamScore > item.awayTeamScore ? "block__team__name block__team__name--win" : "block__team__name"}>
                        {item.homeTeam.name}
                    </p>
                </div>

                <div className="block__score">
                    <h3 className="block__score__full">
                        {item.homeTeamScore} : {item.awayTeamScore}
                    </h3>
                    <h4 className="block__score__halfTime">
                        ({item.homeTeamHTScore} : {item.awayTeamHTScore})
                    </h4>
                    <h5 className="block__score__date">
                        <span>{item.date.substring(0, 10)}</span>
                        <span>{item.league}</span>
                    </h5>
                </div>

                <div className="block__team">
                    <p className={item.awayTeamScore > item.homeTeamScore ? "block__team__name block__team__name" : "block__team__name"}>
                        {item.awayTeam.name}
                    </p>
                    <img className="img" src={item.awayTeam.logo} alt="logo" />
                </div>
            </div>
        })}
    </div>
};

export default Head2Head;
