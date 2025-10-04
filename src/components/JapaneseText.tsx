import React from 'react'

interface JapaneseTextProps {
  text: string
  showTTS?: boolean
  size?: 'small' | 'medium' | 'large'
}

const JapaneseText: React.FC<JapaneseTextProps> = ({ 
  text, 
  showTTS = true, 
  size = 'medium' 
}) => {
  const sizeClasses = {
    small: '18px',
    medium: '20px',
    large: '24px'
  }

  const handleTTS = () => {
    const audio = new Audio(`/api/tts/audio?text=${encodeURIComponent(text)}&speaker=7`)
    audio.play()
  }

  return (
    <span 
      className="japanese-text" 
      style={{ fontSize: sizeClasses[size] }}
    >
      {text}
      {showTTS && (
        <button 
          className="tts-button" 
          onClick={handleTTS}
          title="발음 듣기"
        >
          🔊
        </button>
      )}
    </span>
  )
}

export default JapaneseText
