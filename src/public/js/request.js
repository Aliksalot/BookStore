

const get = async(url, body) => {
    const response = await fetch(url, {method: 'GET', body: body})
    if(response.ok)
        return response.json();
    console.log('oopsies')
}

const post = async(url, body) => {
    const response = await fetch(url, {method: 'POST', body: JSON.stringify(body), headers: {'Content-Type': 'application/json'}});
    if(response.ok){
        return response.json();
    }
    console.log('oopsies')
}