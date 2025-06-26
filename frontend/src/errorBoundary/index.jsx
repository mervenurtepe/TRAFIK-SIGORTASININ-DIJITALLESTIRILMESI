import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorDetails: null
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    const errorDetails = {
      message: error.message,
      name: error.name,
      url: window.location.href,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      viewportSize: `${window.innerWidth}x${window.innerHeight}`
    };

    this.setState({ errorInfo, errorDetails });
    this.logErrorToService(error, errorInfo, errorDetails);
  }

  logErrorToService(error, errorInfo, errorDetails) {
    console.error('Error Details:', {
      ...errorDetails,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      additionalContext: {
        localStorage: { ...localStorage },
        sessionData: sessionStorage.length,
        cookies: document.cookie,
        referrer: document.referrer
      }
    });
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  handleHomeReturn = () => {
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      const { error, errorInfo, errorDetails } = this.state;

      return (
        <div className="min-h-screen bg-gradient-to-br from-[#0c308b] to-[#0bdac1] dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4 font-sans transition-colors duration-200">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl w-full max-w-4xl p-8 transition-colors duration-200">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
                Oops! Something went wrong.
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                We're sorry, but an error has occurred. Please try refreshing
                the page or contact support if the problem persists.
              </p>
            </div>

            <div className="flex justify-center space-x-4 mb-8">
              <button
                onClick={this.handleHomeReturn}
                className="flex items-center px-6 py-3 bg-[#0c308b] hover:bg-[#0bdac1] text-white rounded-full transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#0c308b]"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                Return to Home
              </button>
              <button
                onClick={this.handleRetry}
                className="flex items-center px-6 py-3 bg-[#0c308b] hover:bg-[#0bdac1] text-white rounded-full transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#0c308b]"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38" />
                </svg>
                Refresh Page
              </button>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                Error Details:
              </h2>
              {errorDetails && (
                <div className="bg-gray-900 dark:bg-gray-700 rounded-lg p-4">
                  <h3 className="text-white font-semibold mb-2">
                    Error Information:
                  </h3>
                  <pre className="text-red-400 dark:text-red-300 whitespace-pre-wrap font-mono text-sm">
                    {JSON.stringify(errorDetails, null, 2)}
                  </pre>
                </div>
              )}
              {error && error.stack && (
                <details className="group">
                  <summary className="cursor-pointer bg-gray-100 dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500 rounded-lg p-4 flex items-center">
                    <span className="font-semibold text-gray-800 dark:text-white">
                      View Error Stack
                    </span>
                    <span className="ml-auto transform group-open:rotate-180 transition-transform duration-200">
                      ▼
                    </span>
                  </summary>
                  <div className="mt-2 bg-gray-900 dark:bg-gray-700 rounded-lg p-4">
                    <pre className="text-gray-300 whitespace-pre-wrap font-mono text-sm overflow-x-auto">
                      {error.stack}
                    </pre>
                  </div>
                </details>
              )}
              {errorInfo && errorInfo.componentStack && (
                <details className="group">
                  <summary className="cursor-pointer bg-gray-100 dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500 rounded-lg p-4 flex items-center">
                    <span className="font-semibold text-gray-800 dark:text-white">
                      View Component Stack
                    </span>
                    <span className="ml-auto transform group-open:rotate-180 transition-transform duration-200">
                      ▼
                    </span>
                  </summary>
                  <div className="mt-2 bg-gray-900 dark:bg-gray-700 rounded-lg p-4">
                    <pre className="text-gray-300 whitespace-pre-wrap font-mono text-sm overflow-x-auto">
                      {errorInfo.componentStack}
                    </pre>
                  </div>
                </details>
              )}
            </div>            
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;