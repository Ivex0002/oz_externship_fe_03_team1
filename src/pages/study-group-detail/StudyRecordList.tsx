import { useState, useEffect } from 'react';
import { BasicButton } from '@/components/basicComponents/BasicButton/BasicButton';
import type { StudyRecord } from '@/types/Schedule';
import dayjs from '@/lib/dayjs';
import { useNavigate } from 'react-router';

interface StudyRecordListProps {
  groupId: string
}

export const StudyRecordList = ({ groupId }: StudyRecordListProps) => {
  const [records, setRecords] = useState<StudyRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        setRecords([
          {
            id: 1,
            title: 'DRF 학습 정리',
            summary: 'DRF의 주요 구성요소 요약',
            author: { id: 7, nickname: 'oz_user' },
            created_at: '2025-10-15T14:04:00Z',
          },
          {
            id: 2,
            title: 'S3 업로드 트러블슈팅',
            summary: 'SignatureDoesNotMatch 오류 해결 과정',
            author: { id: 8, nickname: 'oz_user2' },
            created_at: '2025-10-15T14:10:00Z',
          },
        ])
      } catch (error) {
        console.error('Failed to fetch records:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRecords()
  }, [groupId])

  const handleWriteClick = () => {
    navigate(`/create_study_record/${groupId}`);
  };
  
  const handleRecordClick = (_recordId: number) => {};

  if (loading) {
    return (
      <div className="rounded-xl border border-gray-100 bg-white p-6">
        로딩 중...
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">스터디 기록</h2>
        <BasicButton
          variant="primary"
          size="small"
          className="flex items-center gap-2 !px-4 !py-2 !text-sm text-white cursor-pointer"
          onClick={handleWriteClick}
        >
          <img
            src="/icons/pen.svg"
            alt="write"
            className="h-4 w-4 brightness-0 invert filter"
          />
          작성하기
        </BasicButton>
      </div>

      <div className="space-y-3">
        {records.map((record) => (
          <div
            key={record.id}
            className="hover:border-primary-400 hover:bg-primary-50/40 group cursor-pointer rounded-xl border border-gray-200 transition-all"
            onClick={() => handleRecordClick(record.id)}
          >
            <div className="flex items-center justify-between p-4">
              <h3 className="group-hover:text-primary-700 text-[28px] text-gray-900">
                {record.title}
              </h3>
              <span className="text-xs font-[14px] text-gray-500">
                {dayjs(record.created_at).format('YYYY. MM. DD A HH:mm')}
              </span>
            </div>

            <div className="flex items-center gap-3 px-4 pb-4">
              <img
                src="/member.svg"
                alt={record.author.nickname}
                className="h-11 w-11 rounded-full object-cover"
              />
              <div className="flex-1">
                <p className="text-sm text-gray-700">
                  {record.author.nickname}
                </p>
                <div className="flex items-center gap-2">
                  <img
                    src="/icons/attachment.svg"
                    alt="파일 첨부"
                    className="filter: contrast-84; w-[8.5px] brightness-90 hue-rotate-182 invert-47 saturate-755 sepia-7"
                  />
                  <p className="mt-1 text-xs text-gray-500">{record.summary}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
