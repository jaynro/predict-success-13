import React, { useState } from 'react';

const Header = () => {
    return (

<div className="app-header">


<table>
    <tr>
        <td>
    
        
            <img className="logo" src={require("../images/new-logo.png")} alt="GastroBusinessAI"  />
        </td>


        <td>
        <img className="loging" src={require("../images/user-login-305.png")}sizes='' />
        </td>        
    </tr>
    
</table>



</div >
)

}

export default Header;