const imagesPath = 'images/';
const decoList = {
    nyan: {
        name: 'Nyan cat',
        fileName: 'nyan_cat.png',
        imgStyles: {
            height: '40px',
        },
        progressBarStyles: {
            'background-image': 'linear-gradient(red, orange, yellow, green, blue, indigo, violet)',
        },
    },
};

function deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
}

function setElementStyles(element, styles) {
    Object.keys(styles).forEach(function (style) {
        element.style[style] = styles[style];
    });
}

const Deco = {
    init: function (movingSlider) {
        this.imageUrl = chrome.extension.getURL(imagesPath + this.fileName);
        this.customMovingSlider(movingSlider);
        this.customProgressBar();
    },
    customMovingSlider: function (movingSlider) {
        const img = document.createElement('img');
        img.src = this.imageUrl;
        movingSlider.append(img);

        setElementStyles(img, this.imgStyles);
    },
    customProgressBar: function () {
        setElementStyles(document.querySelector('.progress__progress .progress__line'), this.progressBarStyles);
    },
};

const YandexDecoMusic = {
    init: function () {
        this.initMovingSlider();
    },
    initMovingSlider: function () {
        this.movingSlider = document.createElement('div');
        this.movingSlider.classList.add('yandex-music-deco__moving-slider');

        const progressLineBranding = document.querySelector('.progress__line__branding');
        progressLineBranding.append(this.movingSlider);
    },
    applyDeco: function (decoObj) {
        const deco = Object.setPrototypeOf(deepCopy(decoObj), Deco);
        deco.init(this.movingSlider);
    },
};

YandexDecoMusic.init();
YandexDecoMusic.applyDeco(decoList.nyan);
