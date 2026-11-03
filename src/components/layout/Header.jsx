// src/components/layout/Header.jsx
import React from 'react';

export function Header({ 
  view, 
  setView, 
  searchQuery, 
  setSearchQuery, 
  cartCount, 
  favCount, 
  userRole 
}) {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setView('catalog')}>
          <span className="font-serif text-2xl font-bold tracking-tight text-stone-900">
            AURA <span className="text-amber-600 font-light italic">Parfums</span>
          </span>
        </div>

        {/* Buscador de Perfumes */}
        {view === 'catalog' && (
          <div className="hidden md:flex flex-1 max-w-md mx-8 relative">
            <input 
              type="text" 
              placeholder="Buscar perfume, marca o notas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-stone-100 border border-stone-200 rounded-full text-sm focus:outline-none focus:border-amber-600"
            />
          </div>
        )}

        {/* Acciones de Usuario / Navegación */}
        <div className="flex items-center space-x-6">
          {userRole === 'admin' && (
            <button 
              onClick={() => setView('admin')}
              className={`text-sm font-semibold ${view === 'admin' ? 'text-amber-600' : 'text-stone-600'}`}
            >
              Panel Admin
            </button>
          )}

          <button onClick={() => setView('favorites')} className="relative p-2 text-stone-600 hover:text-rose-600">
            ♥ {favCount > 0 && <span className="absolute -top-1 -right-1 bg-rose-500 text-white rounded-full text-[10px] w-4 h-4 flex items-center justify-center font-bold">{favCount}</span>}
          </button>

          <button onClick={() => setView('cart')} className="relative p-2 text-stone-600 hover:text-amber-600">
            🛒 {cartCount > 0 && <span className="absolute -top-1 -right-1 bg-amber-600 text-white rounded-full text-[10px] w-4 h-4 flex items-center justify-center font-bold">{cartCount}</span>}
          </button>

          <button onClick={() => setView('profile')} className="p-2 text-stone-600 hover:text-stone-900">
            👤
          </button>
        </div>
      </div>
    </header>
  );
}