
const books_div = document.getElementById('books')
const finish_section = document.getElementById('finish-section')

const noCart = () => {
    console.log('Displaying no cart in session')
    books_div.style.display = 'none'
    finish_section.style.display = 'none'
}

const loadCart = async() => {
    const localCart = getCart()
    console.log('attempt to load cart ' + localCart)

    const book_section = document.getElementById('book-section')

    const no_cart_section = document.getElementById('no-cart')

    if(localCart === null){
        //shows no cart in session page
        noCart()
        return
    }

    const cartData = await get('/cart/get-cart', {id: localCart})

    if(cartData === undefined){
        //shows no cart in session page, happends when session has expired
        noCart()
        return        
    }
    


    cartData.books.forEach(book => {
        const book_copy = book_section.cloneNode()        
        getByClass = (_class) => {
            return book_copy.querySelector(`[class = ${_class}]`)
        }
        getByClass('book-title').textContent = book.name
        getByClass('genre-author-p').textContent = `Genre: ${book.genre}  Author: ${book.author}`
        getByClass('price-span').textContent = book.price
        getByClass('book-link').href = `/book/${book.name}`
        getByClass('book-image').src = (book.image_name === undefined ? "../images/book-stock-icon" : '/book/book-icons/' + book.image_name)
        
        books_div.appendChild(book_copy)
    })
    book_section.style.display = 'none'
    no_cart_section.style.display = 'none'    
}
