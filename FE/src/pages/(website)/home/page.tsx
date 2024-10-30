import avatar from '@/assets/images/avatar.png'
import { AppContext } from '@/components/contexts/AppContext';
import { Menu } from 'lucide-react';
import { SendHorizonal } from 'lucide-react';
import { useContext, useEffect } from 'react';
import TypingEffect from './_components/TypingEffect';

const Home = () => {
    const { openMenu, setOpenMenu, handleOpenMenu }: any = useContext(AppContext)
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
                    child.classList.add('pointer-events-none');
                });
            }
        } else {
            screen?.classList.remove('blur-sm')
            screen?.removeEventListener('click', closeMenu)
            if (screen?.children) {
                Array.from(screen.children).forEach(child => {
                    child.classList.remove('pointer-events-none');
                });
            }
        }

        return () => {
            screen?.removeEventListener('click', closeMenu)
        };

    }, [openMenu])

    return (
        <div id='Screen' className="h-screen bg-[#343541] flex flex-col">
            {/* Header */}
            <div className={`flex max-md:relative justify-between items-center text-white p-4 bg-[#343541] z-0 select-none`}>
                <div className='cursor-pointer md:hidden' onClick={openMenu === 'open' ? () => handleOpenMenu('close') : () => handleOpenMenu('open')}>
                    <Menu size={32} />
                </div>
                {/* <div className='max-md:absolute top-1/2 left-1/2 transform max-md:-translate-x-1/2 max-md:-translate-y-1/2'>
            <span>Chat-bot</span>
          </div> */}
                <div className="flex items-center justify-end">
                    <img className="w-8 h-8 md:w-12 md:h-12 rounded-full mr-2 md:mr-4" src={avatar} alt="Avatar" />
                    <span className="text-sm md:text-base font-bold text-white">User 1</span>
                </div>
            </div>

            {/* Message List */}
            <div className="flex flex-col items-center justify-center h-screen">

                <div className="">
                    {/* Chào bạn, bạn muốn có cuộc trò chuyện gì? */}
                    <TypingEffect text={`Chào bạn, bạn muốn có cuộc trò chuyện gì?`} speed={50} />
                </div>
                <div className='grid grid-cols-[minmax(auto,450px)] md:grid-cols-[minmax(auto,768px)] p-4'>
                    <div className="bg-[#343541] flex w-full justify-center items-center">
                        <div className="Promt-chat bg-[#40414E] rounded-[26px] p-2 w-full flex items-end justify-between">
                            <div className="flex items-center">
                                <img className="w-8 h-8 rounded-full mr-2 md:mr-4" src={avatar} alt="Avatar" />
                            </div>
                            <div className='w-full mb-1 flex items-center max-h-[25dvh] overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-[#585969] scrollbar-track-[#40414E]'>
                                <textarea
                                    className="w-full h-full px-2 bg-transparent placeholder-gray-400 outline-none text-white resize-none"
                                    placeholder="Enter a prompt here"
                                    rows={1}
                                    onInput={(e) => {
                                        const target = e.target as HTMLTextAreaElement;
                                        target.style.height = "auto";
                                        target.style.height = `${target.scrollHeight}px`;
                                    }}
                                />
                            </div>
                            <div className='flex items-center pr-2 mb-1'>
                                <div className="text-white rounded-full border-none">
                                    <SendHorizonal size={24} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home