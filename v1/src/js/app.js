const initialFacts = [
  {
    id: 1,
    text: "React is being developed by Meta (formerly facebook)",
    source: "https://opensource.fb.com/",
    category: "technology",
    votesInteresting: 24,
    votesMindblowing: 9,
    votesFalse: 4,
    createdIn: 2021,
  },
  {
    id: 2,
    text: "Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%",
    source:
      "https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids",
    category: "society",
    votesInteresting: 11,
    votesMindblowing: 2,
    votesFalse: 0,
    createdIn: 2019,
  },
  {
    id: 3,
    text: "Lisbon is the capital of Portugal",
    source: "https://en.wikipedia.org/wiki/Lisbon",
    category: "society",
    votesInteresting: 8,
    votesMindblowing: 3,
    votesFalse: 1,
    createdIn: 2015,
  },
];

const CATEGORIES = [
  { name: "technology", color: "#3b82f6" },
  { name: "science", color: "#16a34a" },
  { name: "finance", color: "#ef4444" },
  { name: "society", color: "#eab308" },
  { name: "entertainment", color: "#db2777" },
  { name: "health", color: "#14b8a6" },
  { name: "history", color: "#f97316" },
  { name: "news", color: "#8b5cf6" },
];

// The return below is an object with the name and color properties.
// To get the color element from the object we use dot notation .color at the end of the find method.
// ? console.log(CATEGORIES.find((cat) => cat.name === "society").color); // {name: "society", color: "#eab308"}

// Variables & selecting DOM elements.
const btn = document.querySelector(".btn-open");
const form = document.querySelector(".fact-form");
// The factsList will be used to create new DOM elements.
const factsList = document.querySelector(".facts-list");

// We want to remove the content of the factsList by setting the innerHTML to an empty string.
// The code outside of the function will run when the page loads.
// Create DOM elements: Render facts in list.
// Fetch grabs data from the API. The first argument is the URL and the second is an object with options.
factsList.innerHTML = "";

// Load data from Supabase.
// Call the below function.
loadFacts();

async function loadFacts() {
  const res = await fetch(
    "https://vjqattpnvbkwmblbunop.supabase.co/rest/v1/facts",
    {
      // First pass in the headers object.
      headers: {
        apikey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZqcWF0dHBudmJrd21ibGJ1bm9wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2NzMzMzIsImV4cCI6MjA2MDI0OTMzMn0.b559b80udtLGKfhX-9V1D1F4N5ZSqvAAUs8F4ZjF9G0",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZqcWF0dHBudmJrd21ibGJ1bm9wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2NzMzMzIsImV4cCI6MjA2MDI0OTMzMn0.b559b80udtLGKfhX-9V1D1F4N5ZSqvAAUs8F4ZjF9G0",
      },
    }
  );
  // Test.
  // ? console.log(res);

  const data = await res.json();

  // Apply a filter to the data array.
  // Call each of the array elements fact.
  // Only if the category is equal to society will it be included in the new filteredData array.
  // You can change the category to any of the other categories to filter by that category.
  // ? const filteredData = data.filter((fact) => fact.category === "society");

  // Test.
  // ? console.log(data);

  // Call the createFactsList function and pass in the data array.
  createFactsList(data);
  // Load filtered data instead of the full data.
  // ? createFactsList(filteredData);
}

// Call the create function and pass in the initialFacts array.
// ? createFactsList(initialFacts);

// Create a function to contain the below code.
function createFactsList(dataArray) {
  // Map over array of objects and create a new array with HTML.
  // We pass in fact as an argument and return a string of HTML for each of the facts.
  // Inside the string we pass in fact.text which is the text value on the array.
  // ? const htmlArr = initialFacts.map(
  // Instead of hard coding the background color for category we can use the find method to get the color from the CATEGORIES array.
  const htmlArr = dataArray.map(
    (fact) => /* HTML */ `<li class="fact">
      <p>
        ${fact.text}
        <a
          class="source"
          href="${fact.source}"
          target="_blank"
          rel="noopener noreferrer"
          >(Source)</a
        >
      </p>
      <span
        class="tag"
        style="background-color: ${CATEGORIES.find(
          (cat) => cat.name === fact.category
        ).color}"
      >
        ${fact.category}</span
      >
    </li>`
  );
  // To test. Returns each text value of the array as a string of HTML.
  console.log(htmlArr);

  // Join each element of the array into a single string. One array of three elements to one string using thr join method.
  const html = htmlArr.join("");

  // Now we insert the HTML string into the DOM.
  factsList.insertAdjacentHTML("afterbegin", html);
}

// Takes two arguments: the first is the insert position and the second is the text content.
// ? factsList.insertAdjacentHTML("afterbegin", "<li>Test Content</li>");
// ? factsList.insertAdjacentHTML("afterbegin", "<li>Test Content Again</li>");

