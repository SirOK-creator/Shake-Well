// ========== БУРГЕР-МЕНЮ ==========
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// ========== АУДИОПЛЕЕР ==========
const audio = document.getElementById('audioElement');
const playBtn = document.getElementById('playBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const progressBar = document.getElementById('progressBar');
const progressFill = document.getElementById('progressFill');
const progressThumb = document.getElementById('progressThumb');
const currentTimeEl = document.getElementById('currentTime');
const durationTimeEl = document.getElementById('durationTime');
const volumeSlider = document.getElementById('volumeSlider');
const volumeIcon = document.getElementById('volumeIcon');
const playerTrack = document.getElementById('playerTrack');
const playerArtist = document.getElementById('playerArtist');
const playerArt = document.getElementById('playerArt');
const playerClose = document.getElementById('playerClose');
const audioPlayer = document.getElementById('audioPlayer');

// Плейлист — можно использовать демо-аудио или заменить пути на свои
const playlist = [
    {
        name: 'Spilled Ink',
        artist: 'Danila',
        src: 'music/Spilled Ink.mp3',
        art: '🌌'
    },
    {
        name: 'Spilled Inks',
        artist: 'Danila',
        src: 'music/Spilled Inks.mp3',
        art: '🌲'
    },
    {
        name: 'Живой огонь',
        artist: 'Sunrise Avenue',
        src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
        art: '🔥'
    }
];

let currentTrack = 0;

// Кнопки из карточек
function attachTrackButtons() {
    document.querySelectorAll('.play-track-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const index = parseInt(this.dataset.track);
            loadTrack(index);
            audio.play().catch(() => {});
            audioPlayer.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    });
}

// Загрузка трека
function loadTrack(index) {
    if (index < 0 || index >= playlist.length) return;
    currentTrack = index;
    const track = playlist[currentTrack];
    
    playerTrack.textContent = track.name;
    playerArtist.textContent = track.artist;
    playerArt.textContent = track.art;
    audio.src = track.src;
    audio.load();
    
    progressFill.style.width = '0%';
    progressThumb.style.left = '0%';
    currentTimeEl.textContent = '0:00';
    durationTimeEl.textContent = '0:00';
}

// Формат времени
function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Play/Pause
function togglePlay() {
    if (audio.paused) {
        audio.play().catch(() => {});
    } else {
        audio.pause();
    }
}

playBtn.addEventListener('click', togglePlay);

// Обновление кнопки
function updatePlayButton() {
    playBtn.textContent = audio.paused ? '▶' : '⏸';
}

audio.addEventListener('play', updatePlayButton);
audio.addEventListener('pause', updatePlayButton);

// Прогресс
audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
        const percent = (audio.currentTime / audio.duration) * 100;
        progressFill.style.width = percent + '%';
        progressThumb.style.left = percent + '%';
        currentTimeEl.textContent = formatTime(audio.currentTime);
    }
});

audio.addEventListener('loadedmetadata', () => {
    durationTimeEl.textContent = formatTime(audio.duration);
});

// Клик по прогресс-бару
progressBar.addEventListener('click', (e) => {
    const rect = progressBar.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    audio.currentTime = percent * audio.duration;
});

// Предыдущий/следующий
prevBtn.addEventListener('click', () => {
    const newIndex = currentTrack - 1 < 0 ? playlist.length - 1 : currentTrack - 1;
    loadTrack(newIndex);
    audio.play().catch(() => {});
});

nextBtn.addEventListener('click', () => {
    const newIndex = (currentTrack + 1) % playlist.length;
    loadTrack(newIndex);
    audio.play().catch(() => {});
});

// Громкость
audio.volume = volumeSlider.value;

volumeSlider.addEventListener('input', () => {
    audio.volume = volumeSlider.value;
    updateVolumeIcon();
});

volumeIcon.addEventListener('click', () => {
    if (audio.volume > 0) {
        audio.volume = 0;
        volumeSlider.value = 0;
    } else {
        audio.volume = 0.7;
        volumeSlider.value = 0.7;
    }
    updateVolumeIcon();
});

function updateVolumeIcon() {
    if (audio.volume === 0) volumeIcon.textContent = '🔇';
    else if (audio.volume < 0.5) volumeIcon.textContent = '🔉';
    else volumeIcon.textContent = '🔊';
}

// Закрыть плеер
playerClose.addEventListener('click', () => {
    audio.pause();
    audioPlayer.style.display = 'none';
    // Показать снова при следующем выборе трека
    setTimeout(() => { audioPlayer.style.display = ''; }, 100);
});

// Когда трек закончился — следующий
audio.addEventListener('ended', () => {
    nextBtn.click();
});

// Инициализация
attachTrackButtons();

// ========== ЗВЁЗДНОЕ НЕБО ==========
function createStars() {
    const starsContainer = document.getElementById('stars');
    if (!starsContainer) return;
    
    const starCount = 80;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        const size = Math.random() * 2.5 + 1;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = Math.random() * 3 + 2;
        const delay = Math.random() * 4;
        
        star.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${x}%;
            top: ${y}%;
            --duration: ${duration}s;
            --delay: ${delay}s;
        `;
        
        starsContainer.appendChild(star);
    }
}

createStars();
