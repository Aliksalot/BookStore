const searchForTitle = async() => {
    const searchBar = document.getElementById('search');
    let query = searchBar.value

    if (searchBar.value === undefined) return;

    query = query.trim();
    
    if(query === '*'){
        loadAllBooks()
        searchBar.value = ''
        return;
    }

    const books = await get(`/book/getBookData/${query}`);

    console.log(books)
    
    loadAllBooks(Object.keys(books).length === 0 ? [] : [books])

    searchBar.value = ''

}