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
