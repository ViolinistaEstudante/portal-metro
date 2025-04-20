document.addEventListener('DOMContentLoaded', function() {
    // Dados organizados por categorias
    const videoData = {
        aulas: [
            {
                id: 1,
                title: "Aula 1 - O que é o Duolingo?",
                description: "Aprenda idiomas gratuitamente jogando",
                author: "Brendow Rodrigues",
                url: "./videos/aula1.mp4",
                thumbnail: "./img/thumb1.png",
                downloads: []
            },
            {
                id: 2,
                title: "Aula 2 - Como criar uma conta no Duolingo?",
                description: "Cadastro rápido e fácil passo-a-passo",
                author: "Brendow Rodrigues",
                url: "./videos/aula2.mp4",
                thumbnail: "./img/thumb2.png",
                downloads: []
            },
            {
                id: 3,
                title: "Aula 3 - Como acessar a plataforma?",
                description: "Login web e app em segundos",
                author: "Brendow Rodrigues",
                url: "./videos/aula3.mp4",
                thumbnail: "./img/thumb3.png",
                downloads: [
                    { 
                        name: "Instrução - Duolingo", 
                        url: "./src/Instrução - Duolingo.pdf",
                        icon: "file-pdf" 
                    }
                ]
            },
            {
                id: 4,
                title: "Aula 4 - Como vai funcionar a plataforma?",
                description: "Lições diárias gamificadas e divertidas",
                author: "Brendow Rodrigues",
                url: "./videos/aula4.mp4",
                thumbnail: "./img/thumb4.png",
                downloads: []
            },
            {
                id: 5,
                title: "Aula Extra - Como acessar pelo smartphone",
                description: "Acessando a plataforma pelo celular",
                author: "Brendow Rodrigues",
                url: "https://exemplo.com/videoextra.mp4",
                thumbnail: "./img/thumb-extra.png",
                downloads: []
            }
        ],
        temas: []
    };

    // Elementos DOM
    const mainVideo = document.getElementById('mainVideo');
    const videoTitle = document.getElementById('videoTitle');
    const videoDescription = document.getElementById('videoDescription');
    const downloadLinks = document.getElementById('downloadLinks');
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const videoThumbnails = document.getElementById('videoThumbnails');
    const themeThumbnails = document.getElementById('themeThumbnails');
    const categories = document.querySelectorAll('.category');

    // Ícones para tipos de arquivo
    const fileIcons = {
        'pdf': 'file-pdf',
        'docx': 'file-word',
        'xlsx': 'file-excel',
        'png': 'file-image',
        'jpg': 'file-image',
        'default': 'file-download'
    };

    // Carrega a lista de vídeos por categoria
    function loadVideoLists() {
        loadVideoCategory('aulas', videoThumbnails);
        loadVideoCategory('temas', themeThumbnails);
    }

    // Carrega vídeos de uma categoria específica
    function loadVideoCategory(category, container) {
        container.innerHTML = '';
        
        videoData[category].forEach(video => {
            const thumbnail = document.createElement('div');
            thumbnail.className = 'thumbnail';
            thumbnail.innerHTML = `
                <img src="${video.thumbnail}" alt="${video.title}">
                <h4>${video.title}</h4>
            `;
            
            thumbnail.addEventListener('click', () => playVideo(video));
            container.appendChild(thumbnail);
        });
    }

    // Reproduz um vídeo e carrega seus downloads
    function playVideo(video) {
        mainVideo.src = video.url;
        videoTitle.textContent = video.title;
        videoDescription.textContent = video.description;
        
        downloadLinks.innerHTML = '';
        
        if (video.downloads && video.downloads.length > 0) {
            video.downloads.forEach(download => {
                const fileExtension = download.url.split('.').pop().toLowerCase();
                const iconClass = fileIcons[fileExtension] || fileIcons['default'];
                
                const link = document.createElement('a');
                link.href = download.url;
                link.className = 'download-link';
                link.innerHTML = `
                    <i class="fas fa-${download.icon || iconClass}"></i>
                    <span>${download.name}</span>
                    <i class="fas fa-download download-icon"></i>
                `;
                link.setAttribute('download', '');
                link.setAttribute('title', `Baixar ${download.name}`);
                
                downloadLinks.appendChild(link);
            });
        } else {
            downloadLinks.innerHTML = '<p class="no-downloads">Nenhum material disponível para download.</p>';
        }
        
        mainVideo.load();
        mainVideo.play();
    }

    // Filtra vídeos baseado na busca
    function searchVideos() {
        const searchTerm = searchInput.value.toLowerCase();
        if (searchTerm.trim() === '') {
            loadVideoLists();
            return;
        }
        
        // Filtra em todas as categorias
        Object.keys(videoData).forEach(category => {
            const filteredVideos = videoData[category].filter(video => 
                video.title.toLowerCase().includes(searchTerm) || 
                video.description.toLowerCase().includes(searchTerm)
            );
            
            const container = category === 'aulas' ? videoThumbnails : themeThumbnails;
            loadFilteredVideos(filteredVideos, container);
        });
    }

    // Carrega vídeos filtrados
    function loadFilteredVideos(videosToLoad, container) {
        container.innerHTML = '';
        
        if (videosToLoad.length === 0) {
            container.innerHTML = '<p class="no-downloads">Nenhum vídeo encontrado.</p>';
            return;
        }
        
        videosToLoad.forEach(video => {
            const thumbnail = document.createElement('div');
            thumbnail.className = 'thumbnail';
            thumbnail.innerHTML = `
                <img src="${video.thumbnail}" alt="${video.title}">
                <h4>${video.title}</h4>
            `;
            
            thumbnail.addEventListener('click', () => playVideo(video));
            container.appendChild(thumbnail);
        });
    }

    // Event listeners
    searchBtn.addEventListener('click', searchVideos);
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            searchVideos();
        }
    });

    // Toggle das categorias
    categories.forEach(category => {
        const header = category.querySelector('.category-header');
        header.addEventListener('click', () => {
            category.classList.toggle('active');
        });
    });

    // Carrega o primeiro vídeo automaticamente
    if (videoData.aulas.length > 0) {
        playVideo(videoData.aulas[0]);
    }

    // Carrega as listas iniciais de vídeos
    loadVideoLists();
});