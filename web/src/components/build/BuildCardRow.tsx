import HealthStatus from '../HealthStatus';

type Props = {
    label: string;
    value: React.ReactNode;
    since?: string | null;
};

export default function BuildCardRow({ label, value, since }: Props) {
    return (
        <div className="flex items-start gap-2 bg-base-200/50 p-2.5 rounded-box">
            <span className="font-semibold text-base-content/70 min-w-[110px]">
                {label}:
            </span>

            <div className="flex flex-col w-full">
                <span className="font-medium">{value}</span>

                {since && (
                    <span className="text-sm text-base-content/50">
                        Since: {since}
                    </span>
                )}
            </div>

            {since && <HealthStatus type="badge" since={since} />}
        </div>
    );
}
