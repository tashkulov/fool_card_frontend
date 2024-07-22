import { Component } from 'react';
import './new-game.css';
import { Link } from 'react-router-dom';


export default class NewGame extends Component {
    render() {
        return (


            <div className='main-header-new-game'>
                <div className='main-header-content-new-game'>
                    <p>1300</p>
                    <div className='main-header-content2'>
                        <input className="left" type="button" />
                        <input className='right' type="button" />
                        <input className='right-up-corner' type='button' />
                    </div>
                    <div className='rejim'>
                        <label className='checkbox'>
                            <input type="checkbox" name="check" />
                            <svg version="1.1" className="checkbox_svg" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 100 100" contentStyleType="enable-background:new 0 0 100 100;"><polyline className="checkbox_line" points="3.5,51.5 40.5,82.5 96.7,15.3 " /></svg>
                        </label>
                    </div>

                    <div className='players'>

                    </div>
                    <div className='private'>
                        <input type="checkbox" className="custom-c" />
                    </div>
                    <div className='submit'>
                        <Link to='/in-game'>
                            <button className='button2'></button>
                        </Link>
                    </div>


                </div>

                <div className='navbar'>
                    <Link to="/">
                        <button className='button1'></button>
                    </Link>
                </div>



            </div>


        )
    }
}
