import IPlaylist from "./IPlaylist";

export default interface IUser {
    id?: number;
    icon_name?: string;
    name?: string;
    email: string;
    password: string;
    playlists: IPlaylist[];
}
