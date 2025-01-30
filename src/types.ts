export type Team = {
    name: string;
    logo: string;
    abbreviation: string;
};

export type NextMatch = {
    homeTeam: Team;
    awayTeam: Team;
    matchInfo: string;
};
