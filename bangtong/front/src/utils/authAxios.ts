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
        config.headers["Authorization"] = `bearer ${token}`;
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
