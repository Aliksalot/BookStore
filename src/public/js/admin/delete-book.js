const deleteBook = async(button) => {

    const bookDiv = button.parentElement
    const book_title = bookDiv.querySelector("[class=title]").textContent

    console.log(book_title)

    await post('/admin/delete-book', {title: book_title})

    loadAllBooks()
}