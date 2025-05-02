export interface GameTeam {
    _id: string;
    name: string;
}

export interface GameCategory {
    _id: string;
    name: string;
}

export interface Game {
    _id: string;
    type: string;
    team_one: GameTeam;
    team_two: GameTeam;
    name: string;
    slug: string;
    category: GameCategory;
    important: boolean;
    date_range: boolean;
    starting_date: string;
    starting_time: string;
    ending_time: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}