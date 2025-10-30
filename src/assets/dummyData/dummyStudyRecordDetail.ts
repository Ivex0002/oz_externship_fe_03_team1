export const dummyStudyRecordDetail = {
  status: 200,
  message: '학습 기록을 성공적으로 조회했습니다.',
  data: {
    id: 42,
    title: 'React Hooks 실습 정리',
    author: {
      nickname: '김개발',
      profile_image_url: 'https://cdn.example.com/profile/42.png',
    },
    content: `
## React Hooks 학습 정리


오늘은 **React Hooks**에 대해 깊이 있게 학습했습니다.


### useState Hook
- 함수형 컴포넌트에서 상태를 관리할 수 있게 해주는 Hook
- 배열 구조분해를 통해 state값과 setter 함수를 받음


\`\`\`javascript
const [count, setCount] = useState(0);
\`\`\`


### useEffect Hook
- 컴포넌트의 생명주기를 관리
- 의존성 배열을 통해 렌더링 조건 제어


![React Hooks](/images/IMG-218.jpg)


### 실습 내용
- 카운터 앱 구현
- API 데이터 fetching
- 커스텀 Hook 작성


### 카운터 앱 구현
useState를 사용하여 간단한 카운터 앱을 만들었습니다.
증가, 감소, 리셋 기능을 구현했습니다.


### API 데이터 fetching
useEffect를 활용하여 컴포넌트 마운트 시 API에서 데이터를 가져오는 방법을 실습했습니다.


### 커스텀 Hook 작성
반복되는 로직을 커스텀 Hook으로 분리하여 재사용성을 높이는 방법을 배웠습니다.
`,
    attachments: [
      {
        filename: 'hooks-practice.zip',
        url: 'https://s3.example.com/note/42/hooks-practice.zip',
      },
      {
        filename: 'study-notes.pdf',
        url: 'https://s3.example.com/note/42/study-notes.pdf',
      },
    ],
    ai_summary: {
      title: '2025년 8월 22일 금요일 김개발님의 학습 기록 요약입니다.',
      summary:
        'React Hooks의 기본 개념을 학습하고, useState와 useEffect의 동작 원리를 실습했습니다. 간단한 카운터 앱과 데이터 fetching을 구현했습니다.',
      keywords: ['React', 'useState', 'useEffect', 'Hooks'],
      recommendations: [
        'useReducer로 복잡한 상태 관리 학습',
        'React Query를 활용한 서버 상태 관리',
      ],
    },
    created_at: '2025-08-22T13:40:00+09:00',
    updated_at: '2025-08-22T14:00:00+09:00',
  },
}
