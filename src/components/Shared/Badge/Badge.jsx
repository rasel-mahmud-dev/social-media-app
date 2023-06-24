import React from 'react';

const Badge = ({count = 0}) => {
    return count ? (
        <div
            className="flex min-w-[20px] items-center justify-center text-[10px] font-medium absolute -top-2 color_h1 bg-red-500 -right-1 h-5 p-1 rounded-full">{count}</div>

    ) : null
};

export default Badge;