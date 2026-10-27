import React from 'react'
import Product from './Product'
// DÜZELTME 1: Component ismini BÜYÜK harfle ve dosyadaki gibi çağırıyoruz
import MyContainer from './MyContainer'

function App() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#242424',
      color: 'white'
    }}>

      <div>
        <MyContainer>

          <Product productName="Telefon" price={25000} />
          <Product productName="Bilgisayar" price={45000} />
          <Product productName="Tablet" price={15000} />

        </MyContainer>
      </div>

    </div>
  )
}

export default App