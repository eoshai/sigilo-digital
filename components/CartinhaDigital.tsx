import React, { useState, useEffect } from 'react';
import { Star, Heart, Sparkles, Mail, Lock, Plus, Edit2, Trash2, LogOut, Search, StarHalfIcon, StarsIcon, LockIcon, LockKeyhole, HeartPlus } from 'lucide-react';

// API
const api = {
  login(email, password) {
    return email === "contato.shai@proton.me" && password === "OiOi()()";
  },

  async getCartinha(id) {
    const res = await fetch(`/api/cartinhas/${id}`, { cache: "no-store" });
    if (!res.ok) return null;
    return res.json();
  },

  async getAllCartinhas() {
    const res = await fetch(`/api/cartinhas`, { cache: "no-store" });
    return res.json();
  },

  async createCartinha(data) {
    const res = await fetch(`/api/cartinhas`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async updateCartinha(id, data) {
    const res = await fetch(`/api/cartinhas/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
    return res.json();
  },

  async deleteCartinha(id) {
    await fetch(`/api/cartinhas/${id}`, {
      method: "DELETE",
    });
  },
};


// Componente Principal
export default function CartinhaDigitalComponent() {
  const [view, setView] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentCartinha, setCurrentCartinha] = useState(null);
  const [searchId, setSearchId] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearchCartinha = async () => {
    if (!searchId.trim()) return;
    
    setLoading(true);
    const cartinha = await api.getCartinha(searchId.trim());
    setLoading(false);
    
    if (cartinha) {
      setCurrentCartinha(cartinha);
      setView('cartinha');
    } else {
      setView('notfound');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setView('home');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {view === 'home' && (
        <HomePage 
          searchId={searchId}
          setSearchId={setSearchId}
          onSearch={handleSearchCartinha}
          onAdminClick={() => setView('login')}
          loading={loading}
        />
      )}
      
      {view === 'notfound' && (
        <NotFoundPage onBack={() => setView('home')} />
      )}
      
      {view === 'cartinha' && currentCartinha && (
        <CartinhaPage 
          cartinha={currentCartinha}
          onBack={() => {
            setView('home');
            setSearchId('');
            setCurrentCartinha(null);
          }}
        />
      )}
      
      {view === 'login' && !isLoggedIn && (
        <LoginPage 
          onLogin={() => {
            setIsLoggedIn(true);
            setView('admin');
          }}
          onBack={() => setView('home')}
        />
      )}
      
      {view === 'admin' && isLoggedIn && (
        <AdminPanel onLogout={handleLogout} />
      )}
    </div>
  );
}

// Página Inicial
function HomePage({ searchId, setSearchId, onSearch, onAdminClick, loading }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <LockKeyhole className="w-16 h-16 text-blue-400" fill="currentColor" />
              <HeartPlus className="w-6 h-6 text-purple-400 absolute -top-2 -right-2" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-slate-800 mb-2" style={{fontFamily: 'Montserrat, sans-serif'}}>
            Sigilo Digital
          </h1>
          <p className="text-slate-600">Algo especial te aguarda... <StarsIcon className="w-4 h-4 inline" /></p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 animate-slide-up">
          <label className="block text-sm font-medium text-slate-700 mb-2" style={{fontFamily: 'Montserrat, sans-serif'}}>
            Digite o ID do seu presente
          </label>
          <input
            type="text"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && onSearch()}
            placeholder="Ex: amigo-especial-2025"
            className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-400 focus:outline-none transition-colors"
            disabled={loading}
          />
          
          <button
            onClick={onSearch}
            disabled={loading || !searchId.trim()}
            className="w-full mt-4 bg-gradient-to-r from-blue-400 to-purple-400 text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{fontFamily: 'Montserrat, sans-serif'}}
          >
            {loading ? 'Procurando...' : 'Abrir Presente 🧧'}
          </button>

          <button
            onClick={onAdminClick}
            className="w-full mt-3 text-slate-500 text-sm hover:text-slate-700 transition-colors"
          >
            Área administrativa
          </button>
        </div>

        <div className="text-center mt-6 text-slate-400 text-sm">
          Efetue o seu pedido agora mesmo! <Heart className="w-4 h-4 inline" />
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap');
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slide-up {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}

// Página Não Encontrada
function NotFoundPage({ onBack }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="text-8xl mb-6">😅</div>
        <h2 className="text-3xl font-bold text-slate-800 mb-3" style={{fontFamily: 'Montserrat, sans-serif'}}>
          Hmm... não achei nada com esse ID
        </h2>
        <p className="text-slate-600 mb-8">
          Verifique se digitou certinho ou peça ao seu amigo o ID correto!
        </p>
        <button
          onClick={onBack}
          className="bg-gradient-to-r from-blue-400 to-purple-400 text-white px-8 py-3 rounded-xl font-medium hover:shadow-lg transition-all"
          style={{fontFamily: 'Montserrat, sans-serif'}}
        >
          Tentar novamente
        </button>
      </div>
    </div>
  );
}

// Página da Cartinha
function CartinhaPage({ cartinha, onBack }) {
  const [currentPhoto, setCurrentPhoto] = useState(0);

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={onBack}
          className="mb-6 text-slate-600 hover:text-slate-800 transition-colors"
        >
          ← Voltar
        </button>

        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 animate-fade-in">
          {cartinha.nome && (
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-slate-800 mb-2" style={{fontFamily: 'Montserrat, sans-serif'}}>
                Para {cartinha.nome} ✨
              </h1>
              <div className="flex justify-center gap-1">
                <Star className="w-4 h-4 text-purple-400" fill="currentColor" />
                <Star className="w-4 h-4 text-blue-400" fill="currentColor" />
                <Star className="w-4 h-4 text-purple-400" fill="currentColor" />
              </div>
            </div>
          )}

          {cartinha.fotos && cartinha.fotos.length > 0 && (
            <div className="mb-8">
              <div className="relative rounded-2xl overflow-hidden shadow-lg mb-4">
                <img
                  src={cartinha.fotos[currentPhoto]}
                  alt={`Foto ${currentPhoto + 1}`}
                  className="w-full h-80 object-cover"
                />
              </div>
              
              {cartinha.fotos.length > 1 && (
                <div className="flex justify-center gap-2">
                  {cartinha.fotos.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPhoto(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        currentPhoto === index
                          ? 'bg-blue-400 w-8'
                          : 'bg-slate-300 hover:bg-slate-400'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="prose max-w-none mb-8">
            <p className="text-slate-700 text-lg leading-relaxed whitespace-pre-wrap">
              {cartinha.texto}
            </p>
          </div>

          {cartinha.spotify_embed && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-slate-800 mb-4" style={{fontFamily: 'Montserrat, sans-serif'}}>
                Ouça essa música especial 🎵
              </h3>
              <div 
                dangerouslySetInnerHTML={{ __html: cartinha.spotify_embed }}
                className="rounded-xl overflow-hidden shadow-md"
              />
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-slate-200 text-center text-slate-400 text-sm">
            Criado com 💛 no Cartinha Digital
          </div>
        </div>
      </div>
    </div>
  );
}

// Página de Login
function LoginPage({ onLogin, onBack }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const success = await api.login(email, password);
    
    setLoading(false);

    if (success) {
      onLogin();
    } else {
      setError('Email ou senha incorretos 😕');
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <button
          onClick={onBack}
          className="mb-6 text-slate-600 hover:text-slate-800 transition-colors"
        >
          ← Voltar
        </button>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800" style={{fontFamily: 'Montserrat, sans-serif'}}>
              Área Administrativa
            </h2>
          </div>

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Digite o email"
                  className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-400 focus:outline-none transition-colors"
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Digite a senha"
                  className="w-full pl-10 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-400 focus:outline-none transition-colors"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-xl text-sm text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-400 to-purple-400 text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all disabled:opacity-50"
              style={{fontFamily: 'Montserrat, sans-serif'}}
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// Painel Admin
function AdminPanel({ onLogout }) {
  const [view, setView] = useState('list');
  const [cartinhas, setCartinhas] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCartinhas();
  }, []);

  const loadCartinhas = async () => {
    setLoading(true);
    const data = await api.getAllCartinhas();
    setCartinhas(data);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (confirm('Tem certeza que deseja excluir esta cartinha?')) {
      await api.deleteCartinha(id);
      loadCartinhas();
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-slate-800" style={{fontFamily: 'Montserrat, sans-serif'}}>
              Painel Admin
            </h1>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Sair
            </button>
          </div>
        </div>

        {view === 'list' && (
          <CartinhasList
            cartinhas={cartinhas}
            onNew={() => {
              setEditingId(null);
              setView('form');
            }}
            onEdit={(id) => {
              setEditingId(id);
              setView('form');
            }}
            onDelete={handleDelete}
            loading={loading}
          />
        )}

        {view === 'form' && (
          <CartinhaForm
            cartinhaId={editingId}
            onSave={() => {
              loadCartinhas();
              setView('list');
            }}
            onCancel={() => setView('list')}
          />
        )}
      </div>
    </div>
  );
}

// Lista de Cartinhas
function CartinhasList({ cartinhas, onNew, onEdit, onDelete, loading }) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-slate-800" style={{fontFamily: 'Montserrat, sans-serif'}}>
          Cartinhas Criadas ({cartinhas.length})
        </h2>
        <button
          onClick={onNew}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-400 to-purple-400 text-white px-4 py-2 rounded-xl font-medium hover:shadow-lg transition-all"
          style={{fontFamily: 'Montserrat, sans-serif'}}
        >
          <Plus className="w-5 h-5" />
          Nova Cartinha
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12 text-slate-500">Carregando...</div>
      ) : cartinhas.length === 0 ? (
        <div className="text-center py-12">
          <Sparkles className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500">Nenhuma cartinha criada ainda</p>
        </div>
      ) : (
        <div className="space-y-4">
          {cartinhas.map((cartinha) => (
            <div
              key={cartinha.id}
              className="flex items-center justify-between p-4 border-2 border-slate-200 rounded-xl hover:border-blue-300 transition-colors"
            >
              <div className="flex-1">
                <h3 className="font-semibold text-slate-800" style={{fontFamily: 'Montserrat, sans-serif'}}>
                  {cartinha.nome || 'Sem nome'}
                </h3>
                <p className="text-sm text-slate-500">ID: {cartinha.id}</p>
                <p className="text-xs text-slate-400 mt-1">
                  Criado em {new Date(cartinha.created_at).toLocaleDateString('pt-BR')}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => onEdit(cartinha.id)}
                  className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Edit2 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => onDelete(cartinha.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Formulário de Cartinha
function CartinhaForm({ cartinhaId, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    id: '',
    nome: '',
    fotos: [''],
    texto: '',
    spotify_embed: ''
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (cartinhaId) {
      loadCartinha();
    }
  }, [cartinhaId]);

  const loadCartinha = async () => {
    const cartinha = await api.getCartinha(cartinhaId);
    if (cartinha) {
      setFormData(cartinha);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const cleanData = {
      ...formData,
      fotos: formData.fotos.filter(f => f.trim())
    };

    if (cartinhaId) {
      await api.updateCartinha(cartinhaId, cleanData);
    } else {
      await api.createCartinha(cleanData);
    }

    setSaving(false);
    onSave();
  };

  const addFotoField = () => {
    if (formData.fotos.length < 5) {
      setFormData({ ...formData, fotos: [...formData.fotos, ''] });
    }
  };

  const removeFotoField = (index) => {
    const newFotos = formData.fotos.filter((_, i) => i !== index);
    setFormData({ ...formData, fotos: newFotos });
  };

  const updateFoto = (index, value) => {
    const newFotos = [...formData.fotos];
    newFotos[index] = value;
    setFormData({ ...formData, fotos: newFotos });
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <h2 className="text-xl font-semibold text-slate-800 mb-6" style={{fontFamily: 'Montserrat, sans-serif'}}>
        {cartinhaId ? 'Editar Cartinha' : 'Nova Cartinha'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            ID único *
          </label>
          <input
            type="text"
            value={formData.id}
            onChange={(e) => setFormData({ ...formData, id: e.target.value })}
            placeholder="Ex: amigo-especial-2025"
            className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-400 focus:outline-none"
            required
            disabled={!!cartinhaId}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Nome da pessoa
          </label>
          <input
            type="text"
            value={formData.nome}
            onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
            placeholder="Ex: João"
            className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-400 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Fotos (URLs) - máximo 5
          </label>
          {formData.fotos.map((foto, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="url"
                value={foto}
                onChange={(e) => updateFoto(index, e.target.value)}
                placeholder="https://exemplo.com/foto.jpg"
                className="flex-1 px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-400 focus:outline-none"
              />
              {formData.fotos.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeFotoField(index)}
                  className="px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
            </div>
          ))}
          {formData.fotos.length < 5 && (
            <button
              type="button"
              onClick={addFotoField}
              className="text-sm text-blue-500 hover:text-blue-700 transition-colors"
            >
              + Adicionar foto
            </button>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Texto personalizado *
          </label>
          <textarea
            value={formData.texto}
            onChange={(e) => setFormData({ ...formData, texto: e.target.value })}
            placeholder="Escreva sua mensagem especial aqui..."
            rows={8}
            className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-400 focus:outline-none resize-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Embed do Spotify (código iframe completo)
          </label>
          <textarea
            value={formData.spotify_embed}
            onChange={(e) => setFormData({ ...formData, spotify_embed: e.target.value })}
            placeholder='<iframe src="https://open.spotify.com/embed/track/..." width="100%" height="352"></iframe>'
            rows={3}
            className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-400 focus:outline-none resize-none font-mono text-sm"
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={saving}
            className="flex-1 bg-gradient-to-r from-blue-400 to-purple-400 text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all disabled:opacity-50"
            style={{fontFamily: 'Montserrat, sans-serif'}}
          >
            {saving ? 'Salvando...' : 'Salvar Cartinha'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-8 py-3 border-2 border-slate-300 text-slate-700 rounded-xl font-medium hover:bg-slate-50 transition-colors"
            style={{fontFamily: 'Montserrat, sans-serif'}}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}