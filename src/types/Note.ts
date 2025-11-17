export type NoteFile = {
  type: string
  url: string
  filename: string | null
}

type NoteAuthor = {
  id: number
  nickname: string
  profile_image_url: string
}

export type Note = {
  id: number
  group_id: string
  title: string
  author: NoteAuthor
  content: string
  attachments: NoteFile[]
  ai_summary: string
  created_at: string
  updated_at: string
}
