import { FormEvent, useEffect, useRef, useState } from "react"


export const useHome = () => {
  const [room, setRoom] = useState("")
  const [user, setUser] = useState<number>()
  const [messages, setMessages] = useState<{ message: string; userNo: number | undefined }[]>([])
  const wsRef = useRef<WebSocket>();
  const inputRef = useRef<HTMLInputElement>(null);

  const onSubmitHandler = (e:FormEvent) => {
    e.preventDefault()
    wsRef.current?.send(JSON.stringify({type: "message", message: inputRef.current?.value}))
    if (inputRef.current) {
      const inputVal: string = inputRef.current?.value
      setMessages(prev => [...prev, {message: inputVal, userNo: user}])
      inputRef.current.value = ""; // Clear the input field
    }
  }
  
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    wsRef.current = ws

    ws.onmessage = e => {
        const parsedMessage = JSON.parse(e.data)
        
        
        if(parsedMessage.type == "room"){
            setRoom(parsedMessage.id)
            setUser(parsedMessage.userNo)
        }

        if(parsedMessage.type == "message"){
            setMessages(prev => [...prev, {message: parsedMessage.message, userNo: user}])
        }
    }

    return () => {
        ws.close()
    }
  }, [])

  return {room, user, messages, onSubmitHandler, inputRef}
}