import React, { useState, useEffect } from 'react';
import qrImage from './qr.png';

export default function GuardianSim() {
  const [attempts, setAttempts] = useState(() => {
    const saved = localStorage.getItem('attempts');
    return saved ? Number(saved) : 0;
  });
  const [status, setStatus] = useState('');
  const [input, setInput] = useState('');
  const [balance, setBalance] = useState(null);
  const [usdValue, setUsdValue] = useState(null);
  const [copiedCount, setCopiedCount] = useState(() => {
    const saved = localStorage.getItem('copiedCount');
    return saved ? Number(saved) : 0;
  });
  const [copied, setCopied] = useState(false);
  const [esdtCount, setEsdtCount] = useState(null);
  const [nftCount, setNftCount] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const correctKey = 'drastic session fiction blur banner equip dinner shadow biology oppose tumble roast maple tornado awkward invite visual raccoon liar burden cart mansion rug blur bridge';

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const res = await fetch("https://api.multiversx.com/accounts/erd17taamhdngx3km3y74697yhzk7zxprxjt4klem5jt0wcmp80q9rus2vf688");
        const data = await res.json();
        const egld = Number(data.balance) / 1e18;
        setBalance(egld.toFixed(4));

        const priceRes = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=elrond-erd-2&vs_currencies=usd");
        const priceData = await priceRes.json();
        const egldPrice = priceData['elrond-erd-2'].usd;
        setUsdValue((egld * egldPrice).toFixed(2));

        const tokensRes = await fetch("https://api.multiversx.com/accounts/erd17taamhdngx3km3y74697yhzk7zxprxjt4klem5jt0wcmp80q9rus2vf688/tokens");
        const tokens = await tokensRes.json();
        setEsdtCount(tokens.length);

        const nftsRes = await fetch("https://api.multiversx.com/accounts/erd17taamhdngx3km3y74697yhzk7zxprxjt4klem5jt0wcmp80q9rus2vf688/nfts");
        const nfts = await nftsRes.json();
        setNftCount(nfts.length);
      } catch (error) {
        console.error("Error fetching balance or EGLD price:", error);
        setBalance("N/A");
        setUsdValue("N/A");
      }
    };

    fetchBalance();
  }, []);

  const handleAttempt = () => {
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);
    localStorage.setItem('attempts', newAttempts);

    if (input === correctKey) {
      setStatus('🔒 access blocked: wallet is protected by guardian 2fa.');
    } else {
      setStatus('❌ incorrect phrase, try again!');
    }
  };

  const handleCopySeed = async () => {
    try {
      const formattedSeed = `charge pull social wagon sing senior acquire sweet patient special special attack property elite march initial health cream almost switch race trumpet buyer lawsuit`;

      await navigator.clipboard.writeText(formattedSeed);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);

      const newCopiedCount = copiedCount + 1;
      setCopiedCount(newCopiedCount);
      localStorage.setItem('copiedCount', newCopiedCount);
    } catch (e) {
      console.error("Error copying seed phrase:", e);
    }
  };

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} flex flex-col items-center justify-center min-h-screen p-6 select-none`}>
      <div className="w-full flex justify-end mt-4 px-6">
  <label className="flex items-center cursor-pointer">
    <div className="mr-3 text-sm text-gray-700 dark:text-gray-300">
      {darkMode ? '🌙 Dark Mode' : '🌞 Light Mode'}
    </div>
    <div className="relative">
      <input
        type="checkbox"
        className="sr-only"
        checked={darkMode}
        onChange={() => setDarkMode(!darkMode)}
      />
      <div className="w-10 h-5 bg-gray-300 rounded-full shadow-inner dark:bg-gray-600 transition-colors duration-300"></div>
      <div className={`dot absolute left-1 top-1 w-3 h-3 bg-white rounded-full shadow transform transition-transform duration-300 ${darkMode ? 'translate-x-5' : ''}`}></div>
    </div>
  </label>
</div>

      <div className={`${darkMode? "w-full max-w-2xl p-6 rounded-lg shadow-md bg-white dark:bg-gray-800" : "w-full max-w-2xl p-6 rounded-lg shadow-md bg-white dark:bg-gray-200"}`}>
        <div className="flex justify-center items-center mb-4">
          <h1 className="text-2xl font-bold text-center w-full">
            <span className="animate-pulse inline-block">🤖</span> guardian enabled ✅
          </h1>
        </div>

        <div className="flex justify-center mb-6">
          <img
            src={qrImage}
            alt="qr code"
            className="w-72 h-72 bg-white p-2 rounded shadow"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className={`${darkMode? "bg-gray-100 dark:bg-gray-700 p-4 rounded shadow" : "bg-gray-100 dark:bg-gray-100 p-4 rounded shadow"}`}>
            <p className="text-green-700 dark:text-green-300 text-sm">💰 Wallet Balance</p>
            <p className="font-bold">{balance ? `${balance} EGLD` : 'loading...'} {usdValue && usdValue !== "N/A" ? `≈ $${usdValue}` : ''}</p>
          </div>
          <div className={`${darkMode? "bg-gray-100 dark:bg-gray-700 p-4 rounded shadow" : "bg-gray-100 dark:bg-gray-100 p-4 rounded shadow"}`}>
            <p className="text-gray-700 dark:text-gray-300 text-sm">📦 ESDT Tokens</p>
            <p className="font-bold">{esdtCount ?? '...'}</p>
          </div>
          <div className={`${darkMode? "bg-gray-100 dark:bg-gray-700 p-4 rounded shadow" : "bg-gray-100 dark:bg-gray-100 p-4 rounded shadow"}`}>
            <p className="text-gray-700 dark:text-gray-300 text-sm">🎨 NFTs</p>
            <p className="font-bold">{nftCount ?? '...'}</p>
          </div>
          <div className={`${darkMode? "bg-gray-100 dark:bg-gray-700 p-4 rounded shadow" : "bg-gray-100 dark:bg-gray-100 p-4 rounded shadow"}`}>
            <p className="text-gray-700 dark:text-gray-300 text-sm">🔁 Attempts</p>
            <p className="font-bold">{attempts}</p>
          </div>
          <div className={`${darkMode? "bg-gray-100 dark:bg-gray-700 p-4 rounded shadow" : "bg-gray-100 dark:bg-gray-100 p-4 rounded shadow"}`}>
            <p className="text-gray-700 dark:text-gray-300 text-sm">🔎 Copied</p>
            <p className="font-bold">{copiedCount}</p>
          </div>
        </div>

        <div className={`${darkMode? "bg-gray-100 dark:bg-gray-700 p-4 rounded-md text-sm mb-4" : "bg-gray-700 dark:bg-gray-100 p-4 rounded-md text-sm mb-4"}`}>
          <p><strong>public address:</strong> erd17taamhdngx3km3y74697yhzk7zxprxjt4klem5jt0wcmp80q9rus2vf688</p>
          <div className={`${darkMode? "grid grid-cols-3 gap-2 mt-2 text-xs font-mono text-gray-800 dark:text-gray-100 [&>*]:blur-sm hover:[&>*]:blur-none transition-all duration-300" : "grid grid-cols-3 gap-2 mt-2 text-xs font-mono text-gray-800 dark:text-gray-800 [&>*]:blur-sm hover:[&>*]:blur-none transition-all duration-300"}`}>
            <div>charge</div><div>pull</div><div>social</div>
            <div>wagon</div><div>sing</div><div>senior</div>
            <div>acquire</div><div>sweet</div><div>patient</div>
            <div>special</div><div>special</div><div>attack</div>
            <div>property</div><div>elite</div><div>march</div>
            <div>initial</div><div>health</div><div>cream</div>
            <div>almost</div><div>switch</div><div>race</div>
            <div>trumpet</div><div>buyer</div><div>lawsuit</div>
          </div>
          <button
            onClick={handleCopySeed}
            className={`text-xs mt-1 px-2 py-1 rounded transition-all duration-300 ${copied ? 'bg-green-600 text-white' : 'bg-gray-400 text-white'}`}
          >
            {copied ? '✅ copied' : '📋 copy seed'}
          </button>
          <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">🔎 copied {copiedCount} times</p>
          <p className="mt-2 text-gray-800 dark:text-gray-200">this wallet is protected with on-chain security mechanisms.<br />try entering the correct seed phrase to access the funds.</p>
        </div>

        <div className="space-y-2 mb-4">
          <input
            type="text"
            className={`${darkMode? "w-full px-4 py-2 border border-gray-400 rounded-md bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white" : "w-full px-4 py-2 border border-gray-400 rounded-md bg-gray-100 dark:bg-gray-100 text-gray-900 dark:text-white"}`}
            placeholder="enter the seed phrase (24 words)"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            className="w-full bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-md text-white"
            onClick={handleAttempt}
          >
            try to break the wallet
          </button>
          {status && <p className={`${darkMode? "text-sm text-yellow-600 dark:text-yellow-300 mt-2" : "text-sm text-red-600 dark:text-red-500 mt-2"}`}>{status}</p>}
        </div>

        <div className="text-xs text-blue-600 dark:text-blue-300 pt-2">
          🔗 official mvx wallet recovery link - <a href="https://wallet.multiversx.com/recover" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-400">https://wallet.multiversx.com/recover</a>
        </div>
      </div>
    </div>
  );
}
