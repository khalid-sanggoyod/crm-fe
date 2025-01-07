import React from "react";

const AddModal: React.FC<any> = (props) => {
    return (
        <div className={`fixed inset-0 z-30 overflow-x-auto ${props.show ? '' : 'hidden'}`}>
            <div className="flex items-center justify-center p-4">
                <div className="fixed inset-0 transition-opacity">
                    <div onClick={props.handleCloseAndReset} className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <div
                    className="inline-block w-1/4 h-auto overflow-hidden transition-all transform bg-white rounded-lg shadow-xl"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-headline"
                >
                    <form onSubmit={props.handleSubmit} className="h-full bg-white">
                        <div className="flex items-center p-4">
                            <div className="w-3/4">
                                <div className={`flex items-center`}>
                                    <span className="font-bold text-md">{props.updateData ? `Update ${props.label}` : `Add New ${props.label}`}</span>
                                </div>
                            </div>
                            <div className="w-1/4 text-right">
                                <button
                                    onClick={() => props.handleCloseAndReset()}
                                    className="inline-flex items-center justify-center p-2 px-3 btn btn-text"
                                    type="button"
                                >
                                    <svg
                                        className="inline-block w-6 h-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        {props.children}
                        <div className="inset-x-0 bottom-0 block p-8 bg-white">
                            <div className="w-3/4 mx-auto">
                                <button
                                    type="submit"
                                    className={`bg-white border flex justify-center w-full h-full px-4 py-2 text-sm hover:bg-gray-100 border-gray-300 rounded-md shadow-sm cursor-pointer group`}
                                >
                                    {props.updateData ? `Update ${props.label}` : `Add ${props.label}`}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddModal;