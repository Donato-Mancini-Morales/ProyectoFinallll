// src/components/user/UserProfile.jsx
import React from 'react';

export function UserProfile({ user, addresses = [], orders = [] }) {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="bg-white p-8 rounded-2xl border border-stone-200">
        <h2 className="text-2xl font-bold text-stone-900 mb-4">Perfil de Socio / Cliente</h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-stone-400 block text-xs">Nombre Completo:</span>
            <span className="font-semibold text-stone-800">{user?.nombre || 'Juan Pérez'}</span>
          </div>
          <div>
            <span className="text-stone-400 block text-xs">Email:</span>
            <span className="font-semibold text-stone-800">{user?.email || 'socio@perfumeria.com'}</span>
          </div>
        </div>
      </div>

      {/* Direcciones Guardadas */}
      <div className="bg-white p-8 rounded-2xl border border-stone-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-stone-900">Mis Direcciones de Envío</h3>
          <button className="text-xs bg-stone-900 text-white px-3 py-1.5 rounded-lg font-semibold hover:bg-amber-600">
            + Nueva Dirección
          </button>
        </div>
        <div className="space-y-3">
          <div className="border border-stone-200 p-4 rounded-xl flex justify-between items-center">
            <div>
              <span className="font-bold text-sm block">Domicilio Principal</span>
              <span className="text-xs text-stone-500">Calle Florida 450, Depto 3B, CABA</span>
            </div>
            <span className="text-xs bg-stone-100 text-stone-700 px-2 py-1 rounded">Predeterminada</span>
          </div>
        </div>
      </div>
    </div>
  );
}