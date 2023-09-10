import { ICreatePlaylist } from "#/interfaces/IPlaylist"
import IUser from "#/interfaces/IUser"
import axios from "axios"

const api = axios.create({
    baseURL: 'http://smify-v2-backend.vercel.app',
})


interface Search {
    limit: number,
    offset: number,
    search: string,
}


export default class EndPoints {
    static getPlaylists = async () => {
        const { data } = await api.get('/playlists')

        return data
    }

    static getUserPlaylists = async () => {
        const { data } = await api.get('/users/playlists', {
            withCredentials: true
        })

        return data
    }

    static getMusics = async ({
        limit,
        offset,
        search,
    }: Search) => {
        const { data } = await api.get(`/musics?limit=${limit}&offset=${offset}&search=${search}`)

        return data
    }

    static getMusicToId = async (id: string) => {
        const { data } = await api.get(`/getMusicToId/${id}`)

        return data
    }

    static getFavoriteMusics = async () => {
        const { data } = await api.get('/users/favorite-musics', {
            withCredentials: true,
        })

        return data
    }

    static createPlaylist = async (data: ICreatePlaylist) => {
        try{
            const response = await api.post('/playlists/create', data, {
                withCredentials: true,
            })

            if(response.status === 200) {
                return {
                    status: response.status
                }
            }

        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
         catch(err: any) {
            return {
                error: err.response.data.message,
                status: err.response.status
            }
        }
    }

    static getMusicsToPlaylistId = async (id: string) => {
        const { data } = await api.get(`/playlists/musics/${id}`)

        return data
    }

    static getUserProfile = async () => {
       try{
        const { data } = await api.get(`/user/profile`, {
            withCredentials: true,
        })

        return data
       } catch(error) {
              console.log(error)
       }
    }

    static addMusicsToPlaylist = async (musics_ids: number[], playlist_id: number) => {
        const { data } = await api.post(`/musics/addmusictoplaylist`, {
            musics_ids,
            playlist_id,
        })

        return data
    }

    static deletePlaylist = async (playlist_id: string) => {
        const { data } = await api.post(`/playlists/delete/${playlist_id}`)

        return data
    }

    static deleteMusicToPlaylist = async (playlist_id: string, music_id: number) => {
        const { data } = await api.delete(`/playlists/delete-music?playlist_id=${playlist_id}&music_id=${music_id}`)

        return data
    }

    static registerUser = async (data: Partial<IUser>) => {
        
        try{
            const response = await api.post(`/users/create`, {
                name: data.name,
                icon_name: data.icon_name,
                email: data.email,
                password: data.password
            })

            if(response.status === 200) {
                return {
                    status: response.status
                }
            } 

        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
         catch (error: any){
            return {
                error: error.response.data.message,
                status: error.response.status
            }
        }
    }

    static loginUser = async (email: string, password: string) => {
        try{
            const response = await api.post(`/users/login`, {
                email,
                password
            }, {
                withCredentials: true
            })

            if(response.status === 200) {
                return true
            }

        } catch(error) {
            return console.log(error)
        }
    }
    static getSession = async () => {
        try {
            const response = await api.get('/users/session', {
                withCredentials: true,
            });

            return response.status === 200;
        } catch (error) {
            return false;
        }
    }

    static likeOrDeslike = async (music_id: number) => {
        try {
            const response = await api.patch('/musics/like-or-desliked', {
                music_id
            }, {
                withCredentials: true
            })

            return response.status === 200;
        } catch (error) {
            return false;
        }
    }

}