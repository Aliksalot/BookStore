const loadBook = async() => {
    const book_title = window.location.href.split('/').pop()
    const book = await get('/book/getBookData/' + book_title);

    
    console.log(book)

    const getById = (id) => {
        return document.getElementById(id)
    }

    getById('book-image').src = (book.image_name === undefined ? "../images/book-stock-icon" : `/book/book-icons/${book.image_name}`)
    getById('book-title').textContent = book.name
    getById('author').textContent += book.author
    getById('genre').textContent += book.genre
    getById('description').textContent = book.description
    getById('price').textContent += (book.price === undefined ? 0.00 : book.price)
    
}

loadBook()