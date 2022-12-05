import axios from "axios";
import {getCurrentSeason} from "./others";

const getTeamsByLeague = (league) => {
    return axios.get(`/team/getTeamsByLeague/${league}/${getCurrentSeason()}`);
}

const getHead2Head = (home, away) => {
    return axios.get(`/team/getHead2Head/${home}/${away}`);
}

const getSquad = (team) => {
    return axios.get(`/team/getSquad/${team}`);
}

const getTeamMatches = (team) => {
    return axios.get(`/team/getMatches/${team}/${getCurrentSeason()}`)
}

export { getTeamsByLeague, getHead2Head, getSquad, getTeamMatches }
