import React from 'react'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer';
import widthLayout from '../hocs/withLayout'

 function ClientLayout(props) {
    return (
        <>
            <Header/>
            {props.children}
            <Footer/>
        </>
    )
}
export default widthLayout(ClientLayout);
