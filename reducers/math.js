export const math = (state = 200, action ) => {
    switch(action.type) {
        case "ADD":
            return state + 1
        case "SUBTRACT":
            return state - 1
        default:
            return state
    }
} 