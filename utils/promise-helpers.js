export const handleStatus = res => 
    res.ok ? res.json() : Promise.reject(res.statusText);
    //res está ok? se sim, transforme em json(), se não rejeite

export const log = param => {
    console.log(param);
    return param
}