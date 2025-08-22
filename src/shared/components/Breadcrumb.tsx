// src/shared/components/Breadcrumb.tsx
import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export const Breadcrumb = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    return (
        <nav aria-label="breadcrumb" className="mb-6">
            <ol className="flex items-center space-x-2 text-sm">
                <li>
                    <Link to="/dashboard" className="text-muted-foreground hover:text-foreground">
                        Dashboard
                    </Link>
                </li>
                {pathnames.slice(1).map((value, index) => {
                    const to = `/${pathnames.slice(0, index + 2).join('/')}`;
                    const isLast = index === pathnames.length - 2;

                    return (
                        <React.Fragment key={to}>
                            <li>
                                <ChevronRight className="h-4 w-4 text-muted-foreground" />
                            </li>
                            <li>
                                {isLast ? (
                                    <span className="font-medium text-foreground">{capitalize(value)}</span>
                                ) : (
                                    <Link to={to} className="text-muted-foreground hover:text-foreground">
                                        {capitalize(value)}
                                    </Link>
                                )}
                            </li>
                        </React.Fragment>
                    );
                })}
            </ol>
        </nav>
    );
};
