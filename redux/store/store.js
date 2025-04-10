import { configureStore } from "@reduxjs/toolkit";
import sanPhamReducer from "../reducers/sanPhamReducer"

const store = configureStore({
    reducer: {
        sanPham: sanPhamReducer // kết nối reducer vào store
    }
})
export default store;