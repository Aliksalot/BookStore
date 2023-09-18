const loadAllBooks = async(books) => {

    if(books === undefined){
        books = await get('/home/getAllBooks')
    }
    
    const bookNode = document.querySelector("[class=book-section]")
    const main = document.querySelector('[class=main]')
    

    books.forEach(book => {
        const bookNodeClone = bookNode.cloneNode(true)
        const getByName = (name) => {
            return bookNodeClone.querySelector(`[name="${name}"]`)    
        }
        getByName('price').textContent = book.price == undefined ? '0.00' : book.price
        getByName('image').src = (book.image === undefined ? "../images/book-stock-icon" : book.image)
        getByName('title').textContent = book.name
        getByName('genre-author').textContent = book.genre + '        ' +  book.author
        getByName('book-link').href = `/book/${book.name}`
        bookNodeClone.style.display = 'block'
        main.appendChild(bookNodeClone)
    });
     
}