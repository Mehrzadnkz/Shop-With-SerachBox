// main.js
import './assets/styles/global.css';
import { formatText, changeSearchBoxIcon, getUserData, Filter_Search } from './functions';

// Default
export const page = formatText(window.location.pathname.split('/').pop().split('.')[0]);

// Loading
window.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    const loadingElement = document.getElementById('loading');
    if (loadingElement) {
      loadingElement.classList.add('hidden');
    }
  }, 2500);

});

// Header
const headerHTML = `
  <div id="top-header" class="w-full h-1/2 flex justify-between items-center px-4">
    <div class="hidden max-sm:flex justify-center items-center">
      <span id="List-Button">☰</span>
      <span id="List-Button-Text" class="ml-2">Menu</span>
    </div>
    <div id="Logo" class="flex justify-center items-center flex-row gap-2 max-sm:hidden">
      <img src="logos/Site-Logo.PNG" alt="Shop Logo" class="size-12" />
      <h2>Shop Name</h2>
    </div>
    <div class="max-sm:hidden flex justify-center items-center flex-row gap-2 relative"> <!-- اضافه کردن کلاس relative -->
      <input type="search" name="Search Box" placeholder="Search Box" id="search-box-input" class="border rounded-md px-3 py-1">
      <button id="SearchBox-Button">
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
  <div id="bottom-header" class="w-full h-1/2 flex justify-around items-center border-b border-blue-900 shadow-md max-md:hidden">
    <a href="id" id="id">id</a>
    <a href="username" id="Username">Username</a>
    <a href="role" id="Role">Role</a>
    <a href="email" id="email">email</a>
  </div>`;

document.querySelector('header').innerHTML = headerHTML;

document.querySelector('main').innerHTML = `
    <div class="grid grid-cols-5 gap-3 p-5 max-xl:grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2" id="Users-List"></div>`;

document.getElementById('SearchBox-Button')?.addEventListener('click', Filter_Search);
document.getElementById('SearchBox-Button')?.addEventListener('click', changeSearchBoxIcon);

getUserData('#Users-List');
