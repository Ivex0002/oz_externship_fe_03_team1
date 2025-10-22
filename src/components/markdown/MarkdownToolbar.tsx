import type { RefObject } from 'react'
import {
  Bold,
  Italic,
  Code2,
  Link as LinkIcon,
  Heading1,
  List,
} from 'lucide-react'

interface MarkdownToolbarProps {
  textareaRef: RefObject<HTMLTextAreaElement | null>
  onUpdate: (newValue: string) => void
}

export default function MarkdownToolbar({
  textareaRef,
  onUpdate,
}: MarkdownToolbarProps) {
  const wrapSelectedText = (wrapper: string, closingWrapper?: string) => {
    const textarea = textareaRef.current
    if (!textarea) return

    const { selectionStart, selectionEnd, value } = textarea
    const selected = value.slice(selectionStart, selectionEnd)

    const newValue = closingWrapper
      ? value.slice(0, selectionStart) +
        wrapper +
        selected +
        closingWrapper +
        value.slice(selectionEnd)
      : value.slice(0, selectionStart) +
        wrapper +
        selected +
        wrapper +
        value.slice(selectionEnd)

    onUpdate(newValue)

    requestAnimationFrame(() => {
      textarea.focus()
      const pos =
        selectionStart +
        wrapper.length +
        selected.length +
        (closingWrapper ? closingWrapper.length : wrapper.length)
      textarea.selectionStart = textarea.selectionEnd = pos
    })
  }

  return (
    <div className="flex items-center gap-3 text-gray-600">
      <Bold
        size={18}
        className="cursor-pointer hover:text-amber-500"
        onClick={() => wrapSelectedText('**')}
      />
      <Italic
        size={18}
        className="cursor-pointer hover:text-amber-500"
        onClick={() => wrapSelectedText('*')}
      />
      <Code2
        size={18}
        className="cursor-pointer hover:text-amber-500"
        onClick={() => wrapSelectedText('`')}
      />
      <LinkIcon
        size={18}
        className="cursor-pointer hover:text-amber-500"
        onClick={() => wrapSelectedText('[', '](URL)')}
      />
      <Heading1
        size={18}
        className="cursor-pointer hover:text-amber-500"
        onClick={() => wrapSelectedText('## ')}
      />
      <List
        size={18}
        className="cursor-pointer hover:text-amber-500"
        onClick={() => wrapSelectedText('- ')}
      />
    </div>
  )
}
