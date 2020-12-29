class User {
    _id?: string
    name: string
    username: string
    email: string
    password?: string
    created_at?: Date
    updated_at?: Date

    constructor(name: string, username: string, email: string, password: string, usertype: string) {
        this.name = name
        this.username = username
        this.email = email
        this.password = password
        this.created_at = new Date()
        this.updated_at = new Date()
    }    
}

export default User