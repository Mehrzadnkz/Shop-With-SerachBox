import './assets/styles/global.css';
import axios from 'axios';

// Locading
window.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    document.getElementById('loading').classList.add('hidden');
  }, 2500);
})

// Header
document.querySelector('header').innerHTML = `
    <div id="top-header" class="w-full h-1/2 flex justify-between items-center px-4">
      <div class="hidden max-sm:flex justify-center items-center">
        <span id="List-Button">☰</span>
        <span id="List-Button-Text" class="ml-2">Menu</span>
      </div>
      <div id="Logo" class="flex justify-center items-center flex-row gap-2 max-sm:hidden">
        <img src="logos/Site-Logo.PNG" alt="Shop Logo" class="size-12" />
        <h2>Shop Name</h2>
      </div>
      <div class="max-sm:hidden flex justify-center items-center flex-row gap-2">
        <input type="search" name="Search Box" placeholder="Search Box" id="search-box-input"
          class="border rounded-md px-3 py-1">
        <button id="SearchBox-Icon">
          <img src="logos/SearchBox-Icon.PNG" alt="Search Box Logo" class="size-7" />
        </button>
      </div>
      <div class="flex items-center flex-row gap-3">
        <a class="hidden max-sm:flex"><img src="logos/SearchBox-Icon.PNG" alt="Search" class="max-sm:size-4" /></a>
        <a href="Account"><img src="logos/Account.PNG" alt="Account" class="size-6 max-sm:size-4" /></a>
        <a href="Home"><img src="logos/Home.PNG" alt="Home" class="size-6 max-sm:size-4" /></a>
        <a href="Cart"><img src="logos/Cart.PNG" alt="Cart" class="size-6 max-sm:size-4" /></a>
      </div>
    </div>
    <div id="bottom-header" class="w-full h-1/2 flex justify-around items-center border-b border-blue-900">
        <a href="Clothes" id="Clothes" class="bg-cyan-400 px-3.5 py-1.5 rounded-lg hover:bg-cyan-500 cursor-pointer">Clothes</a>
        <a href="Men's-Clothing" id="Men Clothes" class="bg-cyan-400 px-3.5 py-1.5 rounded-lg hover:bg-cyan-500 cursor-pointer">Men's Clothes</a>
        <a href="Women's-Clothes" id="Women Clothes" class="bg-cyan-400 px-3.5 py-1.5 rounded-lg hover:bg-cyan-500 cursor-pointer">Women's Clothes</a>
        <a href="Jewelery" id="Jewelery" class="bg-cyan-400 px-3.5 py-1.5 rounded-lg hover:bg-cyan-500 cursor-pointer">Jewelery</a>
        <a href="Electronic" id="Electronics" class="bg-cyan-400 px-3.5 py-1.5 rounded-lg hover:bg-cyan-500 cursor-pointer">Electronics</a>
    </div>`;

document.querySelector('main').innerHTML = `
<div class="h-10 flex items-center flex-row justify-evenly">
  <div class="flex items-center flex-row gap-2">
    <span>Sort By : </span>
    <select id="Sorted" name="Sort" class="border border-gray-400 py-0.5 px-1 rounded-md">
      <option value="price">Sort by Price</option>
      <option value="rate">Sort by Rate</option>
      <option value="count">Sort by Count</option>
    </select>
  </div>
  <div class="flex items-center flex-row gap-2 max-sm:hidden">
    <span>Number Of Product In Page: </span>
    <input type="Number" id="Product_Number" placeholder="0" class="border border-gray-400 w-10 text-center rounded-md">
  </div>
  <div class="flex items-center flex-row gap-2">
    <button id="Sort-Button" class="border border-gray-400 rounded-md hover:bg-gray-200 px-1 py-0.5">Confirm</button>
  </div>
</div>
<div class="border border-green-600" id="Product_List"></div>`;
const Sort = document.getElementById('Sorted')
const Sort_Selected = Sort.options[Sort.selectedIndex].value
console.log(Sort_Selected);

function Change_SearchBox_Icon() {
  const gif = 'gifs/SearchBox-gif.GIF'
  const Logo = 'logos/SearchBox-Icon.PNG'
  const button_Icon = document.querySelector('#SearchBox-Icon img')

  if (button_Icon && gif && Logo) {
    // Click The Button And Change Logo
    button_Icon.src = gif;
    button_Icon.classList.add('scale-[1.1]');

    // Set Logo To Defualt After 5s
    setTimeout(() => {
      button_Icon.src = Logo;
      button_Icon.classList.remove('scale-[1.1]');
    }, 1250);
  }
}
// If Clicked Button Start Function Change_SearchBox_Icon
document.getElementById('SearchBox-Icon').addEventListener('click', Change_SearchBox_Icon)

function Show_Products(Element) {
  const API_URL = import.meta.env.VITE_Product_API_URL;
  axios.get(API_URL, {

  })

    .then(response => {
      const Products = response.data.map(product => `
      <div class="border border-amber-500 p-2 my-2">
      <img src="${product.image}" alt="${product.title}" class="size-12" />
      <!-- <h1>ID : ${product.id}</h1> -->
      <h1>Title : ${product.title}</h1>
      <h2>Price : ${product.price}</h2>
      <h3 class="w-auto">Description : ${product.description}</h3>
      <!-- <h4>Category : ${product.category}</h4> -->
      </div>
    `);

      console.log(response.data);
      document.querySelector(Element).innerHTML = `${Products.join('')}`;
    })
    .catch(error => {
      console.log(error);
    });
}
Show_Products('#Product_List');