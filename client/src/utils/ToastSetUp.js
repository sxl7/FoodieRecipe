import React, { createContext, useContext } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ToastContext = createContext();

export const ToastSetUp = ({ children }) => {
    // Define toast functions
    const notifySuccess = (message, options = {}) => toast.success(message, options);
    const notifyError = (message, options = {}) => toast.error(message, options);
    const notifyInfo = (message, options = {}) => toast(message, options);
    const notifyWarning = (message, options = {}) => toast.warn(message, options);
  
    return (
      <ToastContext.Provider value={{ notifySuccess, notifyError, notifyInfo, notifyWarning }}>
        {children}
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        />
      </ToastContext.Provider>
    );
  };
  
  export const useToast = () => useContext(ToastContext);