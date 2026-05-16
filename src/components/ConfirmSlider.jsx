import { useState, useRef, useCallback } from 'react';

/**
 * ConfirmSlider - Swipe-to-confirm component (Traceability Scanner)
 * Props: onConfirm (callback), label
 */
const ConfirmSlider = ({ onConfirm, label = 'Geser untuk Konfirmasi', disabled = false }) => {
  const [sliderX, setSliderX] = useState(0);
  const [confirmed, setConfirmed] = useState(false);
  const [dragging, setDragging] = useState(false);
  const trackRef = useRef(null);
  const startXRef = useRef(0);
  const HANDLE_SIZE = 52;
  const CONFIRM_THRESHOLD = 0.75;

  const getTrackWidth = () => (trackRef.current?.offsetWidth || 300) - HANDLE_SIZE - 8;

  const handleStart = (clientX) => {
    if (confirmed || disabled) return;
    startXRef.current = clientX - sliderX;
    setDragging(true);
  };

  const handleMove = (clientX) => {
    if (!dragging || confirmed) return;
    const maxX = getTrackWidth();
    const newX = Math.max(0, Math.min(clientX - startXRef.current, maxX));
    setSliderX(newX);

    if (newX / maxX >= CONFIRM_THRESHOLD) {
      setSliderX(maxX);
      setConfirmed(true);
      setDragging(false);
      if (onConfirm) onConfirm();
    }
  };

  const handleEnd = () => {
    if (confirmed) return;
    setDragging(false);
    setSliderX(0);
  };

  const maxX = typeof window !== 'undefined' ? getTrackWidth() : 240;
  const progress = Math.min(sliderX / maxX, 1);

  return (
    <div
      ref={trackRef}
      className={`relative h-14 rounded-full overflow-hidden flex items-center px-1 select-none ${confirmed ? 'bg-secondary/20 border-secondary border' : 'slide-track'} transition-colors duration-300`}
      onMouseMove={e => dragging && handleMove(e.clientX)}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchMove={e => handleMove(e.touches[0].clientX)}
      onTouchEnd={handleEnd}
    >
      {/* Progress fill */}
      <div
        className="absolute left-0 top-0 h-full bg-secondary/10 rounded-full transition-all"
        style={{ width: `${progress * 100}%` }}
      />

      {/* Label */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {confirmed ? (
          <span className="font-label-md text-label-md text-secondary font-bold flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
            Dikonfirmasi!
          </span>
        ) : (
          <span className="font-label-md text-label-md text-secondary opacity-70 uppercase tracking-widest pl-10">{label}</span>
        )}
      </div>

      {/* Handle */}
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center shadow-md z-10 cursor-grab active:cursor-grabbing transition-colors relative ${confirmed ? 'bg-secondary' : 'bg-secondary hover:bg-secondary/90'} ${disabled ? 'opacity-40 cursor-not-allowed' : ''}`}
        style={{ transform: `translateX(${sliderX}px)`, transition: dragging ? 'none' : 'transform 0.3s ease' }}
        onMouseDown={e => handleStart(e.clientX)}
        onTouchStart={e => handleStart(e.touches[0].clientX)}
      >
        <span className="material-symbols-outlined text-on-secondary text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>
          {confirmed ? 'lock' : 'lock_open'}
        </span>
      </div>
    </div>
  );
};

export default ConfirmSlider;
