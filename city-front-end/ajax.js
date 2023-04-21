function showAllBook() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/books",
        success: function (books) {
            // console.log(books);
            let booksHtml = "";
            for (let i = 0; i < books.length; i++) {
                booksHtml += `
                <tr>
                <td>${books[i].code}</td>
                <td>${books[i].name}</td>
                <td>${books[i].author}</td>
                <td>${books[i].price}</td>
                <td><a href="#editEmployeeModal" onclick="formEdit(${books[i].id})" class="edit" data-toggle="modal">
                <i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
                <a  onclick="deleteBook(${books[i].id})" class="delete" data-toggle="modal">
                <i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a></td>
                </tr>`;
            }
            document.getElementById("book-list").innerHTML = booksHtml;
        },
        error: function () {
            alert("Không thể hiển thị danh sách sách!");
        }
    });
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/books/total-price",
        success: function (totalPrice) {
            document.getElementById("total-price").innerHTML = totalPrice;
        }
    })
}
showAllBook();

//create
function save() {
    event.preventDefault();
    let code = $("#code").val();
    let name = $("#name").val();
    let author = $("#author").val();
    let price = $("#price").val();
    let newBook = {
        code: code,
        name: name,
        author: author,
        price: price
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        url: "http://localhost:8080/books",
        data: JSON.stringify(newBook),
        success: showAllBook,
        error: function () {
            alert("Không thể thêm sách mới!");
        }
    })
}

// delete book by id
function deleteBook(id) {
    event.preventDefault();
    $.ajax({
        type: "DELETE",
        url: "http://localhost:8080/books/" + id,
        dataType: "json",
        success: function () {
            deleteConfirmation()
        },
        error: function () {
            alert("Không xóa được")
        }
    });
}

function deleteConfirmation() {
    if (confirm("Bạn có chắc chắn muốn xóa không?")) {
        window.showAllBook();
    }
}

// update book by id
function formEdit(id) {
    let url = "http://localhost:8080/books/" + id;
    $.get(url, function (data) {
        $('#id').val(data.id);
        $('#code1').val(data.code);
        $('#name1').val(data.name);
        $('#author1').val(data.author);
        $('#price1').val(data.price);
    });
}

function updateBook() {
    event.preventDefault();
    let id = $("#id").val();
    let code = $("#code1").val();
    let name = $("#name1").val();
    let author = $("#author1").val();
    let price = $("#price1").val();
    let newBook = {
        code: code,
        name: name,
        author: author,
        price: price
    }
    $.ajax({
        type: "PUT",
        url: "http://localhost:8080/books/" + id,
        dataType: "json",
        data: JSON.stringify(newBook),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        success: function () {
            // Hide edit form
            $('#editEmployeeModal').modal('hide');
            showAllBook()
        },
        error: function () {
            alert('An error occurred while updating book data.');
        }
    });
}

// search
function searchBooks() {
    let name = $("#name-search").val().trim().toLowerCase();
    let author = $("#author-search").val().trim().toLowerCase();
    let minPrice = $("#minPrice-search").val();
    let maxPrice = $("#maxPrice-search").val();
    let resultSearch = {
        name: name,
        author: author,
        minPrice: minPrice,
        maxPrice: maxPrice
    }
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/books/search?" + encodeURIParams(resultSearch),
        success: function (books) {
            // console.log(books);
            displaySearchBooks(books)
        }
    })
}

function encodeURIParams(data) {
    return Object.keys(data).map(function (key) {
        return encodeURIComponent(key) + "=" + encodeURIComponent(data[key]);
    }).join("&");
}

function displaySearchBooks(books) {
    let search = "";
    for (let i = 0; i < books.length; i++) {
        search += `
                <tr>
                <td>${books[i].code}</td>
                <td>${books[i].name}</td>
                <td>${books[i].author}</td>
                <td>${books[i].price}</td>
                <td><a href="#editEmployeeModal" onclick="formEdit(${books[i].id})" class="edit" data-toggle="modal">
                <i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
                <a  onclick="deleteBook(${books[i].id})" class="delete" data-toggle="modal">
                <i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a></td>
                </tr>`;
    }
    document.getElementById("book-list").innerHTML = search;
}





