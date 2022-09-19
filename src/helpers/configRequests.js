const getConfigRequest = (token) => {
    return {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    }
}

export default getConfigRequest;