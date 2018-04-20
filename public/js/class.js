

// class.js


class Gallery {
    constructor(name, images) { //constructor er opretter object
        this.name = name;       //this er ovject navn og efter punktummet er property navnet.
        this.images = images;
        this.pos = 0;
        this.getData();
    }
    //metoder kommer here
    getData() {
        let that = this;
        fetch('http://localhost:6060/billeder/')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                data.forEach((img) => {
                    that.images.push(new Image(img.id, img.titel, img.kategori, img.filnavn, img.dato, img.fotograf))
                });
                this.setEventHandlers();

            })
    }
    setEventHandlers() {//kalder det øverst i fetch
        let that = this;
        document.querySelector(`#${that.name} .oopgallery-image`).src = ".././img/" + this.getFirst();
        document.querySelector(`#${that.name} .oopgallery-image-number`).innerHTML = "1 / 7";
        

        document.querySelector(`#${this.name} .oopgallery-control-first`).addEventListener("click", function () {
            document.querySelector(`#${that.name} .oopgallery-image`).src = ".././img/" + that.getFirst();
            document.querySelector(`#${that.name} .oopgallery-image-number`).innerHTML = "1 / 7";
        })

        document.querySelector(`#${this.name} .oopgallery-control-last`).addEventListener("click", function () {
            document.querySelector(`#${that.name} .oopgallery-image`).src = ".././img/" + that.getLast();
            document.querySelector(`#${that.name} .oopgallery-image-number`).innerHTML = "7 / 7";
        })

        document.querySelector(`#${this.name} .oopgallery-control-next`).addEventListener("click", function () {
            document.querySelector(`#${that.name} .oopgallery-image`).src = ".././img/" + that.getNext();
            document.querySelector(`#${that.name} .oopgallery-image-number`).innerHTML = that.pos + 1 + " / 7";
        })

        document.querySelector(`#${this.name} .oopgallery-control-previous`).addEventListener("click", function () {
            document.querySelector(`#${that.name} .oopgallery-image`).src = ".././img/" + that.getPrev();
            document.querySelector(`#${that.name} .oopgallery-image-number`).innerHTML = that.pos + 1 + " / 7";

        })

    }

    getFirst() {//definere objecterne øverst
        this.pos = 0;
        return this.images[this.pos].filnavn; //retuneres billedets position
    }

    getLast() {//definere objecterne øverst
        this.pos = this.images.length - 1;
        return this.images[this.pos].filnavn;
    }

    getNext() {//definere objecterne øverst
        if (this.pos < this.images.length - 1) {
            this.pos++;
        } else {
            this.pos = 0;
        }
        return this.images[this.pos].filnavn;
    }

    getPrev() {//definere objecterne øverst
        if (this.pos > 0) {
            this.pos--;
        } else {
            this.pos = this.images.length - 1;
        }
        return this.images[this.pos].filnavn;
    }

}

class Image {
    constructor(id, titel, kategori, filnavn, dato, fotograf) {
        this.id = id;
        this.titel = titel;
        this.kategori = kategori;
        this.filnavn = filnavn;
        this.dato = dato;
        this.fotograf = fotograf;
    }
}

var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
  showDivs(slideIndex += n);
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("mySlides");
  if (n > x.length) {
      slideIndex = 1
    }    
  if (n < 1) {
      slideIndex = x.length
    }
  for (i = 0; i < x.length; i++) {
     x[i].style.display = "none";  
  }
  x[slideIndex-1].style.display = "block";  
}



























