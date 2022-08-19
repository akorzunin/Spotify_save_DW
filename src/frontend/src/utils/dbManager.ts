import { readCookies } from "./cookieHandle"

const getLocation = () => {
    const pref = window.location.href.split("//")[0]
    const location = window.location.href.split("//")[1].split("/")[0]
    return [pref, location]
}

export const getUserData = async (userId: string): Promise<any> => {
    return fetch(`/api/user?user_id=${userId}`, {
        headers: {
            accept: "application/json",
        },
    })
        .then((res: Response) => {
            if (res.status === 404) {
                return false
            }
            return res.json()
        })
        .then((data: any) => data)
}

export const createUser = async (userId: string, userData): Promise<any> => {
    const res = await fetch(`/api/new_user`, {
        method: "POST",
        headers: {
            accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    })
    const data = await res.json()
    console.log("User created: ", data)

    return data
}
