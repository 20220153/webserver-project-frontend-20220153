import { useParams, Link } from 'react-router-dom'
const chess ={
    "id": "1",
    "eco": "C50",
    "name": "이탈리안 게임",
    "thumbnail_image": "https://placehold.co/600x400/orange/white?text=Italian+Game"
  }

// 태그를 뱃지 형태로 렌더링하는 함수 (별점 대신 사용)
const renderTags = (tags) => {
  return (
    <div className="flex justify-center items-center space-x-2 mb-4">
      {tags.map((tag, index) => (
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

// 수순(Moves)을 보기 좋게 렌더링하는 함수
const renderMoves = (moves) => {
  return (
    <div className="bg-gray-800 text-gray-100 p-6 rounded-xl shadow-inner font-mono text-sm leading-relaxed tracking-wide">
      <div className="grid grid-cols-2 gap-y-2 gap-x-4">
        {moves.map((move, index) => {
          // 2수(백/흑)씩 묶어서 보여주거나, 단순히 나열
          // 여기서는 백/흑 구분을 위해 짝수 인덱스일 때 앞에 번호를 붙임
          if (index % 2 === 0) {
            return (
              <div key={index} className="col-span-2 sm:col-span-1 border-b border-gray-700 pb-1">
                <span className="text-gray-400 mr-2">{(index / 2) + 1}.</span>
                <span className="font-bold text-white mr-2">{move}</span>
                {moves[index + 1] && <span className="text-gray-300">{moves[index + 1]}</span>}
              </div>
            )
          }
          return null // 홀수 인덱스는 위에서 처리했으므로 렌더링 안 함
        })}
      </div>
    </div>
  )
}

const ChessDetail = ({ chesses }) => {
  const { id } = useParams();
  // 2. chesses가 비어있을 때를 대비한 안전장치 추가
  if (!chesses || chesses.length === 0) {
    return <div className="p-10 text-center">데이터를 불러오는 중이거나 없습니다...</div>
  }
  // URL의 id와 일치하는 체스 오프닝 찾기
  const chess = chesses.find(c => c.id === id);

  // 데이터가 없을 경우 처리 (새로고침 직후 등)
  if (!chess) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="text-xl text-gray-500">데이터를 찾을 수 없습니다.</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex justify-center py-12">
      <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-2xl w-full border border-white">
        
        {/* 1. 상단 태그 영역 (별점 위치 대체) */}
        {renderTags(chess.tags)}

        {/* 2. 이미지 영역 */}
        <div className="flex justify-center mb-8 relative">
          {/* 배경 장식 효과 */}
          <div className="absolute inset-0 bg-indigo-500 rounded-full blur-3xl opacity-10 transform scale-75"></div>
          
          <img 
            // src={chess.detail_images && chess.detail_images.length > 0 
            //       ? chess.detail_images[0] 
            //       : chess.thumbnail_image}
            src = {`https://picsum.photos/128/128?random=${chess.id}`}
            alt={`${chess.name} 체스판`}
            className="relative w-64 h-64 object-cover rounded-2xl shadow-2xl border-4 border-white transform hover:scale-105 transition duration-500 ease-in-out z-10"
          />
        </div>

        {/* 3. 제목 및 설명 영역 */}
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

        {/* 4. 설명 텍스트 (가사 위치 대체) */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-800 mb-3 ml-1">📖 오프닝 설명</h3>
          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
            <p className="text-gray-600 whitespace-pre-wrap leading-relaxed">
              {chess.description}
            </p>
          </div>
        </div>

        {/* 5. 수순 리스트 (추가된 부분) */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-800 mb-3 ml-1">♟️ 주요 수순 (Main Line)</h3>
          {renderMoves(chess.moves_san)}
        </div>

        {/* 6. 돌아가기 버튼 */}
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
  );
};

export default ChessDetail