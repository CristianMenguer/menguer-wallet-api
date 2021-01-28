//Interface used in the whole app to help the authentication

interface TokenPayload {
    iat: number
    exp: number
    sub: string
}