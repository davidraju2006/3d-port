import React from "react";
import { Html, useProgress } from "@react-three/drei";

const CanvasLoader = () => {
  const { progress } = useProgress();

  return (
    <Html center>
      <div className="canvas-loader" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <span className="canvas-load" style={{ width: 40, height: 40, borderRadius: "50%", border: "5px solid #f1f1f1", borderTop: "5px solid transparent", animation: "spin 1s linear infinite" }}></span>
        <p
          style={{
            fontSize: 14,
            color: "#f1f1f1",
            fontWeight: 800,
            marginTop: 20,
            textAlign: "center",
          }}
        >
          {progress.toFixed(2)}%
        </p>
      </div>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </Html>
  );
};

export default CanvasLoader;
