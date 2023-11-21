// import NextAuth from 'next-auth';
// export default NextAuth({
//   providers: [],
// });

// 아래도 에러 x : https://mycodings.fly.dev/blog/2023-05-31-nextjs-nextauth-tutorial-1-setup
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      // 로그인 폼에 표시될 이름 (예: "Sign in with...")
      name: 'Credentials',
      // `credentials`는 로그인 페이지에 폼을 생성하는데 사용됩니다.
      // `credentials` 객체에 키를 추가하여 제출해야 할 필드를 지정할 수 있습니다.
      // 예를 들어, 도메인, 사용자 이름, 비밀번호, 2FA 토큰 등입니다.
      // 객체를 통해 <input> 태그에 모든 HTML 속성을 전달할 수 있습니다.
      credentials: {
        email: {
          label: '이메일',
          type: 'text',
          placeholder: '이메일 주소를 입력해주세요',
        },
        password: {
          label: '비밀번호',
          type: 'password',
          placeholder: '패스워드를 입력해주세요',
        },
      },

      async authorize(credentials, req) {
        console.log(req.body);
        const requestUser = {
          // 로그인을 시도할 경우 반드시 id는 포함되어야만 합니다.
          id:'1',
          email: req?.body?.requestedEmail,
          password: req?.body?.requestedPassword,
        };
        // 여기에 인증된 사용자를 찾는 로직을 추가하세요
        // const user = { id: '1', name: 'J Smith', email: 'jsmith@example.com' };

        if (requestUser) {
          // 반환되는 모든 객체는 JWT의 `user` 속성에 저장됩니다
          console.log(requestUser);
          return requestUser;
        } else {
          console.log(requestUser);
          // null을 반환하면 사용자에게 자신의 정보를 확인하라는 오류 메시지가 표시됩니다.
          return null;

          // 이 콜백을 Error로 거부할 수도 있으며, 사용자는 오류 페이지로 보내지고 쿼리 파라미터로 오류 메시지가 표시됩니다.
        }
      },
    }),
  ],
});

export { handler as GET, handler as POST };
