export default interface IPlaylist {
    id: number;
    playlist_name: string;
}

export interface ICreatePlaylist {
    playlist_name: string;
    musicsIds: number[];
}