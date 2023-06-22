import findUserRoom from "src/store/utils/findUserRoom.js";

import {openChatUserAction, toggleOpenHomeChatsSidebar} from "src/store/slices/chatSlice.js";
import {createRoomAction} from "src/store/actions/chatAction.js";


async function handleStartChat(friend, room, dispatch, roooms, cb) {

    if(!(friend && friend._id)) return  cb("Something were wrong")

    try{

        // const groupData = await dispatch(createGroupAction({
        //     name: "",
        //     type: "private",
        //     participants: [friend._id]
        // })).unwrap()


        if (!room) {
            room = findUserRoom(roooms, friend._id)
            if (!room) {
                // create a new group
                room = await dispatch(createRoomAction({
                    name: "",
                    type: "private",
                    participants: [friend._id]
                })).unwrap()

            }
        } else {
            // close chats right sidebar
            dispatch(toggleOpenHomeChatsSidebar())
        }

        if(!room){
            return cb("Something were wrong")
        }

        dispatch(openChatUserAction({
            ...friend,
            roomId: room._id,
            room
        }))

        cb()

    } catch (ex){
        console.log(ex)
        cb(ex)
    }
}

export default handleStartChat