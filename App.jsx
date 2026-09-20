import React, { useState } from 'react';

export default function App() {
  const [isVerified, setIsVerified] = useState(false);
  const [step, setStep] = useState('login'); // 'login' | 'otp'
  const [email, setEmail] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [enteredOtp, setEnteredOtp] = useState('');
  const [error, setError] = useState('');

  // Step 1: Send / Generate OTP
  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Sahi email addressantu.');
      return;
    }
    
    setError('');
    const mockOtp = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(mockOtp);
    setStep('otp');
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (enteredOtp !== generatedOtp) {
      setError('Bhul OTP! Demo banner re thiba code tiantu.');
      return;
    }

    setError('');
    setIsVerified(true); // App kholi jiba
  };

  // Jadi user verify hoi na thae, tahale kebala Email Verification gate dekhai ba
  if (!isVerified) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4">
        {step === 'login' ? (
          <div className="max-w-md w-full bg-white rounded-xl shadow-md p-8 border border-slate-100">
            <h1 className="text-2xl font-bold text-slate-800 text-center mb-2">App Access Gate</h1>
            <p className="text-sm text-slate-500 text-center mb-6">App kholiba purbaru email verification darkar</p>

            {error && <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg">{error}</div>}

            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com" 
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white font-medium py-2.5 rounded-lg hover:bg-blue-700">
                Send Verification OTP
              </button>
            </form>
          </div>
        ) : (
          <div className="max-w-md w-full bg-white rounded-xl shadow-md p-8 border border-slate-100">
            {/* Demo Banner for Testing */}
            <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg text-amber-800">
              <p className="text-xs font-bold uppercase mb-1">🛠️ Demo OTP Code</p>
              <div className="text-center py-2 bg-white border border-amber-300 rounded font-mono text-xl font-bold text-amber-600 tracking-widest">
                {generatedOtp}
              </div>
            </div>

            <h1 className="text-2xl font-bold text-slate-800 text-center mb-2">Enter OTP</h1>
            <p className="text-sm text-slate-500 text-center mb-6">Code sent to {email}</p>

            {error && <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg">{error}</div>}

            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <input 
                type="text" 
                maxLength="4"
                value={enteredOtp}
                onChange={(e) => setEnteredOtp(e.target.value)}
                placeholder="1234" 
                className="w-full text-center tracking-widest text-2xl font-mono px-4 py-3 border border-slate-300 rounded-lg focus:outline-none"
                required
              />
              <button type="submit" className="w-full bg-blue-600 text-white font-medium py-2.5 rounded-lg hover:bg-blue-700">
                Verify & Open App
              </button>
              <button type="button" onClick={() => setStep('login')} className="w-full text-sm text-slate-500 pt-2">
                ← Back
              </button>
            </form>
          </div>
        )}
      </div>
    );
  }

  // --- MAIN APP (Verification Shesh Hele Ehi Screen Khuliba) ---
  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-slate-800">🎉 Welcome to the Main App!</h1>
          <button 
            onClick={() => { setIsVerified(false); setStep('login'); setEmail(''); setEnteredOtp(''); }}
            className="px-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100"
          >
            Log Out
          </button>
        </div>
        <p className="text-slate-600">Apana successful email verify kari app bhitare enter karichanti ({email}). Ebe apana apnanka main app features ithe build kari paribe.</p>
      </div>
    </div>
  );
}
