export function renderProfile(user) {
  if (!user) return '';

  const joinDate = new Date(user.created_at).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return `
    <div class="auth-container" style="max-width: 500px; text-align: left;">
      <h2 style="text-align: center; margin-bottom: 2rem;">회원 정보</h2>
      
      <div class="profile-info-group">
        <label>이름</label>
        <p class="profile-value">${user.name}</p>
      </div>
      
      <div class="profile-info-group">
        <label>아이디</label>
        <p class="profile-value">${user.username}</p>
      </div>
      
      <div class="profile-info-group">
        <label>이메일</label>
        <p class="profile-value">${user.email}</p>
      </div>

      <div class="profile-info-group">
        <label>가입일</label>
        <p class="profile-value">${joinDate}</p>
      </div>

      <div style="margin-top: 2rem; text-align: center;">
        <a href="#/" class="btn" style="display: inline-block; text-decoration: none;">홈으로 돌아가기</a>
      </div>
    </div>
  `;
}
