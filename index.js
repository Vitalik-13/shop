let swiper = new Swiper(".mySwiper", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  loop: true,
});

let lastSwiper = new Swiper(".lastSwiper", {
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  loop: true,
  autoplay: {
    delay: 4000, // Затримка між прокрутками (в мілісекундах)
    disableOnInteraction: false, // Продовжувати автопрокрутку після взаємодії
  },
});

let tabsWrap = document.querySelector(".tab-title-wrap");

let tabItem = document.querySelectorAll(".tab-title-item");

let tabsContent = document.querySelectorAll(".tab-content");

function hideTabscontent() {
  tabsContent.forEach((item) => item.classList.add("hite"));
  tabItem.forEach((item) => item.classList.remove("tab-active"));
}

function showTabContent(i = 0) {
  tabsContent[i].classList.add("show");
  tabsContent[i].classList.remove("hite");
  tabItem[i].classList.add("tab-active");
}

hideTabscontent();

showTabContent();

tabsWrap.addEventListener("click", function (e) {
  let target = e.target;
  // console.log(target)

  if (target.classList.contains("tab-title-item")) {
    tabItem.forEach((item, i) => {
      if (item === target) {
        hideTabscontent();
        showTabContent(i);
      }
    });
  }
});
