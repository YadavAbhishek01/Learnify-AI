import { createContext, useState, useEffect } from "react";
import { axiosInstance } from "../utils/axiosInstance";
import toast from "react-hot-toast";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export const Authcontext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [authUser, setAuthUser] = useState(null);
  const [loading, SetLoading] = useState(true)


  const navigate = useNavigate()
  // Set auth header when token changes
  useEffect(() => {
    if (token) {
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, [token]);
  const getRegister = async (name, email, password) => {
    try {
      SetLoading(true)
      // ✅ FIXED: Added await and proper response handling
      const res = await axiosInstance.post("/register", { name, email, password });

      if (res.data.success) {
        toast.success("Register Successfully");
        // Optionally set token and user
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
          setToken(res.data.token);
        }
        if (res.data.user) {
          setAuthUser(res.data.user);
        }
      } else {
        SetLoading(false)
        toast.error(res.data.message || "User already registered!");
      }
    } catch (error) {
      console.error("Register error:", error.response?.data || error.message);
      toast.error("Mached the all Requirements" ||error.response?.data?.message || "Registration failed!");
    } finally {
      SetLoading(false)
    } 
  };
  const getLogin = async (email, password) => {
    try {
      SetLoading(true)
      // ✅ FIXED: Added await and proper response handling
      const res = await axiosInstance.post("/login", { email, password });

      if (res.data.success) {
        toast.success("Login Successfully");
        // Optionally set token and user
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
          setToken(res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.data))
          setAuthUser(res.data.data)
          navigate('/dashboard')
        }

      } else {
        SetLoading(false)
        toast.error(res.data.message || "Invalid Credential");
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Login failed!");
    } finally {
      SetLoading(false)
    }
  };

  const getAuthuser = useCallback(async () => {
    try {
      if (!token) {
        SetLoading(false);
        return;
      }
      const res = await axiosInstance.get('/check');
      if (res.data.success) {
        setAuthUser(res.data.data);
      }
      else {
        logoutUser();
      }
    } catch (error) {
      console.log(error)
      logoutUser();
    } finally {
      SetLoading(false)
    }
  }, [token])

  const UpdateProfile=async(body)=>{
    try {
      SetLoading(true)
    const res=await axiosInstance.put('/update',body);
    if(res.data.success)
    {
      toast.success("update Sucessfully");
      setAuthUser(res.data.updateUser);
      localStorage.setItem("user",JSON.stringify(res.data.updateUser));
    }
    else{
      toast.error("Failed to Updated");
    }
    } catch (error) {
      SetLoading(false)
      console.log(error ||error.message)
    }finally{
      SetLoading(false)
    }
  }
  const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("pdfId");
    setToken(null);
    setAuthUser(null);
    // navigate("/login");
  };
  useEffect(() => {
    getAuthuser();
  }, [getAuthuser]);
  // ✅ FIXED: Provide ALL values in context
  const value = {
    token,
    authUser,
    loading,
    SetLoading,
    getRegister,
    getLogin,
    setToken,
    UpdateProfile,
    setAuthUser,
    logoutUser
  };

  return (
    <Authcontext.Provider value={value}>
      {children}
    </Authcontext.Provider>
  );
};
