import type { BuildWithMappedType } from '../../types/build';

import BuildCardRow from './BuildCardRow';

type Props = {
    build: BuildWithMappedType;
};

export default function BuildCard({ build }: Props) {
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
                            Type ID: {build.build_type}
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 text-sm">
                    <BuildCardRow
                        label="CPU"
                        value={build.cpu_name}
                        since={build.cpu_service_at}
                    />
                    <BuildCardRow
                        label="GPU"
                        value={build.gpu_name}
                        since={build.gpu_service_at}
                    />
                    <BuildCardRow
                        label="CPU-Cooler"
                        value={build.cpu_cooler_name}
                        since={build.cpu_cooler_service_at}
                    />
                    <BuildCardRow
                        label="RAM"
                        value={build.ram_name}
                        since={build.ram_service_at}
                    />
                    <BuildCardRow
                        label="Mainboard"
                        value={build.mainboard_name}
                        since={build.mainboard_service_at}
                    />
                    <BuildCardRow
                        label="Storage"
                        value={build.storage_name}
                        since={build.storage_service_at}
                    />
                    <BuildCardRow
                        label="Power Supply"
                        value={build.psu_name}
                        since={build.psu_service_at}
                    />
                    <BuildCardRow
                        label="Case"
                        value={build.case_name}
                        since={build.case_service_at}
                    />
                    <BuildCardRow
                        label="OS"
                        value={build.os_name}
                        since={build.os_service_at}
                    />

                    {build.sound_card_name && (
                        <BuildCardRow
                            label="Sound Card"
                            value={build.sound_card_name}
                            since={build.sound_card_service_at}
                        />
                    )}
                </div>

                {build.next_maintenance_at && (
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
                    </div>
                )}
            </div>
        </div>
    );
}
