import { z } from "zod";

const baseUrl = "http://localhost:3000";

const UserDtoSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
})

export const api = {
    getUsers: async () => {
        return await fetch(`${baseUrl}/users`)
            .then((response) => response.json())
            .then((res) => {
                return UserDtoSchema.array().parse(res); 
            });
    },

    getUser: async (userId: string) => {
        return await fetch(`${baseUrl}/users/${userId}`)
            .then((response) => response.json())
            .then((res) => UserDtoSchema.parse(res));
    },

    deleteUser: async (userId: string) => {
        return await fetch(`${baseUrl}/users/${userId}`, {
            method: "DELETE",
        }).then((response) => response.json());
    }
}