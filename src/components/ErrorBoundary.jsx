import React, { useState } from 'react';

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  // This hook mimics the getDerivedStateFromError lifecycle method
  const handleError = (error, errorInfo) => {
    setHasError(true);
    // You can log the error to an error reporting service
    console.error("ErrorBoundary caught an error", error, errorInfo);
  };

  // This function component can't directly use componentDidCatch, so we create a fallback to handle errors
  try {
    if (hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }
    return children;
  } catch (error) {
    handleError(error);
    return <h1>Something went wrong.</h1>;
  }
};

export default ErrorBoundary;
