import { useHistory } from 'react-router-dom'

const apiHost = '/api'

const useFetch = () => {
    const history = useHistory()

    return async (url, params, method = 'GET') => {

        const options = {
            method,
            headers: !(params instanceof FormData)? {
                'Content-Type': 'application/json'
            } : undefined
        };
    
        if(params) {
            if(method !== 'GET') {
                if(!(params instanceof FormData)){
                    params = JSON.stringify(params)
                }
                options.body = params;
            }
        }
    
        const response = await fetch(apiHost + url, options, method);
    
        if(response.status !== 200) {
            if(response.status === 401){
                history.push('/unauthorized')
                return;
            }
        }
    
        const result = await response.json();
        return result;
    }

}
export {useFetch};