import jwt, { JwtPayload as DefaultJwtPayload } from 'jsonwebtoken';
import * as cookie from 'cookie';

interface JwtPayload extends DefaultJwtPayload {
    user: {
        id: string;
        emailAddress: string;
        userLevel: string;
    };
}

export const getCookie = (cookieName: string, req?: any): string | null => {
    if (typeof window === 'undefined') {
      // Server-side logic
      if (!req?.headers?.cookie) return null; // No cookies available
      const cookies = cookie.parse(req.headers.cookie);
      return cookies[cookieName] || null;
    } else {
      // Client-side logic
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(`${cookieName}=`)) {
          return cookie.substring(cookieName.length + 1);
        }
      }
      return null;
    }
  };
export const cookies = () => {
    const cookie = getCookie("clientToken");
    if (!cookie) {
        return;
    }
    let userTokens: string[] = [];
    try {
        userTokens = JSON.parse(decodeURIComponent(cookie));
    } catch (error) {
        console.error("Error parsing cookie:", error);
        return;
    }
    for (const tokenString of userTokens) {
        const token = jwt.decode(tokenString) as JwtPayload | null;
        if (!token || !token.user) {
            return;
        }

        return {
            id: token.user.id,
            email: token.user.emailAddress,
            userlevel: token.user.userLevel,
        };
    }
};

export const deletecookies = (token:any) =>{
        const setCookie = (name: string, value: string, days: number) => {
        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
    };
    const deleteCookie = (name: string) => {
        setCookie(name, '', -1);
    };
    const conf = confirm("Are you sure you want to logout?");
    if(conf){

        document.location.href = '../Login';
        deleteCookie(token);
    }
}
