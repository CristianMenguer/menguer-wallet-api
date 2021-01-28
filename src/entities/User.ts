// Class User and its constructor defined here
class User {
    _id?: string
    fullname: string
    username: string
    email: string
    age?: number
    gender?: string
    password?: string
    created_at?: Date
    updated_at?: Date

    constructor(fullname: string, username: string, email: string, password: string) {
        this.fullname = fullname
        this.username = username
        this.email = email
        this.password = password
        this.created_at = new Date()
        this.updated_at = new Date()
    }    
}

export default User