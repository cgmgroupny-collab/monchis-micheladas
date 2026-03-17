/* ============================================
   GUO Monchis — Micheladas Artesanales
   JS-driven page with GSAP animations
   ============================================ */
(function () {
  'use strict';

  // ==================
  // CONFIG
  // ==================
  const PHONE = '+50249062060';
  const PHONE_DISPLAY = '+502 4906 2060';
  const EMAIL = 'guomonchis@gmail.com';
  const WA_URL = 'https://wa.me/50249062060';
  const LOCATION = 'Ciudad de Guatemala, Guatemala';
  const PROMO_DISCOUNT = 50;
  const MIN_ORDER = 100;

  // ==================
  // PRODUCTS & SIZES
  // ==================
  const PRODUCTS = [
    {
      id: 1,
      name: 'Mix Cl\u00E1sico',
      desc: 'La receta original con tomate, lim\u00F3n y especias perfectas.',
      gradient: 'linear-gradient(135deg, #E84B8A 0%, #F06292 100%)',
    },
    {
      id: 2,
      name: 'Mix Mango-Habanero',
      desc: 'Tropical y picante, una explosi\u00F3n de sabor irresistible.',
      gradient: 'linear-gradient(135deg, #F57C00 0%, #FFB74D 100%)',
    },
    {
      id: 3,
      name: 'Mix Tamarindo',
      desc: 'Dulce, \u00E1cida y adictivamente refrescante.',
      gradient: 'linear-gradient(135deg, #8D6E63 0%, #D7CCC8 100%)',
    },
    {
      id: 4,
      name: 'Mix Chamoy',
      desc: 'Con chamoy artesanal, la favorita de todos.',
      gradient: 'linear-gradient(135deg, #AD1457 0%, #E91E63 100%)',
    },
  ];

  var SIZES = [
    { label: '500ml', price: 35 },
    { label: '1 Litro', price: 65 },
  ];

  var DELIVERY_MIN = 25;
  var DELIVERY_MAX = 30;

  // ==================
  // SVG ICONS
  // ==================
  const ICONS = {
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
  };

  function icon(name, size) {
    size = size || 24;
    return '<span class="icon" style="width:' + size + 'px;height:' + size + 'px">' + ICONS[name] + '</span>';
  }

  // ==================
  // CART STATE
  // ==================
  var cart = [];

  function addToCart(productId, sizeIdx) {
    var product = PRODUCTS.find(function (p) { return p.id === productId; });
    var size = SIZES[sizeIdx];
    var cartKey = productId + '-' + sizeIdx;
    var existing = cart.find(function (i) { return i.id === cartKey; });
    if (existing) {
      existing.qty++;
    } else {
      cart.push({ id: cartKey, name: product.name + ' (' + size.label + ')', price: size.price, qty: 1 });
    }
    updateCartUI();
    // Button feedback
    var btn = document.querySelector('[data-add="' + productId + '"][data-size="' + sizeIdx + '"]');
    if (btn) {
      var origText = btn.innerHTML;
      btn.classList.add('added');
      btn.innerHTML = icon('check', 14) + ' Listo';
      setTimeout(function () {
        btn.classList.remove('added');
        btn.innerHTML = origText;
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
  // DOM BUILDERS
  // ==================

  function buildPromoBanner() {
    var text = '\u2605 Q' + PROMO_DISCOUNT + ' DE DESCUENTO + ENV\u00CDO GRATIS en pedidos mayores a Q' + MIN_ORDER + ' \u2022 Entrega el mismo d\u00EDa \u2022 Ped\u00ED antes de las 7:40 AM \u2605';
    var banner = document.createElement('div');
    banner.className = 'promo-banner';
    // Duplicate text for seamless marquee
    banner.innerHTML =
      '<div class="promo-track">' +
      '<span>' + text + '</span>' +
      '<span>' + text + '</span>' +
      '<span>' + text + '</span>' +
      '<span>' + text + '</span>' +
      '</div>';
    return banner;
  }

  function buildNav() {
    var nav = document.createElement('nav');
    nav.className = 'nav';
    nav.id = 'main-nav';
    nav.innerHTML =
      '<a href="#" class="nav-logo">' +
        '<img src="logo-1.png" alt="GUO Monchis logo" width="48" height="48">' +
        '<span class="nav-logo-text">GUO Monchis</span>' +
      '</a>' +
      '<ul class="nav-links">' +
        '<li><a href="#productos">Productos</a></li>' +
        '<li><a href="#nosotros">Nosotros</a></li>' +
        '<li><a href="#como-pedir">C\u00F3mo Pedir</a></li>' +
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

    // Scroll effect
    var scrolled = false;
    window.addEventListener('scroll', function () {
      var s = window.scrollY > 20;
      if (s !== scrolled) {
        scrolled = s;
        nav.classList.toggle('scrolled', s);
      }
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
          '<li><a href="#nosotros">Nosotros</a></li>' +
          '<li><a href="#como-pedir">C\u00F3mo Pedir</a></li>' +
          '<li><a href="#pedido">Ordenar</a></li>' +
          '<li><a href="tel:' + PHONE + '">' + icon('phone', 18) + ' Llamar</a></li>' +
          '<li><a href="' + WA_URL + '" target="_blank" rel="noopener" style="color:var(--green-wa)">' + icon('whatsapp', 18) + ' WhatsApp</a></li>' +
        '</ul>' +
      '</div>';

    // Close on overlay click
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeMobile();
    });

    // Close on link click
    overlay.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeMobile);
    });

    return overlay;
  }

  function openMobile() {
    var m = document.getElementById('mobile-menu');
    m.style.display = 'block';
    requestAnimationFrame(function () {
      m.classList.add('open');
    });
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
      // Decorative circles
      '<div class="deco-circle" style="width:300px;height:300px;background:var(--pink-light);opacity:0.18;top:-80px;right:-60px;animation:float-slow 8s ease-in-out infinite"></div>' +
      '<div class="deco-circle" style="width:180px;height:180px;background:var(--pink);opacity:0.08;bottom:40px;left:-40px;animation:float-medium 10s ease-in-out infinite"></div>' +
      '<div class="deco-circle" style="width:100px;height:100px;background:var(--gold-light);opacity:0.15;top:30%;left:10%;animation:float-slow 12s ease-in-out infinite 2s"></div>' +
      '<div class="hero-content">' +
        '<div class="hero-logo">' +
          '<img src="logo-2.png" alt="GUO Monchis — Micheladas Artesanales" width="180" height="180">' +
        '</div>' +
        '<h1>Micheladas Artesanales</h1>' +
        '<p class="hero-sub">Mix de michelada para preparar en casa. Hecho con amor en Ciudad de Guatemala.</p>' +
        '<div class="hero-actions">' +
          '<a href="#pedido" class="btn-primary">' + icon('bag', 20) + ' Pedir Ahora</a>' +
          '<a href="#productos" class="btn-secondary">' + icon('arrow', 20) + ' Ver Productos</a>' +
        '</div>' +
      '</div>';
    return section;
  }

  function buildProducts() {
    var section = document.createElement('section');
    section.className = 'products';
    section.id = 'productos';

    var cards = PRODUCTS.map(function (p) {
      return (
        '<div class="product-card" data-tilt>' +
          '<div class="product-img" style="background:' + p.gradient + '">' +
            '<span class="placeholder-icon">' + ICONS.drink + '</span>' +
            '<span class="placeholder-label">Foto pronto</span>' +
          '</div>' +
          '<div class="product-body">' +
            '<h3>' + p.name + '</h3>' +
            '<p class="product-desc">' + p.desc + '</p>' +
            '<div class="product-sizes">' +
              '<button class="btn-add btn-size" data-add="' + p.id + '" data-size="0">' +
                '<span class="size-label">500ml</span><span class="size-price">Q35</span>' +
              '</button>' +
              '<button class="btn-add btn-size" data-add="' + p.id + '" data-size="1">' +
                '<span class="size-label">1 Litro</span><span class="size-price">Q65</span>' +
              '</button>' +
            '</div>' +
          '</div>' +
        '</div>'
      );
    }).join('');

    section.innerHTML =
      '<div class="section-pad">' +
        '<div class="section-header">' +
          '<span class="section-tag">Nuestros Productos</span>' +
          '<h2>Mix de Michelada para Llevar</h2>' +
          '<p>Lleva nuestro mix artesanal a tu casa y prepara micheladas perfectas cuando quieras.</p>' +
        '</div>' +
        '<div class="products-grid">' + cards + '</div>' +
      '</div>';

    // Add click handlers after insert
    setTimeout(function () {
      document.querySelectorAll('[data-add]').forEach(function (btn) {
        btn.addEventListener('click', function () {
          addToCart(parseInt(this.getAttribute('data-add')), parseInt(this.getAttribute('data-size')));
        });
      });
    }, 0);

    return section;
  }

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
            '<p>En GUO Monchis creemos que una buena michelada tiene el poder de unir a las personas. Nuestros mixes artesanales est\u00E1n hechos con ingredientes frescos y recetas perfeccionadas con amor.</p>' +
            '<p>Cada envase est\u00E1 listo para que prepares la michelada perfecta en la comodidad de tu hogar, en tus reuniones o donde quieras disfrutar.</p>' +
            '<div class="about-stats">' +
              '<div class="stat"><div class="stat-number" data-count="4">0</div><div class="stat-label">Sabores</div></div>' +
              '<div class="stat"><div class="stat-number" data-count="500">0</div><div class="stat-label">Clientes Felices</div></div>' +
              '<div class="stat"><div class="stat-number" data-count="3">0</div><div class="stat-label">A\u00F1os</div></div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>';
    return section;
  }

  function buildSteps() {
    var section = document.createElement('section');
    section.className = 'steps';
    section.id = 'como-pedir';
    section.innerHTML =
      '<div class="section-pad">' +
        '<div class="section-header">' +
          '<span class="section-tag">Ordenar es F\u00E1cil</span>' +
          '<h2>\u00BFC\u00F3mo Pedir?</h2>' +
          '<p>En 3 simples pasos recib\u00EDs tu mix de michelada en la puerta de tu casa.</p>' +
        '</div>' +
        '<div class="steps-grid">' +
          '<div class="step-card">' +
            '<div class="step-number">1</div>' +
            '<div class="step-icon">' + ICONS.bag + '</div>' +
            '<h3>Eleg\u00ED tus Productos</h3>' +
            '<p>Explor\u00E1 nuestros sabores y agreg\u00E1 los que m\u00E1s te gusten a tu pedido.</p>' +
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
          // Summary
          '<div class="order-summary" id="order-summary">' +
            '<h3>' + icon('cart', 22) + ' Resumen</h3>' +
            '<div id="summary-content">' +
              '<div class="summary-empty">Tu carrito est\u00E1 vac\u00EDo. Agreg\u00E1 productos arriba.</div>' +
            '</div>' +
          '</div>' +
          // Form
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
              '<textarea id="order-notes" placeholder="Instrucciones especiales, preferencias..."></textarea>' +
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

    // Attach qty handlers
    container.querySelectorAll('[data-qty-minus]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        updateQty(parseInt(this.getAttribute('data-qty-minus')), -1);
      });
    });
    container.querySelectorAll('[data-qty-plus]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        updateQty(parseInt(this.getAttribute('data-qty-plus')), 1);
      });
    });
  }

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

    var msg = '*Nuevo Pedido \u2014 GUO Monchis*\n\n';
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
    var subject = encodeURIComponent('Nuevo Pedido \u2014 GUO Monchis');
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

    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeCartSidebar();
    });

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

    // Attach sidebar qty handlers
    body.querySelectorAll('[data-sq-minus]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        updateQty(this.getAttribute('data-sq-minus'), -1);
        renderCartSidebar();
      });
    });
    body.querySelectorAll('[data-sq-plus]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        updateQty(this.getAttribute('data-sq-plus'), 1);
        renderCartSidebar();
      });
    });
  }

  function buildFooter() {
    var footer = document.createElement('footer');
    footer.className = 'footer';
    footer.innerHTML =
      '<div class="footer-grid">' +
        '<div class="footer-brand">' +
          '<div class="footer-logo">' +
            '<img src="logo-1.png" alt="GUO Monchis" width="56" height="56">' +
            '<span>GUO Monchis</span>' +
          '</div>' +
          '<p>Micheladas artesanales para llevar. Hechas con ingredientes frescos y mucho cari\u00F1o en Ciudad de Guatemala.</p>' +
        '</div>' +
        '<div class="footer-col">' +
          '<h4>Navegaci\u00F3n</h4>' +
          '<ul>' +
            '<li><a href="#productos">Productos</a></li>' +
            '<li><a href="#nosotros">Nosotros</a></li>' +
            '<li><a href="#como-pedir">C\u00F3mo Pedir</a></li>' +
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
        '\u00A9 ' + new Date().getFullYear() + ' GUO Monchis. Todos los derechos reservados.' +
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

    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Hero entrance
    var heroTl = gsap.timeline({ defaults: { ease: 'back.out(1.4)', duration: 0.8 } });
    heroTl
      .from('.hero-logo', { scale: 0.6, opacity: 0, duration: 1 })
      .from('.hero h1', { y: 40, opacity: 0 }, '-=0.4')
      .from('.hero-sub', { y: 30, opacity: 0 }, '-=0.5')
      .from('.hero-actions > *', { y: 25, opacity: 0, stagger: 0.12 }, '-=0.4')
      .from('.deco-circle', { scale: 0, opacity: 0, stagger: 0.15, duration: 1, ease: 'elastic.out(1, 0.5)' }, '-=0.6');

    // Nav
    gsap.from('.nav', { y: -80, opacity: 0, duration: 0.6, ease: 'power2.out', delay: 0.2 });

    // Promo banner
    gsap.from('.promo-banner', { y: -44, opacity: 0, duration: 0.5, ease: 'power2.out' });

    // Products scroll-triggered
    gsap.utils.toArray('.product-card').forEach(function (card, i) {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
        y: 60,
        opacity: 0,
        duration: 0.7,
        delay: i * 0.1,
        ease: 'power2.out',
      });
    });

    // Section headers
    gsap.utils.toArray('.section-header').forEach(function (header) {
      gsap.from(header.children, {
        scrollTrigger: {
          trigger: header,
          start: 'top 85%',
        },
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power2.out',
      });
    });

    // About section
    gsap.from('.about-img', {
      scrollTrigger: { trigger: '.about-grid', start: 'top 80%' },
      x: -60,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
    });

    gsap.from('.about-text', {
      scrollTrigger: { trigger: '.about-grid', start: 'top 80%' },
      x: 60,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
    });

    // Counter animation
    gsap.utils.toArray('[data-count]').forEach(function (el) {
      var target = parseInt(el.getAttribute('data-count'));
      var obj = { val: 0 };
      gsap.to(obj, {
        val: target,
        duration: 2,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
        },
        onUpdate: function () {
          el.textContent = Math.round(obj.val) + '+';
        },
      });
    });

    // Steps staggered
    gsap.utils.toArray('.step-card').forEach(function (card, i) {
      gsap.from(card, {
        scrollTrigger: { trigger: card, start: 'top 88%' },
        y: 50,
        opacity: 0,
        duration: 0.6,
        delay: i * 0.2,
        ease: 'back.out(1.2)',
      });
    });

    // Step numbers bounce
    gsap.utils.toArray('.step-number').forEach(function (num, i) {
      gsap.from(num, {
        scrollTrigger: { trigger: num, start: 'top 90%' },
        scale: 0,
        duration: 0.5,
        delay: i * 0.2 + 0.1,
        ease: 'elastic.out(1, 0.4)',
      });
    });

    // Order section
    gsap.from('.order-summary', {
      scrollTrigger: { trigger: '.order-wrapper', start: 'top 80%' },
      x: -40,
      opacity: 0,
      duration: 0.7,
      ease: 'power2.out',
    });

    gsap.from('.order-form', {
      scrollTrigger: { trigger: '.order-wrapper', start: 'top 80%' },
      x: 40,
      opacity: 0,
      duration: 0.7,
      ease: 'power2.out',
    });

    // Footer
    gsap.from('.footer-grid > *', {
      scrollTrigger: { trigger: '.footer', start: 'top 90%' },
      y: 30,
      opacity: 0,
      stagger: 0.12,
      duration: 0.6,
      ease: 'power2.out',
    });

    // WhatsApp float entrance
    gsap.from('.wa-float', {
      scale: 0,
      duration: 0.5,
      delay: 1.5,
      ease: 'elastic.out(1, 0.5)',
    });
  }

  // ==================
  // VANILLA TILT
  // ==================
  function initTilt() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.innerWidth < 768) return; // No tilt on mobile

    var cards = document.querySelectorAll('[data-tilt]');
    VanillaTilt.init(cards, {
      max: 8,
      speed: 400,
      glare: true,
      'max-glare': 0.15,
      scale: 1.02,
    });
  }

  // ==================
  // INIT
  // ==================
  function init() {
    var app = document.getElementById('app');

    // Build page
    app.appendChild(buildPromoBanner());
    app.appendChild(buildNav());
    app.appendChild(buildMobileMenu());
    app.appendChild(buildHero());
    app.appendChild(buildProducts());
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

    // Init animations after DOM is ready
    requestAnimationFrame(function () {
      initAnimations();
      initTilt();
    });
  }

  // Start
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
