export function renderNavbar(user) {
  const loginLink = user 
    ? `<a href="#/profile" class="user-greeting" style="font-weight: bold;">${user.name}</a>
       <a href="#" id="logout-btn">로그아웃</a>`
    : `<a href="#/login">로그인</a>`;

  return `
    <nav>
      <a href="#/" class="nav-brand">문방사우</a>
      <div class="nav-links">
        <a href="#/">홈</a>
        <a href="#/">상품</a>
        ${loginLink}
      </div>
    </nav>
  `;
}

export function renderFooter() {
  return `
    <footer>
      <div class="footer-badge">Since 1987</div>
      <p>문방사우 (文房四友) · 붓, 먹, 종이, 벼루의 벗</p>
      <p>&copy; 2026 Paper & Ink. All rights reserved.</p>
    </footer>
  `;
}
