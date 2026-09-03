import { useState, useEffect, useRef } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  X,
  CheckSquare,
  Square,
  Volume2,
  VolumeX,
  Coffee,
  Hourglass,
  Timer,
} from "lucide-react";

const FocusModeModal = ({ isOpen, onClose, task, onToggleSubTask }) => {
  const [timerType, setTimerType] = useState("pomodoro");
  const [pomoMode, setPomoMode] = useState("focus");
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [stopwatchTime, setStopwatchTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const audioContextRef = useRef(null);
  const noiseNodeRef = useRef(null);
  const gainNodeRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimerType("pomodoro");
      setPomoMode("focus");
      setTimeLeft(25 * 60);
      setStopwatchTime(0);
      setIsRunning(true);
    } else {
      setIsRunning(false);
      stopAmbientSound();
    }
  }, [isOpen]);

  useEffect(() => {
    let interval = null;

    if (isRunning) {
      if (timerType === "pomodoro") {
        if (timeLeft > 0) {
          interval = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
          }, 1000);
        } else {
          setIsRunning(false);
        }
      } else {
        interval = setInterval(() => {
          setStopwatchTime((prev) => prev + 1);
        }, 1000);
      }
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, timerType]);

  const switchTimerType = (type) => {
    setTimerType(type);
    setIsRunning(false);
    if (type === "pomodoro") {
      setTimeLeft(pomoMode === "focus" ? 25 * 60 : 5 * 60);
    } else {
      setStopwatchTime(0);
    }
  };

  const switchPomoMode = (mode) => {
    setPomoMode(mode);
    setIsRunning(false);
    setTimeLeft(mode === "focus" ? 25 * 60 : 5 * 60);
  };

  const resetTimer = () => {
    setIsRunning(false);
    if (timerType === "pomodoro") {
      setTimeLeft(pomoMode === "focus" ? 25 * 60 : 5 * 60);
    } else {
      setStopwatchTime(0);
    }
  };

  const startAmbientSound = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContext();
      audioContextRef.current = ctx;

      const bufferSize = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        data[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = data[i];
        data[i] *= 3.5;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;
      noiseNodeRef.current = noise;

      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 800;

      const gain = ctx.createGain();
      gain.gain.value = 0.15;
      gainNodeRef.current = gain;

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start(0);
      setIsMuted(false);
    } catch (err) {
      console.error(err);
    }
  };

  const stopAmbientSound = () => {
    try {
      if (noiseNodeRef.current) {
        noiseNodeRef.current.stop();
        noiseNodeRef.current.disconnect();
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    } catch (err) {
      console.error(err);
    } finally {
      audioContextRef.current = null;
      noiseNodeRef.current = null;
      setIsMuted(true);
    }
  };

  const toggleSound = () => {
    if (isMuted) {
      startAmbientSound();
    } else {
      stopAmbientSound();
    }
  };

  if (!isOpen || !task) return null;

  const currentSeconds = timerType === "pomodoro" ? timeLeft : stopwatchTime;
  const hours = Math.floor(currentSeconds / 3600);
  const minutes = Math.floor((currentSeconds % 3600) / 60);
  const seconds = currentSeconds % 60;

  const formattedTime =
    hours > 0
      ? `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
      : `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  const totalPomoTime = pomoMode === "focus" ? 25 * 60 : 5 * 60;
  const progressPercent =
    timerType === "pomodoro"
      ? ((totalPomoTime - timeLeft) / totalPomoTime) * 100
      : 100;

  const subtasks = task.subtasks || [];

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center bg-[#060b14] text-slate-100 animate-in fade-in duration-500 overflow-y-auto">
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-45 scale-105 transition-transform duration-1000 ease-out pointer-events-none"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1920&auto=format&fit=crop')",
        }}
      />

      <div className="fixed inset-0 bg-gradient-to-b from-[#060b14]/50 via-[#071326]/60 to-[#030712]/80 backdrop-blur-[1px] pointer-events-none" />

      <div className="fixed top-4 right-4 md:top-6 md:right-6 flex items-center gap-2.5 z-30">
        <button
          type="button"
          onClick={toggleSound}
          className={`flex items-center gap-2 px-3 py-1.5 md:px-3.5 md:py-2 rounded-full border text-xs tracking-wide transition-all backdrop-blur-md ${
            !isMuted
              ? "bg-sky-500/20 border-sky-400/40 text-sky-200 shadow-[0_0_15px_rgba(56,189,248,0.2)]"
              : "bg-gray-900/60 border-gray-700/60 text-gray-300 hover:text-white hover:border-gray-600"
          }`}
        >
          {!isMuted ? (
            <Volume2 className="w-4 h-4 text-sky-400 shrink-0" />
          ) : (
            <VolumeX className="w-4 h-4 shrink-0" />
          )}
          <span>Doğa Sesi</span>
        </button>

        <button
          type="button"
          onClick={onClose}
          className="p-1.5 md:p-2 rounded-full bg-gray-900/60 hover:bg-gray-800/80 border border-gray-700/60 text-gray-300 hover:text-white transition-colors backdrop-blur-md"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="relative z-10 w-full max-w-xl px-4 md:px-6 pt-20 pb-10 md:py-10 flex flex-col items-center text-center my-auto">
        <div className="flex items-center gap-1.5 p-1 bg-gray-900/70 border border-gray-800/90 rounded-2xl mb-4 backdrop-blur-md">
          <button
            type="button"
            onClick={() => switchTimerType("pomodoro")}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-medium transition-all ${
              timerType === "pomodoro"
                ? "bg-gray-800 text-white border border-gray-700/70 shadow-sm"
                : "text-gray-400 hover:text-gray-200"
            }`}
          >
            <Hourglass className="w-3.5 h-3.5 text-sky-400" />
            Pomodoro
          </button>
          <button
            type="button"
            onClick={() => switchTimerType("stopwatch")}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-medium transition-all ${
              timerType === "stopwatch"
                ? "bg-gray-800 text-white border border-gray-700/70 shadow-sm"
                : "text-gray-400 hover:text-gray-200"
            }`}
          >
            <Timer className="w-3.5 h-3.5 text-sky-400" />
            Kronometre
          </button>
        </div>

        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-white mb-2 max-w-lg break-words drop-shadow-md">
          {task.title}
        </h1>
        {task.description && (
          <p className="text-gray-300 text-sm max-w-md line-clamp-2 mb-6 leading-relaxed drop-shadow-sm">
            {task.description}
          </p>
        )}

        <div className="relative flex items-center justify-center my-2">
          <div className="text-7xl md:text-8xl font-extralight tracking-widest font-mono text-white drop-shadow-[0_0_30px_rgba(56,189,248,0.25)]">
            {formattedTime}
          </div>
        </div>

        {timerType === "pomodoro" && (
          <>
            <div className="w-48 bg-gray-900/70 border border-gray-800/80 h-1.5 rounded-full overflow-hidden mt-2 mb-5 backdrop-blur-sm">
              <div
                className="h-full bg-sky-500 shadow-[0_0_10px_rgba(56,189,248,0.7)] transition-all duration-1000"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="flex items-center gap-2 p-1 bg-gray-900/70 border border-gray-800/90 rounded-2xl mb-7 backdrop-blur-md">
              <button
                type="button"
                onClick={() => switchPomoMode("focus")}
                className={`px-3.5 py-1 rounded-xl text-xs font-medium transition-all ${
                  pomoMode === "focus"
                    ? "bg-gray-800 text-sky-200 border border-gray-700 shadow-sm"
                    : "text-gray-400 hover:text-gray-200"
                }`}
              >
                25 dk Odak
              </button>
              <button
                type="button"
                onClick={() => switchPomoMode("break")}
                className={`flex items-center gap-1.5 px-3.5 py-1 rounded-xl text-xs font-medium transition-all ${
                  pomoMode === "break"
                    ? "bg-gray-800 text-sky-200 border border-gray-700 shadow-sm"
                    : "text-gray-400 hover:text-gray-200"
                }`}
              >
                <Coffee className="w-3.5 h-3.5 text-sky-400" />
                <span>5 dk Mola</span>
              </button>
            </div>
          </>
        )}

        <div
          className={`flex items-center gap-4 ${timerType === "stopwatch" ? "mt-4 mb-8" : "mb-8"}`}
        >
          <button
            type="button"
            onClick={() => setIsRunning(!isRunning)}
            className={`p-4 rounded-full transition-all duration-300 shadow-xl ${
              isRunning
                ? "bg-gray-900/80 hover:bg-gray-800 text-gray-200 border border-gray-700 backdrop-blur-md"
                : "bg-sky-600 hover:bg-sky-500 text-white font-medium shadow-sky-950 hover:scale-105"
            }`}
          >
            {isRunning ? (
              <Pause className="w-6 h-6" />
            ) : (
              <Play className="w-6 h-6 fill-current translate-x-0.5" />
            )}
          </button>
          <button
            type="button"
            onClick={resetTimer}
            className="p-3 rounded-full bg-gray-900/70 hover:bg-gray-800/90 border border-gray-700/60 text-gray-400 hover:text-white transition-colors backdrop-blur-md"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {subtasks.length > 0 && (
          <div className="w-full max-w-md bg-gray-900/80 border border-gray-800/90 rounded-2xl p-4 text-left backdrop-blur-md shadow-2xl relative z-20">
            <div className="text-xs font-semibold text-gray-400 mb-3 flex items-center justify-between">
              <span>Görev Adımları</span>
              <span className="text-gray-400">
                {subtasks.filter((s) => s.completed).length}/{subtasks.length}
              </span>
            </div>
            <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
              {subtasks.map((st) => (
                <div
                  key={st.id}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (typeof onToggleSubTask === "function") {
                      onToggleSubTask(st.id, !st.completed);
                    }
                  }}
                  className="flex items-center gap-3 w-full text-left p-2.5 rounded-xl hover:bg-gray-800/90 transition-colors group cursor-pointer"
                >
                  {st.completed ? (
                    <CheckSquare className="w-4 h-4 text-sky-400 shrink-0" />
                  ) : (
                    <Square className="w-4 h-4 text-gray-500 group-hover:text-sky-400 shrink-0" />
                  )}
                  <span
                    className={`text-xs break-all transition-colors select-none ${
                      st.completed
                        ? "line-through text-gray-500"
                        : "text-gray-200 group-hover:text-white"
                    }`}
                  >
                    {st.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FocusModeModal;
