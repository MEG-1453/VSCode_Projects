import React from 'react'

function Product({productName, price}) {
  //const {productName, price}=props;
  return (
    <div style={{ 
        border: '1px solid #ddd', 
        padding: '20px', 
        borderRadius: '8px', 
        backgroundColor: 'cyan',
        width: '150px',
        marginBottom: '10px' // Alt alta yapışmasınlar diye boşluk ekledim
                                                            //props.productName'den kurtuldu
    }}>
        <div><strong>İsim:</strong> {productName}</div> 
        <div><strong>Fiyat:</strong> {price} TL</div>
    </div>
  )
}

export default Product