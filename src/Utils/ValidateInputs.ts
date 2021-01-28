// This function validates if a string is a stock code
export const isValidStockCode = (input: string): boolean => {
    if (input.length < 5)
        return false
    //
    const format = /\d/g
    if (!format.test(input))
        return false
        
    //
    return true
}

// This function validates if a string is a valid e-mail
export const isValidEmail = (email: string): boolean => {
    const format = /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return format.test(String(email).toLowerCase())
}

// This function validates if a string has only lower case characters
export const isOnlyLetterLowerCase = (input: string): boolean => {
    const format = /^[a-z]+$/
    return format.test(input)
}

// This function validates if a string has only upper case characters
export const isOnlyLetterUpperCase = (input: string): boolean => {
    const format = /^[A-Z]+$/
    return format.test(input)
}

// This function validates if a string is a number
export const isNumber = (input: string): boolean => {
    const format = /^[0-9]+$/
    return format.test(input)
}

// This function validates if a string is a valid Date
export const isValidInputDate = (input: string): boolean => {
    var regEx = /^\d{4}-\d{2}-\d{2}$/
    //
    if (!input.match(regEx)) 
        return false  // Invalid format
    //
    var d = new Date(input)
    var dNum = d.getTime()
    if (!dNum && dNum !== 0) 
        return false // NaN value, Invalid date
    //
    return d.toISOString().slice(0, 10) === input
}

// Function that receives a number (Date from API) and returns a Date object
export const pregaoToDate = (input: number): Date | null => {
    if (input === null || input < 20000000)
        return null
    //20210123
    const year = parseInt(input.toString().substr(0, 4))
    const month = parseInt(input.toString().substr(4, 2)) - 1
    const day = parseInt(input.toString().substr(6, 2))
    return new Date(year, month, day)
}
