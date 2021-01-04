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

export const dateToPregao = (input: Date): number => {
    if (input === null)
        return 0
    //
    return parseInt(input.getFullYear().toString() + ('0' + (input.getMonth() + 1)).toString().slice(-2) + ('0' + input.getDate().toString()).slice(-2))
}

export const pregaoToDate = (input: number): Date | null => {
    if (input === null || input < 20000000)
        return null
    //20210123
    const year = parseInt(input.toString().substr(0, 4))
    const month = parseInt(input.toString().substr(4, 2)) - 1
    const day = parseInt(input.toString().substr(6, 2))
    return new Date(year, month, day)
}
