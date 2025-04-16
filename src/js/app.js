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
  // Could also be written as shorthand and using JS to get current year:
  const age = new Date().getFullYear() - year;
  // ? return age;

  // Run code if inputted year is greater than current year.
  // If the statement is only one line of code you can remove the curly braces in the code block.
  if (age >= 0) {
    return age;
  } else {
    return "Error: You entered a year in the future.";
  }
}

// Call the function.
const age1 = calcFactAge(2015);
console.log(`The age of the fact is ${age1} years old.`);
// You can also call the function directly in a console log and you can continue to call the function.
console.log(`The age of the fact is ${calcFactAge(2020)} years old.`);
console.log(calcFactAge(2037));

// Perform task whenever interesting and mind blowing are the same value.
// You can repeat else if as many times as you want.
let votesInteresting = 20;
let votesMindblowing = 20;

if (votesInteresting === votesMindblowing) {
  alert("This fact is equally interesting and mind blowing!");
} else if (votesInteresting > votesMindblowing) {
  console.log("Interesting fact!");
} else if (votesInteresting < votesMindblowing) {
  console.log("Mind blowing fact!");
} else {
  console.log("Something else...");
}
