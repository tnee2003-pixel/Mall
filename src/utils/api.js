import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const api = {
  async checkUsername(username) {
    const { data, error } = await supabase
      .from('profiles')
      .select('username')
      .eq('username', username);
      
    if (error) throw new Error('조회 중 오류가 발생했습니다.');
    if (data.length > 0) throw new Error('이미 사용 중인 아이디입니다.');
    return { message: '사용 가능한 아이디입니다.' };
  },

  async findId(name, email) {
    const { data, error } = await supabase
      .from('profiles')
      .select('username')
      .eq('name', name)
      .eq('email', email)
      .single();

    if (error || !data) throw new Error('일치하는 사용자 정보를 찾을 수 없습니다.');
    return { username: data.username };
  },

  async resetPassword(username, name, email) {
    const { data, error } = await supabase
      .from('profiles')
      .select('email')
      .eq('username', username)
      .eq('name', name)
      .eq('email', email)
      .single();

    if (error || !data) throw new Error('일치하는 사용자 정보를 찾을 수 없습니다.');

    const tempPassword = Math.random().toString(36).slice(-8);
    // 보안 문제로 실제 이메일을 통해 재설정 링크를 보내야 하지만,
    // 데모 및 기존 요구사항에 맞춰 비밀번호 강제 업데이트용 Edge Function이나 RPC가 필요함.
    // 하지만 Admin 권한 없이는 비밀번호 변경이 불가능하므로 이메일 인증 코드로 대체하거나
    // 회원가입 시 public.profiles에 비밀번호를 임시로 남길 수는 없으므로 비밀번호 재설정 이메일을 보냄
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email);
    if (resetError) throw new Error('비밀번호 초기화 메일 발송 중 오류가 발생했습니다.');
    
    // UI 메시지 변경용 가짜 응답
    throw new Error('보안을 위해 해당 이메일로 비밀번호 재설정 링크를 발송했습니다. 이메일을 확인해 주세요.');
  },

  async signup(username, name, email, password) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username, name }
      }
    });

    if (error) throw new Error(error.message);
    return data;
  },

  async login(username, password) {
    // 1. 아이디(username)로 이메일 찾기
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('email')
      .eq('username', username)
      .single();

    if (profileError || !profile) {
      throw new Error('아이디 또는 비밀번호가 잘못되었습니다.');
    }

    // 2. 이메일로 로그인
    const { data, error } = await supabase.auth.signInWithPassword({
      email: profile.email,
      password
    });

    if (error) throw new Error('아이디 또는 비밀번호가 잘못되었습니다.');
    return data;
  },

  async logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
    return { message: '로그아웃 성공' };
  },

  async getMe() {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error || !session) throw new Error('인증되지 않은 사용자입니다.');
    
    // profiles 테이블에서 추가 정보 가져오기
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single();

    return { user: { ...session.user, ...profile } };
  }
};
