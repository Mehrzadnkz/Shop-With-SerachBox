import axios from 'axios';

export function FormatText(Text) {
    if (!Text) return '';
    return Text.toLowerCase().replace(/-/g, ' ').replace("'s", "'s");
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
    console.log("Missing URL Or Key");
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

// درخواست GET برای دریافت اطلاعات کاربر
export const getUserData = async () => {
    try {
        const response = await Create.get();
        const Data = JSON.stringify(response.data.data);
        const Fix_data = Data;
        console.log('اطلاعات کاربر:', Fix_data);
    } catch (error) {
        console.error('خطا در درخواست:', error);
    }
};