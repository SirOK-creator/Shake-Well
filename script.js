// ========== ПЕРЕВОДЫ ==========
const translations = {
    ru: {
        nav_home: 'Главная',
        nav_about: 'О группе',
        nav_playlists: 'Плейлисты',
        hero_subtitle: 'Инди-рок с душой. Живой звук, искренние тексты.',
        hero_listen: 'Слушать',
        hero_about: 'Узнать больше',
        about_title: 'О группе',
        about_photo: 'Фото группы',
        about_text1: 'Мы — Shake Well, инди-фолк группа из четырёх друзей, объединённых любовью к музыке и северной природе.',
        about_text2: 'В наших песнях — шум сосен, тепло костра и истории, которые хочется рассказывать шёпотом. С 2020 года играем на фестивалях, записываем альбомы и верим, что живой звук способен лечить.',
        stat_albums: 'альбома',
        stat_concerts: 'концертов',
        stat_members: 'участника',
        playlists_title: 'Плейлисты',
        playlists_subtitle: 'Наша музыка на всех платформах',
        album1_desc: 'Последний альбом. 10 треков о полярной ночи и надежде.',
        album2_desc: 'Акустический альбом, записанный в деревянном доме у озера.',
        album3_desc: 'Концертные записи, акустические версии и неизданное.',
        listen: 'Слушать',
        player_select: 'Выберите трек',
        footer_rights: '© 2025 Shake Well. Все права защищены.',
        yandex_music: 'Яндекс Музыка'
    },
    en: {
        nav_home: 'Home',
        nav_about: 'About',
        nav_playlists: 'Playlists',
        hero_subtitle: 'Indie-rock with the soul. Live sound, sincere lyrics.',
        hero_listen: 'Listen',
        hero_about: 'Learn more',
        about_title: 'About the Band',
        about_photo: 'Band photo',
        about_text1: 'We are Shake Well, an indie-folk band of four friends united by a love for music and northern nature.',
        about_text2: 'In our songs — the sound of pines, the warmth of a campfire, and stories best told in a whisper. Since 2020, we\'ve been playing festivals, recording albums, and believing that live sound can heal.',
        stat_albums: 'albums',
        stat_concerts: 'concerts',
        stat_members: 'members',
        playlists_title: 'Playlists',
        playlists_subtitle: 'Our music on all platforms',
        album1_desc: 'Latest album. 10 tracks about the polar night and hope.',
        album2_desc: 'Acoustic album recorded in a wooden house by the lake.',
        album3_desc: 'Live recordings, acoustic versions, and unreleased tracks.',
        listen: 'Listen',
        player_select: 'Select a track',
        footer_rights: '© 2025 Shake Well. All rights reserved.',
        yandex_music: 'Yandex Music'
    }
};

let currentLang = localStorage.getItem('lang') || 'ru';

function switchLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    
    const langBtn = document.getElementById('langSwitch');
    if (lang === 'ru') {
        langBtn.textContent = '🇷🇺 RU';
    } else {
        langBtn.textContent = '🇬🇧 EN';
    }
    
    document.querySelectorAll('[data-lang-key]').forEach(el => {
        const key = el.dataset.langKey;
        if (translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });
}

document.getElementById('langSwitch').addEventListener('click', () => {
    const newLang = currentLang === 'ru' ? 'en' : 'ru';
    switchLanguage(newLang);
});

switchLanguage(currentLang);

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

const playlist = [
    {
        name: 'Spilled Ink',
        artist: 'Shake Well',
        src: 'music/Spilled Ink.mp3',
        art: '🌌'
    },
    {
        name: 'Spilled Inks',
        artist: 'Shake Well',
        src: 'music/Spilled Inks.mp3',
        art: '🌲'
    },
    {
        name: 'Живой огонь',
        artist: 'Shake Well',
        src: 'https://music.yandex.ru/album/41160648?utm_source=web&utm_medium=copy_link',
        art: '🔥'
    }
];

let currentTrack = 0;

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

function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function togglePlay() {
    if (audio.paused) {
        audio.play().catch(() => {});
    } else {
        audio.pause();
    }
}

playBtn.addEventListener('click', togglePlay);

function updatePlayButton() {
    playBtn.textContent = audio.paused ? '▶' : '⏸';
}

audio.addEventListener('play', updatePlayButton);
audio.addEventListener('pause', updatePlayButton);

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

progressBar.addEventListener('click', (e) => {
    const rect = progressBar.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    audio.currentTime = percent * audio.duration;
});

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

playerClose.addEventListener('click', () => {
    audio.pause();
    audioPlayer.style.display = 'none';
    setTimeout(() => { audioPlayer.style.display = ''; }, 100);
});

audio.addEventListener('ended', () => {
    nextBtn.click();
});

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
