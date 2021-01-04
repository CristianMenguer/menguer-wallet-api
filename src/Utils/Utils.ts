export const replaceAll = (input: string, search: string, replace: string) => {
    return input.split(search).join(replace)
}

export const sleep = (miliseconds: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, miliseconds))
}

export const sleep2 = (miliseconds: number): void => {
    const date = Date.now()
    let currentDate = null
    do {
        currentDate = Date.now()
    } 
    while (currentDate - date < miliseconds)
}