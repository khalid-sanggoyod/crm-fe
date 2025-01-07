import React from "react";
import AddModal from "./AddModal";

const AddProductModal: React.FC<{
    show: boolean;
    handleClose: () => void;
}> = ({ show, handleClose }) => {
    const [inputObject, setInputObject] = React.useState<{
        firstName: string;
        lastName: string;
        email: string;
        contactNumber: string;
    }>({
        firstName: '',
        lastName: '',
        email: '',
        contactNumber: '',
    })

    const handleCloseAndReset = () => {
        setInputObject({
            firstName: '',
            lastName: '',
            email: '',
            contactNumber: '',
        })
        handleClose()
    }

    return (
        <AddModal
            show={show}
            handleCloseAndReset={handleCloseAndReset}
            label={'Customer'}
        >
            <div className="block h-full p-4 my-auto">
                <div className="space-y-4">
                    <div className="bg-white">
                        <div className="w-full">
                            <label className="block text-sm font-medium text-gray-700">
                                First Name
                            </label>
                            <input
                                type="text"
                                name="firstName"
                                id="firstName"
                                required
                                placeholder="First Name"
                                autoCapitalize="words"
                                autoComplete="given-name"
                                className="block w-full px-4 py-2 mt-1 text-sm border rounded-md shadow-sm"
                                value={inputObject?.firstName || ""}
                            />
                        </div>
                    </div>
                    <div className="bg-white">
                        <div className="w-full">
                            <label className="block text-sm font-medium text-gray-700">
                                Last Name
                            </label>
                            <input
                                type="text"
                                name="lastName"
                                id="lastName"
                                required
                                placeholder="Last Name"
                                autoCapitalize="words"
                                autoComplete="given-name"
                                className="block w-full px-4 py-2 mt-1 text-sm border rounded-md shadow-sm"
                                value={inputObject?.lastName || ""}
                            />
                        </div>
                    </div>
                    <div className="bg-white">
                        <div className="w-full">
                            <label className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="text"
                                name="email"
                                id="email"
                                required
                                placeholder="Email"
                                autoCapitalize="words"
                                autoComplete="given-name"
                                className="block w-full px-4 py-2 mt-1 text-sm border rounded-md shadow-sm"
                                value={inputObject?.email || ""}
                            />
                        </div>
                    </div>
                    <div className="bg-white">
                        <div className="w-full">
                            <label className="block text-sm font-medium text-gray-700">
                                Contact Number
                            </label>
                            <input
                                type="text"
                                name="contactNumber"
                                id="contactNumber"
                                required
                                placeholder="Contact Number"
                                autoCapitalize="words"
                                autoComplete="given-name"
                                className="block w-full px-4 py-2 mt-1 text-sm border rounded-md shadow-sm"
                                value={inputObject?.contactNumber || ""}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AddModal>
    )
}

export default React.memo(AddProductModal)