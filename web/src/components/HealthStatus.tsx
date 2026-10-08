import { getEvenYearsSince } from '../utils/getEvenYearsSince';

type Props = {
    type: 'bullets' | 'badge';
    since: string | null;
};

export default function HealthStatus({ type, since }: Props) {
    let cssStyle = '';
    let caption = '';
    let status = 'healthy';

    if (!since) return;

    const sinceYears = getEvenYearsSince(since);

    if (sinceYears > 5) {
        status = 'critical';
    } else if (sinceYears > 2) {
        status = 'warning';
    }

    if (type === 'bullets') {
        cssStyle = 'status ';

        if (status === 'healthy') {
            cssStyle += 'status-success';
        } else if (status === 'warning') {
            cssStyle += 'status-warning';
        } else if (status === 'critical') {
            cssStyle += 'status-error';
        }
    } else if (type === 'badge') {
        cssStyle = 'badge badge-soft ';

        if (status === 'healthy') {
            cssStyle += 'badge-success';
            caption = 'Healthy';
        } else if (status === 'warning') {
            cssStyle += 'badge-warning';
            caption = 'Warning';
        } else if (status === 'critical') {
            cssStyle += 'badge-error';
            caption = 'Critical';
        }
    }

    return <div className={`mx-2 ${cssStyle}`}>{caption}</div>;
}
