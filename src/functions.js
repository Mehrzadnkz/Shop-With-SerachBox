import axios from 'axios';
import { number_of_product_in_page, sort_by, Page } from './main'

export function FormatText(Text) {
    if (!Text) return '';
    return Text.toLowerCase().replace(/-/g, ' ').replace("'s", "'s");
}
function reduceText(text) {
    const words = text.split(' ');
    const reducedWords = words.slice(0, 5);
    return reducedWords.join(' ') + (words.length > 5 ? '' : '');
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

export function Change_Product_Number_In_Page(value) {
    const Number_Of_Products = parseInt(value);
    const Products_div = document.getElementById('Product_List');

    if (Number_Of_Products > 0 && Products_div) {
        // حذف کلاس‌های قبلی With GPT
        Products_div.classList.forEach(className => {
            if (className.startsWith('grid-cols-')) {
                Products_div.classList.remove(className);
            }
        });

        // اضافه کردن کلاس جدید With GPT And Me
        Products_div.classList.add(`grid-cols-${Number_Of_Products}`);

        Show_Products('#Product_List', Page)
    }
}

export async function Show_Products(Element, Page) {
    try {
        const API_URL = import.meta.env.VITE_Product_API_URL || 'https://fakestoreapi.com/products';
        const response = await axios.get(API_URL);

        const filteredProducts = response.data.filter(product => {
            if (Page === 'clothes') {
                return product.category === "men's clothing" || product.category === "women's clothing";
            } else if (Page === 'home') {
                return true;
            } else {
                return product.category === Page;
            }
        });

        const Products = filteredProducts.map(product => `
            <div class="border border-amber-500 p-2 my-2 flex justify-center items-center flex-col w-auto gap-3">
                <img src="${product.image}" alt="${product.title}" class="size-40" />
                <h1>${reduceText(product.title)}</h1>
                <h2>Price : $${product.price}</h2>
                <!-- <h3 class="">Description: ${reduceText(product.description)}</h3> -->
                <div class="gap-5">
                    <button id="Minus-${product.id}" class="bg-red-500 text-white py-1.5 px-4 rounded-md">-</button>
                    <span>0</span>
                    <button id="Plus-${product.id}" class="bg-green-500 text-white py-1.5 px-4 rounded-md">+</button>
                </div>
            </div>
        `).join('');

        const container = document.querySelector(Element);
        if (container) {
            container.innerHTML = Products || '<p>No products found</p>';
            container.classList.add(`grid-cols-${number_of_product_in_page}`);
        }
    } catch (error) {
        console.error('Error fetching products:', error);
        const container = document.querySelector(Element);
        if (container) {
            container.innerHTML = '<p>Error loading products</p>';
        }
    }
}