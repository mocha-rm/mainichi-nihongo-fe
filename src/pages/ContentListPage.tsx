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

    useEffect(() => {
        fetchContents(page);
    }, [page]);

    const fetchContents = async (pageNumber: number) => {
        setLoading(true);
        setError('');
        try {
            const response = await api.get<ContentListResponseDto>(`/api/contents/list?page=${pageNumber}&size=8`);
            setData(response.data);
        } catch (err) {
            console.error('Failed to fetch contents:', err);
            setError('콘텐츠 목록을 불러오는데 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    const formatDateForUrl = (dateString: string): string => {
        // 2025-06-22T05:55:32.612394 -> 20250622
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

    return (
        <div className="container">
            <div className="header">
                <h1>📚 일본어 학습 콘텐츠</h1>
                <p>매일매일 쌓이는 일본어 실력!</p>
            </div>

            {error && (
                <div className="alert alert-error mb-30">
                    <h3>오류 발생</h3>
                    <p>{error}</p>
                    <button className="btn" onClick={() => fetchContents(page)}>다시 시도</button>
                </div>
            )}

            {loading ? (
                <div className="text-center p-40">
                    <div style={{ fontSize: '24px', color: 'var(--primary-color)' }}>로딩 중... ⏳</div>
                </div>
            ) : (
                <>
                    <div className="content-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '25px', marginBottom: '40px' }}>
                        {data?.contents.map((item) => (
                            <div
                                key={item.id}
                                className="card"
                                onClick={() => handleCardClick(item.createdAt)}
                                style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', height: '100%' }}
                            >
                                <div style={{ marginBottom: '15px' }}>
                                    <span className="tag" style={{ background: 'var(--primary-color)', fontSize: '14px' }}>{item.jlptLevel}</span>
                                    <span className="tag" style={{ background: 'var(--accent-color)', marginLeft: '8px', fontSize: '14px' }}>{item.topic}</span>
                                </div>
                                <h3 style={{ fontSize: '20px', marginBottom: '10px', color: 'var(--text-color)' }}>{item.title}</h3>
                                <p style={{ color: 'var(--gray-medium)', flex: 1, fontSize: '14px' }}>
                                    {formatDateForUrl(item.createdAt)}
                                </p>
                                <div className="text-right mt-15">
                                    <span style={{ color: 'var(--secondary-color)', fontWeight: 'bold', fontSize: '14px' }}>학습하기 &rarr;</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    {data && (
                        <div className="content-navigation" style={{ justifyContent: 'center' }}>
                            <button
                                className="nav-button nav-button-prev"
                                onClick={() => handlePageChange(page - 1)}
                                disabled={data.first}
                            >
                                <span>◀</span> 이전
                            </button>

                            <span style={{ display: 'flex', alignItems: 'center', fontSize: '18px', fontWeight: 'bold', color: 'var(--primary-color)' }}>
                                {data.currentPage + 1} / {data.totalPages}
                            </span>

                            <button
                                className="nav-button nav-button-next"
                                onClick={() => handlePageChange(page + 1)}
                                disabled={data.last}
                            >
                                다음 <span>▶</span>
                            </button>
                        </div>
                    )}
                </>
            )}

            <div className="footer">
                <p>
                    <a href="/">메인 페이지로 돌아가기</a>
                </p>
            </div>
        </div>
    );
};

export default ContentListPage;
