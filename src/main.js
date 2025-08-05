import './assets/styles/global.css';
import { FormatText, Change_SearchBox_Icon, getUserData } from './functions';

// تنظیمات اولیه
let number_of_product_in_page = 3;
let sort_by = 'price';
let Page = FormatText(window.location.pathname.split('/').pop().split('.')[0]);

// Loading
window.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    document.getElementById('loading')?.classList.add('hidden');
  }, 2500);
});
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
  <div id="bottom-header" class="w-full h-1/2 flex justify-around items-center border-b border-blue-900 max-md:hidden">
    <a href="id" id="id">id</a>
    <a href="username" id="Username">Username</a>
    <a href="role" id="Role">Role</a>
    <a href="active" id="Active">Active</a>
    <a href="mail" id="mail">mail</a>
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
      <input type="Number" id="Product_Number" placeholder="${number_of_product_in_page}" class="border border-gray-400 w-10 text-center rounded-md">
    </div>
    <div class="flex items-center flex-row gap-2">
      <button id="Sort-Button" class="border border-gray-400 rounded-md hover:bg-gray-200 px-1 py-0.5">Confirm</button>
    </div>

    </div>
    <div class="border border-green-600 grid grid-cols-${number_of_product_in_page} gap-3" id="Product_List"></div>`;

document.getElementById('SearchBox-Icon')?.addEventListener('click', Change_SearchBox_Icon);

getUserData()