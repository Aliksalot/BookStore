const load_header = () => {
    const header = document.getElementById('header-placeholder')
    const xhr = new XMLHttpRequest()
    xhr.open('GET','/header')
    xhr.setRequestHeader('Content-type', 'application/json')
    xhr.onload = () => {
        if(xhr.status == 200){           
            header.innerHTML = xhr.responseText
            enterForSearch()
        }
    }
    xhr.send()
    
}