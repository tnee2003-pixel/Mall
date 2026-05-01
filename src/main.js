import { api } from './utils/api.js';
import { renderNavbar, renderFooter } from './components/layout.js';
import { renderHome } from './pages/home.js';
import { renderLogin, renderSignup, renderFindAuth } from './pages/auth.js';
import { renderProfile } from './pages/profile.js';

let currentUser = null;

async function checkAuth() {
  try {
    const data = await api.getMe();
    currentUser = data.user;
  } catch (err) {
    currentUser = null;
  }
}

async function render() {
  const app = document.getElementById('app');
  const hash = window.location.hash || '#/';
  
  // 상태 확인
  await checkAuth();

  let content = '';
  
  if (hash === '#/') {
    content = renderHome();
  } else if (hash === '#/login') {
    if (currentUser) {
      window.location.hash = '#/';
      return;
    }
    content = renderLogin();
  } else if (hash === '#/signup') {
    if (currentUser) {
      window.location.hash = '#/';
      return;
    }
    content = renderSignup();
  } else if (hash === '#/find-auth') {
    if (currentUser) {
      window.location.hash = '#/';
      return;
    }
    content = renderFindAuth();
  } else if (hash === '#/profile') {
    if (!currentUser) {
      window.location.hash = '#/login';
      return;
    }
    content = renderProfile(currentUser);
  } else {
    content = `<h2>404 Not Found</h2>`;
  }

  app.innerHTML = `
    ${renderNavbar(currentUser)}
    <main>
      ${content}
    </main>
    ${renderFooter()}
  `;

  attachEventListeners(hash);
}

function attachEventListeners(hash) {
  // 로그아웃 버튼
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      try {
        await api.logout();
        window.location.hash = '#/login';
      } catch (err) {
        alert('로그아웃 실패: ' + err.message);
      }
    });
  }

  // 로그인 폼
  if (hash === '#/login') {
    document.getElementById('login-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      const errorDiv = document.getElementById('login-error');
      
      try {
        await api.login(username, password);
        window.location.hash = '#/';
      } catch (err) {
        errorDiv.textContent = err.message;
      }
    });
  }

  // 회원가입 폼 및 단계 전환
  if (hash === '#/signup') {
    const nextBtn = document.getElementById('next-btn');
    const signupForm = document.getElementById('signup-form');
    const stepTerms = document.getElementById('step-terms');
    let isUsernameChecked = false;
    
    // 다음 단계 버튼 클릭
    nextBtn.addEventListener('click', () => {
      const agreeAll = document.getElementById('agree-all').checked;
      const termsError = document.getElementById('terms-error');
      
      if (!agreeAll) {
        termsError.textContent = '서비스 이용을 위해 약관에 동의해 주세요.';
        return;
      }
      
      termsError.textContent = '';
      stepTerms.style.display = 'none';
      signupForm.style.display = 'block';
    });

    // 아이디 중복 확인 버튼
    document.getElementById('check-username-btn').addEventListener('click', async () => {
      const usernameInput = document.getElementById('signup-username');
      const msgDiv = document.getElementById('username-msg');
      const username = usernameInput.value.trim();

      if (!username) {
        msgDiv.textContent = '아이디를 입력해주세요.';
        msgDiv.style.color = 'var(--error)';
        return;
      }

      try {
        const res = await api.checkUsername(username);
        msgDiv.textContent = res.message;
        msgDiv.style.color = 'var(--success)';
        isUsernameChecked = true;
        
        // 아이디 변경 시 중복확인 다시 하도록
        usernameInput.addEventListener('input', function resetCheck() {
          isUsernameChecked = false;
          msgDiv.textContent = '';
          usernameInput.removeEventListener('input', resetCheck);
        });
      } catch (err) {
        msgDiv.textContent = err.message;
        msgDiv.style.color = 'var(--error)';
        isUsernameChecked = false;
      }
    });

    // 최종 가입 폼 제출
    signupForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!isUsernameChecked) {
        const errorDiv = document.getElementById('signup-error');
        errorDiv.textContent = '아이디 중복 확인을 해주세요.';
        return;
      }

      const username = document.getElementById('signup-username').value;
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const passwordConfirm = document.getElementById('passwordConfirm').value;
      const errorDiv = document.getElementById('signup-error');

      if (password !== passwordConfirm) {
        errorDiv.textContent = '비밀번호가 일치하지 않습니다.';
        return;
      }
      
      if (!/^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/.test(password)) {
        errorDiv.textContent = '비밀번호는 영문, 숫자를 포함하여 8자 이상이어야 합니다.';
        return;
      }

      try {
        await api.signup(username, name, email, password);
        window.location.hash = '#/';
      } catch (err) {
        errorDiv.textContent = err.message;
      }
    });
  }

  // 아이디/비밀번호 찾기
  if (hash === '#/find-auth') {
    // 탭 전환 로직
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        
        btn.classList.add('active');
        document.getElementById(btn.dataset.target).classList.add('active');
      });
    });

    // 아이디 찾기 폼 제출
    document.getElementById('find-id-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('find-id-name').value;
      const email = document.getElementById('find-id-email').value;
      const errorDiv = document.getElementById('find-id-error');
      const resultDiv = document.getElementById('find-id-result');
      
      errorDiv.textContent = '';
      resultDiv.style.display = 'none';

      try {
        const res = await api.findId(name, email);
        resultDiv.innerHTML = `회원님의 아이디는 <strong>${res.username}</strong> 입니다.`;
        resultDiv.style.display = 'block';
      } catch (err) {
        errorDiv.textContent = err.message;
      }
    });

    // 비밀번호 찾기(이메일 발송) 폼 제출
    document.getElementById('find-pw-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const username = document.getElementById('find-pw-username').value;
      const name = document.getElementById('find-pw-name').value;
      const email = document.getElementById('find-pw-email').value;
      const errorDiv = document.getElementById('find-pw-error');
      const resultDiv = document.getElementById('find-pw-result');
      
      errorDiv.textContent = '';
      resultDiv.style.display = 'none';

      try {
        await api.resetPassword(username, name, email);
      } catch (err) {
        if (err.message.includes('이메일을 확인해 주세요')) {
          resultDiv.innerHTML = `<span style="color:var(--success); font-weight:normal;">${err.message}</span>`;
          resultDiv.style.display = 'block';
        } else {
          errorDiv.textContent = err.message;
        }
      }
    });
  }
}

// 라우팅 리스너
window.addEventListener('hashchange', render);

// 초기 렌더링
window.addEventListener('DOMContentLoaded', render);
