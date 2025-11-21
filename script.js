const INVITE_LINK = 'https://www.instagram.com/8z22x';

document.addEventListener('DOMContentLoaded', function() {
    loadRules();
    setupEventListeners();
});

function setupEventListeners() {
    const copyBtn = document.getElementById('copyInviteBtn');
    if (copyBtn) {
        copyBtn.addEventListener('click', copyInviteLink);
    }

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

async function loadRules() {
    try {
        const response = await fetch('rules.txt');
        if (!response.ok) {
            throw new Error('Failed to load rules');
        }
        
        const rulesText = await response.text();
        displayRules(rulesText);
    } catch (error) {
        console.error('Error loading rules:', error);
        displayFallbackRules();
    }
}

function displayRules(rulesText) {
    const rulesContent = document.getElementById('rules-content');
    const rulesLoading = document.querySelector('.rules-loading');
    
    if (!rulesContent || !rulesLoading) return;

    rulesLoading.style.display = 'none';
    
    const formattedRules = formatRulesText(rulesText);
    rulesContent.innerHTML = formattedRules;
}

function displayFallbackRules() {
    const rulesContent = document.getElementById('rules-content');
    const rulesLoading = document.querySelector('.rules-loading');
    
    if (!rulesContent || !rulesLoading) return;

    rulesLoading.style.display = 'none';
    
    const fallbackRules = `
        <h3>النبذة المختصرة</h3>
        <p>اللغات البرمجية وبعض المهارات :</p>
        
        <h3>1. لغة Python </h3>
        <ul>
            <li>معرفة الادوات والبرامج التي تدعم البايثون</li>
            <li>استخدام ادوات حماية الشبكات</li>
            <li>استخدام اللغة في دواعي محاربة الابتزاز</li>
        </ul>
        
        <h3>2. HTML + CSS</h3>
        <ul>
            <li> برمجة المواقع الالكترونية</li>
            <li>تشفيرها وحمايته</li>
            <li>تمصميم منظر رائع ونادر</li>
        </ul>
        
        <h3>3.  لغة lua </h3>
        <ul>
            <li>برمجة سكربتات بلغة lua </li>
            <li>برمجة سيفرات</li>
            <li>تمصيم ادوات برمحية</li>
        </ul>
        
        <h3>4. Cyber Security</h3>
        <p>حاصل على شهادة حماية المعلومات وهندسة الشبكات كما حاصل على خبرة في ادوات محاربة الابتزاز.</p>
    `;
    
    rulesContent.innerHTML = fallbackRules;
}

function formatRulesText(text) {
    const lines = text.split('\n');
    let formattedHTML = '';
    let inList = false;

    for (let line of lines) {
        line = line.trim();
        
        if (line === '') {
            if (inList) {
                formattedHTML += '</ul>';
                inList = false;
            }
            continue;
        }
        
        if (line.match(/^\d+\./) || (line.length < 50 && !line.includes('.'))) {
            if (inList) {
                formattedHTML += '</ul>';
                inList = false;
            }
            formattedHTML += `<h3>${escapeHtml(line)}</h3>`;
        }
        else if (line.startsWith('-') || line.startsWith('•') || line.match(/^\d+\)/)) {
            if (!inList) {
                formattedHTML += '<ul>';
                inList = true;
            }
            const cleanLine = line.replace(/^[-•]\s*/, '').replace(/^\d+\)\s*/, '');
            formattedHTML += `<li>${escapeHtml(cleanLine)}</li>`;
        }
        else {
            if (inList) {
                formattedHTML += '</ul>';
                inList = false;
            }
            formattedHTML += `<p>${escapeHtml(line)}</p>`;
        }
    }
    
    if (inList) {
        formattedHTML += '</ul>';
    }
    
    return formattedHTML;
}

function copyInviteLink() {
    navigator.clipboard.writeText(INVITE_LINK).then(() => {
        showNotification('تم نسخ رابط الدعوة!', 'success');
    }).catch(() => {
        const textArea = document.createElement('textarea');
        textArea.value = INVITE_LINK;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showNotification('تم نسخ رابط الدعوة!', 'success');
    });
}

function showNotification(message, type = 'info') {
    const notification = document.getElementById('notification');
    const notificationText = document.getElementById('notificationText');
    
    if (!notification || !notificationText) return;

    notificationText.textContent = message;
    
    notification.className = 'notification';
    if (type === 'error') {
        notification.style.background = 'linear-gradient(45deg, #ff4444, #cc0000)';
    } else if (type === 'success') {
        notification.style.background = 'linear-gradient(45deg, #44ff44, #00cc00)';
    }
    
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.feature-card, .info-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    const mainTitle = document.querySelector('.main-title');
    if (mainTitle) {
        const text = mainTitle.textContent;
        mainTitle.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                mainTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        setTimeout(typeWriter, 1000);
    }
});
