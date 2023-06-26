import clsx from "clsx";
import "./style.scss"


const CollapseItem  = (props) => {

    const {icon, prefixIcon, onClick, onToggle, isActive, label, children, className} = props

    const classes = clsx(
        className,
        typeof label !== "function" && "collapse-item",
        !!isActive && "collapse-item-active"
    )

    function handleToggle(){
        if(children){
            onToggle && onToggle()
        }

        onClick && onClick()
    }

    return (
        <div>
            <div onClick={handleToggle} className={classes}>
                <div className="flex items-center gap-x-4">
                    {prefixIcon && prefixIcon}
                    {typeof label === "function" ? label(!!isActive) : label}
                </div>
                {children && ( icon ? icon(!!isActive) : null)}
            </div>

            {isActive && (
                children
            )}

        </div>
    );
};

export default CollapseItem;