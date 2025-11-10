import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

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
  return `${year}-${month}-${day}`;
};

const parseDate = (dateString: string): Date | null => {
  // YYYY-MM-DD 형식 파싱
  const parts = dateString.split('-');
  if (parts.length !== 3) return null;
  
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1; // 월은 0부터 시작
  const day = parseInt(parts[2], 10);
  
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
  
  // 이전/다음 날짜 계산
  const prevDate = date ? getPreviousDate(date) : null;
  const nextDate = date ? getNextDate(date) : null;
  
  const handlePrevClick = () => {
    if (prevDate) {
      window.scrollTo(0, 0); // 페이지 상단으로 스크롤
      navigate(`/contents/${prevDate}`);
    }
  };
  
  const handleNextClick = () => {
    if (nextDate) {
      window.scrollTo(0, 0); // 페이지 상단으로 스크롤
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

        // date, level, topic 추출: 헤더 내 .content-info strong 들
        const strongs = doc.querySelectorAll('.content-info strong');
        const parsedDate = strongs.item(0)?.textContent?.trim() || '';
        const parsedLevel = strongs.item(1)?.textContent?.trim() || '';
        const parsedTopic = strongs.item(2)?.textContent?.trim() || '';

        // 콘텐츠 추출: .main-content > div 내부 HTML
        const mainDiv = doc.querySelector('.main-content > div');
        const rawContent = mainDiv ? (mainDiv as HTMLElement).innerHTML : '';

        // TTS 버튼 onclick → data-text 로 변환 (React에서 이벤트 위임으로 처리)
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

  // TTS 버튼 처리 (이벤트 위임)
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

  if (error) return <div style={{ padding: 40, textAlign: 'center' }}>{error}</div>;
  if (!data) return <div style={{ padding: 40, textAlign: 'center' }}>불러오는 중...</div>;

  return (
    <div className="container">
      {/* 헤더 */}
      <div className="header">
        <h1>🌸 오늘의 일본어 🌸</h1>
        <p>매일 새로운 일본어와 만나는 시간!</p>
        <div className="content-info" style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '15px', borderRadius: 15, color: 'white', backdropFilter: 'blur(10px)' }}>
          <p style={{ margin: 0, fontSize: 18 }}>
            📅 <strong>{data.date}</strong> | 📚 <strong>{data.level}</strong> 레벨 | 🎯 <strong>{data.topic}</strong> 주제
          </p>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="main-content">
        <div dangerouslySetInnerHTML={{ __html: data.content }} />
      </div>

      {/* 네비게이션 버튼 */}
      <div className="content-navigation">
        <button
          onClick={handlePrevClick}
          disabled={!prevDate}
          className={`nav-button nav-button-prev ${!prevDate ? 'disabled' : ''}`}
          style={prevDate && nextDate ? { flex: '1' } : {}}
        >
          <span>◀</span>
          <span>이전 글</span>
          {prevDate && <span className="nav-date">({prevDate})</span>}
        </button>
        
        <button
          onClick={handleNextClick}
          disabled={!nextDate}
          className={`nav-button nav-button-next ${!nextDate ? 'disabled' : ''}`}
          style={prevDate && nextDate ? { flex: '1' } : {}}
        >
          {nextDate && <span className="nav-date">({nextDate})</span>}
          <span>다음 글</span>
          <span>▶</span>
        </button>
      </div>

      {/* 푸터 */}
      <div className="footer">
        <p>
          <a href="/">메인 페이지로 돌아가기</a> |
          <a href="/unsubscribe">구독 취소하기</a>
        </p>
        <p style={{ marginTop: 10, fontSize: 14, opacity: 0.7 }}>
          © 2025 마이니치 니홍고. 매일 새로운 일본어와 함께하세요.
        </p>
      </div>
    </div>
  );
};

export default JapaneseContentPage;
