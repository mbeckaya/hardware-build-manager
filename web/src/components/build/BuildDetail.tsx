import { useGetBuildByIdQuery } from '../../api/buildsApi';
import { useGetAllBuildTypesQuery } from '../../api/buildTypesApi';
import type { BuildWithMappedType } from '../../types/build';

import AlertMessage from '../AlertMessage';
import LoadingSpinner from '../LoadingSpinner';
import BuildCard from './BuildCard';

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

    return <BuildCard build={buildWithType} />;
}
