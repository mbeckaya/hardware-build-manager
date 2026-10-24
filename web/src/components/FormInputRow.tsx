import React from 'react';

import AlertMessage from './AlertMessage';

type Props = {
    id: string;
    label: string;
    error?: string;
    children: React.ReactNode;
};

export default function FormInputRow({ id, label, error, children }: Props) {
    return (
        <div className="space-y-2">
            <label htmlFor={id} className="block font-medium">
                {label}
            </label>

            {children}

            {error && (
                <div className="pt-1">
                    <AlertMessage type="error">
                        <p>{error}</p>
                    </AlertMessage>
                </div>
            )}
        </div>
    );
}
