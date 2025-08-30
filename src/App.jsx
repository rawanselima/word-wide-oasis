import { lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import NotFound from "./ui/common/NotFound";
import Protected from "./ui/Protected";
const UserProfile = lazy(() => import("./Pages/UserProfile"));
const User = lazy(() => import("./Pages/User"));
const BookingDetails = lazy(() => import("./Pages/BookingDetails"));
const Login = lazy(() => import("./Pages/Login"));
const CheckInBooking = lazy(() => import("./Pages/CheckinBooking"));
const Dashboard = lazy(() => import("./Pages/Dashboard"));
const AppLayout = lazy(() => import("./Pages/AppLayout"));
const Booking = lazy(() => import("./Pages/Booking"));
const Cabin = lazy(() => import("./Pages/Cabin"));
const Settings = lazy(() => import("./Pages/Settings"));

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <Routes>
            <Route
              element={
                <Protected>
                  <AppLayout />
                </Protected>
              }
            >
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="booking/:id" element={<BookingDetails />} />
              <Route path="/cabins" element={<Cabin />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/checkIn/:id" element={<CheckInBooking />} />
              <Route path="/user" element={<User />} />
              <Route path="/userProfile" element={<UserProfile />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster
            position="top-center"
            reverseOrder={false}
            gutter={8}
            containerClassName=""
            containerStyle={{}}
            toastOptions={{
              className: "",
              duration: 5000,
              removeDelay: 1000,
              style: {
                background: "#efefef",
                color: "#00003c",
              },

              success: {
                duration: 3000,
                iconTheme: {
                  primary: "green",
                  secondary: "black",
                },
              },
            }}
          />
        </QueryClientProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
