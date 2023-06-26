import {useState} from 'react';
import CollapseItem from "./CollapseItem.jsx";

import "./style.scss"


const Collapse = (props) => {

    const {children, className = "", initialExpand = []} = props

    const [activeItems, setActiveItems] = useState(initialExpand)

    function handleToggle(index) {
        if (activeItems.includes(index)) {
            setActiveItems(activeItems.filter(idx => idx !== index))
        } else {
            setActiveItems([...activeItems, index])
        }
    }


    return (
        <div className={className}>
            {(
                children && Array.isArray(children)) ? children.map((item, index) => (
                <CollapseItem onToggle={() => handleToggle(index)} isActive={activeItems.includes(index)}
                              key={index} {...item.props}></CollapseItem>

            )) : children && typeof children === "object" && (
                <CollapseItem onToggle={() => handleToggle(0)} isActive={activeItems.includes(0)}
                              key={0} {...(children).props}>

                </CollapseItem>
            )}
        </div>
    );
};

Collapse.Item = CollapseItem

export default Collapse;