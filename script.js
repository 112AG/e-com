let createBtn = document.querySelector(".create-product");
let formDiv = document.querySelector(".form");
let form = document.querySelector("form");
let closeBtn = document.querySelector(".cut-form");
let productDiv = document.querySelector('.products')

const productArr = [];
let updateIndex = null;

function ui () {
  productDiv.innerHTML ="";
    productArr.forEach(function (elem, index) {
        productDiv.innerHTML +=`
        <div class="product-card">
            <div class="img">
                <img src=${elem.image} alt="Car">
            </div>

            <div class="text">
                <h2>${elem.product}</h2>
                <p>
                    ${elem.description}
                </p>
                <p>₹${elem.price}</p>
            </div>

            <div class="btns">
                <button onclick="updateProduct('${elem.product}')" id="update">Update</button>
                <button onclick="deleteProduct(${index})" id="delete">Delete</button>
            </div>
        </div>
        `
    })
}
createBtn.addEventListener("click", function () {
  formDiv.style.display = "flex";
});
closeBtn.addEventListener("click", function () {
  formDiv.style.display = "none";
});

form.addEventListener("submit", function (event) {
  event.preventDefault();
  let product = event.target[0].value.trim() ;
  let description = event.target[1].value.trim();
  let price = event.target[2].value.trim()||'0000' ;
  let image = event.target[3].value || `https://picsum.photos/300/200?random=${Math.random()}`;

  if(product=== "" || description ==="" || price === ""){
    alert('Incomplete, Fill All')
    return;
  }
  let obj = {
    product,
    description,
    price,
    image,
  };

  if (updateIndex !== null) {
    productArr[updateIndex] = obj;
    updateIndex = null;
  } else {
    productArr.push(obj);
  }

  console.log(productArr);
  ui();
  formDiv.style.display = "none";
  form.reset();
    
});

function updateProduct(name){
    formDiv.style.display = "flex";
    let product = productArr.find((elem) => elem.product == name);
    updateIndex = productArr.findIndex((elem) => elem.product == name);
console.log(updateIndex);
    form[0].value = product.product;
    form[1].value = product.description;
    form[2].value = product.price;
    form[3].value = product.image;
    form[4].innerText = 'Update'
}

function deleteProduct(index) {
    productArr.splice(index, 1);
    ui();
}