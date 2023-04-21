function showAllCity() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/city",
        success: function (city) {
            console.log(city);
            let cityHtml = "";
            for (let i = 0; i < city.length; i++) {
                cityHtml += `
                <tr>
                <td><button onclick="showOneCity(${city[i].id})">${city[i].name}</button></td>
                <td>${city[i].country}</td>
                <td><a href="#editEmployeeModal" onclick="formEdit(${city[i].id})" class="edit" data-toggle="modal">
                <i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
                <a  onclick="deleteCity(${city[i].id})" class="delete" data-toggle="modal">
                <i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
                </td>
                </tr>`;
            }
            document.getElementById("city-list").innerHTML = cityHtml;
        },
        error: function () {
            alert("Không thể hiển thị danh sách thành phố!");
        }
    });
}
showAllCity();

//create city
function save() {
    event.preventDefault();
    let name = $("#name").val();
    let country = $("#country").val();
    let area = $("#area").val();
    let population = $("#population").val();
    let gdp = $("#gdp").val();
    let description = $("#description").val();
    let newCity = {
        "name": name,
        "country": country,
        "area": area,
        "population": population,
        "gdp": gdp,
        "description": description
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        url: "http://localhost:8080/city/create",
        data: JSON.stringify(newCity),
        success: showAllCity,
        error: function () {
            alert("Không thể thêm thành phố!");
        }
    })
}

// delete city by id
function deleteCity(id) {
    event.preventDefault();
    $.ajax({
        type: "DELETE",
        url: "http://localhost:8080/city/" + id,
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
        window.showAllCity();
    }
}

// update city by id
function formEdit(id) {
    let url = "http://localhost:8080/city/" + id;
    $.get(url, function (data) {
        $('#id').val(data.id);
        $("#name-edit").val(data.name);
        $("#country-edit").val(data.country);
        $("#area-edit").val(data.area);
        $("#population-edit").val(data.population);
        $("#gdp-edit").val(data.gdp);
        $("#description-edit").val(data.description);
    });
}

function updateCity() {
    event.preventDefault();
    let id = $("#id").val();
    let name = $("#name-edit").val();
    let country = $("#country-edit").val();
    let area = $("#area-edit").val();
    let population = $("#population-edit").val();
    let gdp = $("#gdp-edit").val();
    let description = $("#description-edit").val();
    let newCity = {
        "name": name,
        "country": country,
        "area": area,
        "population": population,
        "gdp": gdp,
        "description": description
    }
    $.ajax({
        type: "PUT",
        url: "http://localhost:8080/city/" + id,
        dataType: "json",
        data: JSON.stringify(newCity),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        success: function () {
            $('#editEmployeeModal').modal('hide');
            showAllCity()
        },
        error: function () {
            alert('An error occurred while updating city data.');
        }
    });
}

function showOneCity(id) {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/city/" + id,
        success: function (city) {
            console.log(city);
            let cityHtml;
                cityHtml = `
                <tr>
                <td>${city.name}</td>
                <td>${city.country}</td>
                <td>${city.area}</td>
                <td>${city.population}</td>
                <td>${city.gdp}</td>
                <td>${city.description}</td>
                </td>
                </tr>`;
            document.getElementById("city-list").innerHTML = cityHtml;
        },
        error: function () {
            alert("Không thể hiển thị chi tiết thành phố!");
        }
    });
}




