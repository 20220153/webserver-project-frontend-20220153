import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getChessDetail } from '../api/chessApi.js'


const renderTags = (tags) => {
  const safeTags = tags || []
  return (
    <div className="flex justify-center items-center space-x-2 mb-4">
      {safeTags.map((tag, index) => (
        <span 
          key={index} 
          className="px-3 py-1 bg-indigo-100 text-indigo-700 text-sm font-semibold rounded-full shadow-sm"
        >
          #{tag}
        </span>
      ))}
    </div>
  )
}

const renderMoves = (moves) => {
  const safeMoves = moves || []
  return (
    <div className="bg-gray-800 text-gray-100 p-6 rounded-xl shadow-inner font-mono text-sm leading-relaxed tracking-wide">
      <div className="grid grid-cols-2 gap-y-2 gap-x-4">
        {safeMoves.map((move, index) => {
          if (index % 2 === 0) {
            return (
              <div key={index} className="col-span-2 sm:col-span-1 border-b border-gray-700 pb-1">
                <span className="text-gray-400 mr-2">{(index / 2) + 1}.</span>
                <span className="font-bold text-white mr-2">{move}</span>
                {safeMoves[index + 1] && <span className="text-gray-300">{safeMoves[index + 1]}</span>}
              </div>
            )
          }
          return null
        })}
      </div>
    </div>
  )
}

const ChessDetail = () => {
  const { id } = useParams()

  const { data: chess, isLoading, isError, error } = useQuery({
    queryKey: ['chess', id],
    queryFn: () => getChessDetail(id),
    enabled: !!id,
  })

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <p className="text-xl text-indigo-600 font-bold animate-pulse">데이터를 불러오는 중...</p>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <p className="text-red-500 font-bold">오류 발생: {error.message}</p>
      </div>
    )
  }

  if (!chess) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="text-xl text-gray-500">데이터를 찾을 수 없습니다.</div>
      </div>
    )
  }

  const boardImageSrc = (chess.detail_images && chess.detail_images.length > 0)
    ? chess.detail_images[0]
    : chess.thumbnail_image;


  return (
    <div className="min-h-screen bg-gray-50 p-6 flex justify-center py-12">
      <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-2xl w-full border border-white">
        
        {renderTags(chess.tags)}

        <div className="flex justify-center mb-8 relative">
          <div className="absolute inset-0 bg-indigo-500 rounded-full blur-3xl opacity-10 transform scale-75"></div>
          
          <img 
            src={boardImageSrc}
            alt={`${chess.name} 체스판 상황`}
            className="relative w-72 h-72 object-cover rounded-xl shadow-2xl border-4 border-white transform hover:scale-105 transition duration-500 ease-in-out z-10 bg-gray-100"
          />
        </div>

        <div className="text-center mb-8 border-b pb-8 border-gray-100">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2 leading-tight">
            {chess.name}
          </h1>
          <p className="text-xl font-medium text-indigo-600 mb-4">
            {chess.eco} {chess.variation && `- ${chess.variation}`}
          </p>

          <a
            href={`https://www.youtube.com/results?search_query=체스 ${chess.name} 강의`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-5 py-2 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
            Youtube 강의 보기
          </a>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-800 mb-3 ml-1">📖 오프닝 설명</h3>
          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
            <p className="text-gray-600 whitespace-pre-wrap leading-relaxed">
              {chess.description}
            </p>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-800 mb-3 ml-1">♟️ 주요 수순 (Main Line)</h3>
          {renderMoves(chess.moves_san)}
        </div>

        <div className="flex justify-center mt-8">
          <Link 
            to="/"
            className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-full shadow-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 transform hover:scale-105"
          >
            목록으로 돌아가기
          </Link>
        </div>
        
      </div>
    </div>
  )
}

export default ChessDetail