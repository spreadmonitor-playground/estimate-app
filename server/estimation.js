const createNewEstimation = (complexity, effort, userId) => {
    return {
        complexity,
        effort,
        userId,
    }
}

module.exports = {
    createNewEstimation
}