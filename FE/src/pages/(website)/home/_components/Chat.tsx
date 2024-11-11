import { Menu } from 'lucide-react';
import { SendHorizonal } from 'lucide-react';
import avatar from '@/assets/images/avatar.png'
import { useContext } from 'react';
import { AppContext } from '@/components/contexts/AppContext';
import TypingEffect from './TypingEffect';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Account from './Account';

const Chat = () => {
    const { openMenu, handleOpenMenu, getLocalStorage }: any = useContext(AppContext)
    const { register, handleSubmit } = useForm()
    const queryClient = useQueryClient();
    const navigate = useNavigate()
    const user = getLocalStorage('user')

    const createChatBot = useMutation({
        mutationFn: async (item: any) => {
            const data = await axios.post('http://127.0.0.1:5000/chatbox/new', item);
            return data.data;
        }, onError: (error) => {
            console.log(error)
        }
    })

    const createMessChat = useMutation({
        mutationFn: async (item: any) => {
            const data = await axios.post(`http://127.0.0.1:5000/api/predict?chatbot_id=${item.id_chatBot}`, { text: item.content });
            return data;
        }, onError: (error) => {
            console.log(error)
        }, onSuccess: (data) => {
            // console.log(data.data.chatbox_id)
            queryClient.invalidateQueries({ queryKey: ['GET_CHAT_SIDE_BAR'] })
            navigate(`/chat/${data.data.chatbox_id}`)
        }
    })

    const onSubmit = async (data: any) => {
        if (!data.content || data.content.trim() === '') return

        let chatBot = await createChatBot.mutateAsync({ name: data.content.slice(0, 10), userid: user.user_id })

        await createMessChat.mutateAsync({ content: data.content, id_chatBot: chatBot.chatbox })
    }



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
                <Account />
            </div>

            {/* Message List */}
            <div className="flex flex-col items-center justify-center h-screen">

                <div className="">
                    {/* Chào bạn, bạn muốn có cuộc trò chuyện gì? */}
                    <TypingEffect text={`Chào bạn, bạn muốn có cuộc trò chuyện gì?`} speed={50} />
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
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            document.querySelector('form')?.requestSubmit();
                                        }
                                    }}
                                />
                            </div>
                            <div className='flex items-center pr-2 mb-1'>
                                <button type='submit' className="text-white rounded-full border-none" title="Send">
                                    <SendHorizonal size={24} />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chat