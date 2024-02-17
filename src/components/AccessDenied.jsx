import React from 'react';

const AccessDenied = () => {
  return (
    <div  style={{ width:"25%",margin:"auto", textAlign:"center", paddingTop:"2rem"}}>
      <h1 style={{ fontSize:"20px",color:"red", fontWeight:"bold"}}>Access Denied🚫</h1>
      <p style={{ fontWeight:"bold"}}>You do not have permission to access this page.</p>
    </div>
  );
};

export default AccessDenied;
