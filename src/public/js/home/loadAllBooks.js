
const loadAllBooks = async(books) => {

    if(books === undefined){
        books = await get('/home/getAllBooks')
    }
    
    const bookNode = document.querySelector("[class=book-section]")
    const main = document.querySelector('[class=main]')
    
    main.innerHTML = ''

    if(books.length === 0){
    
        
        const noBookElement = () => {
            const p = document.createElement('p')
            p.textContent = 'There is no such book / There are no books'
            p.style.color = 'white'
            p.style.fontSize = 'large'
            p.style.textAlign = 'center'

            return p;
        }

        main.appendChild(noBookElement())
        bookNode.style.display = 'none'
        main.appendChild(bookNode)
        
        return
    }

    books.forEach(book => {
        const bookNodeClone = bookNode.cloneNode(true)
        const getByName = (name) => {
            return bookNodeClone.querySelector(`[name="${name}"]`)    
        }
        getByName('price').textContent = book.price == undefined ? '0.00' : book.price
        getByName('image').src = (book.image_name === undefined ? "../images/book-stock-icon" : `/book/book-icons/${book.image_name}`)
        getByName('title').textContent = book.name
        getByName('genre-author').textContent = book.genre + '        ' +  book.author
        getByName('book-link').href = `/book/${book.name}`
        bookNodeClone.style.display = 'block'
        main.appendChild(bookNodeClone)
    });
    
    const noBookElement = () => {
        const p = document.createElement('p')
        p.textContent = 'There is no such book / There are no books'
        p.style.color = 'white'
        p.style.fontSize = 'large'
        p.style.textAlign = 'center'

        return p;
    }

    console.log(books)

    if(main.innerHTML === ''){
        main.appendChild(noBookElement())
        bookNode.style.display = 'none'
        main.appendChild(bookNode)
    }


 

}