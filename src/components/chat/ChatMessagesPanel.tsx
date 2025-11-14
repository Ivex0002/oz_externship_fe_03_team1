import { api } from '@/api/api'
import { useAsyncEffect } from '@/hooks/useAsyncEffect'
import { formatToHourMin } from '@/hooks/useFormatDate'
import { storeChat } from '@/store/storeChat'
import { storeUser } from '@/store/storeUser'
import type { ChatMessage } from '@/types/Chat'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import { ArrowLeft, Send, X } from 'lucide-react'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'

// TODO
// 1. 현재 사용자가 누구인지 파악하는 로직이 없음
//    더미데이터의 세션 첫번째 유저가 사용자인것으로 가정하고 작성함
//    추후에 수정 필요
export const ChatMessagesPanel = () => {
  const { currentChatRoomUUID } = storeChat()

  useEffect(() => {
    if (!currentChatRoomUUID) return
  }, [currentChatRoomUUID])
  return (
    <>
      <GETChatMessages currentChatRoomUUID={currentChatRoomUUID} />
      <ChatHeader />
      {/* <ChatMembers /> */}
      <ChatMessages />
      <ChatInput />
    </>
  )
}

const GETChatMessages = ({
  currentChatRoomUUID,
}: {
  currentChatRoomUUID: string | null
}) => {
  const { setMessages } = storeChat()
  useAsyncEffect({
    asyncFn: async () => {
      if (!currentChatRoomUUID) return
      return await api.v1.chat.chatrooms(currentChatRoomUUID).messages.GET()
    },
    onSuccess: (data) => data && setMessages(data.data.messages),
    deps: [],
  })
  return null
}

const ChatHeader = () => {
  const { currentChatRoomUUID, chatRooms, togglePanel, setIsPanelOpen } =
    storeChat()
  const currentChatRoom = chatRooms.find((s) => s.uuid === currentChatRoomUUID)

  useEffect(() => {
    return () => {}
  }, [])

  const handleBack = () => {
    togglePanel()
  }

  const handlePanelClose = () => {
    setIsPanelOpen(false)
  }

  // const onlineMemberCount =
  //   session?.member.filter((id) => {
  //     const user = dummyUsers.find((u) => u.id === id)
  //     return user?.is_online
  //   }).length ?? 0

  // const onlineDot = clsx('w-2 h-2 rounded-full', {
  //   'bg-gray-300': onlineMemberCount === 0,
  //   'bg-[#22C55E]': onlineMemberCount !== 0,
  // })

  const closeButton = clsx(
    'center-center h-8 w-8 cursor-pointer rounded-md transition-colors hover:bg-gray-100'
  )

  return (
    <div className="flex h-[62px] w-full flex-row justify-between border-b border-gray-200 bg-gray-50 p-3 pb-[13px]">
      <div className="flex flex-row">
        <div className={closeButton} onClick={handleBack}>
          <ArrowLeft className="text-gray-600" size={20} />
        </div>
        <div className="flex h-9 flex-col pl-2">
          <span className="text-sm font-semibold">{currentChatRoom?.name}</span>
          <div className="flex h-4 flex-row items-center gap-1">
            {/* <span className={onlineDot} />
            <span className="font-roboto text-xs text-gray-600">
              {onlineMemberCount === 0
                ? `0명 온라인`
                : `${onlineMemberCount}명 온라인`}
            </span> */}
          </div>
        </div>
      </div>
      <div onClick={handlePanelClose} className={closeButton}>
        <X className="text-gray-400" size={16} />
      </div>
    </div>
  )
}

// const ChatMembers = () => {
//   const {  currentChatRoomUUID,  chatRooms } =
//     storeChat()
//   const session = chatRooms.find((s) => s.uuid === currentChatRoomUUID)
//   const membersRef = useRef<HTMLDivElement>(null)

//   const members: ChatUser[] =
//     session?.member
//       .map((userId) => dummyUsers.find((user) => user.id === userId))
//       .filter((user): user is ChatUser => user !== undefined) ?? []

//   const handleWheel = (e: React.WheelEvent) => {
//     if (membersRef.current) {
//       membersRef.current.scrollLeft += e.deltaY
//     }
//   }

