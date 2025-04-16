// Variables.
const btn = document.querySelector(".btn-open");
const form = document.querySelector(".fact-form");

// Show/Hide the Share a Fact button.
btn.addEventListener("click", function () {
  // ? console.log("CLICK!!");
  if (form.classList.contains("hidden")) {
    form.classList.remove("hidden");
    btn.textContent = "Close";
  } else {
    form.classList.add("hidden");
    btn.textContent = "Share a fact";
  }
});

// Create a function that will calculate the age of a fact.
function calcFactAge(year) {
  // ? const currentYear = 2022;
  // age = 2022 - 2015
  // ? const age = currentYear - year;
  // ? return age;
  // Could also be written as shorthand and using JS to get current year:
  return new Date().getFullYear() - year;
}

// Call the function.
const age1 = calcFactAge(2015);
console.log(`The age of the fact is ${age1} years old.`);
// You can also call the function directly in a console log and you can continue to call the function.
console.log(`The age of the fact is ${calcFactAge(2020)} years old.`);
