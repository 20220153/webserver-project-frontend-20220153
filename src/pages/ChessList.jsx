import { useState } from 'react'
import ChessCard from '../components/ChessCard.jsx'

export default function ChessList({ chesses }) {
  // [State] 검색어 상태 관리
  const [searchTerm, setSearchTerm] = useState("")
  // [State] 선택된 태그 상태 관리 (null이면 전체 보기)
  const [selectedTag, setSelectedTag] = useState(null)
  // [State] 태그 목록 더보기/접기 상태 관리
  const [isTagsExpanded, setIsTagsExpanded] = useState(false)

  // 데이터가 로드되지 않았을 경우 예외 처리
  if (!chesses) return null;

  // [데이터 가공] 모든 오프닝에서 태그를 추출하여 중복 제거 후 정렬
  const allTags = Array.from(new Set(chesses.flatMap(chess => chess.tags || []))).sort();

  // [UI 로직] 태그 목록을 기본 5개만 보여주고, 확장 시 전체 보여주기
  const VISIBLE_TAG_COUNT = 5;
  const visibleTags = isTagsExpanded ? allTags : allTags.slice(0, VISIBLE_TAG_COUNT);

  // [필터링 로직] 검색어와 태그 조건을 모두 만족하는 오프닝만 추출
  const filteredChesses = chesses.filter(chess => {
    // 검색어 조건: 이름(name) 또는 ECO 코드에 검색어가 포함되는지 (대소문자 무시)
    const matchesSearch = 
      chess.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chess.eco.toLowerCase().includes(searchTerm.toLowerCase());
    // 태그 조건: 선택된 태그가 있다면 해당 태그를 포함하고 있는지 확인
    const matchesTag = selectedTag ? chess.tags?.includes(selectedTag) : true;
    
    // 두 조건 모두 만족해야 함 (AND 조건)
    return matchesSearch && matchesTag;
  });

  // [분류 로직] 필터링된 결과를 첫 수(e4, d4)에 따라 그룹화
  const e4Openings = filteredChesses.filter(chess => chess.moves_san && chess.moves_san[0] === 'e4');
  const d4Openings = filteredChesses.filter(chess => chess.moves_san && chess.moves_san[0] === 'd4');
  // e4, d4가 아닌 나머지 오프닝 그룹
  const otherOpenings = filteredChesses.filter(chess => 
    !chess.moves_san || (chess.moves_san[0] !== 'e4' && chess.moves_san[0] !== 'd4')
  );

  // 섹션 렌더링 헬퍼 함수
  const renderSection = (title, items, icon) => {
    if (items.length === 0) return null; // 데이터 없으면 렌더링 안 함
    return (
      <div className="mb-12 animate-fade-in-up">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-gray-200 pb-2 flex items-center">
          <span className="mr-2">{icon}</span> {title} 
          <span className="ml-2 text-sm font-normal text-gray-500">({items.length})</span>
        </h2>
        {/* 그리드 레이아웃: 화면 크기에 따라 열 개수 조정 (반응형) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {items.map(chess => (
            <ChessCard key={chess.id} chess={chess} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className='p-6 max-w-7xl mx-auto'>
      <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-900">♟️ 체스 오프닝 도감</h1>
      
      {/* 검색 및 태그 필터 영역 */}
      <div className="mb-10 max-w-4xl mx-auto space-y-6">
        {/* 검색 입력창 */}
        <div className="relative">
          <input 
            type="text" 
            placeholder="오프닝 이름이나 코드(ECO)를 검색해보세요 (예: 갬빗, B20)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-4 pl-12 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-lg"
          />
          <svg className="w-6 h-6 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>

        {/* 태그 버튼 목록 */}
        <div className="flex flex-col items-center gap-3">
            <div className="flex flex-wrap justify-center gap-2">
                <button
                    onClick={() => setSelectedTag(null)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 border
                    ${selectedTag === null 
                        ? 'bg-gray-800 text-white border-gray-800' 
                        : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100'}`}
                >
                    ALL
                </button>

                {visibleTags.map((tag, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                        className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 border
                        ${selectedTag === tag 
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-md transform scale-105' 
                            : 'bg-white text-indigo-600 border-indigo-100 hover:bg-indigo-50'}`}
                    >
                        #{tag}
                    </button>
                ))}
            </div>

            {/* 태그 더보기/접기 버튼 */}
            {allTags.length > VISIBLE_TAG_COUNT && (
                <button 
                    onClick={() => setIsTagsExpanded(!isTagsExpanded)}
                    className="text-sm font-medium text-gray-500 hover:text-indigo-600 flex items-center mt-2"
                >
                    {isTagsExpanded ? (
                        <>접기 <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" /></svg></>
                    ) : (
                        <>더 많은 태그 보기 ({allTags.length - VISIBLE_TAG_COUNT}+) <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg></>
                    )}
                </button>
            )}
        </div>
      </div>

      {/* 검색 결과가 없을 때 메시지 표시 */}
      {filteredChesses.length === 0 && (
        <div className="text-center py-20">
            <p className="text-2xl text-gray-400 font-bold mb-2">검색 결과가 없습니다 😢</p>
            <button 
                onClick={() => {setSearchTerm(""); setSelectedTag(null)}}
                className="mt-4 text-indigo-600 hover:underline"
            >
                필터 초기화
            </button>
        </div>
      )}

      {/* 필터링된 데이터를 섹션별로 렌더링 */}
      {renderSection("King's Pawn (e4) - 공격적/전술적", e4Openings, "🔥")}
      {renderSection("Queen's Pawn (d4) - 전략적/견고함", d4Openings, "🛡️")}
      {renderSection("Flank & Others - 측면/변칙", otherOpenings, "🦄")}
    </div>
  )
}