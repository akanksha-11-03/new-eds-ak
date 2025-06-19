import Swiper from "../carousel-block/swiper-bundle.min.js";
export default function decorate(block) {
    console.log("Carousel block detected");

    // Add unique class names to children
    Array.from(block.children).forEach((element, index) => {
        element.classList.add("inner-" + (index + 1));
        Array.from(element.children).forEach((child, subIndex) => {
            child.classList.add("inner-innerSub-" + (subIndex + 1));
        });
    });

    // Store the custom pagination content (e.g., image or text elements)
    const paginationTexts = [];

    // Convert block to Swiper container
    block.classList.add("swiper");

    // Create swiper-wrapper
    const swiperWrapper = document.createElement("div");
    swiperWrapper.classList.add("swiper-wrapper");

    Array.from(block.children).forEach((element) => {
        const paginationContent = element?.firstElementChild?.firstElementChild;
        if (paginationContent) paginationTexts.push(paginationContent);

        element.classList.add("swiper-slide");
        // document.querySelector('.inner-innerSub-1 h3').style.display = 'none'
        swiperWrapper.appendChild(element);
    });

    Array.from(swiperWrapper.querySelectorAll('.inner-innerSub-1 h3')).map((i, k) => i.remove())

    // Clear original block and append new structure
    block.innerHTML = "";
    block.appendChild(swiperWrapper);

    // Create navigation & pagination container
    const btnWrapper = document.createElement("div");
    btnWrapper.classList.add("btnWrapper");

    const divPagination = document.createElement("div");
    divPagination.classList.add("swiper-pagination");
    btnWrapper.appendChild(divPagination);

    const leftArrow = document.createElement("div");
    leftArrow.classList.add("swiper-button-prev");
    btnWrapper.appendChild(leftArrow);

    const rightArrow = document.createElement("div");
    rightArrow.classList.add("swiper-button-next");
    btnWrapper.appendChild(rightArrow);

    block.appendChild(btnWrapper);

    // Initialize Swiper
    Swiper(block, {
        loop: true,
        navigation: {
            nextEl: rightArrow,
            prevEl: leftArrow,
        },
        pagination: {
            el: divPagination,
            clickable: true,
            renderBullet: function (index, className) {
                const el = paginationTexts[index];
                if (!el) return `<span class="${className}">•</span>`; // fallback

                const clone = el.cloneNode(true); // safe clone
                clone.classList.add("swiper-pagination-bullet");
                return clone.outerHTML;
            },
        },
        freeMode: true,
        scrollOnFocus: true,
    });
}