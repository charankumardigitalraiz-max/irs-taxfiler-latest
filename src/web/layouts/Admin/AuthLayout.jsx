import React from 'react';
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';



const AdminAuthLayout = () => {
  return (
    // <div className="min-h-screen relative bg-gradient-to-br from-[#f5edf7] via-white to-[#fde7ff] flex items-center justify-center overflow-hidden">
      <div >

      {/* Background Animated Blobs */}
      {/* <motion.div
        animate={{ x: [0, 80, 0], y: [0, 40, 0] }}
        transition={{ duration: 18, repeat: Infinity }}
        className="absolute top-16 left-16 w-72 h-72 bg-purple-400/30 blur-3xl rounded-full"
      />

      <motion.div
        animate={{ x: [0, -80, 0], y: [0, -50, 0] }}
        transition={{ duration: 22, repeat: Infinity }}
        className="absolute bottom-16 right-16 w-96 h-96 bg-pink-400/30 blur-3xl rounded-full"
      /> */}

      {/* Page Content */}
      {/* <div className="relative z-20 w-full flex items-center justify-center px-4"> */}
        <div >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          // className="
          //   w-full max-w-md 
          //   bg-white/95 backdrop-blur-xl
          //   p-8 rounded-2xl
          //   shadow-2xl border border-purple-100
          // "
        >
          {/* Outlet renders Login or Signup here */}
          <Outlet />
        </motion.div>

      </div>
    </div>
  );
};

export default AdminAuthLayout;
