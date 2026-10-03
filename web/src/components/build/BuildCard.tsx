
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
                        value={
                            <>
                                {build.cpu}
                                {build.cpu_cooler && (
                                    <span className="text-xs text-base-content/60 block">
                                        Cooler: {build.cpu_cooler}
                                    </span>
                                )}
                            </>
                        }
                    />

                    <BuildCardRow label="GPU" value={build.gpu} />
                    <BuildCardRow label="RAM" value={build.ram} />
                    <BuildCardRow label="Mainboard" value={build.mainboard} />
                    <BuildCardRow label="Storage" value={build.storage} />
                    <BuildCardRow label="Power Supply" value={build.psu} />
                    <BuildCardRow label="Case" value={build.case} />
                    <BuildCardRow label="OS" value={build.os} />

                    {build.sound_card && (
                        <BuildCardRow
                            label="Sound Card"
                            value={build.sound_card}
                        />
                    )}
                </div>

                {(build.next_maintenance_at) && (
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
