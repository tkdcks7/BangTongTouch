import axios, { AxiosInstance } from "axios";
import useUserStore from "../store/userStore";

const authAxios: AxiosInstance = axios.create();

authAxios.interceptors.request.use(
  (config) => {
    if (
      config.url &&
      config.url.includes("" + process.env.REACT_APP_BACKEND_URL)
    ) {
      const { token } = useUserStore.getState();
      if (token) {
        config.headers["Authorization"] =
          `bearer eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJiYW5ndG9uZyIsInN1YiI6ImFkbWluIiwiaWQiOjEsIm5pY2tuYW1lIjoi6rSA66as7J6QIiwiYXV0aG9yaXRpZXMiOiJST0xFX0FETUlOIiwiaWF0IjoxNzIyNDk5MDExLCJleHAiOjE3MzAyNzUwMTF9.x2LYtVjFaYhnMOGE2-BIyIPhIxE-qLvvqFOWjAJyOvBi3pAFkBUOz9G_B67kVlWDSEeKTcqY97vkbIVTpPJX_w`;
      }
    }
    return config;
  },
  (_) => {
    alert("잘못된 접근입니다. 로그인 후 이용해주세요.");
    window.location.replace("localhost:3000/login");
  }
);

authAxios.interceptors.response.use((res) => {
  if (res.headers["Authorization"]) {
    console.log(res.headers["Authorization"]);
    useUserStore.getState().setToken(res.headers["Authorization"]);
  }
  return res;
});

export default authAxios;
