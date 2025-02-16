import { ConnexionDto, InformationConnexion } from "@/types";
import axios, { AxiosPromise } from "axios";

export function subscribe(connexion: ConnexionDto): AxiosPromise<ConnexionDto> {
	return axios.post('/user/auth/subscribe', connexion);
}

export function login(connexion: ConnexionDto): AxiosPromise<InformationConnexion> {
	return axios.post('/user/auth/login', connexion);
}