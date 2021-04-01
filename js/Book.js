import Api from './Api.js'

class Book {

    constructor() {
        //variables de book
        this.title = document.createElement("h2");
        this.author = document.createElement("h3");
        this.description = document.createElement("article");
        this.cover = document.createElement("img");
        //this.ranking = document.createElement("div");
    }

    createBook(parent, json) { 

        let book = document.createElement("section");
        book.className = "book-element";
    
        //console.log(json);

        if (typeof json !== 'undefined') {

            book.addEventListener("click", 
                event => {
                    //console.log('http://localhost:8080/api-library/php/api.php?book_action=get_book&book_ID='+json.ID)
                    //fetch('http://localhost/api-library/php/api.php?book_action=set_book&book_ID='+json.ID).

                    let url = new URL('http://localhost:8080/api-library/php/api.php?book_action=set_book&book_ID='+json.ID)
                    url.port = 80

                    fetch(url).
                    then(res => res.json()). 
                    then( 
                        data => {
                            //location.href = 'http://localhost/api-library/viewBook.html'

                            let url = new URL('http://localhost:8080/api-library/viewBook.html')
                            url.port = 80
                            location.href = url
                        }
                    )

                }
            )

            this.title.innerHTML = json.title;
            this.author.innerHTML = json.author;
            this.description.innerHTML = json.content_short
            this.cover.src = json.cover;

            let data = document.createElement("section");

            data.appendChild(this.title);
            data.appendChild(this.author);
            data.appendChild(this.description);

            book.appendChild(this.cover);
            book.appendChild(data);

        } else {
            console.log("No se encontró formato json");
        }


        if (typeof parent !== 'undefined') {
            let parent_ = document.getElementById(parent);

            if (parent_ != null) {
                parent_.appendChild(book);
            } else {
                console.log("La sección anexada no existe");
            }
        } else {
            console.log("No se recibió una sección para el libro");
        }
    }

    bookUser(parent, book_ID) {
        let book = document.createElement("section");
        book.className = "book-element-user";

        let ID;

        if (typeof book !== 'undefined') {

            let api = new Api();
            api.getBook(book_ID);
            let url = api.getUrl();
            fetch(url).
                then(res => res.json()).
                then(data => {

                    let bookData = data[0];
                    this.cover.src = bookData.cover;
                    this.title.innerHTML = bookData.title;
                    ID = bookData.ID;

                }).
                catch(error => console.log(error));

            book.addEventListener("click",
                event => {
                    let url = new URL('http://localhost:8080/api-library/php/api.php?book_action=set_book&book_ID=' + ID)
                    url.port = 80
                    location.href = url

                    //fetch('http://localhost/api-library/php/api.php?book_action=set_book&book_ID='+ ID).
                    fetch(url).
                        then(res => res.json()).
                        then(
                            data => {
                                //location.href = 'http://localhost/api-library/viewBook.html'
                                let url = new URL('http://localhost:8080/api-library/viewBook.html')
                                url.port = 80
                                location.href = url
                            }
                        )
                }
            )


            book.appendChild(this.cover);
            book.appendChild(this.title);
            //book.appendChild(data);

        } else {

            console.log("Variable vacia");
        }


        if (typeof parent !== 'undefined') {
            let parent_ = document.getElementById(parent);

            if (parent_ != null) {
                parent_.appendChild(book);

            } else {

                console.log("La sección anexada no existe");
            }

        } else {

            console.log("No se recibió una sección para el libro");
        }
        

    }

}

export default Book;