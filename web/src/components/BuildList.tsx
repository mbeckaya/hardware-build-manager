import { useGetAllBuildsQuery } from '../api/buildsApi';

import LoadingSpinner from './LoadingSpinner';
import AlertMessage from './AlertMessage';

export default function BuildList() {
    const {
        data: builds = [],
        isLoading,
        error,
    } = useGetAllBuildsQuery(undefined, {
        refetchOnMountOrArgChange: true,
    });

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
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
