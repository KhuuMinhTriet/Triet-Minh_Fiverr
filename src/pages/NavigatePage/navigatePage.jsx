import React, { useState } from 'react';
import { Button, AppBar, Toolbar, Typography, Container, Grid2, Box, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik'; 
import backgroundImage from '../../OIP.jpg';
import Swal from "sweetalert2";
import { useDispatch } from 'react-redux'; 

const NavigatePage = () => {
  const [openModal, setOpenModal] = useState(false);  
  const navigate = useNavigate(); 
  const dispatch = useDispatch(); 

  const handleUserLogin = () => {
    navigate('/home'); 
  };

  const handleAdminLogin = () => {
    setOpenModal(true); 
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSubmitAdminLogin = (values) => {
    const { username, password } = values;

    if (username === 'admin' && password === 'admin') {

      Swal.fire('Welcome Admin!', '', 'success');
      navigate('/admin'); // Chuyển hướng đến trang admin
    } else {
      Swal.fire('Invalid username or password!', '', 'error');
    }

    setOpenModal(false); 
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <AppBar position="absolute" sx={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
        <Box sx={{ paddingLeft: '20px' }}>
          <img
            src="/static/media/logo-white.19839c97c7a2ac5bea24.png"
            alt="Logo"
            style={{ width: '112px', height: '48px', objectFit: 'contain' }}
          />
        </Box>
      </AppBar>
      <Container maxWidth="sm" sx={{ textAlign: 'center', color: 'white', zIndex: 2 }}>
        <Box sx={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', padding: '30px', borderRadius: '8px' }}>
          <Typography variant="h4" sx={{ marginBottom: 4, fontWeight: 'bold', fontSize: '2rem' }}>
            Bạn là
          </Typography>
          <Grid2 container spacing={2} justifyContent="center">
            {/* Nút đăng nhập người dùng */}
            <Grid2 item xs={12} sm={6} md={4}>
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Button variant="contained" color="primary" fullWidth sx={{ padding: '15px', fontSize: '1.2rem' }} onClick={handleUserLogin}>
                  Người dùng
                </Button>
              </motion.div>
            </Grid2>

            {/* Nút đăng nhập quản trị viên */}
            <Grid2 item xs={12} sm={6} md={4}>
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Button variant="contained" color="secondary" fullWidth sx={{ padding: '15px', fontSize: '1.2rem' }} onClick={handleAdminLogin}>
                  Quản trị viên
                </Button>
              </motion.div>
            </Grid2>
          </Grid2>
        </Box>
      </Container>

      {/* Admin Login Modal */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Đăng nhập Quản trị viên</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{ username: '', password: '' }}
            onSubmit={handleSubmitAdminLogin}
          >
            {({ values, handleChange }) => (
              <Form>
                <TextField
                  label="Tên đăng nhập"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="username"
                  value={values.username}
                  onChange={handleChange}
                />
                <TextField
                  label="Mật khẩu"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                />
                <DialogActions>
                  <Button onClick={handleCloseModal} color="primary">
                    Hủy
                  </Button>
                  <Button type="submit" color="primary">
                    Đăng nhập
                  </Button>
                </DialogActions>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NavigatePage;
