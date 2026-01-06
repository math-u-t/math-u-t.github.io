// ============================================
// 1. ダークモード切り替え機能
// ============================================
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('.material-icons');

// ローカルストレージからテーマを読み込む
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
  document.body.classList.add('dark-mode');
  themeIcon.textContent = 'light_mode';
}

// テーマ切り替え
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');

  if (document.body.classList.contains('dark-mode')) {
    themeIcon.textContent = 'light_mode';
    localStorage.setItem('theme', 'dark');
  } else {
    themeIcon.textContent = 'dark_mode';
    localStorage.setItem('theme', 'light');
  }
});

// ============================================
// 2. タイピングエフェクト
// ============================================
class TypeWriter {
  constructor(element, text, speed = 50) {
    this.element = element;
    this.text = text;
    this.speed = speed;
    this.index = 0;
  }

  type() {
    if (this.index < this.text.length) {
      this.element.textContent += this.text.charAt(this.index);
      this.index++;
      setTimeout(() => this.type(), this.speed);
    }
  }

  start() {
    this.element.textContent = '';
    this.type();
  }
}

// ページ読み込み後にタイピングエフェクトを開始
window.addEventListener('DOMContentLoaded', () => {
  const title = document.querySelector('h1');
  const subtitle = document.querySelector('.subtitle');

  if (title) {
    const titleText = title.textContent;
    const titleTyper = new TypeWriter(title, titleText, 100);
    titleTyper.start();

    // タイトルのタイピングが終わってからサブタイトルを開始
    if (subtitle) {
      const subtitleText = subtitle.textContent;
      setTimeout(() => {
        const subtitleTyper = new TypeWriter(subtitle, subtitleText, 50);
        subtitleTyper.start();
      }, titleText.length * 100 + 200);
    }
  }
});

// ============================================
// 3. パーティクル背景アニメーション
// ============================================
class ParticleBackground {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.particleCount = 50;
    this.connectionDistance = 150;

    this.init();
  }

  init() {
    // Canvasを背景に配置
    this.canvas.style.position = 'fixed';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.zIndex = '-1';
    this.canvas.style.pointerEvents = 'none';
    document.body.prepend(this.canvas);

    this.resize();
    this.createParticles();
    this.animate();

    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createParticles() {
    this.particles = [];
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1
      });
    }
  }

  animate() {
    const isDarkMode = document.body.classList.contains('dark-mode');
    const particleColor = isDarkMode ? 'rgba(176, 176, 176, 0.5)' : 'rgba(66, 66, 66, 0.5)';
    const lineColor = isDarkMode ? 'rgba(176, 176, 176, 0.2)' : 'rgba(66, 66, 66, 0.2)';

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // パーティクルを更新して描画
    this.particles.forEach(particle => {
      particle.x += particle.vx;
      particle.y += particle.vy;

      // 画面端で反転
      if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;

      // パーティクルを描画
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = particleColor;
      this.ctx.fill();
    });

    // パーティクル間の線を描画
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.connectionDistance) {
          this.ctx.beginPath();
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.strokeStyle = lineColor;
          this.ctx.lineWidth = 0.5;
          this.ctx.stroke();
        }
      }
    }

    requestAnimationFrame(() => this.animate());
  }
}

// パーティクル背景を初期化
window.addEventListener('DOMContentLoaded', () => {
  new ParticleBackground();
});

// ============================================
// 4. メールアドレスアコーディオン
// ============================================
const emailAccordion = document.getElementById('emailAccordion');
const emailContent = document.getElementById('emailContent');

if (emailAccordion && emailContent) {
  emailAccordion.addEventListener('click', () => {
    emailAccordion.classList.toggle('active');
    emailContent.classList.toggle('active');
  });
}

// ============================================
// 5. スクロールアニメーション
// ============================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// アニメーション対象の要素を設定
window.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll('.project-card, .skill-category, .contact-item, .stat-card, .github-cards, .about-card, .email-accordion');

  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeInObserver.observe(el);
  });
});

