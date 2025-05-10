import { useEffect, useState } from "react";
import "./App.css";

const countdownTarget = new Date("2025-05-31T23:59:59").getTime();

const leaderboardData = [
  { place: 1, user: "xG9••••••", wagered: "$1,943.60", reward: "$65" },
  { place: 2, user: "FZ_•••••••", wagered: "$1,384.90", reward: "$40" },
  { place: 3, user: "blu•••", wagered: "$1,011.25", reward: "$25" },
  { place: 4, user: "yoK••••", wagered: "$624.00", reward: "$15" },
  { place: 5, user: "tn8••••", wagered: "$435.10", reward: "$5" },
];

function getOrdinal(n) {
  const s = ["th", "st", "nd", "rd"],
    v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

function App() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownTarget - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="leaderboard-wrapper">
      <h1 className="title">🏆 Jackbit Wager Leaderboard</h1>
      <p className="subtitle">💰 Prize Pool: <span>$150</span></p>
      <p className="code-text">Use code <span>NORDIC</span> to join the leaderboard</p>

      <div className="top-three">
        {leaderboardData.slice(0, 3).map((entry) => (
          <div key={entry.place} className={`card place-${entry.place}`}>
            <div className="place">{getOrdinal(entry.place)}</div>
            <div className="user">{entry.user}</div>
            <div className="wagered">Wagered: {entry.wagered}</div>
            <div className="reward">Reward: {entry.reward}</div>
          </div>
        ))}
      </div>

      <div className="countdown">
        ⏳ Ends in: {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
      </div>

      <div className="remaining-players">
        <div className="table-header">
          <span>Place</span>
          <span>User</span>
          <span>Wagered</span>
          <span>Prize</span>
        </div>
        {leaderboardData.slice(3).map((entry) => (
          <div key={entry.place} className="table-row">
            <span>#{entry.place}</span>
            <span>{entry.user}</span>
            <span>{entry.wagered}</span>
            <span>{entry.reward}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
