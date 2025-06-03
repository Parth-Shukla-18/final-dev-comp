import { createSlice , } from '@reduxjs/toolkit'

const appDataInitialState = {
    filterArray:['All', 'Buton' ,'Card' ,'Hero' ,'Slider' ,'Dashboard' ,'Landing Page' ,'Input Field' , 'Glass Effect' ,'Menu Card' ,'Profile View' , 'Reel View' , 'ETC.'],
}

const filterArraySlice = createSlice({
    name: 'appData',
    initialState: appDataInitialState,
    reducers: {
        increaseArray : (state,action) => {
            state.filterArray.push(action.payload);
        },     
    },

})

export const { increaseArray } = filterArraySlice.actions

export default filterArraySlice.reducer