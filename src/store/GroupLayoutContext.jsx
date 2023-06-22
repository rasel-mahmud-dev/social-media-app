import {createContext} from "react";
import useCustomReducer from "src/hooks/useReducer.jsx";

export const GroupLayoutContext = createContext({})


function GroupLayoutProvider(HOC) {

   return function (props){
       const [state, setState] = useCustomReducer({
           name: "",
           groupCoverPhoto: null,
           createNewGroup: false
       })

       return (
           <GroupLayoutContext.Provider value={[state, setState]}>
               <HOC />
           </GroupLayoutContext.Provider>
       )
   }
}

export default GroupLayoutProvider