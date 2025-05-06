import { useEffect, useState } from "react";
import supabase from "./supabase";
import "./main.css";

// const initialFacts = [
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

// Counter example to demo state.
// ? function Counter() {
//   // ? const x = useState(0);
// // const [state variable, state updater function] = useState(initialValue);
//   ? const [count, setCount] = useState(0);
//   // ? console.log(x);

//   ? return (
//     ? <div>
//       {/* <span style={{ fontSize: "40px" }}>8</span> */}
//       ? <span style={{ fontSize: "2.5rem", marginRight: "1rem" }}>{count}</span>
//       {/* <button className="btn btn--large" onClick={() => console.log("Clicked")}>
//         +1
//       </button> */}
//       ? <button className="btn btn--large" onClick={() => setCount((c) => c + 1)}>
//         ? +1
//       ? </button>
//     ? </div>
//   ? );
// ? }

function App() {
  // const [state variable, state updater function] = useState(initialValue);
  const [showForm, setShowForm] = useState(false);
  // Moved from the FactsList component.
  // const [facts, setFacts] = useState(initialFacts);
  const [facts, setFacts] = useState([]);

  useEffect(function () {
    async function getFacts() {
      const { data: facts, error } = await supabase.from("facts").select("*");
      // ? console.log(facts);
      setFacts(facts);
    }
    getFacts();
  }, []);

  return (
    <>
      <Header show={showForm} ssFormObj={setShowForm} />

      {showForm ? (
        <NewFactForm setFactsObj={setFacts} setShowFormObj={setShowForm} />
      ) : null}
      {/* <Counter /> */}
      {/* <NewFactForm /> */}

      <main className="main">
        <CategoryFilter />
        <FactsList factsObj={facts} />
      </main>
    </>
  );
}

function Header({ show, ssFormObj }) {
  const appTitle = "Full-Stack Web App";

  return (
    <header className="header">
      <div className="logo">
        <img
          src="logo.png"
          alt="Logo of a chat bubble."
          height={68}
          width={68}
        />
        {/* <h1>Full-Stack Web App</h1> */}
        <h1>{appTitle}</h1>
      </div>
      {/* <button
          className="btn btn--large btn-open"
          onClick={() => setShowForm(true)}
        > */}
      <button
        className="btn btn--large btn-open"
        onClick={() => ssFormObj((show) => !show)}
      >
        {/* Share a fact */}
        {show ? "Close" : "Share a fact"}
      </button>
    </header>
  );
}

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

function isValidHttpUrl(url) {
  let urlObj;

  try {
    urlObj = new URL(url);
  } catch (err) {
    return false;
  }
  return urlObj.protocol === "http:" || urlObj.protocol === "https:";
}

function NewFactForm({ setFactsObj, setShowFormObj }) {
  const [text, setText] = useState("");
  const [source, setSource] = useState("https://www.example.com");
  const [category, setCategory] = useState("");
  const textLength = text.length;

  function handleSubmit(e) {
    // 1. Prevent the browser reload.
    e.preventDefault();
    // Check if working by logging all state variables.
    // ? console.log(text, source, category);

    // 2. Check if the data is valid. Check to see if text, source, and category are not empty. If so, create a new fact.
    // ? if (text && source && category && textLength <= 200) {
    //   ? console.log("There is valid data!");
    // ? }
    if (text && isValidHttpUrl(source) && category && textLength <= 200) {
      // ? console.log("There is valid data!");

      // 3. Create a new fact object similar to the fact objects that are already in the array.
      const newFact = {
        id: Math.round(Math.random() * 1000000),
        // text: text,
        text,
        source,
        category,
        votesInteresting: 0,
        votesMindblowing: 0,
        votesFalse: 0,
        createdIn: new Date().getFullYear(),
      };

      // 4. Add the new fact to the user interface (UI): Add the fact to state since that is the only way the UI can be reloaded so that the new fact will show up.
      setFactsObj((facts) => [newFact, ...facts]);

      // 5. Reset the inout fields back to empty strings.
      setText("");
      setSource("");
      setCategory("");

      // 6. Close the form.
      setShowFormObj(false);
    }
  }

  return (
    <form className="fact-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Share a fact with the world."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      {/* <span>200</span> */}
      <span>{200 - textLength}</span>
      <input
        value={source}
        type="text"
        placeholder="Trustworthy source..."
        onChange={(e) => setSource(e.target.value)}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Choose category:</option>
        {/* <option value="technology">Technology</option>
        <option value="science">Science</option> */}
        {CATEGORIES.map((cat) => (
          <option key={cat.name} value={cat.name}>
            {cat.name.toUpperCase()}
          </option>
        ))}
      </select>
      <button className="btn btn--large">Post</button>
    </form>
  );
}

function CategoryFilter() {
  return (
    <aside>
      <ul>
        <li className="category">
          <button className="btn btn--all">All</button>
        </li>

        {CATEGORIES.map((cat) => (
          <li key={cat.name} className="category">
            <button
              className="btn btn--category"
              style={{ backgroundColor: cat.color }}
            >
              {/* Technology */}
              {cat.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

// Could write props as parameter and within the function destructure it, but instead we will destructure it directly in the function parameter as factsObj.
function FactsList({ factsObj }) {
  // temporary variable. Only used until we have the real data from Supabase.
  // ? const facts = initialFacts;
  // ? const [facts, setFacts] = useState(initialFacts);

  return (
    <section>
      <ul className="facts-list">
        {factsObj.map((fact) => (
          <Fact key={fact.id} factObj={fact} />
        ))}
      </ul>
      <p>There are {factsObj.length} facts in the database. Add your own!</p>
    </section>
  );
}

// ? function Fact(props) {
// We can also destructure the props directly in the function parameter.
function Fact({ factObj }) {
  // ? console.log(props);

  // Destructuring the props.
  // ? const { factObj } = props;
  // OR
  // ? const factObj = props.factObj;

  return (
    <li className="fact">
      <p>
        {/* Do not need to include props because factObj destructure in the Fact component parameters. */}
        {/* {props.factObj.text} */}
        {factObj.text}
        <a
          className="source"
          href={factObj.source}
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
            (cat) => cat.name === factObj.category
          ).color,
        }}
      >
        {factObj.category}
      </span>
      <div className="vote-buttons">
        <button>👍 {factObj.votesInteresting}</button>
        <button>🤯 {factObj.votesMindblowing}</button>
        <button>⛔️ {factObj.votesFalse}</button>
      </div>
    </li>
  );
}

export default App;
