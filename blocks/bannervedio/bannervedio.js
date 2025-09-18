import Swiper from "./swiper-bundle.min.js";

function createSwiper(block) {
  // Only wrap if not already Swiper markup
  if (!block.classList.contains('swiper')) {
    const rows = Array.from(block.children);
    const swiperWrapper = document.createElement('div');
    swiperWrapper.classList.add('swiper-wrapper');
    rows.forEach((row) => {
      row.classList.add('swiper-slide');
      swiperWrapper.append(row);
    });
    block.append(swiperWrapper);
  }
}
