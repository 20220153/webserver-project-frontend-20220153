import { Link } from 'react-router-dom'

export default function ChessCard({ chess }) {
  const displayImage = chess.detail_images?.[0] || chess.thumbnail_image;
  return (
    // [Link] 카드 클릭 시 상세 페이지(/chess/{id})로 이동
    <Link to={`/chess/${chess.id}`} 
    className="cursor-pointer bg-white shadow-md rounded-2xl p-4 flex flex-col items-center hover:scale-105 transition-transform border border-gray-100">
      {/* 오프닝 이미지 표시 */}
      <img 
        // 몽고DB의 detail_images 배열 중 첫 번째 이미지를 썸네일로 사용
        src={displayImage} 
        alt={`${chess.name} 오프닝 이미지`}
        // Tailwind CSS: 이미지 비율 유지(object-cover) 및 스타일링
        className="w-32 h-32 mb-3 object-cover rounded-lg shadow-sm"
      />
      {/* 오프닝 이름 */}
      <div className="text-lg font-bold text-gray-800 text-center">{chess.name}</div>
      {/* ECO 코드 배지 */}
      <div className="text-sm text-indigo-500 font-semibold bg-indigo-50 px-2 py-0.5 rounded mt-1">
        {chess.eco}
      </div>
    </Link>
  )
}