// ============================================
// 6. スムーススクロール
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ============================================
// 7. トップに戻るボタン
// ============================================
const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollToTopBtn.classList.add('visible');
  } else {
    scrollToTopBtn.classList.remove('visible');
  }
});

scrollToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// ============================================
// 8. スクロール進捗バー
// ============================================
const scrollProgress = document.getElementById('scrollProgress');

window.addEventListener('scroll', () => {
  const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (window.scrollY / windowHeight) * 100;
  scrollProgress.style.width = scrolled + '%';
});

// ============================================
// 9. メールアドレスコピー機能
// ============================================
const copyButtons = document.querySelectorAll('.copy-btn');

copyButtons.forEach(btn => {
  btn.addEventListener('click', async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const email = btn.getAttribute('data-email');

    try {
      await navigator.clipboard.writeText(email);

      // ボタンのアイコンを一時的に変更
      const icon = btn.querySelector('.material-icons');
      const originalIcon = icon.textContent;
      icon.textContent = 'check';
      btn.classList.add('copied');

      // 通知を表示
      showCopyNotification(email);

      setTimeout(() => {
        icon.textContent = originalIcon;
        btn.classList.remove('copied');
      }, 2000);
    } catch (err) {
      console.error('コピーに失敗しました:', err);
    }
  });
});

function showCopyNotification(email) {
  const notification = document.createElement('div');
  notification.className = 'copy-notification';
  notification.innerHTML = `
    <span class="material-icons">check_circle</span>
    <span>${email} をコピーしました</span>
  `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// ============================================
// 10. ローディング画面
// ============================================
window.addEventListener('load', () => {
  const loadingScreen = document.getElementById('loadingScreen');
  setTimeout(() => {
    loadingScreen.classList.add('hidden');
  }, 1000);
});

// ============================================
// 11. コナミコマンド (イースターエッグ)
// ============================================
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
  if (e.key === konamiCode[konamiIndex]) {
    konamiIndex++;

    if (konamiIndex === konamiCode.length) {
      activateKonamiEasterEgg();
      konamiIndex = 0;
    }
  } else {
    konamiIndex = 0;
  }
});

function activateKonamiEasterEgg() {
  // 紙吹雪エフェクト
  createConfetti();

  // 通知を表示
  const notification = document.createElement('div');
  notification.className = 'copy-notification';
  notification.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
  notification.innerHTML = `
    <span class="material-icons">celebration</span>
    <span>コナミコマンド発動！おめでとうございます！</span>
  `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 3000);
}

function createConfetti() {
  const colors = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#43e97b'];
  const confettiCount = 100;

  for (let i = 0; i < confettiCount; i++) {
    setTimeout(() => {
      const confetti = document.createElement('div');
      confetti.style.position = 'fixed';
      confetti.style.width = '10px';
      confetti.style.height = '10px';
      confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.left = Math.random() * window.innerWidth + 'px';
      confetti.style.top = '-10px';
      confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
      confetti.style.zIndex = '10000';
      confetti.style.pointerEvents = 'none';
      confetti.style.opacity = '1';
      confetti.style.transform = 'rotate(' + (Math.random() * 360) + 'deg)';

      document.body.appendChild(confetti);

      const fallDuration = 3000 + Math.random() * 2000;
      const rotation = Math.random() * 720 - 360;
      const drift = Math.random() * 200 - 100;

      confetti.animate([
        {
          transform: `translateY(0) translateX(0) rotate(0deg)`,
          opacity: 1
        },
        {
          transform: `translateY(${window.innerHeight + 10}px) translateX(${drift}px) rotate(${rotation}deg)`,
          opacity: 0
        }
      ], {
        duration: fallDuration,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      }).onfinish = () => confetti.remove();
    }, i * 300);
  }
}
