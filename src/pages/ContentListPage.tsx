import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { ContentListResponseDto } from '../types/content';

const ContentListPage: React.FC = () => {
    const navigate = useNavigate();
    const [data, setData] = useState<ContentListResponseDto | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [page, setPage] = useState<number>(0);

    // Filter States
    const [filterLevel, setFilterLevel] = useState<string>('');
    const [filterTopic, setFilterTopic] = useState<string>('');
    const [sortOrder, setSortOrder] = useState<string>('최신순');

    const JLPT_LEVELS = ['N1', 'N2', 'N3', 'N4', 'N5'];
    const TOPICS = [
        "인사말", "자기소개", "가족", "취미", "음식", "여행",
        "쇼핑", "날씨", "건강", "업무 대화", "문법", "한자",
        "관용구", "속담", "축제와 명절", "일상 회화", "비즈니스 일본어"
    ];

    useEffect(() => {
        fetchContents(page);
    }, [page, filterLevel, filterTopic, sortOrder]);

    const fetchContents = async (pageNumber: number) => {
        setLoading(true);
        setError('');
        try {
            const params = new URLSearchParams();
            params.append('page', pageNumber.toString());
            params.append('size', '8');
            if (filterLevel) params.append('jlptLevel', filterLevel);
            if (filterTopic) params.append('topic', filterTopic);
            if (sortOrder) params.append('sortOrder', sortOrder);

            const response = await api.get<ContentListResponseDto>(`/api/contents/list?${params.toString()}`);
            setData(response.data);
        } catch (err) {
            console.error('Failed to fetch contents:', err);
            setError('콘텐츠 목록을 불러오는데 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    const formatDateForUrl = (dateString: string): string => {
        return dateString.split('T')[0].replace(/-/g, '');
    };

    const handleCardClick = (createdAt: string) => {
        const date = formatDateForUrl(createdAt);
        navigate(`/contents/${date}`);
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Reset page when filters change
    useEffect(() => {
        setPage(0);
    }, [filterLevel, filterTopic, sortOrder]);

    return (
        <div className="fade-in">
            {/* Hero Section */}
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <h2 className="text-gradient" style={{ fontSize: '3rem', marginBottom: '10px' }}>
                    일본어 학습 콘텐츠
                </h2>
                <p style={{ color: '#636e72' }}>매일매일 쌓이는 일본어 실력!</p>
            </div>

            {/* 통합 카드 */}
            <div className="glass-panel" style={{ padding: '50px' }}>

                {/* Filter Section */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '15px',
                    marginBottom: '40px',
                    flexWrap: 'wrap'
                }}>
                    <select
                        value={filterLevel}
                        onChange={(e) => setFilterLevel(e.target.value)}
                        style={{
                            padding: '10px 20px',
                            borderRadius: '20px',
                            border: '1px solid #ddd',
                            background: 'white',
                            fontSize: '0.95rem',
                            outline: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        <option value="">모든 레벨</option>
                        {JLPT_LEVELS.map(level => (
                            <option key={level} value={level}>{level}</option>
                        ))}
                    </select>

                    <select
                        value={filterTopic}
                        onChange={(e) => setFilterTopic(e.target.value)}
                        style={{
                            padding: '10px 20px',
                            borderRadius: '20px',
                            border: '1px solid #ddd',
                            background: 'white',
                            fontSize: '0.95rem',
                            outline: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        <option value="">모든 주제</option>
                        {TOPICS.map(topic => (
                            <option key={topic} value={topic}>{topic}</option>
                        ))}
                    </select>

                    <select
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                        style={{
                            padding: '10px 20px',
                            borderRadius: '20px',
                            border: '1px solid #ddd',
                            background: 'white',
                            fontSize: '0.95rem',
                            outline: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        <option value="최신순">최신순</option>
                        <option value="등록일순">등록일순</option>
                    </select>
                </div>

                {/* 구분선 */}
                <div style={{
                    height: '1px',
                    background: 'linear-gradient(to right, transparent, rgba(108, 92, 231, 0.2), transparent)',
                    margin: '40px 0'
                }} />

                {/* 에러 처리 */}
                {error && (
                    <div style={{
                        padding: '30px',
                        color: '#e84393',
                        textAlign: 'center',
                        marginBottom: '30px',
                        background: 'rgba(232, 67, 147, 0.05)',
                        borderRadius: '16px'
                    }}>
                        <h3>오류 발생</h3>
                        <p>{error}</p>
                        <button className="btn-primary" onClick={() => fetchContents(page)}>다시 시도</button>
                    </div>
                )}

                {/* 로딩 처리 */}
                {loading ? (
                    <div style={{ textAlign: 'center', padding: '60px 0' }}>
                        <div style={{ fontSize: '1.2rem', color: '#636e72', fontWeight: 300 }}>콘텐츠 로딩 중...</div>
                    </div>
                ) : (
                    <>
                        {/* 리스트 그리드 */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                            gap: '25px',
                            marginBottom: '50px'
                        }}>
                            {data?.contents.map((item) => (
                                <div
                                    key={item.id}
                                    style={{
                                        cursor: 'pointer',
                                        padding: '25px',
                                        background: 'rgba(108, 92, 231, 0.03)',
                                        borderRadius: '16px',
                                        border: '1px solid rgba(108, 92, 231, 0.1)',
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        transition: 'all 0.2s'
                                    }}
                                    onClick={() => handleCardClick(item.createdAt)}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-5px)';
                                        e.currentTarget.style.boxShadow = '0 10px 30px rgba(108, 92, 231, 0.15)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = 'none';
                                    }}
                                >
                                    {/* 카드 내용 */}
                                    <div style={{ marginBottom: '15px' }}>
                                        <span style={{
                                            background: '#e0c3fc',
                                            color: '#533483',
                                            padding: '4px 12px',
                                            borderRadius: '15px',
                                            fontSize: '0.8rem',
                                            fontWeight: 'bold',
                                            marginRight: '8px'
                                        }}>{item.jlptLevel}</span>
                                        <span style={{
                                            background: '#ffeaa7',
                                            color: '#d63031',
                                            padding: '4px 12px',
                                            borderRadius: '15px',
                                            fontSize: '0.8rem',
                                            fontWeight: 'bold'
                                        }}>{item.topic}</span>
                                    </div>
                                    <h3 style={{ fontSize: '1.3rem', marginBottom: '20px', color: '#2d3436', fontWeight: 600 }}>{item.title}</h3>
                                    <div style={{
                                        marginTop: 'auto',
                                        fontSize: '0.9rem',
                                        color: '#636e72',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                        <span>{formatDateForUrl(item.createdAt)}</span>
                                        <span style={{
                                            width: '32px',
                                            height: '32px',
                                            borderRadius: '50%',
                                            background: 'rgba(108, 92, 231, 0.1)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: '#6c5ce7',
                                            fontWeight: 'bold'
                                        }}>→</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* 구분선 */}
                        <div style={{
                            height: '1px',
                            background: 'linear-gradient(to right, transparent, rgba(108, 92, 231, 0.2), transparent)',
                            margin: '40px 0'
                        }} />

                        {/* Pagination */}
                        {data && (
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', alignItems: 'center' }}>
                                <button
                                    onClick={() => handlePageChange(page - 1)}
                                    disabled={data.first}
                                    style={{
                                        width: '50px',
                                        height: '50px',
                                        borderRadius: '50%',
                                        border: 'none',
                                        background: data.first ? 'rgba(200, 200, 200, 0.2)' : 'rgba(108, 92, 231, 0.1)',
                                        color: data.first ? '#999' : '#6c5ce7',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: data.first ? 'not-allowed' : 'pointer',
                                        opacity: data.first ? 0.5 : 1,
                                        fontSize: '1.2rem',
                                        fontWeight: 'bold',
                                        transition: 'all 0.2s'
                                    }}
                                    onMouseEnter={(e) => !data.first && (e.currentTarget.style.background = 'rgba(108, 92, 231, 0.15)')}
                                    onMouseLeave={(e) => !data.first && (e.currentTarget.style.background = 'rgba(108, 92, 231, 0.1)')}
                                >
                                    ‹
                                </button>

                                <span style={{
                                    padding: '10px 25px',
                                    fontSize: '1.1rem',
                                    fontWeight: 600,
                                    color: '#2d3436',
                                    background: 'rgba(108, 92, 231, 0.05)',
                                    borderRadius: '50px'
                                }}>
                                    {data.currentPage + 1} / {data.totalPages}
                                </span>

                                <button
                                    onClick={() => handlePageChange(page + 1)}
                                    disabled={data.last}
                                    style={{
                                        width: '50px',
                                        height: '50px',
                                        borderRadius: '50%',
                                        border: 'none',
                                        background: data.last ? 'rgba(200, 200, 200, 0.2)' : 'rgba(108, 92, 231, 0.1)',
                                        color: data.last ? '#999' : '#6c5ce7',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: data.last ? 'not-allowed' : 'pointer',
                                        opacity: data.last ? 0.5 : 1,
                                        fontSize: '1.2rem',
                                        fontWeight: 'bold',
                                        transition: 'all 0.2s'
                                    }}
                                    onMouseEnter={(e) => !data.last && (e.currentTarget.style.background = 'rgba(108, 92, 231, 0.15)')}
                                    onMouseLeave={(e) => !data.last && (e.currentTarget.style.background = 'rgba(108, 92, 231, 0.1)')}
                                >
                                    ›
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default ContentListPage;
