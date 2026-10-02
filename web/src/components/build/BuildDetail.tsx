import { useGetBuildByIdQuery } from '../../api/buildsApi';
import { useGetAllBuildTypesQuery } from '../../api/buildTypesApi';
import type { BuildWithMappedType } from '../../types/build';

import AlertMessage from '../AlertMessage';
import LoadingSpinner from '../LoadingSpinner';

type Props = { id: string };

export default function BuildDetail({ id }: Props) {
    const {
        data: build,
        isLoading: isLoadingBuild,
        error: errorBuild,
    } = useGetBuildByIdQuery(id, { refetchOnMountOrArgChange: true });

    const {
        data: buildTypes = [],
        isLoading: isLoadingBuildTypes,
        error: errorBuildTypes,
    } = useGetAllBuildTypesQuery();

    if (!build) return <p>No build</p>;

    const buildWithType: BuildWithMappedType = {
        ...build,
        build_type:
            buildTypes.find((bt) => bt.id === build.build_type_id)?.name ??
            null,
    };

    if (isLoadingBuild || isLoadingBuildTypes) {
        return <LoadingSpinner />;
    }

    if (errorBuild || errorBuildTypes) {
        return (
            <AlertMessage type="error">
                <span>Loading Build</span>
            </AlertMessage>
        );
    }

    return (
        <div className="card bg-base-100 w-full max-w-4xl shadow-xl border border-base-200 mb-4 transition-all hover:shadow-2xl">
            <div className="card-body gap-6">
                <div className="flex flex-wrap justify-between items-center gap-3 border-b border-base-200 pb-4">
                    <div>
                        <h2 className="card-title text-2xl font-bold tracking-tight text-primary">
                            {buildWithType.name}
                        </h2>
                        <span className="text-xs text-base-content/60 font-mono">
                            Created on:{' '}
                            {new Date(
                                buildWithType.created_at,
                            ).toLocaleDateString()}
                        </span>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="badge badge-neutral font-mono text-xs">
                            ID: {buildWithType.id}
                        </span>
                        <span className="badge badge-primary badge-outline text-xs">
                            Type: {buildWithType.build_type}
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 text-sm">
                    <div className="flex items-start gap-2 bg-base-200/50 p-2.5 rounded-box">
                        <span className="font-semibold text-base-content/70 min-w-[110px]">
                            CPU:
                        </span>
                        <span className="font-medium">
                            {buildWithType.cpu}
                            {buildWithType.cpu_cooler && (
                                <span className="text-xs text-base-content/60 block">
                                    Cooler: {buildWithType.cpu_cooler}
                                </span>
                            )}
                        </span>
                    </div>

                    <div className="flex items-center gap-2 bg-base-200/50 p-2.5 rounded-box">
                        <span className="font-semibold text-base-content/70 min-w-[110px]">
                            GPU:
                        </span>
                        <span className="font-medium">{buildWithType.gpu}</span>
                    </div>

                    <div className="flex items-center gap-2 bg-base-200/50 p-2.5 rounded-box">
                        <span className="font-semibold text-base-content/70 min-w-[110px]">
                            RAM:
                        </span>
                        <span className="font-medium">{buildWithType.ram}</span>
                    </div>

                    <div className="flex items-center gap-2 bg-base-200/50 p-2.5 rounded-box">
                        <span className="font-semibold text-base-content/70 min-w-[110px]">
                            Mainboard:
                        </span>
                        <span className="font-medium">
                            {buildWithType.mainboard}
                        </span>
                    </div>

                    <div className="flex items-center gap-2 bg-base-200/50 p-2.5 rounded-box">
                        <span className="font-semibold text-base-content/70 min-w-[110px]">
                            Storage:
                        </span>
                        <span className="font-medium">
                            {buildWithType.storage}
                        </span>
                    </div>

                    <div className="flex items-center gap-2 bg-base-200/50 p-2.5 rounded-box">
                        <span className="font-semibold text-base-content/70 min-w-[110px]">
                            Power Supply:
                        </span>
                        <span className="font-medium">{buildWithType.psu}</span>
                    </div>

                    <div className="flex items-center gap-2 bg-base-200/50 p-2.5 rounded-box">
                        <span className="font-semibold text-base-content/70 min-w-[110px]">
                            Case:
                        </span>
                        <span className="font-medium">
                            {buildWithType.case}
                        </span>
                    </div>

                    <div className="flex items-center gap-2 bg-base-200/50 p-2.5 rounded-box">
                        <span className="font-semibold text-base-content/70 min-w-[110px]">
                            OS:
                        </span>
                        <span className="font-medium">{buildWithType.os}</span>
                    </div>

                    {buildWithType.sound_card && (
                        <div className="flex items-center gap-2 bg-base-200/50 p-2.5 rounded-box">
                            <span className="font-semibold text-base-content/70 min-w-[110px]">
                                Sound Card:
                            </span>
                            <span className="font-medium">
                                {buildWithType.sound_card}
                            </span>
                        </div>
                    )}
                </div>

                {(buildWithType.next_maintenance_at || build.warranty) && (
                    <div className="flex flex-wrap gap-4 pt-3 border-t border-base-200 text-xs text-base-content/70">
                        {buildWithType.next_maintenance_at && (
                            <div className="flex items-center gap-1.5">
                                <span className="font-semibold">
                                    Next Maintenance:
                                </span>
                                <span className="badge badge-warning badge-sm">
                                    {buildWithType.next_maintenance_at}
                                </span>
                            </div>
                        )}
                        {buildWithType.warranty && (
                            <div className="flex items-center gap-1.5">
                                <span className="font-semibold">
                                    Warranty Until:
                                </span>
                                <span className="badge badge-success badge-sm">
                                    {buildWithType.warranty}
                                </span>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
