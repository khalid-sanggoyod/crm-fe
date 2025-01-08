import React, { FC } from "react"

export const InputComponent: FC<any> = (props) => {
    return (
        <React.Fragment>
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    {props.label} {props.notRequired ? null : <span className="text-red-400">*</span>}
                </label>
                <input
                    type="text"
                    id="first_name"
                    placeholder="First Name"
                    className={`block w-full px-4 py-2 mt-1 text-sm border rounded-md shadow-sm ${props.errors && "border-red-400"}`}
                    {...props.register}
                />
                {props.errors && (
                    <span className="text-[12px] text-red-400">{props.errors}</span>
                )}
            </div>
        </React.Fragment>
    )
}