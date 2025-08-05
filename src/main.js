import './assets/styles/global.css';
import { FormatText, Change_SearchBox_Icon, getUserData } from './functions';

// Default
export let Page = FormatText(window.location.pathname.split('/').pop().split('.')[0]);

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
      <input type="search" name="Search Box" placeholder="Search Box" id="search-box-input" class="border rounded-md px-3 py-1">
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
  <div id="bottom-header" class="w-full h-1/2 flex justify-around items-center border-b border-blue-900 shadow-md max-md:hidden">
    <a href="id" id="id">id</a>
    <a href="username" id="Username">Username</a>
    <a href="role" id="Role">Role</a>
    <a href="active" id="Active">Active</a>
    <a href="mail" id="mail">mail</a>
  </div>`;

document.querySelector('main').innerHTML = `
    <div class="grid grid-cols-3 gap-3" id="Users-List"></div>`;

document.getElementById('SearchBox-Icon')?.addEventListener('click', Change_SearchBox_Icon);

getUserData('#Users-List');