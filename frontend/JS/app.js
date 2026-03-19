// API Configuration
const API_URL = 'http://localhost:5000/api';

// State Management
let currentUser = null;
let favorites = [];
let cars = [];

// Sample Cars Data (replace with API calls)
const sampleCars = [
    {
        id: 1,
        name: 'Ferrari 275',
        year: 1967,
        price: '$85,000',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Vintage_Ferrari_275_GTS.jpg/1280px-Vintage_Ferrari_275_GTS.jpg',
        description: 'A timeless blend of power, elegance, and pure Italian passion.',
        mileage: '45,000 miles',
        condition: 'Excellent'
    },
    {
        id: 2,
        name: 'Mercedes-Benz 300 SL',
        year: 1963,
        price: '$125,000',
        image: 'https://upload.wikimedia.org/wikipedia/commons/3/37/1955_Mercedes-Benz_300_SL_%28W_198%29_03.jpg',
        description: 'Iconic gullwing beauty with legendary performance',
        mileage: '32,000 miles',
        condition: 'Pristine'
    },
    {
        id: 3,
        name: 'Jaguar E-type Roadster',
        year: 1957,
        price: '$295,000',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Jaguar_E-Type_Roadster_%281969%29_Classic-Gala_2021_1X7A0126.jpg/2560px-Jaguar_E-Type_Roadster_%281969%29_Classic-Gala_2021_1X7A0126.jpg',
        description: 'classic British style with breathtaking spe',
        mileage: '28,500 miles',
        condition: 'Excellent'
    },
    {
        id: 4,
        name: 'volkswagen type3 R/T',
        year: 1970,
        price: '$95,000',
        image: 'https://upload.wikimedia.org/wikipedia/commons/b/b2/Volkswagen_Type_3_Cabriolet_%281961%29_Classic-Gala_2021_1X7A0088.jpg',
        description: 'a rare blend of retro charm and road-ready performance',
        mileage: '52,000 miles',
        condition: 'Very Good'
    },
    {
        id: 5,
        name: 'jaguar XK140',
        year: 1955,
        price: '$1,200,000',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Jaguar_XK140_drop_head_coupe_Classic-Gala_2021_1X7A0166.jpg/2560px-Jaguar_XK140_drop_head_coupe_Classic-Gala_2021_1X7A0166.jpg',
        description: 'a rare blend of retro charm and road-ready performance',
        mileage: '18,000 miles',
        condition: 'Museum Quality'
    },
    {
        id: 6,
        name: 'Dodge charger',
        year: 1970,
        price: '$78,000',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/1971_Dodge_Charger%2C_Bangladesh._%2840949552322%29.jpg/1280px-1971_Dodge_Charger%2C_Bangladesh._%2840949552322%29.jpg',
        description: 'bold muscle power wrapped in an unmistakably aggressive design',
        mileage: '41,000 miles',
        condition: 'Excellent'
    },
      {
        id: 7,
        name: 'BMW M1 Motorsport',
        year: 1969,
        price: '$78,000',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/BMW_M1_Procar_of_BMW_Motorsport_%28BMW_M-color%29_Classic-Gala_2022_1X7A0149.jpg/1280px-BMW_M1_Procar_of_BMW_Motorsport_%28BMW_M-color%29_Classic-Gala_2022_1X7A0149.jpg',
        description: 'a rare icon fusing precision engineering with pure racing spirit',
        mileage: '41,000 miles',
        condition: 'Excellent'
    },
      {
        id: 8,
        name: 'Toyota 2000G',
        year: 1969,
        price: '$78,000',
        image: 'https://upload.wikimedia.org/wikipedia/commons/a/aa/Toyota_2000GT_EV.jpg',
        description: 'Japan’s masterpiece of style, speed, and craftsmanship',
        mileage: '41,000 miles',
        condition: 'Excellent'
    },
      {
        id: 9,
        name: 'Rolls-Royce cornicheII Classic-Gala',
        year: 2022,
        price: '$78,000',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Rolls-Royce_Corniche_II_Classic-Gala_2022_1X7A0202.jpg/1280px-Rolls-Royce_Corniche_II_Classic-Gala_2022_1X7A0202.jpg',
        description: 'classic gala luxury with timeless handcrafted elegance',
        mileage: '41,000 miles',
        condition: 'Excellent'
    }
];

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    setupEventListeners();
});

