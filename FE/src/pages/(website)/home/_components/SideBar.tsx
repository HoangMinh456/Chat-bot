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


const SideBar = () => {
    const { openMenu, handleOpenMenu }: any = useContext(AppContext)
    const [openForm, setOpenForm] = useState('')
    const { register, handleSubmit } = useForm()
    const queryClient = useQueryClient();
    const naviagte = useNavigate();

    const { data, isLoading, isError } = useQuery({
        queryKey: ['GET_CHAT_SIDE_BAR'],
        queryFn: async () => {
            const { data } = await axios.get('http://127.0.0.1:5000/chatbox/all');
            // return data.messages((a: any, b: any) => new Date(b.thoiGianTao).getTime() - new Date(a.thoiGianTao).getTime());
            return data;
        }
    })

    console.log('dataSideBar', data)

    const changeTieuDe = useMutation({
        mutationFn: async (item: any) => {
            // console.log("item", item)
            const { data } = await axios.put(`http://127.0.0.1:5000/chatbox/update/name?chatbot_id=${item.id_chatBot}`, { tieuDe: item.tieuDe });
            return data
        }, onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['GET_CHAT_SIDE_BAR'] })
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
        }
    })

    const onSubmit = async (data: any) => {
        // console.log(data)
        changeTieuDe.mutateAsync({ id_chatBot: openForm, tieuDe: data.content })
        setOpenForm('')
    }

    // console.log(data)

    // function showDay(date: string) {
    //     const toDay = new Date();
    //     const day = new Date(date);
    //     const diffInMs = toDay.getTime() - day.getTime();

    //     const oneDay = 86400000; // 1 ngày 
    //     const oneMonth = 30 * oneDay; // 1 tháng (30 ngày)
    //     const daysPassed = Math.floor(diffInMs / oneDay); // Số ngày đã qua
    //     const monthsPassed = Math.floor(diffInMs / oneMonth); // Số tháng đã qua

    //     if (daysPassed < 1) return 'Hôm nay';
    //     if (daysPassed < 30) return `${daysPassed} ngày trước`;
    //     if (monthsPassed === 1) return '1 tháng trước';
    //     if (monthsPassed === 2) return '2 tháng trước';
    //     if (monthsPassed === 3) return '3 tháng trước';

    //     return 'Hơn 3 tháng trước';
    // }


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
                            <img className='max-sm:w-2' src={Icon_Plus} alt="icon-plus" />
                        </div>
                        <span className='truncate text-[12px] md:text-[16px]'>New chat</span>
                    </div>
                </Link>
                <div className='flex flex-col gap-y-4'>
                    <span className='px-4 text-sm'>Hôm nay</span>
                    {data.messages.map((item: any) => {
                        return (
                            <div key={item.id_chatBot} className='gap-x-4 p-4 items-center border border-[#444654] rounded-md hover:bg-[#343540] cursor-pointer'>
                                {openForm !== item.id_chatBot
                                    ?
                                    <div className='flex gap-4'>
                                        <img className='max-sm:w-2' src={Message} alt="" />
                                        <Link className='truncate flex-grow w-full' to={`/chat/${item.id_chatBot}`}>
                                            <span className='text-[12px] md:text-[16px]'>{item.tieuDe}</span>
                                        </Link>
                                        <img onClick={() => setOpenForm(item.id_chatBot)} className='max-sm:w-2' src={Pen} alt="" />
                                        <img onClick={() => deleteChatBot.mutateAsync({ id: item.id_chatBot })} className='max-sm:w-2' src={Delete} alt="" />
                                    </div>
                                    :
                                    <form onSubmit={handleSubmit(onSubmit)} className='flex gap-4'>
                                        <img className='max-sm:w-2' src={Message} alt="" />
                                        <div className='truncate flex-grow'>
                                            <input {...register('content')} defaultValue={'New chat'} className='bg-[#444654] border-[#444654]' type="text" placeholder="Enter text" />
                                        </div>
                                        <button type='submit' title='send'>
                                            <Check />
                                        </button>
                                        <X onClick={() => setOpenForm('')} />
                                    </form>
                                }
                            </div>
                        )
                    })}

                </div>
                {/* <div className='flex flex-col gap-y-4'>
                    <span className='px-4 text-sm'>Hôm nay</span>
                    <Link to={`/chat/`}>
                        <div className='gap-x-4 p-4 items-center border border-[#444654] rounded-md hover:bg-[#343540] cursor-pointer'>
                            <div className='flex gap-4'>
                                <img className='max-sm:w-2' src={Message} alt="" />
                                <span className='truncate flex-grow text-[12px] md:text-[16px]'></span>
                                <img className='max-sm:w-2' src={Pen} alt="" />
                                <img className='max-sm:w-2' src={Delete} alt="" />
                            </div>
                        </div>
                    </Link>
                </div> */}
            </div>
        </div >
    )
}

export default SideBar