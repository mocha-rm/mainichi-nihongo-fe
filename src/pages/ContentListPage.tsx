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

    // Glass Mixin
    const glassStyle = {
        background: 'rgba(255, 255, 255, 0.25)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.18)',
        borderRadius: '24px',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
    };

    const headerStyle = {
        textAlign: 'center' as const,
        marginBottom: '50px',
    };

    const titleStyle = {
        fontFamily: "'Gaegu', cursive",
        fontSize: '3.5rem',
        color: '#2d3436',
        marginBottom: '15px',
        textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
        background: 'linear-gradient(120deg, #6c5ce7, #a29bfe)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
    };

    const subtitleStyle = {
        color: '#636e72',
        fontWeight: 500,
        fontSize: '1.2rem',
    };

    const filterBarStyle = {
        ...glassStyle,
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        marginBottom: '50px',
        padding: '25px',
        flexWrap: 'wrap' as const,
    };

    const selectStyle = {
        padding: '12px 24px',
        borderRadius: '50px',
        border: '1px solid rgba(255,255,255,0.3)',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        fontSize: '1rem',
        fontWeight: 600,
        color: '#2d3436',
        outline: 'none',
        cursor: 'pointer',
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
        transition: 'all 0.3s',
        minWidth: '160px',
        appearance: 'none' as const,
    };

    const cardStyle = {
        ...glassStyle,
        padding: '30px',
        cursor: 'pointer',
        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        display: 'flex',
        flexDirection: 'column' as const,
        height: '100%',
        position: 'relative' as const,
        overflow: 'hidden',
    };

    const tagStyle = (type: 'level' | 'topic') => ({
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '6px 16px',
        borderRadius: '30px',
        fontSize: '0.9rem',
        fontWeight: 700,
        marginRight: '10px',
        backgroundColor: type === 'level' ? 'rgba(108, 92, 231, 0.15)' : 'rgba(232, 67, 147, 0.15)',
        color: type === 'level' ? '#6c5ce7' : '#e84393',
        border: `1px solid ${type === 'level' ? 'rgba(108, 92, 231, 0.2)' : 'rgba(232, 67, 147, 0.2)'}`,
    });

    return (
        <div style={{ padding: '40px 0' }}>
            <div style={headerStyle}>
                <h1 style={titleStyle}>일본어 학습 콘텐츠</h1>
                <p style={subtitleStyle}>매일매일 쌓이는 일본어 실력!</p>
            </div>

            {/* Filter Section */}
            <div style={filterBarStyle}>
                <select
                    value={filterLevel}
                    onChange={(e) => setFilterLevel(e.target.value)}
                    style={selectStyle}
                >
                    <option value="">모든 레벨</option>
                    {JLPT_LEVELS.map(level => (
                        <option key={level} value={level}>{level}</option>
                    ))}
                </select>

                <select
                    value={filterTopic}
                    onChange={(e) => setFilterTopic(e.target.value)}
                    style={selectStyle}
                >
                    <option value="">모든 주제</option>
                    {TOPICS.map(topic => (
                        <option key={topic} value={topic}>{topic}</option>
                    ))}
                </select>

                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    style={selectStyle}
                >
                    <option value="최신순">최신순</option>
                    <option value="등록일순">등록일순</option>
                </select>
            </div>

            {error && (
                <div style={{ ...glassStyle, padding: '20px', color: '#e84393', textAlign: 'center', marginBottom: '30px' }}>
                    <h3>오류 발생</h3>
                    <p>{error}</p>
                    <button className="btn" onClick={() => fetchContents(page)}>다시 시도</button>
                </div>
            )}

            {loading ? (
                <div className="text-center p-40">
                    <div style={{ fontSize: '24px', color: '#636e72', fontWeight: 300 }}>콘텐츠 로딩 중...</div>
                </div>
            ) : (
                <>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px', marginBottom: '60px' }}>
                        {data?.contents.map((item) => (
                            <div
                                key={item.id}
                                style={cardStyle}
                                onClick={() => handleCardClick(item.createdAt)}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                                    e.currentTarget.style.boxShadow = '0 20px 40px 0 rgba(31, 38, 135, 0.15)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                                    e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(31, 38, 135, 0.07)';
                                }}
                            >
                                <div style={{ marginBottom: '20px' }}>
                                    <span style={tagStyle('level')}>{item.jlptLevel}</span>
                                    <span style={tagStyle('topic')}>{item.topic}</span>
                                </div>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#2d3436', marginBottom: '15px', lineHeight: 1.4 }}>
                                    {item.title}
                                </h3>
                                <div style={{
                                    fontSize: '0.9rem', color: '#636e72', marginTop: 'auto',
                                    display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                                }}>
                                    <span>{formatDateForUrl(item.createdAt)}</span>
                                    <span style={{
                                        width: '32px', height: '32px', borderRadius: '50%',
                                        background: 'rgba(108, 92, 231, 0.1)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        color: '#6c5ce7',
                                        fontWeight: 'bold',
                                        fontSize: '0.9rem'
                                    }}>GO</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    {data && (
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', alignItems: 'center' }}>
                            <button
                                onClick={() => handlePageChange(page - 1)}
                                disabled={data.first}
                                style={{
                                    ...glassStyle,
                                    width: '50px', height: '50px',
                                    borderRadius: '50%',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    cursor: data.first ? 'not-allowed' : 'pointer',
                                    opacity: data.first ? 0.5 : 1,
                                    fontSize: '1.2rem',
                                    color: '#2d3436',
                                    padding: 0
                                }}
                            >
                                ‹
                            </button>

                            <span style={{
                                ...glassStyle,
                                padding: '10px 25px',
                                fontSize: '1.1rem', fontWeight: 600, color: '#2d3436',
                                borderRadius: '50px'
                            }}>
                                {data.currentPage + 1} / {data.totalPages}
                            </span>

                            <button
                                onClick={() => handlePageChange(page + 1)}
                                disabled={data.last}
                                style={{
                                    ...glassStyle,
                                    width: '50px', height: '50px',
                                    borderRadius: '50%',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    cursor: data.last ? 'not-allowed' : 'pointer',
                                    opacity: data.last ? 0.5 : 1,
                                    fontSize: '1.2rem',
                                    color: '#2d3436',
                                    padding: 0
                                }}
                            >
                                ›
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default ContentListPage;
