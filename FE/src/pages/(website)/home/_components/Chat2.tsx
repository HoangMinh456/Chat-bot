import avatar from '@/assets/images/avatar.png'
import Logo_AI from '@/assets/img/Logo-AI.png'
import { AppContext } from '@/components/contexts/AppContext';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Menu } from 'lucide-react';
import { SendHorizonal } from 'lucide-react';
import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

const Chat2Component = () => {
    const { openMenu, setOpenMenu, handleOpenMenu }: any = useContext(AppContext)
    const { id } = useParams()
    const { register, handleSubmit, reset } = useForm()
    const queryClient = useQueryClient()
    const { data, isLoading, isError } = useQuery({
        queryKey: ['GET_CHAT_BOT', id],
        queryFn: async () => {
            const { data } = await axios.get(`http://127.0.0.1:5000/chatbox?chatbot_id=${id}`);
            return data;
        }
    })

    const createMessChat = useMutation({
        mutationFn: async (item: any) => {
            const data = await axios.post(`http://127.0.0.1:5000/api/predict?chatbot_id=${item.id_chatBot}`, { text: item.content });
            return data;
        }, onError: (error) => {
            console.log(error)
        }, onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['GET_CHAT_BOT', id] })
        }
    })

    const onSubmit = async (data: any) => {
        if (!data.content || data.content.trim() === '') return
        // console.log(data.content)

        await createMessChat.mutateAsync({ content: data.content, id_chatBot: id })
        reset()
    }

    const closeMenu = () => {
        if (openMenu === 'open') {
            setOpenMenu('close')
        }
    }

    useEffect(() => {
        const screen = document.querySelector('#Screen')
        if (openMenu === 'open') {
            screen?.classList.add('blur-sm')
            screen?.addEventListener('click', closeMenu)
            if (screen?.children) {
                Array.from(screen.children).forEach(child => {
                    child.classList.add('pointer-events-none')
                })
            }
        } else {
            screen?.classList.remove('blur-sm')
            screen?.removeEventListener('click', closeMenu)
            if (screen?.children) {
                Array.from(screen.children).forEach(child => {
                    child.classList.remove('pointer-events-none')
                })
            }
        }

        return () => {
            screen?.removeEventListener('click', closeMenu)
        };

    }, [openMenu])

    if (isLoading) return <div className='h-screen bg-[#343541]'>Loading...</div>
    if (isError) return <div>Error...</div>

    return (
        <div id='Screen' className="h-screen bg-[#343541] flex flex-col">
            {/* Header */}
            <div className={`flex max-md:relative justify-between items-center text-white p-4 bg-[#343541] z-0 select-none`}>
                <div className='cursor-pointer md:hidden' onClick={openMenu === 'open' ? () => handleOpenMenu('close') : () => handleOpenMenu('open')}>
                    <Menu size={32} />
                </div>
                <div className='max-md:absolute top-1/2 left-1/2 transform max-md:-translate-x-1/2 max-md:-translate-y-1/2'>
                    <span>Chat-bot</span>
                </div>
                <div className="flex items-center justify-end">
                    <img className="w-8 h-8 md:w-12 md:h-12 rounded-full mr-2 md:mr-4" src={avatar} alt="Avatar" />
                    {/* <span className="text-sm md:text-base font-bold text-white">User 1</span> */}
                </div>
            </div>

            {/* Message List */}
            <div className="flex flex-col items-center justify-between h-screen overflow-hidden">
                {/* <div className="text-transparent bg-clip-text bg-gradient-to-b from-blue-500 to-orange-500 p-3 rounded-lg text-4xl lg:text-8xl text-center">
                    Chào bạn, bạn muốn có cuộc trò chuyện gì?
                </div> */}
                <div className='Main-chat relative grid gap-y-6 w-full overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-[#585969] scrollbar-track-[#40414E]'>
                    {data.messages.map((item: any, index: number) => {
                        return (
                            <>
                                <div key={index} className='Human-chat p-6 flex justify-center items-center'>
                                    <div className='Content-chat flex items-start flex-row-reverse gap-4 w-full max-w-[450px] md:max-w-[768px]'>
                                        <div className="flex items-center">
                                            <img className="w-8 h-8 rounded-full mr-2 md:mr-4" src={avatar} alt="Avatar" />
                                        </div>
                                        <div className='w-full max-w-[450px] pt-1 md:max-w-[768px] text-right'>
                                            <span className='text-white'>
                                                {item.noiDung}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div key={index + 1} className='AI-chat bg-[#444654] p-6 flex justify-center items-center'>
                                    <div className='Content-chat flex items-start gap-4 w-full max-w-[450px] md:max-w-[768px]'>
                                        <div className="flex items-center">
                                            <img className="w-8 h-8 mr-2 md:mr-4" src={Logo_AI} alt="Avatar" />
                                        </div>
                                        <div className='w-full max-w-[450px] pt-1 md:max-w-[768px]'>
                                            <span className='text-white'>
                                                {item.phanHoi === 1 ? 'Tích cực' : item.phanHoi === 0 ? 'Tiêu cực' : '...Đang suy nghĩ'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                    })}

                    {/* <div className='Human-chat p-6 flex justify-center items-center'>
                        <div className='Content-chat flex items-start flex-row-reverse gap-4 w-full max-w-[450px] md:max-w-[768px]'>
                            <div className="flex items-center">
                                <img className="w-8 h-8 rounded-full mr-2 md:mr-4" src={avatar} alt="Avatar" />
                            </div>
                            <div className='w-full max-w-[450px] pt-1 md:max-w-[768px] text-right'>
                                <span className='text-white'>
                                    adad
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className='AI-chat bg-[#444654] p-6 flex justify-center items-center'>
                        <div className='Content-chat flex items-start gap-4 w-full max-w-[450px] md:max-w-[768px]'>
                            <div className="flex items-center">
                                <img className="w-8 h-8 mr-2 md:mr-4" src={Logo_AI} alt="Avatar" />
                            </div>
                            <div className='w-full max-w-[450px] pt-1 md:max-w-[768px]'>
                                <span className='text-white'>
                                    adad
                                </span>
                            </div>
                        </div>
                    </div> */}

                </div>
                <div className='grid grid-cols-[minmax(auto,450px)] md:grid-cols-[minmax(auto,768px)] p-4'>
                    <div className="bg-[#343541] flex w-full justify-center items-center">
                        <form onSubmit={handleSubmit(onSubmit)} className="Promt-chat bg-[#40414E] rounded-[26px] p-2 w-full flex items-end justify-between">
                            <div className="flex items-center">
                                <img className="w-8 h-8 rounded-full mr-2 md:mr-4" src={avatar} alt="Avatar" />
                            </div>
                            <div className='w-full mb-1 flex items-center max-h-[15dvh] overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-[#585969] scrollbar-track-[#40414E]'>
                                <textarea
                                    className="w-full h-full px-2 bg-transparent placeholder-gray-400 outline-none text-white resize-none"
                                    placeholder="Enter a prompt here"
                                    rows={1}
                                    maxLength={255}
                                    {...register('content')}
                                    onInput={(e) => {
                                        const target = e.target as HTMLTextAreaElement;
                                        target.style.height = "auto";
                                        target.style.height = `${target.scrollHeight}px`;
                                    }}
                                />
                            </div>
                            <div className='flex items-center pr-2 mb-1'>
                                <button type='submit' className="text-white rounded-full border-none" title='send'>
                                    <SendHorizonal size={24} />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Chat2Component;
