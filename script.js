function showSection(section) {
    const inicio = document.getElementById('inicio');
    const transparencia = document.getElementById('transparencia');
    
    if (section === 'inicio') {
        inicio.classList.remove('hidden');
        transparencia.classList.add('hidden');
    } else if (section === 'transparencia') {
        inicio.classList.add('hidden');
        transparencia.classList.remove('hidden');
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Smooth scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && !href.includes('transparencia')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Galeria de Imagens
let currentImageIndex = 0;
const images = [];

function openGallery(galleryId) {
    images.length = 0;
    const galleryTitle = document.getElementById('gallery-title');
    
    if (galleryId === 'parcerias') {
        // Fotos do Outubro Rosa Sabin / NEC - apenas as fotos específicas mostradas
        if (galleryTitle) galleryTitle.textContent = 'Imagens Registradas de Ações Sociais';
        // Adicionar apenas as imagens específicas do Outubro Rosa
        images.push('imagens/imagem6.jpeg');
        images.push('imagens/imagem8.jpeg');
        images.push('imagens/imagem9.jpeg');
        images.push('imagens/imagem11.jpeg');
        images.push('imagens/imagem12.jpeg');
        images.push('imagens/inecbrasal.jpeg');
    } else if (galleryId === 'instituto') {
        // Fotos do Instituto - imagens 1, 2, 3, 4, 5 e 10
        if (galleryTitle) galleryTitle.textContent = 'Fotos do Instituto';
        images.push('imagens/imagem1.jpeg');
        images.push('imagens/imagem2.jpeg');
        images.push('imagens/imagem3.jpeg');
        images.push('imagens/imagem4.jpeg');
        images.push('imagens/imagem5.jpeg');
        images.push('imagens/imagem10.jpeg');
    }
    
    currentImageIndex = 0;
    const galleryContainer = document.getElementById('gallery-container');
    const modal = document.getElementById('gallery-modal');
    
    if (!galleryContainer || !modal) {
        console.error('Elementos do modal não encontrados');
        return;
    }
    
    galleryContainer.innerHTML = '';
    
    images.forEach((img, index) => {
        const imgElement = document.createElement('img');
        imgElement.src = img;
        imgElement.alt = `Imagem ${index + 1}`;
        imgElement.classList.add('gallery-image');
        if (index === 0) imgElement.classList.add('active');
        imgElement.onclick = () => openImageFullscreen(index);
        imgElement.onerror = function() {
            console.error('Erro ao carregar imagem:', img);
        };
        galleryContainer.appendChild(imgElement);
    });
    
    document.getElementById('total-imgs').textContent = images.length;
    document.getElementById('current-img').textContent = 1;
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    showImage(0);
}

function closeGallery() {
    const modal = document.getElementById('gallery-modal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

function showImage(index) {
    currentImageIndex = index;
    const galleryImages = document.querySelectorAll('.gallery-image');
    galleryImages.forEach((img, i) => {
        if (i === index) {
            img.classList.add('active');
        } else {
            img.classList.remove('active');
        }
    });
    document.getElementById('current-img').textContent = index + 1;
}

function openImageFullscreen(index) {
    const fullscreenModal = document.getElementById('fullscreen-modal');
    const fullscreenImg = document.getElementById('fullscreen-image');
    
    if (fullscreenModal && fullscreenImg && images[index]) {
        fullscreenImg.src = images[index];
        fullscreenImg.alt = `Imagem ${index + 1}`;
        fullscreenModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        currentImageIndex = index;
        document.getElementById('fullscreen-current').textContent = index + 1;
        document.getElementById('fullscreen-total').textContent = images.length;
    }
}

function closeFullscreen() {
    const fullscreenModal = document.getElementById('fullscreen-modal');
    if (fullscreenModal) {
        fullscreenModal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

function changeImage(direction) {
    let newIndex = currentImageIndex + direction;
    if (newIndex < 0) {
        newIndex = images.length - 1;
    } else if (newIndex >= images.length) {
        newIndex = 0;
    }
    showImage(newIndex);
}

// Fechar modal ao clicar fora (no fundo escuro)
document.addEventListener('click', function(e) {
    const modal = document.getElementById('gallery-modal');
    const modalContent = document.querySelector('.gallery-modal-content');
    if (modal && !modal.classList.contains('hidden')) {
        // Se clicou no fundo (modal) mas não no conteúdo
        if (e.target === modal) {
            closeGallery();
        }
    }
});

// Navegação com teclado
document.addEventListener('keydown', function(e) {
    const modal = document.getElementById('gallery-modal');
    const fullscreenModal = document.getElementById('fullscreen-modal');
    
    // Se o fullscreen estiver aberto
    if (fullscreenModal && !fullscreenModal.classList.contains('hidden')) {
        if (e.key === 'Escape') {
            closeFullscreen();
        } else if (e.key === 'ArrowLeft') {
            let newIndex = currentImageIndex - 1;
            if (newIndex < 0) newIndex = images.length - 1;
            openImageFullscreen(newIndex);
        } else if (e.key === 'ArrowRight') {
            let newIndex = currentImageIndex + 1;
            if (newIndex >= images.length) newIndex = 0;
            openImageFullscreen(newIndex);
        }
    }
    // Se o modal da galeria estiver aberto
    else if (modal && !modal.classList.contains('hidden')) {
        if (e.key === 'Escape') {
            closeGallery();
        } else if (e.key === 'ArrowLeft') {
            changeImage(-1);
        } else if (e.key === 'ArrowRight') {
            changeImage(1);
        }
    }
});


