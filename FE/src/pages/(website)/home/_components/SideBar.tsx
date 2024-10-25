import Icon_Plus from '@/assets/icons/plus.svg'
import Message from '@/assets/icons/message.svg'
import Pen from '@/assets/icons/pen.svg'
import Delete from '@/assets/icons/delete.svg'
import { Menu } from 'lucide-react'


const SideBar = ({ openMenu, handleOpenMenu }: { openMenu: string, handleOpenMenu: any }) => {
    return (
        <div className={`Side-bar bg-[#202123] text-white transition-all duration-200 max-md:absolute max-md:w-[45%] select-none ${openMenu === 'open' ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
            <div className={`flex md:hidden p-4`}>
                <div className='cursor-pointer' onClick={openMenu === 'open' ? () => handleOpenMenu('close') : () => handleOpenMenu('open')}>
                    <Menu size={32} />
                </div>
            </div>
            <div className='All-chat flex flex-col gap-y-8 p-4 h-screen overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-[#444654] scrollbar-track-[#202123]'>
                <div>
                    <div className='New-chat flex gap-x-4 p-4 items-center border border-[#444654] rounded-md hover:bg-[#343540] cursor-pointer md:text-[16px] text-[12px]'>
                        <div>
                            <img className='max-sm:w-2' src={Icon_Plus} alt="icon-plus" />
                        </div>
                        <span className='truncate text-[12px] md:text-[16px]'>New chat</span>
                    </div>
                </div>
                <div className='flex flex-col gap-y-4'>
                    <span className='px-4 text-sm'>Hôm nay</span>
                    <div className='gap-x-4 p-4 items-center border border-[#444654] rounded-md hover:bg-[#343540] cursor-pointer'>
                        <div className='flex gap-4'>
                            <img className='max-sm:w-2' src={Message} alt="" />
                            <span className='truncate flex-grow text-[12px] md:text-[16px]'>Chatbot def</span>
                            <img className='max-sm:w-2' src={Pen} alt="" />
                            <img className='max-sm:w-2' src={Delete} alt="" />
                        </div>
                    </div>
                    <div className='gap-x-4 p-4 items-center border border-[#444654] rounded-md hover:bg-[#343540] cursor-pointer'>
                        <div className='flex gap-4'>
                            <img className='max-sm:w-2' src={Message} alt="" />
                            <span className='truncate flex-grow text-[12px] md:text-[16px]'>Chatbot definition explan ed</span>
                            <img className='max-sm:w-2' src={Pen} alt="" />
                            <img className='max-sm:w-2' src={Delete} alt="" />
                        </div>
                    </div>
                </div>

                <div className='flex flex-col gap-y-4'>
                    <span className='px-4 text-sm'>1 ngày trước</span>
                    <div className='gap-x-4 p-4 items-center border border-[#444654] rounded-md hover:bg-[#343540] cursor-pointer'>
                        <div className='flex gap-4'>
                            <img className='max-sm:w-2' src={Message} alt="" />
                            <span className='truncate flex-grow text-[12px] md:text-[16px]'>Chatbot def</span>
                            <img className='max-sm:w-2' src={Pen} alt="" />
                            <img className='max-sm:w-2' src={Delete} alt="" />
                        </div>
                    </div>
                    <div className='gap-x-4 p-4 items-center border border-[#444654] rounded-md hover:bg-[#343540] cursor-pointer'>
                        <div className='flex gap-4'>
                            <img className='max-sm:w-2' src={Message} alt="" />
                            <span className='truncate flex-grow text-[12px] md:text-[16px]'>Chatbot definition explan ed</span>
                            <img className='max-sm:w-2' src={Pen} alt="" />
                            <img className='max-sm:w-2' src={Delete} alt="" />
                        </div>
                    </div>
                </div>

                <div className='flex flex-col gap-y-4'>
                    <span className='px-4 text-sm'>3 ngày trước</span>
                    <div className='gap-x-4 p-4 items-center border border-[#444654] rounded-md hover:bg-[#343540] cursor-pointer'>
                        <div className='flex gap-4'>
                            <img className='max-sm:w-2' src={Message} alt="" />
                            <span className='truncate flex-grow text-[12px] md:text-[16px]'>Chatbot def</span>
                            <img className='max-sm:w-2' src={Pen} alt="" />
                            <img className='max-sm:w-2' src={Delete} alt="" />
                        </div>
                    </div>
                    <div className='gap-x-4 p-4 items-center border border-[#444654] rounded-md hover:bg-[#343540] cursor-pointer'>
                        <div className='flex gap-4'>
                            <img className='max-sm:w-2' src={Message} alt="" />
                            <span className='truncate flex-grow text-[12px] md:text-[16px]'>Chatbot definition explan ed</span>
                            <img className='max-sm:w-2' src={Pen} alt="" />
                            <img className='max-sm:w-2' src={Delete} alt="" />
                        </div>
                    </div>
                    <div className='gap-x-4 p-4 items-center border border-[#444654] rounded-md hover:bg-[#343540] cursor-pointer'>
                        <div className='flex gap-4'>
                            <img className='max-sm:w-2' src={Message} alt="" />
                            <span className='truncate flex-grow text-[12px] md:text-[16px]'>Chatbot def</span>
                            <img className='max-sm:w-2' src={Pen} alt="" />
                            <img className='max-sm:w-2' src={Delete} alt="" />
                        </div>
                    </div>
                    <div className='gap-x-4 p-4 items-center border border-[#444654] rounded-md hover:bg-[#343540] cursor-pointer'>
                        <div className='flex gap-4'>
                            <img className='max-sm:w-2' src={Message} alt="" />
                            <span className='truncate flex-grow text-[12px] md:text-[16px]'>Chatbot definition explan ed</span>
                            <img className='max-sm:w-2' src={Pen} alt="" />
                            <img className='max-sm:w-2' src={Delete} alt="" />
                        </div>
                    </div>
                    <div className='gap-x-4 p-4 items-center border border-[#444654] rounded-md hover:bg-[#343540] cursor-pointer'>
                        <div className='flex gap-4'>
                            <img className='max-sm:w-2' src={Message} alt="" />
                            <span className='truncate flex-grow text-[12px] md:text-[16px]'>Chatbot def</span>
                            <img className='max-sm:w-2' src={Pen} alt="" />
                            <img className='max-sm:w-2' src={Delete} alt="" />
                        </div>
                    </div>
                    <div className='gap-x-4 p-4 items-center border border-[#444654] rounded-md hover:bg-[#343540] cursor-pointer'>
                        <div className='flex gap-4'>
                            <img className='max-sm:w-2' src={Message} alt="" />
                            <span className='truncate flex-grow text-[12px] md:text-[16px]'>Chatbot definition explan ed</span>
                            <img className='max-sm:w-2' src={Pen} alt="" />
                            <img className='max-sm:w-2' src={Delete} alt="" />
                        </div>
                    </div>
                    <div className='gap-x-4 p-4 items-center border border-[#444654] rounded-md hover:bg-[#343540] cursor-pointer'>
                        <div className='flex gap-4'>
                            <img className='max-sm:w-2' src={Message} alt="" />
                            <span className='truncate flex-grow text-[12px] md:text-[16px]'>Chatbot def</span>
                            <img className='max-sm:w-2' src={Pen} alt="" />
                            <img className='max-sm:w-2' src={Delete} alt="" />
                        </div>
                    </div>
                    <div className='gap-x-4 p-4 items-center border border-[#444654] rounded-md hover:bg-[#343540] cursor-pointer'>
                        <div className='flex gap-4'>
                            <img className='max-sm:w-2' src={Message} alt="" />
                            <span className='truncate flex-grow text-[12px] md:text-[16px]'>Chatbot definition explan ed</span>
                            <img className='max-sm:w-2' src={Pen} alt="" />
                            <img className='max-sm:w-2' src={Delete} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SideBar