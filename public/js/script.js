
//Alle
function hentData() {
    var dropdownvalue = document.querySelector('#selectpicker').value;
        fetch('http://localhost:3000/arrangement/' + document.querySelector('#selectpicker').value)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                var type = '';
                document.getElementById('content').innerHTML = "";
                data.forEach(function (item) {
                    document.getElementById('content').innerHTML += `
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
                        <a href="#" class="btn btn-warning">BILLETTER</a>
                        <a href="#" class="btn btn-dark">LÆS MERE</a>

                    </div>
                
                </div>
            </article>
                `;
                })
            })
    
} 