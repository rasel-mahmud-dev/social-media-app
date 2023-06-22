import React, {useEffect, useRef} from 'react';


const InfiniteScroll = ({onLoadMore, pageNumber, children}) => {

    const pageNumberRef = useRef(pageNumber);

    useEffect(() => {
        pageNumberRef.current = pageNumber;
    }, [pageNumber]);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll)
        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [handleScroll, onLoadMore])

    function handleScroll() {
        if (
            window.innerHeight + document.documentElement.scrollTop ===
            document.documentElement.offsetHeight
        ) {
            onLoadMore({
                pageNumber: pageNumberRef.current + 1
            })
        }
    }

    return (
        <div>
            {children}
        </div>
    );
};

export default InfiniteScroll;