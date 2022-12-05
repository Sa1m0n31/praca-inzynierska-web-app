const getCurrentSeason = () => {
    const currentMonth = new Date().getMonth()+1;

    if(currentMonth >= 8) {
        return new Date().getFullYear();
    }
    else {
        return new Date().getFullYear()-1;
    }
}

const getPosition = (pos) => {
    switch(pos) {
        case 'Goalkeeper':
            return 'BR';
        case 'Defender':
            return 'O';
        case 'Attacker':
            return 'N';
        default:
            return 'P';
    }
}

export { getCurrentSeason, getPosition }
