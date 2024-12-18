// 컴포넌트 로드 함수
async function loadComponent(elementId, componentPath) {
  try {
    const response = await fetch(componentPath);
    const html = await response.text();
    document.getElementById(elementId).innerHTML = html;
  } catch (error) {
    console.error('컴포넌트 로드 실패:', error);
  }
}

// 페이지 로드 시 모든 컴포넌트 로드
document.addEventListener('DOMContentLoaded', () => {
  loadComponent('header-container', '../HTML/components/header.html');
  loadComponent('footer-container', '../HTML/components/footer.html');
});

// head 컴포넌트 동적 로드
async function loadHeadComponent() {
  try {
    const response = await fetch('../HTML/components/head.html');
    const html = await response.text();
    document.head.insertAdjacentHTML('beforeend', html);
  } catch (error) {
    console.error('Head 컴포넌트 로드 실패:', error);
  }
}
