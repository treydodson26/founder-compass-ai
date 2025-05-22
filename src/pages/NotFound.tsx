
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen p-5 bg-background">
      <div className="text-center space-y-6">
        <h1 className="text-5xl md:text-7xl font-bold">404</h1>
        <h2 className="text-2xl md:text-3xl">Page Not Found</h2>
        <p className="text-muted-foreground">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Button onClick={() => navigate("/")}>Return to Home</Button>
      </div>
    </div>
  );
};

export default NotFound;
