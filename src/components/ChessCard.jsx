import { Link } from 'react-router-dom'

export default function ChessCard({ chess }) {
  return (
    <Link to={`/chess/${chess.id}`} 
    className="cursor-pointer bg-white shadow-md rounded-2xl p-4 flex flex-col items-center hover:scale-105 transition-transform">
      <img 
        src={`https://picsum.photos/100/100?random=${chess.id}`} 
        alt={`${chess.name} 앨범 이미지`}
        className="w-32 h-32 mb-2"
      />
      <div className="text-lg font-bold">{chess.name}</div>
        <div className="text-gray-500">{chess.eco}</div>
    </Link>
  )
}