//   return (
//     <div
//       ref={membersRef}
//       onWheel={handleWheel}
//       className="transparent-scrollbar-x h-[41px] border-b border-gray-200 bg-gray-50 px-2"
//     >
//       <div className="inline-flex h-full flex-row items-center gap-2">
//         {members.map((el, idx) => (
//           <Member member={el} isMe={idx === 0} key={el.id} />
//         ))}
//       </div>
//     </div>
//   )
// }

// const Member = ({ member, isMe }: { member: ChatUser; isMe: boolean }) => {
//   const onlineDot = clsx('w-2 h-2 rounded-full', {
//     'bg-gray-300': !member.is_online,
//     'bg-[#4ADE80]': member.is_online,
//   })

//   const nickName = clsx('text-xs font-roboto center-center whitespace-nowrap', {
//     'text-primary-600': isMe,
//     'text-gray-700': !isMe,
//   })

//   return (
//     <div className="flex h-6 flex-row items-center gap-1 rounded-full bg-white px-2 py-1">
//       <span className={onlineDot} />
//       <span className={nickName}>{member.nickName}</span>
//     </div>
//   )
// }

const ChatMessages = () => {
  const { messages } = storeChat()

  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: 'smooth',
      })
    }
  }, [messages.length])

  return (
    <div
      ref={containerRef}
      className="transparent-scrollbar h-[217px] w-full p-3"
    >
      {messages.map((el) => (
        <Message message={el} key={el.id} />
      ))}
    </div>
  )
}

const Message = ({ message }: { message: ChatMessage }) => {
  const { user } = storeUser()
  if (!user) return

  const isMe = message.sender.id === user?.id

  const sender = message.sender

  const messageItem = clsx('flex gap-1 flex-col mb-3', {
    'items-end': isMe,
    'items-start': !isMe,
  })

  const grayStyle = clsx('font-roboto text-xs text-gray-500')

  const borderRadiusStyle = isMe
    ? { borderBottomRightRadius: 2 }
    : { borderBottomLeftRadius: 2 }

  const messageContent = clsx(
    'flex items-start rounded-lg px-3 py-2 font-roboto text-sm break-words whitespace-pre-wrap',
    {
      'bg-primary-500 text-white': isMe,
      'bg-gray-100 text-gray-900': !isMe,
    }
  )

  return (
    <div className={messageItem}>
      <div className={grayStyle}>{isMe ? '' : sender?.nickname}</div>
      <div className={messageContent} style={borderRadiusStyle}>
        {message.content}
      </div>
      <span className={grayStyle}>{formatToHourMin(message.created_at)}</span>
    </div>
  )
}

const ChatInput = () => {
  const { addMessage } = storeChat()
  const { user } = storeUser()

  const ref = useRef<HTMLTextAreaElement>(null)
  const [text, setText] = useState('')
  const [height, setHeight] = useState(38)

  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.style.height = 'auto'
      setHeight(ref.current.scrollHeight)
    }
  }, [text])

  if (!user) return
  const me = { id: user.id, nickname: user.nickname }

  const newChat: ChatMessage = {
    id: Date.now(),
    sender: me,
    content: text,
    is_read: true,
    created_at: new Date().toISOString(),
  }

  const handleSubmit = () => {
    try {
      addMessage(newChat)
    } catch (error) {
      toast.error(`메시지 전송 중 에러가 발생했습니다:${error}`)
    } finally {
      setText('')
    }
  }

  const handleKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className="flex flex-row items-center justify-between border-t border-gray-200 bg-white p-3">
      <motion.textarea
        ref={ref}
        value={text}
        onKeyUp={handleKeyUp}
        onChange={(e) => setText(e.target.value)}
        placeholder="메시지를 입력하세요"
        animate={{ height }}
        rows={1}
        transition={{ type: 'tween', duration: 0.15 }}
        className="transparent-scrollbar max-h-[200px] w-[254px] resize-none overflow-hidden rounded-[19px] border border-gray-300 bg-white px-3 py-2 leading-5 text-gray-700 caret-gray-400 outline-none placeholder:text-gray-400"
      />
      <div
        onClick={handleSubmit}
        className="center-center h-8 w-8 cursor-pointer rounded-full bg-gray-300 transition-colors hover:bg-gray-400"
      >
        <Send size={20} className="text-white" />
      </div>
    </div>
  )
}
