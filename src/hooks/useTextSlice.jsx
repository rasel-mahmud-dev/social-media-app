import React, {useState} from "react";

function useTextSlice(text, rules) {

    const [viewStep, setViewStep] = useState(1)

    function len(viewStep) {
        return rules[viewStep]
        // if (viewStep === 1) return 100
        // if (viewStep === 2) return 800
        // if (viewStep === 3) return 1100
        // if (viewStep === 4) return undefined
    }

    function handleShowMore() {
        setViewStep(prevState => {
            if (prevState !== lastStepNo()) {
                prevState++
                return prevState
            } else {
                return 1
            }
        })
    }

    function lastStepNo() {
        const t = Object.entries(rules)
        let lastEl = t[t.length - 1]
        return Number(lastEl[0])
    }

    function renderContent() {
        return (
            <>
                {text.substring(0, len(viewStep))}
                {text?.length > rules[1] ? (
                    <div className="text-accent text-xs font-semibold cursor-pointer"
                         onClick={handleShowMore}>{viewStep === lastStepNo() ? "show less" : "read more"}</div>
                ) : null}

            </>
        )
    }

    return {step: viewStep, showMore: handleShowMore, render: renderContent}

}

export default useTextSlice