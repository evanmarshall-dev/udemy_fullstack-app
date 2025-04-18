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
// ? function calcFactAge(year) {
// ? const currentYear = 2022;
// ? age = 2022 - 2015
// ? const age = currentYear - year;
// Could also be written as shorthand and using JS to get current year:
// ? const age = new Date().getFullYear() - year;
// ? return age;

// Run code if inputted year is greater than current year.
// If the statement is only one line of code you can remove the curly braces in the code block.
// ? if (age >= 0) {
// ? return age;
// ? } else {
// ? return `Error: You entered a year in the future. Years need to be less than or equal to ${currentYear}.`;
// ? return `Error: You entered a year in the future. Years need to be less than or equal to ${new Date().getFullYear()}.`;
// ? }
// ? }

// For single line arrow functions you can remove the curly braces and the return statement.
// ? const calcFactAge2 = (year) => {
//   ? year <= new Date().getFullYear()
//     ? ? new Date().getFullYear() - year
//     ? : `Error: You entered a year in the future. Years ?need to be less than or equal to ${new Date().getFullYear?()}.`;
// ? };

// ? console.log(`The age of the fact is ${calcFactAge2(2015)} years old.`); // 10
// ? console.log(calcFactAge2(2037)); // Error

// Call the function.
// ? const age1 = calcFactAge(2015);
// ? console.log(`The age of the fact is ${age1} years old.`);
// You can also call the function directly in a console log and you can continue to call the function.
// ? console.log(`The age of the fact is ${calcFactAge(2020)} years old.`);
// ? console.log(calcFactAge(2037));

// Perform task whenever interesting and mind blowing are the same value.
// You can repeat else if as many times as you want.
// ? let votesInteresting = 20;
// ? let votesMindblowing = 5;

// ? if (votesInteresting === votesMindblowing) {
//   ? alert("This fact is equally interesting and mind blowing!");
// ? } else if (votesInteresting > votesMindblowing) {
//   ? console.log("Interesting fact!");
// ? } else if (votesInteresting < votesMindblowing) {
//   ? console.log("Mind blowing fact!");
// ? } else {
//   ? console.log("Something else...");
// ? }

// Ternary Operators.
// ? let votesFalse = 7;
// ? const totalUpvotes = votesInteresting + votesMindblowing;

// When total totalUpvotes is greater than votesFalse.
// The question mark is like IF condition return and colon is like ELSE return. Three parts: IF statement, true return, and false return.
// ? const message =
//   ? totalUpvotes > votesFalse
//     ? ? "The fact is true."
//     ? : "The fact might be false, check more sources.";

// ? alert(message);

// Strings.
// You can call functions on the strings. These are called METHODS when a function is called on something.
// ? const text = "Lisbon is the capital of Portugal.";
// ? const upperCase = text.toUpperCase();
// ? console.log(upperCase);

// Template Strings.
// Not only strings, but you can run or call functions in them , too.
// ? const str = `The current fact is: "${text}" It is ${calcFactAge(
//   ? 2015
// ? )} years old. It is probably ${
//   ? totalUpvotes > votesFalse ? "correct" : "not true"
// ? }.`;
// ? console.log(str);

// Arrays.
// Arrays are zero indexed, so the first element is 0.
// If you call on an array value that doesn't exist it will return UNDEFINED.
const fact = ["Lisbon is the capital of Portugal.", 2015, true, "something"];
console.log(fact);
console.log(fact[2]); // true
console.log(fact.length); // 4
console.log(fact[fact.length - 1]); // something

// Create variables from the array.
const [textFact, year, isTrue, somethingElse] = fact;
console.log(text); // Lisbon is the capital of Portugal.

// Add elements to an array by creating a new array.
// If we were to just add in the original array and an additional value it would not work. We want to add a value to the end of the array.
const newFact = [fact, "something new"];
console.log(newFact); // [Array(4), "something new"]

// To do it properly we need to use the spread operator.
const newFact2 = [...fact, "something new"];
console.log(newFact2); // ["Lisbon is the capital of Portugal.", 2015, true, "something", "something new"]

// Objects.
const factObj = {
  text: "Lisbon is the capital of Portugal.",
  category: "society",
  createdIn: 2015,
  isCorrect: true,
  something: "something",
  // You can also add a function to an object. This is called a method and is assembled from values in the object.
  // The THIS keyword refers to the object itself.
  createSummary: function () {
    return `The fact "${
      this.text
    }", it is from the category ${this.category.toUpperCase()}, created in ${
      this.createdIn
    }, and it is ${this.isCorrect}.`;
  },
};

console.log(factObj.text); // Lisbon is the capital of Portugal.
// You can also use the bracket notation.
console.log(factObj["text"]); // Lisbon is the capital of Portugal.

// Create variables from the object through DESTRUCTURING.
const { text, createdIn } = factObj;
console.log(text); // Lisbon is the capital of Portugal.

// Create our own method.
console.log(factObj.createSummary()); // The fact Lisbon is the capital of Portugal., it is from the category SOCIETY, created in 2015, and it is true.
