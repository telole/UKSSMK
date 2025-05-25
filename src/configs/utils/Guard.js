export function isAuthenticated() {
    const token = localStorage.getItem('token')
    console.log(token)
    return !!token
}