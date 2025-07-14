import {
  apigetDistricts,
  apigetProvince,
  apigetWards,
} from "../../services/province";
import { actionType } from "./actionType/actionType";

export const getProvince = () => async (dispatch) => {
  try {
    const provinces = await apigetProvince();
    if (provinces && Array.isArray(provinces)) {
      dispatch({
        type: actionType.GET_PROVINCE,
        province: provinces,
        msg: "Lấy danh sách tỉnh thành thành công!",
      });
    } else {
      dispatch({
        type: actionType.GET_PROVINCE,
        province: [],
        msg: "Không tìm thấy dữ liệu tỉnh thành.",
      });
    }
  } catch (error) {
    dispatch({
      type: actionType.GET_PROVINCE,
      province: [],
      msg: `Lỗi khi lấy danh sách tỉnh thành: ${error.message}`,
    });
  }
};
export const getDistricts = () => async (dispatch) => {
  try {
    const district = await apigetDistricts();

    if (district && Array.isArray(district)) {
      dispatch({
        type: actionType.GET_DISTRICTS,
        districts: district,
        msg: "Lấy danh sách tỉnh thành thành công!",
      });
    } else {
      dispatch({
        type: actionType.GET_DISTRICTS,
        districts: [],
        msg: "Không tìm thấy dữ liệu tỉnh thành.",
      });
    }
  } catch (error) {
    dispatch({
      type: actionType.GET_DISTRICTS,
      districts: [],
      msg: `Lỗi khi lấy danh sách tỉnh thành: ${error.message}`,
    });
  }
};
export const getWards = () => async (dispatch) => {
  try {
    const wards = await apigetWards();

    if (wards && Array.isArray(wards)) {
      dispatch({
        type: actionType.GET_WARD,
        ward: wards,
        msg: "Lấy danh sách tỉnh thành thành công!",
      });
    } else {
      dispatch({
        type: actionType.GET_WARD,
        ward: [],
        msg: "Không tìm thấy dữ liệu tỉnh thành.",
      });
    }
  } catch (error) {
    dispatch({
      type: actionType.GET_WARD,
      ward: [],
      msg: `Lỗi khi lấy danh sách tỉnh thành: ${error.message}`,
    });
  }
};
