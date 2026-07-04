"use client";

import { Provider } from "react-redux";
import { store } from "@/store/store";
import { Header } from "@/components/shared/Header/Header";
import { ToastContainer } from "react-toastify";
import { AuthInitializer } from "@/components/shared/AuthProvider/AuthProvider";
import { Footer } from "@/components/shared/Footer/Footer";

export function ClientProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AuthInitializer>
        <div className="page">
          <div className="wrapper__header">
            <Header />
          </div>

          <main className="page__content">{children}</main>

          <div className="wrapper__footer">
            <Footer />
          </div>
          <ToastContainer
            autoClose={1700}
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
        </div>
      </AuthInitializer>
    </Provider>
  );
}
