import React from "react";

const Modal: React.FC<any> = (props) => {
    return (
        <div className={`relative z-10 ${props.show ? '' : 'hidden'}`} aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <div className="fixed inset-0 z-10 overflow-y-auto">
                <div
                    onClick={props.handleCloseAndReset}
                    className="absolute inset-0 bg-gray-500 opacity-75">
                </div>
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        <form onSubmit={props.handleSubmit} className="h-full bg-white">
                            <div className="flex items-center p-4">
                                <div className="w-3/4">
                                    <div className={`flex items-center`}>
                                        <span className="font-bold text-md">{props.label}</span>
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
                                        {props.label}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal;