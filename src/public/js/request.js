

const get = async(type, url, body) => {
    const response = await fetch(url, {method: type, body: body})
    if(response.ok)
        return response.json();
    console.log('oopsies')
}

const post = (type, url, body, contentHeader) => {

}