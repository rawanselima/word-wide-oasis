import React, { useEffect, useMemo } from "react";
import useUser from "../hooks/useUser";
import Loader from "./common/Loader";
import { useNavigate } from "react-router-dom";

const Protected = ({ children }) => {
  const { isLoading, isAuthenticated } = useUser();
  const navigate = useNavigate();

  // Optimize: Memoize the redirect logic to prevent unnecessary re-renders
  const shouldRedirect = useMemo(() => {
    return !isLoading && !isAuthenticated;
  }, [isLoading, isAuthenticated]);

  useEffect(() => {
    if (shouldRedirect) {
      navigate("/login", { replace: true });
    }
  }, [shouldRedirect, navigate]);

  if (isLoading) return <Loader />;

  if (isAuthenticated) return children;
};

export default Protected;
