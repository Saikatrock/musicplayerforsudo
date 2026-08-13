import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const PLAYLIST_ID = 'PLHL89Bd6izO0';

function useYouTubePlayer() {
  const player = useRef(null);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [song, setSong] = useState('A song for Sudo');

  useEffect(() => {
    const existing = document.querySelector('script[src="https://www.youtube.com/iframe_api"]');
    if (!existing) {
      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      document.head.appendChild(script);
    }
    window.onYouTubeIframeAPIReady = () => {
      player.current = new window.YT.Player('youtube-player', {
        height: '1', width: '1',
        playerVars: { listType: 'playlist', list: PLAYLIST_ID, controls: 0, rel: 0 },
        events: {
          onReady: () => setReady(true),
          onStateChange: (event) => {
            setPlaying(event.data === window.YT.PlayerState.PLAYING);
            if (event.data === window.YT.PlayerState.PLAYING) {
              const data = player.current?.getVideoData?.();
              if (data?.title) setSong(data.title);
            }
          }
        }
      });
    };
    if (window.YT?.Player) window.onYouTubeIframeAPIReady();
  }, []);

  const play = () => { player.current?.playVideo(); setPlaying(true); };
  const toggle = () => playing ? player.current?.pauseVideo() : play();
  return { ready, playing, song, play, toggle, next: () => player.current?.nextVideo(), previous: () => player.current?.previousVideo(), volume: v => player.current?.setVolume(Number(v)) };
}

function MusicPlayer({ player }) {
  return <aside className={`music-player ${player.playing ? 'is-playing' : ''}`} aria-label="Music controls">
    <div className="cassette" aria-hidden="true"><i /><i /><b>♥</b></div>
    <div className="track"><span>NOW PLAYING</span><strong>{player.song}</strong></div>
    <div className="controls">
      <button onClick={player.previous} aria-label="Previous song">↞</button>
      <button className="play-small" onClick={player.toggle} aria-label={player.playing ? 'Pause' : 'Play'}>{player.playing ? 'Ⅱ' : '▶'}</button>
      <button onClick={player.next} aria-label="Next song">↠</button>
      <input aria-label="Volume" type="range" defaultValue="60" onChange={e => player.volume(e.target.value)} />
    </div>
  </aside>;
}

const notes = [
  'Every love story needs a soundtrack. This one’s ours.',
  'Some songs remind me of you. Some songs sound like you.',
  'If I could press rewind, I’d choose you again.',
  'My favorite place is wherever you are.'
];

function App() {
  const player = useYouTubePlayer();
  const [begun, setBegun] = useState(false);
  const begin = () => { player.play(); setBegun(true); setTimeout(() => document.querySelector('#story')?.scrollIntoView({ behavior: 'smooth' }), 350); };
  return <main>
    <div id="youtube-player" aria-hidden="true" />
    <section className={`opening ${begun ? 'opening-away' : ''}`}>
      <div className="stars" /><div className="moon" />
      <div className="opening-copy">
        <p className="eyebrow">a little world, made just for you</p>
        <h1>I LOVE YOU,<br /><em>SUDO</em></h1>
        <p className="script">You are my Princess ♡</p>
        <p className="intro">I made this little world just for you.</p>
        <button className="begin" onClick={begin} disabled={!player.ready}><small>I have something to play for you...</small>▶&nbsp; PLAY</button>
      </div>
      <div className="cityline" aria-hidden="true" />
    </section>

    <MusicPlayer player={player} />
    <section id="story" className="hero section">
      <div className="stamp">FOR MY FAVORITE PERSON</div>
      <p className="eyebrow">this is for you, always</p>
      <h2>SUDO <span>♥</span></h2>
      <div className="hero-columns"><div><p className="lead">There are a million things I could give you...</p><p className="lead muted">But I wanted to give you a little place where our songs could live.</p></div><div className="polaroid"><div className="illustration walk"><div className="person one"/><div className="person two"/><div className="lamp"/></div><small>somewhere in our little movie</small></div></div>
    </section>

    <section className="portrait-section">
      <div className="portrait-copy">
        <p className="eyebrow">a picture of us, in my mind</p>
        <p>Every moment with you feels like something I want to keep forever.</p>
      </div>
      <figure className="love-portrait">
        <img src="/images/sudo-love-portrait.png" alt="A romantic watercolor illustration of a couple holding each other" />
        <figcaption>you &amp; me, in our little world</figcaption>
      </figure>
    </section>

    <section className="letter-section section">
      <div className="paper">
        <div className="paper-fold" />
        <p className="eyebrow">from my heart to yours</p><h2>A LITTLE LETTER<br />FOR YOU</h2>
        <article className="letter">Dear Sudo,<br /><br />I wanted to make something that wasn’t just another message or another picture.<br /><br />So I made you a little world. A place where our songs can play, where the memories can stay, and where you can always remember how much you mean to me.<br /><br />You are my princess. You are one of the most beautiful parts of my life.<br /><br />And no matter how many songs play, I’ll always have one thing to say:<br /><br /><strong>I love you, Sudo.<br />I love you forever. ♥</strong></article>
        <p className="signed">with all my love</p>
      </div>
    </section>

    <section className="memories">
      <div className="memory scene-one"><div className="scene-art bicycles">♡</div><p>It started with a feeling...</p></div>
      <div className="memory scene-two"><div className="scene-art headphones">♫</div><p>Then came the songs.</p></div>
      <div className="memory scene-three"><div className="scene-art constellation">✦ ✧ ✦</div><p>And somehow, every song started sounding like you.</p></div>
      <div className="memory scene-four"><div className="scene-art hands">♡</div><p>And now...</p><h2>I LOVE YOU, SUDO <span>♥</span></h2></div>
    </section>

    <section className="whispers section">{notes.map((note, i) => <p key={note} className={`whisper whisper-${i}`}>{note}</p>)}</section>
    <footer className="finale"><div className="stars" /><div className="final-couple"><span>●</span><span>●</span></div><p className="eyebrow">our soundtrack, our story</p><h2>YOU ARE MY<br /><em>PRINCESS</em></h2><h3>I LOVE YOU, SUDO</h3><p className="script">I love you forever ♥</p><p className="closing">This little corner of the internet will always be yours.</p><small>Made with love, just for you.</small></footer>
  </main>;
}
createRoot(document.getElementById('root')).render(<App />);
