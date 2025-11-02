// StudyRecordList.tsx
import { useState, useEffect } from 'react';
import { BasicButton } from '@/components/basicComponents/BasicButton/BasicButton';
import { formatDateTime } from '@/utils/formattedDate';
import type { StudyRecord } from '@/types/Schedule';

interface StudyRecordListProps {
  groupId: number;
}

export const StudyRecordList = ({ groupId }: StudyRecordListProps) => {
  const [records, setRecords] = useState<StudyRecord[]>([]);
  const [loading, setLoading] = useState(true);

  // 날짜 포맷 함수
  const getFormattedDate = (date: string) => formatDateTime(date);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        setRecords([
          { 
            id: 1,
            title: 'DRF 학습 정리', 
            summary: 'DRF의 주요 구성요소 요약',
            author: { id: 7, nickname: 'oz_user' },
            created_at: '2025-10-15T14:04:00Z'
          },
          { 
            id: 2,
            title: 'S3 업로드 트러블슈팅', 
            summary: 'SignatureDoesNotMatch 오류 해결 과정',
            author: { id: 8, nickname: 'oz_user2' },
            created_at: '2025-10-15T14:10:00Z'
          },
        ]);
      } catch (error) {
        console.error('Failed to fetch records:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, [groupId]);

  const handleWriteClick = () => {};
  const handleRecordClick = (_recordId: number) => {};

  if (loading) {
    return <div className="rounded-xl border border-gray-100 bg-white p-6">로딩 중...</div>;
  }

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">스터디 기록</h2>
        <BasicButton
          variant="primary"
          size="small"
          className="flex items-center gap-2 !px-4 !py-2 !text-sm text-white"
          onClick={handleWriteClick}
        >
          <img src="/pen.svg" alt="write" className="w-4 h-4 filter invert brightness-0" />
          작성하기
        </BasicButton>
      </div>

      <div className="space-y-3">
        {records.map((record) => (
          <div 
            key={record.id} 
            className="border border-gray-200 rounded-xl hover:border-primary-400 hover:bg-primary-50/40 cursor-pointer transition-all group"
            onClick={() => handleRecordClick(record.id)}
          >
            <div className="p-4 flex items-center justify-between">
              <h3 className="text-gray-900 text-[28px] group-hover:text-primary-700">
                {record.title}
              </h3>
              <span className="text-xs text-gray-500 font-[14px]">
                {getFormattedDate(record.created_at)} {/* ✅ 포맷 함수만 호출 */}
              </span>
            </div>

            <div className="px-4 pb-4 flex items-center gap-3">
              <img 
                src="/member.svg" 
                alt={record.author.nickname} 
                className="w-11 h-11 rounded-full object-cover" 
              />
              <div className="flex-1">
                <p className="text-sm text-gray-700">{record.author.nickname}</p>
                <p className="text-xs text-gray-500 mt-1">{record.summary}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
