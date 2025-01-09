import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { openLogoutModal,openUpdateModal } from "../../redux/adminSlice";
import { Menu, MenuItem, Avatar, IconButton, Divider } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import EditIcon from "@mui/icons-material/Edit";
import LogoutModal from './Modal/logoutModal';
import UpdateModal from './Modal/updateModal'
const LoginState = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const user = JSON.parse(localStorage.getItem("USER_LOGIN")).user
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
 const hanldeLogoutOpen = () => {
  setAnchorEl(null);
  dispatch(openLogoutModal())
 }
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleUpdateOpen = () => {
    setAnchorEl(null);
    dispatch(openUpdateModal())
  }
  return (<div className="relative flex">
    {/* Admin Avatar with Icon Button */}
    <MenuItem
        disabled
        className = 'bg-blue-600'
        sx={{
          fontSize: "20px",
          fontWeight: "bold",
          color: 'green',
          cursor: "default",
        }}
      >
        Xin chào, {user.name}!
      </MenuItem>
    <IconButton onClick={handleMenuOpen}>
      <Avatar
        src={user.avatar}
        alt={user.name}
        sx={{ width: 60, height: 60 }} 
      />
    </IconButton>
  
    {/* Dropdown Menu */}
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleMenuClose}
      PaperProps={{
        style: {
          borderRadius: "8px",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          width: "200px",
        },
      }}
    >
     
     
      <Divider />

      <MenuItem onClick={handleUpdateOpen}>
        <EditIcon sx={{ fontSize: 18, marginRight: 1 }} />
        Cập nhật thông tin
      </MenuItem>
     
      <Divider />
      <MenuItem onClick={hanldeLogoutOpen}>
        <LogoutIcon sx={{ fontSize: 18, marginRight: 1 }} />
        Đăng xuất
      </MenuItem>
    </Menu>
    <UpdateModal/>
    <LogoutModal/>
  </div>
  
  );
};

export default LoginState;
