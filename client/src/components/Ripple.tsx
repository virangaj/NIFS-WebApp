import React from 'react'
import RippleLoader from '../images/Ripple.svg';
function Ripple() {
    return (
        <div>
            <img src={RippleLoader} alt='loader' style={{ margin: '0 auto', display: 'block' }} />
        </div>
    )
}

export default Ripple