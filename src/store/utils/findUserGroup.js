function findUserGroup(groups = [], userId) {
    if(!groups || !Array.isArray(groups)) return null;
    let group = groups?.find(group =>
        group?.participants.findIndex((participant) => participant?._id === userId) !== -1
    )
    return group
}

export default findUserGroup