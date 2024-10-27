import Chat from '/Users/brahimfer/Downloads/ArgentBank-Frontend-main/ArgentBank-Frontend-main/src/img/icon-chat.png'
import "./style.scss"
const Cards = () => {
    return (
        <div className='features'>
            <div className='feature-item'>
                <img
                    src= {Chat}
                    alt="Credit Card"  
                    className='feature-icon'              /> 
                <h3>You are our #1 priority</h3>
                <p>Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.

</p>
            </div>
        </div>
    )
}

export default Cards