function initializeApp() {
    // Load cars data
    cars = sampleCars;
    
    // Check if user is logged in
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        updateAuthUI();
    }
    
    // Load favorites
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
        favorites = JSON.parse(savedFavorites);
    }
    
    // Render initial content
    renderFeaturedCars();
    renderGallery();
    updateFavoritesCount();
}

function setupEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', handleNavigation);
    });
    
    // Mobile menu
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
    
    // Search
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }
    
    // Forms
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
    
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
    
    // Logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
    
    // Back button
    const backBtn = document.getElementById('backBtn');
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            showPage('gallery');
        });
    }
}

// Navigation Handler
function handleNavigation(e) {
    e.preventDefault();
    const href = e.target.getAttribute('href');
    const page = href.substring(1);
    
    // Check if authentication is required
    if (page === 'dashboard' && !currentUser) {
        showPage('login');
        return;
    }
    
    showPage(page);
}

function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    const page = document.getElementById(pageId);
    if (page) {
        page.classList.add('active');
    }
    
    // Update nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${pageId}`) {
            link.classList.add('active');
        }
    });
    
    // Scroll to top
    window.scrollTo(0, 0);
    
    // Close mobile menu
    document.getElementById('navMenu').classList.remove('active');
    
    // Update page-specific content
    if (pageId === 'dashboard') {
        renderDashboard();
    }
}

// Render Functions
function renderFeaturedCars() {
    const container = document.getElementById('featuredCars'); //Get container element 
    if (!container) return; // exit if container is not working 
    
    const featured = cars.slice(0, 2); // take first 2 cars as featured 
    container.innerHTML = featured.map(car => `
        <div class="car-card" onclick="viewCarDetails(${car.id})">
            <div class="car-card-image">
                <img src="${car.image}" alt="${car.name}">
            </div>
            <div class="car-card-content">
                <h4 class="car-card-title">${car.name}</h4>
                <p class="car-card-price">${car.price}</p>
            </div>
        </div>
    `).join(''); 
}
// render the main car gallery 
function renderGallery(filteredCars = cars) {
    const container = document.getElementById('carGallery');
    if (!container) return;
    // if no cars match the search , show message
    if (filteredCars.length === 0) {
        container.innerHTML = '<p class="empty-favorites">No cars found matching your search.</p>';
        return;
    }
    // render each car card 
    container.innerHTML = filteredCars.map(car => `
        <div class="car-card">
            <div class="car-card-image">
                <img src="${car.image}" alt="${car.name}">
                <button class="favorite-btn ${favorites.includes(car.id) ? 'active' : ''}" 
                        onclick="toggleFavorite(event, ${car.id})">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                </button>
            </div>
            <div class="car-card-content">
                <h3 class="car-card-title">${car.name}</h3>
                <p class="car-card-description">${car.description}</p>
                <div class="car-card-meta">
                    <span class="car-card-mileage">${car.mileage}</span>
                    <span class="car-card-condition">${car.condition}</span>
                </div>
                <div class="car-card-footer">
                    <span class="car-card-price">${car.price}</span>
                    <button class="btn btn-primary" onclick="viewCarDetails(${car.id})">View Details</button>
                </div>
            </div>
        </div>
    `).join('');
}
// details page 
function renderCarDetails(carId) {
    const car = cars.find(c => c.id === carId);
    if (!car) return; // exit if car is not found 
    
    const container = document.getElementById('carDetails');
    if (!container) return;
    // populate detailed layout 
    container.innerHTML = `
        <div class="car-details-grid">
            <div class="car-details-image">
                <img src="${car.image}" alt="${car.name}">
            </div>
            <div class="car-details-info">
                <h2 class="car-details-title">${car.name}</h2>
                <p class="car-details-price">${car.price}</p>
                <div class="car-specs">
                    <div class="spec-row">
                        <span class="spec-label">Year:</span>
                        <span class="spec-value">${car.year}</span>
                    </div>
                    <div class="spec-row">
                        <span class="spec-label">Mileage:</span>
                        <span class="spec-value">${car.mileage}</span>
                    </div>
                    <div class="spec-row">
                        <span class="spec-label">Condition:</span>
                        <span class="spec-value" style="color: #059669; font-weight: 600;">${car.condition}</span>
                    </div>
                </div>
                <p class="car-details-description">${car.description}</p>
                <div class="car-details-actions">
                    <button class="btn btn-primary btn-block">Schedule Test Drive</button>
                    <button class="btn btn-secondary btn-block">Request More Info</button>
                </div>
            </div>
        </div>
    `;
}
// render the favorite section in the dashboard 
function renderDashboard() {
    const favoritesGrid = document.getElementById('favoritesGrid');
    if (!favoritesGrid) return;
    // filter cars that are inn fav list 
    const favoriteCars = cars.filter(car => favorites.includes(car.id));
    // show message if no fav
    if (favoriteCars.length === 0) {
        favoritesGrid.innerHTML = '<p class="empty-favorites">No favorites yet. Start exploring our collection!</p>';
        return;
    }
    // render fav car cards
    favoritesGrid.innerHTML = favoriteCars.map(car => `
        <div class="car-card">
            <div class="car-card-image">
                <img src="${car.image}" alt="${car.name}">
            </div>
            <div class="car-card-content">
                <h4 class="car-card-title">${car.name}</h4>
                <p class="car-card-price">${car.price}</p>
            </div>
        </div>
    `).join('');
}

