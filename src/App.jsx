import { Routes, Route } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import ChessList from './pages/ChessList.jsx'
import ChessDetail from './pages/ChessDetail.jsx'
import { getChessList } from './api/chessApi.js'

function App() {
  // [React Query] 서버 상태 관리
  // 'chesses' 키로 캐싱되며, getChessList 함수를 통해 데이터를 비동기로 가져옴
  const { data: chesses, isLoading, isError, error } = useQuery({
    queryKey: ['chesses'],
    queryFn: getChessList
  })

  // 로딩 상태 처리: 데이터가 도착하기 전까지 로딩 문구 표시
  if (isLoading) {
    return <p className="text-center mt-10">Loading...</p>
  }

  // 에러 상태 처리: 통신 실패 시 에러 메시지 표시
  if (isError) {
    return <p className="text-center mt-10">오류 발생: {error.message}</p>
  }
  
  return (
    // [라우팅 설정] URL 경로에 따라 보여줄 컴포넌트 결정
    <Routes>
      {/* 메인 경로(/) 접속 시 ChessList 컴포넌트 렌더링 (데이터 props 전달) */}
      <Route path="/" element={<ChessList chesses={chesses} />} />
      
      {/* 상세 경로(/chess/:id) 접속 시 ChessDetail 컴포넌트 렌더링 */}
      <Route path="/chess/:id" element={<ChessDetail chesses={chesses} />} />
    </Routes>
  )
}

export default App