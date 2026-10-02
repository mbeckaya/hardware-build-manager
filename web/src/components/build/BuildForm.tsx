import { useState } from 'react';

import type { Build, BuildFormErrors } from '../../types/build';
import { buildSchema } from '../../schemas/buildSchema';

import AlertMessage from '../AlertMessage';
import { useGetAllBuildTypesQuery } from '../../api/buildTypesApi';

type Props = {
    data: Build;
    onSubmitSuccess: (build: Build) => void;
};

export default function BuildForm({ data, onSubmitSuccess }: Props) {
    const [formData, setFormData] = useState<Build>(data);
    const [formErrors, setFormErrors] = useState<BuildFormErrors>({});
    const { data: buildTypes = [] } = useGetAllBuildTypesQuery();

    const handleChange = (
        event: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >,
    ) => {
        const { name, value } = event.target;

        setFormData((prev) => ({
            ...prev,
            [name]:
                name === 'id' || name === 'build_type_id'
                    ? Number(value)
                    : value,
        }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const result = buildSchema.safeParse(formData);

        if (!result.success) {
            const fieldErrors = result.error.flatten().fieldErrors;

            setFormErrors({
                name: fieldErrors.name?.[0],
                build_type_id: fieldErrors.build_type_id?.[0],
                cpu: fieldErrors.cpu?.[0],
                gpu: fieldErrors.gpu?.[0],
                ram: fieldErrors.ram?.[0],
                storage: fieldErrors.storage?.[0],
                psu: fieldErrors.psu?.[0],
                mainboard: fieldErrors.mainboard?.[0],
                cpu_cooler: fieldErrors.cpu_cooler?.[0],
                case: fieldErrors.case?.[0],
                os: fieldErrors.os?.[0],
                sound_card: fieldErrors.sound_card?.[0],
                warranty: fieldErrors.warranty?.[0],
                last_maintenance_at: fieldErrors.last_maintenance_at?.[0],
                last_maintenance_comment:
                    fieldErrors.last_maintenance_comment?.[0],
                next_maintenance_at: fieldErrors.next_maintenance_at?.[0],
                next_maintenance_comment:
                    fieldErrors.next_maintenance_comment?.[0],
            });

            return;
        }

        setFormErrors({});
        onSubmitSuccess(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 p-6">
            <div className="space-y-2">
                <label htmlFor="name" className="block font-medium">
                    Name*:
                </label>

                <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                />

                {formErrors?.name && (
                    <div className="pt-1">
                        <AlertMessage type="error">
                            <p>{formErrors.name}</p>
                        </AlertMessage>
                    </div>
                )}
            </div>

            <div className="space-y-2">
                <label htmlFor="build_type_id" className="block font-medium">
                    Build-Typ*:
                </label>

                <select
                    id="build_type_id"
                    name="build_type_id"
                    value={formData.build_type_id}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                >
                    <option value="" disabled>
                        -- Please choose --
                    </option>

                    {buildTypes.map((bt) => (
                        <option key={bt.id} value={bt.id}>
                            {bt.name}
                        </option>
                    ))}
                </select>

                {formErrors?.build_type_id && (
                    <div className="pt-1">
                        <AlertMessage type="error">
                            <p>{formErrors.build_type_id}</p>
                        </AlertMessage>
                    </div>
                )}
            </div>

            <div className="divider">Hardware</div>

            <div className="space-y-2">
                <label htmlFor="cpu" className="block font-medium">
                    CPU*:
                </label>

                <input
                    id="cpu"
                    name="cpu"
                    type="text"
                    value={formData.cpu}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                />

                {formErrors?.cpu && (
                    <div className="pt-1">
                        <AlertMessage type="error">
                            <p>{formErrors.cpu}</p>
                        </AlertMessage>
                    </div>
                )}
            </div>

            <div className="space-y-2">
                <label htmlFor="gpu" className="block font-medium">
                    GPU*:
                </label>

                <input
                    id="gpu"
                    name="gpu"
                    type="text"
                    value={formData.gpu}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                />

                {formErrors?.gpu && (
                    <div className="pt-1">
                        <AlertMessage type="error">
                            <p>{formErrors.gpu}</p>
                        </AlertMessage>
                    </div>
                )}
            </div>

            <div className="space-y-2">
                <label htmlFor="ram" className="block font-medium">
                    RAM*:
                </label>

                <input
                    id="ram"
                    name="ram"
                    type="text"
                    value={formData.ram}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                />

                {formErrors?.ram && (
                    <div className="pt-1">
                        <AlertMessage type="error">
                            <p>{formErrors.ram}</p>
                        </AlertMessage>
                    </div>
                )}
            </div>

            <div className="space-y-2">
                <label htmlFor="storage" className="block font-medium">
                    Storage*:
                </label>

                <input
                    id="storage"
                    name="storage"
                    type="text"
                    value={formData.storage}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                />

                {formErrors?.storage && (
                    <div className="pt-1">
                        <AlertMessage type="error">
                            <p>{formErrors.storage}</p>
                        </AlertMessage>
                    </div>
                )}
            </div>

            <div className="space-y-2">
                <label htmlFor="psu" className="block font-medium">
                    Power Supply*:
                </label>

                <input
                    id="psu"
                    name="psu"
                    type="text"
                    value={formData.psu}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                />

                {formErrors?.psu && (
                    <div className="pt-1">
                        <AlertMessage type="error">
                            <p>{formErrors.psu}</p>
                        </AlertMessage>
                    </div>
                )}
            </div>

            <div className="space-y-2">
                <label htmlFor="mainboard" className="block font-medium">
                    Mainboard*:
                </label>

                <input
                    id="mainboard"
                    name="mainboard"
                    type="text"
                    value={formData.mainboard}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                />

                {formErrors?.mainboard && (
                    <div className="pt-1">
                        <AlertMessage type="error">
                            <p>{formErrors.mainboard}</p>
                        </AlertMessage>
                    </div>
                )}
            </div>

            <div className="space-y-2">
                <label htmlFor="cpu_cooler" className="block font-medium">
                    CPU Cooler*:
                </label>

                <input
                    id="cpu_cooler"
                    name="cpu_cooler"
                    type="text"
                    value={formData.cpu_cooler}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                />

                {formErrors?.cpu_cooler && (
                    <div className="pt-1">
                        <AlertMessage type="error">
                            <p>{formErrors.cpu_cooler}</p>
                        </AlertMessage>
                    </div>
                )}
            </div>

            <div className="space-y-2">
                <label htmlFor="case" className="block font-medium">
                    Case*:
                </label>

                <input
                    id="case"
                    name="case"
                    type="text"
                    value={formData.case}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                />

                {formErrors?.case && (
                    <div className="pt-1">
                        <AlertMessage type="error">
                            <p>{formErrors.case}</p>
                        </AlertMessage>
                    </div>
                )}
            </div>

            <div className="space-y-2">
                <label htmlFor="os" className="block font-medium">
                    Operating System*:
                </label>

                <input
                    id="os"
                    name="os"
                    type="text"
                    value={formData.os}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                />

                {formErrors?.os && (
                    <div className="pt-1">
                        <AlertMessage type="error">
                            <p>{formErrors.os}</p>
                        </AlertMessage>
                    </div>
                )}
            </div>

            <div className="space-y-2">
                <label htmlFor="sound_card" className="block font-medium">
                    Sound Card
                </label>

                <input
                    id="sound_card"
                    name="sound_card"
                    type="text"
                    value={formData.sound_card ?? ''}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                />

                {formErrors?.sound_card && (
                    <div className="pt-1">
                        <AlertMessage type="error">
                            <p>{formErrors.sound_card}</p>
                        </AlertMessage>
                    </div>
                )}
            </div>

            <div className="divider">Warranty & Maintenance</div>

            <div className="space-y-2">
                <label htmlFor="warranty" className="block font-medium">
                    Warranty
                </label>

                <input
                    id="warranty"
                    name="warranty"
                    type="text"
                    value={formData.warranty ?? ''}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                />

                {formErrors?.warranty && (
                    <div className="pt-1">
                        <AlertMessage type="error">
                            <p>{formErrors.warranty}</p>
                        </AlertMessage>
                    </div>
                )}
            </div>

            <div className="space-y-2">
                <label
                    htmlFor="last_maintenance_at"
                    className="block font-medium"
                >
                    Last Maintenance
                </label>

                <input
                    id="last_maintenance_at"
                    name="last_maintenance_at"
                    type="date"
                    value={formData.last_maintenance_at ?? ''}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                />

                {formErrors?.last_maintenance_at && (
                    <div className="pt-1">
                        <AlertMessage type="error">
                            <p>{formErrors.last_maintenance_at}</p>
                        </AlertMessage>
                    </div>
                )}
            </div>

            <div className="space-y-2">
                <label
                    htmlFor="last_maintenance_comment"
                    className="block font-medium"
                >
                    Last Maintenance Comment
                </label>

                <textarea
                    id="last_maintenance_comment"
                    name="last_maintenance_comment"
                    value={formData.last_maintenance_comment ?? ''}
                    onChange={handleChange}
                    className="textarea textarea-bordered w-full"
                    rows={3}
                />

                {formErrors?.last_maintenance_comment && (
                    <div className="pt-1">
                        <AlertMessage type="error">
                            <p>{formErrors.last_maintenance_comment}</p>
                        </AlertMessage>
                    </div>
                )}
            </div>

            <div className="space-y-2">
                <label
                    htmlFor="next_maintenance_at"
                    className="block font-medium"
                >
                    Next Maintenance
                </label>

                <input
                    id="next_maintenance_at"
                    name="next_maintenance_at"
                    type="date"
                    value={formData.next_maintenance_at ?? ''}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                />

                {formErrors?.next_maintenance_at && (
                    <div className="pt-1">
                        <AlertMessage type="error">
                            <p>{formErrors.next_maintenance_at}</p>
                        </AlertMessage>
                    </div>
                )}
            </div>

            <div className="space-y-2">
                <label
                    htmlFor="next_maintenance_comment"
                    className="block font-medium"
                >
                    Next Maintenance Comment
                </label>

                <textarea
                    id="next_maintenance_comment"
                    name="next_maintenance_comment"
                    value={formData.next_maintenance_comment ?? ''}
                    onChange={handleChange}
                    className="textarea textarea-bordered w-full"
                    rows={3}
                />

                {formErrors?.next_maintenance_comment && (
                    <div className="pt-1">
                        <AlertMessage type="error">
                            <p>{formErrors.next_maintenance_comment}</p>
                        </AlertMessage>
                    </div>
                )}
            </div>

            <div className="flex justify-end pt-4">
                <button type="submit" className="btn btn-primary">
                    Save Build
                </button>
            </div>
        </form>
    );
}
