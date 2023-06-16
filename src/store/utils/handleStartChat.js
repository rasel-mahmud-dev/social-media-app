import findUserGroup from "src/store/utils/findUserGroup.js";
import {createGroupAction} from "src/store/actions/chatAction.js";
import {openChatUserAction, toggleOpenHomeChatsSidebar} from "src/store/slices/chatSlice.js";


async function handleStartChat(friend, group, dispatch, groups, cb) {
    if (!group) {
        group = findUserGroup(groups, friend._id)
        if (!group) {
            const groupData = await dispatch(createGroupAction({
                name: "",
                type: "private",
                participants: [friend._id]
            }))

            if (groupData.payload) {
                group = groupData.payload
            }
        }
    } else {
        // close chats right sidebar
        dispatch(toggleOpenHomeChatsSidebar())
    }

    dispatch(openChatUserAction({
        ...friend,
        groupId: group._id,
        group
    }))

    cb()
}

export default handleStartChat