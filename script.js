
  //salinan js inlane
  // TAB SYSTEM PROFIL INTERACTIVE
document.addEventListener('DOMContentLoaded', function() {
    
    // DATA PENJELASAN SETIAP TAB
    const tabData = {
        rebahan: {
            title: "Rebahan Expert 🛌",
            desc: "Level: Master (1000 jam+). Posisi favorit: miring 45°. Durasi: 24/7. Alat bantu: bantal ×3, selimut tebal.",
            emoji: "💤🛌😴"
        },
        molor: {
            title: "Molor Champion 😴",
            desc: "Rekor: 14 jam nonstop. Bangun: cuma buat pipis. Target: 24 jam molor world record.",
            emoji: "😪💤🫠"
        },
        makan: {
            title: "Makan Predator 🍜",
            desc: "Kalori harian: 5000+. Menu favorit: mie instan + telor + sambel. Makan sambil rebahan = perfect combo.",
            emoji: "🍜🍛🥡"
        },
        mandi: {
            title: "Mandi Minimalis 🛁",
            desc: "Frekuensi: 2-3x seminggu. Durasi: 3 menit. Tujuan: survive. Bonus: hemat air 99%.",
            emoji: "🛁🚿💧"
        },
        'main hp': {
            title: "HP Addict 📱",
            desc: "Screen time: 23 jam/hari. Battery: selalu lowbat. Notif: 999+. Konten: TikTok 80%, WA 19%, lainnya 1%.",
            emoji: "📱💻🖥️"
        }
    };

    // ELEMEN TAB
    const tags = document.querySelectorAll('.tag');
    const profileCard = document.querySelector('.profile-card');
    
    // BUAT TAB CONTAINER
    const tabContainer = document.createElement('div');
    tabContainer.className = 'tab-container';
    tabContainer.innerHTML = `
        <div class="tab-header">
            <span class="tab-close" onclick="closeTab()">×</span>
        </div>
        <div class="tab-content">
            <h3 class="tab-title"></h3>
            <p class="tab-desc"></p>
            <div class="tab-emojis"></div>
        </div>
    `;
    
    profileCard.appendChild(tabContainer);
    const tabHeader = tabContainer.querySelector('.tab-header');
    const tabTitle = tabContainer.querySelector('.tab-title');
    const tabDesc = tabContainer.querySelector('.tab-desc');
    const tabEmojis = tabContainer.querySelector('.tab-emojis');
    
    // EVENT LISTENER TAG
    tags.forEach(tag => {
        tag.style.cursor = 'pointer';
        
        tag.addEventListener('click', function(e) {
            e.stopPropagation();
            const tabKey = this.textContent.toLowerCase().trim();
            
            if (tabData[tabKey]) {
                showTab(tabData[tabKey], this);
            }
        });
        
        // HOVER EFFECT
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.boxShadow = '0 8px 25px rgba(138, 43, 226, 0.6)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '0 5px 15px rgba(138, 43, 226, 0.4)';
        });
    });
    
    // PROFIL CARD CLICK - TUTUP TAB
    profileCard.addEventListener('click', function(e) {
        if (!e.target.closest('.tag') && !tabContainer.classList.contains('hidden')) {
            closeTab();
        }
    });
    
    // FUNGSI SHOW TAB
    function showTab(data, activeTag) {
        // RESET SEMUA TAG
        tags.forEach(t => {
            t.style.background = 'rgba(255,255,255,0.1)';
            t.style.borderColor = 'rgba(255,255,255,0.3)';
        });
        
        // ACTIVE TAG
        activeTag.style.background = 'rgba(138, 43, 226, 0.4)';
        activeTag.style.borderColor = 'rgba(138, 43, 226, 0.8)';
        activeTag.style.boxShadow = '0 0 20px rgba(138, 43, 226, 0.6)';
        
        // ISI TAB
        tabTitle.textContent = data.title;
        tabDesc.textContent = data.desc;
        tabEmojis.textContent = data.emoji;
        
        // SHOW TAB
        tabContainer.classList.remove('hidden');
        tabContainer.style.animation = 'tabSlideIn 0.4s ease-out';
        
        // SCROLL KE TAB
        tabContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    
    // FUNGSI CLOSE TAB
    window.closeTab = function() {
        tabContainer.classList.add('hidden');
        tabContainer.style.animation = '';
        
        // RESET TAG
        tags.forEach(t => {
            t.style.background = 'rgba(255,255,255,0.1)';
            t.style.borderColor = 'rgba(255,255,255,0.3)';
            t.style.boxShadow = '';
        });
    };
});
