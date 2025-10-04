import React from 'react'
import { AlertMessage } from '../types'

interface AlertProps {
  alert: AlertMessage | null
  onClose: () => void
}

const Alert: React.FC<AlertProps> = ({ alert, onClose }) => {
  if (!alert) return null

  return (
    <div className="alert-overlay" onClick={onClose}>
      <div 
        className={`alert alert-${alert.type}`}
        onClick={(e) => e.stopPropagation()}
      >
        <h3>
          {alert.type === 'success' ? '🎉 구독 완료!' : '😢 오류 발생'}
        </h3>
        <p>{alert.message}</p>
        <button className="btn btn-secondary" onClick={onClose}>
          확인
        </button>
      </div>
    </div>
  )
}

export default Alert
