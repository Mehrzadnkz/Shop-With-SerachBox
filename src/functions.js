import axios from 'axios';
import { Page } from "./main";

export function FormatText(Text) {
    return Text ? Text.toLowerCase().replace(/-/g, ' ').replace("'s", "'s") : '';
}

export function Change_SearchBox_Icon() {
    const gif = 'gifs/SearchBox-gif.GIF';
    const Logo = 'logos/SearchBox-Icon.PNG';
    const button_Icon = document.querySelector('#SearchBox-Icon img');

    if (button_Icon) {
        button_Icon.src = gif;
        button_Icon.classList.add('scale-[1.1]');

        setTimeout(() => {
            button_Icon.src = Logo;
            button_Icon.classList.remove('scale-[1.1]');
        }, 1250);
    }
}

// Get URL And Key
const URL = import.meta.env.VITE_Account_API_URL;
const KEY = import.meta.env.VITE_Moderator_KEY;

if (!URL || !KEY) {
    console.error("Missing URL Or Key");
}

const Create = axios.create({
    baseURL: `${URL}/api/users`,
    headers: {
        'Authorization': `Bearer ${KEY}`,
        'Content-Type': 'application/json'
    }
});

Create.interceptors.response.use(
    response => response,
    error => {
        console.error(error);
        return Promise.reject(error);
    }
);

export const getUserData = async (Element) => {
    const sort = Page;
    try {
        const response = await Create.get();
        const Data = response.data.data;

        Data.sort((a, b) => {
            if (sort === 'id') {
                return a.id - b.id;
            } else if (sort === 'username') {
                return a.username.localeCompare(b.username);
            } else if (sort === 'role') {
                return a.role.localeCompare(b.role);
            } else if (sort === 'mail') {
                return a.mail.localeCompare(b.mail);
            }
            return a.id - b.id; // Default sorting by id
        });
        const userList = document.querySelector(Element);
        userList.innerHTML = data.map(user => `
            <div id="user-${user.id}" class="border border-gray-300 p-2 rounded-md">
                <h3 class="font-bold">${user.username}</h3>
                <p>Email: ${user.email}</p>
                <p>Role: ${user.role}</p>
                <p>Active: ${user.active}</p>
            </div>`).join('');

        console.log('User data:', data);
    } catch (error) {
        console.error('Error in request:', error);
    }
};