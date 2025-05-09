let authuserid = localStorage.getItem("authuserid");
console.log(authuserid);

const overlay = document.querySelector("#overlay");
const closemodalbtn = document.querySelector("#closemodalbtn");

if (authuserid) {
    getSingleUser();
    getProducts();
}

async function getSingleUser() {
    let resp = await fetch(`http://localhost:3001/users/${authuserid}`);
    let user = await resp.json();
    console.log(user);
    displayLoginUser(user);
}

function displayLoginUser(user) {
    const headercontainer = document.querySelector("#headercontainer");

    headercontainer.innerHTML = `<h1 class='p-5 font-semibold text-4xl text-center capitalize bg-gray-100 mx-10 my-5 rounded-2xl'>Welcome ${user.username}</h1>`;
}

async function getProducts() {
    try {
        let resp = await fetch("https://fakestoreapi.in/api/products");
        let data = await resp.json();
        displayProducts(data);
    } catch (error) {
        console.log(" while fetching products", error);
        displayProducts({ status: "Failed" });
    }
}

function displayProducts(dbData) {
    console.log(dbData);
    const productsContainer = document.querySelector("#productsContainer");

    if (dbData.status === "Failed") {
        productsContainer.innerHTML = "<h1 class='text-red-500 text-center'>Failed to load products</h1>";
    } else {
        dbData.products.map(({ id, image, title, category, price, discount = 0 }) => {
            const cardDiv = document.createElement("div");
            cardDiv.setAttribute("id", "card");

            cardDiv.innerHTML = `
                <img src='${image}' alt='${title}' class='h-52' />
                <h1>${title.slice(0, 50)}...</h1>
                <p>${price} <span>${discount}%</span></p>
                <p>${category}</p>
                <button onclick='showSingleProduct(${id})' class='bg-blue-500 text-white px-4 py-2 rounded-lg'>Add to Cart</button>
            `;

            productsContainer.appendChild(cardDiv);
        });
    }
}

async function showSingleProduct(productID) {
    console.log("Hii", productID);
    const productsdetailContainer = document.querySelector("#productsdetailContainer");
    const overlay = document.querySelector("#overlay");
    overlay.style.display = "block";

    let resp = await fetch(`https://fakestoreapi.in/api/products/${productID}`);
    let product = await resp.json(); // Fixed: no destructuring

    console.log(product);

    productsdetailContainer.innerHTML = `
        <figure class='w-[40%]'>
            <img src='${product.image}' class='h-full w-full object-contain' />
        </figure>

        <div class='w-[60%] h-full'>
            <h1>${product.title.slice(0, 50)}...</h1>
            <p>${product.brand}</p>
            <p>${product.category}</p>
            <p>${product.description}</p>
            <p>${product.price}</p>
            <button>Buy Now</button>
        </div>
    `;
}


    let product  = productData;

    productsdetailContainer.innerHTML = `
        <figure class='w-[40%]'>
            <img src='${product.image}' class='h-full w-full object-contain' />
        </figure>

        <div class='w-[60%] h-full'>
            <h1>${product.title.slice(0, 50)}...</h1>
            <p>${product.brand}</p>
            <p>${product.category}</p>
            <p>${product.description}</p>
            <p>${product.price}</p>
            <button>Buy Now</button>
        </div>
    `;


closemodalbtn.addEventListener("click", () => {
    const overlay = document.querySelector("#overlay");
    overlay.style.display = "none";
});
