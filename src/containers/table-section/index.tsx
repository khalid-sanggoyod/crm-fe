import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import DeleteModal from "../../components/Modals/DeleteModal";
import AddProductModal from "../../components/Modals/AddModal";
import AddModal from "../../components/Modals/AddModal";
import UpdateModal from "../../components/Modals/UpdateModal";
import { ButtonComponent } from "../../components/Buttons";

interface Customer {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    contact_number: string;
}

const TableSection: FC = () => {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [openAddModal, setOpenAddModal] = useState<boolean>(false);
    const [updateModal, setUpdateModal] = useState<boolean>(false);
    const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

    // Fetch customer data
    const fetchCustomers = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/customers");
            setCustomers(response.data.data);
        } catch (error) {
            console.error("Error fetching customers:", error);
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    const handleCloseDeleteModal = () => {
        setOpenDeleteModal(false);
        setSelectedCustomer(null);
    };

    const handleCloseAddModal = () => {
        setOpenAddModal(false);
        setSelectedCustomer(null);
    };

    const handleCloseUpdateModal = () => {
        setUpdateModal(false);
        setSelectedCustomer(null);
    };

    const handleEdit = (customer: Customer) => {
        setSelectedCustomer(customer);
        setUpdateModal(true);
    };

    const handleDelete = (customer: Customer) => {
        setSelectedCustomer(customer);
        setOpenDeleteModal(true);
    };

    const handleConfirm = async () => {
        if (selectedCustomer) {
            try {
                await axios.delete(`http://127.0.0.1:8000/api/customers/${selectedCustomer.id}`);
                setCustomers(customers.filter((customer) => customer.id !== selectedCustomer.id));
                setOpenDeleteModal(false);
                setSelectedCustomer(null);
            } catch (error) {
                console.error("Error deleting customer:", error);
            }
        }
    };

    return (
        <section className="h-auto px-4 md:px-8 lg:px-20 mt-20">
            <AddModal
                show={openAddModal}
                handleClose={handleCloseAddModal}
                setCustomers={setCustomers}
            />
            <UpdateModal
                show={updateModal}
                handleClose={handleCloseUpdateModal}
                setCustomers={setCustomers}
                selectedCustomer={selectedCustomer}
            />
            <DeleteModal
                show={openDeleteModal}
                setOpenDeleteModal={setOpenDeleteModal}
                handleClose={handleCloseDeleteModal}
                label={"Customer"}
                handleConfirm={handleConfirm}
            />

            <div className="space-y-8">
                <div className="panel-v1 bg-white p-4">
                    <div className="flex items-center justify-between mb-4">
                        <p className="font-bold text-xl md:text-2xl">Customer Lists</p>
                        <ButtonComponent
                            handleFunc={() => setOpenAddModal(true)}
                            name={"Add"}
                            className="bg-green-500 hover:bg-green-600 px-4 py-2"
                        />
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full border divide-y divide-gray-200 text-sm md:text-base">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="px-4 py-2 text-left font-semibold">ID</th>
                                    <th className="px-4 py-2 text-left font-semibold">First Name</th>
                                    <th className="px-4 py-2 text-left font-semibold">Last Name</th>
                                    <th className="px-4 py-2 text-left font-semibold">Email</th>
                                    <th className="px-4 py-2 text-left font-semibold">Contact Number</th>
                                    <th className="px-4 py-2 text-left font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {customers.length > 0 ? (
                                    customers.map((customer) => (
                                        <tr key={customer.id} className="hover:bg-gray-50 transition">
                                            <td className="px-4 py-2">{customer.id}</td>
                                            <td className="px-4 py-2">{customer.first_name}</td>
                                            <td className="px-4 py-2">{customer.last_name}</td>
                                            <td className="px-4 py-2">{customer.email}</td>
                                            <td className="px-4 py-2">{customer.contact_number}</td>
                                            <td className="px-4 py-2">
                                                <div className="flex space-x-2">
                                                    <ButtonComponent
                                                        handleFunc={() => handleEdit(customer)}
                                                        name={"Edit"}
                                                        className="bg-yellow-500 hover:bg-yellow-600"
                                                    />
                                                    <ButtonComponent
                                                        handleFunc={() => handleDelete(customer)}
                                                        name={"Delete"}
                                                        className="bg-red-500 hover:bg-red-600"
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td className="px-4 py-2 text-center" colSpan={6}>
                                            No customers found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TableSection;
