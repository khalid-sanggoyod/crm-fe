import React, { FC } from "react";
import DeleteModal from "../../components/Modals/DeleteModal";
import AddProductModal from "../../components/Modals/AddModal/index";

interface CollectionsProps { }

const TableSection: FC<CollectionsProps> = () => {

    const [openModal, setOpenModal] = React.useState<boolean>(false)
    const [openDeleteModal, setOpenDeleteModal] = React.useState<boolean>(false)

    const handleClose = () => {
        setOpenDeleteModal(false)
    }

    const handleCloseAdd = () => {
        setOpenModal(false)
      }

    return (
        <section className="h-auto">
            <AddProductModal
                show={openModal}
                handleClose={handleCloseAdd}
            />
            <DeleteModal
                show={openDeleteModal}
                setOpenDeleteModal={setOpenDeleteModal}
                handleClose={handleClose}
                label={'Customer'}
            />
            <div className="mx-96 my-20 space-y-40">
                <div id="category-table-container-1" className={`grid gap-5 mt-4`}>
                    <div id="list-of-category" className={`panel-v1`}>
                        <div className="inline-flex items-center w-full px-2 mb-4 text-left border-collapse">
                            <div className="w-full b-2 flex items-center">
                                <p className="font-bold text-2xl ml-2">Customer Lists</p>
                            </div>
                            <button onClick={() => setOpenModal(true)} className="flex items-center justify-center text-[15px] text-white px-6 py-1 rounded-lg bg-green-500">
                                Add
                            </button>
                        </div>
                        <div className="grid grid-cols-1 gap-20 mt-5">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="">
                                    <tr>
                                        <th scope="col" className="px-6 text-left">
                                            ID
                                        </th>
                                        <th scope="col" className="px-6 text-left">
                                            First Name
                                        </th>
                                        <th scope="col" className="px-6 text-left">
                                            Last Name
                                        </th>
                                        <th scope="col" className="px-6 text-left">
                                            Email
                                        </th>
                                        <th scope="col" className="px-6 text-left">
                                            Contact Number
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    <tr>
                                        <td id="team-name" className="px-6 py-2 whitespace-nowrap">
                                            <div className="flex justify-between items-center">
                                                <div className="text-sm cursor-pointer">
                                                    <span className="">1</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td id="team-name" className="px-6 py-2 whitespace-nowrap">
                                            <div className="flex justify-between items-center">
                                                <div className="text-sm cursor-pointer">
                                                    <span className="">John</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td id="team-name" className="px-6 py-2 whitespace-nowrap">
                                            <div className="flex justify-between items-center">
                                                <div className="text-sm cursor-pointer">
                                                    <span className="">Doe</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td id="team-name" className="px-6 py-2 whitespace-nowrap">
                                            <div className="flex justify-between items-center">
                                                <div className="text-sm cursor-pointer">
                                                    <span className="">john@test.com</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td id="team-name" className="px-6 py-2 whitespace-nowrap">
                                            <div className="flex justify-between items-center">
                                                <div className="text-sm cursor-pointer">
                                                    <span className="">141412415</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="flex justify-between w-40">
                                                <button className="flex items-center justify-center text-[15px] text-white px-4 rounded-lg bg-yellow-500">
                                                    Edit
                                                </button>
                                                <button onClick={() => setOpenDeleteModal(true)} className="flex items-center justify-center text-[15px] text-white px-4 rounded-lg bg-red-500">
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default TableSection;