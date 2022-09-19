const regexpass = password => {
    const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return PASSWORD_REGEX.test(password);
}

export default regexpass;