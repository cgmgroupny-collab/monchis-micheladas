/* ============================================
   GUD Monchis — Micheladas Artesanales
   JS-driven page with GSAP animations
   ============================================ */
(function () {
  'use strict';

  // ==================
  // CONFIG
  // ==================
  var PHONE = '+50249062060';
  var PHONE_DISPLAY = '+502 4906 2060';
  var EMAIL = 'guomonchis@gmail.com';
  var WA_URL = 'https://wa.me/50249062060';
  var LOCATION = 'Ciudad de Guatemala, Guatemala';
  var PROMO_DISCOUNT = 50;
  var MIN_ORDER = 100;

  // ==================
  // PRODUCT DATA
  // ==================

  // Mixer flavors — shared by Mix and Lista para Tomar
  var FLAVORS = [
    { id: 'casa', name: 'De la Casa', desc: 'Nuestra receta original, el sabor que nos hizo famosos.', gradient: 'linear-gradient(135deg, #E84B8A 0%, #F06292 100%)', badge: 'Original', badgeColor: '#E84B8A' },
    { id: 'casa-pic', name: 'De la Casa Picante', desc: 'La receta original con un toque de picante irresistible.', gradient: 'linear-gradient(135deg, #F57C00 0%, #FFB74D 100%)', badge: 'Picante', badgeColor: '#F57C00' },
    { id: 'ranchero', name: 'Sabor Ranchero', desc: 'Un sabor casero y con personalidad propia.', gradient: 'linear-gradient(135deg, #8D6E63 0%, #D7CCC8 100%)', badge: 'Popular', badgeColor: '#8D6E63' },
    { id: 'ranchero-pic', name: 'Sabor Ranchero Picante', desc: 'El ranchero con un kick de picante extra.', gradient: 'linear-gradient(135deg, #AD1457 0%, #E91E63 100%)', badge: 'Intenso', badgeColor: '#AD1457' },
  ];

  // Picona Mix
  var PICONAS = [
    { id: 'picona', name: 'Picona Mix', desc: 'Nuestra mezcla especial para los valientes.', gradient: 'linear-gradient(135deg, #C62828 0%, #EF5350 100%)', badge: 'Fuerte', badgeColor: '#C62828' },
    { id: 'picona-pic', name: 'Picona Mix Picante', desc: 'Para los que no le tienen miedo al picante.', gradient: 'linear-gradient(135deg, #BF360C 0%, #FF7043 100%)', badge: 'Extra Fuerte', badgeColor: '#BF360C' },
  ];

  var CHAMOY_FLAVORS = ['De la casa', 'Original', 'Tamarindo'];

  var COMBOS = [
    { id: 'combo-completo', name: 'El Completo', desc: '1 Litro de mix (cualquier sabor) o Picona + Taj\u00EDn y Chamoy incluido.', price: 85 },
    { id: 'combo-personal', name: 'El Personal', desc: '500ml de mix (cualquier sabor) o Picona + Taj\u00EDn y Chamoy incluido.', price: 55 },
    { id: 'combo-pachanga', name: 'La Pachanga', desc: '1L de Miche Mix + 500ml de Picona + Chamoy y Taj\u00EDn incluido.', price: 120 },
  ];

  var BEBIDAS_LIST = ['Micheladas', 'Palomas', 'Mojitos', 'Azulitos', 'Rosaditos', 'Bloody Mary'];

  var EVENTO_DRINKS = ['Micheladas', 'Palomas', 'Mojitos', 'Azulitos', 'Rosaditos', 'Bloody Mary', 'Cerveza con Escarchado de Chamoy'];

  var MIX_SIZES = [
    { label: '500ml', price: 35 },
    { label: '1 Litro', price: 65 },
  ];

  var RTD_SIZES = [
    { label: '500ml', price: 40 },
    { label: '1 Litro', price: 70 },
  ];

  var DELIVERY_MIN = 25;
  var DELIVERY_MAX = 30;

  // ==================
  // SVG ICONS
  // ==================
  var ICONS = {
    whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
    location: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
    cart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',
    minus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
    star: '<svg viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
    drink: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 16h32l-4 40H20L16 16z"/><path d="M12 16h40"/><path d="M28 8l-2 8M36 8l2 8M32 6v10" stroke-width="2" opacity="0.5"/></svg>',
    truck: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>',
    bag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>',
    heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
    heartFilled: '<svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
    calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
    users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    gift: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>',
  };

  function icon(name, size) {
    size = size || 24;
    return '<span class="icon" style="width:' + size + 'px;height:' + size + 'px">' + (ICONS[name] || '') + '</span>';
  }

  // ==================
  // CART STATE
  // ==================
  var cart = [];

  function addToCart(itemName, itemPrice, sizeLabel, btnElement) {
    var cartKey = itemName + '-' + (sizeLabel || 'unit');
    var displayName = sizeLabel ? itemName + ' (' + sizeLabel + ')' : itemName;
    var existing = cart.find(function (i) { return i.id === cartKey; });
    if (existing) {
      existing.qty++;
    } else {
      cart.push({ id: cartKey, name: displayName, price: itemPrice, qty: 1 });
    }
    updateCartUI();
    if (btnElement) {
      var origText = btnElement.innerHTML;
      btnElement.classList.add('added');
      btnElement.innerHTML = icon('check', 14) + ' Listo';
      setTimeout(function () {
        btnElement.classList.remove('added');
        btnElement.innerHTML = origText;
      }, 1200);
    }
  }

  function updateQty(id, delta) {
    var idStr = String(id);
    var item = cart.find(function (i) { return String(i.id) === idStr; });
    if (!item) return;
    item.qty = Math.max(0, item.qty + delta);
    if (item.qty === 0) cart = cart.filter(function (i) { return String(i.id) !== idStr; });
    updateCartUI();
  }

  function getTotal() {
    return cart.reduce(function (s, i) { return s + i.price * i.qty; }, 0);
  }

  function getCount() {
    return cart.reduce(function (s, i) { return s + i.qty; }, 0);
  }

  function updateCartUI() {
    var badge = document.getElementById('cart-badge');
    if (badge) {
      var count = getCount();
      badge.textContent = count;
      badge.style.display = count > 0 ? 'flex' : 'none';
    }
    renderOrderSummary();
  }

  // ==================
  // FAVORITES (localStorage)
  // ==================
  function getFavorites() {
    try { return JSON.parse(localStorage.getItem('gudmonchis_favs') || '[]'); }
    catch (e) { return []; }
  }

  function isFavorite(fid) {
    return getFavorites().indexOf(fid) !== -1;
  }

  function toggleFavorite(fid) {
    var favs = getFavorites();
    var idx = favs.indexOf(fid);
    if (idx > -1) { favs.splice(idx, 1); } else { favs.push(fid); }
    localStorage.setItem('gudmonchis_favs', JSON.stringify(favs));
    var btn = document.querySelector('[data-fav="' + fid + '"]');
    if (btn) {
      var liked = isFavorite(fid);
      btn.innerHTML = icon(liked ? 'heartFilled' : 'heart', 22);
      btn.classList.toggle('is-liked', liked);
      if (liked) {
        btn.classList.add('heart-pop');
        setTimeout(function () { btn.classList.remove('heart-pop'); }, 400);
      }
    }
  }

  // ==================
  // PRODUCT CARD BUILDER
  // ==================
  function buildProductCard(item, prefix, sizes) {
    var fid = prefix + '-' + item.id;
    var liked = isFavorite(fid);
    var sizeButtons = sizes.map(function (s, idx) {
      return (
        '<button class="btn-add btn-size" data-cart-name="' + prefix + ' ' + item.name + '" data-cart-price="' + s.price + '" data-cart-size="' + s.label + '">' +
          '<span class="size-label">' + s.label + '</span><span class="size-price">Q' + s.price + '</span>' +
        '</button>'
      );
    }).join('');

    return (
      '<div class="product-card" data-tilt>' +
        '<div class="product-img" style="background:' + item.gradient + '">' +
          '<button class="product-heart' + (liked ? ' is-liked' : '') + '" data-fav="' + fid + '" aria-label="Agregar a favoritos">' +
            icon(liked ? 'heartFilled' : 'heart', 22) +
          '</button>' +
          '<span class="product-badge" style="background:' + item.badgeColor + '">' + item.badge + '</span>' +
          '<span class="placeholder-icon">' + ICONS.drink + '</span>' +
          '<span class="placeholder-label">Foto pronto</span>' +
        '</div>' +
        '<div class="product-body">' +
          '<h3>' + item.name + '</h3>' +
          '<p class="product-desc">' + item.desc + '</p>' +
          '<div class="product-sizes">' + sizeButtons + '</div>' +
        '</div>' +
      '</div>'
    );
  }

  // ==================
  // DOM BUILDERS
  // ==================

  function buildPromoBanner() {
    var text = '\u2605 Q' + PROMO_DISCOUNT + ' DE DESCUENTO + ENV\u00CDO GRATIS en pedidos mayores a Q' + MIN_ORDER + ' \u2022 Combos desde Q55 \u2022 Bebidas a domicilio \u2022 Eventos privados \u2605';
    var banner = document.createElement('div');
    banner.className = 'promo-banner';
    banner.innerHTML =
      '<div class="promo-track">' +
      '<span>' + text + '</span>' +
      '<span>' + text + '</span>' +
      '<span>' + text + '</span>' +
      '<span>' + text + '</span>' +
      '</div>';
    banner.addEventListener('click', function () {
      document.getElementById('productos').scrollIntoView({ behavior: 'smooth' });
    });
    return banner;
  }

  function buildNav() {
    var nav = document.createElement('nav');
    nav.className = 'nav';
    nav.id = 'main-nav';
    nav.innerHTML =
      '<a href="#" class="nav-logo">' +
        '<img src="logo-1.png" alt="GUD Monchis logo" width="48" height="48">' +
        '<span class="nav-logo-text">GUD Monchis</span>' +
      '</a>' +
      '<ul class="nav-links">' +
        '<li><a href="#productos">Productos</a></li>' +
        '<li><a href="#combos">Combos</a></li>' +
        '<li><a href="#bebidas">A Domicilio</a></li>' +
        '<li><a href="#eventos">Eventos</a></li>' +
        '<li><a href="#nosotros">Nosotros</a></li>' +
        '<li><a href="#pedido">Ordenar</a></li>' +
      '</ul>' +
      '<div style="display:flex;align-items:center;gap:8px">' +
        '<button class="nav-cart" id="nav-cart-btn" aria-label="Ver carrito">' +
          icon('cart', 22) +
          '<span class="cart-badge" id="cart-badge">0</span>' +
        '</button>' +
        '<a href="' + WA_URL + '" target="_blank" rel="noopener" class="nav-cta desktop">' +
          icon('whatsapp', 18) + ' Pedir Ahora' +
        '</a>' +
        '<button class="nav-hamburger" id="hamburger" aria-label="Men\u00FA">' +
          icon('menu', 24) +
        '</button>' +
      '</div>';

    var scrolled = false;
    window.addEventListener('scroll', function () {
      var s = window.scrollY > 20;
      if (s !== scrolled) { scrolled = s; nav.classList.toggle('scrolled', s); }
    }, { passive: true });

    return nav;
  }

  function buildMobileMenu() {
    var overlay = document.createElement('div');
    overlay.className = 'mobile-menu';
    overlay.id = 'mobile-menu';
    overlay.innerHTML =
      '<div class="mobile-menu-panel">' +
        '<button class="mobile-menu-close" id="mobile-close" aria-label="Cerrar men\u00FA">' + icon('close', 22) + '</button>' +
        '<ul class="mobile-menu-links">' +
          '<li><a href="#productos">Productos</a></li>' +
          '<li><a href="#combos">Combos</a></li>' +
          '<li><a href="#bebidas">A Domicilio</a></li>' +
          '<li><a href="#eventos">Eventos</a></li>' +
          '<li><a href="#nosotros">Nosotros</a></li>' +
          '<li><a href="#pedido">Ordenar</a></li>' +
          '<li><a href="tel:' + PHONE + '">' + icon('phone', 18) + ' Llamar</a></li>' +
          '<li><a href="' + WA_URL + '" target="_blank" rel="noopener" style="color:var(--green-wa)">' + icon('whatsapp', 18) + ' WhatsApp</a></li>' +
        '</ul>' +
      '</div>';

    overlay.addEventListener('click', function (e) { if (e.target === overlay) closeMobile(); });
    overlay.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeMobile); });
    return overlay;
  }

  function openMobile() {
    var m = document.getElementById('mobile-menu');
    m.style.display = 'block';
    requestAnimationFrame(function () { m.classList.add('open'); });
    document.body.style.overflow = 'hidden';
  }

  function closeMobile() {
    var m = document.getElementById('mobile-menu');
    m.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(function () { m.style.display = ''; }, 350);
  }

  function buildHero() {
    var section = document.createElement('section');
    section.className = 'hero';
    section.innerHTML =
      '<div class="hero-bg"></div>' +
      '<div class="deco-circle" style="width:300px;height:300px;background:var(--pink-light);opacity:0.18;top:-80px;right:-60px;animation:float-slow 8s ease-in-out infinite"></div>' +
      '<div class="deco-circle" style="width:180px;height:180px;background:var(--pink);opacity:0.08;bottom:40px;left:-40px;animation:float-medium 10s ease-in-out infinite"></div>' +
      '<div class="deco-circle" style="width:100px;height:100px;background:var(--gold-light);opacity:0.15;top:30%;left:10%;animation:float-slow 12s ease-in-out infinite 2s"></div>' +
      '<div class="hero-content">' +
        '<div class="hero-logo">' +
          '<img src="logo-2.png" alt="GUD Monchis \u2014 Micheladas Artesanales" width="180" height="180">' +
        '</div>' +
        '<h1>Micheladas Artesanales</h1>' +
        '<p class="hero-sub">Mixes, bebidas preparadas y eventos privados. Hecho con amor en Ciudad de Guatemala.</p>' +
        '<div class="hero-actions">' +
          '<a href="#pedido" class="btn-primary">' + icon('bag', 20) + ' Pedir Ahora</a>' +
          '<a href="#productos" class="btn-secondary">' + icon('arrow', 20) + ' Ver Productos</a>' +
        '</div>' +
      '</div>';
    return section;
  }

  // ==================
  // PRODUCTS SECTION
  // ==================
  function buildProducts() {
    var section = document.createElement('section');
    section.className = 'products';
    section.id = 'productos';

    // Mix de Michelada cards
    var mixCards = FLAVORS.map(function (f) { return buildProductCard(f, 'Mix', MIX_SIZES); }).join('');

    // Lista para Tomar cards
    var rtdCards = FLAVORS.map(function (f) {
      var rtdItem = Object.assign({}, f, {
        desc: f.desc.replace(/\.$/, '') + '. Ya lista para tomar, solo agreg\u00E1 tu cerveza.',
        badge: 'Con Lim\u00F3n',
        badgeColor: '#2E7D32',
      });
      return buildProductCard(rtdItem, 'Lista', RTD_SIZES);
    }).join('');

    // Picona Mix cards
    var piconaCards = PICONAS.map(function (p) { return buildProductCard(p, 'Picona', MIX_SIZES); }).join('');

    // Extras
    var chamoyOptions = CHAMOY_FLAVORS.map(function (f) { return '<option value="' + f + '">' + f + '</option>'; }).join('');

    var extrasHTML =
      '<div class="extras-grid">' +
        '<div class="extra-card">' +
          '<div class="extra-header" style="background:linear-gradient(135deg, #880E4F 0%, #E91E63 100%)">' +
            '<span class="placeholder-icon" style="color:rgba(255,255,255,0.6);width:48px;height:48px">' + ICONS.drink + '</span>' +
          '</div>' +
          '<div class="extra-body">' +
            '<h3>Chamoy Artesanal</h3>' +
            '<p class="product-desc">250ml de chamoy artesanal en 3 sabores.</p>' +
            '<select class="extra-select" id="chamoy-flavor">' + chamoyOptions + '</select>' +
            '<button class="btn-add btn-extra" id="btn-add-chamoy">' +
              '<span>Agregar</span><span class="size-price">Q18</span>' +
            '</button>' +
          '</div>' +
        '</div>' +
        '<div class="extra-card">' +
          '<div class="extra-header" style="background:linear-gradient(135deg, #E65100 0%, #FF9800 100%)">' +
            '<span class="placeholder-icon" style="color:rgba(255,255,255,0.6);width:48px;height:48px">' + ICONS.drink + '</span>' +
          '</div>' +
          '<div class="extra-body">' +
            '<h3>Mezcla de Taj\u00EDn</h3>' +
            '<p class="product-desc">El complemento perfecto para tu michelada.</p>' +
            '<button class="btn-add btn-extra" data-cart-name="Mezcla de Taj\u00EDn" data-cart-price="12">' +
              '<span>Agregar</span><span class="size-price">Q12</span>' +
            '</button>' +
          '</div>' +
        '</div>' +
      '</div>';

    section.innerHTML =
      '<div class="section-pad">' +
        // Mix de Michelada
        '<div class="section-header">' +
          '<span class="section-tag">Nuestros Productos</span>' +
          '<h2>Mix de Michelada</h2>' +
          '<p>Llev\u00E1 nuestro mix artesanal a tu casa y prepar\u00E1 micheladas perfectas cuando quieras.</p>' +
        '</div>' +
        '<div class="products-grid">' + mixCards + '</div>' +

        // Lista para Tomar
        '<div class="section-header subsection-header">' +
          '<h2>Lista para Tomar</h2>' +
          '<p>Con lim\u00F3n incluido \u2014 solo agreg\u00E1 tu cerveza favorita. +Q5 por el lim\u00F3n fresco.</p>' +
        '</div>' +
        '<div class="products-grid">' + rtdCards + '</div>' +

        // Picona Mix
        '<div class="section-header subsection-header">' +
          '<h2>Picona Mix</h2>' +
          '<p>Para los que buscan algo m\u00E1s intenso.</p>' +
        '</div>' +
        '<div class="products-grid products-grid-2">' + piconaCards + '</div>' +

        // Extras
        '<div class="section-header subsection-header">' +
          '<h2>Extras</h2>' +
          '<p>El toque final para tu michelada perfecta.</p>' +
        '</div>' +
        extrasHTML +
      '</div>';

    // Attach click handlers after insert
    setTimeout(function () {
      // Size buttons for all product cards
      document.querySelectorAll('[data-cart-name]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          addToCart(
            this.getAttribute('data-cart-name'),
            parseInt(this.getAttribute('data-cart-price')),
            this.getAttribute('data-cart-size') || '',
            this
          );
        });
      });
      // Chamoy special handler
      var chamoyBtn = document.getElementById('btn-add-chamoy');
      if (chamoyBtn) {
        chamoyBtn.addEventListener('click', function () {
          var flavor = document.getElementById('chamoy-flavor').value;
          addToCart('Chamoy ' + flavor, 18, '250ml', this);
        });
      }
      // Favorites
      document.querySelectorAll('[data-fav]').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
          e.stopPropagation();
          toggleFavorite(this.getAttribute('data-fav'));
        });
      });
    }, 0);

    return section;
  }

  // ==================
  // COMBOS SECTION
  // ==================
  function buildCombos() {
    var section = document.createElement('section');
    section.className = 'combos-section';
    section.id = 'combos';

    var comboCards = COMBOS.map(function (c) {
      return (
        '<div class="combo-card">' +
          '<div class="combo-badge">Combo</div>' +
          '<h3>' + c.name + '</h3>' +
          '<p>' + c.desc + '</p>' +
          '<div class="combo-price">Q' + c.price + '</div>' +
          '<button class="btn-add btn-combo" data-cart-name="Combo ' + c.name + '" data-cart-price="' + c.price + '">' +
            icon('plus', 16) + ' Agregar al Pedido' +
          '</button>' +
        '</div>'
      );
    }).join('');

    section.innerHTML =
      '<div class="section-pad">' +
        '<div class="section-header">' +
          '<span class="section-tag">Ahorra M\u00E1s</span>' +
          '<h2>Combos</h2>' +
          '<p>Todo incluido para tu michelada perfecta. Eleg\u00ED tu sabor al ordenar.</p>' +
        '</div>' +
        '<div class="combos-grid">' + comboCards + '</div>' +
      '</div>';

    return section;
  }

  // ==================
  // BEBIDAS A DOMICILIO
  // ==================
  function buildBebidas() {
    var section = document.createElement('section');
    section.className = 'bebidas-section';
    section.id = 'bebidas';

    var drinkTags = BEBIDAS_LIST.map(function (d) {
      return '<span class="drink-tag">' + d + '</span>';
    }).join('');

    section.innerHTML =
      '<div class="section-pad">' +
        '<div class="section-header">' +
          '<span class="section-tag">Servicio a Domicilio</span>' +
          '<h2>Bebidas Preparadas</h2>' +
          '<p>Bebidas listas para llevar a tu puerta. M\u00EDnimo 6 unidades, todas del mismo tipo.</p>' +
        '</div>' +
        '<div class="bebidas-drinks-list">' + drinkTags + '</div>' +
        '<div class="bebidas-grid">' +
          // Micheladas pack
          '<div class="bebida-card">' +
            '<div class="bebida-icon">' + ICONS.drink + '</div>' +
            '<h3>Pack Micheladas</h3>' +
            '<p>6 cervezas + mix de michelada en bolsa lista para tomar.</p>' +
            '<div class="bebida-price-row">' +
              '<div class="bebida-price">' +
                '<span class="bebida-amount">Q125</span>' +
                '<span class="bebida-detail">6 unidades</span>' +
              '</div>' +
            '</div>' +
            '<div class="bebida-breakdown">Q60 cervezas + Q65 mix listo</div>' +
          '</div>' +
          // Tragos Regular
          '<div class="bebida-card">' +
            '<div class="bebida-icon">' + ICONS.drink + '</div>' +
            '<h3>Pack Tragos</h3>' +
            '<p>6 tragos del mismo tipo + triple litro de gaseosa.</p>' +
            '<div class="bebida-price-row">' +
              '<div class="bebida-price">' +
                '<span class="bebida-amount">Q80</span>' +
                '<span class="bebida-detail">6 regulares</span>' +
              '</div>' +
              '<div class="bebida-price">' +
                '<span class="bebida-amount">Q100</span>' +
                '<span class="bebida-detail">6 dobles</span>' +
              '</div>' +
            '</div>' +
            '<div class="bebida-breakdown">Incluye triple litro de gaseosa</div>' +
          '</div>' +
        '</div>' +
        '<div class="bebidas-cta">' +
          '<p>Para cotizar tu pedido de bebidas preparadas, cont\u00E1ctanos:</p>' +
          '<a href="' + WA_URL + '?text=' + encodeURIComponent('Hola! Me interesa cotizar bebidas preparadas a domicilio.') + '" target="_blank" rel="noopener" class="btn-whatsapp">' +
            icon('whatsapp', 22) + ' Cotizar por WhatsApp' +
          '</a>' +
        '</div>' +
      '</div>';

    return section;
  }

  // ==================
  // EVENTOS PRIVADOS
  // ==================
  function buildEventos() {
    var section = document.createElement('section');
    section.className = 'eventos-section';
    section.id = 'eventos';

    var drinkOptions = EVENTO_DRINKS.map(function (d) {
      return '<option value="' + d + '">' + d + '</option>';
    }).join('');

    var selectHTML =
      '<select class="evento-select"><option value="">-- Seleccionar --</option>' + drinkOptions + '</select>';

    section.innerHTML =
      '<div class="section-pad">' +
        '<div class="section-header">' +
          '<span class="section-tag">Celebra con Nosotros</span>' +
          '<h2>Eventos Privados</h2>' +
          '<p>Hacemos tu evento especial con bebidas artesanales. Envi\u00E1 tu cotizaci\u00F3n y te contactamos.</p>' +
        '</div>' +
        '<div class="evento-wrapper">' +
          '<div class="evento-info">' +
            '<div class="evento-features">' +
              '<div class="evento-feature">' +
                '<div class="evento-feature-icon">' + ICONS.drink + '</div>' +
                '<h4>Bebidas Artesanales</h4>' +
                '<p>Micheladas, palomas, mojitos, azulitos, rosaditos, bloody mary y m\u00E1s.</p>' +
              '</div>' +
              '<div class="evento-feature">' +
                '<div class="evento-feature-icon">' + ICONS.users + '</div>' +
                '<h4>Para Todos</h4>' +
                '<p>Desde reuniones \u00EDntimas hasta fiestas grandes. Nos adaptamos a tu evento.</p>' +
              '</div>' +
              '<div class="evento-feature">' +
                '<div class="evento-feature-icon">' + ICONS.truck + '</div>' +
                '<h4>Servicio Completo</h4>' +
                '<p>Llegamos a tu ubicaci\u00F3n con todo listo. Servicio profesional incluido.</p>' +
              '</div>' +
            '</div>' +
          '</div>' +
          '<div class="evento-form">' +
            '<h3>' + icon('calendar', 22) + ' Solicitar Cotizaci\u00F3n</h3>' +
            '<div class="form-group">' +
              '<label for="evento-date">Fecha del evento</label>' +
              '<input type="date" id="evento-date" required>' +
            '</div>' +
            '<div class="form-group">' +
              '<label for="evento-address">Direcci\u00F3n del evento</label>' +
              '<input type="text" id="evento-address" placeholder="Zona, colonia, sal\u00F3n..." required>' +
            '</div>' +
            '<div class="form-row">' +
              '<div class="form-group">' +
                '<label for="evento-guests">Invitados</label>' +
                '<input type="number" id="evento-guests" placeholder="Ej: 50" min="1" required>' +
              '</div>' +
              '<div class="form-group">' +
                '<label for="evento-drinks">Cantidad de tragos</label>' +
                '<input type="number" id="evento-drinks" placeholder="Ej: 100" min="6" required>' +
              '</div>' +
            '</div>' +
            '<div class="form-group">' +
              '<label>Tragos que te gustar\u00EDa (eleg\u00ED hasta 3)</label>' +
              '<div class="evento-drink-selects">' +
                '<div class="form-group">' + selectHTML.replace('evento-select', 'evento-select" id="evento-drink1') + '</div>' +
                '<div class="form-group">' + selectHTML.replace('evento-select', 'evento-select" id="evento-drink2') + '</div>' +
                '<div class="form-group">' + selectHTML.replace('evento-select', 'evento-select" id="evento-drink3') + '</div>' +
              '</div>' +
            '</div>' +
            '<div class="form-group">' +
              '<label>Tama\u00F1o de vaso</label>' +
              '<div class="evento-sizes">' +
                '<label class="radio-label"><input type="radio" name="evento-size" value="9oz" checked> 9 oz</label>' +
                '<label class="radio-label"><input type="radio" name="evento-size" value="12oz"> 12 oz</label>' +
              '</div>' +
            '</div>' +
            '<div class="form-group">' +
              '<label for="evento-notes">Notas adicionales</label>' +
              '<textarea id="evento-notes" placeholder="Detalles extra, preferencias, horario..."></textarea>' +
            '</div>' +
            '<button type="button" class="btn-whatsapp" id="btn-evento-wa" style="width:100%;justify-content:center">' +
              icon('whatsapp', 22) + ' Enviar Cotizaci\u00F3n por WhatsApp' +
            '</button>' +
          '</div>' +
        '</div>' +
      '</div>';

    return section;
  }

  function sendEventoQuote() {
    var date = document.getElementById('evento-date').value;
    var address = document.getElementById('evento-address').value.trim();
    var guests = document.getElementById('evento-guests').value;
    var drinks = document.getElementById('evento-drinks').value;
    var drink1 = document.getElementById('evento-drink1') ? document.getElementById('evento-drink1').value : '';
    var drink2 = document.getElementById('evento-drink2') ? document.getElementById('evento-drink2').value : '';
    var drink3 = document.getElementById('evento-drink3') ? document.getElementById('evento-drink3').value : '';
    var size = document.querySelector('input[name="evento-size"]:checked');
    var notes = document.getElementById('evento-notes').value.trim();

    if (!date || !address || !guests || !drinks) {
      alert('Por favor complet\u00E1 la fecha, direcci\u00F3n, invitados y cantidad de tragos.');
      return;
    }

    var selectedDrinks = [drink1, drink2, drink3].filter(function (d) { return d; });
    if (selectedDrinks.length === 0) {
      alert('Por favor seleccion\u00E1 al menos un tipo de trago.');
      return;
    }

    var msg = '*Cotizaci\u00F3n Evento Privado \u2014 GUD Monchis*\n\n';
    msg += '*Fecha:* ' + date + '\n';
    msg += '*Direcci\u00F3n:* ' + address + '\n';
    msg += '*Invitados:* ' + guests + '\n';
    msg += '*Cantidad de tragos:* ' + drinks + '\n';
    msg += '*Tragos seleccionados:* ' + selectedDrinks.join(', ') + '\n';
    msg += '*Tama\u00F1o de vaso:* ' + (size ? size.value : '9oz') + '\n';
    if (notes) msg += '\n*Notas:* ' + notes;

    window.open(WA_URL + '?text=' + encodeURIComponent(msg), '_blank');
  }

  // ==================
  // ABOUT
  // ==================
  function buildAbout() {
    var section = document.createElement('section');
    section.className = 'about';
    section.id = 'nosotros';
    section.innerHTML =
      '<div class="section-pad">' +
        '<div class="about-grid">' +
          '<div class="about-img">' +
            '<span class="placeholder-icon">' + ICONS.drink + '</span>' +
          '</div>' +
          '<div class="about-text">' +
            '<span class="section-tag">Nuestra Historia</span>' +
            '<h2>Hechas con Pasi\u00F3n en Guatemala</h2>' +
            '<p>En GUD Monchis creemos que una buena michelada tiene el poder de unir a las personas. Nuestros mixes artesanales est\u00E1n hechos con ingredientes frescos y recetas perfeccionadas con amor.</p>' +
            '<p>Desde mixes para preparar en casa hasta bebidas listas para tomar y servicio completo para eventos privados \u2014 tenemos todo para que disfrut\u00E9s al m\u00E1ximo.</p>' +
            '<div class="about-stats">' +
              '<div class="stat"><div class="stat-number" data-count="6">0</div><div class="stat-label">Sabores</div></div>' +
              '<div class="stat"><div class="stat-number" data-count="500">0</div><div class="stat-label">Clientes Felices</div></div>' +
              '<div class="stat"><div class="stat-number" data-count="3">0</div><div class="stat-label">A\u00F1os</div></div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>';
    return section;
  }

  // ==================
  // HOW TO ORDER
  // ==================
  function buildSteps() {
    var section = document.createElement('section');
    section.className = 'steps';
    section.id = 'como-pedir';
    section.innerHTML =
      '<div class="section-pad">' +
        '<div class="section-header">' +
          '<span class="section-tag">Ordenar es F\u00E1cil</span>' +
          '<h2>\u00BFC\u00F3mo Pedir?</h2>' +
          '<p>En 3 simples pasos recib\u00EDs tu pedido en la puerta de tu casa.</p>' +
        '</div>' +
        '<div class="steps-grid">' +
          '<div class="step-card">' +
            '<div class="step-number">1</div>' +
            '<div class="step-icon">' + ICONS.bag + '</div>' +
            '<h3>Eleg\u00ED tus Productos</h3>' +
            '<p>Explor\u00E1 nuestros mixes, combos y extras. Agreg\u00E1 lo que m\u00E1s te guste.</p>' +
          '</div>' +
          '<div class="step-card">' +
            '<div class="step-number">2</div>' +
            '<div class="step-icon">' + ICONS.whatsapp + '</div>' +
            '<h3>Envi\u00E1 tu Pedido</h3>' +
            '<p>Complet\u00E1 el formulario y envi\u00E1 tu orden por WhatsApp o correo.</p>' +
          '</div>' +
          '<div class="step-card">' +
            '<div class="step-number">3</div>' +
            '<div class="step-icon">' + ICONS.truck + '</div>' +
            '<h3>Recib\u00ED en Casa</h3>' +
            '<p>Entrega el mismo d\u00EDa si ped\u00EDs antes de las 7:40 AM. Env\u00EDo Q' + DELIVERY_MIN + '\u2013Q' + DELIVERY_MAX + ' seg\u00FAn zona. GRATIS en pedidos mayores a Q' + MIN_ORDER + '.</p>' +
          '</div>' +
        '</div>' +
      '</div>';
    return section;
  }

  // ==================
  // ORDER SECTION
  // ==================
  function buildOrderSection() {
    var section = document.createElement('section');
    section.className = 'order';
    section.id = 'pedido';
    section.innerHTML =
      '<div class="section-pad">' +
        '<div class="section-header">' +
          '<span class="section-tag">Tu Pedido</span>' +
          '<h2>Hacer Pedido</h2>' +
          '<p>Complet\u00E1 tus datos y envi\u00E1 tu orden. Te confirmamos al instante.</p>' +
        '</div>' +
        '<div class="order-wrapper">' +
          '<div class="order-summary" id="order-summary">' +
            '<h3>' + icon('cart', 22) + ' Resumen</h3>' +
            '<div id="summary-content">' +
              '<div class="summary-empty">Tu carrito est\u00E1 vac\u00EDo. Agreg\u00E1 productos arriba.</div>' +
            '</div>' +
          '</div>' +
          '<div class="order-form">' +
            '<h3>Datos de Entrega</h3>' +
            '<div class="form-group">' +
              '<label for="order-name">Nombre completo</label>' +
              '<input type="text" id="order-name" placeholder="Tu nombre" required>' +
            '</div>' +
            '<div class="form-group">' +
              '<label for="order-phone">Tel\u00E9fono</label>' +
              '<input type="tel" id="order-phone" placeholder="Ej: 4906 2060" required>' +
            '</div>' +
            '<div class="form-group">' +
              '<label for="order-address">Direcci\u00F3n de entrega</label>' +
              '<input type="text" id="order-address" placeholder="Zona, colonia, calle..." required>' +
            '</div>' +
            '<div class="form-group">' +
              '<label for="order-notes">Notas adicionales</label>' +
              '<textarea id="order-notes" placeholder="Instrucciones especiales, sabor de chamoy para combo..."></textarea>' +
            '</div>' +
            '<div class="form-actions">' +
              '<button type="button" class="btn-whatsapp" id="btn-wa-order">' + icon('whatsapp', 22) + ' Pedir por WhatsApp</button>' +
              '<button type="button" class="btn-email" id="btn-email-order">' + icon('mail', 20) + ' Por Correo</button>' +
            '</div>' +
            '<div class="coming-soon-box" style="margin-top:20px">' +
              '<span class="coming-soon-badge">PR\u00D3XIMAMENTE</span>' +
              '<span class="coming-soon-text">Pagos con tarjeta de cr\u00E9dito/d\u00E9bito y Apple Pay</span>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>';
    return section;
  }

  function renderOrderSummary() {
    var container = document.getElementById('summary-content');
    if (!container) return;

    if (cart.length === 0) {
      container.innerHTML = '<div class="summary-empty">Tu carrito est\u00E1 vac\u00EDo. Agreg\u00E1 productos arriba.</div>';
      return;
    }

    var subtotal = getTotal();
    var hasDiscount = subtotal >= MIN_ORDER;
    var discount = hasDiscount ? PROMO_DISCOUNT : 0;
    var total = subtotal - discount;

    var items = cart.map(function (item) {
      return (
        '<li class="summary-item">' +
          '<div class="summary-item-info">' +
            '<div class="summary-item-name">' + item.name + '</div>' +
            '<div class="summary-item-price">Q' + item.price + ' c/u</div>' +
          '</div>' +
          '<div class="summary-item-qty">' +
            '<button class="qty-btn" data-qty-minus="' + item.id + '">' + icon('minus', 14) + '</button>' +
            '<span class="qty-value">' + item.qty + '</span>' +
            '<button class="qty-btn" data-qty-plus="' + item.id + '">' + icon('plus', 14) + '</button>' +
          '</div>' +
        '</li>'
      );
    }).join('');

    container.innerHTML =
      '<ul class="summary-items">' + items + '</ul>' +
      '<div class="summary-totals">' +
        '<div class="summary-row"><span>Subtotal</span><span>Q' + subtotal + '</span></div>' +
        (hasDiscount
          ? '<div class="summary-row discount"><span>Descuento promo</span><span>-Q' + discount + '</span></div>' +
            '<div class="summary-row"><span>Env\u00EDo</span><span style="color:var(--green-wa);font-weight:600">GRATIS</span></div>'
          : '<div class="summary-row"><span>Env\u00EDo</span><span>Q' + DELIVERY_MIN + ' \u2013 Q' + DELIVERY_MAX + ' (seg\u00FAn zona)</span></div>') +
        '<div class="summary-row total"><span>Total</span><span>Q' + total + (hasDiscount ? '' : ' + env\u00EDo') + '</span></div>' +
      '</div>' +
      (!hasDiscount
        ? '<div class="summary-promo">' + icon('star', 14) + ' Agreg\u00E1 Q' + (MIN_ORDER - subtotal) + ' m\u00E1s para env\u00EDo gratis y Q' + PROMO_DISCOUNT + ' de descuento</div>'
        : '') +
      '<div class="summary-promo" style="margin-top:8px;background:var(--pink-soft);color:var(--brown-mid)">Entrega el mismo d\u00EDa si ped\u00EDs antes de las 7:40 AM</div>';

    container.querySelectorAll('[data-qty-minus]').forEach(function (btn) {
      btn.addEventListener('click', function () { updateQty(this.getAttribute('data-qty-minus'), -1); });
    });
    container.querySelectorAll('[data-qty-plus]').forEach(function (btn) {
      btn.addEventListener('click', function () { updateQty(this.getAttribute('data-qty-plus'), 1); });
    });
  }

  // ==================
  // ORDER MESSAGES
  // ==================
  function buildOrderMessage() {
    var name = document.getElementById('order-name').value.trim();
    var phone = document.getElementById('order-phone').value.trim();
    var address = document.getElementById('order-address').value.trim();
    var notes = document.getElementById('order-notes').value.trim();

    if (!name || !phone || !address) {
      alert('Por favor complet\u00E1 tu nombre, tel\u00E9fono y direcci\u00F3n.');
      return null;
    }
    if (cart.length === 0) {
      alert('Tu carrito est\u00E1 vac\u00EDo. Agreg\u00E1 productos primero.');
      return null;
    }

    var subtotal = getTotal();
    var discount = subtotal >= MIN_ORDER ? PROMO_DISCOUNT : 0;
    var delivery = subtotal >= MIN_ORDER ? 'GRATIS' : 'Q' + DELIVERY_MIN + '-Q' + DELIVERY_MAX + ' (seg\u00FAn zona)';
    var total = subtotal - discount;

    var msg = '*Nuevo Pedido \u2014 GUD Monchis*\n\n';
    msg += '*Nombre:* ' + name + '\n';
    msg += '*Tel\u00E9fono:* ' + phone + '\n';
    msg += '*Direcci\u00F3n:* ' + address + '\n\n';
    msg += '*Productos:*\n';
    cart.forEach(function (item) {
      msg += '\u2022 ' + item.name + ' x' + item.qty + ' \u2014 Q' + (item.price * item.qty) + '\n';
    });
    msg += '\n*Subtotal:* Q' + subtotal;
    if (discount > 0) msg += '\n*Descuento promo:* -Q' + discount;
    msg += '\n*Env\u00EDo:* ' + delivery;
    msg += '\n*Total estimado:* Q' + total + (subtotal < MIN_ORDER ? ' + env\u00EDo' : '');
    if (notes) msg += '\n\n*Notas:* ' + notes;

    return msg;
  }

  function sendWhatsApp() {
    var msg = buildOrderMessage();
    if (!msg) return;
    window.open(WA_URL + '?text=' + encodeURIComponent(msg), '_blank');
  }

  function sendEmail() {
    var msg = buildOrderMessage();
    if (!msg) return;
    var subject = encodeURIComponent('Nuevo Pedido \u2014 GUD Monchis');
    var body = encodeURIComponent(msg.replace(/\*/g, ''));
    window.location.href = 'mailto:' + EMAIL + '?subject=' + subject + '&body=' + body;
  }

  // ==================
  // CART SIDEBAR
  // ==================
  function buildCartSidebar() {
    var overlay = document.createElement('div');
    overlay.className = 'cart-sidebar';
    overlay.id = 'cart-sidebar';
    overlay.innerHTML =
      '<div class="cart-sidebar-panel">' +
        '<div class="cart-sidebar-header">' +
          '<h3>' + icon('cart', 22) + ' Tu Carrito</h3>' +
          '<button class="cart-sidebar-close" id="cart-sidebar-close" aria-label="Cerrar carrito">' + icon('close', 22) + '</button>' +
        '</div>' +
        '<div class="cart-sidebar-body" id="cart-sidebar-body">' +
          '<div class="summary-empty">Tu carrito est\u00E1 vac\u00EDo.<br>Agreg\u00E1 productos para comenzar.</div>' +
        '</div>' +
        '<div class="cart-sidebar-footer" id="cart-sidebar-footer" style="display:none">' +
          '<div id="cart-sidebar-totals"></div>' +
          '<button class="btn-primary cart-continue" id="cart-continue-btn" style="width:100%;justify-content:center;margin-top:16px">' + icon('arrow', 18) + ' Continuar con el Pedido</button>' +
          '<div class="coming-soon-box">' +
            '<span class="coming-soon-badge">PR\u00D3XIMAMENTE</span>' +
            '<span class="coming-soon-text">Pagos con tarjeta y Apple Pay</span>' +
            '<div class="coming-soon-icons">' +
              '<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="var(--brown-light)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>' +
              '<svg viewBox="0 0 24 24" width="28" height="28" fill="var(--brown-light)"><path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.52-3.23 0-1.44.62-2.2.44-3.06-.4C3.29 15.78 3.93 9.04 8.63 8.77c1.28.06 2.15.72 2.9.75.92-.18 1.8-.88 3.15-.77 1.26.1 2.4.6 3.18 1.6-3.48 2.1-2.84 6.3.3 7.77-.67 1.75-1.54 3.48-3.11 3.96zM12.03 8.7c-.15-2.38 1.72-4.38 3.97-4.57.28 2.52-2.26 4.73-3.97 4.57z"/></svg>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>';

    overlay.addEventListener('click', function (e) { if (e.target === overlay) closeCartSidebar(); });
    return overlay;
  }

  function openCartSidebar() {
    var s = document.getElementById('cart-sidebar');
    s.style.display = 'block';
    requestAnimationFrame(function () { s.classList.add('open'); });
    document.body.style.overflow = 'hidden';
    renderCartSidebar();
  }

  function closeCartSidebar() {
    var s = document.getElementById('cart-sidebar');
    s.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(function () { s.style.display = ''; }, 350);
  }

  function renderCartSidebar() {
    var body = document.getElementById('cart-sidebar-body');
    var footer = document.getElementById('cart-sidebar-footer');
    var totals = document.getElementById('cart-sidebar-totals');
    if (!body) return;

    if (cart.length === 0) {
      body.innerHTML = '<div class="summary-empty">Tu carrito est\u00E1 vac\u00EDo.<br>Agreg\u00E1 productos para comenzar.</div>';
      if (footer) footer.style.display = 'none';
      return;
    }

    var items = cart.map(function (item) {
      return (
        '<div class="sidebar-item">' +
          '<div class="sidebar-item-info">' +
            '<div class="summary-item-name">' + item.name + '</div>' +
            '<div class="summary-item-price">Q' + item.price + ' c/u</div>' +
          '</div>' +
          '<div class="summary-item-qty">' +
            '<button class="qty-btn" data-sq-minus="' + item.id + '">' + icon('minus', 14) + '</button>' +
            '<span class="qty-value">' + item.qty + '</span>' +
            '<button class="qty-btn" data-sq-plus="' + item.id + '">' + icon('plus', 14) + '</button>' +
          '</div>' +
          '<div class="sidebar-item-total">Q' + (item.price * item.qty) + '</div>' +
        '</div>'
      );
    }).join('');

    body.innerHTML = items;
    if (footer) footer.style.display = 'block';

    var subtotal = getTotal();
    var hasDiscount = subtotal >= MIN_ORDER;
    var discount = hasDiscount ? PROMO_DISCOUNT : 0;
    var total = subtotal - discount;

    if (totals) {
      totals.innerHTML =
        '<div class="summary-row"><span>Subtotal</span><span>Q' + subtotal + '</span></div>' +
        (hasDiscount
          ? '<div class="summary-row discount"><span>Descuento</span><span>-Q' + discount + '</span></div>' +
            '<div class="summary-row"><span>Env\u00EDo</span><span style="color:var(--green-wa);font-weight:600">GRATIS</span></div>'
          : '<div class="summary-row"><span>Env\u00EDo</span><span>Q' + DELIVERY_MIN + '\u2013Q' + DELIVERY_MAX + '</span></div>') +
        '<div class="summary-row total"><span>Total</span><span>Q' + total + (hasDiscount ? '' : ' + env\u00EDo') + '</span></div>';
    }

    body.querySelectorAll('[data-sq-minus]').forEach(function (btn) {
      btn.addEventListener('click', function () { updateQty(this.getAttribute('data-sq-minus'), -1); renderCartSidebar(); });
    });
    body.querySelectorAll('[data-sq-plus]').forEach(function (btn) {
      btn.addEventListener('click', function () { updateQty(this.getAttribute('data-sq-plus'), 1); renderCartSidebar(); });
    });
  }

  // ==================
  // FOOTER
  // ==================
  function buildFooter() {
    var footer = document.createElement('footer');
    footer.className = 'footer';
    footer.innerHTML =
      '<div class="footer-grid">' +
        '<div class="footer-brand">' +
          '<div class="footer-logo">' +
            '<img src="logo-1.png" alt="GUD Monchis" width="56" height="56">' +
            '<span>GUD Monchis</span>' +
          '</div>' +
          '<p>Micheladas artesanales, bebidas preparadas y eventos privados. Hechos con ingredientes frescos en Ciudad de Guatemala.</p>' +
        '</div>' +
        '<div class="footer-col">' +
          '<h4>Navegaci\u00F3n</h4>' +
          '<ul>' +
            '<li><a href="#productos">Productos</a></li>' +
            '<li><a href="#combos">Combos</a></li>' +
            '<li><a href="#bebidas">A Domicilio</a></li>' +
            '<li><a href="#eventos">Eventos</a></li>' +
            '<li><a href="#nosotros">Nosotros</a></li>' +
            '<li><a href="#pedido">Ordenar</a></li>' +
          '</ul>' +
        '</div>' +
        '<div class="footer-col">' +
          '<h4>Contacto</h4>' +
          '<ul>' +
            '<li>' + icon('phone', 16) + ' <a href="tel:' + PHONE + '">' + PHONE_DISPLAY + '</a></li>' +
            '<li>' + icon('whatsapp', 16) + ' <a href="' + WA_URL + '" target="_blank" rel="noopener">WhatsApp</a></li>' +
            '<li>' + icon('mail', 16) + ' <a href="mailto:' + EMAIL + '">' + EMAIL + '</a></li>' +
            '<li>' + icon('location', 16) + ' ' + LOCATION + '</li>' +
          '</ul>' +
        '</div>' +
      '</div>' +
      '<div class="footer-bottom">' +
        '\u00A9 ' + new Date().getFullYear() + ' GUD Monchis. Todos los derechos reservados.' +
      '</div>';
    return footer;
  }

  function buildWhatsAppFloat() {
    var div = document.createElement('div');
    div.className = 'wa-float';
    div.innerHTML =
      '<span class="wa-float-tooltip">Pedir por WhatsApp</span>' +
      '<a href="' + WA_URL + '" target="_blank" rel="noopener" class="wa-float-btn" aria-label="Contactar por WhatsApp">' +
        icon('whatsapp', 32) +
      '</a>';
    return div;
  }

  // ==================
  // ANIMATIONS (GSAP)
  // ==================
  function initAnimations() {
    gsap.registerPlugin(ScrollTrigger);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Hero entrance
    var heroTl = gsap.timeline({ defaults: { ease: 'back.out(1.4)', duration: 0.8 } });
    heroTl
      .from('.hero-logo', { scale: 0.6, opacity: 0, duration: 1 })
      .from('.hero h1', { y: 40, opacity: 0 }, '-=0.4')
      .from('.hero-sub', { y: 30, opacity: 0 }, '-=0.5')
      .from('.hero-actions > *', { y: 25, opacity: 0, stagger: 0.12 }, '-=0.4')
      .from('.deco-circle', { scale: 0, opacity: 0, stagger: 0.15, duration: 1, ease: 'elastic.out(1, 0.5)' }, '-=0.6');

    gsap.from('.nav', { y: -80, opacity: 0, duration: 0.6, ease: 'power2.out', delay: 0.2 });
    gsap.from('.promo-banner', { y: -44, opacity: 0, duration: 0.5, ease: 'power2.out' });

    // Product cards
    gsap.utils.toArray('.product-card').forEach(function (card, i) {
      gsap.from(card, {
        scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none none' },
        y: 60, opacity: 0, duration: 0.7, delay: (i % 4) * 0.1, ease: 'power2.out',
      });
    });

    // Extra cards
    gsap.utils.toArray('.extra-card').forEach(function (card, i) {
      gsap.from(card, {
        scrollTrigger: { trigger: card, start: 'top 88%' },
        y: 40, opacity: 0, duration: 0.6, delay: i * 0.15, ease: 'power2.out',
      });
    });

    // Combo cards
    gsap.utils.toArray('.combo-card').forEach(function (card, i) {
      gsap.from(card, {
        scrollTrigger: { trigger: card, start: 'top 88%' },
        y: 50, opacity: 0, duration: 0.6, delay: i * 0.15, ease: 'back.out(1.2)',
      });
    });

    // Bebida cards
    gsap.utils.toArray('.bebida-card').forEach(function (card, i) {
      gsap.from(card, {
        scrollTrigger: { trigger: card, start: 'top 88%' },
        y: 40, opacity: 0, duration: 0.6, delay: i * 0.15, ease: 'power2.out',
      });
    });

    // Section headers
    gsap.utils.toArray('.section-header').forEach(function (header) {
      gsap.from(header.children, {
        scrollTrigger: { trigger: header, start: 'top 85%' },
        y: 30, opacity: 0, stagger: 0.1, duration: 0.6, ease: 'power2.out',
      });
    });

    // About section
    gsap.from('.about-img', {
      scrollTrigger: { trigger: '.about-grid', start: 'top 80%' },
      x: -60, opacity: 0, duration: 0.8, ease: 'power2.out',
    });
    gsap.from('.about-text', {
      scrollTrigger: { trigger: '.about-grid', start: 'top 80%' },
      x: 60, opacity: 0, duration: 0.8, ease: 'power2.out',
    });

    // Counter animation
    gsap.utils.toArray('[data-count]').forEach(function (el) {
      var target = parseInt(el.getAttribute('data-count'));
      var obj = { val: 0 };
      gsap.to(obj, {
        val: target, duration: 2, ease: 'power1.out',
        scrollTrigger: { trigger: el, start: 'top 90%' },
        onUpdate: function () { el.textContent = Math.round(obj.val) + '+'; },
      });
    });

    // Steps staggered
    gsap.utils.toArray('.step-card').forEach(function (card, i) {
      gsap.from(card, {
        scrollTrigger: { trigger: card, start: 'top 88%' },
        y: 50, opacity: 0, duration: 0.6, delay: i * 0.2, ease: 'back.out(1.2)',
      });
    });

    gsap.utils.toArray('.step-number').forEach(function (num, i) {
      gsap.from(num, {
        scrollTrigger: { trigger: num, start: 'top 90%' },
        scale: 0, duration: 0.5, delay: i * 0.2 + 0.1, ease: 'elastic.out(1, 0.4)',
      });
    });

    // Evento features
    gsap.utils.toArray('.evento-feature').forEach(function (f, i) {
      gsap.from(f, {
        scrollTrigger: { trigger: f, start: 'top 88%' },
        y: 30, opacity: 0, duration: 0.5, delay: i * 0.12, ease: 'power2.out',
      });
    });

    // Order section
    gsap.from('.order-summary', {
      scrollTrigger: { trigger: '.order-wrapper', start: 'top 80%' },
      x: -40, opacity: 0, duration: 0.7, ease: 'power2.out',
    });
    gsap.from('.order-form', {
      scrollTrigger: { trigger: '.order-wrapper', start: 'top 80%' },
      x: 40, opacity: 0, duration: 0.7, ease: 'power2.out',
    });

    // Footer
    gsap.from('.footer-grid > *', {
      scrollTrigger: { trigger: '.footer', start: 'top 90%' },
      y: 30, opacity: 0, stagger: 0.12, duration: 0.6, ease: 'power2.out',
    });

    // WhatsApp float
    gsap.from('.wa-float', { scale: 0, duration: 0.5, delay: 1.5, ease: 'elastic.out(1, 0.5)' });
  }

  // ==================
  // VANILLA TILT
  // ==================
  function initTilt() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.innerWidth < 768) return;
    var cards = document.querySelectorAll('[data-tilt]');
    VanillaTilt.init(cards, { max: 8, speed: 400, glare: true, 'max-glare': 0.15, scale: 1.02 });
  }

  // ==================
  // INIT
  // ==================
  function init() {
    var app = document.getElementById('app');

    app.appendChild(buildPromoBanner());
    app.appendChild(buildNav());
    app.appendChild(buildMobileMenu());
    app.appendChild(buildHero());
    app.appendChild(buildProducts());
    app.appendChild(buildCombos());
    app.appendChild(buildBebidas());
    app.appendChild(buildEventos());
    app.appendChild(buildAbout());
    app.appendChild(buildSteps());
    app.appendChild(buildOrderSection());
    app.appendChild(buildFooter());
    app.appendChild(buildWhatsAppFloat());
    app.appendChild(buildCartSidebar());

    // Event listeners
    document.getElementById('hamburger').addEventListener('click', openMobile);
    document.getElementById('mobile-close').addEventListener('click', closeMobile);
    document.getElementById('btn-wa-order').addEventListener('click', sendWhatsApp);
    document.getElementById('btn-email-order').addEventListener('click', sendEmail);
    document.getElementById('nav-cart-btn').addEventListener('click', openCartSidebar);
    document.getElementById('cart-sidebar-close').addEventListener('click', closeCartSidebar);
    document.getElementById('cart-continue-btn').addEventListener('click', function () {
      closeCartSidebar();
      document.getElementById('pedido').scrollIntoView({ behavior: 'smooth' });
    });
    document.getElementById('btn-evento-wa').addEventListener('click', sendEventoQuote);

    requestAnimationFrame(function () {
      initAnimations();
      initTilt();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
