import React, { FC } from "react";

export const ButtonComponent: FC<any> = (props) => {
    return (
        <React.Fragment>
            <button
                onClick={props.handleFunc}
                className={`${props.className} text-white px-3 py-1 rounded-lg transition`}
                >
                {props.name}
            </button>
        </React.Fragment>
    )
}