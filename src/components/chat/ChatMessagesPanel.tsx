import { dummyUsers } from '@/assets/dummyData/dummyChat'
import { formatToHourMin } from '@/hooks/useFormatDate'
import { storeChat } from '@/store/storeChat'
import type { ChatMessage, ChatUser } from '@/types/Chat'
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
  const { currentSession, setMessagesAsAllRead } = storeChat()

  useEffect(() => {
    if (!currentSession) return
    setMessagesAsAllRead(currentSession)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSession])
  return (
    <>
      <ChatHeader />
      <ChatMembers />
      <ChatMessages />
      <ChatInput />
    </>
  )
}

const ChatHeader = () => {
  const { currentSession, sessions, togglePanel, setIsPanelOpen } = storeChat()
  const session = sessions.find((s) => s.id === currentSession)

  useEffect(() => {
    return () => {}
  }, [])

  const handleBack = () => {
    togglePanel()
  }

  const handlePanelClose = () => {
    setIsPanelOpen(false)
  }

  const onlineMemberCount =
    session?.member.filter((id) => {
      const user = dummyUsers.find((u) => u.id === id)
      return user?.is_online
    }).length ?? 0

  const onlineDot = clsx('w-2 h-2 rounded-full', {
    'bg-gray-300': onlineMemberCount === 0,
    'bg-[#22C55E]': onlineMemberCount !== 0,
  })

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
          <span className="text-sm font-semibold">{session?.title}</span>
          <div className="flex h-4 flex-row items-center gap-1">
            <span className={onlineDot} />
            <span className="font-roboto text-xs text-gray-600">
              {onlineMemberCount === 0
                ? `0명 온라인`
                : `${onlineMemberCount}명 온라인`}
            </span>
          </div>
        </div>
      </div>
      <div onClick={handlePanelClose} className={closeButton}>
        <X className="text-gray-400" size={16} />
      </div>
    </div>
  )
}

const ChatMembers = () => {
  const { currentSession, sessions } = storeChat()
  const session = sessions.find((s) => s.id === currentSession)
  const membersRef = useRef<HTMLDivElement>(null)

  const members: ChatUser[] =
    session?.member
      .map((userId) => dummyUsers.find((user) => user.id === userId))
      .filter((user): user is ChatUser => user !== undefined) ?? []

  const handleWheel = (e: React.WheelEvent) => {
    if (membersRef.current) {
      membersRef.current.scrollLeft += e.deltaY
    }
  }

  return (
    <div
      ref={membersRef}
      onWheel={handleWheel}
      className="transparent-scrollbar-x h-[41px] border-b border-gray-200 bg-gray-50 px-2"
    >
      <div className="inline-flex h-full flex-row items-center gap-2">
        {members.map((el, idx) => (
          <Member member={el} isMe={idx === 0} key={el.id} />
        ))}
      </div>
    </div>
  )
}

const Member = ({ member, isMe }: { member: ChatUser; isMe: boolean }) => {
  const onlineDot = clsx('w-2 h-2 rounded-full', {
    'bg-gray-300': !member.is_online,
    'bg-[#4ADE80]': member.is_online,
  })

  const nickName = clsx('text-xs font-roboto center-center whitespace-nowrap', {
    'text-primary-600': isMe,
    'text-gray-700': !isMe,
  })

  return (
    <div className="flex h-6 flex-row items-center gap-1 rounded-full bg-white px-2 py-1">
      <span className={onlineDot} />
      <span className={nickName}>{member.nickName}</span>
    </div>
  )
}

const ChatMessages = () => {
  const { currentSession, messages } = storeChat()
  const messageArr = messages.filter((el) => el.session_id === currentSession)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: 'smooth',
      })
    }
  }, [messageArr.length])

  return (
    <div
      ref={containerRef}
      className="transparent-scrollbar h-[217px] w-full p-3"
    >
      {messageArr.map((el) => (
        <Message message={el} key={el.id} />
      ))}
    </div>
  )
}

const Message = ({ message }: { message: ChatMessage }) => {
  const { currentSession, sessions } = storeChat()
  const session = sessions.find((s) => s.id === currentSession)
  const isMe = session?.member[0] === message.sender

  const sender = dummyUsers.find((el) => el.id === message.sender)

  const messageItem = clsx('flex gap-1 flex-col mb-3', {
    'items-end': isMe,
    'items-start': !isMe,
  })

  const grayStyle = clsx('font-roboto text-xs text-gray-500')

  const borderRadiusStyle = isMe
    ? { borderBottomRightRadius: 2 }
    : { borderBottomLeftRadius: 2 }

  const messageContent = clsx(
    'flex items-start rounded-lg px-3 py-2 font-roboto text-sm',
    {
      'bg-primary-500 text-white': isMe,
      'bg-gray-100 text-gray-900': !isMe,
    }
  )

  return (
    <div className={messageItem}>
      <div className={grayStyle}>{isMe ? '' : sender?.nickName}</div>
      <div className={messageContent} style={borderRadiusStyle}>
        {message.content}
      </div>
      <span className={grayStyle}>{formatToHourMin(message.created_at)}</span>
    </div>
  )
}

const ChatInput = () => {
  const { currentSession, addMessage, sessions } = storeChat()
  const session = sessions.find((s) => s.id === currentSession)
  const me = session?.member[0]
  const ref = useRef<HTMLTextAreaElement>(null)
  const [text, setText] = useState('')
  const [height, setHeight] = useState(38)

  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.style.height = 'auto'
      setHeight(ref.current.scrollHeight)
    }
  }, [text])

  const handleSubmit = () => {
    try {
      addMessage({
        id: Date.now(),
        session_id: currentSession,
        sender: me,
        content: text,
        created_at: new Date().toISOString(),
        is_read: true,
      } as ChatMessage)
    } catch (error) {
      toast.error(`메시지 전송 중 에러가 발생했습니다:${error}`)
    } finally {
      setText('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
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
        onKeyDown={handleKeyDown}
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