// ? console.log(btn); // <button class="btn-open">Share a fact</button>
// ? console.dir(btn); // <button class="btn-open">Share a fact</button>

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

console.log([7, 64, 6, -23, 11].filter((el) => el > 10)); // [64, 11]

console.log([7, 64, 6, -23, 11].find((el) => el > 10)); // 64

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
//     ? : `Error: You entered a year in the future. Years need to be less than or equal to ${new Date().getFullYear()}.`;
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
// ? const fact = ["Lisbon is the capital of Portugal.", 2015, true, "something"];
// ? console.log(fact);
// ? console.log(fact[2]); // true
// ? console.log(fact.length); // 4
// ? console.log(fact[fact.length - 1]); // something

// Create variables from the array.
// ? const [textFact, year, isTrue, somethingElse] = fact;
// ? console.log(text); // Lisbon is the capital of Portugal.

// Add elements to an array by creating a new array.
// If we were to just add in the original array and an additional value it would not work. We want to add a value to the end of the array.
// ? const newFact = [fact, "something new"];
// ? console.log(newFact); // [Array(4), "something new"]

// To do it properly we need to use the spread operator.
// ? const newFact2 = [...fact, "something new"];
// ? console.log(newFact2); // ["Lisbon is the capital of Portugal.", 2015, true, "something", "something new"]

// forEach loop.
// ? [2, 4, 6, 8].forEach(function (el) {
//   ? console.log(el); // 2, 4, 6, 8
// ? });

// Create a new array with the map method.
// ? const timesTen = [2, 4, 6, 8].map(function (el) {
//   ? return el * 10; // [20, 40, 60, 80]
// ? });
// ? console.log(timesTen); // [20, 40, 60, 80]

// You can also use an arrow function. This gets rid of the function keyword and the return statement.
// ? const timesTen2 = [2, 4, 6, 8].map((el) => el * 10);
// ? console.log(timesTen2); // [20, 40, 60, 80]

// Dealing with Arrays with multiple objects.
// ? const CATEGORIES = [
//   { name: "technology", color: "#3b82f6" },
//   { name: "science", color: "#16a34a" },
//   { name: "finance", color: "#ef4444" },
//   { name: "society", color: "#eab308" },
//   { name: "entertainment", color: "#db2777" },
//   { name: "health", color: "#14b8a6" },
//   { name: "history", color: "#f97316" },
//   { name: "news", color: "#8b5cf6" },
// ? ];

// ? const allCategories = CATEGORIES.map((el) => el.name);
// ? console.log(allCategories); // ["technology", "science", "finance", "society", "entertainment", "health", "history", "news"]

// ? const initialFacts = [
//   {
//     id: 1,
//     text: "React is being developed by Meta (formerly facebook)",
//     source: "https://opensource.fb.com/",
//     category: "technology",
//     votesInteresting: 24,
//     votesMindblowing: 9,
//     votesFalse: 4,
//     createdIn: 2021,
//   },
//   {
//     id: 2,
//     text: "Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%",
//     source:
//       "https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids",
//     category: "society",
//     votesInteresting: 11,
//     votesMindblowing: 2,
//     votesFalse: 0,
//     createdIn: 2019,
//   },
//   {
//     id: 3,
//     text: "Lisbon is the capital of Portugal",
//     source: "https://en.wikipedia.org/wiki/Lisbon",
//     category: "society",
//     votesInteresting: 8,
//     votesMindblowing: 3,
//     votesFalse: 1,
//     createdIn: 2015,
//   },
// ];

// Create a new array with the three ages of the facts.
// ? const ages = initialFacts.map((el) => calcFactAge2(el.createdIn));
// ? console.log(ages); // [1, 3, 7]
// You can use the join method to create a separator between the values.
// ? console.log(ages.join(" & ")); // 1 - 3 - 7

// Objects.
// ? const factObj = {
//   ? text: "Lisbon is the capital of Portugal.",
//   ? category: "society",
//   ? createdIn: 2015,
//   ? isCorrect: true,
//   ? something: "something",
// You can also add a function to an object. This is called a method and is assembled from values in the object.
// The THIS keyword refers to the object itself.
//   ? createSummary: function () {
//     ? return `The fact "${
//       ? this.text
//     ? }", it is from the category ${this.category.toUpperCase()}, created in ${
//       ? this.createdIn
//     ? }, and it is ${this.isCorrect}.`;
//   ? },
// ? };

// ? console.log(factObj.text); // Lisbon is the capital of Portugal.
// You can also use the bracket notation.
// ? console.log(factObj["text"]); // Lisbon is the capital of Portugal.

// Create variables from the object through DESTRUCTURING.
// ? const { text, createdIn } = factObj;
// ? console.log(text); // Lisbon is the capital of Portugal.

// Create our own method.
// ? console.log(factObj.createSummary()); // The fact Lisbon is the capital of Portugal., it is from the category SOCIETY, created in 2015, and it is true.
