
// This function replaces all the occurrences of a specific string in another
// and returns it
export const replaceAll = (input: string, search: string, replace: string) => {
    return input.split(search).join(replace)
}

// Function that makes the process wait for a specific time, using primise
export const sleep = (miliseconds: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, miliseconds))
}

// Function that makes the process wait for a specific time, using while loop
export const sleep2 = (miliseconds: number): void => {
    const date = Date.now()
    let currentDate = null
    do {
        currentDate = Date.now()
    }
    while (currentDate - date < miliseconds)
}

// Function that fills a string in the left with a character
export const padL = (input: string, strFill: string, length: number): string => {
    return (length <= input.length) ? input : padL((strFill + input), strFill, length)
}

// Function that fills a string in the right with a character
export const padR = (input: string, strFill: string, length: number): string => {
    return (length <= input.length) ? input : padL((input + strFill), strFill, length)
}