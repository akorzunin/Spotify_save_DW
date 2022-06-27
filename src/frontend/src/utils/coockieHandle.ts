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

export const readCookies = () => {
    true
}
export const getUserPath = (cookie : SpotifyCoockie) => {
    // debugger
    // fetch()
    return "/user/123"
}
export const validateCookies = (cookie : SpotifyCoockie) => {
    if (!Object.keys(cookie).length) {
        console.log("invalid cookies");
        
        return false
    } else  {
        console.log("Valid cookies");
        return true
        
    }
}
export const deleteCookies = (item) => {
    const cookiesLib = new Cookies()
    SpotifyCoockieKeys.forEach(
        (key:string) => {
            cookiesLib.remove(key)
        }
    )
}



