import { useState } from "react";
import './Home.css';

function Home() {
  const [bookName, setBookName] = useState("");
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Recupera token do localStorage
  const token = localStorage.getItem("token");

  const handleBookNameChange = (e) => {
    setBookName(e.target.value);
  };

  const handleBookSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(
        `http://localhost:8080/Book/search?Name=${encodeURIComponent(bookName)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        }
      );

      const data = await response.json();
      console.log("Resposta da API:", data);

      if (response.ok) {
        setBooks(data); // CORREÇÃO: usar o array retornado diretamente
      } else if (response.status === 401) {
        alert("Não autorizado. Faça login novamente.");
      } else {
        alert("Erro ao buscar livros");
      }
    } catch (error) {
      console.error("Erro ao buscar livros:", error);
      alert("Erro de conexão. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <h1 className="home-title">Bem-vindo à ICteca</h1>
        <p className="home-subtitle">Descubra sua próxima leitura favorita!</p>
      </header>

      <section className="search-section">
        <form onSubmit={handleBookSubmit} className="search-form">
          <div className="search-input-container">
            <input
              type="text"
              placeholder="Digite o nome do livro"
              value={bookName}
              onChange={handleBookNameChange}
              className="search-input"
              required
            />
            <button 
              type="submit" 
              className="search-button"
              disabled={isLoading}
            >
              {isLoading ? "Buscando..." : "Buscar"}
            </button>
          </div>
        </form>
      </section>

      <section className="results-section">
        {isLoading ? (
          <div className="loading">
            <div className="loading-spinner"></div>
            <p>Buscando livros...</p>
          </div>
        ) : books.length > 0 ? (
          <div className="books-grid">
            <h2 className="results-title">Resultados da pesquisa:</h2>
            {books.map((book, index) => (
              <div key={index} className="book-card">
                <div className="book-header">
                  <h3 className="book-title">{book.title}</h3>
                  <p className="book-author">
                    <span className="author-label">Por:</span> {book.authorName}
                  </p>
                </div>
                <div className="book-description">
                  <p>{book.description}</p>
                </div>
              </div>
            ))}
          </div>
        ) : bookName && !isLoading ? (
          <div className="no-results">
            <p>Nenhum livro encontrado para "{bookName}".</p>
            <p>Tente uma pesquisa diferente.</p>
          </div>
        ) : null}
      </section>
    </div>
  );
}

export default Home;
