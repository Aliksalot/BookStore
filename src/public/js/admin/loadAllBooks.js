
const noBookElement = () => {
    const p = document.createElement('p')
    p.textContent = 'There is no such book / There are no books'
    p.style.color = 'white'
    p.style.fontSize = 'large'
    p.style.textAlign = 'center'

    return p;
}

const loadAllBooks = async(books) => {

    if(books === undefined)
        books = await get('/home/getAllBooks')

    const bookNode = document.querySelector("[class=book]")
    const books_section = document.querySelector('[class=books]')
    
    books_section.innerHTML = ''

    if(books.length === 0){
        
        books_section.appendChild(noBookElement())
        bookNode.style.display = 'none'
        books_section.appendChild(bookNode)
        
        return
    }

    books.forEach(book => {
        const bookNodeClone = bookNode.cloneNode(true)

        const getPropertyByName = (name) => {
            return bookNodeClone.querySelector(`[name=${name}]`)
        }

        getPropertyByName('title').textContent = book.name
        getPropertyByName('image').src = (book.image === undefined ? "../images/book-stock-icon" : book.image)
        getPropertyByName('author').textContent = book.author
        getPropertyByName('genre').textContent = book.genre === undefined ? 'genre' : book.genre
        getPropertyByName('qty').textContent += book.quantity === undefined ? '0' : book.quantity
        getPropertyByName('price').textContent += book.price === undefined ? '0.00' : book.price
        getPropertyByName('edit-link').href = `/book/${book.name}`
        
        bookNodeClone.id = book.name 

        bookNodeClone.style.display = 'block'
        books_section.appendChild(bookNodeClone)
    })


}