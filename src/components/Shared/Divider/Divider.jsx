import React from 'react';


const Divider = ({text, barClass="", textClass=""}) => {
    return (
        <div>
           <div className="flex items-center">
                <div className={`w-full h-px bg-dark-100/20 rounded-full ${barClass}`}></div>
               {text && <p className={`my-8 text-center text-neutral-600 whitespace-nowrap px-2 ${textClass}`}>{text}</p> }
               {text && <div className={`w-full h-px bg-dark-100/20 rounded-full ${barClass}`}></div> }
            </div>
        </div>
    );
};

export default Divider;