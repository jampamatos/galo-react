export type Team = {
    id: number;
    name: string;
    logo: string;
    abbreviation: string;
    country: string;
    founded: number;
    venue: {
        image: string;
        name: string;
        address: string;
        city: string;
        capacity: number;
    };
};

export type NextMatch = {
    homeTeam: Team;
    awayTeam: Team;
    matchInfo: string;
};

export type Player = {
    id: number;
    name: string;
    age: number;
    photo: string;
    position: string;
    nationality?: string;
    height?: string;
    weight?: string;
    appearances?: number;
    goals?: number;
    assists?: number;
    avgRating?: any;
};

export type PlayerGridProps = {
    season: number;
};

export type PlayerStats = {
    league: string;
    season: number;
    appearances: number;
    goals: number;
    assists: number;
    rating: number | null;
    position?: string;
};