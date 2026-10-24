import { Link } from 'react-router';
import { EyeIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

import {
    useDestroyBuildByIdMutation,
    useGetAllBuildsQuery,
} from '../../api/buildsApi';
import { useGetAllBuildTypesQuery } from '../../api/buildTypesApi';
import type { BuildWithMappedType } from '../../types/build';

import LoadingSpinner from '../LoadingSpinner';
import AlertMessage from '../AlertMessage';
import HealthStatus from '../HealthStatus';

export default function BuildList() {
    const {
        data: builds = [],
        isLoading: isLoadingBuilds,
        error: errorBuilds,
    } = useGetAllBuildsQuery(undefined, {
        refetchOnMountOrArgChange: true,
    });

    const {
        data: buildTypes = [],
        isLoading: isLoadingBuildTypes,
        error: errorBuildTypes,
    } = useGetAllBuildTypesQuery();

    const [destroyById] = useDestroyBuildByIdMutation();

    const handleRemove = async (id: number) => {
        await destroyById(id).unwrap();
    };

    const buildsWithTypes: BuildWithMappedType[] = builds.map((build) => {
        const buildType = buildTypes.find(
            (bt) => bt.id === build.build_type_id,
        );

        return {
            ...build,
            build_type: buildType?.name ?? null,
        };
    });

    if (isLoadingBuilds || isLoadingBuildTypes) {
        return <LoadingSpinner />;
    }

    if (errorBuilds || errorBuildTypes) {
        return (
            <AlertMessage type="error">
                <span>Loading Builds</span>
            </AlertMessage>
        );
    }

    if (buildsWithTypes.length === 0) {
        return <p>No builds</p>;
    }

    return (
        <div className="overflow-x-auto">
            <table className="table table-zebra">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Type</th>
                        <th>CPU</th>
                        <th>GPU</th>
                        <th>RAM</th>
                        <th>PSU</th>
                        <th>OS</th>
                        <th>Wartung</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {buildsWithTypes.map((build) => (
                        <tr key={build.id}>
                            <td>{build.id}</td>
                            <td>{build.name}</td>
                            <td>{build.build_type}</td>
                            <td>
                                <span>{build.cpu_name}</span>
                                <HealthStatus
                                    type="bullets"
                                    since={build.cpu_service_at}
                                />
                            </td>
                            <td>
                                <span>{build.gpu_name}</span>
                                <HealthStatus
                                    type="bullets"
                                    since={build.gpu_service_at}
                                />
                            </td>
                            <td>
                                <span>{build.ram_name}</span>
                                <HealthStatus
                                    type="bullets"
                                    since={build.ram_service_at}
                                />
                            </td>
                            <td>
                                <span>{build.psu_name}</span>
                                <HealthStatus
                                    type="bullets"
                                    since={build.psu_service_at}
                                />
                            </td>
                            <td>
                                <span>{build.os_name}</span>
                                <HealthStatus
                                    type="bullets"
                                    since={build.os_service_at}
                                />
                            </td>
                            <td>{build.next_maintenance_at ?? '-'}</td>
                            <td className="flex gap-2">
                                <Link
                                    to={`/builds/${build.id}`}
                                    className="btn btn-soft btn-info"
                                >
                                    <EyeIcon className="size-5" /> Show
                                </Link>

                                <Link
                                    to={`/builds/${build.id}/edit`}
                                    className="btn btn-soft btn-warning"
                                >
                                    <PencilIcon className="size-5" /> Edit
                                </Link>

                                <button
                                    onClick={() => handleRemove(build.id)}
                                    className="btn btn-soft btn-error"
                                >
                                    <TrashIcon className="size-5" /> Remove
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
