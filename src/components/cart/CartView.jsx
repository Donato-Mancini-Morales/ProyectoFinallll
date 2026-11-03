// src/components/cart/CartView.jsx
import React from 'react';

export function CartView({ 
  cart, 
  updateQuantity, 
  removeFromCart, 
  couponCode, 
  setCouponCode, 
  applyCoupon, 
  subtotal, 
  discountAmount, 
  total, 
  onCheckout 
}) {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-stone-900 mb-8">Tu Carrito de Compras</h1>

      {cart.length === 0 ? (
        <p className="text-stone-500 text-center py-12">El carrito está vacío.</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.map(item => (
              <div key={item.id} className="bg-white p-4 rounded-xl border border-stone-200 flex items-center justify-between gap-4">
                <img src={item.imagen} alt={item.nombre} className="w-16 h-16 object-cover rounded-lg" />
                <div className="flex-1">
                  <h4 className="font-bold text-stone-900">{item.nombre}</h4>
                  <span className="text-xs text-stone-400">{item.marca}</span>
                  <div className="text-sm font-semibold">${item.precio.toLocaleString('es-AR')}</div>
                </div>
                <div className="flex items-center border rounded-lg">
                  <button onClick={() => updateQuantity(item.id, -1)} className="px-2">-</button>
                  <span className="px-3 text-sm">{item.cantidad}</span>
                  <button onClick={() => updateQuantity(item.id, 1)} className="px-2">+</button>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="text-rose-500">🗑</button>
              </div>
            ))}
          </div>

          <div className="bg-white p-6 rounded-2xl border border-stone-200 h-fit space-y-4">
            <h3 className="text-xl font-bold border-b pb-3">Resumen</h3>
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="CUPÓN" 
                value={couponCode} 
                onChange={(e) => setCouponCode(e.target.value)}
                className="border p-2 rounded text-xs flex-1 uppercase"
              />
              <button onClick={applyCoupon} className="bg-stone-900 text-white px-3 py-2 rounded text-xs">Aplicar</button>
            </div>
            <div className="space-y-2 text-sm border-t pt-3">
              <div className="flex justify-between"><span>Subtotal:</span><span>${subtotal.toLocaleString('es-AR')}</span></div>
              {discountAmount > 0 && <div className="flex justify-between text-emerald-600"><span>Descuento:</span><span>-${discountAmount.toLocaleString('es-AR')}</span></div>}
              <div className="flex justify-between font-bold text-lg border-t pt-2"><span>Total:</span><span>${total.toLocaleString('es-AR')}</span></div>
            </div>
            <button onClick={onCheckout} className="w-full bg-amber-600 text-white font-bold py-3 rounded-xl hover:bg-amber-500 transition">
              Proceder al Pago
            </button>
          </div>
        </div>
      )}
    </div>
  );
}