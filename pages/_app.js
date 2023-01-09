import "../styles/globals.css";
import axios from "axios";
import { setCookie, getCookie } from "cookies-next";
import FormData2 from "form-data";
import Manager from "../utils/encryption";

export const instance = axios.create({
  baseURL: `https://comx-sand-api.afexnigeria.com/api`,
});

const manager = new Manager({
  key: process.env.KEY,
  vector: process.env.VECTOR,
});

const login = async ({ email, password, auth_type }) => {
  const data = new FormData2();
  data.append("email", "sa.abdulgafar@gmail.com");
  data.append("password", "password");
  data.append("auth_type", "password");

  const response = await instance
    .post("/login", manager.encrypt(data))
    .catch((e) => console.log("Login error", e));

  if (response) {
    console.log("Login response", response);
    setCookie("token", response.data?.data?.token);
  }
  console.log("Formdata2", data);
  return response;
};

instance.interceptors.request.use(
  (req) => {
    return req;
  },
  (err) => {
    Promise.reject(err);
  }
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    const originalConfig = err;
    if (err?.response?.status === 401 && !originalConfig?._retry) {
      originalConfig._retry = true;
      login({
        email: "sa.abdulgafar@gmail.com",
        password: "password",
        auth_type: "password",
      });
      console.log("Original config", originalConfig);
    }
    Promise.reject(err);
  }
);

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
