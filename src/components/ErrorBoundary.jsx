import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught in ErrorBoundary: ", error, errorInfo);

    // Check if it's a WebGL-related error
    if (error.message && (error.message.includes('WebGL') || error.message.includes('precision') || error.message.includes('context') || error.message.includes('Canvas'))) {
      console.warn("WebGL error detected. This might be due to unsupported WebGL, context loss, multiple canvases, or browser issues.");
      // Force a page reload to reset WebGL context
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  }

  render() {
    if (this.state.hasError) {
      // Provide a more informative fallback for WebGL errors
      if (this.state.error && (this.state.error.message.includes('WebGL') || this.state.error.message.includes('precision') || this.state.error.message.includes('context'))) {
        return (
          <div className="flex items-center justify-center h-full bg-gray-900 text-white">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-4">WebGL Not Supported</h1>
              <p className="mb-4">Your browser does not support WebGL or it is disabled.</p>
              <p className="text-sm">Please enable WebGL in your browser settings or try a different browser.</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
              >
                Retry
              </button>
            </div>
          </div>
        );
      }

      return (
        <div className="flex items-center justify-center h-full bg-gray-900 text-white">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Something went wrong.</h1>
            <p className="mb-4">An unexpected error occurred while rendering the 3D content.</p>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
