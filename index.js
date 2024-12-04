const phoneInput = document.getElementById("clientPhone");
const mask = new IMask(phoneInput, {
  mask: "+38 (000)-000-00-00",
});
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

const initializeAllSwipers = () => {
  const swiperElements = document.querySelectorAll(".swiper");
  swiperElements.forEach((swiperElement) => {
    initializeSwiper(swiperElement);
  });
};

const loadContainer = (container) => {
  if (container.dataset.loaded === "false") {
    const swiperElements = container.querySelectorAll(".swiper");
    swiperElements.forEach((swiperElement) => {
      initializeSwiper(swiperElement);
    });

    setTimeout(() => {
      container.classList.add("loaded");
      container.querySelectorAll(".block-tab").forEach((el) => {
        el.style.visibility = "visible";
      });

      container.dataset.loaded = "true";
    }, 1000);
  }
};

const lazyContainer = document.querySelector(".lazy-wrapper");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      loadContainer(entry.target);
      observer.unobserve(entry.target);
    }
  });
});

observer.observe(lazyContainer);

let lastSwiper = new Swiper(".lastSwiper", {
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  loop: true,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

initializeAllSwipers();

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

// -
let body = document.querySelector(".body");
let modalWindowWrapper = document.querySelector(".modal-window-wrapper");
let TobyButton = document.querySelectorAll(".to-buy");
let closeInput = document.querySelector(".closed-window");
let Modalarticle = document.querySelector(".article");
let productArticle = document.querySelectorAll(".centers");

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
let price = document.querySelectorAll(".new-price");
let sliderImg = document.querySelectorAll(".slider-img");
let modalWindowImg = document.querySelector(".img-modal");

let selectedProductId = "";

TobyButton.forEach((itemButton, idx) => {
  itemButton.addEventListener("click", () => {
    selectedProductId = itemButton.closest(".content").getAttribute("data-id");

    modalWindowPrice.innerHTML = price[idx].innerHTML;
    Modalarticle.textContent = productArticle[idx].textContent;
    modalWindowImg.setAttribute("src", sliderImg[idx].getAttribute("src"));
  });
});

document
  .querySelector("#orderForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    if (!selectedProductId) {
      alert("Помилка: ID товару не вибрано!");
      return; // Зупиняємо виконання, якщо ID товару не вибрано
    }

    const orderData = {
      id: selectedProductId, // ID товару
      article: Modalarticle.textContent.trim(), // Артикул
      price: modalWindowPrice.textContent.trim(), // Ціна
      name: document.querySelector("#clientName").value.trim(), // Ім'я
      phone: document.querySelector("#clientPhone").value.trim(), // Телефон
    };
    // ==================================================================
    console.log("Дані для відправки:", orderData); // Для перевірки в консолі (можна видалити)
    // ==================================================================
    // Очистка форми після відправки
    document.querySelector("#orderForm").reset();
    modalWindowWrapper.classList.remove("display-flex");
    body.classList.remove("scroll-non");

    // Формування та відправка прихованої форми
    const form = document.createElement("form");
    form.method = "POST";
    form.action = "thank-you.php";

    for (const key in orderData) {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = orderData[key];
      form.appendChild(input);
    }

    document.body.appendChild(form);
    form.submit();
  });

// Заборона введення зайвих символів
document.querySelectorAll(".form-inputt").forEach((input) => {
  input.addEventListener("focus", () => {
    document.body.style.transform = "scale(1)";
    document.body.style.transformOrigin = "center";
  });

  input.addEventListener("blur", () => {
    document.body.style.transform = "";
    document.body.style.transformOrigin = "";
  });
});
