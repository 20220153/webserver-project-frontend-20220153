import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import ChessList from './pages/ChessList.jsx'
import ChessDetail from './pages/ChessDetail.jsx'
// import {getChessList} from './api/chessApi.jsx'

const chesses = [
  {
    "id": "69319c3715dc7baadd6da90c",
    "eco": "C50",
    "name": "이탈리안 게임",
    "variation": "Giuoco Piano",
    "thumbnail_image": "https://placehold.co/600x400/orange/white?text=Italian+Game",
    "detail_images": [
      "https://fen-to-image.com/image/r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R"
    ],
    "description": "가장 오래되고 기본적인 오프닝 중 하나입니다. 백은 비숍을 c4로 전개하여 흑의 약점인 f7 칸을 노리며 중앙을 통제합니다.",
    "moves_san": [
      "e4",
      "e5",
      "Nf3",
      "Nc6",
      "Bc4"
    ],
    "fen": "r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3",
    "tags": [
      "Open Game",
      "Strategic",
      "Beginner Friendly"
    ]
  },
  {
    "id": "69319c3715dc7baadd6da90d",
    "eco": "C60",
    "name": "루이 로페즈",
    "variation": "Main Line",
    "thumbnail_image": "https://placehold.co/600x400/blue/white?text=Ruy+Lopez",
    "detail_images": [
      "https://fen-to-image.com/image/r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R"
    ],
    "description": "그랜드마스터 레벨에서 가장 인기 있는 오프닝입니다. 백이 비숍으로 흑의 나이트를 압박하며 간접적으로 중앙 싸움에서 우위를 점하려 합니다.",
    "moves_san": [
      "e4",
      "e5",
      "Nf3",
      "Nc6",
      "Bb5"
    ],
    "fen": "r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3",
    "tags": [
      "Open Game",
      "Classic",
      "Complex"
    ]
  }
]

function App() {
  // const [chesses, setChesses] = useState([])

  // useEffect(() => {
  //   const fetchChesses = async () => {
  //     try {
  //       const data = await getChessList()
  //       setSongs(data)
  //     } catch (err) {
  //       console.error("Failed to fetch songs:", err)
  //     }
  //   }

  //   fetchSongs()
  // }, [])
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ChessList chesses={chesses} />} />
        <Route path="/chess/:id" element={<ChessDetail chesses={chesses} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App