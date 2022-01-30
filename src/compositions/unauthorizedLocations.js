export function isLocationAuthorized(location) {
    if(location === '/login' ||
    location === '/reset-password' ||
    location === '/signUp' ||
    location === '/unauthorized') {
        return false;
    } else {
        return true;
    }
}