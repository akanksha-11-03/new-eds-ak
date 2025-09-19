import Swiperblock from './swiper-bundle.min.js';
import embedblock from '../embed/embed.js';

function createSwiper(block) {
  if (!block.classList.contains('swiper')) {
    block.classList.add('swiper');
    const rows = Array.from(block.children);
    const swiperWrapper = document.createElement('div');
    swiperWrapper.classList.add('swiper-wrapper');

    rows.forEach((row) => {
      row.classList.add('swiper-slide');
      swiperWrapper.append(row);
    });

    // const swiperpagination = document.createElement('div');
    // swiperpagination.classList.add('swiper-pagination');

    // const swiperscrollbar = document.createElement('div');
    // swiperscrollbar.classList.add('swiper-scrollbar');
    block.append(swiperWrapper);
    // block.append(swiperpagination);
    // block.append(swiperscrollbar);
  }
}


export default function decorate(block) {


    // video code
      const link1 = block.querySelector('.button-container')
embedblock(link1)

   
  createSwiper(block);
 const swiperpagination = document.createElement('div');
    swiperpagination.classList.add('swiper-pagination');

    const swiperscrollbar = document.createElement('div');
    swiperscrollbar.classList.add('swiper-scrollbar');
    block.append(swiperpagination);
    block.append(swiperscrollbar);
  Swiperblock(block, {
    slidesPerView: 1,
    spaceBetween: 2,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
     scrollbar: {
    el: '.swiper-scrollbar',
  },
  });
}
