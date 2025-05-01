import { defineStore } from "pinia";

function parseJwt(token: string) {
    console.log('token', token)
  try {
    const base64Url: any = token.split(".")[1];
    const base64: string = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("JWT parsing error:", error);
    return null;
  }
}

export const useTokenStore = defineStore("tokenStore", {
  state: () => ({
    token: "" as string,
    decoded: null as null | Record<string, any>,
  }),

  getters: {
    email: (state) => state.decoded?.email || "",
    role: (state) =>
      state.decoded?.[
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
      ] || "",
    fullName: (state) => state.decoded?.FullName || "",
  },

  actions: {
    setToken(token: string) {
        console.log('token', token)
        this.token = token
        this.decoded = parseJwt(token)
        console.log('Decoded inside store:', this.decoded)
      },
    clearToken() {
      this.token = "";
      this.decoded = null;
    },
  },
});
