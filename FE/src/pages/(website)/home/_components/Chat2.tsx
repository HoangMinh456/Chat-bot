import avatar from '@/assets/images/avatar.png'
import Logo_AI from '@/assets/img/Logo-AI.png'
import { Menu } from 'lucide-react';
import { SendHorizonal } from 'lucide-react';
import { useEffect } from 'react';

const Chat2Component = ({ openMenu, setOpenMenu, handleOpenMenu }: { openMenu: string, setOpenMenu: (state: string) => void, handleOpenMenu: (state: string) => void }) => {

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
            <div className="flex flex-col items-center justify-between overflow-hidden">
                {/* <div className="text-transparent bg-clip-text bg-gradient-to-b from-blue-500 to-orange-500 p-3 rounded-lg text-4xl lg:text-8xl text-center">
                    Chào bạn, bạn muốn có cuộc trò chuyện gì?
                </div> */}
                <div className='Main-chat grid gap-y-6 w-full overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-[#585969] scrollbar-track-[#40414E]'>
                    <div className='Human-chat p-6 flex justify-center items-center'>
                        <div className='Content-chat flex items-start flex-row-reverse gap-4 w-full max-w-[450px] md:max-w-[768px]'>
                            <div className="flex items-center">
                                <img className="w-8 h-8 rounded-full mr-2 md:mr-4" src={avatar} alt="Avatar" />
                            </div>
                            <div className='w-full max-w-[450px] md:max-w-[768px] text-right'>
                                <span className='text-white'>
                                    Mỗi đoạn văn thường bắt đầu bằng một câu chủ đề hoặc một ý chính, từ đó phát triển và mở rộng ý kiến, thông tin hoặc quan điểm của tác giả. Các câu trong đoạn văn liên kết với nhau thông qua những từ nối, ví dụ như "thêm vào đó", "tuy nhiên", "do đó", để tạo sự mạch lạc và logic cho nội dung
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className='AI-chat bg-[#444654] p-6 flex justify-center items-center'>
                        <div className='Content-chat flex items-start gap-4 w-full max-w-[450px] md:max-w-[768px]'>
                            <div className="flex items-center">
                                <img className="w-8 h-8 mr-2 md:mr-4" src={Logo_AI} alt="Avatar" />
                            </div>
                            <div className='w-full max-w-[450px] md:max-w-[768px]'>
                                <span className='text-white'>
                                    Mỗi đoạn văn thường bắt đầu bằng một câu chủ đề hoặc một ý chính, từ đó phát triển và mở rộng ý kiến, thông tin hoặc quan điểm của tác giả. Các câu trong đoạn văn liên kết với nhau thông qua những từ nối, ví dụ như "thêm vào đó", "tuy nhiên", "do đó", để tạo sự mạch lạc và logic cho nội dung
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className='Human-chat p-6 flex justify-center items-center'>
                        <div className='Content-chat flex items-start flex-row-reverse gap-4 w-full max-w-[450px] md:max-w-[768px]'>
                            <div className="flex items-center">
                                <img className="w-8 h-8 rounded-full mr-2 md:mr-4" src={avatar} alt="Avatar" />
                            </div>
                            <div className='w-full max-w-[450px] md:max-w-[768px] text-right'>
                                <span className='text-white'>
                                    how laravel sanctum works? And how I can learnn sannctum quickly?
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className='AI-chat bg-[#444654] p-6 flex justify-center items-center'>
                        <div className='Content-chat flex items-start gap-4 w-full max-w-[450px] md:max-w-[768px]'>
                            <div className="flex items-center">
                                <img className="w-8 h-8 mr-2 md:mr-4" src={Logo_AI} alt="Avatar" />
                            </div>
                            <div className='w-full max-w-[450px] md:max-w-[768px]'>
                                <span className='text-white'>
                                    Token-based authentication: Sanctum leverages JSON Web Tokens (JWTs) for authentication, providing a stateless approach that is well-suited for SPAs. Cookie-based authentication: For SPAs that prefer cookie-based authentication, Sanctum supports this as well, ensuring flexibility. Personal access tokens: You can create personal access tokens for API clients or other applications that need to interact with your application on behalf of a user. Session-based authentication: Sanctum also supports traditional session-based authentication for compatibility with existing applications. Easy integration: Sanctum integrates seamlessly with Laravel's existing authentication features, making it straightforward to adopt.
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className='Human-chat p-6 flex justify-center items-center'>
                        <div className='Content-chat flex items-start flex-row-reverse gap-4 w-full max-w-[450px] md:max-w-[768px]'>
                            <div className="flex items-center">
                                <img className="w-8 h-8 rounded-full mr-2 md:mr-4" src={avatar} alt="Avatar" />
                            </div>
                            <div className='w-full max-w-[450px] md:max-w-[768px] text-right'>
                                <span className='text-white'>
                                    how laravel sanctum works? And how I can learnn sannctum quickly?
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className='AI-chat bg-[#444654] p-6 flex justify-center items-center'>
                        <div className='Content-chat flex items-start gap-4 w-full max-w-[450px] md:max-w-[768px]'>
                            <div className="flex items-center">
                                <img className="w-8 h-8 mr-2 md:mr-4" src={Logo_AI} alt="Avatar" />
                            </div>
                            <div className='w-full max-w-[450px] md:max-w-[768px]'>
                                <span className='text-white'>
                                    Token-based authentication: Sanctum leverages JSON Web Tokens (JWTs) for authentication, providing a stateless approach that is well-suited for SPAs. Cookie-based authentication: For SPAs that prefer cookie-based authentication, Sanctum supports this as well, ensuring flexibility. Personal access tokens: You can create personal access tokens for API clients or other applications that need to interact with your application on behalf of a user. Session-based authentication: Sanctum also supports traditional session-based authentication for compatibility with existing applications. Easy integration: Sanctum integrates seamlessly with Laravel's existing authentication features, making it straightforward to adopt.
                                </span>
                            </div>
                        </div>
                    </div>
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
                                <button className="text-white rounded-full border-none">
                                    <SendHorizonal size={24} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Chat2Component;
