import { LoginComponent } from '../../components/Login/Login'
import backGround from '../../../public/login-bg.jpg'

export const Auth = () => {
    return (
        <div className='w-full h-screen bg-black/10 flex justify-center items-center'>
            <div
                className='absolute overflow-hidden top-0 left-0 right-0 bottom-0'
                style={{
                    backgroundImage: `url(${backGround})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <div className='bg-black/50 absolute z-10 top-0 left-0 right-0 bottom-0'></div>
            </div>
            <LoginComponent />
        </div>
    )
}
