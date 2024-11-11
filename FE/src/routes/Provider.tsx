import { useToast } from '@/hooks/use-toast';
import { Navigate, Outlet } from 'react-router-dom';

const Provider = ({ children }: any) => {
    const { toast } = useToast()
    const getUser = localStorage.getItem('user');
    const user = getUser ? JSON.parse(getUser) : {}
    if (user.user_id) {
        return children ? children : <Outlet />
    }
    // alert('Cần phải đăng nhập!')
    toast({
        variant: 'destructive',
        title: 'Login',
        description: 'Cần phải đăng nhập!'
    })
    return <Navigate to={'/login'} />
}

export default Provider