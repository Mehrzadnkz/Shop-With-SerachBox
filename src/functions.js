// functions.js
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

// Get URL And Key
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
                    return a.id - b.id; // Default sorting by id
            }
        });

        const userList = document.querySelector(element);
        userList.innerHTML = data.map(user => `
            <div id="user-${user.id}" class="user-box border border-gray-300 p-2 rounded-md w-auto bg-sky-100 hover:bg-sky-200">
            <div class="flex justify-center">
            <img src=https://img.icons8.com/ios-glyphs/50/user-male-circle.png alt="${user.username}'s avatar" class="rounded-full w-12 h-12">
            </div>
                <h3 class="font-bold">${user.username}</h3>
                <p>Email : ${user.email}</p>
                <p>Role : ${user.role}</p>
                <p>CreatedAt : ${user.createdAt}</p>
            </div>`).join('');
        console.log('User data:', data);
    } catch (error) {
        console.error('Error in request:', error);
    }
};

export function Filter_Search() {
    // Required Variables
    const searchInput = document.getElementById('search-box-input').value;
    const Filter_By = null;

    if (!searchInput) {
        console.log('Search Box Input Is Empty');
        return;
    }
    const SuggestedFilters = ['id', 'username', 'role', 'email'];
    const suggestedContainer = document.createElement('div');
    suggestedContainer.classList.add('suggested-filters');

    SuggestedFilters.forEach(filter => {
        const filterElement = document.createElement('div');
        filterElement.classList.add('filter-item');
        filterElement.textContent = filter;
        suggestedContainer.appendChild(filterElement);
    });

    document.body.appendChild(suggestedContainer);

    // Give Client Suggestion Filter Clicked
    suggestedContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('filter-item')) {
            const selectedFilter = event.target.textContent;
            Filter_By = selectedFilter;
            suggestedContainer.remove();
        } // With GPT

        if (Filter_By == "id") {
            window.location.href = `search?id=${searchInput}`

        }
        else if (Filter_By == "username") {
            window.location.href = `search?username=${searchInput}`

        }
        else if (Filter_By == "role") {
            window.location.href = `search?role=${searchInput}`

        }
        else if (Filter_By == "email") {
            window.location.href = `search?email=${searchInput}`
        }

        const User_Data = document.querySelectorAll('.user-box');
        User_Data.map(user => {
            if (Filter_By == "id") {

            }
            else if (Filter_By == "username") {

            }
            else if (Filter_By == "role") {

            }
            else if (Filter_By == "email") {

            }
        });
    });
}