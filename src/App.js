import "./main.css";

function App() {
  return (
    <header className="header">
      <div class="logo">
        <img
          src="logo.png"
          alt="Logo of a chat bubble."
          height={68}
          width={68}
        />
        <h1>Full-Stack Web App</h1>
      </div>
      <button className="btn btn--large btn-open">Share a fact</button>
    </header>
  );
}

export default App;
