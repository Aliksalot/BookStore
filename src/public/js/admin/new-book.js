const newBook = async() => {


    const formData = new FormData()

    const book = {}

    book.name = document.getElementById('book-title').value
    book.genre = document.getElementById('genre').value
    book.author = document.getElementById('author').value
    book.description = document.getElementById('description').value
    book.qty = document.getElementById('qty').value
    book.price = document.getElementById('price').value

    const bookFile = document.getElementById('image-input').files[0]

    formData.append('image', bookFile)
    formData.append('book', book)
    formData.append('title', book.name)

    let allDefined = true

    Object.keys(book).forEach(prop => {
        if(prop === undefined){
            allDefined = false;
        }
    })

    //if(!allDefined) return

    console.log(formData, allDefined)

    //request db
    //await post('/admin/new-book-data', formData)

    //await fetch('/admin/new-book-data', {method: 'POST', body: formData})


    const xhr = new XMLHttpRequest()
    xhr.open('POST', '/admin/new-book-data')
    xhr.onload = () => {
        if(xhr.status === 200){
            console.log('rabotim')
        }
    }

    xhr.send(formData)

    //redirect and show pop-up
    console.log('Rabotim')
    //window.location.href = '/admin'
}