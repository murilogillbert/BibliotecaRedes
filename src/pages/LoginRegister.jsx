import { useState } from "react"
import './LoginRegister.css'

function LoginRegister() {
  const [activeTab, setActiveTab] = useState('login') // controla qual aba está ativa
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: ""
  })

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: ""
  })

  const [user, setUser] = useState(null) // guarda dados do usuário logado
  const [isLoading, setIsLoading] = useState(false)

  // Atualiza campos do cadastro
  const handleRegisterChange = (e) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value })
  }

  // Atualiza campos do login
  const handleLoginChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value })
  }

  // Envia cadastro
  const handleRegisterSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const response = await fetch("http://localhost:8080/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerForm)
      })

      const data = await response.json()
      console.log("Resposta do registro:", data)

      if (response.ok) {
        alert("Usuário registrado com sucesso!")
        setRegisterForm({ name: "", email: "", password: "" })
        setActiveTab('login') // muda para aba de login
      } else {
        alert("Erro: " + data.message)
      }
    } catch (error) {
      console.error("Erro no cadastro:", error)
      alert("Erro de conexão. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  // Envia login (POST)
  const handleLoginSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginForm)
      })

      const data = await response.json()
      console.log("Resposta do login:", data)

      if (response.ok) {
        setUser(data) // guarda user e token
        alert(`Bem-vindo, ${data.name}!`)
        setLoginForm({ email: "", password: "" })
      } else {
        alert("Erro: " + data.message)
      }
    } catch (error) {
      console.error("Erro no login:", error)
      alert("Erro de conexão. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    setUser(null)
    setLoginForm({ email: "", password: "" })
    setRegisterForm({ name: "", email: "", password: "" })
  }

  // Se usuário está logado, mostra perfil
  if (user) {
    return (
      <div className="login-container">
        <div className="user-profile">
          <div className="profile-header">
            <h2>Bem-vindo!</h2>
            <div className="user-avatar">
              {user.name.charAt(0).toUpperCase()}
            </div>
          </div>
          <div className="user-info">
            <div className="info-item">
              <strong>Nome:</strong> {user.name}
            </div>
            <div className="info-item">
              <strong>Email:</strong> {user.email}
            </div>
            {user.tokens?.accessToken && (
              <div className="info-item token-info">
                <strong>Status:</strong> Conectado
              </div>
            )}
          </div>
          <button onClick={handleLogout} className="logout-button">
            Sair
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="login-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>ICteca</h1>
          <p>Acesse sua conta ou crie uma nova</p>
        </div>

        <div className="tabs">
          <button 
            className={`tab-button ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => setActiveTab('login')}
          >
            Entrar
          </button>
          <button 
            className={`tab-button ${activeTab === 'register' ? 'active' : ''}`}
            onClick={() => setActiveTab('register')}
          >
            Cadastrar
          </button>
        </div>

        <div className="forms-container">
          {activeTab === 'login' && (
            <form onSubmit={handleLoginSubmit} className="auth-form">
              <h2>Fazer Login</h2>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Seu e-mail"
                  value={loginForm.email}
                  onChange={handleLoginChange}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  placeholder="Sua senha"
                  value={loginForm.password}
                  onChange={handleLoginChange}
                  className="form-input"
                  required
                />
              </div>
              <button 
                type="submit" 
                className="submit-button"
                disabled={isLoading}
              >
                {isLoading ? "Entrando..." : "Entrar"}
              </button>
            </form>
          )}

          {activeTab === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="auth-form">
              <h2>Criar Conta</h2>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Seu nome completo"
                  value={registerForm.name}
                  onChange={handleRegisterChange}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Seu e-mail"
                  value={registerForm.email}
                  onChange={handleRegisterChange}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  placeholder="Escolha uma senha"
                  value={registerForm.password}
                  onChange={handleRegisterChange}
                  className="form-input"
                  required
                />
              </div>
              <button 
                type="submit" 
                className="submit-button"
                disabled={isLoading}
              >
                {isLoading ? "Cadastrando..." : "Cadastrar"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default LoginRegister