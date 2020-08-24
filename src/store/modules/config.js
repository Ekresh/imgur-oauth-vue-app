const getToken = () => {
    const token = localStorage.getItem('access_token');
    if (token) {
        return { headers: { Authorization: `Bearer ${token}` } };
    }
    return null;
}

export { getToken };