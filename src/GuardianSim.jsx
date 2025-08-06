import React, { useState, useEffect } from 'react';

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
      setStatus('🔒 Access blocked: Wallet is protected by Guardian 2FA.');
    } else {
      setStatus('❌ Incorrect phrase. Try again.');
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
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-900 text-gray-100 select-none">
      <div className="w-full max-w-2xl bg-gray-800 p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-2">
  <span className="animate-pulse inline-block">🤖</span> Guardian Enabled ✅
</h1>
<p className="text-sm text-green-300">
  💰 Wallet Balance: {balance ? `${balance} EGLD` : 'Loading...'} {usdValue && usdValue !== "N/A" ? `≈ $${usdValue}` : ''}
</p>
<p className="text-xs text-gray-400">
  📦 ESDT Tokens: <strong>{esdtCount ?? '...'}</strong> · 🎨 NFTs: <strong>{nftCount ?? '...'}</strong>
</p>
<p className="text-xs text-gray-400 mb-4">
  🔁 Number of attempts so far: <strong>{attempts}</strong> · 🔎 Copied <strong>{copiedCount}</strong> times
</p>
        <div className="bg-gray-700 p-4 rounded-md text-sm mb-4">
          <p><strong>Public Address:</strong> erd17taamhdngx3km3y74697yhzk7zxprxjt4klem5jt0wcmp80q9rus2vf688</p>
<div className="grid grid-cols-3 gap-2 mt-2 text-xs font-mono text-gray-300 [&>*]:blur-sm hover:[&>*]:blur-none transition-all duration-300">
  <div>charge</div>     <div>2. pull</div>        <div>3. social</div>
  <div>4. wagon</div>      <div>5. sing</div>        <div>6. senior</div>
  <div>7. acquire</div>    <div>8. sweet</div>       <div>9. patient</div>
  <div>10. special</div>   <div>11. special</div>    <div>12. attack</div>
  <div>13. property</div>  <div>14. elite</div>      <div>15. march</div>
  <div>16. initial</div>   <div>17. health</div>     <div>18. cream</div>
  <div>19. almost</div>    <div>20. switch</div>     <div>21. race</div>
  <div>22. trumpet</div>   <div>23. buyer</div>      <div>24. lawsuit</div>
</div>
          <button
            onClick={handleCopySeed}
            className={`text-xs mt-1 px-2 py-1 rounded transition-all duration-300 ${copied ? 'bg-green-600 text-white' : 'bg-gray-600 text-white'}`}
          >
            {copied ? '✅ copied' : '📋 copy seed'}
          </button>
                    <p className="mt-2 text-gray-300">This wallet is protected with on-chain security mechanisms.<br />Try entering the correct seed phrase to access the funds.</p>
        </div>

        <div className="space-y-2 mb-4">
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-900 text-gray-100"
            placeholder="Enter the seed phrase (24 words)"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            className="w-full bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-md text-white"
            onClick={handleAttempt}
          >
            Try to break the wallet
          </button>
          {status && <p className="text-sm text-yellow-400 mt-2">{status}</p>}
        </div>

        

        <div className="text-xs text-red-400 pt-2">
          ⚠️ Never enter a real seed phrase, without Guardian enabled! This app is for educational and testing purposes only.
        </div>
      </div>
    </div>
  );
}
