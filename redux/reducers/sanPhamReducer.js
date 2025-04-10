import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    listSanPham: [] // danh sách ban đầu rỗng
};
const sanPhamSlice = createSlice({
    name: "sanPham",
    initialState,
    reducers: {
        setSanPhams(state, action){
            state.listSanPham = action.payload; // cập nhật danh sách sản phẩm
        }, 
        delteteSanPham(state, action){
            // duyệt danh sách sản phẩm và loại bỏ sản phẩm trùng với action.payload
            state.listSanPham = state.listSanPham.filter((sp)=>sp.id !==action.payload)
        },
        addSanPham(state, action){
            state.listSanPham.push(action.payload);
        },
        updateSanPham(state, action){
            const {id, sanpham} = action.payload;
            state.listSanPham = state.listSanPham.map(sp => {
                if(sp.id === id) {
                    return {...sp, ...sanpham};
                }
                return sp;
            });
        }
    }
})
export const {setSanPhams, delteteSanPham, addSanPham, updateSanPham}  = sanPhamSlice.actions
export default sanPhamSlice.reducer;