import { basePath } from './lib/basePath.js';
export const authConfig = {
  pages: {
    signIn: basePath + '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      return true;
    },
  },
  providers: [],
};
