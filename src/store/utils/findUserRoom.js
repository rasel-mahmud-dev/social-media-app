function findUserRoom(rooms = [], userId) {
    if (!rooms || !Array.isArray(rooms)) return null;
    let room = rooms?.find(room =>
        room?.participants.findIndex((participant) => participant?._id === userId) !== -1
    )
    return room
}

export default findUserRoom