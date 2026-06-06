/* ===== 데일리룩 공통 스크립트 ===== */

// --- 상품 데이터 (가상) ---
const PRODUCTS = {
  p01: { id: 'p01', name: '오버핏 코튼 셔츠', cat: '셔츠', price: 49000, color: '#c2410c' },
  p02: { id: 'p02', name: '울 블렌드 니트', cat: '니트', price: 58000, color: '#3f6212' },
  p03: { id: 'p03', name: '플리츠 미디 원피스', cat: '원피스', price: 67000, color: '#1e3a5f' },
  p04: { id: 'p04', name: '와이드 데님 팬츠', cat: '팬츠', price: 52000, color: '#5b4636' },
  p05: { id: 'p05', name: '베이직 라운드 티', cat: '티셔츠', price: 24000, color: '#8a3b5f' },
  p06: { id: 'p06', name: '오버사이즈 블레이저', cat: '아우터', price: 89000, color: '#2c2c2c' },
};

// --- 장바구니 (sessionStorage 사용: 데모용으로 화면 이동 간 유지) ---
function getCart() {
  try { return JSON.parse(sessionStorage.getItem('cart') || '[]'); }
  catch { return []; }
}
function saveCart(cart) {
  sessionStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
}
function addToCart(productId) {
  const cart = getCart();
  const exist = cart.find(i => i.id === productId);
  if (exist) { exist.qty += 1; }
  else { const p = PRODUCTS[productId]; cart.push({ id: p.id, name: p.name, cat: p.cat, price: p.price, qty: 1 }); }
  saveCart(cart);
}
function cartTotal() {
  return getCart().reduce((sum, i) => sum + i.price * i.qty, 0);
}
function cartCount() {
  return getCart().reduce((sum, i) => sum + i.qty, 0);
}
function updateCartCount() {
  const el = document.querySelector('.cart-link .count');
  if (el) el.textContent = cartCount();
}
function won(n) { return '₩' + n.toLocaleString('ko-KR'); }

// --- dataLayer 준비 (GTM 연동 지점) ---
// 실제 GTM 연결 전이라도, 어떤 데이터를 흘려보낼지 미리 설계해둠.
window.dataLayer = window.dataLayer || [];
function track(eventName, params) {
  const payload = Object.assign({ event: eventName }, params || {});
  window.dataLayer.push(payload);
  console.log('[dataLayer]', JSON.stringify(payload)); // 디버깅용: 콘솔에서 확인 가능
}

// --- 토스트 알림 ---
function toast(msg) {
  let t = document.querySelector('.toast');
  if (!t) { t = document.createElement('div'); t.className = 'toast'; document.body.appendChild(t); }
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 1800);
}

document.addEventListener('DOMContentLoaded', updateCartCount);
