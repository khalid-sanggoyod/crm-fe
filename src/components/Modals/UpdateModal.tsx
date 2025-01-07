import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Modal from ".";

interface Customer {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    contact_number: string;
}

interface UpdateModalProps {
    show: boolean;
    handleClose: () => void;
    setCustomers: React.Dispatch<React.SetStateAction<Customer[]>>;
    selectedCustomer: Customer | null;
}

const UpdateModal: React.FC<UpdateModalProps> = ({
    show,
    handleClose,
    setCustomers,
    selectedCustomer,
}) => {
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<Customer>();

    // Prefill form with selected customer data
    useEffect(() => {
        if (selectedCustomer) {
            setValue("first_name", selectedCustomer.first_name);
            setValue("last_name", selectedCustomer.last_name);
            setValue("email", selectedCustomer.email);
            setValue("contact_number", selectedCustomer.contact_number);
        }
    }, [selectedCustomer, setValue]);

    const handleCloseAndReset = () => {
        handleClose();
        reset();
    };

    const onSubmit = async (data: Customer) => {
        if (!selectedCustomer) return;
        try {
            const response = await axios.put(`http://127.0.0.1:8000/api/customers/${selectedCustomer.id}`, data);

            if (response.status === 201) {
                setCustomers((prev) =>
                    prev.map((customer) =>
                        customer.id === selectedCustomer.id ? response.data.data : customer
                    )
                );
                handleCloseAndReset();
                alert("Customer updated successfully!");
            }
        } catch (error) {
            console.error("Error updating customer:", error);
            alert("Failed to update customer. Please try again.");
        }
    };

    if (!show) return null;

    return (
        <Modal
            show={show}
            handleCloseAndReset={handleCloseAndReset}
            label="Update Customer"
            handleSubmit={handleSubmit(onSubmit)}
        >
            <div className="block h-full p-4 my-auto space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        First Name <span className="text-red-400">*</span>
                    </label>
                    <input
                        type="text"
                        id="first_name"
                        placeholder="First Name"
                        className={`block w-full px-4 py-2 mt-1 text-sm border rounded-md shadow-sm ${errors.first_name && "border-red-400"}`}
                        {...register("first_name", {
                            required: "First name is required",
                        })}
                    />
                    {errors.first_name && (
                        <span className="text-[12px] text-red-400">{errors.first_name.message}</span>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Last Name <span className="text-red-400">*</span>
                    </label>
                    <input
                        type="text"
                        id="last_name"
                        placeholder="Last Name"
                        className={`block w-full px-4 py-2 mt-1 text-sm border rounded-md shadow-sm ${errors.last_name && "border-red-400"}`}
                        {...register("last_name", {
                            required: "Last name is required",
                        })}
                    />
                    {errors.last_name && (
                        <span className="text-[12px] text-red-400">{errors.last_name.message}</span>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Email <span className="text-red-400">*</span>
                    </label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Email"
                        className={`block w-full px-4 py-2 mt-1 text-sm border rounded-md shadow-sm ${errors.email && "border-red-400"}`}
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[^@]+@[^@]+\.[^@]+$/,
                                message: "Invalid email address",
                            },
                        })}
                    />
                    {errors.email && (
                        <span className="text-[12px] text-red-400">{errors.email.message}</span>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Contact Number <span className="text-red-400">*</span>
                    </label>
                    <input
                        type="text"
                        id="contact_number"
                        placeholder="Contact Number"
                        className={`block w-full px-4 py-2 mt-1 text-sm border rounded-md shadow-sm ${errors.contact_number && "border-red-400"}`}
                        {...register("contact_number", {
                            required: "Contact number is required",
                        })}
                    />
                    {errors.contact_number && (
                        <span className="text-[12px] text-red-400">{errors.contact_number.message}</span>
                    )}
                </div>
            </div>
        </Modal>
    );
};

export default React.memo(UpdateModal);