// Event Handlers
function handleSearch(e) {
    const query = e.target.value.toLowerCase();
    const filtered = cars.filter(car => 
        car.name.toLowerCase().includes(query) ||
        car.year.toString().includes(query)
    );
    renderGallery(filtered);
}

function toggleFavorite(event, carId) {
    event.stopPropagation();
    
    if (!currentUser) {
        alert('Please login to add favorites');
        showPage('login');
        return;
    }
    
    const index = favorites.indexOf(carId);
    if (index > -1) {
        favorites.splice(index, 1);
    } else {
        favorites.push(carId);
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
    renderGallery();
    updateFavoritesCount();
}

function viewCarDetails(carId) {
    renderCarDetails(carId);
    showPage('details');
}

async function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    try {
        // Simulate API call
        // const response = await fetch(`${API_URL}/auth/login`, {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ email, password })
        // });
        
        // For demo purposes
        const user = { id: 1, email, name: 'John Doe' };
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        updateAuthUI();
        showPage('dashboard');
        
        alert('Login successful!');
    } catch (error) {
        console.error('Login error:', error);
        alert('Login failed. Please try again.');
    }
}

async function handleRegister(e) {
    e.preventDefault();
    
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;
    
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }
    
    try {
        // Simulate API call
        // const response = await fetch(`${API_URL}/auth/register`, {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ name, email, password })
        // });
        
        // For demo purposes
        const user = { id: 1, email, name };
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        updateAuthUI();
        showPage('dashboard');
        
        alert('Registration successful!');
    } catch (error) {
        console.error('Registration error:', error);
        alert('Registration failed. Please try again.');
    }
}

async function handleContactSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    try {
        // Simulate API call
        // await fetch(`${API_URL}/contact`, {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(data)
        // });
        
        alert('Message sent successfully! We will get back to you soon.');
        e.target.reset();
    } catch (error) {
        console.error('Contact form error:', error);
        alert('Failed to send message. Please try again.');
    }
}

function handleLogout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    updateAuthUI();
    showPage('home');
    alert('Logged out successfully!');
}

// UI Update Functions
function updateAuthUI() {
    const navMenu = document.querySelector('.nav-menu');
    
    if (currentUser) {
        // User is logged in
        navMenu.innerHTML = `
            <li><a href="#home" class="nav-link">Home</a></li>
            <li><a href="#gallery" class="nav-link">Gallery</a></li>
            <li><a href="#contact" class="nav-link">Contact</a></li>
            <li><a href="#dashboard" class="nav-link">Dashboard</a></li>
        `;
    } else {
        // User is logged out
        navMenu.innerHTML = `
            <li><a href="#home" class="nav-link active">Home</a></li>
            <li><a href="#gallery" class="nav-link">Gallery</a></li>
            <li><a href="#contact" class="nav-link">Contact</a></li>
            <li><a href="#login" class="nav-link auth-btn">Login</a></li>
            <li><a href="#register" class="nav-link register-btn">Register</a></li>
        `;
    }
    
    // Reattach event listeners
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', handleNavigation);
    });
}

