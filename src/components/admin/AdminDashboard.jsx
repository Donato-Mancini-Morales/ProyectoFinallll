// src/components/admin/AdminDashboard.jsx
import React from 'react';

export function AdminDashboard({ products, coupons, orders = [] }) {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-stone-900">Panel de Control Admin / Socio</h1>
        <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full">
          Administrador
        </span>
      </div>

      {/* Métricas Principales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-stone-200">
          <span className="text-xs font-semibold text-stone-400 block">Ventas Totales</span>
          <span className="text-2xl font-bold text-stone-900">$1.240.000</span>
        </div>
        <div className="bg-white p-6 rounded-xl border border-stone-200">
          <span className="text-xs font-semibold text-stone-400 block">Pedidos Pendientes</span>
          <span className="text-2xl font-bold text-amber-600">8</span>
        </div>
        <div className="bg-white p-6 rounded-xl border border-stone-200">
          <span className="text-xs font-semibold text-stone-400 block">Perfumes en Catálogo</span>
          <span className="text-2xl font-bold text-stone-900">{products.length}</span>
        </div>
        <div className="bg-white p-6 rounded-xl border border-stone-200">
          <span className="text-xs font-semibold text-stone-400 block">Cupones Activos</span>
          <span className="text-2xl font-bold text-stone-900">{Object.keys(coupons).length}</span>
        </div>
      </div>

      {/* Tabla de Productos y Stock */}
      <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
        <div className="p-6 border-b border-stone-200 flex justify-between items-center">
          <h3 className="text-xl font-bold text-stone-900">Gestión de Stock e Inventario</h3>
          <button className="bg-stone-900 text-white text-xs px-4 py-2 rounded-lg font-semibold hover:bg-amber-600 transition">
            + Nuevo Producto
          </button>
        </div>
        <table className="w-full text-left text-sm text-stone-600">
          <thead className="bg-stone-50 text-xs uppercase text-stone-400 border-b border-stone-200">
            <tr>
              <th className="p-4">Producto</th>
              <th className="p-4">Categoría</th>
              <th className="p-4">Precio</th>
              <th className="p-4">Stock</th>
              <th className="p-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map(prod => (
              <tr key={prod.id} className="border-b border-stone-100 hover:bg-stone-50">
                <td className="p-4 font-semibold text-stone-900">{prod.nombre}</td>
                <td className="p-4">{prod.categoria}</td>
                <td className="p-4">${prod.precio.toLocaleString('es-AR')}</td>
                <td className="p-4 font-bold text-stone-800">{prod.stock} u.</td>
                <td className="p-4 text-right space-x-2">
                  <button className="text-amber-600 hover:underline text-xs font-bold">Editar</button>
                  <button className="text-rose-600 hover:underline text-xs font-bold">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}