import { useEffect, useMemo, useState } from 'react';
import './App.css';

const initialProducts = [
  {
    id: 'bruma-01',
    name: 'Bruma de noche',
    brand: 'Casa Botánica',
    category: 'Unisex',
    notes: 'Ámbar · cedro · vainilla',
    price: 48900,
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=900&q=85',
    tag: 'Más elegido',
  },
  {
    id: 'flor-02',
    name: 'Jardín secreto',
    brand: 'Atelier 08',
    category: 'Mujer',
    notes: 'Neroli · jazmín · almizcle',
    price: 56200,
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&q=85',
    tag: 'Nuevo',
  },
  {
    id: 'sal-03',
    name: 'Sal de verano',
    brand: 'Marea',
    category: 'Unisex',
    notes: 'Bergamota · sal marina · vetiver',
    price: 43500,
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=900&q=85',
    tag: '',
  },
  {
    id: 'cuero-04',
    name: 'Cuero & humo',
    brand: 'Sur Parfums',
    category: 'Hombre',
    notes: 'Cardamomo · cuero · incienso',
    price: 61700,
    image: 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=900&q=85',
    tag: 'Edición limitada',
  },
];

const categories = ['Todos', 'Mujer', 'Hombre', 'Unisex'];
const money = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 });

function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function Storefront() {
  const [products, setProducts] = useState(() => readStorage('aura_products', initialProducts));
  const [cart, setCart] = useState(() => readStorage('aura_cart', []));
  const [role, setRole] = useState(() => localStorage.getItem('aura_role') || 'socio');
  const [category, setCategory] = useState('Todos');
  const [search, setSearch] = useState('');
  const [cartOpen, setCartOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [imageData, setImageData] = useState('');
  const [notice, setNotice] = useState('');

  useEffect(() => localStorage.setItem('aura_products', JSON.stringify(products)), [products]);
  useEffect(() => localStorage.setItem('aura_cart', JSON.stringify(cart)), [cart]);
  useEffect(() => localStorage.setItem('aura_role', role), [role]);

  const visibleProducts = useMemo(() => products.filter((product) => {
    const matchesCategory = category === 'Todos' || product.category === category;
    const searchable = `${product.name} ${product.brand} ${product.notes}`.toLowerCase();
    return matchesCategory && searchable.includes(search.toLowerCase());
  }), [category, products, search]);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  function addToCart(product) {
    setCart((items) => {
      const found = items.find((item) => item.id === product.id);
      return found
        ? items.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
        : [...items, { ...product, quantity: 1 }];
    });
    setNotice(`${product.name} se agregó a tu bolsa`);
    window.setTimeout(() => setNotice(''), 2600);
  }

  function changeQuantity(productId, amount) {
    setCart((items) => items
      .map((item) => item.id === productId ? { ...item, quantity: item.quantity + amount } : item)
      .filter((item) => item.quantity > 0));
  }

  function handleImageChange(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      setNotice('La imagen debe pesar menos de 2 MB');
      event.target.value = '';
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setImageData(String(reader.result));
    reader.readAsDataURL(file);
  }

  function addProduct(event) {
    event.preventDefault();
    if (!imageData) {
      setNotice('Elegí una imagen para el producto');
      return;
    }
    const form = new FormData(event.currentTarget);
    const product = {
      id: `producto-${Date.now()}`,
      name: String(form.get('name')).trim(),
      brand: String(form.get('brand')).trim(),
      category: String(form.get('category')),
      notes: String(form.get('notes')).trim() || 'Nueva fragancia',
      price: Number(form.get('price')),
      image: imageData,
      tag: 'Nuevo',
    };
    setProducts((items) => [product, ...items]);
    event.currentTarget.reset();
    setImageData('');
    setNotice('Producto publicado en el catálogo');
    window.setTimeout(() => setNotice(''), 2600);
  }

  function finishPurchase() {
    setCart([]);
    setCartOpen(false);
    setNotice('¡Gracias! Tu compra de prueba quedó confirmada.');
    window.setTimeout(() => setNotice(''), 3500);
  }

  return (
    <div className="storefront">
      <div className="announcement">ENVÍO GRATIS EN COMPRAS SUPERIORES A $80.000 <span>·</span> 3 CUOTAS SIN INTERÉS</div>
      <header className="site-header">
        <a className="wordmark" href="#inicio" aria-label="AURA, inicio">AURA<span> / </span>PARFUMS</a>
        <nav className="main-nav" aria-label="Navegación principal">
          <a href="#catalogo">Fragancias</a>
          <a href="#historia">Nuestra esencia</a>
          {role === 'admin' && <button className="admin-nav" onClick={() => setAdminOpen((open) => !open)}>Administrar</button>}
        </nav>
        <div className="header-actions">
          <label className="role-switch" aria-label="Cambiar rol de demostración">
            <span className={role === 'socio' ? 'role-active' : ''}>Socio</span>
            <input type="checkbox" checked={role === 'admin'} onChange={(event) => {
              setRole(event.target.checked ? 'admin' : 'socio');
              setAdminOpen(event.target.checked);
            }} />
            <span className={role === 'admin' ? 'role-active' : ''}>Admin</span>
          </label>
          <button className="bag-button" onClick={() => setCartOpen(true)} aria-label={`Abrir bolsa, ${cartCount} productos`}>
            Bolsa <span className="bag-count">{cartCount}</span>
          </button>
        </div>
      </header>

      <main>
        <section className="hero" id="inicio">
          <div className="hero-copy">
            <p className="eyebrow"><span /> PERFUMERÍA DE AUTOR · BUENOS AIRES</p>
            <h1>Un aroma.<br /><em>Un recuerdo.</em></h1>
            <p className="hero-intro">Fragancias que hablan bajito y se quedan para siempre. Encontrá la que cuenta tu historia.</p>
            <a className="button button-dark" href="#catalogo">Descubrir fragancias <span aria-hidden="true">↗</span></a>
            <div className="hero-footnote"><span>01 — 04</span><span>ESENCIAS PARA TODOS LOS DÍAS</span></div>
          </div>
          <div className="hero-art" role="img" aria-label="Frasco de perfume sobre una superficie de piedra">
            <div className="hero-image" />
            <div className="hero-stamp"><span>EAU DE PARFUM</span><strong>01</strong><span>50 ML · BUENOS AIRES</span></div>
            <div className="hero-caption">LA BELLEZA DE LO INESPERADO</div>
          </div>
          <span className="hero-index">A / 2026</span>
        </section>

        <section className="benefits" id="historia" aria-label="Beneficios de compra">
          <div><span className="benefit-mark">01</span><p><strong>Envío cuidado</strong><small>Gratis desde $80.000</small></p></div>
          <div><span className="benefit-mark">02</span><p><strong>Esencias originales</strong><small>Selección curada por expertos</small></p></div>
          <div><span className="benefit-mark">03</span><p><strong>Un detalle especial</strong><small>Presentación lista para regalar</small></p></div>
        </section>

        {role === 'admin' && adminOpen && (
          <section className="admin-panel" aria-labelledby="admin-title">
            <div className="admin-heading">
              <p className="eyebrow">PANEL DE TIENDA <span className="admin-live">MODO ADMIN</span></p>
              <h2 id="admin-title">Sumá una nueva esencia</h2>
              <p>Los cambios se guardan en este navegador.</p>
            </div>
            <form className="product-form" onSubmit={addProduct}>
              <label>Nombre del perfume<input name="name" placeholder="Ej. Rosa de invierno" required /></label>
              <label>Marca<input name="brand" placeholder="Nombre de la marca" required /></label>
              <label>Precio (ARS)<input name="price" type="number" min="1" placeholder="45000" required /></label>
              <label>Familia
                <select name="category" defaultValue="Unisex">
                  <option>Mujer</option><option>Hombre</option><option>Unisex</option>
                </select>
              </label>
              <label className="form-wide">Notas olfativas<input name="notes" placeholder="Rosa · pimienta rosa · sándalo" /></label>
              <label className="image-upload form-wide">
                <input type="file" accept="image/*" onChange={handleImageChange} />
                <span className="upload-symbol">+</span>
                <span>{imageData ? 'Imagen lista · cambiar archivo' : 'Elegir imagen del producto (máx. 2 MB)'}</span>
                {imageData && <img src={imageData} alt="Vista previa del producto" />}
              </label>
              <button className="button button-dark form-wide" type="submit">Publicar producto <span aria-hidden="true">↗</span></button>
            </form>
          </section>
        )}

        <section className="catalog" id="catalogo">
          <div className="catalog-topline"><p className="eyebrow">ENCONTRÁ TU PRÓXIMA FIRMA</p><span>{visibleProducts.length.toString().padStart(2, '0')} FRAGANCIAS</span></div>
          <div className="catalog-heading">
            <h2>El arte de <em>sentir.</em></h2>
            <label className="search-box"><span aria-hidden="true">⌕</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar una fragancia" aria-label="Buscar una fragancia" /></label>
          </div>
          <div className="catalog-controls">
            <div className="category-tabs" aria-label="Filtrar por familia">
              {categories.map((item) => <button key={item} className={category === item ? 'category-active' : ''} onClick={() => setCategory(item)}>{item}</button>)}
            </div>
            <span className="catalog-note">HECHAS PARA DEJAR HUELLA</span>
          </div>
          {visibleProducts.length ? (
            <div className="product-grid">
              {visibleProducts.map((product) => (
                <article className="product-card" key={product.id}>
                  <div className="product-image-wrap">
                    <img src={product.image} alt={`${product.name}, perfume de ${product.brand}`} loading="lazy" />
                    {product.tag && <span className="product-tag">{product.tag}</span>}
                    {role === 'admin' && <button className="delete-product" onClick={() => setProducts((items) => items.filter((item) => item.id !== product.id))} aria-label={`Eliminar ${product.name}`}>×</button>}
                    <button className="quick-add" onClick={() => addToCart(product)} aria-label={`Agregar ${product.name} a la bolsa`}>+</button>
                  </div>
                  <div className="product-meta"><span>{product.brand}</span><span>{product.category.toUpperCase()}</span></div>
                  <div className="product-title-row"><h3>{product.name}</h3><span>{money.format(product.price)}</span></div>
                  <p className="product-notes">{product.notes}</p>
                  <button className="add-link" onClick={() => addToCart(product)}>Agregar a la bolsa <span aria-hidden="true">↗</span></button>
                </article>
              ))}
            </div>
          ) : <p className="empty-results">No encontramos fragancias con esa búsqueda.</p>}
        </section>

        <section className="closing-note">
          <span className="closing-star">✳</span>
          <p>La fragancia correcta no se elige.<br /><em>Te encuentra.</em></p>
          <a href="#catalogo">VOLVER A EXPLORAR <span aria-hidden="true">↑</span></a>
        </section>
      </main>

      <footer className="site-footer"><a className="wordmark" href="#inicio">AURA<span> / </span>PARFUMS</a><p>Una colección de aromas, una forma de estar.</p><span>BUENOS AIRES · ARGENTINA</span><small>© 2026 AURA PARFUMS</small></footer>

      {cartOpen && <div className="drawer-backdrop" onClick={() => setCartOpen(false)}>
        <aside className="cart-drawer" onClick={(event) => event.stopPropagation()} aria-label="Tu bolsa de compras">
          <div className="drawer-heading"><div><p className="eyebrow">AURA PARFUMS</p><h2>Tu bolsa <span>({cartCount})</span></h2></div><button className="close-drawer" onClick={() => setCartOpen(false)} aria-label="Cerrar bolsa">×</button></div>
          {cart.length ? <>
            <div className="cart-items">{cart.map((item) => <article className="cart-item" key={item.id}>
              <img src={item.image} alt="" />
              <div className="cart-item-info"><span>{item.brand}</span><h3>{item.name}</h3><strong>{money.format(item.price)}</strong><div className="quantity-control"><button onClick={() => changeQuantity(item.id, -1)} aria-label="Restar una unidad">−</button><span>{item.quantity}</span><button onClick={() => changeQuantity(item.id, 1)} aria-label="Sumar una unidad">+</button></div></div>
              <button className="remove-item" onClick={() => setCart((items) => items.filter((cartItem) => cartItem.id !== item.id))} aria-label={`Quitar ${item.name}`}>Quitar</button>
            </article>)}</div>
            <div className="cart-summary"><p><span>Subtotal</span><strong>{money.format(cartTotal)}</strong></p><small>Envío calculado al finalizar la compra.</small><button className="button button-dark" onClick={finishPurchase}>Finalizar compra <span aria-hidden="true">↗</span></button><button className="continue-shopping" onClick={() => setCartOpen(false)}>Seguir explorando</button></div>
          </> : <div className="empty-cart"><span>✳</span><h3>Tu próxima esencia<br />te está esperando.</h3><button className="button button-dark" onClick={() => setCartOpen(false)}>Explorar fragancias <span aria-hidden="true">↗</span></button></div>}
        </aside>
      </div>}
      {notice && <div className="toast" role="status">{notice}</div>}
    </div>
  );
}

export default function App() {
  return <Storefront />;
}