const products = [
  {
    id: 1,
    name: 'Aero Runner',
    price: 129,
    category: 'fashion',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    badge: '20% Off',
    rating: 4.8,
  },
  {
    id: 2,
    name: 'Nova Phone',
    price: 899,
    category: 'tech',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
    badge: 'New',
    rating: 4.9,
  },
  {
    id: 3,
    name: 'Chrono Watch',
    price: 249,
    category: 'accessories',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    badge: 'Hot',
    rating: 4.7,
  },
  {
    id: 4,
    name: 'Studio Headphones',
    price: 199,
    category: 'tech',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    badge: 'Sale',
    rating: 4.8,
  },
  {
    id: 5,
    name: 'Lumen Lamp',
    price: 89,
    category: 'home',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    badge: 'Best Seller',
    rating: 4.6,
  },
  {
    id: 6,
    name: 'Sculpt Chair',
    price: 349,
    category: 'home',
    image: 'https://images.unsplash.com/photo-1519947486511-46149fa0a254?auto=format&fit=crop&w=800&q=80',
    badge: 'Trending',
    rating: 4.8,
  },
  {
    id: 7,
    name: 'Orbit Backpack',
    price: 79,
    category: 'accessories',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    badge: 'Fresh',
    rating: 4.5,
  },
  {
    id: 8,
    name: 'North Jacket',
    price: 169,
    category: 'fashion',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
    badge: 'Limited',
    rating: 4.7,
  },
  {
    id: 9,
    name: 'Crest Speaker',
    price: 149,
    category: 'tech',
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80',
    badge: 'Popular',
    rating: 4.8,
  },
  {
    id: 10,
    name: 'Halo Mug',
    price: 24,
    category: 'home',
    image: 'https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=800&q=80',
    badge: 'Eco',
    rating: 4.4,
  },
  {
    id: 11,
    name: 'Atlas Glasses',
    price: 99,
    category: 'accessories',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
    badge: 'New',
    rating: 4.6,
  },
  {
    id: 12,
    name: 'Pace Smartwatch',
    price: 279,
    category: 'tech',
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80',
    badge: 'Top Rated',
    rating: 4.9,
  }
];

const cart = JSON.parse(localStorage.getItem('novacart-cart') || '[]');
const itemsPerPage = 8;
let currentPage = 1;
let filteredProducts = [...products];

function renderProducts() {
  const grid = document.getElementById('productGrid');
  const pagination = document.getElementById('pagination');

  if (!grid) return;

  const searchValue = document.getElementById('searchInput')?.value.toLowerCase() || '';
  const categoryValue = document.getElementById('categoryFilter')?.value || 'all';
  const sortValue = document.getElementById('sortSelect')?.value || 'default';

  filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchValue);
    const matchesCategory = categoryValue === 'all' || product.category === categoryValue;
    return matchesSearch && matchesCategory;
  });

  if (sortValue === 'price-asc') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortValue === 'price-desc') {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortValue === 'name') {
    filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
  }

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const visibleProducts = filteredProducts.slice(start, start + itemsPerPage);

  grid.innerHTML = visibleProducts
    .map(
      (product) => `
        <article class="product-card reveal">
          <span class="badge">${product.badge}</span>
          <img src="${product.image}" alt="${product.name}" />
          <div class="product-info">
            <h3>${product.name}</h3>
            <div class="rating"><i class="fa-solid fa-star"></i> ${product.rating}</div>
            <p>$${product.price.toFixed(2)}</p>
            <button class="btn btn-primary small add-to-cart" data-name="${product.name}" data-price="${product.price}" data-image="${product.image}">Add to Cart</button>
          </div>
        </article>
      `
    )
    .join('');

  pagination.innerHTML = '';
  for (let i = 1; i <= totalPages; i += 1) {
    const button = document.createElement('button');
    button.textContent = i;
    button.className = i === currentPage ? 'active' : '';
    button.addEventListener('click', () => {
      currentPage = i;
      renderProducts();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    pagination.appendChild(button);
  }

  document.querySelectorAll('.add-to-cart').forEach((button) => {
    button.addEventListener('click', addToCart);
  });
}

function addToCart(event) {
  const button = event.currentTarget;
  const item = {
    name: button.dataset.name,
    price: Number(button.dataset.price),
    image: button.dataset.image,
    quantity: 1,
  };

  const existingItem = cart.find((entry) => entry.name === item.name);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push(item);
  }

  localStorage.setItem('novacart-cart', JSON.stringify(cart));
  updateCartCount();
  renderCart();
}

function updateCartCount() {
  const countElements = document.querySelectorAll('.cart-count');
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  countElements.forEach((element) => {
    element.textContent = count;
  });
}

