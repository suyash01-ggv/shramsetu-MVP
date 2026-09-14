import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, MicOff, Volume2, ArrowLeft } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export function VoiceSaathi() {
  const navigate = useNavigate();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [history, setHistory] = useState<{role: 'user'|'ai', text: string}[]>([]);

  // Simulated voice interaction
  const handleToggleMic = () => {
    if (isListening) {
      setIsListening(false);
      setTranscript('');
    } else {
      setIsListening(true);
      setResponse('');
      setTranscript('Listening...');
      
      // Simulate speech recognition delay
      setTimeout(() => {
        const userText = "आज मेरे कितने काम हैं?";
        setTranscript(userText);
        
        setTimeout(() => {
          setIsListening(false);
          setHistory(prev => [...prev, {role: 'user', text: userText}]);
          
          // Simulate AI processing and TTS
          setTimeout(() => {
            const aiText = "आज आपके पास 3 काम हैं। पहला काम बांद्रा में सुबह 10 बजे है।";
            setResponse(aiText);
            setHistory(prev => [...prev, {role: 'ai', text: aiText}]);
          }, 1000);
          
        }, 1500);
      }, 1500);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] md:h-[600px] bg-slate-50 rounded-2xl overflow-hidden border border-slate-200">
      <div className="bg-blue-900 text-white p-4 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="md:hidden">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h2 className="text-lg font-bold">AI Voice Saathi</h2>
          <p className="text-blue-200 text-xs">Tap and Speak in Hindi, Marathi or English</p>
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {history.length === 0 && !isListening && (
          <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-4">
            <Volume2 className="w-12 h-12 opacity-20" />
            <p className="text-center">Ask me about your jobs, earnings, or request help.<br/>"आज मेरी कितनी कमाई हुई?"</p>
          </div>
        )}

        {history.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-2xl ${
              msg.role === 'user' 
                ? 'bg-blue-600 text-white rounded-tr-sm' 
                : 'bg-white text-slate-800 border border-slate-200 rounded-tl-sm shadow-sm'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        
        {isListening && (
          <div className="flex justify-end">
            <div className="bg-blue-600 text-white p-3 rounded-2xl rounded-tr-sm animate-pulse">
              {transcript}
            </div>
          </div>
        )}
      </div>

      <div className="p-6 bg-white border-t border-slate-200 flex justify-center items-center">
        <button 
          onClick={handleToggleMic}
          className={`w-24 h-24 rounded-full flex flex-col items-center justify-center gap-2 transition-all shadow-lg ${
            isListening 
              ? 'bg-red-500 hover:bg-red-600 text-white scale-110 shadow-red-500/30' 
              : 'bg-teal-500 hover:bg-teal-600 text-white shadow-teal-500/30'
          }`}
        >
          {isListening ? (
            <>
              <MicOff className="w-8 h-8" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Stop</span>
            </>
          ) : (
            <>
              <Mic className="w-8 h-8" />
              <span className="text-[10px] font-bold uppercase tracking-wider">Tap & Speak</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
