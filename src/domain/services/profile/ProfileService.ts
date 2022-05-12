import {httpClient} from "../../../tools/http-client";
import {Profile} from "../../entities/Profile";

const prefix = "person/profile";

export const ProfileService = {

    load() {
        return httpClient.get<Profile>(`${prefix}/load`)
    },

    changeName(newName: string) {
        httpClient.post(`${prefix}/change/name`, {name: newName})
    },

    merge(profile: Profile) {
        return httpClient.post<Profile>(`${prefix}/merge`, profile)
    },

    addPhotos(photos: FormData) {
        return httpClient.post<Profile>(`${prefix}/photo/add`, photos);
    },

    setAvatar(photoId: number) {
        return httpClient.post<Profile>(`${prefix}/avatar/set`, {photoId});
    }

}