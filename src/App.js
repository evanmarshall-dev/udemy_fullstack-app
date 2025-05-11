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
  const [isLoading, setIsLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("all");

  useEffect(
    function () {
      async function getFacts() {
        setIsLoading(true);

        let query = supabase.from("facts").select("*");

        if (currentCategory !== "all")
          query = query.eq("category", currentCategory);

        // ? const { data: facts, error } = await supabase
        const { data: facts, error } = await query
          // ? .from("facts")
          // ? .select("*")
          // ? .eq("category", "technology")
          // .order("text", { ascending: true });
          .order("votes_interesting", { ascending: false })
          .limit(10);
        // ? console.log(facts);
        // ? console.log(error); // Will log null if there is no error.
        if (!error) setFacts(facts);
        else alert("There was an error getting the facts from the database.");

        // ? setFacts(facts);
        setIsLoading(false);
      }
      getFacts();
      // ? }, []);
    },
    [currentCategory]
  );

  return (
    <>
      <Header showFormObj={showForm} ssFormObj={setShowForm} />

      {showForm ? (
        <NewFactForm setFactsObj={setFacts} ssFormObj={setShowForm} />
      ) : null}
      {/* <Counter /> */}
      {/* <NewFactForm /> */}

      <main className="main">
        <CategoryFilter setCurrentCatObj={setCurrentCategory} />

        {isLoading ? (
          <Loader />
        ) : (
          <FactsList factsObj={facts} setFactsObj={setFacts} />
        )}

        {/* <FactsList factsObj={facts} /> */}
      </main>
    </>
  );
}

function Loader() {
  return <p className="message">Loading...</p>;
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

function NewFactForm({ setFactsObj, ssFormObj }) {
  const [text, setText] = useState("");
  const [source, setSource] = useState("");
  const [category, setCategory] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const textLength = text.length;

  async function handleSubmit(e) {
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
      // ? const newFact = {
      //   ? id: Math.round(Math.random() * 1000000),
      //   // text: text,
      //   ? text,
      //   ? source,
      //   ? category,
      //   ? votesInteresting: 0,
      //   ? votesMindblowing: 0,
      //   ? votesFalse: 0,
      //   ? createdIn: new Date().getFullYear(),
      // ? };

      // New 3. Upload fact to Supabase and receive the new fact object.
      setIsUploading(true);

      const { data: newFact, error } = await supabase
        .from("facts")
        .insert([
          {
            text,
            source,
            category,
          },
        ])
        .select();

      setIsUploading(false);

      // Test.
      // ? console.log(newFact);

      // 4. Add the new fact to the user interface (UI): Add the fact to state since that is the only way the UI can be reloaded so that the new fact will show up.
      // ? setFactsObj((facts) => [newFact, ...facts]);
      // ? setFactsObj((facts) => [newFact[0], ...facts]);
      if (!error) setFactsObj((facts) => [newFact[0], ...facts]);

      // 5. Reset the inout fields back to empty strings.
      setText("");
      setSource("");
      setCategory("");

      // 6. Close the form.
      ssFormObj(false);
    }
  }

  return (
    <form className="fact-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Share a fact with the world."
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={isUploading}
      />
      {/* <span>200</span> */}
      <span>{200 - textLength}</span>
      <input
        value={source}
        type="text"
        placeholder="Trustworthy source..."
        onChange={(e) => setSource(e.target.value)}
        disabled={isUploading}
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        disabled={isUploading}
      >
        <option value="">Choose category:</option>
        {/* <option value="technology">Technology</option>
        <option value="science">Science</option> */}
        {CATEGORIES.map((cat) => (
          <option key={cat.name} value={cat.name}>
            {cat.name.toUpperCase()}
          </option>
        ))}
      </select>
      <button className="btn btn--large" disabled={isUploading}>
        Post
      </button>
    </form>
  );
}

function CategoryFilter({ setCurrentCatObj }) {
  return (
    <aside>
      <ul>
        <li className="category">
          <button
            className="btn btn--all"
            onClick={() => setCurrentCatObj("all")}
          >
            All
          </button>
        </li>

        {CATEGORIES.map((cat) => (
          <li key={cat.name} className="category">
            <button
              className="btn btn--category"
              style={{ backgroundColor: cat.color }}
              onClick={() => setCurrentCatObj(cat.name)}
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

function FactsList({ factsObj, setFactsObj }) {
  // temporary variable. Only used until we have the real data from Supabase.
  // ? const facts = initialFacts;
  // ? const [facts, setFacts] = useState(initialFacts);
  if (factsObj.length === 0)
    return (
      <p className="message">
        No facts available for this category currently. Please select a
        different category or create a fact for this category 👍
      </p>
    );

  return (
    <section>
      <ul className="facts-list">
        {factsObj.map((fact) => (
          <Fact key={fact.id} factObj={fact} setFactsObj={setFactsObj} />
        ))}
      </ul>
      <p>
        There are {factsObj.length} facts loaded from the database. Add your
        own!
      </p>
    </section>
  );
}

// ? function Fact(props) {
// We can also destructure the props directly in the function parameter.
function Fact({ factObj, setFactsObj }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const isDisputed =
    factObj.votes_interesting + factObj.votes_mindblowing < factObj.votes_false;

  // ? console.log(props);

  // Destructuring the props.
  // ? const { factObj } = props;
  // OR
  // ? const factObj = props.factObj;
  async function handleVote(voteType) {
    setIsUpdating(true);

    const { data: updatedFact, error } = await supabase
      .from("facts")
      // ? .update({
      //   ? votes_interesting: factObj.votes_interesting + 1,
      // ? })
      // ? .update({
      //   ? ["votes_interesting"]: factObj["votes_interesting"] + 1,
      // ? })
      .update({
        [voteType]: factObj[voteType] + 1,
      })
      .eq("id", factObj.id)
      .select();

    setIsUpdating(false);

    // Test.
    // ? console.log(updatedFact);
    if (!error)
      setFactsObj((facts) =>
        facts.map((f) => (f.id === factObj.id ? updatedFact[0] : f))
      );
  }

  return (
    <li className="fact">
      <p>
        {isDisputed ? <span className="disputed">[⛔️ DISPUTED]</span> : null}

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
        {/* <button onClick={handleVote} disabled={isUpdating}>
          👍 {factObj.votes_interesting}
        </button> */}
        <button
          onClick={() => handleVote("votes_interesting")}
          disabled={isUpdating}
        >
          👍 {factObj.votes_interesting}
        </button>
        <button
          onClick={() => handleVote("votes_mindblowing")}
          disabled={isUpdating}
        >
          🤯 {factObj.votes_mindblowing}
        </button>
        <button onClick={() => handleVote("votes_false")} disabled={isUpdating}>
          ⛔️ {factObj.votes_false}
        </button>
      </div>
    </li>
  );
}

export default App;
