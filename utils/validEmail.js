const validEmail = email => {
    let regex = /^\S+@\S+\.\S+$/
    return regex.test(email)
}

module.exports = validEmail