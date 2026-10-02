import { Link } from 'react-router';
import { EyeIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

import {
    useDestroyBuildByIdMutation,
    useGetAllBuildsQuery,
} from '../../api/buildsApi';

import LoadingSpinner from '../LoadingSpinner';
import AlertMessage from '../AlertMessage';

export default function BuildList() {
    const {
        data: builds = [],
        isLoading,
        error,
    } = useGetAllBuildsQuery(undefined, {
        refetchOnMountOrArgChange: true,
    });

    const [destroyById] = useDestroyBuildByIdMutation();

    const handleRemove = async (id: number) => {
        await destroyById(id).unwrap();
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return (
            <AlertMessage type="error">
                <span>Loading Builds</span>
            </AlertMessage>
        );
    }

    if (builds.length === 0) {
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
                        <th>Storage</th>
                        <th>OS</th>
                        <th>Wartung</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {builds.map((build) => (
                        <tr key={build.id}>
                            <td>{build.id}</td>
                            <td>{build.name}</td>
                            <td>{build.build_type_id}</td>
                            <td>{build.cpu}</td>
                            <td>{build.gpu}</td>
                            <td>{build.ram}</td>
                            <td>{build.storage}</td>
                            <td>{build.os}</td>
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
