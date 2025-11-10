import {
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { MarkdownToolbar } from './MarkdownToolbar'
import { MarkdownGuide } from './MarkdownGuide'

interface MarkdownWriteProps {
  value: string
  onChange: Dispatch<SetStateAction<string>>
  placeholder?: string
}

export const MarkdownWrite = ({
  value,
  onChange,
  placeholder = '내용을 입력하세요. 마크다운 문법을 사용할 수 있습니다.',
}: MarkdownWriteProps) => {
  const [tab, setTab] = useState<'edit' | 'preview'>('edit')
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [previewValue, setPreviewValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setPreviewValue(value), 200)
    return () => clearTimeout(timer)
  }, [value])

  return (
    <div className="overflow-hidden rounded-lg border border-gray-300 bg-white">
      <div className="flex items-center justify-between border-b border-gray-200 bg-[#F9FAFB] px-4 py-2">
        <div className="flex gap-2">
          {['edit', 'preview'].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setTab(type as 'edit' | 'preview')}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition ${
                tab === type
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {type === 'edit' ? '작성' : '미리보기'}
            </button>
          ))}
        </div>
        <MarkdownToolbar textareaRef={textareaRef} onUpdate={onChange} />
      </div>

      {tab === 'edit' ? (
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="min-h-[180px] w-full resize-none bg-white p-4 text-sm text-gray-700 focus:outline-none"
        />
      ) : (
        <div className="min-h-[180px] bg-white p-4 text-sm text-gray-700">
          {previewValue.trim() ? (
            <ReactMarkdown
              remarkPlugins={[]}
              components={{
                a: ({ node, ...props }) => {
                  let href = props.href?.trim() || ''
                  const linkText = String(props.children).trim()

                  if (
                    (!href || href === 'https://' || href === 'http://') &&
                    /^(https?:\/\/|www\.)[^\s]+$/.test(linkText)
                  ) {
                    href = linkText
                  }

                  if (!/^https?:\/\//.test(href)) {
                    href = `https://${href.replace(/^\/+/, '')}`
                  }

                  const handleClick = (
                    e: React.MouseEvent<HTMLAnchorElement>
                  ) => {
                    e.preventDefault()
                    window.open(href, '_blank', 'noopener,noreferrer')
                  }

                  return (
                    <a
                      {...props}
                      href={href}
                      onClick={handleClick}
                      className="text-amber-600 hover:underline"
                    >
                      {props.children}
                    </a>
                  )
                },

                h2: ({ node: _, ...props }) => (
                  <h2
                    {...props}
                    className="my-1 text-lg font-semibold text-gray-800"
                  />
                ),
                ul: ({ children }) => (
                  <ul className="list-disc pl-6 text-gray-700">{children}</ul>
                ),
                li: ({ children }) => <li className="ml-2">{children}</li>,
                code({
                  inline,
                  className,
                  children,
                  ...props
                }: {
                  inline?: boolean
                  className?: string
                  children?: React.ReactNode
                  [key: string]: any
                }) {
                  const match = /language-(\w+)/.exec(className || '')
                  let language = match ? match[1] : undefined
                  const codeText = String(children).trim()

                  if (!language) {
                    if (/\b(type|interface|=>|<.*?>)\b/.test(codeText))
                      language = 'typescript'
                    else if (
                      /\b(const|let|var|function|return|console\.log)\b/.test(
                        codeText
                      )
                    )
                      language = 'javascript'
                    else if (/{|}/.test(codeText)) language = 'json'
                    else language = 'plaintext'
                  }

                  if (inline) {
                    return (
                      <code
                        {...props}
                        className="rounded bg-gray-100 px-1.5 py-0.5 text-[13px] text-gray-800"
                      >
                        {children}
                      </code>
                    )
                  }

                  return (
                    <div className="relative my-3">
                      <div className="absolute top-2 left-2 rounded-full bg-[#1b1f2a] px-3 py-0.5 text-[11px] font-medium text-gray-400">
                        {language}
                      </div>
                      <SyntaxHighlighter
                        {...props}
                        language={language}
                        style={oneDark}
                        PreTag="div"
                        customStyle={{
                          borderRadius: '10px',
                          padding: '36px 16px 14px 16px',
                          fontSize: '13px',
                          backgroundColor: '#0f172a',
                        }}
                      >
                        {codeText.replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    </div>
                  )
                },
              }}
            >
              {previewValue}
            </ReactMarkdown>
          ) : (
            <p className="text-gray-400">미리보기할 내용이 없습니다.</p>
          )}
        </div>
      )}

      <MarkdownGuide />
    </div>
  )
}
