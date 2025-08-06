// guardian_sim_demo: Simulare "Wallet Protejat cu Guardian" pe MultiversX

import React, { useState, useEffect } from 'react';

export default function GuardianSim() {
  const [attempts, setAttempts] = useState(0);
  const [status, setStatus] = useState('');
  const [input, setInput] = useState('');
  const [balance, setBalance] = useState(null);

  const correctKey = 'drastic session fiction blur banner equip dinner shadow biology oppose tumble roast maple tornado awkward invite visual raccoon liar burden cart mansion rug blur bridge';

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const res = await fetch("https://api.multiversx.com/accounts/erd17taamhdngx3km3y74697yhzk7zxprxjt4klem5jt0wcmp80q9rus2vf688");
        const data = await res.json();
        const egld = (Number(data.balance) / 1e18).toFixed(4);
        setBalance(egld);
      } catch (error) {
        console.error("Eroare la fetch:", error);
        setBalance("N/A");
      }
    };

    fetchBalance();
  }, []);

  const handleAttempt = () => {
    setAttempts((prev) => prev + 1);
    if (input === correctKey) {
      setStatus('🔒 Tranzacție blocată: Wallet-ul este protejat cu Guardian 2FA.');
    } else {
      setStatus('❌ Cheie greșită. Încearcă din nou.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-900 text-gray-100">
      <div className="w-full max-w-2xl bg-gray-800 p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">🔐 Wallet Challenge – Simulare Educațională</h1>
        <div className="bg-gray-700 p-4 rounded-md text-sm mb-4">
          <p><strong>Adresa Publică:</strong> erd17taamhdngx3km3y74697yhzk7zxprxjt4klem5jt0wcmp80q9rus2vf688</p>
          <p><strong>Seed Phrase:</strong> drastic session fiction blur banner equip dinner shadow biology oppose tumble roast maple tornado awkward invite visual raccoon liar burden cart mansion rug blur bridge</p>
          <p><strong>Suma în Wallet:</strong> {balance ? `${balance} EGLD` : 'Se încarcă...'}</p>
          <p className="mt-2 text-gray-300">Acesta este un wallet protejat cu mecanisme de securitate on-chain.<br />Încearcă să introduci seed-ul corect pentru a accesa fondurile.</p>
        </div>

        <div className="space-y-2 mb-4">
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-900 text-gray-100"
            placeholder="Introdu fraza seed aici (24 cuvinte)"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            className="w-full bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-md text-white"
            onClick={handleAttempt}
          >
            Încearcă să spargi wallet-ul
          </button>
          {status && <p className="text-sm text-yellow-400 mt-2">{status}</p>}
        </div>

        <div className="text-xs text-gray-400 mb-2">
          🔁 Număr de încercări până acum: <strong>{attempts}</strong>
        </div>

        <div className="text-xs text-red-400 pt-2">
          ⚠️ NU introduce niciodată o frază seed reală!<br />Această aplicație este doar o simulare pentru învățare și testare.
        </div>
      </div>
    </div>
  );
}
