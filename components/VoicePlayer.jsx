import { useState } from 'react';
import { SpeakerWaveIcon, StopIcon } from '@heroicons/react/24/outline';

export default function VoicePlayer({ tenderId, onError }) {
  const [audioSrc, setAudioSrc] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePlay = async () => {
    try {
      setLoading(true);
      
      if (!audioSrc) {
        const response = await fetch('/api/voiceSummary', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ tenderId }),
        });
        
        if (!response.ok) throw new Error('Failed to generate voice summary');
        
        const { url } = await response.json();
        setAudioSrc(url);
      }
      
      const audio = document.getElementById(`audio-${tenderId}`);
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        await audio.play();
        setIsPlaying(true);
      }
    } catch (error) {
      onError?.(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handlePlay}
        disabled={loading}
        className="btn btn-secondary"
      >
        {loading ? (
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900 mr-2"></div>
        ) : isPlaying ? (
          <StopIcon className="h-4 w-4 mr-2" />
        ) : (
          <SpeakerWaveIcon className="h-4 w-4 mr-2" />
        )}
        {loading ? 'Generating...' : isPlaying ? 'Stop' : 'Listen'}
      </button>
      
      {audioSrc && (
        <audio
          id={`audio-${tenderId}`}
          src={audioSrc}
          onEnded={() => setIsPlaying(false)}
          className="hidden"
        />
      )}
    </div>
  );
}