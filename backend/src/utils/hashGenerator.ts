const hashGenerator = (hashLength: number) : string => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    let str: Array<string> = []

    for(let i = 0; i < hashLength; i++){
        str[i] = characters.charAt(Math.floor(Math.random() * characters.length))
    }

    return str.join('')
}

export default hashGenerator