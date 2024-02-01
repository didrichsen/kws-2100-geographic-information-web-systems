import {stedsNavn} from "./interfaces";

const getStedsNavn = (navn: stedsNavn[]) => {
    return navn.find((navn) => navn.sprak === "nor")?.navn;
};

export {getStedsNavn};