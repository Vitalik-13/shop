// Окрема функція для ініціалізації кожного слайдера
const initializeSwiper = (swiperElement) => {
  new Swiper(swiperElement, {
    slidesPerView: 1,
    spaceBetween: 0,
    pagination: {
      el: swiperElement.querySelector(".swiper-pagination"),
      clickable: true,
    },
    navigation: {
      nextEl: swiperElement.querySelector(".swiper-button-next"),
      prevEl: swiperElement.querySelector(".swiper-button-prev"),
    },
    loop: true,
  });
};

// Ініціалізація всіх слайдерів на сторінці при завантаженні
const initializeAllSwipers = () => {
  const swiperElements = document.querySelectorAll(".swiper");
  swiperElements.forEach((swiperElement) => {
    initializeSwiper(swiperElement); // Ініціалізуємо кожен слайдер
  });
};

// Функція для завантаження контейнера з затримкою
const loadContainer = (container) => {
  if (container.dataset.loaded === "false") {
    // Ініціалізуємо слайдери тільки після того, як контейнер став видимим
    const swiperElements = container.querySelectorAll(".swiper");
    swiperElements.forEach((swiperElement) => {
      initializeSwiper(swiperElement); // Ініціалізуємо кожен слайдер
    });

    // Встановлюємо затримку перед відображенням контенту
    setTimeout(() => {
      // Відображаємо блоки з контентом після завантаження
      container.classList.add("loaded"); // Додаємо клас для відображення контенту
      container.querySelectorAll(".block-tab").forEach((el) => {
        el.style.visibility = "visible"; // Відображаємо блоки з контентом
      });

      // Сховуємо лоадер після затримки
      // container.querySelector(".loader").style.display = "none";

      // Позначаємо, що контент завантажено
      container.dataset.loaded = "true";
    }, 1000); // Затримка перед відображенням контенту, 3000 мс (3 секунди)
  }
};

// Налаштовуємо IntersectionObserver для контейнера
const lazyContainer = document.querySelector(".lazy-wrapper");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      loadContainer(entry.target); // Завантажуємо контент, коли контейнер з'являється в viewport
      observer.unobserve(entry.target); // Зупиняємо спостереження
    }
  });
});

observer.observe(lazyContainer);

// Ініціалізація Swiper для останнього слайдера (окремо)
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
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

// Ініціалізація всіх слайдерів на сторінці
initializeAllSwipers(); // Викликаємо ініціалізацію слайдерів для всіх елементів на сторінці

// Робота з вкладками
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
  if (target.classList.contains("tab-title-item")) {
    tabItem.forEach((item, i) => {
      if (item === target) {
        hideTabscontent();
        showTabContent(i);
      }
    });
  }
});
let body = document.querySelector(".body");
let modalWindowWrapper = document.querySelector(".modal-window-wrapper");
let TobyButton = document.querySelectorAll(".to-buy");
let closeInput = document.querySelector(".closed-window");
TobyButton.forEach((item) =>
  item.addEventListener("click", function () {
    modalWindowWrapper.classList.add("display-flex");
    body.classList.add("scroll-non");
  })
);
closeInput.addEventListener("click", function (e) {
  modalWindowWrapper.classList.remove("display-flex");
  body.classList.remove("scroll-non");
});
modalWindowWrapper.addEventListener("click", function (e) {
  if (e.target === modalWindowWrapper) {
    modalWindowWrapper.classList.remove("display-flex");
    body.classList.remove("scroll-non");
  }
});
let modalWindowPrice = document.querySelector(".color-red");
let price = document.querySelectorAll(".red");
let sliderImg = document.querySelectorAll(".slider-img");
let modalWindowImg = document.querySelector(".img-modal");

TobyButton.forEach((itemButton, idx) => {
  itemButton.addEventListener("click", () => {
    modalWindowPrice.textContent = price[idx].textContent;
    modalWindowImg.setAttribute("src", sliderImg[idx].getAttribute("src"));
    modalWindowImg.setAttribute("alt", sliderImg[idx].getAttribute("alt"));
  });
});
