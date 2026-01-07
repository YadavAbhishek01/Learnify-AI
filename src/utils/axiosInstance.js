import axios from 'axios'

export const axiosInstance=axios.create({
    baseURL:import.meta.env.VITE_BACKEND_URL,
    withCredentials:true
})
export const PdfUpload = axios.create({
  baseURL: import.meta.env.VITE_API_UPLOAD_URL,
  withCredentials: true,
});
export const AskaiInstanse = axios.create({
  baseURL: import.meta.env.VITE_API_RESPONSE_URL,
  withCredentials: true,
});
export const ProgreesInstance = axios.create({
  baseURL: import.meta.env.VITE_API_PROGRESS_URL,
  withCredentials: true,
});