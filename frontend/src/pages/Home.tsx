import { useHome } from "../hooks/useHome"
import ArrowIcon from "../icons/ArrowIcon"
import ChatIcon from "../icons/ChatIcon"


const Home = () => {
  const {room, user, messages, onSubmitHandler, inputRef} = useHome()

  return (
    <div className="min-h-svh bg-slate-900 text-slate-100 font-roboto grid place-content-center">
        <div className="sm:border p-5 rounded-2xl md:w-[90svw] lg:w-[900px] xl:w-[70svw] 2xl:w-[1300px]">
            <header className="mb-5">
                <div className="flex gap-2 items-center mb-1">
                    <ChatIcon className="h-[32px] w-[32px] lg:h-[36px] lg:w-[36px]" />
                    <h1 className="text-lg lg:text-xl">Real-Time Chat App</h1>
                </div>
                <h2 className="text-slate-300 mb-5 lg:mb-7">Temporary room, expires after both users exit</h2>
                <div className="text-sm lg:text-base flex justify-between bg-slate-600 p-3 rounded-md">
                    <p>Room ID: <span>{room}</span></p>
                    <p>Users: <span>{user} / 2</span></p>
                </div>
            </header>
            <main className="h-[65svh] border rounded-md mb-5 p-5 overflow-y-scroll space-y-5 lg:space-y-7">
                {messages.map((message, idx) => {
                    if(message.userNo != user){
                        return <div key={idx} className={`flex justify-start`}>
                            <span className={`bg-white text-black p-3 rounded-lg lg:text-lg`}>{message.message}</span>
                        </div>
                    }else{
                        return <div key={idx} className={`flex justify-end`}>
                            <span className={`bg-zinc-600 text-white p-3 rounded-lg lg:text-lg`}>{message.message}</span>
                        </div>
                    }
                })}
            </main>
            <footer>
                <form className="flex justify-center" onSubmit={onSubmitHandler}>
                    <input ref={inputRef} type="text" placeholder="Type a message..." className="outline-none w-full 2xl:w-[70%] p-2 border rounded-l-md lg:p-3 lg:text-lg"/>
                
                    <button type="submit" className="p-3 bg-white text-black rounded-r-md active:scale-125 transition-all cursor-pointer">
                        <ArrowIcon className="w-[24px] lg:w-[32px]" />
                    </button>
                </form>
            </footer>
        </div>
    </div>
  )
}

export default Home