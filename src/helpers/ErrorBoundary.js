import React from "react";

// https://reactjs.org/docs/error-boundaries.html
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (<>
      <h1>Network or internal server error. Please try again.</h1>
      <h1>网络问题，或内部服务器错误。请稍候再试。</h1>
      </>);
    }

    return this.props.children; 
  }
}