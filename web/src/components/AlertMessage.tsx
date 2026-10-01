import { useEffect, useState, type ReactNode } from 'react';

import type { AlertType } from '../types/alert';

type Props = {
    type: AlertType;
    children: ReactNode;
};

export default function AlertMessage({ type, children }: Props) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (!children) {
            setVisible(false);
            return;
        }

        setVisible(true);

        const timer = setTimeout(() => {
            setVisible(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, [children]);

    if (!children || !visible) return null;

    const alertClass = type === 'success' ? 'alert-success' : 'alert-error';

    return (
        <div className={`alert ${alertClass} alert-soft my-2`}>{children}</div>
    );
}
