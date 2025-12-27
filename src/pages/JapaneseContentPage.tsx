import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

interface ContentData {
  date: string;
  level: string;
  topic: string;
  content: string;
}

// 날짜 유틸리티 함수들
const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}${month}${day}`;
};

const parseDate = (dateString: string): Date | null => {
  if (dateString.length !== 8) return null;
  const year = parseInt(dateString.substring(0, 4), 10);
  const month = parseInt(dateString.substring(4, 6), 10) - 1;
  const day = parseInt(dateString.substring(6, 8), 10);
  const date = new Date(year, month, day);
  if (isNaN(date.getTime())) return null;
  return date;
};

const getPreviousDate = (dateString: string): string | null => {
  const date = parseDate(dateString);
  if (!date) return null;
  date.setDate(date.getDate() - 1);
  return formatDate(date);
};

const getNextDate = (dateString: string): string | null => {
  const date = parseDate(dateString);
  if (!date) return null;
  date.setDate(date.getDate() + 1);
  return formatDate(date);
};

const JapaneseContentPage: React.FC = () => {
  const [data, setData] = useState<ContentData | null>(null);
  const [error, setError] = useState<string>('');
  const { date } = useParams<{ date: string }>();
  const navigate = useNavigate();

  // Glass Mixin
  const glassStyle = {
    background: 'rgba(255, 255, 255, 0.65)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.4)',
    borderRadius: '24px',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
    padding: '40px',
    marginBottom: '40px'
  };

  const navBtnStyle = (disabled: boolean) => ({
    background: disabled ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.4)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '16px',
    padding: '15px 25px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    color: '#2d3436',
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    transition: 'all 0.2s',
    flex: 1,
    justifyContent: 'center',
    boxShadow: disabled ? 'none' : '0 4px 15px rgba(0,0,0,0.05)'
  });

  const prevDate = date ? getPreviousDate(date) : null;
  const nextDate = date ? getNextDate(date) : null;

  const handlePrevClick = () => {
    if (prevDate) {
      window.scrollTo(0, 0);
      navigate(`/contents/${prevDate}`);
    }
  };

  const handleNextClick = () => {
    if (nextDate) {
      window.scrollTo(0, 0);
      navigate(`/contents/${nextDate}`);
    }
  };

  useEffect(() => {
    if (!date) {
      setError('날짜 정보가 없습니다.');
      return;
    }

    axios
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
      <Header title="오늘의 일본어" showTags={false} />

      <div style={{ maxWidth: '800px', margin: '0 auto' }}>

        {/* Info Card - Glass */}
        <div style={{
          ...glassStyle,
          padding: '20px',
          marginBottom: '30px',
          background: 'rgba(255, 255, 255, 0.4)',
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

        {/* Main Content - High Readability Glass */}
        <div className="main-content" style={{
          ...glassStyle,
          lineHeight: 1.8,
          fontSize: '1.1rem',
          color: '#2d3436'
        }}>
          <div dangerouslySetInnerHTML={{ __html: data.content }} className="lesson-content" />
        </div>

        {/* 네비게이션 버튼 */}
        <div className="content-navigation" style={{ display: 'flex', gap: '20px', marginBottom: '60px' }}>
          <button
            onClick={handlePrevClick}
            disabled={!prevDate}
            style={navBtnStyle(!prevDate)}
            onMouseEnter={(e) => !(!prevDate) && (e.currentTarget.style.background = 'rgba(255,255,255,0.6)')}
            onMouseLeave={(e) => !(!prevDate) && (e.currentTarget.style.background = 'rgba(255,255,255,0.4)')}
          >
            <span>◀</span>
            <span>이전 글</span>
          </button>

          <button
            onClick={handleNextClick}
            disabled={!nextDate}
            style={navBtnStyle(!nextDate)}
            onMouseEnter={(e) => !(!nextDate) && (e.currentTarget.style.background = 'rgba(255,255,255,0.6)')}
            onMouseLeave={(e) => !(!nextDate) && (e.currentTarget.style.background = 'rgba(255,255,255,0.4)')}
          >
            <span>다음 글</span>
            <span>▶</span>
          </button>
        </div>

      </div>

      <Footer />

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
      `}</style>
    </>
  );
};

export default JapaneseContentPage;
