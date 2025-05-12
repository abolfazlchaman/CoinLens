import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className='flex min-h-screen items-center justify-center bg-gray-100'>
            <div className='rounded-lg bg-white p-8 shadow-lg'>
              <h2 className='mb-4 text-2xl font-bold text-red-600'>Something went wrong</h2>
              <p className='text-gray-600'>{this.state.error?.message}</p>
              <button
                onClick={() => this.setState({ hasError: false, error: null })}
                className='mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'>
                Try again
              </button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
