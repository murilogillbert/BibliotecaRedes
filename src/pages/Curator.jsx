import { useState } from "react"
import './Curator.css'

export default function Curator() {
  // Estados do livro
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [authorName, setAuthorName] = useState("")

  // Estados do autor
  const [authorSearch, setAuthorSearch] = useState("")
  const [authorResult, setAuthorResult] = useState(null)
  const [newAuthorName, setNewAuthorName] = useState("")
  const [newAuthorDesc, setNewAuthorDesc] = useState("")

  // Estados de loading
  const [isAddingBook, setIsAddingBook] = useState(false)
  const [isSearchingAuthor, setIsSearchingAuthor] = useState(false)
  const [isAddingAuthor, setIsAddingAuthor] = useState(false)

  // POST Book/add
  const handleAddBook = async (e) => {
    e.preventDefault()
    setIsAddingBook(true)
    
    try {
      const response = await fetch("http://localhost:8080/Book/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, authorName })
      })

      if (response.ok) {
        alert("Livro adicionado com sucesso!")
        setTitle("")
        setDescription("")
        setAuthorName("")
      } else {
        alert("Erro ao adicionar livro")
      }
    } catch (error) {
      console.error("Erro ao adicionar livro:", error)
      alert("Erro de conexão. Tente novamente.")
    } finally {
      setIsAddingBook(false)
    }
  }

  // GET Author/search
  const handleSearchAuthor = async (e) => {
    e.preventDefault()
    setIsSearchingAuthor(true)
    
    try {
      const response = await fetch(
        `http://localhost:8080/Author/search?Name=${encodeURIComponent(authorSearch)}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" }
        }
      )

      const data = await response.json()
      if (response.ok) {
        setAuthorResult(data)
      } else {
        setAuthorResult(null)
        alert("Autor não encontrado")
      }
    } catch (error) {
      console.error("Erro ao buscar autor:", error)
      alert("Erro de conexão. Tente novamente.")
    } finally {
      setIsSearchingAuthor(false)
    }
  }

  // POST Author/add
  const handleAddAuthor = async (e) => {
    e.preventDefault()
    setIsAddingAuthor(true)
    
    try {
      const response = await fetch("http://localhost:8080/Author/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newAuthorName, description: newAuthorDesc })
      })

      if (response.ok) {
        alert("Autor adicionado com sucesso!")
        setNewAuthorName("")
        setNewAuthorDesc("")
      } else {
        alert("Erro ao adicionar autor")
      }
    } catch (error) {
      console.error("Erro ao adicionar autor:", error)
      alert("Erro de conexão. Tente novamente.")
    } finally {
      setIsAddingAuthor(false)
    }
  }

  return (
    <div className="curator-container">
      <header className="curator-header">
        <h1 className="curator-title">Curadoria da ICteca</h1>
        <p className="curator-subtitle">Gerencie livros e autores da biblioteca</p>
      </header>

      <div className="curator-grid">
        {/* Adicionar Livro */}
        <section className="curator-card">
          <div className="card-header">
            <div className="card-icon book-icon">📚</div>
            <h2>Adicionar Livro</h2>
          </div>
          <form onSubmit={handleAddBook} className="curator-form">
            <div className="form-group">
              <label htmlFor="book-title">Título do Livro</label>
              <input
                id="book-title"
                type="text"
                placeholder="Digite o título do livro"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="book-description">Descrição</label>
              <textarea
                id="book-description"
                placeholder="Descreva o livro"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="form-textarea"
                rows="4"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="book-author">Nome do Autor</label>
              <input
                id="book-author"
                type="text"
                placeholder="Nome do autor do livro"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="form-input"
                required
              />
            </div>
            <button 
              type="submit" 
              className="submit-button book-button"
              disabled={isAddingBook}
            >
              {isAddingBook ? "Adicionando..." : "Adicionar Livro"}
            </button>
          </form>
        </section>

        {/* Buscar Autor */}
        <section className="curator-card">
          <div className="card-header">
            <div className="card-icon search-icon">🔍</div>
            <h2>Buscar Autor</h2>
          </div>
          <form onSubmit={handleSearchAuthor} className="curator-form">
            <div className="form-group">
              <label htmlFor="author-search">Nome do Autor</label>
              <input
                id="author-search"
                type="text"
                placeholder="Digite o nome do autor"
                value={authorSearch}
                onChange={(e) => setAuthorSearch(e.target.value)}
                className="form-input"
                required
              />
            </div>
            <button 
              type="submit" 
              className="submit-button search-button"
              disabled={isSearchingAuthor}
            >
              {isSearchingAuthor ? "Buscando..." : "Buscar Autor"}
            </button>
          </form>

          {authorResult && (
            <div className="author-result">
              <h3>Autor Encontrado:</h3>
              <div className="result-card">
                <div className="result-item">
                  <strong>Nome:</strong> {authorResult.name}
                </div>
                <div className="result-item">
                  <strong>Descrição:</strong> {authorResult.description}
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Adicionar Autor */}
        <section className="curator-card">
          <div className="card-header">
            <div className="card-icon author-icon">✍️</div>
            <h2>Adicionar Autor</h2>
          </div>
          <form onSubmit={handleAddAuthor} className="curator-form">
            <div className="form-group">
              <label htmlFor="new-author-name">Nome do Autor</label>
              <input
                id="new-author-name"
                type="text"
                placeholder="Nome completo do autor"
                value={newAuthorName}
                onChange={(e) => setNewAuthorName(e.target.value)}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="new-author-desc">Biografia/Descrição</label>
              <textarea
                id="new-author-desc"
                placeholder="Biografia ou descrição do autor"
                value={newAuthorDesc}
                onChange={(e) => setNewAuthorDesc(e.target.value)}
                className="form-textarea"
                rows="4"
                required
              />
            </div>
            <button 
              type="submit" 
              className="submit-button author-button"
              disabled={isAddingAuthor}
            >
              {isAddingAuthor ? "Adicionando..." : "Adicionar Autor"}
            </button>
          </form>
        </section>
      </div>
    </div>
  )
}