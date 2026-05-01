export function renderHome() {
  const products = [
    { id: 1, name: "이탈리아 가죽 노트", price: "32,000원", img: "/images/notebook.png" },
    { id: 2, name: "클래식 만년필", price: "145,000원", img: "/images/pen.png" },
    { id: 3, name: "빈티지 왁스 씰 세트", price: "28,000원", img: "/images/wax.png" },
    { id: 4, name: "심해 블루 잉크병", price: "18,000원", img: "/images/ink.png" },
    { id: 5, name: "수제 한지 편지지", price: "12,000원", img: "/images/paper.png" },
    { id: 6, name: "흑연 연필 12자루", price: "8,500원", img: "/images/pencil.png" },
    { id: 7, name: "10년 다이어리", price: "45,000원", img: "/images/diary.png" },
    { id: 8, name: "황동 우표 스탬프", price: "22,000원", img: "/images/stamp.png" }
  ];

  const productCards = products.map(p => `
    <div class="product-card">
      <img src="${p.img}" class="product-img" alt="${p.name}">
      <h3 class="product-title">${p.name}</h3>
      <div class="product-price">${p.price}</div>
      <button class="btn" onclick="alert('장바구니에 담았습니다.')">담기</button>
    </div>
  `).join('');

  return `
    <div class="hero">
      <h1>문방사우</h1>
      <p>文房四友 · 붓, 먹, 종이, 벼루의 벗</p>
    </div>
    
    <div class="product-grid">
      ${productCards}
    </div>
  `;
}
