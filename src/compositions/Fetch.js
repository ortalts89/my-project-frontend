
const apiHost = '/api'

async function request(url, params, method = 'GET') {
    
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    if(params) {
        if(method !== 'GET') {
            options.body = JSON.stringify(params);
        }
    }

    const response = await fetch(apiHost + url, options, method);

    if(response.status !== 200) {
        return {errorCode: response.status}
    }

    const result = await response.json();

    return result;
}


function get(url, params) {
    return request(url,params);
}

function create(url, params) {
    return request(url, params, 'POST');
}
  
function update(url, params) {
    return request(url, params, 'PUT');
}
  
function remove(url, params) {
    return request(url, params, 'DELETE');
}

export default {
    get,
    create,
    update,
    remove
  };