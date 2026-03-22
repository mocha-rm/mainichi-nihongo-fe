import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';

interface ContentData {
  date: string;
  level: string;
  topic: string;
  content: string;
}

const JapaneseContentPage: React.FC = () => {
  const [data, setData] = useState<ContentData | null>(null);
  const [error, setError] = useState<string>('');
  const [navLoading, setNavLoading] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);
  const { date } = useParams<{ date: string }>();
  const navigate = useNavigate();

  const handlePrevClick = async () => {
    if (!date || navLoading) return;
    setNavLoading(true);
    try {
      const res = await api.get<{ date: string }>(`/api/contents/${date}/prev`, {
        validateStatus: (status) => status === 200 || status === 404
      });
      if (res.status === 200) {
        window.scrollTo(0, 0);
        navigate(`/contents/${res.data.date}`);
      }
      // 404이면 이전 콘텐츠 없음 — 아무 동작 안 함
    } catch {
      // 네트워크 에러 등
    } finally {
      setNavLoading(false);
    }
  };

  const handleNextClick = async () => {
    if (!date || navLoading) return;
    setNavLoading(true);
    try {
      const res = await api.get<{ date: string }>(`/api/contents/${date}/next`, {
        validateStatus: (status) => status === 200 || status === 404
      });
      if (res.status === 200) {
        window.scrollTo(0, 0);
        navigate(`/contents/${res.data.date}`);
      } else if (res.status === 404) {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2500);
      }
    } catch {
      // 네트워크 에러 등
    } finally {
      setNavLoading(false);
    }
  };

  useEffect(() => {
    if (!date) {
      setError('날짜 정보가 없습니다.');
      return;
    }

    api
      .get(`/api/contents/${date}`, {
        headers: { Accept: 'text/html' },
        responseType: 'text',
      })
      .then((res) => {
        const html: string = res.data as unknown as string;
        if (!html || typeof html !== 'string') {
          setError('콘텐츠 응답이 올바르지 않습니다.');
          return;
        }
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        const strongs = doc.querySelectorAll('.content-info strong');
        const parsedDate = strongs.item(0)?.textContent?.trim() || '';
        const parsedLevel = strongs.item(1)?.textContent?.trim() || '';
        const parsedTopic = strongs.item(2)?.textContent?.trim() || '';

        const mainDiv = doc.querySelector('.main-content > div');
        const rawContent = mainDiv ? (mainDiv as HTMLElement).innerHTML : '';

        const contentWithTTSTransform = rawContent.replace(
          /<button class\s*=\s*['"]?tts-button['"]?\s*onclick=[^>]+>(.*?)<\/button>/g,
          (match: string, icon: string) => {
            const textAttrMatch = match.match(/playTTS\('([^']+)'\)/);
            if (textAttrMatch && textAttrMatch[1]) {
              return `<button class="tts-button" data-text="${textAttrMatch[1]}">${icon}</button>`;
            }
            return match;
          }
        );

        setData({
          date: parsedDate,
          level: parsedLevel,
          topic: parsedTopic,
          content: contentWithTTSTransform,
        });
      })
      .catch(() => setError('콘텐츠를 불러오지 못했습니다.'));
  }, [date]);

  useEffect(() => {
    const ttsHandler = (e: any) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('tts-button') && target.dataset.text) {
        const audio = new window.Audio(
          `/api/tts/audio?text=${encodeURIComponent(target.dataset.text)}&speaker=7`
        );
        audio.play();
      }
    };
    document.addEventListener('click', ttsHandler);
    return () => document.removeEventListener('click', ttsHandler);
  }, []);

  if (error) return <div style={{ padding: 40, textAlign: 'center', color: '#636e72' }}>{error}</div>;
  if (!data) return <div style={{ padding: 40, textAlign: 'center', color: '#636e72' }}>강의 불러오는 중...</div>;

  return (
    <>
      {/* Toast 알림 */}
      {showToast && (
        <div style={{
          position: 'fixed',
          top: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(108, 92, 231, 0.95)',
          color: '#fff',
          padding: '14px 32px',
          borderRadius: '12px',
          fontSize: '1rem',
          fontWeight: 600,
          boxShadow: '0 8px 32px rgba(108, 92, 231, 0.3)',
          zIndex: 9999,
          animation: 'toastFadeIn 0.3s ease-out'
        }}>
          📌 최신 게시글입니다
        </div>
      )}

      {/* Hero Section */}
      <div className="text-center" style={{ marginBottom: '30px' }}>
        <h2 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '10px' }}>
          📖 오늘의 일본어
        </h2>
      </div>

      {/* 통합 카드 */}
      <div className="glass-panel" style={{ padding: '50px', maxWidth: '900px', margin: '0 auto' }}>

        {/* Info Card */}
        <div style={{
          padding: '20px',
          marginBottom: '40px',
          background: 'rgba(108, 92, 231, 0.03)',
          borderRadius: '16px',
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          flexWrap: 'wrap'
        }}>
          <span style={{ fontSize: '1.1rem', color: '#2d3436' }}>📅 <strong>{data.date}</strong></span>
          <span style={{ fontSize: '1.1rem', color: '#6c5ce7' }}>📚 <strong>{data.level}</strong> 레벨</span>
          <span style={{ fontSize: '1.1rem', color: '#e84393' }}>🎯 <strong>{data.topic}</strong> 주제</span>
        </div>

        {/* 구분선 */}
        <div style={{
          height: '1px',
          background: 'linear-gradient(to right, transparent, rgba(108, 92, 231, 0.2), transparent)',
          margin: '40px 0'
        }} />

        {/* Main Content */}
        <div style={{
          lineHeight: 1.8,
          fontSize: '1.1rem',
          color: '#2d3436',
          marginBottom: '40px'
        }}>
          <div dangerouslySetInnerHTML={{ __html: data.content }} className="lesson-content" />
        </div>

        {/* 구분선 */}
        <div style={{
          height: '1px',
          background: 'linear-gradient(to right, transparent, rgba(108, 92, 231, 0.2), transparent)',
          margin: '40px 0'
        }} />

        {/* 네비게이션 버튼 */}
        <div style={{ display: 'flex', gap: '20px' }}>
          <button
            onClick={handlePrevClick}
            disabled={navLoading}
            style={{
              flex: 1,
              padding: '15px 25px',
              borderRadius: '16px',
              border: 'none',
              background: 'rgba(108, 92, 231, 0.1)',
              color: '#6c5ce7',
              fontWeight: 600,
              cursor: navLoading ? 'wait' : 'pointer',
              opacity: navLoading ? 0.6 : 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => !navLoading && (e.currentTarget.style.background = 'rgba(108, 92, 231, 0.15)')}
            onMouseLeave={(e) => !navLoading && (e.currentTarget.style.background = 'rgba(108, 92, 231, 0.1)')}
          >
            <span>◀</span>
            <span>이전 글</span>
          </button>

          <button
            onClick={handleNextClick}
            disabled={navLoading}
            style={{
              flex: 1,
              padding: '15px 25px',
              borderRadius: '16px',
              border: 'none',
              background: 'rgba(108, 92, 231, 0.1)',
              color: '#6c5ce7',
              fontWeight: 600,
              cursor: navLoading ? 'wait' : 'pointer',
              opacity: navLoading ? 0.6 : 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => !navLoading && (e.currentTarget.style.background = 'rgba(108, 92, 231, 0.15)')}
            onMouseLeave={(e) => !navLoading && (e.currentTarget.style.background = 'rgba(108, 92, 231, 0.1)')}
          >
            <span>다음 글</span>
            <span>▶</span>
          </button>
        </div>
      </div>

      <style>{`
        .lesson-content h2 {
            border-bottom: 2px solid rgba(108, 92, 231, 0.3);
            padding-bottom: 10px;
            margin-top: 30px;
            margin-bottom: 20px;
            color: #2d3436;
        }
        .lesson-content p {
            margin-bottom: 20px;
        }
        .tts-button {
            background: none;
            border: none;
            cursor: pointer;
            font-size: 1.2rem;
            margin-left: 5px;
            transition: transform 0.2s;
        }
        .tts-button:hover {
            transform: scale(1.2);
        }
        .highlight {
            background: rgba(253, 203, 110, 0.3);
            padding: 2px 5px;
            border-radius: 4px;
        }
        @keyframes toastFadeIn {
            from { opacity: 0; transform: translateX(-50%) translateY(-10px); }
            to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}
      </style>
    </>
  );
};

export default JapaneseContentPage;
