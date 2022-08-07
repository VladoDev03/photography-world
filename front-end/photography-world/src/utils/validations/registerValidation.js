export function validateUsername(username) {
    const errors = {
        usernameLength: false
    }

    errors.usernameLength = username.length >= 3

    return errors
}

export function validatePassword(password) {
    const errors = {
        passwordLength: false,
        passwordUpper: false,
        passwordLower: false,
        passwordSymbol: false,
        passwordNumber: false
    }

    errors.passwordLength = validatePasswordLength(password)
    errors.passwordUpper = validatePasswordUpperCase(password)
    errors.passwordLower = validatePasswordLowerCase(password)
    errors.passwordSymbol = validatePasswordSymbol(password)
    errors.passwordNumber = validatePasswordNumber(password)

    return errors
}

export function validateConfirmPassword(password, confirmPassword) {
    const errors = {
        passwordsMatch: false
    }

    errors.passwordsMatch = password === confirmPassword

    return errors
}

function validatePasswordLength(password) {
    return password.length > 6
}

function validatePasswordUpperCase(password) {
    for (let i = 65; i <= 90; i++) {
        const letter = String.fromCharCode(i)

        if (password.includes(letter)) {
            return true
        }
    }

    return false
}

function validatePasswordLowerCase(password) {
    for (let i = 97; i <= 122; i++) {
        const letter = String.fromCharCode(i)

        if (password.includes(letter)) {
            return true
        }
    }

    return false
}

function validatePasswordSymbol(password) {
    let symbols = ['~', '`', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '-', '+', '=', '{', '[', '}', ']', '|', '\\', ':', ';', '"', '\'', '<', ',', '>', '.', '?', '/']

    for (let i = 0; i < symbols.length; i++) {
        if (password.includes(symbols[i])) {
            return true
        }
    }

    return false
}

function validatePasswordNumber(password) {
    let numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

    for (let i = 0; i < numbers.length; i++) {
        if (password.includes(numbers[i])) {
            return true
        }
    }

    return false
}