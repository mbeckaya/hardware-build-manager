import { useParams } from 'react-router';

import Headline from '../../components/Headline';
import BuildDetail from '../../components/build/BuildDetail';

export default function BuildDetailPage() {
    const { id } = useParams();

    if (!id) return;

    return (
        <>
            <Headline>Build Detail</Headline>

            <BuildDetail id={id} />
        </>
    );
}
