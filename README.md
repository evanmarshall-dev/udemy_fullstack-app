# UDEMY: Build a Full-Stack Web App

![Udemy Logo](https://www.langoly.com/wp-content/uploads/2022/09/udemy-logo.png)

![JAVASCRIPT](https://img.shields.io/badge/javascript-purple?style=plastic)
![HTML](https://img.shields.io/badge/html-yellow?style=plastic)
![REACT](https://img.shields.io/badge/react-red?style=plastic)
![CSS](https://img.shields.io/badge/css-blue?style=plastic)

## Supabase: Storing App Data

Currently the project is static. It cannot create any new data and the current data is not being loaded from anywhere.

### What is Supabase

A service that allows easy creation of a back-end with a database.

A back-end application uses languages such as **nodejs** or **php** to be created and connected to a database.

Supabase automatically creates a **database** and **API** to request and receive data from the server where the Supabase database is hosted.

**Application Programming Interface** (API) is a program that receives requests for data and then sends that data back as JSON.

### Exploring the Supabase Project

On the dashboard you will see a **_Table Editor_**, **_Authentication_** (i.e. Add Users to Database), **_API Documentation_**, etc.

### Creating a Table

This will store all application data.

1. Click on **Table Editor** on the dashboard.
2. Click on **Create a new table**.
3. Fill in the **Name** field.
4. Make sure **Enable RLS** is checked and **Enable Realtime** is un-checked.
5. Create Columns (schema), which can also be done by importing a spreadsheet:

- Each piece of data in the schema will have a unique **id** which will serve as a **primary key** and this will be auto generated.
- There will also be a `created_at` auto generated which is the current time and date that a new piece of data is created.
- Next, we will add another column and name it **_text_**, and select **text** or **varchar** as the **type**.
- Next, we will add another column and name it **_source_** with the type of **text**.
- Next, we will add another column and name it **_category_** with the type of **text**.
- Another column with the name **_votes_interesting_** with the type of **int4**, and create a **Default Value** of **_0_**.
- Another column with the name **_votes_mindblowing_** with the type of **int4**, and create a **Default Value** of **_0_**.
- Another column with the name **_votes_false_** with the type of **int4**, and create a **Default Value** of **_0_**.
- Click **Save**.

### Inserting Data into Table

1. Click **Insert Row**.
2. Make sure thr headings in the spreadsheet match and upload CSV.
3. Click **Import data**.
4. You can update/edit any of the columns of a row by clicking right in the GUI and hitting save.

### Connecting to the Database (API)

1. Click **API Docs** in the dashboard.
2. Click the name of your table (i.e. facts).
3. You will now see how to do things using a JavaScript SDK, but we will click on **bash** for the time being.
4. Click on **Project API key** and select **anon (public)**. This will reveal an API key for each column which is needed to create a request to the database.
5. Copy the data from ID and paste it in the terminal.
6. Delete `?select=id` from the URL pasted in the terminal and you are left with your URL to your database (db).
7. Press enter in the terminal and you will most likely get an output of an empty array.

### Row Level Security Policies

1. Click on the **Authentication** section in the Supabase dashboard.
2. Click on **Policies**.
3. Click on **Create policy**.
4. Click on **Enable read access for all users** to paste in that template.
5. Make sure **SELECT** is selected (reading data).
6. Click **Save policy**.
7. This allows anyone that has the API to read the data.
8. Now when we paste the curl command from before in the terminal the output array will have the data in it.

We now have to create two more policies so that users can _upload_ data as well as _modify_ data. IRL you would only give _edit_ access to users who are authenticated and all users to _read_ data.

1. Click on **Create policy** again.
2. Click on **Enable read access for all users**.
3. Change **Policy Command** from **SELECT** to **INSERT**.
4. Rename **Policy Name** to **_Enable insert access for all users_**.
5. Write `true` within `with check ();`.
6. Click **Save Policy**.

Now for modifying data.

1. Click on **Create policy** again.
2. Click on **Enable read access for all users**.
3. Change **Policy Command** from **SELECT** to **UPDATE**.
4. Rename **Policy Name** to **_Enable update access for all users_**.
5. Write `true` within `with check ();`.
6. Click **Save Policy**.

## JavaScript: Making the App Interactive

JavaScript (JS) is the _programming_ language of the browser. It is used to implement _dynamic_ effects such as response to click events, loading external data, changing HTML content, playing video, animating charts, etc.

### Show/Hide the Form

1. Create a style for class `hidden` to display none with important.
2. Apply this class to the form element.
3. In the JS we select the element using `document.querySelector('btn-open');`. Select the button for **_Share A Fact_**. Store this in a variable called `btn`.
4. Attach an **event handler** to a click event on the above button. We do this by the `addEventListener` method with the event type in parenthesis (`"click"`) and a callback function which will define what happens on a click event (`btn.addEventListener("click", function () {}`).
5. Select the form then add an **if statement** within the callback function. The if statement should be checking if the form `classList` has `hidden` then we run the function within the statement (`if (form.classList.contains("hidden")) {}`).
6. If it contains `hidden` then we want to remove the `hidden` class (`form.classList.remove("hidden");`).
7. The second part of the if statement will be to add the class of `hidden` back to the form if its `classList` does not contain hidden already (`else {form.classList.add("hidden");}`).
8. When we remove the hidden class we want to change the button content to **_CLOSE_**. This is done using the `textContent` method (`btn.textContent = "Close";`).
9. Now on click the text content remains CLOSE, so we repeat the above code in the else statement and apply the original text back (`btn.textContent = "Share a fact";`).

For example:

```javascript
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
```

### Functions

In JS there are some built in functions (i.e. `parseInt()`, `addEventLinstener()`, `querySelector()`, etc.). Basically the parenthesis indicates a function.

You can also create functions.

For example:

```javascript
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
```

### If/Else Statements and Truthy/Falsey Values

Falsey are any values that are converted to `false` in something such as an if statement. Since an if statement is a boolean true or false.

The falsey values are: `0`, `''`, `null`, `undefined`.

Truthy values are everything else.

Now we will utilize truthy/falsey and if/else statements in our app. If a user enters an argument for `calcFactAge` that is in the future we want to indicate that. We can do this by comparing `currentYear` with the `inputted` year or we can see if the `age` is greater than 0 or not.

For example:

```javascript
// Run code if inputted year is greater than current year.
// If the statement is only one line of code you can remove the curly braces in the code block.
function calcFactAge(year) {
  const age = new Date().getFullYear() - year;

  if (age >= 0) {
    return age;
  } else {
    return "You entered a year in the future.";
  }
}

console.log(calcFactAge(2037));
```

### Arrow Functions

Arrow functions are a shorthand way of writing functions. They are also _anonymous_ functions, meaning they do not have a name.

For example:

```javascript
// For single line arrow functions you can remove the curly braces and the return statement.
const calcFactAge2 = (year) => {
  const age = new Date().getFullYear() - year;
  return age >= 0
    ? age
    : `Error: You entered a year in the future. Years need to be less than or equal to ${new Date().getFullYear()}.`;
};
```

### Arrays

An array is a data structure that allows you to store multiple values in a single variable. You can create an array using square brackets `[]` and separate the values with commas.

For example:

```javascript
// Arrays are zero indexed, so the first element is 0.
// If you call on an array value that doesn't exist it will return UNDEFINED.
const fact = ["Lisbon is the capital of Portugal.", 2015, true, "something"];
console.log(fact);
console.log(fact[2]); // true
console.log(fact.length); // 4
console.log(fact[fact.length - 1]); // something

// Create variables from the array.
const [text, createdIn, isCorrect, something] = fact;
console.log(text); // Lisbon is the capital of Portugal.

// Add elements to an array by creating a new array.
// If we were to just add in the original array and an additional value it would not work. We want to add a value to the end of the array.
const newFact = [fact, "something new"];
console.log(newFact); // [Array(4), "something new"]

// To do it properly we need to use the spread operator.
const newFact2 = [...fact, "something new"];
console.log(newFact2); // ["Lisbon is the capital of Portugal.", 2015, true, "something", "something new"]
```

#### Looping Over an Array: forEach & Map

You can loop over an array using the `forEach` method. This method takes a callback function as an argument and executes it for each element in the array in steps.

In practice we usually create a new array with the results of the loop. This is done using the `map` method. This method also takes a callback function as an argument and returns a new array with the results of the callback function.

For example:

```javascript
// forEach loop.
[2, 4, 6, 8].forEach(function (el) {
  console.log(el); // 2, 4, 6, 8
});

// Create a new array with the map method.
const timesTen = [2, 4, 6, 8].map(function (el) {
  return el * 10; // [20, 40, 60, 80]
});
console.log(timesTen); // [20, 40, 60, 80]

// You can also use an arrow function. This gets rid of the function keyword and the return statement.
const timesTen2 = [2, 4, 6, 8].map((el) => el * 10);
console.log(timesTen2); // [20, 40, 60, 80]

// Dealing with Arrays with multiple objects.
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

const allCategories = CATEGORIES.map((el) => el.name);
console.log(allCategories); // ["technology", "science", "finance", "society", "entertainment", "health", "history", "news"]

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

// Create a new array with the three ages of the facts.
const ages = initialFacts.map((el) => calcFactAge2(el.createdIn));
console.log(ages); // [1, 3, 7]
// You can use the join method to create a separator between the values.
console.log(ages.join(" & ")); // 1 - 3 - 7
```

### Objects

An object is a data structure that allows you to store multiple values in a single variable. You can create an object using curly braces `{}` and separate the key-value pairs with commas.

For example:

```javascript
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
```

### Document Object Model (DOM)

The DOM is a programming interface for HTML and XML documents. It represents the document as a tree structure where each HTML element or **_node_** is an **_object_** representing a part of the document. The DOM allows you to manipulate the document structure, style, and content through JS methods (DOM manipulation).

When you `console.dir()` an element you will see the properties of the element. These properties are the same as the ones you can manipulate in the DOM. For example, `textContent`, `innerHTML`, `classList`, etc. You can also expand to see the methods of the element. These methods are the same as the ones you can use to manipulate the element in the DOM. For example, `addEventListener()`, `remove()`, `appendChild()`, etc.

For example:

```javascript
console.log(btn); // <button class="btn-open">Share a fact</button>
console.dir(btn); // <button class="btn-open">Share a fact</button>`

// The factsList will be used to create new DOM elements.
const factsList = document.querySelector(".facts-list");
```

We do not manipulate the HTML, but rather the DOM, which is a JS representation of the HTML. We place the factsList code outside of the function so that it will run at page load.

#### Creating DOM Elements

Use `factsList.insertAdjacentHTML("afterbegin", "<li>Test Content</li>");` and pass in the position and text content as _arguments_. `Afterbegin` means it will be inserted at the beginning of the list. You can also use `beforeend` to insert at the end of the list.

When we receive data from a database we won't be able to use the `insertAdjacentHTML` method anymore because we will not know how many items users have inputted. Therefore we will have to loop over the entire array using `map` method and for each object we will create some HTML, group the HTML together, and then insert it into the DOM. This creates a brand new array of HTML.

1. Clear any HTML that is inside the `factsList` element on page load. `factsList.innerHTML = "";`.
2. Map over the `initialFacts` array and create a new array of HTML strings.
3. Use the `join` method to create a single string of HTML.
4. Use the `insertAdjacentHTML` method to insert the HTML into the DOM.
5. Refactor the code by creating a function. This will make the function **_independent_** of where the data source is. We do not want to continue calling on `initialFacts` array. We want the function to be **_reusable_** and use both data from the inline array as well as the Supabase database.
6. Pass in `dataArray` to `createFactsList` function and `dataArray.map()` instead of `initialFacts.map()`.
7. Call the function (Can be called before the function in the code) with the `initialFacts` array as an argument.

For example:

```javascript
const factsList = document.querySelector(".facts-list");

factsList.innerHTML = "";

createFactsList(initialFacts);

function createFactsList(dataArray) {
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
      <span class="tag" style="background-color: #3b82f6"
        >${fact.category}</span
      >
    </li>`
  );

  const html = htmlArr.join("");

  factsList.insertAdjacentHTML("afterbegin", html);
}
```

### Fetch from Supabase with Async/Await

Make sure you have "enable read access for all users" under **Policies** in the **Authentication** section of the Supabase dashboard.

1. Create a fetch function which grabs the database URL as the first argument and an object of options as the second argument.
2. In the second argument we add `headers` which will contain the `apikey` and `Authorization` (Bearer token). The bearer token is the same as the API key with the `Bearer` keyword in front of it.
3. Assign fetch to a variable called `response` (i.e. res).

The response from the fetch is a `Promise`. A `Promise` is a future value. It is necessary because the data takes some time to load. The data is not received immediately after page load.

The Promise is either **_fulfilled_** or **_rejected_**. We need to consume the `Promise` so that we have our code waiting for the result to arrive. This is done by creating an **_asynchronous_** function (async). The async function requires no arguments and we add the `const res` to the code body. Once the `res` code is within the `async` function we can use the `await` keyword for fetch. Await pauses the execution of the code while it is fetching. Await can only be used when a function returns a `Promise`.

1. We then call the function `loadFacts()` which creates a response in the console.
2. Transform the response into JSON. We do this by creating a variable called `data` and assigning it to the `res.json()` method. This is also a Promise so we need to use the `await` keyword again. It converts the response object into a JSON object.
3. We can now use the data in the `createFactsList` function. We do this by calling the function and passing in the `data` variable as an argument.

We now have a full stack app that fetches facts from Supabase and displays them on the page. The facts are dynamically rendered in the DOM based on the data retrieved from the database.

### Filter and Finds Methods

#### Filter

The `filter` method is similar to the `map` method where it loops over an array, but does it in a different way. For each element in the array it checks if the element meets a certain condition (i.e. true or false and only if true it will be included in the final array). So the `filter` method creates a new array with elements that meet the condition.

We pass in a callback function to the `filter` method. The callback function takes each element of the array and matches it against a condition.

We will utilize the `filter` method in the `loadFacts` function. We will filter the data we get from the API. The `data` that we get from the API is the array of objects. We will apply the filter to the `data`. Each object in the array (can be seen by `console.log(data)`) contains a `category` property. We will only display the objects where the category is equal to a specific category.

For example:

```javascript
async function loadFacts() {
  // Apply a filter to the data array.
  // Call each of the array elements fact.
  // Only if the category is equal to society will it be included in the new filteredData array.
  // You can change the category to any of the other categories to filter by that category.
  const filteredData = data.filter((fact) => fact.category === "society");

  // Test.
  // ? console.log(data);

  // Call the createFactsList function and pass in the data array.
  // ? createFactsList(data);
  // Load filtered data instead of the full data.
  createFactsList(filteredData);
}
```

#### Find

The `find` method is similar to the `filter` method, but it only returns the _first_ element that meets the condition. It **does not** create a new array like the `filter` method.

The `find` method is useful when you want to find a specific element in an array. It returns the first element that meets the condition or `undefined` if no element meets the condition.

For example:

```javascript
console.log([7, 64, 6, -23, 11].find((el) => el > 10)); // 64
```

#### Getting the Category Color

For example:

```javascript
// The return below is an object with the name and color properties.
// To get the color element from the object we use dot notation .color at the end of the find method.
console.log(CATEGORIES.find((cat) => cat.name === "society").color); // {name: "society", color: "#eab308"}

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
```

## React: Building the App

React is a JavaScript library for building user interfaces. It allows you to create reusable UI **_components_** and manage the state of your application. React is **_component-based_**, it is **_declarative_**, and driven by **_state_**.

### Component-based

A component is a JS function that returns a piece of the UI (Contains _content_ and _functionality_).

### Declarative

Components are built in a declarative way, which means that we only describe what the UI should look like using _JSX_ (JavaScript XML) and **not** how JS should create the UI. We never manipulate the DOM directly. React takes care of updating the DOM for us.

### State

React is driven by state. State is the _data_ that the UI is based on. When we change the state in a component, React automatically updates the UI/DOM to reflect the new state. This keeps the data and UI in **sync**. React makes the synchronization between the data and the UI very efficient versus vanilla JS.

Libraries, such as React, also _enforce_ a less buggy way of writing application code.

### Setup React Project

1. `npx create-react-app project-name`
2. Open `index.js` within the `src` folder.
3. Delete the `reportWebVitals.js` import and the `reportWebVitals()` function call as well as CSS import and any comments in the `index.js` file.
4. Open `App.js` within the `src` folder.
5. Delete imports and everything in the `return` statement of the `App` function.
6. Add an h1 element after the `return` statement with some text.
7. Run `pnpm start` in the terminal to start the React app.

### Structure of React Project

React is built of JS _components_. You can add in HTML within the components called **_JSX_**.

The only HTML within the structure of the app is the `index.html` within the public folder. The important part of the HTML is the `div` with the id of `root`. The entire application will be rendered within this `div`. Basically, React takes the DOM created by the components and _inject_ them into the `div` with the id of `root`.

The `index.js` file is the entry point of the application. It is where the React app is rendered into the DOM. The `App.js` file is the main component of the application. It is where we will build our entire application.

#### App.js

We will copy the `header` element from `index.html` within v1 dir. Starting with a blank component we will add `function App` (Component names are capitalized). Paste in the `header` content within the return of the App component and make sure to `export default App`.

Make sure all classes are changed to `className` since `class` is a reserved keyword in JS.

It is also important to return only one element from the `return` statement. If you want to return multiple elements you can wrap them in a `div` or a `React.Fragment`. A `React.Fragment` is a special component that does not create an additional DOM element. It is used to group multiple elements without adding an extra node to the DOM.

Paste the images into the `public` folder and start by pasting the `main.css` into the `src` folder.

Any external links such as Google Fonts will be pasted in the index.html file within the public folder of the React app.

For example:

```jsx
function App() {
  return (
    <header class="header">
      <div class="logo">
        <img src="./assets/logo.png" alt="Logo image of a chat bubble." />
        <h1>Full-Stack Web App</h1>
      </div>
      <button class="btn btn--large btn-open">Share a fact</button>
    </header>
  );
}

export default App;
```

### Components

For now we will add the other components to the `App.js` file. Later we will create separate files for each component.

1. Create `CategoryFilter()` function and return a placeholder within an `aside` for now.
2. Create `FactsList()` function and return a placeholder within `section` for now.
3. Wrap the components in the `App()` component in `main` element.

Because `App()` is a function we can create more functionality within it (i.e. variables and states).

Each component within the `App()` can be reused and even inside the **_child_** components as well.

### List of Facts

1. Copy over the CATEGORIES and initialFacts arrays from the v1 dir to the `App.js` file.
2. Create a new variable called `facts` and assign it to the `initialFacts` array. This will be within the FactsList component. This will be temporary until we connect to the Supabase database.
3. We then create an unordered list inside the FactsList section. We copy over `facts-list` ul from v1 `index.html`.
4. Inside the `ul` we want to create an `li` for each fact in the array. With vanilla JS we used a map to loop over each object in the array and outputted **HTML**. In React we will use the `map` method to loop over the array and return a new array of **JSX** elements. In React we load JSX inside curly braces by `facts.map()` to loop over the facts array and return an `li` for each fact. In vanilla JS we had to use a string template literal to create the HTML, join the HTML, and manually enter it into the DOM using `insertAdjacentHTML`. In React we can use JSX to create the HTML directly in the return statement.
5. Replace `<li>Fact</li>` with one of the li elements from the v1 `index.html`.
6. Instead of inline styles, in React we write the style declaration inside curly braces. Then we need to provide an object with the style properties (another curly braces). Lastly, we change `background-color` to `backgroundColor` and put the hex value in a string.
7. Now dynamically load `fact.text`, `fact.source`, and `fact.votes...` into the JSX.
8. For fact.category we will use the `find` method to get the color from the CATEGORIES array. We will use the `fact.category` to find the category object in the CATEGORIES array and then get the color property from that object. You do not need the `${}` because we are already in JS curly braces.
9. We need to give each of the elements inside the map a unique name or key. We do this by specifying the id from the fact object as the key. This is important for React to keep track of the elements and update them correctly.

For example:

```jsx
function FactsList() {
  // temporary variable. Only used until we have the real data from Supabase.
  const facts = initialFacts;

  return (
    <section>
      <ul className="facts-list">
        {facts.map((fact) => (
          <li className="fact" key={fact.id}>
            <p>
              {fact.text}
              <a
                className="source"
                href={fact.source}
                target="_blank"
                rel="noopener noreferrer"
              >
                (Source)
              </a>
            </p>
            <span
              className="tag"
              style={{
                backgroundColor: CATEGORIES.find(
                  (cat) => cat.name === fact.category
                ).color,
              }}
            >
              {fact.category}
            </span>
            <div className="vote-buttons">
              <button>👍 {fact.votesInteresting}</button>
              <button>🤯 {fact.votesMindblowing}</button>
              <button>⛔️ {fact.votesFalse}</button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
```

### Props

Create a component for the facts called `Fact()`. Within this component we will add the full `li` element from the `FactsList` component. Now within the FactsList component we can simply pass in the new Fact component as `<Fact />`.

We now have an issue with the `fact` being passed into the `li` element. It was coming from the variable `facts` and the **mapping** of fact in the `FactsList` component. In vanilla JS we would simply pass fact into the function as an argument. In React we can pass in fact as a **_prop_** to pass data from one component to another.

In the `<Fact />` component we pass in `factObj={fact}` as a prop. Now we need to receive the `factObj` data inside the `Fact` component. We do not put in `factObj`, but instead we pass in `props`. You will see in the console that `factObj` will show as it is the prop passed in.

Now within the li element we can pass in `props.factObj.text`, `props.factObj.source`, etc. to get the data from the prop. We can also destructure the `props` object to make it cleaner. Destructure inside the function parameters by passing in `({ factObj })` and then we can use `factObj.text`, etc. without the `props` keyword. Also make sure to move the key prop to the `Fact` component as well.

Let us now list out how many facts are in the list. `<p>There are {facts.length} facts in the database.</p>`.

> [!NOTE]
> In the vanilla JS app we wrap the whole app in a `div` with class of `container`. In React the whole app is wrapped in the `div` with id of `root`. So let's update the CSS to reflect this.

### Rendering List of Categories

1. Copy one of the `li` elements from `v1/index.html` for the category buttons.
2. Update class to className and inline styles to `style={{backgroundColor: "#000000"}}`.

We want to render a list of buttons for each category in the `CATEGORIES` array.

1. First we create a `CATEGORIES.map()` method to map over the array and return a button for each category.
2. For now, we paste the `li` from before within the map and we get the technology button for each of the categories in the array.
3. We need to now get the data from `cat` by adding curly braces (`{cat.name}`) in place of Technology text. Also we change the hardcoded color to `cat.color`.
4. Now add in _All_ categories `li` from `v1/index.html`.
5. Add key prop to each `li`. Both the name and color from the `CATEGORIES` array are unique so we can use either one as the key.

### React State

Classic example of state is a counter.

1. Create a functional component called `Counter()`.
2. return `div` with number and `button` to increment the number.
3. Include the `Counter()` component in the App component.

How do we handle the button click in React? In Vanilla JS we would add an event listener to the button. In React we can use the `onClick` prop to add an event handler to the button. We pass in a function that will be called when the button is clicked (Other examples are onMouseOver, onMouseOut, onChange, etc.).

1. Add the `onClick` prop to the button and pass in a `console.log` for now to log click.

Now we will add the functionality to increment the number on button click. In vanilla JS we would most likely select the span element and change the text content of it. In React this is when we would use **_state_**. The `useState` hook comes from the React library so we have to import it. If you console log `useState` you will see that it returns an array with the initial state of `0` then `f`. the `f` is a function we can use to update the state.

1. Initiate state by adding `useState(0)` to the Counter function/component and pass in an initial value of 0. Store the `useState` value in a variable.
2. Since `useState` is an array we will _destructure_ it to `count` and `setCount`.
3. Replace the number in the span to the count value (The count value is whatever we set in the useState parameter).
4. Now replace the console log in the button to the `setCount()` function. Whatever is passed into the `setCount` function will become the new value of `count`.
5. In order to increment by one we will have to pass in a callback function to `setCount`. The callback has the argument of the current `count` and a return of the current count plus one (Current count can be any label such as `c`).

> [!NOTE]
> Updating the count state will re-render the entire component so React will call the `Counter` function again.
> This means the JSX will be regenerated and returned again.

By executing the function over and over is why we call React **_declarative_**.

For example, know that we want the `count` to be 4, but we never tell React how we get that value of 4. We update the state and React takes care of the rest.

We do not need to manually update the DOM like we did in vanilla JS. Vanilla JS is **_imperative_** and requires explicit instructions on how to update the DOM and manage changes.

### Toggle Display of Fact Form

1. Create a state variable in the `App()` component. Variable destructure `showForm` and `setShowForm` equal to `useState` with default value of `false` so we do _not_ show the form.
2. Now we use the ternary operator to render the form based on a condition. If `showForm` is true, render the form component; otherwise, render a button to show the form. If `showForm` is `true` then we want `NewFactForm`, but if not true then we want nothing or `null`. Now the form defaults to not showing.
3. To show the form we need to add an `onClick` event to the "share a fact" button. Set `onClick` to a anonymous function that will call `setShowForm` to true. This will show the form when the button is clicked.
4. The issue now is that we are only setting the state to true. We need to read the current state by setting a callback function with `show` as the parameter and returning the **_not operator_** for show (The illogical operator `!` returns the opposite value of `show` or the boolean). Therefore on each button click true becomes false and false becomes true.

The **three** parts of using state are:

1. to _define_ the state variable (`const [showForm, setShowForm] = useState(false);`).
2. _Use_ state variable (`{showForm ? <NewFactForm /> : null}`).
3. `Update` state variable (`onClick={() => setShowForm((show) => !show)}`).

### Create the Header Component

1. Move the header element out of `App()` component and into its own component called `Header()`.
2. We cannot move the `setShowForm` into the new `Header()` component because it is needed in the `App()` component as well so not in the same scope because `Header()` is a **_child_** component. Therefore we pass the `setShowForm` into the `<Header />` component call in `App()` as a prop. We can call the prop anything but we need to call the `setShowForm` function within the prop.
3. Now we can bring in the `setShowForm` prop into the `Header()` component. If we named the prop something different we would have to make sure the same name is used in the `Header()` component (We will call it `ssFormObj` to specify).

We want to have the form button change to close when the form is open so we need to not only pass in the `setShowForm` function but also the `showForm` state variable. This will allow us to check if the form is open or not.

1. We will accomplish the above **_conditionally_**. We do this by giving `<Header />` access to `showForm` as well as a prop again (called `show`).
2. Pass in `show` as a prop to `Header()` component so that we can set the text of the "share a fact" button **_conditionally_**.
3. Now we replace the "share a fact" text with the conditional operator. If `show` is true then we want the text to be "Close" and if not true then we want the text to be "Share a fact".

### React Forms

1. Take the form elements from v1 `index.html` and paste them into the `NewFactForm()` component.
2. Use the category array data so we do not have to keep the hard-coded select options. We will loop over the array and create an option for each category. We will use `CATEGORIES.map()` to loop over the array and return an option element. The value of the option will be `cat.name`. Within the option we will have the text as `cat.name.toUpperCase()`.
3. Add a key to the option element and use `cat.name`.

When dealing with forms in React, React wants to be in complete control of the input values.

1. Create a new piece of state called `text` and the set function called `setText`, which we get from `useState` with an initial value of an **empty string**. We use the `text` as the value for the first input field.
2. Specify the value of the first input field as `text` or the **state variable**. Whatever is set as the initial state will show as the value in the text input field.
3. To handle the state in the first input field we need an event handler. Instead of `onClick` event handler we will use `onChange`.
4. The function specified in the event handler will run each time the input value changes. The argument passed into said function will be an **event object** (`e`).
5. Set the new text state to `e.target.value`.

Each time the input changes the function `{(e) => setText(e.target.value)}` will be called. The function will be called with an event object (`e`). The event contains `e.target` or the target property which is the current element. So on the _current element_ we can read the `value` property (Value is what is being written).

We then take that `value` add it to the new state variable `text`, which will reload/re-render the entire component, `text` is different and the new value will be shown in the input field. Now React is in complete control of the input field, which is why we call it a **_controlled component_** or controlled input field. Now when we need to do something with this data we have it available in the app.

> [!NOTE]
> The new state can be seen using React Dev Tools (Chrome) when we click on the `NewFactForm` component in the component tree.

Now we will repeat the same process for the sources input field and categories select element.

Now we want to dynamically decrease the character count from 200 as we type in the text input field. We want the field text to be replaced with 200 minus the length of the text. We do not need another state variable for this. We only need to create a normal variable.

1. Create variable called `textLength` and set it equal to `text.length`. The text in text.length comes from the state variable. Each time we type the `setText` function is called and the text state is updated. The `textLength` variable will always be up to date with the current length of the text.

We can react to the submit event when a user clicks the submit button.

1. Add an `onSubmit` event handler to the form element. The function will be called when the form is submitted.
2. Create a separate function called `handleSubmit` to be called within the `onSubmit` event since it will take many lines of code. This function will receive the event object as an argument.
3. Prevent default functionality by adding `e.preventDefault()` to the `handleSubmit()` function.
4. Add `handleSubmit` function to the `onSubmit` event handler. Do not add parenthesis because we will not be calling the function here, React will. Can also be called by `{() => handleSubmit()}` but that is not necessary.
5. When the form is submitted we want to take the data from text, source, and category and create new posts and then add new posts to the list and rendered to the screen. We want to use another piece of state for the list of facts.

### Adding New Facts to the List

We have falsey values in JS, which are values that are false in conditions such as an if statement. One of the falsey values is an empty string. Check if the text state variable is an empty string (nothing typed into the input field) and we also need to do the same checks for source and category fields. We check for each of the fields by adding `&&` to the if statement to check if all fields are truthy.

We also want to check that the length of the text is less than 200 characters. We check this by adding `&& textLength >= 200` to the if statement.

We also need to check that it is valid data such that the source data is a valid URL. We can use the `URL` constructor to check if the source is a valid URL. If it is not a valid URL we will throw an error. This will need to utilize a `try/catch` block and have to be outside the component so that it does not re-render the component. We then replace source from the `handleSubmit` if statement with the `isValidHttpUrl` function and pass it the source state variable. Update the useState default value to an example URL to help assist user.

Make sure to wrap all of the remaining `handleSubmit` code in the if statement so that it only runs if all of the checks are true.

#### The isValidHttpUrl is a utility function checks whether a given string is a valid HTTP or HTTPS URL. It does this by

1. The function takes a single parameter `url`, which is the string to be checked.
2. It then attempts to create a URL object using the url parameter. If the string is not a valid URL, the constructor will throw an error which is caught in the `catch` block.
3. If an error occurs during the creation of the URL object, the function returns false which indicates the input is not a valid URL.
4. If the URL object is successfully created, the function checks whether the protocol of the URL is either `http:` or `https:`. If the protocol matches, the function returns true, otherwise it returns false.

```jsx
function isValidHttpUrl(url) {
  let urlObj;

  try {
    urlObj = new URL(url);
  } catch (err) {
    return false;
  }
  return urlObj.protocol === "http:" || urlObj.protocol === "https:";
}
```

Now we will create a `newFact` object so that we can add it to the facts array. It needs to look like the objects in the `initialFacts` array.

1. Copy one of the objects from the `initialFacts` array and paste it into the `handleSubmit` function.
2. Make sure you dynamically add year using `new Date().getFullYear()` to the `createdIn` property and start with 0 `votes`.
3. The text property should be equal to the `text` state variable (When this happens you can remove the key value and just have it written as `text`).
4. Do the same for `source` and `category`.
5. For `id` do `Math.round(Math.random() * 1000000)` to get a random number between 0 and 1000000. This will be the id of the new fact. This is not ideal for a real app where we will get IDs from supabase.

Create a new piece of state to add fact to UI. Now it is time to replace `const facts = initialFacts;` within the `FactsList` component.

1. Replace the `facts` variable in `FactsList` component with `const [facts, setFacts] = useState(initialFacts)`. This allows us to be able to update initial facts and the UI will auto update.
2. We also need the state from `FactsList` in the `NewFactForm` component. This is because in order to add a new fact, we will need access to the `setFacts` function. We do this by placing it within app which is the parent of both components.
3. Pass `facts` and `setFacts` as props. First add `factsObj={facts}` to the `FactsList` component call within `App` then destructure `factsObj` in the `FactsList` component.
4. We now need the `setFacts` function inside of the form using `setFactsObj` equal to `setFacts`.
5. Destructure `setFactsObj` in the `NewFactForm` component.

One component uses the state (`FactsList`) and the other component updates the state (`NewFactForm`).

Now we can update the state within the `handleSubmit` function.

1. Add `setFactsObject` to the `handleSubmit` function.
2. Determine what the new state should be (What is passed into `setFactsObj()`). What we want as the new state is the current state plus whatever we get from `newFact` added to it.
3. The above is done by using a callback function to set previous state to new state. We return an array to the callback function (cb). Within the array it should include `newFact` plus the **spread operator** to be used to take of all elements from a previous fact array and place them back into the new array.

Now we need to **reset** the values remaining in the form. We will use the `setText`, `setSource`, and `setCategory` variables again by setting them to empty strings. This will ensure that the form is cleared after submission, allowing the user to enter a new fact without any previous data lingering in the input fields.

Now we will **close** the form. We have done this before by using the `setShowForm` state. We will set the state to false. When set to false `null` will be rendered (See header component). So in order to do this we need to give access to the function that updates the state:

1. We (`{showForm...}` we add `setShowFormObj={setShowForm}`) to the form.
2. Destructure `setShowFormObj` in the `NewFactForm` component parameter.
3. Add setShowFormObj to the `handleSubmit` function and set to false.
