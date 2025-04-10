import axios from "axios";
import { setSanPhams, delteteSanPham,addSanPham, updateSanPham} from "../reducers/sanPhamReducer";


const apiUrl = "http://192.168.1.30:3000/sanpham";

export const getListSanPham = () =>async(dispatch)=>{
    try {
        const response = await axios.get(apiUrl);
      //  console.log(response.data);
        dispatch(setSanPhams(response.data));
    } catch (error) {
        console.log("lỗi lấy dữ liệu", error);
    }
}

// xóa
export const delteteSanPhamAction = (id) => async(dispatch)=>{
    try {
        await axios.delete(`${apiUrl}/${id}`);
        dispatch(delteteSanPham(id)); // cập nhật redux store
    } catch (error) {
        console.log("xóa lỗi ", error);
    }
}

// thêm
export const createSanPhamAction = (sanPham) => async(dispatch)=>{
    try {
        const response = await axios.post(apiUrl, sanPham);
        dispatch(addSanPham(response.data));
    } catch (error) {
        console.log("Lỗi thêm dữ liệu", error);
    }
}

// update
export const updateSanPhamAction = (id, sanpham) => async (dispatch)=>{
    try {
        await axios.put(`${apiUrl}/${id}`, sanpham)
        dispatch(updateSanPham(id, sanpham));
    } catch (error) {
        console.log("Lỗi sửa dữ liệu", error);
    }
}

export const searchSanPhamAction = (keyword) => async (dispatch) => {
    try {
        const response = await axios.get(`${apiUrl}?q=${keyword}`);
        dispatch(setSanPhams(response.data)); // Cập nhật danh sách với kết quả tìm kiếm
    } catch (error) {
        console.log("Lỗi tìm kiếm sản phẩm", error);
    }
};
