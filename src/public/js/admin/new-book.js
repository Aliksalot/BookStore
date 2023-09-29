const newBook = async() => {


    const book = new FormData()

    book.append('name', document.getElementById('book-title').value);
    book.append('genre', document.getElementById('genre').value);
    book.append('author', document.getElementById('author').value);
    book.append('description', document.getElementById('description').value)
    book.append('qty', document.getElementById('qty').value)
    book.append('price', document.getElementById('price').value)

    const bookFile = document.getElementById('image-input').files[0]

    book.append('image', bookFile)
    book.append('image_name', book.get('name'))

    const xhr = new XMLHttpRequest()
    xhr.open('POST', '/admin/new-book-data')
    xhr.onload = () => {
        if(xhr.status === 200){
            window.location.href = '/admin'
        }
    }
    xhr.send(book)
}