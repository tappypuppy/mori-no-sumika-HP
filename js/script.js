/**
 * 杜の栖 - たい焼き専門店
 * JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  // ハンバーガーメニュー
  initHamburgerMenu();

  // スムーススクロール
  initSmoothScroll();

  // ヘッダー背景変更（スクロール時）
  initHeaderScroll();

  // 画像読み込みエラー時のフォールバック
  initImageFallback();
});

/**
 * ハンバーガーメニューの初期化
 */
function initHamburgerMenu() {
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.nav');
  const body = document.body;

  // オーバーレイ要素を作成
  const overlay = document.createElement('div');
  overlay.className = 'overlay';
  body.appendChild(overlay);

  // ハンバーガーボタンのクリック
  hamburger.addEventListener('click', () => {
    const isOpen = nav.classList.contains('is-open');

    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // オーバーレイクリックで閉じる
  overlay.addEventListener('click', closeMenu);

  // メニュー内のリンクをクリックしたら閉じる
  const navLinks = nav.querySelectorAll('.nav__link');
  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  function openMenu() {
    hamburger.classList.add('is-active');
    hamburger.setAttribute('aria-expanded', 'true');
    nav.classList.add('is-open');
    overlay.classList.add('is-visible');
    body.style.overflow = 'hidden';
  }

  function closeMenu() {
    hamburger.classList.remove('is-active');
    hamburger.setAttribute('aria-expanded', 'false');
    nav.classList.remove('is-open');
    overlay.classList.remove('is-visible');
    body.style.overflow = '';
  }
}

/**
 * スムーススクロールの初期化
 */
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  const headerHeight = document.querySelector('.header').offsetHeight;

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');

      // '#'のみの場合はページトップへ
      if (href === '#' || href === '#top') {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        return;
      }

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = targetPosition - headerHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * スクロール時のヘッダー背景変更
 */
function initHeaderScroll() {
  const header = document.querySelector('.header');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // スクロール量に応じてヘッダーの見た目を変更
    if (currentScroll > 100) {
      header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
      header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    }

    lastScroll = currentScroll;
  });
}

/**
 * 画像読み込みエラー時のフォールバック
 */
function initImageFallback() {
  const images = document.querySelectorAll('img[loading="lazy"]');

  images.forEach(img => {
    img.addEventListener('error', () => {
      // プレースホルダー用のスタイルを適用
      img.style.backgroundColor = '#E8C9A8';
      img.style.display = 'flex';
      img.style.alignItems = 'center';
      img.style.justifyContent = 'center';
      img.alt = '画像準備中';

      // 親要素にプレースホルダークラスを追加
      const parent = img.parentElement;
      if (parent) {
        parent.classList.add('image-placeholder');
        parent.style.backgroundColor = '#E8C9A8';
        parent.style.display = 'flex';
        parent.style.alignItems = 'center';
        parent.style.justifyContent = 'center';

        // プレースホルダーテキストを追加
        if (!parent.querySelector('.placeholder-text')) {
          const placeholder = document.createElement('span');
          placeholder.className = 'placeholder-text';
          placeholder.textContent = '画像準備中';
          placeholder.style.cssText = 'color: #B8895A; font-size: 0.9rem; font-weight: 500;';
          parent.appendChild(placeholder);
          img.style.display = 'none';
        }
      }
    });
  });
}
