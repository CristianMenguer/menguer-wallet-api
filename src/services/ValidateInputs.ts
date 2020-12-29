export const isValidEmail = (email: string): boolean => {
    const format = /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return format.test(String(email).toLowerCase())
}

export const isOnlyLetterLowerCase = (input: string): boolean => {
    const format = /^[a-z]+$/
    return format.test(input)
}

export const isOnlyLetterUpperCase = (input: string): boolean => {
    const format = /^[A-Z]+$/
    return format.test(input)
}

export const isNumber = (input: string): boolean => {
    const format = /^[0-9]+$/
    return format.test(input)
}
