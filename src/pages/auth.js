export function renderLogin() {
  return `
    <div class="auth-container">
      <h2>로그인</h2>
      <form id="login-form">
        <div class="form-group">
          <label for="username">아이디</label>
          <input type="text" id="username" required>
        </div>
        <div class="form-group">
          <label for="password">비밀번호</label>
          <input type="password" id="password" required>
        </div>
        <div id="login-error" class="form-error"></div>
        <button type="submit" class="btn" style="width: 100%; margin-top: 1rem;">입장하기</button>
      </form>
      <div class="auth-links">
        <p><a href="#/find-auth">아이디 / 비밀번호 찾기</a></p>
        <p style="margin-top:0.5rem;">아직 회원이 아니신가요? <a href="#/signup">회원가입</a></p>
      </div>
    </div>
  `;
}

export function renderFindAuth() {
  return `
    <div class="auth-container" style="max-width: 400px;">
      <h2>계정 정보 찾기</h2>
      
      <div class="tab-container">
        <button class="tab-btn active" data-target="find-id">아이디 찾기</button>
        <button class="tab-btn" data-target="find-pw">비밀번호 찾기</button>
      </div>

      <!-- 아이디 찾기 탭 -->
      <div id="find-id" class="tab-content active">
        <form id="find-id-form">
          <div class="form-group">
            <label for="find-id-name">이름</label>
            <input type="text" id="find-id-name" required>
          </div>
          <div class="form-group">
            <label for="find-id-email">가입한 이메일</label>
            <input type="email" id="find-id-email" required>
          </div>
          <div id="find-id-error" class="form-error"></div>
          <button type="submit" class="btn" style="width: 100%; margin-top: 1rem;">아이디 찾기</button>
        </form>
        <div id="find-id-result" class="result-box" style="display:none;"></div>
      </div>

      <!-- 비밀번호 찾기 탭 -->
      <div id="find-pw" class="tab-content">
        <p style="font-size: 0.85rem; margin-bottom: 1rem;">가입 정보를 입력하시면 임시 비밀번호를 화면에 즉시 발급해 드립니다.</p>
        <form id="find-pw-form">
          <div class="form-group">
            <label for="find-pw-username">아이디</label>
            <input type="text" id="find-pw-username" required>
          </div>
          <div class="form-group">
            <label for="find-pw-name">이름</label>
            <input type="text" id="find-pw-name" required>
          </div>
          <div class="form-group">
            <label for="find-pw-email">가입한 이메일</label>
            <input type="email" id="find-pw-email" required>
          </div>
          <div id="find-pw-error" class="form-error"></div>
          <button type="submit" class="btn" style="width: 100%; margin-top: 1rem;">임시 비밀번호 발급</button>
        </form>
        <div id="find-pw-result" class="result-box" style="display:none;"></div>
      </div>

      <div class="auth-links" style="margin-top: 1.5rem;">
        <p><a href="#/login">로그인 화면으로 돌아가기</a></p>
      </div>
    </div>
  `;
}

export function renderSignup() {
  const termsText = `제1조(목적)
이 약관은 문방사우(전자상거래 사업자)가 운영하는 문방사우 사이버 몰(이하 "몰"이라 한다)에서 제공하는 인터넷 관련 서비스(이하 "서비스"라 한다)를 이용함에 있어 사이버 몰과 이용자의 권리·의무 및 책임사항을 규정함을 목적으로 합니다.

제2조(정의)
① "몰"이란 문방사우가 재화 또는 용역을 이용자에게 제공하기 위하여 컴퓨터 등 정보통신설비를 이용하여 재화 등을 거래할 수 있도록 설정한 가상의 영업장을 말하며, 아울러 사이버몰을 운영하는 사업자의 의미로도 사용합니다.
② "이용자"란 "몰"에 접속하여 이 약관에 따라 "몰"이 제공하는 서비스를 받는 회원 및 비회원을 말합니다.
③ '회원'이라 함은 "몰"에 회원등록을 한 자로서, 계속적으로 "몰"이 제공하는 서비스를 이용할 수 있는 자를 말합니다.

제3조 (개인정보의 수집 및 이용 목적)
① 몰은 원활한 서비스 제공을 위해 최소한의 개인정보를 수집합니다.
② 수집항목: 성명, 이메일, 비밀번호
③ 이용목적: 회원가입 및 관리, 원활한 고객상담, 서비스 이용 기록 분석`;

  return `
    <div class="auth-container" style="max-width: 500px;">
      <h2>회원가입</h2>
      
      <!-- 1단계: 약관 동의 -->
      <div id="step-terms">
        <div class="form-group">
          <label>문방사우 이용약관 및 개인정보 수집·이용 동의</label>
          <div class="terms-box">${termsText}</div>
        </div>
        <div class="form-group" style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0;">
          <input type="checkbox" id="agree-all" style="width: auto; cursor: pointer;">
          <label for="agree-all" style="margin-bottom: 0; font-weight: 600; cursor: pointer;">
            위 이용약관 및 개인정보 수집·이용에 모두 동의합니다. (필수)
          </label>
        </div>
        <div id="terms-error" class="form-error"></div>
        <button type="button" id="next-btn" class="btn" style="width: 100%; margin-top: 1.5rem;">다음 단계로</button>
      </div>

      <!-- 2단계: 정보 입력 (초기 숨김) -->
      <form id="signup-form" style="display: none;">
        <div class="form-group">
          <label for="signup-username">아이디</label>
          <div style="display: flex; gap: 0.5rem;">
            <input type="text" id="signup-username" required style="flex: 1;">
            <button type="button" id="check-username-btn" class="btn">중복확인</button>
          </div>
          <div id="username-msg" style="font-size: 0.85rem; margin-top: 0.25rem;"></div>
        </div>
        <div class="form-group">
          <label for="name">이름</label>
          <input type="text" id="name" required>
        </div>
        <div class="form-group">
          <label for="email">이메일</label>
          <input type="email" id="email" required>
        </div>
        <div class="form-group">
          <label for="password">비밀번호 (8자 이상, 영문+숫자)</label>
          <input type="password" id="password" required minlength="8">
        </div>
        <div class="form-group">
          <label for="passwordConfirm">비밀번호 확인</label>
          <input type="password" id="passwordConfirm" required>
        </div>
        <div id="signup-error" class="form-error"></div>
        <button type="submit" class="btn" style="width: 100%; margin-top: 1.5rem;">가입 완료하기</button>
      </form>
      
      <div class="auth-links">
        <p>이미 계정이 있으신가요? <a href="#/login">로그인</a></p>
      </div>
    </div>
  `;
}