function updateFavoritesCount() {
    const countElement = document.getElementById('favoritesCount');
    if (countElement) {
        countElement.textContent = favorites.length;
    }
}

// Utility Functions
function formatPrice(price) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
    }).format(price);
}

function showPage(pageId) {
    // sab pages hide
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
        page.style.display = 'none';
    });

    // target page show
    const activePage = document.getElementById(pageId);
    if (activePage) {
        activePage.classList.add('active');
        activePage.style.display = 'block';
    }
}

// hash change handle
function handleAuthPages() {
    const hash = window.location.hash.replace('#', '');

    if (hash === 'login') {
        showPage('login');     // ❌ register page hide
    } 
    else if (hash === 'register') {
        showPage('register');  // ❌ login page hide
    }
}

// nav clicks
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function () {
        const target = this.getAttribute('href').replace('#', '');
        showPage(target);
        handleAuthPages();
    });
});

// page refresh / direct URL
window.addEventListener('load', () => {
    const hash = window.location.hash.replace('#', '') || 'home';
    showPage(hash);
    handleAuthPages();
});

/* ========== DOM Elements ========== */
const button = document.getElementById("locationBtn");  // Button element
const statusText = document.getElementById("status");  // Status box
const resultBox = document.getElementById("result");   // Result box

/* ========== Event Listener ========== */
button.addEventListener("click", getLocation);  // Run getLocation() when button clicked

/* ========== Get User Location (Browser Geolocation API) ========== */
function getLocation() {
  // Clear previous result
  resultBox.innerHTML = "";
  statusText.innerText = "Requesting location permission...";

  // Check if browser supports Geolocation
  if (!navigator.geolocation) {
    statusText.innerText = "Geolocation not supported by your browser.";
    return;
  }

  // Request current position
  navigator.geolocation.getCurrentPosition(
    showPosition,    // Success callback
    handleError,     // Error callback
    {
      enableHighAccuracy: true,  // Use GPS if available for better precision
      timeout: 10000,            // Timeout after 10 seconds
      maximumAge: 0              // Do not use cached position
    }
  );
}

/* ========== Success Callback ========== */
function showPosition(position) {
  const lat = position.coords.latitude;   // Latitude
  const lon = position.coords.longitude;  // Longitude

  statusText.innerText = "Location retrieved successfully!";

  // ===== Reverse Geocoding: Convert coordinates to human-readable address =====
  // Using OpenStreetMap Nominatim API (free)
  fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`)
    .then(response => response.json())  // Convert response to JSON
    .then(data => {
      const address = data.address;     // Extract address object from response
      resultBox.innerHTML = `
        <strong>Latitude:</strong> ${lat}<br>
        <strong>Longitude:</strong> ${lon}<br>
        <strong>Country:</strong> ${address.country || "N/A"}<br>
        <strong>State:</strong> ${address.state || "N/A"}<br>
        <strong>City:</strong> ${address.city || address.town || address.village || "N/A"}<br>
        <strong>Street:</strong> ${address.road || "N/A"}<br>
        <strong>Postcode:</strong> ${address.postcode || "N/A"}
      `;
    })
    .catch(error => {
      // Handle errors from API request
      resultBox.innerHTML = "Unable to fetch address details.";
      console.error(error);
    });
}

/* ========== Error Callback ========== */
function handleError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      statusText.innerText = "Permission denied by user.";
      break;
    case error.POSITION_UNAVAILABLE:
      statusText.innerText = "Location info unavailable.";
      break;
    case error.TIMEOUT:
      statusText.innerText = "Location request timed out.";
      break;
    default:
      statusText.innerText = "An unknown error occurred.";
  }
}
