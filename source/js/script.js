'use strict';

//popup

(function () {
  let body = document.querySelector('.body');
  let linkPopup = document.querySelector('.page-header__callback');
  let popup = document.querySelector('.popup');

  if (popup) {
    let popupIn = popup.querySelector('.popup__wrapper');
    let closeButton = popup.querySelector('.popup__close-btn');

    let popupForm = popup.querySelector('.popup__form');
    let popupName = popup.querySelector('#name-popup');
    let popupTel = popup.querySelector('#tel-popup');
    let popupText = popup.querySelector('#popup-question');

    let isStorageSupport = true;
    let storageName = '';
    let storageTel = '';
    let storageText = '';

    try {
      storageName = localStorage.getItem('name');
      storageTel = localStorage.getItem('tel');
      storageText = localStorage.getItem('text');
    } catch (err) {
      isStorageSupport = false;
    }

    linkPopup.addEventListener('click', function (evt) {
      evt.preventDefault();
      popup.classList.add('popup--open');
      body.classList.add('body--no-scroll');

      popupName.focus();

      if (storageName) {
        popupName.value = storageName;
        popupTel.value = storageTel;
        popupText.value = storageText;
      }
    });

    closeButton.addEventListener('click', function (evt) {
      evt.preventDefault();
      popup.classList.remove('popup--open');
      body.classList.remove('body--no-scroll');
    });

    popupForm.addEventListener('submit', function (evt) {
      if (!popupName.value || !popupTel.value) {
        evt.preventDefault();
      } else {
        if (isStorageSupport) {
          localStorage.setItem('name', popupName.value);
          localStorage.setItem('tel', popupTel.value);
          localStorage.setItem('text', popupText.value);
        }
      }
    });

    window.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        if (popup.classList.contains('popup--open')) {
          evt.preventDefault();
          popup.classList.remove('popup--open');
          body.classList.remove('body--no-scroll');
        }
      }
    });

    popup.addEventListener('click', function (evt) {
      if (evt.target !== popupIn) {
        popup.classList.remove('popup--open');
        body.classList.remove('body--no-scroll');
      }
    });

    popupIn.addEventListener('click', function (evt) {
      evt.stopPropagation();
    });
  }
})();

//down

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

//scroll

const anchors = document.querySelectorAll('a[href*="#"]');

  anchors.forEach(function (anchor) {
    anchor.addEventListener('click', function (evt) {
      evt.preventDefault();

      let blockID = anchor.getAttribute('href').substr(1);

      document.getElementById(blockID).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  });


  // mask

window.addEventListener('DOMContentLoaded', function () {
  function setCursorPosition(pos, elem) {
    elem.focus();
    if (elem.setSelectionRange) {
      elem.setSelectionRange(pos, pos);
    } else if (elem.createTextRange) {
      let range = elem.createTextRange();
      range.collapse(true);
      range.moveEnd('character', pos);
      range.moveStart('character', pos);
      range.select();
    }
  }

  let obj = {
    foo: function mask(event) {
      let matrix = '+7(___)___-__-__';
      let h = 0;
      let def = matrix.replace(/\D/g, '');
      let val = this.value.replace(/\D/g, '');
      if (def.length >= val.length) {
        val = def;
      }
      this.value = matrix.replace(/./g, function (a) {
        if (/[_\d]/.test(a) && h < val.length) {
          return val.charAt(h++);
        } else if (h >= val.length) {
          return '';
        } else {
          return a;
        }
      });
      if (event.type === 'blur') {
        if (this.value.length === 2) {
          this.value = '';
        }
      } else {
        setCursorPosition(this.value.length, this);
      }
    }
  };

  let elements = document.querySelectorAll('.input-mask');

  if (elements) {
    for (let k = 0; k < elements.length; k++) {
      elements[k].addEventListener('input', obj.foo, false);
      elements[k].addEventListener('focus', obj.foo, false);
      elements[k].addEventListener('blur', obj.foo, false);
    }
  }
});
