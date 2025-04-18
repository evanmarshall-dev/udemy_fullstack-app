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
