import React, { useState} from 'react';

import "./multi-input.scss"

// interface Props {
//     option: { id: number }[]
//     name: string
//     placeholder?: string
//     onChange: (name: string, value: number[]) => void
// }

const MultiSelectInput = ({name, options = [], keyField="id", nameField="name", renderSelectedItem, onChange, placeholder, ...attr}) => {

    const [selectedItem, setSelectedItem] = useState([])


    function updateItem(value) {
        if(value === "") return;
        let updatedSelectedItem = [...selectedItem]
        let existIndex
        let elm = options.find(opt=>opt[keyField] === value)
        if(typeof elm === "object"){
            existIndex = updatedSelectedItem.findIndex(item=>item[keyField] === value)
        }else {
            existIndex = updatedSelectedItem.indexOf(value)
        }
        if (existIndex === -1) {
            let elm = options.find(opt=>opt[keyField] === value)
            updatedSelectedItem.push(elm)
        } else {
            updatedSelectedItem.splice(existIndex, 1)
        }


        // pass value to parent component
        onChange && onChange({target: {name, value: updatedSelectedItem}})

        // update local state
        setSelectedItem(updatedSelectedItem)
    }

    function handleSelectItem(e) {
        let value = e.target.value
        updateItem(value)
        // e.target.value = ""
    }

    function removeItem(item) {
        updateItem(item)
    }


    return (
        <div className="multiselect">
            <div className="selected_items">
                {selectedItem?.map((item) => (
                    renderSelectedItem && renderSelectedItem(item, keyField, nameField, removeItem)
                ))}
            </div>
            <select onChange={handleSelectItem} name={name}  {...attr}>
                <option value={""}>{placeholder}</option>
                {options.map((opt) => (
                    <option key={opt[keyField]} value={opt[keyField]}>{opt[nameField]}</option>
                ))}
            </select>
        </div>
    );
};

export default MultiSelectInput;