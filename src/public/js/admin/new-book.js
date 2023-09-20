const newBook = async() => {

    const book = {}

    book.name = document.getElementById('book-title').value
    book.genre = document.getElementById('genre').value
    book.author = document.getElementById('author').value
    book.description = document.getElementById('description').value
    book.qty = document.getElementById('qty').value
    book.price = document.getElementById('price').value

    let allDefined = true

    Object.keys(book).forEach(prop => {
        if(prop === undefined){
            allDefined = false;
        }
    })

    console.log(book, allDefined)

    //request db
    await post('/admin/new-book-data', book)

    //redirect and show pop-up
    console.log('Rabotim')
    window.location.href = '/admin'
}