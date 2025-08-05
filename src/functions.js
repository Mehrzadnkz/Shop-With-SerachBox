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
