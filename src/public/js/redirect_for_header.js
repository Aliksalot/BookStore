
const redirect_to_cart = () => {
    window.location.href = '/cart'
}

const redirect_to_login = () => {
    window.location.href = '/login'
}

const enterForSearch = () => {
     document.getElementById('search').addEventListener('keypress', (event) => {
        if(event.key === 'Enter'){
            searchForTitle()
        }
    })
}



