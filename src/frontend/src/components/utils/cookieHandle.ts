import Cookies from "universal-cookie";


export interface SpotifyCoockie {
    access_token: string;
    token_type: string;
    expires_in: number;
    refresh_token: string;
    scope: string;
}
const SpotifyCoockieKeys = [
    "access_token",
    "token_type",
    "expires_in",
    "refresh_token",
    "scope",
]
export const setCookies = (cookies) => {
    const cookiesLib = new Cookies()
    debugger
    SpotifyCoockieKeys.forEach((key) => {
        cookiesLib.set(key,cookies[key],{path: "/", })
    }
    )
}
export const readCookies = () => {
    const cookiesLib = new Cookies()
    const allCookies = cookiesLib.getAll()
    const spotifyCookies = {}
    SpotifyCoockieKeys.forEach(
        (key: string) => {
            spotifyCookies[key] = cookiesLib.get(key, )
        }
    )
    return [spotifyCookies, allCookies]
}
export const getUserPath = async (cookie : SpotifyCoockie) => {
    let res = await fetch('https://api.spotify.com/v1/me', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `${cookie.token_type} ${cookie.access_token}`
        }
    })
    let data = await res.json()
    // debugger
    if (data.id) return "/user/" + data.id
    return "/login"
}
export const isValidCookies = (cookie : SpotifyCoockie) => {
    if (!Object.keys(cookie).length) {
        console.log("invalid cookies");
        return false
    } else  {
        console.log("Valid cookies");
        return true
        
    }
}
export const deleteCookies = () => {
    const cookiesLib = new Cookies()
    SpotifyCoockieKeys.forEach(
        (key: string) => {
            cookiesLib.remove(key, { path: '/' })
        }
    )
    console.info("spotify api cookies deleted");
}



