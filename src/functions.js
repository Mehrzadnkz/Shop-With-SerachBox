import axios from 'axios';
import { page } from "./main";

export function formatText(text) {
    return text ? text.toLowerCase().replace(/-/g, ' ').replace("'s", "'s") : '';
}

export function changeSearchBoxIcon() {
    const gif = 'gifs/SearchBox-gif.GIF';
    const logo = 'logos/SearchBox-Icon.PNG';
    const buttonIcon = document.querySelector('#SearchBox-Button img');

    if (buttonIcon) {
        buttonIcon.src = gif;
        buttonIcon.classList.add('scale-[1.1]');

        setTimeout(() => {
            buttonIcon.src = logo;
            buttonIcon.classList.remove('scale-[1.1]');
        }, 1250);
    }
}

const URL = import.meta.env.VITE_Account_API_URL;
const KEY = import.meta.env.VITE_Moderator_KEY;

if (!URL || !KEY) {
    console.error("Missing URL Or Key");
}

const create = axios.create({
    baseURL: `${URL}/api/users`,
    headers: {
        'Authorization': `Bearer ${KEY}`,
        'Content-Type': 'application/json'
    }
});

create.interceptors.response.use(
    response => response,
    error => {
        console.error(error);
        return Promise.reject(error);
    }
);

export const getUserData = async (element) => {
    const sort = page;
    try {
        const response = await create.get();
        const data = response.data.data;

        data.sort((a, b) => {
            switch (sort) {
                case 'id':
                    return a.id - b.id;
                case 'username':
                    return a.username.localeCompare(b.username);
                case 'role':
                    return a.role.localeCompare(b.role);
                case 'email':
                    return a.email.localeCompare(b.email);
                default:
                    return a.id - b.id;
            }
        });

        const userList = document.querySelector(element);
        userList.innerHTML = data.map(user => `
            <div id="user-${user.id}" class="user-box border border-gray-300 p-4 rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-300">
                <div class="flex flex-col items-center">
                    <img src="https://img.icons8.com/ios-glyphs/50/user-male-circle.png" 
                         alt="${user.username}'s avatar" 
                         class="rounded-full w-12 h-12 mb-3">
                    <h3 class="font-bold text-lg">${user.username}</h3>
                    <div class="mt-2 text-sm text-gray-600 w-full">
                        <p class="truncate"><span class="font-medium">Email:</span> ${user.email}</p>
                        <p><span class="font-medium">Role:</span> ${user.role}</p>
                        <p><span class="font-medium">Created:</span> ${new Date(user.createdAt).toLocaleDateString()}</p>
                    </div>
                </div>
            </div>`).join('');
    } catch (error) {
        console.error('Error in request:', error);
        const userList = document.querySelector(element);
        userList.innerHTML = `
            <div class="col-span-full text-center py-10">
                <p class="text-red-500 font-medium">Error loading user data</p>
            </div>`;
    }
};

// Use Deep Seek [  My brain is not working On This Piece. :) ]
export function Filter_Search() {
    const searchInput = document.getElementById('search-box-input');
    if (!searchInput) return;

    const searchValue = searchInput.value.trim();
    if (!searchValue) {
        alert('Please enter a search term');
        return;
    }

    showFilterOptions(searchValue, searchInput);
}

function showFilterOptions(searchValue, searchInput) {
    const suggestedFilters = ['id', 'username', 'role', 'email'];
    const existingContainer = document.querySelector('.suggested-filters-container');

    if (existingContainer) {
        existingContainer.remove();
    }

    const suggestedContainer = document.createElement('div');
    suggestedContainer.className = `
        suggested-filters-container
        absolute z-50 mt-1 w-48 rounded-md bg-white shadow-lg
        border border-gray-200 py-1
    `;

    const searchBoxRect = searchInput.getBoundingClientRect();
    suggestedContainer.style.top = `${searchBoxRect.bottom + window.scrollY}px`;
    suggestedContainer.style.left = `${searchBoxRect.left + window.scrollX}px`;

    suggestedFilters.forEach(filter => {
        const filterButton = document.createElement('button');
        filterButton.className = `
            w-full text-left px-4 py-2 text-sm text-gray-700
            hover:bg-gray-100 hover:text-gray-900
        `;
        filterButton.textContent = filter.charAt(0).toUpperCase() + filter.slice(1);

        filterButton.addEventListener('click', (e) => {
            e.stopPropagation();
            handleFilterSelection(filter, searchValue);
        });

        suggestedContainer.appendChild(filterButton);
    });

    document.body.appendChild(suggestedContainer);

    setTimeout(() => {
        const clickHandler = (e) => {
            if (!suggestedContainer.contains(e.target) && e.target !== searchInput) {
                suggestedContainer.remove();
                document.removeEventListener('click', clickHandler);
            }
        };
        document.addEventListener('click', clickHandler);
    }, 100);
}

function handleFilterSelection(filterType, searchValue) {
    if (!filterType || !searchValue) {
        console.error("Filter type or search value is missing");
        return;
    }

    // Remove filter menu
    const filterMenu = document.querySelector('.suggested-filters-container');
    if (filterMenu) {
        filterMenu.remove();
    }

    // Create Site URL
    const basePath = '/search';
    const searchParams = new URLSearchParams();
    searchParams.set(filterType, searchValue);

    // Create Full URL
    const newUrl = `${basePath}/${searchParams.toString()}`;

    // Update URL
    window.history.pushState({}, '', newUrl);

    // Search Site
    performSearch(filterType, searchValue);
}

function updateUrlWithSearchParams(filterType, searchValue) {
    try {
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set(filterType, searchValue);

        const newUrl = window.location.pathname + '?' + searchParams.toString();

        window.history.pushState({}, '', newUrl);
    } catch (error) {
        console.error("Error updating URL:", error);
    }
}


async function performSearch(filterType, searchValue) {
    const userList = document.querySelector('#Users-List');
    if (!userList) return;

    userList.innerHTML = `
        <div class="col-span-full flex justify-center py-10">
            <div class="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    `;

    try {
        const response = await create.get();
        const allUsers = response.data.data;

        const filteredUsers = allUsers.filter(user => {
            const fieldValue = String(user[filterType]).toLowerCase();
            return fieldValue.includes(searchValue.toLowerCase());
        });

        // Display filtered users    And Write Me
        if (filteredUsers.length === 0) {
            userList.innerHTML = `
                <div class="col-span-full text-center py-10">
                    <p class="text-gray-500 font-medium">No users found matching your search</p>
                </div>
            `;
            return;
        }
        userList.innerHTML = filteredUsers.map(user => `
            <div id="user-${user.id}" class="user-box border border-gray-300 p-4 rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-300">
                <div class="flex flex-col items-center">
                    <img src="https://img.icons8.com/ios-glyphs/50/user-male-circle.png" 
                         alt="${user.username}'s avatar" 
                         class="rounded-full w-12 h-12 mb-3">
                    <h3 class="font-bold text-lg">${user.username}</h3>
                    <div class="mt-2 text-sm text-gray-600 w-full">
                        <p class="truncate"><span class="font-medium">Email:</span> ${user.email}</p>
                        <p><span class="font-medium">Role:</span> ${user.role}</p>
                        <p><span class="font-medium">Created:</span> ${new Date(user.createdAt).toLocaleDateString()}</p>
                    </div>
                </div>
            </div>
        `).join('');

    } catch (error) {
        console.error('Search error:', error);
        userList.innerHTML = `
            <div class="col-span-full text-center py-10">
                <p class="text-red-500 font-medium">Error performing search</p>
            </div>
        `;
    }
}