import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/shared/components/ui/button';

interface ErrorBoundaryState {
    hasError: boolean;
}

export class ErrorBoundary extends React.Component<React.PropsWithChildren<object>, ErrorBoundaryState> {
    state: ErrorBoundaryState = { hasError: false };

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    handleReset = () => {
        this.setState({ hasError: false });
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-background px-4">
                    <div className="max-w-md w-full text-center space-y-6">
                        <h1 className="text-3xl font-bold text-foreground">Something went wrong</h1>
                        <p className="text-muted-foreground">
                            An unexpected error occurred. Please try again or contact support if the problem persists.
                        </p>
                        <div className="flex justify-center gap-4">
                            <Button onClick={this.handleReset}>Try Again</Button>
                            <Button variant="outline" asChild>
                                <Link to="/" className="text-sm">Go Home</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
