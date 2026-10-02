export type ApiValidationError = {
    data?: {
        detail?: {
            type: string;
            loc: (string | number)[];
            msg: string;
            input: unknown;
            ctx?: {
                expected?: string;
            };
        }[];
    };
};

export function getApiErrorMessage(
    error: unknown,
    fallback = 'An unexpected error occurred.'
): string {
    const apiError = error as ApiValidationError;
    const detail = apiError.data?.detail?.[0];

    if (!detail) {
        return fallback;
    }

    const field = detail.loc.at(-1);

    if (!field) {
        return detail.msg;
    }

    return `${field}: ${detail.msg}`;
}