import React, { useEffect } from "react";
import useUser from "../hooks/useUser";
import Loader from "./common/Loader";
import { useNavigate } from "react-router-dom";

const Protected = ({ children }) => {
  const { isLoading, isAuthenticated } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login", { replace: true });
    }
  }, [isLoading, isAuthenticated]);

  if (isLoading) return <Loader />;

  if (isAuthenticated) return children;
};

export default Protected;
