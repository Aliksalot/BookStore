

const get = async(url, body) => {
    const response = await fetch(url, {method: 'GET', body: body})
    if(response.ok)
        return response.json();
    console.log('oopsies')
}

const post = async(url, body, contentHeader) => {
    const response = await fetch(url, {method: 'POST', body: body});
    if(response.ok){
        return response.json();
    }
    console.log('oopsies')
}