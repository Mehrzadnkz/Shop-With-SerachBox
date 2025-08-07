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
            <span id="List-Button" class="text-2xl cursor-pointer">☰</span>
            <span id="List-Button-Text" class="ml-2 text-sm">Menu</span>
        </div>
        <div id="Logo" class="flex justify-center items-center flex-row gap-2 max-sm:hidden">
            <img src="logos/Site-Logo.PNG" alt="Shop Logo" class="size-12" />
            <h2 class="text-xl font-bold">Shop Name</h2>
        </div>
        <div class="max-sm:hidden flex justify-center items-center flex-row gap-2 relative">
            <input type="search" 
                   id="search-box-input" 
                   placeholder="Search users..." 
                   class="border rounded-md px-3 py-1.5 w-64 focus:outline-none focus:ring-2 focus:ring-blue-300">
            <button id="SearchBox-Button" class="focus:outline-none">
                <img src="logos/SearchBox-Icon.PNG" alt="Search" class="size-7 hover:opacity-80 transition-opacity" />
            </button>
        </div>
        <div class="flex items-center flex-row gap-3">
            <a class="hidden max-sm:flex"><img src="logos/SearchBox-Icon.PNG" alt="Search" class="max-sm:size-4" /></a>
            <a href="Account"><img src="logos/Account.PNG" alt="Account" class="size-6 max-sm:size-4 hover:opacity-80" /></a>
            <a href="Home"><img src="logos/Home.PNG" alt="Home" class="size-6 max-sm:size-4 hover:opacity-80" /></a>
            <a href="Cart"><img src="logos/Cart.PNG" alt="Cart" class="size-6 max-sm:size-4 hover:opacity-80" /></a>
        </div>
    </div>
    <div id="bottom-header" class="w-full h-1/2 flex justify-around items-center border-b border-blue-900 shadow-md max-md:hidden px-4">
        <a href="id" class="px-3 py-1.5 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-colors">ID</a>
        <a href="username" class="px-3 py-1.5 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-colors">Username</a>
        <a href="role" class="px-3 py-1.5 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-colors">Role</a>
        <a href="email" class="px-3 py-1.5 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-colors">Email</a>
    </div>`;

document.querySelector('header').innerHTML = headerHTML;

document.querySelector('main').innerHTML = `
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 p-6" id="Users-List"></div>`;

// Event listeners
const searchButton = document.getElementById('SearchBox-Button');
const searchInput = document.getElementById('search-box-input');

if (searchButton && searchInput) {
  searchButton.addEventListener('click', () => {
    changeSearchBoxIcon();
    Filter_Search();
  });

  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      changeSearchBoxIcon();
      Filter_Search();
    }
  });
}

// Initial data load
getUserData('#Users-List');

// Check for URL search parameters on load
window.addEventListener('load', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const searchParams = ['id', 'username', 'role', 'email', 'createdAt'];

  for (const param of searchParams) {
    if (urlParams.has(param)) {
      const value = urlParams.get(param);
      const searchInput = document.getElementById('search-box-input');
      if (searchInput) {
        searchInput.value = value;
        performSearch(param, value);
      }
      break;
    }
  }
});