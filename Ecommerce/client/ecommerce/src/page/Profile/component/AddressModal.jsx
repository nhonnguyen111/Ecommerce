import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./AddressModal.module.scss";
import * as actions from "../../../store/actions";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { apiupdateDelivery } from "../../../services/delivery";
import "react-toastify/dist/ReactToastify.css";
const cx = classNames.bind(styles);

const AddressModal = ({ onClose, onSave, data }) => {
  const province = useSelector((state) => state.province.province);
  const districts = useSelector((state) => state.province.districts);
  const ward = useSelector((state) => state.province.ward);
  const [provinces, setProvinces] = useState([]);
  const [filteredDistricts, setFilteredDistricts] = useState([]);
  const [filteredWards, setFilteredWards] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [location, setLocation] = useState("");
  const [fullAddress, setfullAddress] = useState("");
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    address: "",
  });
  useEffect(() => {
    if (provinces) {
      const result = districts.filter(
        (district) => district.province_code === parseInt(provinces)
      );
      setFilteredDistricts(result);
    } else {
      setFilteredDistricts([]);
    }
  }, [provinces, districts]);
  useEffect(() => {
    if (selectedDistrict) {
      const result = ward.filter(
        (item) => item.district_code === parseInt(selectedDistrict)
      );
      setFilteredWards(result);
    } else {
      setFilteredWards([]);
    }
  }, [selectedDistrict, ward]);
  useEffect(() => {
    const provinceName =
      province.find((p) => p.code === parseInt(provinces))?.name || "";
    const districtName =
      districts.find((d) => d.code === parseInt(selectedDistrict))?.name || "";
    const wardName =
      ward.find((w) => w.code === parseInt(selectedWard))?.name || "";

    const fullAddress = `${location}, ${wardName}, ${districtName}, ${provinceName}`;
    setfullAddress(fullAddress);
  }, [provinces, selectedDistrict, selectedWard, location]);
  useEffect(() => {
    if (data) {
      const addressParts = data.address?.split(",").map((s) => s.trim()) || [];

      const provinceName = addressParts[addressParts.length - 1];
      const districtName = addressParts[addressParts.length - 2];
      const wardName = addressParts[addressParts.length - 3];
      const detailedLocation = addressParts
        .slice(0, addressParts.length - 3)
        .join(", ");

      const foundProvince = province.find((p) => p.name === provinceName);
      const foundDistrict = districts.find((d) => d.name === districtName);
      const foundWard = ward.find((w) => w.name === wardName);

      if (foundProvince) setProvinces(foundProvince.code.toString());
      if (foundDistrict) setSelectedDistrict(foundDistrict.code.toString());
      if (foundWard) setSelectedWard(foundWard.code.toString());
      setLocation(detailedLocation);

      setFormData({
        username: data.username || "",
        phone: data.phone || "",
        address: data.address || "",
      });
    }
  }, [data, province, districts, ward]);

  useEffect(() => {
    dispatch(actions.getProvince());
    dispatch(actions.getDistricts());
    dispatch(actions.getWards());
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  console.log(fullAddress);

  const handleSave = async () => {
    if (!formData.username || !formData.phone || !location) {
      toast.error("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    const payload1 = {
      ...formData,
      address: fullAddress,
      delivery_id: data?.delivery_id,
    };
    const payload2 = {
      ...formData,
      address: fullAddress,
    };
    try {
      let response;
      if (data) {
        response = await apiupdateDelivery(payload1);
      } else {
        response = await dispatch(actions.createDelivery(payload2));
      }

      if (response?.data?.err === 0) {
        toast.success(
          data
            ? "Cập nhật địa chỉ thành công"
            : "Thêm địa chỉ giao hàng thành công"
        );
        dispatch(actions.getDelivery());
        onClose();
      } else {
        toast.error(
          data ? "Cập nhật địa chỉ thất bại" : "Thêm địa chỉ giao hàng thất bại"
        );
      }
    } catch (error) {
      toast.error(
        data
          ? "Đã xảy ra lỗi khi cập nhật địa chỉ"
          : "Đã xảy ra lỗi khi tạo địa chỉ"
      );
      console.error(error);
    }
  };
  return (
    <div className={cx("modal-overlay")}>
      <div className={cx("modal-content")}>
        <h3>{data ? "Chỉnh sửa địa chỉ" : "Thêm địa chỉ mới"}</h3>
        <div className={cx("form-group")}>
          <label>Họ và tên</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div className={cx("form-group")}>
          <label>Số điện thoại</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <label>Địa chỉ</label>

        <div
          style={{ display: "flex", gap: "5px" }}
          className={cx("form-group")}
        >
          <select
            className={cx("select")}
            value={provinces}
            onChange={(e) => setProvinces(e.target.value)}
          >
            <option value="all">Thành phố/Tỉnh</option>
            {province.length > 0 &&
              province.map((item, i) => (
                <option key={i} value={item.code}>
                  {item.name}
                </option>
              ))}
          </select>

          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className={cx("select")}
          >
            <option value="">Quận/Huyện</option>
            {filteredDistricts.length > 0 &&
              filteredDistricts.map((district, i) => (
                <option key={i} value={district.code}>
                  {district.name}
                </option>
              ))}
          </select>

          <select
            className={cx("select")}
            value={selectedWard}
            onChange={(e) => setSelectedWard(e.target.value)}
          >
            <option value="">Phường/Xã</option>
            {filteredWards.length > 0 &&
              filteredWards.map((item, i) => (
                <option key={i} value={item.code}>
                  {item.name}
                </option>
              ))}
          </select>
        </div>
        <div className={cx("form-group")}>
          <input
            placeholder="Địa chỉ chi tiết"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className={cx("form-group")}>
          <label>Khu vực nhận (*)</label>
          <div className={cx("map-box")}>
            <iframe
              src={`https://www.google.com/maps?q=${encodeURIComponent(
                fullAddress
              )}&output=embed`}
              width="700"
              height="250"
              loading="lazy"
            ></iframe>
          </div>
        </div>

        <div className={cx("actions")}>
          <button className={cx("cancel")} onClick={onClose}>
            Hủy
          </button>
          <button className={cx("save")} onClick={handleSave}>
            Lưu
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddressModal;
