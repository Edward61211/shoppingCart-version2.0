"use strict";

// page navigations
function navigateToPage(page) {
  window.location.href = page;
}

function navigateToPage2(page2) {
  window.location.href = page2;
}

function navigateToHome(home) {
  window.location.href = home;
}

document.addEventListener("DOMContentLoaded", () => {
  const itemButtons = [
    {
      less: "decrement-button-1",
      more: "increment-button-1",
      input: "counter-input-1",
      output: "counter-output-1",
    },
    {
      less: "decrement-button-2",
      more: "increment-button-2",
      input: "counter-input-2",
      output: "counter-output-2",
    },
    {
      less: "decrement-button-3",
      more: "increment-button-3",
      input: "counter-input-3",
      output: "counter-output-3",
    },
  ];

  const itemsPriceElems = document.querySelectorAll(".itemsPrice");
  const taxElems = document.querySelectorAll(".tax");
  const totalPriceElems = document.querySelectorAll(".totalPrice");

  const itemPrices = [20, 12, 2];

  const validateAndUpdateInput = (inputElem, outputElem) => {
    const value = inputElem.value.trim();
    const regex = /^(0|[1-9]\d*)$/;

    if (!regex.test(value)) {
      inputElem.value = value.replace(/[^0-9]/g, "").replace(/^0+(?=\d)/, "");
    }

    outputElem.textContent = inputElem.value;
    updatePrices();
  };

  const updateCounter = (inputElem, outputElem, delta) => {
    let currentValue = parseInt(inputElem.value, 10) || 0;
    let newValue = currentValue + delta;
    if (newValue < 0) {
      newValue = 0;
    }
    inputElem.value = newValue;
    outputElem.textContent = newValue;
    updatePrices();
  };

  const updatePrices = () => {
    let totalItemsPrice = 0;

    itemButtons.forEach((item, index) => {
      const itemCount =
        parseInt(document.getElementById(item.input).value, 10) || 0;
      const itemPrice = itemCount * itemPrices[index];
      totalItemsPrice += itemPrice;
      document.getElementById(item.output).value = itemCount;
      document.getElementById(`item${index + 1}-price`).textContent = itemPrice;
    });

    const totalTax = totalItemsPrice * 0.1;
    const totalAmount = totalItemsPrice + totalTax;

    itemsPriceElems.forEach(
      (elem) => (elem.textContent = totalItemsPrice.toFixed(2))
    );
    taxElems.forEach((elem) => (elem.textContent = totalTax.toFixed(2)));
    totalPriceElems.forEach(
      (elem) => (elem.textContent = totalAmount.toFixed(2))
    );
  };

  itemButtons.forEach((item) => {
    document
      .getElementById(item.less)
      .addEventListener("click", () =>
        updateCounter(
          document.getElementById(item.input),
          document.getElementById(item.output),
          -1
        )
      );
    document
      .getElementById(item.more)
      .addEventListener("click", () =>
        updateCounter(
          document.getElementById(item.input),
          document.getElementById(item.output),
          1
        )
      );
    document
      .getElementById(item.input)
      .addEventListener("input", () =>
        validateAndUpdateInput(
          document.getElementById(item.input),
          document.getElementById(item.output)
        )
      );
  });

  updatePrices();
});

// User address update logic
const fields = ["name", "phone", "email", "country", "address", "postcode"];
const outputUserAddress = document.getElementById("yourAddress");

function updateUserAddress() {
  const addressParts = fields.map(
    (field) => document.getElementById(field).value
  );
  outputUserAddress.textContent = addressParts.join(", ");
}

fields.forEach((field) => {
  document.getElementById(field).addEventListener("input", updateUserAddress);
});
