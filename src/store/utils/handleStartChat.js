import findUserGroup from "src/store/utils/findUserGroup.js";
import {createGroupAction} from "src/store/actions/chatAction.js";
import {openChatUserAction, toggleOpenHomeChatsSidebar} from "src/store/slices/chatSlice.js";


async function handleStartChat(friend, group, dispatch, groups, cb) {

    if(!(friend && friend._id)) return  cb("Something were wrong")

    try{

        // const groupData = await dispatch(createGroupAction({
        //     name: "",
        //     type: "private",
        //     participants: [friend._id]
        // })).unwrap()


        if (!group) {
            group = findUserGroup(groups, friend._id)
            if (!group) {
                // create a new group
                group = await dispatch(createGroupAction({
                    name: "",
                    type: "private",
                    participants: [friend._id]
                })).unwrap()

            }
        } else {
            // close chats right sidebar
            dispatch(toggleOpenHomeChatsSidebar())
        }

        if(!group){
            return cb("Something were wrong")
        }

        dispatch(openChatUserAction({
            ...friend,
            groupId: group._id,
            group
        }))

        cb()

    } catch (ex){
        console.log(ex)
        cb(ex)
    }
}

export default handleStartChat