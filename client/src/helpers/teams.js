import axios from "axios";

const getTeamsByLeague = (league) => {
    const season = 2022;

    return axios.get(`/team/getTeamsByLeague/${league}/${season}`);
}

const getHead2Head = (home, away) => {
    return axios.get(`/team/getHead2Head/${home}/${away}`);
}

export { getTeamsByLeague, getHead2Head }
