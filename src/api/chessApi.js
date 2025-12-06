import axios from 'axios'

// 백엔드 스프링 부트 주소로 설정
const api = axios.create({
  baseURL: 'http://localhost:8080/api/chess',
})

// 1. 모든 체스 오프닝 목록 가져오기
export const getChessList = async () => {
  const res = await api.get('')
  return res.data
}

// 2. 특정 ID의 오프닝 상세 정보 가져오기
export const getChessDetail = async (id) => {
  const res = await api.get(`/${id}`)
  return res.data
}