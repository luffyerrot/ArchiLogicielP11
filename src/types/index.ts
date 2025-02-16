export interface GroupeSpecialiteDto {
    id: number
    nom: string
};

export interface SpecialiteDto {
    id: number
    nom: string
    groupe: string
};

export interface HopitalDto {
    id: number
    adresse: string
    available_beds: number
    city?: string
    email?: string
    latitude: number
    longitude: number
    name?: string
    phone?: string
    post_code?: string
    website?: string
};

export interface MapPathDto {
    origin: PointDto
    target: PointDto
};

export interface PointDto {
    longitude: number
    latitude: number
};

export interface ConnexionDto {
    mail: string
    motdepasse: string
};

export interface InformationConnexion {
    token: string;
    expiresDans: number;
    mail: string;
};

export interface RouteCoord {
    lat: number;
    lng: number;
};

export interface GoogleMapPath {
    routes: RoutePath[];
};

export interface RoutePath {
    legs: Legs[];
};

export interface Legs {
    start_location: RouteCoord;
    steps: Step[];
};

export interface Step {
    end_location: RouteCoord;
};