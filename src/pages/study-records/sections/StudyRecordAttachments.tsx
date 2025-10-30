import { ArrowDownToLine } from 'lucide-react'

export interface AttachmentsProps {
  attachments: {
    filename: string
    url: string
  }[]
}

export const StudyRecordAttachments = ({ attachments }: AttachmentsProps) => {
  return (
    <section className="mt-6">
      <div className="mb-4 flex items-center gap-2 text-gray-800">
        <img
          src="/icons/attachment.svg"
          alt="attachment"
          className="h-[15px] w-[13px]"
        />
        <h3 className="text-lg font-semibold">
          첨부 파일 ({attachments.length}개)
        </h3>
      </div>

      <div className="flex flex-wrap gap-4">
        {attachments.map((file) => (
          <div
            key={file.filename}
            className="flex min-w-[300px] flex-1 items-center justify-between rounded-lg border border-[#E5E7EB] bg-white px-4 py-[13px]"
          >
            <div className="flex items-center gap-3">
              <img
                src="/icons/file.svg"
                alt="file"
                className="h-[18px] w-[16px] opacity-70"
              />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {file.filename}
                </p>
                <p className="text-xs text-gray-500">다운로드 가능</p>
              </div>
            </div>

            <a
              href={file.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary-600 text-gray-500 transition"
            >
              <ArrowDownToLine className="h-5 w-5" strokeWidth={1.8} />
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}
