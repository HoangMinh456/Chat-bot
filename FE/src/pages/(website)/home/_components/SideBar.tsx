import Icon_Plus from '@/assets/icons/plus.svg'
import Message from '@/assets/icons/message.svg'
import Pen from '@/assets/icons/pen.svg'
import Delete from '@/assets/icons/delete.svg'
import { Check, Menu, X } from 'lucide-react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import { AppContext } from '@/components/contexts/AppContext'
import { useForm } from 'react-hook-form'
import React from 'react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { useToast } from '@/hooks/use-toast'


const SideBar = () => {
    const { openMenu, handleOpenMenu, getLocalStorage }: any = useContext(AppContext)
    const [openForm, setOpenForm] = useState('')
    const { register, handleSubmit } = useForm()
    const queryClient = useQueryClient();
    const naviagte = useNavigate();
    const user = getLocalStorage('user')
    const { toast } = useToast()
    const orderedKeys = ['today', 'last_3_days', 'last_7_days', 'older_than_7_days'];

    const { data, isLoading, isError } = useQuery({
        queryKey: ['GET_CHAT_SIDE_BAR'],
        queryFn: async () => {
            const { data } = await axios.get(`http://127.0.0.1:5000/chatbox/all?user_id=${user.user_id}`);
            // return data.messages((a: any, b: any) => new Date(b.thoiGianTao).getTime() - new Date(a.thoiGianTao).getTime());
            return data;
        }
    })

    console.log('data side bar', data)

    const changeTieuDe = useMutation({
        mutationFn: async (item: any) => {
            const { data } = await axios.put(`http://127.0.0.1:5000/chatbox/update/name?chatbot_id=${item.id_chatBot}`, { tieuDe: item.tieuDe });
            return data
        }, onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['GET_CHAT_SIDE_BAR'] })
            toast({
                title: 'Chat-bot',
                description: 'Thay đổi tiêu đề thành công!'
            })
        }, onError: (error) => {
            if (axios.isAxiosError(error) && error.response) {
                toast({
                    variant: 'destructive',
                    title: 'Chat-bot',
                    description: error.response.data.message
                })
            } else {
                alert('error!')
                console.log(error.message);
            }
        }
    })

    const deleteChatBot = useMutation({
        mutationFn: async (id: any) => {
            // console.log(id)
            const data = await axios.delete(`http://127.0.0.1:5000/chatbox/delete?chatbot_id=${id.id}`);
            return data;
        }, onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['GET_CHAT_SIDE_BAR'] })
            naviagte('/')
            toast({
                title: 'Chat-bot',
                description: 'Xóa thành công!'
            })
        }, onError: (error) => {
            if (axios.isAxiosError(error) && error.response) {
                toast({
                    variant: 'destructive',
                    title: 'Chat-bot',
                    description: error.response.data.message
                })
            } else {
                alert('error!')
                console.log(error.message);
            }
        }
    })

    const onSubmit = async (data: any) => {
        changeTieuDe.mutateAsync({ id_chatBot: openForm, tieuDe: data.content })
        setOpenForm('')
    }

    function showDay(date: any) {
        if (date === 'today') return 'Hôm nay';
        if (date === 'last_3_days') return '3 ngày trước';
        if (date === 'last_7_days') return '7 ngày trước';
        if (date === 'older_than_7_days') return 'Hơn 7 ngày trước';
    }


    if (isLoading) return <div className='bg-[#202123] h-screen'>Loading...</div>
    if (isError) return <div>Error...</div>

    return (
        <div className={`Side-bar bg-[#202123] text-white transition-all duration-200 transform max-md:absolute max-md:w-[45%] max-sm:w-[70%] select-none z-10 ${openMenu === 'open' ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
            <div className={`flex md:hidden p-4`}>
                <div className='cursor-pointer' onClick={openMenu === 'open' ? () => handleOpenMenu('close') : () => handleOpenMenu('open')}>
                    <Menu size={32} />
                </div>
            </div>
            <div className='All-chat flex flex-col gap-y-8 p-4 h-screen overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-[#444654] scrollbar-track-[#202123]'>
                <Link to={`/`}>
                    <div className='New-chat flex gap-x-4 p-4 items-center border border-[#444654] rounded-md hover:bg-[#343540] cursor-pointer md:text-[16px] text-[12px]'>
                        <div>
                            <img className='max-sm:w-4' src={Icon_Plus} alt="icon-plus" />
                        </div>
                        <span className='truncate text-[12px] md:text-[16px]'>New chat</span>
                    </div>
                </Link>
                <div className='flex flex-col gap-y-4'>

                    {orderedKeys.map((key) => {
                        const value = data[key];
                        if (value && value.length > 0) {
                            return (
                                <React.Fragment key={key}>
                                    <span className='px-4 text-sm'>{showDay(key)}</span>
                                    {value.map((item: any) => (
                                        <div key={item.id_chatBot} className='gap-x-4 p-4 items-center border border-[#444654] rounded-md hover:bg-[#343540] cursor-pointer'>
                                            {openForm !== item.id_chatBot ? (
                                                <div className='flex gap-4'>
                                                    <img className='max-sm:w-4' src={Message} alt="" />
                                                    <Link className='truncate flex-grow w-full' to={`/chat/${item.id_chatBot}`}>
                                                        <span className='text-[12px] md:text-[16px]'>{item.tieuDe}</span>
                                                    </Link>
                                                    <img onClick={() => setOpenForm(item.id_chatBot)} className='max-sm:w-4' src={Pen} alt="pen_icons" />
                                                    <AlertDialog>
                                                        <AlertDialogTrigger>
                                                            <img className='w-7 max-sm:w-8' src={Delete} alt="delete_icon" />
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle>Bạn có chắc muốn xóa chứ?</AlertDialogTitle>
                                                                <AlertDialogDescription>
                                                                    Hành động không thể hoàn tác, mọi dư liệu sẽ bị xóa vĩnh viễn.
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                <AlertDialogAction className='bg-red-500 hover:bg-red-600' onClick={() => deleteChatBot.mutateAsync({ id: item.id_chatBot })}>Delete</AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                </div>
                                            ) : (
                                                <form onSubmit={handleSubmit(onSubmit)} className='flex gap-4'>
                                                    <img className='max-sm:w-4' src={Message} alt="" />
                                                    <div className='truncate flex-grow'>
                                                        <input {...register('content')} defaultValue={'New chat'} className='bg-[#444654] border-[#444654]' type="text" placeholder="Enter text" />
                                                    </div>
                                                    <button type='submit' title='send'>
                                                        <Check />
                                                    </button>
                                                    <X onClick={() => setOpenForm('')} />
                                                </form>
                                            )}
                                        </div>
                                    ))}
                                </React.Fragment>
                            );
                        } else {
                            return null;
                        }
                    })}
                </div>
            </div>
        </div >
    )
}

export default SideBar