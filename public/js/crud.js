

//select der henter produkter fra db
function hentData2() {
    var dropdownvalue = document.querySelector('#selectpicker2').value;
    fetch('http://localhost:3000/arrangement/' + document.querySelector('#selectpicker2').value)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            var type = '';
            document.getElementById('content2').innerHTML = "";
            data.forEach(function (item) {
                document.getElementById('content2').innerHTML += `
            <article class="col-md-3">
                <div class="my-2" style="width: 18rem;">
                    <h5 class="d-flex justify-content-center">
                        ${item.ka}
                    </h5>
                    <img alt="Card image cap" class="card-img-top" src="img/${item.billede}">
                    <div class="card-body">

                        <h5 class="card-title">
                            ${item.navn}
                        </h5>

                        <p class="card-text">
                            <b>Premiere: </b>
                            ${item.dato}
                        </p>
                        <a href="/redigere/${item.arrangement_id}" class="btn btn-warning d-flex justify-content-center col-md-4 m-2" onclick="retData()">RET</a>
                        <a onclick="slet('${item.arrangement_id}');" class="btn btn-danger d-flex justify-content-center col-md-4 m-2">SLET</a>

                    </div>
                
                </div>
            </article>
                `;
            })
        })
}

//sletter en arrangement
function slet(id) {
    if (confirm('Vil du slette?')) {
        fetch('http://localhost:3000/slet/')
            .then(function (response) {
                return response.json();
                res.redirect("back")
            })
    }
}

//opretter en arrangement
function opret(id) {
    if (confirm('Vil du oprette?')) {
        fetch('http://localhost:3000/opret/')
            .then(function (response) {
                return response.json();
                res.redirect("back")
            })
    }
}