function renderCart() {
  const container = document.getElementById('cartItems');
  if (!container) return;

  if (!cart.length) {
    container.innerHTML = `
      <div class="empty-state">
        <h3>Your cart is empty</h3>
        <p>Explore our collection and add a few favorite pieces.</p>
        <a class="btn btn-primary" href="products.html">Continue Shopping</a>
      </div>
    `;
    updateSummary(0, 0, 0);
    return;
  }

  container.innerHTML = cart
    .map(
      (item, index) => `
        <article class="cart-item">
          <img src="${item.image}" alt="${item.name}" />
          <div>
            <h3>${item.name}</h3>
            <p>$${item.price.toFixed(2)} each</p>
            <div class="cart-controls">
              <button class="qty-btn" data-action="decrease" data-index="${index}">-</button>
              <span>${item.quantity}</span>
              <button class="qty-btn" data-action="increase" data-index="${index}">+</button>
            </div>
          </div>
          <div>
            <strong>$${(item.price * item.quantity).toFixed(2)}</strong>
            <button class="btn btn-secondary small" data-action="remove" data-index="${index}">Remove</button>
          </div>
        </article>
      `
    )
    .join('');

  container.querySelectorAll('.qty-btn, .btn-secondary').forEach((button) => {
    button.addEventListener('click', handleCartAction);
  });

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  updateSummary(subtotal, subtotal > 0 ? 18 : 0, subtotal > 0 ? subtotal + 18 : 0);
}

function handleCartAction(event) {
  const button = event.currentTarget;
  const action = button.dataset.action;
  const index = Number(button.dataset.index);

  if (action === 'increase') {
    cart[index].quantity += 1;
  } else if (action === 'decrease') {
    cart[index].quantity -= 1;
    if (cart[index].quantity <= 0) {
      cart.splice(index, 1);
    }
  } else if (action === 'remove') {
    cart.splice(index, 1);
  }

  localStorage.setItem('novacart-cart', JSON.stringify(cart));
  updateCartCount();
  renderCart();
}

function updateSummary(subtotal, shipping, total) {
  const subtotalEl = document.getElementById('subtotal');
  const shippingEl = document.getElementById('shipping');
  const totalEl = document.getElementById('total');

  if (!subtotalEl || !shippingEl || !totalEl) return;

  subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  shippingEl.textContent = `$${shipping.toFixed(2)}`;
  totalEl.textContent = `$${total.toFixed(2)}`;
}

function initTheme() {
  const toggle = document.getElementById('themeToggle');
  if (!toggle) return;

  const savedTheme = localStorage.getItem('novacart-theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  toggle.innerHTML = savedTheme === 'dark' ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';

  toggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('novacart-theme', currentTheme);
    toggle.innerHTML = currentTheme === 'dark' ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
  });
}

function initReveal() {
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  reveals.forEach((element) => observer.observe(element));
}

function initCounters() {
  document.querySelectorAll('.counter').forEach((counter) => {
    const target = Number(counter.dataset.target || 0);
    let current = 0;
    const step = Math.ceil(target / 60);
    const interval = setInterval(() => {
      current += step;
      if (current >= target) {
        counter.textContent = target.toLocaleString();
        clearInterval(interval);
      } else {
        counter.textContent = current.toLocaleString();
      }
    }, 25);
  });
}

function initFaq() {
  document.querySelectorAll('.faq-question').forEach((button) => {
    button.addEventListener('click', () => {
      const item = button.closest('.faq-item');
      item.classList.toggle('active');
    });
  });
}

function initMenu() {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    const isOpen = nav.classList.contains('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
}

function initScrollButtons() {
  const backToTopButton = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      backToTopButton?.classList.add('show');
    } else {
      backToTopButton?.classList.remove('show');
    }
  });

  backToTopButton?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function initLoader() {
  window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader) {
      loader.classList.add('hidden');
      setTimeout(() => loader.remove(), 400);
    }
  });
}

function initProductPage() {
  const searchInput = document.getElementById('searchInput');
  const categoryFilter = document.getElementById('categoryFilter');
  const sortSelect = document.getElementById('sortSelect');

  [searchInput, categoryFilter, sortSelect].forEach((element) => {
    element?.addEventListener('input', () => {
      currentPage = 1;
      renderProducts();
    });
    element?.addEventListener('change', () => {
      currentPage = 1;
      renderProducts();
    });
  });

  renderProducts();
}

function initContactForm() {
  const form = document.getElementById('contactForm');
  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    alert('Thanks for reaching out! We will get back to you shortly.');
    form.reset();
  });
}

function initApp() {
  updateCartCount();
  initTheme();
  initReveal();
  initCounters();
  initFaq();
  initMenu();
  initScrollButtons();
  initLoader();
  initProductPage();
  initContactForm();
  renderCart();
}

document.addEventListener('DOMContentLoaded', initApp);
