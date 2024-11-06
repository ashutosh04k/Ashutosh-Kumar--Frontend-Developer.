import { configureStore } from "@reduxjs/toolkit"

import cousinReducer  from "./store-slice/CousinSlice";


const store = configureStore({
  reducer : {
    cousin : cousinReducer,
  }
})

export default store ;