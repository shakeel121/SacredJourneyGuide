import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, SkipBack, SkipForward } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

interface VideoPlayerProps {
  src: string;
  poster?: string;
  title?: string;
  autoPlay?: boolean;
  className?: string;
  onEnded?: () => void;
}

export function VideoPlayer({ 
  src, 
  poster, 
  title, 
  autoPlay = false, 
  className,
  onEnded
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isControlsVisible, setIsControlsVisible] = useState(true);
  const [hideControlsTimeout, setHideControlsTimeout] = useState<NodeJS.Timeout | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  
  // Handle play/pause
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  // Handle video time update
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const videoDuration = videoRef.current.duration;
      setCurrentTime(current);
      setProgress((current / videoDuration) * 100);
    }
  };
  
  // Handle video metadata loaded
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };
  
  // Handle progress bar click
  const handleProgressChange = (newValue: number[]) => {
    if (videoRef.current) {
      const seekTime = (newValue[0] / 100) * videoRef.current.duration;
      videoRef.current.currentTime = seekTime;
      setProgress(newValue[0]);
    }
  };
  
  // Handle volume change
  const handleVolumeChange = (newValue: number[]) => {
    if (videoRef.current) {
      const newVolume = newValue[0] / 100;
      videoRef.current.volume = newVolume;
      setVolume(newVolume);
      if (newVolume === 0) {
        setIsMuted(true);
      } else {
        setIsMuted(false);
      }
    }
  };
  
  // Toggle mute
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };
  
  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (playerRef.current) {
      if (!document.fullscreenElement) {
        playerRef.current.requestFullscreen().catch(err => {
          console.error(`Error attempting to enable fullscreen: ${err.message}`);
        });
      } else {
        document.exitFullscreen();
      }
    }
  };
  
  // Format time in MM:SS
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  // Skip forward/backward
  const skip = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  };
  
  // Handle video end
  const handleVideoEnded = () => {
    setIsPlaying(false);
    if (onEnded) {
      onEnded();
    }
  };
  
  // Show/hide controls based on mouse movement
  const showControls = () => {
    setIsControlsVisible(true);
    if (hideControlsTimeout) {
      clearTimeout(hideControlsTimeout);
    }
    
    const timeout = setTimeout(() => {
      if (isPlaying) {
        setIsControlsVisible(false);
      }
    }, 3000);
    
    setHideControlsTimeout(timeout);
  };
  
  // Handle fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);
  
  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle keys if this player is in focus
      if (!playerRef.current?.contains(document.activeElement)) return;
      
      switch (e.key.toLowerCase()) {
        case ' ':
        case 'k':
          e.preventDefault();
          togglePlay();
          break;
        case 'arrowright':
          e.preventDefault();
          skip(10);
          break;
        case 'arrowleft':
          e.preventDefault();
          skip(-10);
          break;
        case 'f':
          e.preventDefault();
          toggleFullscreen();
          break;
        case 'm':
          e.preventDefault();
          toggleMute();
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isPlaying, isMuted]);
  
  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (hideControlsTimeout) {
        clearTimeout(hideControlsTimeout);
      }
    };
  }, [hideControlsTimeout]);
  
  return (
    <div 
      ref={playerRef}
      className={cn(
        "relative group bg-black rounded-lg overflow-hidden",
        className
      )}
      onMouseMove={showControls}
      onMouseLeave={() => isPlaying && setIsControlsVisible(false)}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="w-full h-full"
        onClick={togglePlay}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleVideoEnded}
        autoPlay={autoPlay}
      />
      
      {/* Play/Pause overlay button */}
      <div 
        className={cn(
          "absolute inset-0 flex items-center justify-center transition-opacity duration-300",
          isPlaying ? "opacity-0" : "opacity-100",
          isControlsVisible ? "visible" : "invisible"
        )}
        onClick={togglePlay}
      >
        <Button
          variant="ghost"
          size="icon"
          className="h-16 w-16 rounded-full bg-black/40 text-white hover:bg-black/60"
        >
          <Play className="h-8 w-8" />
        </Button>
      </div>
      
      {/* Title overlay */}
      {title && (
        <div className={cn(
          "absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/70 to-transparent text-white transition-opacity duration-300",
          isControlsVisible ? "opacity-100" : "opacity-0"
        )}>
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
      )}
      
      {/* Video controls */}
      <div 
        className={cn(
          "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-2 transition-opacity duration-300",
          isControlsVisible ? "opacity-100" : "opacity-0"
        )}
      >
        {/* Progress bar */}
        <div className="relative w-full mb-2">
          <Slider 
            value={[progress]} 
            min={0} 
            max={100} 
            step={0.1}
            onValueChange={handleProgressChange}
            className="cursor-pointer"
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Play/Pause button */}
            <Button variant="ghost" size="icon" className="text-white" onClick={togglePlay}>
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </Button>
            
            {/* Skip backward button */}
            <Button variant="ghost" size="icon" className="text-white hidden sm:flex" onClick={() => skip(-10)}>
              <SkipBack className="h-5 w-5" />
            </Button>
            
            {/* Skip forward button */}
            <Button variant="ghost" size="icon" className="text-white hidden sm:flex" onClick={() => skip(10)}>
              <SkipForward className="h-5 w-5" />
            </Button>
            
            {/* Time display */}
            <div className="text-white text-sm">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Volume control */}
            <div className="hidden sm:flex items-center">
              <Button variant="ghost" size="icon" className="text-white" onClick={toggleMute}>
                {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </Button>
              <div className="w-24">
                <Slider 
                  value={[isMuted ? 0 : volume * 100]} 
                  min={0} 
                  max={100} 
                  onValueChange={handleVolumeChange}
                />
              </div>
            </div>
            
            {/* Fullscreen button */}
            <Button variant="ghost" size="icon" className="text-white" onClick={toggleFullscreen}>
              {isFullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}