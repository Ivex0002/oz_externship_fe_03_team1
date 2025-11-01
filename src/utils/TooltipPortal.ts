// 스터디 그룹 상세 페이지 툴팁(리더용) 컴포넌트
import React from 'react';
import ReactDOM from 'react-dom';

interface TooltipPortalProps {
  children: React.ReactNode;
}

const modalRoot = document.getElementById('tooltip-root') || document.createElement('div');
if (!document.getElementById('tooltip-root')) {
  modalRoot.setAttribute('id', 'tooltip-root');
  document.body.appendChild(modalRoot);
}

export const TooltipPortal: React.FC<TooltipPortalProps> = ({ children }) => {
  return ReactDOM.createPortal(
    children,
    modalRoot
  );
};
// Portal의 핵심 정의 자체가 React 컴포넌트 트리의 바깥에 있는 실제 DOM 노드를 대상으로
// 삼아 렌더링하는 것이기 때문에, Portal이 렌더링될 대상 컨테이너가 존재하지 않는다면,
// 이 노드를 생성하고 문서에 붙이는 과정(즉, DOM 직접 조작)이 반드시 필요