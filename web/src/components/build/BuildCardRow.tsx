type Props = {
    label: string;
    value: React.ReactNode;
};

export default function BuildCardRow({ label, value }: Props) {
    return (
        <div className="flex items-start gap-2 bg-base-200/50 p-2.5 rounded-box">
            <span className="font-semibold text-base-content/70 min-w-[110px]">
                {label}:
            </span>
            <span className="font-medium w-full">{value}</span>
        </div>
    );
}
