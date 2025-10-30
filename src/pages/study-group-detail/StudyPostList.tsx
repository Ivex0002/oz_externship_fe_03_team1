import React from 'react';
import { formatTime } from './utill/timeFormat';

// BasicButton props 타입 정의
interface BasicButtonProps {
  type?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  isLoading?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  className?: string;
}

interface Post {
  title: string;
  author: string;
  date: string;
  time: string;
  attachments: number;
}

interface StudyPostListProps {
  posts: Post[];
  BasicButton: React.ComponentType<BasicButtonProps>;
}

export const StudyPostList: React.FC<StudyPostListProps> = ({ posts, BasicButton }) => {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">스터디 기록</h2>
        <BasicButton
          type="primary"
          size="small"
          className="flex items-center gap-2 !px-4 !py-2 !text-sm text-white"
        >
          <img src="/pen.svg" alt="write" className="w-4 h-4 filter invert brightness-0" />
          작성하기
        </BasicButton>
      </div>

      <div className="space-y-3">
        {posts.map((post, idx) => (
          <div key={idx} className="border border-gray-200 rounded-xl hover:border-primary-400 hover:bg-primary-50/40 cursor-pointer transition-all group">
            <div className="p-4 flex items-center justify-between">
              <h3 className="text-gray-900 text-[28px] group-hover:text-primary-700">{post.title}</h3>
              <span className="text-xs text-gray-500 font-[14px]">
                {post.date} {formatTime(post.time)}
              </span>
            </div>
            <div className="px-4 pb-4 flex items-center gap-3">
              <img src="/member.svg" alt={post.author} className="w-11 h-11 rounded-full object-cover" />
              <div className="flex-1">
                <p className="text-sm text-gray-700">{post.author}</p>
                <div className="flex items-center gap-1 text-gray-400 text-[12px] mt-1">
                  <img src="/klip.svg" alt="attachment" className="w-4 h-4 opacity-80" />
                  첨부파일 {post.attachments}개
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};