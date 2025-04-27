import "./main.css";

function App() {
  const appTitle = "Full-Stack Web App";

  return (
    <>
      {/* HEADER */}
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
        <button className="btn btn--large btn-open">Share a fact</button>
      </header>

      <NewFactForm />

      <main className="main">
        <CategoryFilter />
        <FactsList />
      </main>
    </>
  );
}

function NewFactForm() {
  return <form className="fact-form">Fact form</form>;
}

function CategoryFilter() {
  return <aside>Category filter</aside>;
}

function FactsList() {
  return <section>Facts list</section>;
}

export default App;
