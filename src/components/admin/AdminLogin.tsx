import {useContext, useRef} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import './../../styles/admin/AdminLogin.scss'

const AdminLogin = () => {

    const username = useRef<HTMLInputElement | null>(null);
    const password = useRef<HTMLInputElement | null>(null);
    const {store} = useContext(Context);

    return (
        <div className="admin-login-container">
            <form onSubmit={(event) => event.preventDefault()}
                className="admin-login-form"
            >
                <input type="text" ref={username} placeholder='Логин' className="admin-login-form__input"/>
                <input type="password" ref={password} placeholder='Пароль' className="admin-login-form__input"/>
                
                <div className="admin-login-btns">
                    <div className='btn-container'>
                        <button 
                            type='submit' 
                            className="admin-login-btns__btn" 
                            onClick={() => store.login(username.current?.value, password.current?.value)}
                        >Войти в систему</button>
                    </div>
                    <div className='btn-container'>
                        <button 
                            type='submit' 
                            className="admin-login-btns__btn" 
                            onClick={() => store.registration(username.current?.value, password.current?.value)}
                        >Зарегистрироваться</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default observer(AdminLogin);