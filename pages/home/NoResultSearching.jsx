import React from 'react'


export default function NoResultSearching() {
    return (
        <div style={{width:'100%',height:'300px',display: 'flex',flexDirection: 'column',justifyContent: 'center',alignItems: 'center'}}>
            <img src="../notfound.png" alt="not found" />
            <b>Nhập vào các từ khóa khác để tìm kiếm</b>
        </div>
    )
}
