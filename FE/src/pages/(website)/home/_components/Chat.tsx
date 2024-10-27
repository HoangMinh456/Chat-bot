import avatar from '@/assets/images/avatar.png'
import { SendHorizonal } from 'lucide-react';

const ChatComponent=()=> {
  return (
    <div className="h-screen bg-[#343541] flex flex-col">
      {/* Header */}
      <div className="bg-[#343541] p-2 md:p-4 flex items-center justify-end">
        <img className="w-8 h-8 md:w-12 md:h-12 rounded-full mr-2 md:mr-4" src={avatar} alt="Avatar" />
        <span className="text-sm md:text-base font-bold text-white">User 1</span>
      </div>

      {/* Message List */}
      <div className="flex flex-col items-center justify-center flex-grow p-4">
        <div className="flex flex-col items-center">
        <div className="text-transparent bg-clip-text bg-gradient-to-b from-blue-500 to-orange-500 p-3 rounded-lg text-4xl md:text-8xl text-center" style={{maxWidth: '90%' }}>
          Chào bạn, bạn muốn có cuộc trò chuyện gì?
        </div>
          {/* Input */}
          <div className="bg-[#343541] p-4 flex w-full justify-center">
            <div className="relative bg-[#40414E] flex-grow rounded-full p-2">
              <input type="text" className="w-full p-2 rounded-full bg-transparent placeholder-gray-400 outline-none text-white" placeholder="Enter a prompt here" />
              <button className="absolute right-0 top-0 m-3 text-white p-1 rounded-full border-none">
                <SendHorizonal size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ChatComponent;
