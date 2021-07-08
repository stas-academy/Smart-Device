// "use strict";
const popup = () => {
  const popupCall = document.querySelector(".popup-call");
  const btnCall = document.querySelector(".header__btn");
  const btnCloseCall = document.querySelector(".popup-call__close");
  const overlayCall = document.querySelector(".overlay");
  const nameInputCall = document.querySelector("#popup-call__name");


  const body = document.querySelector("body");
  const onPopupEscPress = (evt) => {
    if (evt.key === "Escape") {
      evt.preventDefault();
      closePopup(evt);
    }
  };
  const openPopup = (evt) => {
    evt.preventDefault();
    popupCall.classList.add("popup-call--active");
    body.classList.add("body--js");
    overlayCall.classList.add("overlay--active");
    btnCloseCall.addEventListener("click", closePopup);
    document.addEventListener("keydown", onPopupEscPress);
    overlayCall.addEventListener("click", closePopup);
    nameInputCall.focus();
  };
  const closePopup = (evt) => {
    evt.preventDefault();
    popupCall.classList.remove("popup-call--active");
    body.classList.remove("body--js");
    overlayCall.classList.remove("overlay--active");
    btnCloseCall.removeEventListener("click", closePopup);
    document.removeEventListener("keydown", onPopupEscPress);
    overlayCall.removeEventListener("click", closePopup);
  };
  btnCall.addEventListener("click", openPopup);
};
let isStorage = popup;
let storage = "";

try {
  storage = popup();
} catch (err) {
  isStorage = false;
}

{
  const btn = document.querySelectorAll(".footer__item-btn");
  const list = document.querySelectorAll(".footer__item");
  for (let k = 0; k < list.length; k++) {
    list[k].classList.remove("footer__item--active");
  }

  for (let i = 0; i < btn.length; i++) {
    btn[i].addEventListener("click", () => {
      for (let k = 0; k < list.length; k++) {
        list[k].classList.remove("footer__item--active");
      }
      list[i].classList.add("footer__item--active");
    });
  }
}
