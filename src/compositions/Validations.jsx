export function validateUsername(event) {
    if(event.target.value.length === 0){
        return false;
    }else {
        return true;
    }
}

export function validatePassword(event) {
    if(event.target.value.length < 5){
        return false;
    }
    else{
        return true;
    }
}

export function validateEmail(email) {
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const re = new RegExp(pattern.source)
    return re.test(String(email).toLowerCase());
}