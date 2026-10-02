import { useGetBuildByIdQuery } from '../../api/buildsApi';

import AlertMessage from '../AlertMessage';
import LoadingSpinner from '../LoadingSpinner';

type Props = { id: string };

export default function BuildDetail({ id }: Props) {
    const {
        data: build,
        isLoading,
        error,
    } = useGetBuildByIdQuery(id, { refetchOnMountOrArgChange: true });

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return (
            <AlertMessage type="error">
                <span>Loading Build</span>
            </AlertMessage>
        );
    }

    if (!build) return <p>No build</p>;

    return (
        <div className="card bg-base-100 w-full max-w-4xl shadow-xl border border-base-200 mb-4 transition-all hover:shadow-2xl">
            <div className="card-body gap-6">
                <div className="flex flex-wrap justify-between items-center gap-3 border-b border-base-200 pb-4">
                    <div>
                        <h2 className="card-title text-2xl font-bold tracking-tight text-primary">
                            {build.name}
                        </h2>
                        <span className="text-xs text-base-content/60 font-mono">
                            Created on:{' '}
                            {new Date(build.created_at).toLocaleDateString()}
                        </span>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="badge badge-neutral font-mono text-xs">
                            ID: {build.id}
                        </span>
                        <span className="badge badge-primary badge-outline text-xs">
                            Type: {build.build_type_id}
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 text-sm">
                    <div className="flex items-start gap-2 bg-base-200/50 p-2.5 rounded-box">
                        <span className="font-semibold text-base-content/70 min-w-[110px]">
                            CPU:
                        </span>
                        <span className="font-medium">
                            {build.cpu}
                            {build.cpu_cooler && (
                                <span className="text-xs text-base-content/60 block">
                                    Cooler: {build.cpu_cooler}
                                </span>
                            )}
                        </span>
                    </div>

                    <div className="flex items-center gap-2 bg-base-200/50 p-2.5 rounded-box">
                        <span className="font-semibold text-base-content/70 min-w-[110px]">
                            GPU:
                        </span>
                        <span className="font-medium">{build.gpu}</span>
                    </div>

                    <div className="flex items-center gap-2 bg-base-200/50 p-2.5 rounded-box">
                        <span className="font-semibold text-base-content/70 min-w-[110px]">
                            RAM:
                        </span>
                        <span className="font-medium">{build.ram}</span>
                    </div>

                    <div className="flex items-center gap-2 bg-base-200/50 p-2.5 rounded-box">
                        <span className="font-semibold text-base-content/70 min-w-[110px]">
                            Mainboard:
                        </span>
                        <span className="font-medium">{build.mainboard}</span>
                    </div>

                    <div className="flex items-center gap-2 bg-base-200/50 p-2.5 rounded-box">
                        <span className="font-semibold text-base-content/70 min-w-[110px]">
                            Storage:
                        </span>
                        <span className="font-medium">{build.storage}</span>
                    </div>

                    <div className="flex items-center gap-2 bg-base-200/50 p-2.5 rounded-box">
                        <span className="font-semibold text-base-content/70 min-w-[110px]">
                            Power Supply:
                        </span>
                        <span className="font-medium">{build.psu}</span>
                    </div>

                    <div className="flex items-center gap-2 bg-base-200/50 p-2.5 rounded-box">
                        <span className="font-semibold text-base-content/70 min-w-[110px]">
                            Case:
                        </span>
                        <span className="font-medium">{build.case}</span>
                    </div>

                    <div className="flex items-center gap-2 bg-base-200/50 p-2.5 rounded-box">
                        <span className="font-semibold text-base-content/70 min-w-[110px]">
                            OS:
                        </span>
                        <span className="font-medium">{build.os}</span>
                    </div>

                    {build.sound_card && (
                        <div className="flex items-center gap-2 bg-base-200/50 p-2.5 rounded-box">
                            <span className="font-semibold text-base-content/70 min-w-[110px]">
                                Sound Card:
                            </span>
                            <span className="font-medium">
                                {build.sound_card}
                            </span>
                        </div>
                    )}
                </div>

                {(build.next_maintenance_at || build.warranty) && (
                    <div className="flex flex-wrap gap-4 pt-3 border-t border-base-200 text-xs text-base-content/70">
                        {build.next_maintenance_at && (
                            <div className="flex items-center gap-1.5">
                                <span className="font-semibold">
                                    Next Maintenance:
                                </span>
                                <span className="badge badge-warning badge-sm">
                                    {build.next_maintenance_at}
                                </span>
                            </div>
                        )}
                        {build.warranty && (
                            <div className="flex items-center gap-1.5">
                                <span className="font-semibold">
                                    Warranty Until:
                                </span>
                                <span className="badge badge-success badge-sm">
                                    {build.warranty}
                                </span>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
