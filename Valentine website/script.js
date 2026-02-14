// Handle click to reveal surprise
document.getElementById('clickBox').addEventListener('click', function() {
    const clickBox = this;
    const revealedMessage = document.getElementById('revealedMessage');
    
    // Hide the click box
    clickBox.style.display = 'none';
    
    // Show the revealed message
    revealedMessage.classList.remove('hidden');
});

// Music player functionality
const bgMusic = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');
let isPlaying = false;

// Try to autoplay music with user interaction
musicBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    
    if (isPlaying) {
        bgMusic.pause();
        musicBtn.classList.remove('playing');
        isPlaying = false;
    } else {
        bgMusic.volume = 0.3; // Set volume to 30%
        bgMusic.play().catch(function(error) {
            console.log('Autoplay prevented:', error);
        });
        musicBtn.classList.add('playing');
        isPlaying = true;
    }
});

// Set initial volume
bgMusic.volume = 0.3;

// Listen for music end and restart
bgMusic.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
});



// Handle page navigation
function goToPage(pageNumber) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    // Show the requested page
    const targetPage = document.getElementById(`page-${pageNumber}`);
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // Reset the first page if returning to it
    if (pageNumber === 1) {
        const clickBox = document.getElementById('clickBox');
        const revealedMessage = document.getElementById('revealedMessage');
        clickBox.style.display = 'flex';
        revealedMessage.classList.add('hidden');
    }
    
    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Keyboard navigation (arrow keys)
document.addEventListener('keydown', function(event) {
    const currentPage = document.querySelector('.page.active');
    const currentPageId = currentPage.id;
    const currentPageNumber = parseInt(currentPageId.split('-')[1]);
    
    if (event.key === 'ArrowRight') {
        if (currentPageNumber < 7) {
            goToPage(currentPageNumber + 1);
        }
    } else if (event.key === 'ArrowLeft') {
        if (currentPageNumber > 1) {
            goToPage(currentPageNumber - 1);
        }
    }
});

// Initial page (page 1 should be active by default)
document.addEventListener('DOMContentLoaded', function() {
    const firstPage = document.getElementById('page-1');
    if (firstPage && !firstPage.classList.contains('active')) {
        firstPage.classList.add('active');
    }
});
