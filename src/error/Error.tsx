import React from 'react';

interface IError {
    errorText: string
}

const Error = ({errorText}: IError) => {
    return (
        <div style={{color: 'red', position: 'absolute'}}>
            {errorText}
        </div>
    );
};

export default Error;