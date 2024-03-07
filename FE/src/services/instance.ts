import { commonErrorToast, commonSuccessToast } from "@/utils/notify";
import axios from "axios";
import { useRouter } from "next/navigation";


interface MyResponseData {
  accessToken: string; // or the actual type of your accessToken
  // other properties if there are any
}

const instance = axios.create({
    baseURL: "http://localhost:8088/",
    // headers: {
    //   // Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    //   // "Content-Type": "application/json",
    // },
    
});

instance.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken');
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error)
  }
);

instance.interceptors.response.use(
  (res) => {
    return res.data
  },
  async (err) => {
    const originalConfig = err.config;
    if(originalConfig?.url !== '/signIn' && err.response) {
      if(err.response.status === 401 && !originalConfig._retry && err.response.data.message == 'Token hết hạn') {
        originalConfig._retry = true
      
      try {
        const rs = await instance.post('refreshToken', {
          refreshToken: localStorage.getItem("refresh")
        })
        
        const accessToken  = rs.data

        localStorage.setItem("accessToken", accessToken);

        return instance(originalConfig)
      }catch (error: any) {
      
        return Promise.reject(error)
        
      }
     
      }
      if(err.response.status === 401 && err.response.data.message == 'Refresh Token hết hạn') {
        // const router = useRouter();
        localStorage.clear();
        window.location.href = "/auth"
        commonErrorToast("Token hết hạn")
        // router.push("/auth")
      }
    }
    return Promise.reject(err);
  }
)

export default instance;
