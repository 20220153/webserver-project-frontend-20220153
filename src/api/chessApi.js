import axios from 'axios'

// Axios 인스턴스 생성 및 기본 URL 설정
// 백엔드 스프링 부트 서버 주소: http://localhost:8080/api/chess
const api = axios.create({
  baseURL: 'http://localhost:8080/api/chess',
})

// [기능 1] 모든 체스 오프닝 목록 가져오기 (GET /api/chess)
export const getChessList = async () => {
  // 엔드포인트 '/'로 GET 요청을 보냄
  const res = await api.get('')
  // 응답 데이터(JSON 배열)를 반환
  return res.data
}

// [기능 2] 특정 ID의 오프닝 상세 정보 가져오기 (GET /api/chess/{id})
export const getChessDetail = async (id) => {
  // URL 파라미터로 id를 포함하여 GET 요청 전송
  const res = await api.get(`/${id}`)
  return res.data
}

// [기능 3] 오프닝 정보 수정하기 (PUT /api/chess/{id})
export const updateChess = async (id, chessData) => {
  // 수정할 데이터를 담아 PUT 요청 전송
  const res = await api.put(`/${id}`, chessData)
  return res.data
}