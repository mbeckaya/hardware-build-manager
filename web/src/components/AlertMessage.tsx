import { type ReactNode } from 'react';

import type { AlertType } from '../types/alert';

type Props = {
    type: AlertType;
    children: ReactNode;
};

export default function AlertMessage({ type, children }: Props) {
    if (!children) return null;

    const alertClass = type === 'success' ? 'alert-success' : 'alert-error';

    return (
        <div className={`alert ${alertClass} alert-soft my-2`}>{children}</div>
    );
}
