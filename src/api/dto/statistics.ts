export interface Statistics {
    charts: Chart[];
    countries: Country[];
    cities: Country[];
    browsers: Country[];
}

export interface Country {
    name: string;
    scansCount: number;
    rate: number;
}

export interface Chart {
    date: string;
    scansCount: number;
}