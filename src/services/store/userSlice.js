import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    selectedProperty: "all",
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        selectProperty: (state, action) => {
            state.selectedProperty = action.payload
        },
        propertiesByProperty: (state, action) => {

        }
    },
})



export const { selectProperty } = userSlice.actions
export default userSlice.reducer

