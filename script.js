/**
 * InsavTV - Asosiy Ilova Logikasi
 */

// 1. ILOVANI BOSHLASH (LOGIN)
function initApp() {
    const email = document.getElementById('emailField').value;
    
    if (email.includes('@')) {
        document.getElementById('loginPage').classList.add('hidden');
        document.getElementById('mainApp').classList.remove('hidden');
        
        // Login qilganda foydalanuvchi emailini profilda yangilash
        document.getElementById('userEmailDisplay').innerText = email;
        
        // Trenddagi kinolarni yuklash
        loadTrendingMovies();
        showToast("Xush kelibsiz!");
    } else {
        alert("Iltimos, to'g'ri email kiriting!");
    }
}

// 2. NAVIGATSIYA (SECTIONLARNI ALMASHTIRISH)
function showSection(sectionId, event) {
    if (event) event.preventDefault();

    // Barcha sectionlarni yashirish
    const sections = ['homeSection', 'studioSection', 'profileSection'];
    sections.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.add('hidden');
    });

    // Tanlangan sectionni ko'rsatish
    const target = document.getElementById(sectionId + 'Section');
    if (target) target.classList.remove('hidden');

    // Menu aktivligini yangilash
    updateActiveLink(sectionId);
}

function updateActiveLink(id) {
    // Desktop Nav
    document.querySelectorAll('.nav-links a').forEach(a => {
        a.classList.remove('active');
        if (a.innerText.toLowerCase().includes(id === 'home' ? 'asosiy' : id)) {
            a.classList.add('active');
        }
    });

    // Mobile Nav
    const iconMap = { 'home': 0, 'movies': 1, 'studio': 2, 'profile': 3 };
    const icons = document.querySelectorAll('.mobile-nav i');
    icons.forEach(i => i.classList.remove('active'));
    if (icons[iconMap[id]]) icons[iconMap[id]].classList.add('active');
}

function openEditModal() {
    const modal = document.getElementById('editModal');
    if (modal) {
        modal.classList.remove('hidden');
        // Skrinshotingizdagi kabi pastga tushib ketmasligi uchun:
        document.body.style.overflow = 'hidden'; // Modal ochiqligida orqa fon aylanmaydi
    }
}

function closeEditModal() {
    const modal = document.getElementById('editModal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto'; // Skrollni qaytarish
    }
}

function saveProfile() {
    // Elementlarni tekshirib olish
    const editName = document.getElementById('editName');
    const editUsername = document.getElementById('editUsername');

    // Agar elementlar mavjud bo'lsa, qiymatni oladi
    if (editName && editUsername) {
        const newName = editName.value;
        const newUsername = editUsername.value;
        
        const displayEl = document.getElementById('userNameDisplay');
        if (displayEl) displayEl.innerText = newName;
        
        closeEditModal();
        console.log("Profil saqlandi!");
    } else {
        console.warn("Tahrirlash elementlari topilmadi. HTML ID-larni tekshiring.");
    }
}

// 4. RASM YUKLASH (AVATAR PREVIEW)
function previewImage(event) {
    const reader = new FileReader();
    reader.onload = function() {
        const output = document.getElementById('userAvatar');
        output.src = reader.result;
        showToast("Rasm yuklandi!");
    };
    if(event.target.files[0]) {
        reader.readAsDataURL(event.target.files[0]);
    }
}

function playMovie(videoSrc) {
    const modal = document.getElementById('videoModal');
    const video = document.getElementById('mainVideo');
    
    if (modal && video) {
        video.src = videoSrc;
        modal.style.display = 'flex'; // Modalni ko'rsatish
        video.play();
    } else {
        console.error("Video modal yoki pleyer topilmadi!");
    }
}

function closePlayer() {
    const modal = document.getElementById('videoModal');
    const video = document.getElementById('mainVideo');
    if (modal && video) {
        modal.style.display = 'none';
        video.pause();
        video.src = "";
    }
}

// 6. TRENDDAGI KINOLAR (DINAMIK)
function loadTrendingMovies() {
    const grid = document.getElementById('trendingGrid');
    if (!grid) return;

    const movies = [
        { title: "Batman", img: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=300" },
        { title: "Joker", img: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?auto=format&fit=crop&w=300" },
        { title: "Avengers", img: "https://images.unsplash.com/photo-1568833450751-fba3c6b2d129?auto=format&fit=crop&w=300" }
    ];

    grid.innerHTML = movies.map(m => `
        <div class="movie-card glass-card" onclick="playMovie('https://www.w3schools.com/html/mov_bbb.mp4')">
            <img src="${m.img}" alt="${m.title}">
            <div class="movie-info">
                <h4>${m.title}</h4>
                <p>Action | Sci-Fi</p>
            </div>
        </div>
    `).join('');
}

// 7. YORDAMCHI FUNKSIYALAR
function showToast(text) {
    // Agar toast elementi bo'lmasa, yaratish
    let toast = document.getElementById('toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast';
        toast.style.cssText = "position:fixed; bottom:80px; left:50%; transform:translateX(-50%); background:var(--primary); color:white; padding:10px 20px; border-radius:30px; z-index:5000; font-size:0.9rem; box-shadow:0 10px 20px rgba(0,0,0,0.3);";
        document.body.appendChild(toast);
    }
    toast.innerText = text;
    toast.style.display = 'block';
    setTimeout(() => { toast.style.display = 'none'; }, 3000);
}

function logout() {
    if (confirm("Chiqishni xohlaysizmi?")) {
        location.reload(); // Sahifani qayta yuklash orqali login holatiga qaytish
    }
}

function logout() {
    // 1. Asosiy ilovani yashirish
    const mainApp = document.getElementById('mainApp');
    if (mainApp) mainApp.classList.add('hidden');

    // 2. Login sahifasini ko'rsatish
    const loginPage = document.getElementById('loginPage');
    if (loginPage) loginPage.classList.remove('hidden');

    // 3. Inputlarni tozalash (xavfsizlik uchun)
    const emailField = document.getElementById('emailField');
    if (emailField) emailField.value = "";
    
    // 4. Konsolga xabar chiqarish
    console.log("Foydalanuvchi tizimdan chiqdi.");
    
    // Agar xohlasangiz, sahifani to'liq yangilash ham mumkin:
    // location.reload(); 
}

function toggleMenu() {
    const menu = document.getElementById('sideMenu');
    const overlay = document.getElementById('menuOverlay');
    
    if (menu && overlay) {
        menu.classList.toggle('active');
        overlay.classList.toggle('active');
    }
}

