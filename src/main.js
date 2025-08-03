import './assets/styles/global.css'

window.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    document.getElementById('loading').classList.add('hidden');
  }, 2500);
})
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
      <div class="max-sm:hidden">
        <span class="flex justify-center items-center flex-row gap-3">
          <input type="search" name="Search Box" placeholder="Search Box" id="search-box-input"
            class="border rounded-md px-3 py-1">
          <button id="SearchBox-Icon">
            <img src="logos/SearchBox-Icon.PNG" alt="Search Box Logo" class="size-8" />
          </button>
        </span>
      </div>
      <div class="flex items-center flex-row gap-3">
        <a class="hidden max-sm:flex"><img src="logos/SearchBox-Icon.PNG" alt="Search" class="max-sm:size-4" /></a>
        <a href="Account"><img src="logos/Account.PNG" alt="Account" class="size-6 max-sm:size-4" /></a>
        <a href="Home"><img src="logos/Home.PNG" alt="Home" class="size-6 max-sm:size-4" /></a>
        <a href="Cart"><img src="logos/Cart.PNG" alt="Cart" class="size-6 max-sm:size-4" /></a>
      </div>
    </div>
    <div id="bottom-header" class="border-t w-full h-1/2 flex justify-around items-center">
        <a href="Clothes" id="Clothes" class="bg-cyan-400 px-3.5 py-1.5 rounded-lg hover:bg-cyan-500 cursor-pointer">Clothes</a>
        <a href="Men-Clothes" id="Men Clothes" class="bg-cyan-400 px-3.5 py-1.5 rounded-lg hover:bg-cyan-500 cursor-pointer">Men's Clothes</a>
        <a href="Women-Clothes" id="Women Clothes" class="bg-cyan-400 px-3.5 py-1.5 rounded-lg hover:bg-cyan-500 cursor-pointer">Women's Clothes</a>
        <a href="Jewelery" id="Jewelery" class="bg-cyan-400 px-3.5 py-1.5 rounded-lg hover:bg-cyan-500 cursor-pointer">Jewelery</a>
        <a href="Electronic" id="Electronics" class="bg-cyan-400 px-3.5 py-1.5 rounded-lg hover:bg-cyan-500 cursor-pointer">Electronics</a>
    </div>`;

function SearchBox_Icon() {
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
    }, 1000);
  }
}
document.getElementById('SearchBox-Icon').addEventListener('click', SearchBox_Icon)
