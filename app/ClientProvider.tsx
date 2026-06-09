"use client";

import { Provider } from "react-redux";
import { store } from "@/store/store";
import { Header } from "@/components/shared/Header/Header";
import { ToastContainer } from "react-toastify";
import { AuthInitializer } from "@/components/shared/AuthProvider/AuthProvider ";

export function ClientProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AuthInitializer>
        <Header />
        {children}
        <ToastContainer
          autoClose={3000}
          limit={1}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          style={{
            left: "50%",
            transform: "translateX(-50%)",
            top: "20px",
          }}
          theme="light"
          toastStyle={{
            background: "#2b2d40",
            color: "#ffffff",
            borderRadius: "8px",
            padding: "16px",
            width: "auto",
            maxWidth: "400px",
          }}
        />
      </AuthInitializer>
    </Provider>
  );
}
