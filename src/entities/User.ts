class User {
    _id?: string
    first_name: string
    last_name: string
    username: string
    email: string
    age: number
    gender: string
    password?: string
    created_at?: Date
    updated_at?: Date

    constructor(first_name: string, last_name: string, username: string, email: string, password: string, age: number, gender: string) {
        this.first_name = first_name
        this.last_name = last_name
        this.username = username
        this.email = email
        this.password = password
        this.age = age
        this.gender = gender
        this.created_at = new Date()
        this.updated_at = new Date()
    }    
}

export default User