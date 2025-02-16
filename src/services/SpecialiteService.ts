import { GoogleMapPath, GroupeSpecialiteDto, HopitalDto, MapPathDto, SpecialiteDto } from "@/types";
import axios, { AxiosPromise } from "axios";

export function getAllGroupe(): AxiosPromise<GroupeSpecialiteDto[]> {
	return axios.get<GroupeSpecialiteDto[]>('/api/groupes');
}

export function getSpecialitesByGroupeId(groupeId: number): AxiosPromise<SpecialiteDto[]> {
	return axios.get<SpecialiteDto[]>('/api/specialites?id=' + groupeId);
}

export function getHopitauxBySpecialiteId(specialiteId: number): AxiosPromise<HopitalDto[]> {
	return axios.get<HopitalDto[]>('/api/hopitaux?id=' + specialiteId);
}

export function getPath(mapPath: MapPathDto): AxiosPromise<GoogleMapPath> {
	return axios.put<GoogleMapPath>('/api/path', mapPath);
}