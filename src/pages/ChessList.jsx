import { Link } from 'react-router-dom'
import ChessCard from '../components/ChessCard.jsx'

export default function ChessList({ chesses }) {
  return (
    <div className='p-6'>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {chesses.map(chess => (
                <ChessCard key={chess.id} chess={chess} />
            ))}
        </div>
    </div>
  )
}