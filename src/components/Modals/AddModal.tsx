import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Modal from ".";

const AddModal: React.FC<{
    show: boolean;
    handleClose: () => void;
    setCustomers: any
}> = ({ show, handleClose, setCustomers }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const handleCloseAndReset = () => {
        handleClose()
        reset()
    }

    const onSubmit = async (data: any) => {
        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/customers",
                data
            );

            if (response.status === 201) {
                setCustomers((prev: any) => [...prev, response.data.data]);
                handleClose()
                reset()
                alert("Form submitted successfully!");
            }
        } catch (error: any) {
            console.log("Error submitting form: ", error);
            alert("Error submitting form!")
        }
    }

    return (
        <Modal
            show={show}
            handleCloseAndReset={handleCloseAndReset}
            label={'Customer'}
            handleSubmit={handleSubmit(onSubmit)}
        >
            <div className="block h-full p-4 my-auto">
                <div className="space-y-4">
                    <div className="bg-white">
                        <div className="w-full">
                            <label className="block text-sm font-medium text-gray-700">
                                First Name <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="text"
                                id="first_name"
                                placeholder="First Name"
                                className={`block w-full px-4 py-2 mt-1 text-sm border rounded-md shadow-sm ${errors.first_name && 'border-red-400'}`}
                                {...register("first_name", {
                                    required: "First name is required"
                                })}
                            />
                            {
                                errors.first_name && <span className="text-[12px] text-red-400">First name is required</span>
                            }
                        </div>
                    </div>
                    <div className="bg-white">
                        <div className="w-full">
                            <label className="block text-sm font-medium text-gray-700">
                                Last Name <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="text"
                                id="last_name"
                                placeholder="Last Name"
                                className={`block w-full px-4 py-2 mt-1 text-sm border rounded-md shadow-sm ${errors.last_name && 'border-red-400'}`}
                                {...register("last_name", {
                                    required: "Last name is required"
                                })}
                            />
                            {
                                errors.last_name && <span className="text-[12px] text-red-400">Last name is required</span>
                            }
                        </div>
                    </div>
                    <div className="bg-white">
                        <div className="w-full">
                            <label className="block text-sm font-medium text-gray-700">
                                Email <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="text"
                                id="email"
                                placeholder="Email"
                                className={`block w-full px-4 py-2 mt-1 text-sm border rounded-md shadow-sm ${errors.email && 'border-red-400'}`}
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[^@]+@[^@]+\.[^@]+$/,
                                        message: "Invalid email address",
                                    },
                                })}
                            />
                            {errors.email && <span className="text-[12px] text-red-400">Email is required</span>}
                        </div>
                    </div>
                    <div className="bg-white">
                        <div className="w-full">
                            <label className="block text-sm font-medium text-gray-700">
                                Contact Number <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="text"
                                id="contact_number"
                                placeholder="Contact Number"
                                className={`block w-full px-4 py-2 mt-1 text-sm border rounded-md shadow-sm ${errors.contact_number && 'border-red-400'}`}
                                {...register("contact_number", {
                                    required: "Contact number is required"
                                })}
                            />
                            {errors.contact_number && <span className="text-[12px] text-red-400">Contact number is required</span>}
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default React.memo(AddModal)