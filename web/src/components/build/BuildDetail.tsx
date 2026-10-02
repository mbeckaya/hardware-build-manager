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
        <div className="card bg-base-100 w-full max-w-4xl shadow-xl mb-4">
            <div className="card-body gap-6">
                <div className="flex flex-wrap justify-between items-center gap-2">
                    <ul>
                        <li>Name: {build.name}</li>
                        <li>ID: {build.id}</li>
                        <li>Type: {build.build_type_id}</li>
                        <li>Created on: {build.created_at}</li>
                        <li>
                            CPU: {build.cpu}{' '}
                            {build.cpu_cooler && `(${build.cpu_cooler})`}
                        </li>
                        <li>GPU: {build.gpu}</li>
                        <li>RAM: {build.ram}</li>
                        <li>Mainboard: {build.mainboard}</li>
                        <li>Storage: {build.storage}</li>
                        <li>Power Supply: {build.psu}</li>
                        <li>Case: {build.case}</li>
                        {build.sound_card && (
                            <li>Sound Card: {build.sound_card}</li>
                        )}
                        <li>Operating System: {build.os}</li>
                        {build.next_maintenance_at && (
                            <li>
                                Next Maintenance: {build.next_maintenance_at}
                            </li>
                        )}
                        {build.warranty && (
                            <li>Warranty Until: {build.warranty}</li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}
