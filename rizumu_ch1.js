window.RIZUMU_GAMES = window.RIZUMU_GAMES || {};

(function() {
    function playTone(type, freq = 440, dur = 0.14) {
        try {
            ensureAudio();
            let dest = (typeof masterOut !== 'undefined' && masterOut) ? masterOut : audioCtx.destination;
            let now = audioCtx.currentTime;
            let bgmVol = getBgmVol();
            let seVol  = getSeVol();

            if (type === 'jingle') {
                const seq = new Array(
                    { t: 0.00, d: 0.12, f: new Array(261.63, 523.25) },
                    { t: 0.13, d: 0.12, f: new Array(293.66, 587.33) },
                    { t: 0.26, d: 0.12, f: new Array(329.63, 659.25) },
                    { t: 0.40, d: 0.70, f: new Array(196.00, 392.00, 493.88, 587.33, 783.99) }
                );
                seq.forEach(s => s.f.forEach((hz, i) => {
                    let o = audioCtx.createOscillator(), g = audioCtx.createGain();
                    o.type = (i === 0) ? 'sine' : 'triangle';
                    o.frequency.setValueAtTime(hz, now + s.t);
                    g.gain.setValueAtTime(0.001, now + s.t);
                    g.gain.linearRampToValueAtTime((i === 0 ? 0.10 : 0.08) * seVol, now + s.t + 0.015);
                    g.gain.exponentialRampToValueAtTime(0.001, now + s.t + s.d);
                    o.connect(g); g.connect(dest);
                    o.start(now + s.t); o.stop(now + s.t + s.d + 0.02);
                }));
                return;
            }

            if (type === 'intro_count') {
                new Array(261.63, 523.25).forEach((hz, i) => {
                    let o = audioCtx.createOscillator(), g = audioCtx.createGain();
                    o.type = (i === 0) ? 'sine' : 'triangle';
                    o.frequency.setValueAtTime(hz, now);
                    g.gain.setValueAtTime(0.001, now);
                    g.gain.linearRampToValueAtTime((i === 0 ? 0.09 : 0.07) * seVol, now + 0.012);
                    g.gain.exponentialRampToValueAtTime(0.001, now + 0.11);
                    o.connect(g); g.connect(dest);
                    o.start(now); o.stop(now + 0.12);
                });
                return;
            }

            if (type === 'rank_bad') {
                new Array(146.83, 138.59).forEach(hz => {
                    let o = audioCtx.createOscillator(), g = audioCtx.createGain();
                    o.type = 'triangle'; o.frequency.setValueAtTime(hz, now);
                    o.frequency.linearRampToValueAtTime(hz * 0.78, now + 0.85);
                    g.gain.setValueAtTime(0.16 * seVol, now);
                    g.gain.exponentialRampToValueAtTime(0.001, now + 0.9);
                    o.connect(g); g.connect(dest); o.start(now); o.stop(now + 0.92);
                });
                return;
            }
            if (type === 'rank_normal') {
                const notes = new Array({ t: 0, f: 392.00, d: 0.14 }, { t: 0.15, f: 349.23, d: 0.28 });
                notes.forEach(n => {
                    let o = audioCtx.createOscillator(), g = audioCtx.createGain();
                    o.type = 'triangle'; o.frequency.setValueAtTime(n.f, now + n.t);
                    g.gain.setValueAtTime(0.16 * seVol, now + n.t);
                    g.gain.exponentialRampToValueAtTime(0.001, now + n.t + n.d);
                    o.connect(g); g.connect(dest); o.start(now + n.t); o.stop(now + n.t + n.d + 0.02);
                });
                return;
            }
            if (type === 'rank_tofu') {
                const notes = new Array({ t: 0, f: 392.00, d: 0.22 }, { t: 0.24, f: 440.00, d: 0.55 });
                notes.forEach(n => {
                    let o = audioCtx.createOscillator(), g = audioCtx.createGain();
                    o.type = 'triangle'; o.frequency.setValueAtTime(n.f, now + n.t);
                    g.gain.setValueAtTime(0.18 * seVol, now + n.t);
                    g.gain.exponentialRampToValueAtTime(0.001, now + n.t + n.d);
                    o.connect(g); g.connect(dest); o.start(now + n.t); o.stop(now + n.t + n.d + 0.02);
                });
                return;
            }
            let o = audioCtx.createOscillator(), g = audioCtx.createGain();
            if (type === 'cue_pip') {
                o.type = 'sine'; o.frequency.setValueAtTime(freq || 987.77, now);
                g.gain.setValueAtTime(0.14 * seVol, now);
                g.gain.exponentialRampToValueAtTime(0.001, now + 0.075);
                o.connect(g); g.connect(dest); o.start(now); o.stop(now + 0.085);
            } else if (type === 'cue_pon') {
                o.type = 'triangle'; o.frequency.setValueAtTime(freq || 523.25, now);
                o.frequency.exponentialRampToValueAtTime((freq || 523.25) * 1.18, now + 0.08);
                g.gain.setValueAtTime(0.16 * seVol, now);
                g.gain.exponentialRampToValueAtTime(0.001, now + 0.11);
                o.connect(g); g.connect(dest); o.start(now); o.stop(now + 0.12);
            } else if (type === 'hit_gan') {
                o.type = 'triangle'; o.frequency.setValueAtTime(freq || 659.25, now);
                o.frequency.exponentialRampToValueAtTime(987.77, now + 0.09);
                g.gain.setValueAtTime(0.20 * seVol, now);
                g.gain.exponentialRampToValueAtTime(0.001, now + 0.13);
                o.connect(g); g.connect(dest); o.start(now); o.stop(now + 0.14);
            } else if (type === 'hit_gashan') {
                new Array(392.00, 783.99).forEach((hz, idx) => {
                    let og = audioCtx.createOscillator(), gg = audioCtx.createGain();
                    og.type = idx === 0 ? 'sawtooth' : 'triangle';
                    og.frequency.setValueAtTime(hz, now);
                    og.frequency.exponentialRampToValueAtTime(hz * 1.35, now + 0.11);
                    gg.gain.setValueAtTime((idx === 0 ? 0.11 : 0.18) * seVol, now);
                    gg.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
                    og.connect(gg); gg.connect(dest); og.start(now); og.stop(now + 0.16);
                });
            } else if (type === 'miss') {
                o.type = 'triangle'; o.frequency.setValueAtTime(155, now);
                o.frequency.linearRampToValueAtTime(95, now + 0.16);
                g.gain.setValueAtTime(0.16 * seVol, now);
                g.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
                o.connect(g); g.connect(dest); o.start(now); o.stop(now + 0.19);
            } else if (type === 'lh_bass') {
                o.type = 'sine'; o.frequency.setValueAtTime(freq, now);
                g.gain.setValueAtTime(0.001, now);
                g.gain.linearRampToValueAtTime(0.09 * bgmVol, now + 0.015);
                g.gain.exponentialRampToValueAtTime(0.001, now + dur);
                o.connect(g); g.connect(dest); o.start(now); o.stop(now + dur + 0.02);
            } else if (type === 'lh_chord') {
                o.type = 'triangle'; o.frequency.setValueAtTime(freq, now);
                g.gain.setValueAtTime(0.001, now);
                g.gain.linearRampToValueAtTime(0.042 * bgmVol, now + 0.015);
                g.gain.exponentialRampToValueAtTime(0.001, now + dur);
                o.connect(g); g.connect(dest); o.start(now); o.stop(now + dur + 0.02);
            }
        } catch (e) {}
    }
    const BPM = 120;
    const BEAT_SEC = 60 / BPM;

    const PRACTICE_MODES = new Array(
        {
            label: "1連：（ピッ・ピッ）ガン！",
            lenBeats: 6.0,
            cues: new Array({ off: 1.0, kind: 'pip', hz: 880 }, { off: 2.0, kind: 'pip', hz: 1046.5 }),
            hits: new Array({ off: 3.0, sound: 'gan', isGold: false, packLead: 2.3 })
        },
        {
            label: "2連：（ピ・ピ・ピ）ガン・ガン！",
            lenBeats: 6.0,
            cues: new Array({ off: 1.0, kind: 'pip', hz: 880 }, { off: 1.5, kind: 'pip', hz: 987.77 }, { off: 2.0, kind: 'pip', hz: 1174.66 }),
            hits: new Array(
                { off: 3.0, sound: 'gan', isGold: false, packLead: 2.9 },
                { off: 4.0, sound: 'gan', isGold: false, packLead: 2.1 }
            )
        },
        {
            label: "3連続：（ポン・ポン・ポン）ガシャン×3！",
            lenBeats: 8.0,
            cues: new Array({ off: 1.0, kind: 'pon', hz: 523.25 }, { off: 2.0, kind: 'pon', hz: 587.33 }, { off: 3.0, kind: 'pon', hz: 659.25 }),
            hits: new Array(
                { off: 4.0, sound: 'gashan', isGold: false, packLead: 3.2 },
                { off: 5.0, sound: 'gashan', isGold: false, packLead: 2.4 },
                { off: 6.0, sound: 'gashan', isGold: false, packLead: 1.8 }
            )
        }
    );

    function makePat(type, gold3rd = false) {
        if (type === 1) {
            return {
                len: 6.0,
                cues: new Array({ off: 1.0, kind: 'pip', hz: 880 }, { off: 2.0, kind: 'pip', hz: 1046.5 }),
                hits: new Array({ off: 3.0, sound: 'gan', isGold: false, packLead: 2.4 })
            };
        } else if (type === 2) {
            return {
                len: 6.0,
                cues: new Array({ off: 1.0, kind: 'pip', hz: 880 }, { off: 1.5, kind: 'pip', hz: 987.77 }, { off: 2.0, kind: 'pip', hz: 1174.66 }),
                hits: new Array(
                    { off: 3.0, sound: 'gan', isGold: false, packLead: 2.9 },
                    { off: 4.0, sound: 'gan', isGold: false, packLead: 2.0 }
                )
            };
        } else {
            return {
                len: 8.0,
                cues: new Array(
                    { off: 1.0, kind: 'pon', hz: 523.25 },
                    { off: 2.0, kind: 'pon', hz: 587.33 },
                    { off: 3.0, kind: 'pon', hz: 659.25 }
                ),
                hits: new Array(
                    { off: 4.0, sound: 'gashan', isGold: false, packLead: 3.1 },
                    { off: 5.0, sound: 'gashan', isGold: false, packLead: 2.3 },
                    { off: 6.0, sound: 'gashan', isGold: gold3rd, packLead: 1.7 }
                )
            };
        }
    }

    const PROD_BLOCKS = new Array(
        makePat(1),
        makePat(1),
        makePat(2),
        makePat(2),
        makePat(3),
        makePat(1),
        makePat(2),
        makePat(3),
        makePat(1),
        makePat(2),
        makePat(3),
        makePat(1),
        makePat(2),
        makePat(3, true),
        makePat(1)
    );

    const LH_PROGRESSION = new Array(
        { bass: 130.81, chord: new Array(261.63, 329.63) },
        { bass: 130.81, chord: new Array(261.63, 329.63) },
        { bass: 174.61, chord: new Array(261.63, 349.23) },
        { bass: 174.61, chord: new Array(261.63, 349.23) },
        { bass: 146.83, chord: new Array(261.63, 349.23) },
        { bass: 196.00, chord: new Array(246.94, 349.23) },
        { bass: 130.81, chord: new Array(261.63, 329.63) },
        { bass: 196.00, chord: new Array(246.94, 392.00) }
    );
    let phase = 'eyecatch';
    let stateTimer = 0;

    let isPaused = false;
    let pauseMenuIdx = 0;
    let pauseStartTime = 0;

    let pracTypeIdx = 0;
    let pracSuccessCount = 0;
    let pracBlockHadError = false;
    let pracClearWait = false;
    let isDemoMode = false;

    let prodIdx = 0;
    let blockStartBeat = 0;
    let blockEndBeat = 0;

    let totalNotesCount = 0;
    let successNotesCount = 0;
    let perfectNotesCount = 0;
    let goldMissed = false;
    let emptyMissCount = 0;

    let finalRankVal = 0;
    let isPerfectClear = false;
    let resStepTimer = 0;

    let modeStartTime = 0;
    let lastBeatInt = -1;
    let allCues = new Array();
    let allNotes = new Array();
    let splashes = new Array();
    let eyeSplashes = new Array();
    let eyeHitPlayed = false;

    let gearAngle = 0;
    let pcOn = false;
    let pcBounce = 0;
    let pistonKick = 0;

    function togglePause() {
        if (phase !== 'practice' && phase !== 'prod') return;
        if (!isPaused) {
            isPaused = true;
            pauseMenuIdx = 0;
            pauseStartTime = performance.now() / 1000;
            playPikon(587.33);
        } else {
            isPaused = false;
            modeStartTime += (performance.now() / 1000) - pauseStartTime;
            playPikon(659.25);
        }
    }

    function executePauseAction(idx) {
        if (idx === 0) {
            isPaused = false;
            modeStartTime += (performance.now() / 1000) - pauseStartTime;
            playPikon(659.25);
        } else if (idx === 1) {
            isPaused = false;
            playPikon(659.25);
            window.RIZUMU_GAMES["1-1"].start();
        } else if (idx === 2) {
            isPaused = false;
            phase = 'stopped';
            playPikon(523.25);
            if (typeof window.quitRizumuGame === 'function') {
                window.quitRizumuGame();
            } else if (typeof window.finishRizumuGame === 'function') {
                window.finishRizumuGame(-1);
            }
        }
    }

    function addSplash(x, y, count) {
        for (let i = 0; i < count; i++) {
            let a = -Math.PI * 0.15 - Math.random() * Math.PI * 0.7;
            let spd = 65 + Math.random() * 115;
            splashes.push({
                x: x, y: y,
                vx: Math.cos(a) * spd + (Math.random() - 0.5) * 60,
                vy: Math.sin(a) * spd,
                life: 0.45 + Math.random() * 0.15,
                maxLife: 0.6,
                size: 3 + Math.random() * 2.5
            });
        }
    }

    function addEyeSplash(x, y, count) {
        for (let i = 0; i < count; i++) {
            let a = -Math.PI * 0.1 - Math.random() * Math.PI * 0.8;
            let spd = 80 + Math.random() * 140;
            eyeSplashes.push({
                x: x, y: y,
                vx: Math.cos(a) * spd,
                vy: Math.sin(a) * spd,
                life: 0.55 + Math.random() * 0.2,
                maxLife: 0.75,
                size: 3.5 + Math.random() * 3
            });
        }
    }

    function queueBlock(startBeat, blk) {
        blk.cues.forEach(c => {
            allCues.push({
                beat: startBeat + c.off,
                kind: c.kind,
                hz: c.hz,
                played: false
            });
        });
        blk.hits.forEach((h, idx) => {
            let tBeat = startBeat + h.off;
            allNotes.push({
                spawnTofuBeat: tBeat - 3.0,
                targetBeat: tBeat,
                packLead: h.packLead,
                sound: h.sound,
                isGold: !!h.isGold,
                isLastInBlock: (idx === blk.hits.length - 1),
                hitState: 'none',
                missX: 650,
                flyT: 0,
                fallT: 0,
                shineTimer: 0
            });
        });
    }

    function setupPracticeStep() {
        pracSuccessCount = 0;
        pracBlockHadError = false;
        pracClearWait = false;
        allCues = new Array();
        allNotes = new Array();
        lastBeatInt = -1;
        modeStartTime = performance.now() / 1000;
        const pm = PRACTICE_MODES.at(pracTypeIdx);
        blockStartBeat = 0;
        blockEndBeat = pm.lenBeats;
        queueBlock(0, pm);
    }

    function toggleDemoMode() {
        isDemoMode = !isDemoMode;
        playPikon(isDemoMode ? 783.99 : 587.33);
        setupPracticeStep();
    }

    function enterProductionWithFade() {
        isDemoMode = false;
        pracClearWait = false;
        phase = 'fade_to_prod';
        stateTimer = 0;
        allCues = new Array();
        allNotes = new Array();
    }

    function beginProductionActual() {
        phase = 'prod';
        prodIdx = 0;
        modeStartTime = performance.now() / 1000;
        lastBeatInt = -1;
        allCues = new Array();
        allNotes = new Array();
        pcOn = true;

        totalNotesCount = 0;
        successNotesCount = 0;
        perfectNotesCount = 0;
        goldMissed = false;
        emptyMissCount = 0;

        const b = PROD_BLOCKS.at(0);
        blockStartBeat = 8.0;
        blockEndBeat = 8.0 + b.len;
        queueBlock(8.0, b);
    }

    function computeFinalResult() {
        let effectiveTotal = totalNotesCount + emptyMissCount;
        let rate = effectiveTotal > 0 ? (successNotesCount / effectiveTotal) * 100 : 0;

        isPerfectClear = (totalNotesCount > 0 && perfectNotesCount === totalNotesCount && emptyMissCount === 0 && !goldMissed);

        if (rate <= 40) {
            finalRankVal = 0;
        } else if (rate <= 85 || goldMissed) {
            finalRankVal = 1;
        } else {
            finalRankVal = isPerfectClear ? 3 : 2;
        }

        phase = 'fade_to_res';
        stateTimer = 0;
    }
    window.RIZUMU_GAMES["1-1"] = {
        start() {
            phase = 'eyecatch';
            stateTimer = 0;
            isPaused = false;
            pauseMenuIdx = 0;
            pracTypeIdx = 0;
            pracSuccessCount = 0;
            pracBlockHadError = false;
            pracClearWait = false;
            isDemoMode = false;
            pcOn = false;
            pcBounce = 0;
            pistonKick = 0;
            gearAngle = 0;
            eyeHitPlayed = false;
            eyeSplashes = new Array();
            splashes = new Array();
            allCues = new Array();
            allNotes = new Array();
            playTone('jingle');

            if (!window._rizumu11KeyHandler) {
                window._rizumu11KeyHandler = function(ev) {
                    if (phase === 'stopped' || phase === 'done') return;
                    if (ev.repeat) return;
                    if (ev.key === 'm' || ev.key === 'M' || ev.code === 'KeyM') {
                        if (phase === 'practice' || phase === 'prod') {
                            ev.preventDefault();
                            togglePause();
                        }
                        return;
                    }
                    if (isPaused) {
                        if (ev.code === 'ArrowUp' || ev.key === 'w' || ev.key === 'W') {
                            ev.preventDefault();
                            pauseMenuIdx = (pauseMenuIdx + 2) % 3;
                            playPikon(523.25);
                        } else if (ev.code === 'ArrowDown' || ev.key === 's' || ev.key === 'S') {
                            ev.preventDefault();
                            pauseMenuIdx = (pauseMenuIdx + 1) % 3;
                            playPikon(523.25);
                        } else if (ev.code === 'Enter') {
                            ev.preventDefault();
                            executePauseAction(pauseMenuIdx);
                        }
                    }
                };
                window.addEventListener('keydown', window._rizumu11KeyHandler);
            }
        },
        stop() {
            phase = 'stopped';
            isPaused = false;
            if (window._rizumu11KeyHandler) {
                window.removeEventListener('keydown', window._rizumu11KeyHandler);
                window._rizumu11KeyHandler = null;
            }
        },
        onInput(kind, e) {
            if (isPaused) {
                if (kind === 'key' && !e.repeat && e.code === 'Space') {
                    executePauseAction(pauseMenuIdx);
                } else if (kind === 'pointer') {
                    const cvs = e.target;
                    const rect = cvs.getBoundingClientRect();
                    const lx = (e.clientX - rect.left) * (940 / rect.width);
                    const ly = (e.clientY - rect.top) * (520 / rect.height);
                    if (lx >= 330 && lx <= 610) {
                        if (ly >= 200 && ly <= 252) { pauseMenuIdx = 0; executePauseAction(0); }
                        else if (ly >= 260 && ly <= 312) { pauseMenuIdx = 1; executePauseAction(1); }
                        else if (ly >= 320 && ly <= 372) { pauseMenuIdx = 2; executePauseAction(2); }
                    }
                }
                return;
            }

            if (kind === 'key') {
                if (e.repeat) return;
                if ((e.key === 's' || e.key === 'S') && phase === 'practice') {
                    playPikon(659.25);
                    enterProductionWithFade();
                    return;
                }
                if ((e.key === 'd' || e.key === 'D') && phase === 'practice') {
                    toggleDemoMode();
                    return;
                }
                if (e.code !== 'Space') return;
            }

            if (kind === 'pointer' && phase === 'practice') {
                const cvs = e.target;
                const rect = cvs.getBoundingClientRect();
                const lx = (e.clientX - rect.left) * (940 / rect.width);
                const ly = (e.clientY - rect.top) * (520 / rect.height);
                if (lx >= 18 && lx <= 185 && ly >= 468 && ly <= 510) {
                    playPikon(659.25);
                    enterProductionWithFade();
                    return;
                }
                if (lx >= 775 && lx <= 915 && ly >= 16 && ly <= 60) {
                    toggleDemoMode();
                    return;
                }
            }

            if (phase === 'res_step1' && resStepTimer > 0.25) {
                playPikon(587.33); phase = 'res_step2'; resStepTimer = 0; return;
            }
            if (phase === 'res_step2' && resStepTimer > 0.35) {
                phase = 'res_step3'; resStepTimer = 0;
                if (finalRankVal === 0) playTone('rank_bad');
                else if (finalRankVal === 1) playTone('rank_normal');
                else playTone('rank_tofu');
                return;
            }
            if (phase === 'res_step3' && resStepTimer > 0.45) {
                playPikon(587.33); phase = 'res_card'; resStepTimer = 0; return;
            }
            if (phase === 'res_card' && resStepTimer > 0.45) {
                playPikon(659.25); phase = 'done';
                window.finishRizumuGame(finalRankVal);
                return;
            }

            if (phase !== 'practice' && phase !== 'prod') return;

            if (phase === 'practice' && (isDemoMode || pracClearWait)) return;

            pistonKick = 1.0;
            let curBeat = ((performance.now() / 1000) - modeStartTime) / BEAT_SEC;

            let best = null, minDiff = 999;
            allNotes.forEach(n => {
                if (n.hitState === 'none') {
                    let d = Math.abs(curBeat - n.targetBeat);
                    if (d < minDiff) { minDiff = d; best = n; }
                }
            });

            if (best && minDiff <= 0.32) {
                if (phase === 'prod') {
                    totalNotesCount++;
                    successNotesCount++;
                }

                if (minDiff <= 0.13) {
                    best.hitState = 'perf';
                    if (phase === 'prod') {
                        perfectNotesCount++;
                        pcBounce = 1.0;
                    }
                    addSplash(650, 208, 14);
                } else {
                    best.hitState = 'good';
                    addSplash(650, 208, 7);
                }

                if (best.sound === 'gashan') playTone('hit_gashan');
                else playTone('hit_gan', 659.25);

                if (best.isGold) {
                    best.shineTimer = 0.45;
                    addSplash(650, 212, 18);
                }
            } else {
                playTone('miss');
                if (phase === 'prod') {
                    emptyMissCount++;
                } else if (phase === 'practice') {
                    pracSuccessCount = 0;
                    pracBlockHadError = true;
                }
            }
        },
        update(dt) {
            if (isPaused) return;

            if (pistonKick > 0) pistonKick = Math.max(0, pistonKick - dt * 6.5);
            if (pcBounce > 0) pcBounce = Math.max(0, pcBounce - dt * 4.5);

            for (let i = splashes.length - 1; i >= 0; i--) {
                let s = splashes[i];
                s.x += s.vx * dt; s.y += s.vy * dt; s.vy += 280 * dt; s.life -= dt;
                if (s.life <= 0) splashes.splice(i, 1);
            }

            for (let i = eyeSplashes.length - 1; i >= 0; i--) {
                let es = eyeSplashes[i];
                es.x += es.vx * dt; es.y += es.vy * dt; es.vy += 320 * dt; es.life -= dt;
                if (es.life <= 0) eyeSplashes.splice(i, 1);
            }

            if (phase === 'eyecatch') {
                stateTimer += dt;
                if (!eyeHitPlayed && stateTimer >= 1.15) {
                    eyeHitPlayed = true;
                    playTone('hit_gan', 659.25);
                    addEyeSplash(470, 345, 18);
                }
                if (stateTimer >= 3.6) {
                    phase = 'practice';
                    pracTypeIdx = 0;
                    isDemoMode = false;
                    setupPracticeStep();
                }
                return;
            }

            if (phase === 'fade_to_prod') {
                stateTimer += dt;
                if (stateTimer >= 1.1) beginProductionActual();
                return;
            }

            if (phase === 'fade_to_res') {
                stateTimer += dt;
                if (stateTimer >= 1.1) {
                    phase = 'res_step1';
                    resStepTimer = 0;
                    playPikon(523.25);
                }
                return;
            }

            if (phase === 'res_step1' || phase === 'res_step2' || phase === 'res_step3' || phase === 'res_card') {
                resStepTimer += dt;
                return;
            }

            if (phase !== 'practice' && phase !== 'prod') return;

            let curBeat = ((performance.now() / 1000) - modeStartTime) / BEAT_SEC;

            let stepBeatForGear = Math.floor(curBeat) + Math.min(1, (curBeat - Math.floor(curBeat)) * 4.5);
            gearAngle = stepBeatForGear * (Math.PI / 6);

            let beatInt = Math.floor(curBeat);
            if (beatInt !== lastBeatInt && beatInt >= 0) {
                lastBeatInt = beatInt;

                if (phase === 'prod') {
                    let step8 = beatInt % 8;
                    let prog = LH_PROGRESSION.at(step8);
                    if (beatInt % 2 === 0) {
                        playTone('lh_bass', prog.bass, 0.42);
                    } else {
                        prog.chord.forEach(hz => playTone('lh_chord', hz, 0.32));
                    }
                    if (beatInt >= 4 && beatInt <= 7) {
                        playTone('intro_count');
                    }
                }
            }

            allCues.forEach(c => {
                if (!c.played && curBeat >= c.beat) {
                    c.played = true;
                    if (c.kind === 'pip') playTone('cue_pip', c.hz);
                    else playTone('cue_pon', c.hz);
                }
            });

            for (let i = allNotes.length - 1; i >= 0; i--) {
                let n = allNotes[i];
                if (n.shineTimer > 0) n.shineTimer = Math.max(0, n.shineTimer - dt);

                if (phase === 'practice' && isDemoMode && n.hitState === 'none' && curBeat >= n.targetBeat) {
                    n.hitState = 'perf';
                    pistonKick = 1.0;
                    addSplash(650, 208, 14);
                    if (n.sound === 'gashan') playTone('hit_gashan');
                    else playTone('hit_gan', 659.25);
                }

                if (n.hitState === 'none' && curBeat > n.targetBeat + 0.32) {
                    let rawProg = (curBeat - n.spawnTofuBeat) / 3.0;
                    let stepProg = (Math.floor(rawProg * 3) + Math.min(1, ((rawProg * 3) - Math.floor(rawProg * 3)) * 4.5)) / 3;
                    n.missX = -40 + stepProg * 690;
                    n.hitState = 'miss';
                    playTone('miss');
                    if (phase === 'prod') {
                        totalNotesCount++;
                        if (n.isGold) goldMissed = true;
                    } else {
                        pracBlockHadError = true;
                    }
                }
                if (n.hitState === 'good' || n.hitState === 'perf') {
                    n.flyT = Math.min(1, n.flyT + dt * 4.8);
                }
                if (n.hitState === 'miss') {
                    n.fallT = Math.min(1, n.fallT + dt * 3.8);
                }

                let packProgress = (curBeat - (n.targetBeat - n.packLead)) / n.packLead;
                let packX = 890 - packProgress * 240;
                if (n.hitState === 'miss' && n.fallT >= 1.3) {
                    allNotes.splice(i, 1);
                } else if (packX < -120 && n.hitState !== 'none') {
                    allNotes.splice(i, 1);
                }
            }

            if (curBeat >= blockEndBeat) {
                if (phase === 'practice') {
                    if (isDemoMode) {
                        const pm = PRACTICE_MODES.at(pracTypeIdx);
                        blockStartBeat = blockEndBeat;
                        blockEndBeat = blockStartBeat + pm.lenBeats;
                        queueBlock(blockStartBeat, pm);
                        return;
                    }

                    if (!pracClearWait) {
                        if (!pracBlockHadError) pracSuccessCount++;
                        pracBlockHadError = false;
                        if (pracSuccessCount >= 3) {
                            pracClearWait = true;
                        } else {
                            const pm = PRACTICE_MODES.at(pracTypeIdx);
                            blockStartBeat = blockEndBeat;
                            blockEndBeat = blockStartBeat + pm.lenBeats;
                            queueBlock(blockStartBeat, pm);
                        }
                    }

                    if (pracClearWait && allNotes.length === 0) {
                        pracClearWait = false;
                        pracTypeIdx++;
                        if (pracTypeIdx >= PRACTICE_MODES.length) {
                            enterProductionWithFade();
                            return;
                        }
                        setupPracticeStep();
                    }
                } else if (phase === 'prod') {
                    prodIdx++;
                    if (prodIdx < PROD_BLOCKS.length) {
                        const nb = PROD_BLOCKS.at(prodIdx);
                        blockStartBeat = blockEndBeat;
                        blockEndBeat = blockStartBeat + nb.len;
                        queueBlock(blockStartBeat, nb);
                    } else if (curBeat >= blockEndBeat + 2.5) {
                        computeFinalResult();
                    }
                }
            }
        }
    };
    function drawGear(ctx, cx, cy, r, teeth, ang, col) {
        ctx.save(); ctx.translate(cx, cy); ctx.rotate(ang);
        ctx.fillStyle = col; ctx.strokeStyle = "#8c8474"; ctx.lineWidth = 2.5;
        ctx.beginPath();
        for (let i = 0; i < teeth; i++) {
            let a1 = (i / teeth) * Math.PI * 2, a2 = ((i + 0.4) / teeth) * Math.PI * 2;
            let a3 = ((i + 0.5) / teeth) * Math.PI * 2, a4 = ((i + 0.9) / teeth) * Math.PI * 2;
            let x1 = Math.cos(a1) * (r + 8), y1 = Math.sin(a1) * (r + 8);
            if (i === 0) ctx.moveTo(x1, y1);
            else ctx.lineTo(x1, y1);
            ctx.lineTo(Math.cos(a2) * (r + 8), Math.sin(a2) * (r + 8));
            ctx.lineTo(Math.cos(a3) * r, Math.sin(a3) * r);
            ctx.lineTo(Math.cos(a4) * r, Math.sin(a4) * r);
        }
        ctx.closePath(); ctx.fill(); ctx.stroke();
        ctx.fillStyle = "#dfd8c5"; ctx.beginPath(); ctx.arc(0, 0, r * 0.35, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        ctx.restore();
    }

    function drawTofuBlock(ctx, x, y, scale, broken = false, isGold = false) {
        ctx.save(); ctx.translate(x, y); ctx.scale(scale, scale);
        if (isGold) {
            ctx.shadowColor = "#ffd54f";
            ctx.shadowBlur = 16;
            ctx.fillStyle = "#ffca28";
            ctx.strokeStyle = "#9c6f00";
        } else {
            ctx.fillStyle = "#ffffff";
            ctx.strokeStyle = broken ? "#7a7265" : "#4a4a4a";
        }
        ctx.lineWidth = 2.5;
        if (!broken) {
            ctx.beginPath(); ctx.roundRect(-24, -16, 48, 32, 3); ctx.fill(); ctx.stroke();
            if (isGold) {
                ctx.shadowBlur = 0;
                ctx.fillStyle = "#fffde7";
                ctx.fillRect(-18, -11, 14, 5);
            }
        } else {
            ctx.beginPath(); ctx.roundRect(-26, -4, 18, 20, 2); ctx.fill(); ctx.stroke();
            ctx.beginPath(); ctx.roundRect(-5, -14, 18, 22, 2); ctx.fill(); ctx.stroke();
            ctx.beginPath(); ctx.roundRect(12, 0, 16, 16, 2); ctx.fill(); ctx.stroke();
        }
        ctx.restore();
    }

    function drawPackTray(ctx, x, y) {
        ctx.save(); ctx.translate(x, y);
        ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
        ctx.strokeStyle = "#607d8b"; ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(-34, -8); ctx.lineTo(-30, 8); ctx.lineTo(30, 8); ctx.lineTo(34, -8);
        ctx.lineTo(28, -8); ctx.lineTo(25, 2); ctx.lineTo(-25, 2); ctx.lineTo(-28, -8);
        ctx.closePath(); ctx.fill(); ctx.stroke();
        ctx.restore();
    }
    window.RIZUMU_GAMES["1-1"].draw = function(ctx, canvas) {
        ctx.save();
        ctx.scale(canvas.width / 940, canvas.height / 520);
        ctx.clearRect(0, 0, 940, 520);

        if (phase === 'eyecatch') {
            let p = Math.min(1, stateTimer / 3.6);
            ctx.fillStyle = "#dfd8c5"; ctx.fillRect(0, 0, 940, 520);

            let pop = Math.min(1, p * 6);
            let sc = 0.85 + 0.15 * Math.sin(pop * Math.PI * 0.5);
            ctx.save(); ctx.translate(470, 108); ctx.scale(sc, sc);
            ctx.fillStyle = "#fcfaf2"; ctx.strokeStyle = "#4a4a4a"; ctx.lineWidth = 5;
            ctx.beginPath(); ctx.roundRect(-240, -64, 480, 118, 26); ctx.fill(); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(-20, 52); ctx.lineTo(0, 96); ctx.lineTo(20, 52); ctx.closePath();
            ctx.fillStyle = "#fcfaf2"; ctx.fill(); ctx.stroke();
            ctx.font = "900 64px 'Hiragino Kaku Gothic ProN', Meiryo, sans-serif";
            ctx.textAlign = "center"; ctx.textBaseline = "middle";
            ctx.fillStyle = "#bca465"; ctx.fillText("豆腐工場", 4, -2);
            ctx.fillStyle = "#4a4a4a"; ctx.fillText("豆腐工場", 0, -6);
            ctx.restore();

            let eyeGearAng = 0;
            if (stateTimer >= 1.15) {
                let gT = Math.min(1, (stateTimer - 1.15) * 5.0);
                eyeGearAng = gT * (Math.PI / 5);
            }
            drawGear(ctx, 360, 415, 44, 10, eyeGearAng, "#cfc6b0");
            drawGear(ctx, 580, 425, 34, 8, -eyeGearAng * 1.25, "#c4ba9f");

            let slideT = Math.min(1, stateTimer / 1.0);
            let easeOut = 1 - Math.pow(1 - slideT, 3);
            let kickOffset = 0;
            if (stateTimer >= 1.15 && stateTimer < 1.45) {
                let kT = (stateTimer - 1.15) / 0.30;
                kickOffset = Math.sin(kT * Math.PI) * 38;
            }
            let mechY = 580 - easeOut * 175 - kickOffset;

            ctx.save(); ctx.translate(470, mechY);
            ctx.fillStyle = "#b8b09c"; ctx.strokeStyle = "#4a4a4a"; ctx.lineWidth = 4;
            ctx.fillRect(-18, 0, 36, 200); ctx.strokeRect(-18, 0, 36, 200);
            ctx.fillStyle = kickOffset > 5 ? "#e9d7a5" : "#ffffff";
            ctx.fillRect(-60, -22, 120, 22); ctx.strokeRect(-60, -22, 120, 22);
            ctx.restore();

            let tofuY = mechY - 44;
            let sx = 1.35, sy = 1.35;
            if (stateTimer >= 1.15 && stateTimer < 1.75) {
                let jT = (stateTimer - 1.15) / 0.60;
                tofuY = (580 - 175 - 44) - Math.sin(jT * Math.PI) * 95;
                sx = 1.35 - Math.sin(jT * Math.PI) * 0.14;
                sy = 1.35 + Math.sin(jT * Math.PI) * 0.16;
            } else if (stateTimer >= 1.75 && stateTimer < 2.35) {
                let wT = (stateTimer - 1.75) / 0.60;
                let wobble = Math.sin(wT * Math.PI * 4) * Math.exp(-wT * 3.5) * 0.22;
                sx = 1.35 + wobble;
                sy = 1.35 - wobble;
            }

            ctx.save();
            ctx.translate(470, tofuY);
            ctx.scale(sx / 1.35, sy / 1.35);
            drawTofuBlock(ctx, 0, 0, 1.35, false, false);
            ctx.restore();

            eyeSplashes.forEach(es => {
                ctx.save(); ctx.globalAlpha = Math.max(0, es.life / es.maxLife);
                ctx.fillStyle = "#ffffff";
                ctx.beginPath(); ctx.arc(es.x, es.y, es.size, 0, Math.PI * 2); ctx.fill();
                ctx.restore();
            });

            if (stateTimer >= 1.15) {
                let fadeAlpha = Math.min(1, (stateTimer - 1.15) / 0.85);
                ctx.save();
                ctx.globalAlpha = fadeAlpha;
                ctx.fillStyle = "rgba(255, 255, 255, 0.88)";
                ctx.strokeStyle = "#8c8474";
                ctx.lineWidth = 2;
                ctx.beginPath(); ctx.roundRect(755, 466, 162, 36, 18); ctx.fill(); ctx.stroke();
                ctx.fillStyle = "#4a4a4a";
                ctx.font = "bold 15px sans-serif";
                ctx.textAlign = "center";
                ctx.fillText("[m]でポーズ", 836, 489);
                ctx.restore();
            }

            ctx.restore();
            return;
        }
        if (phase === 'res_step1' || phase === 'res_step2' || phase === 'res_step3' || phase === 'res_card') {
            ctx.fillStyle = "#0a0a0a"; ctx.fillRect(0, 0, 940, 520);

            if (phase === 'res_step1' || phase === 'res_step2' || phase === 'res_step3') {
                ctx.fillStyle = "#ffffff";
                ctx.beginPath(); ctx.roundRect(65, 52, 260, 44, 22); ctx.fill();
                ctx.fillStyle = "#111111"; ctx.font = "bold 19px sans-serif"; ctx.textAlign = "center";
                ctx.fillText("工場長からの評価", 195, 81);

                if (phase === 'res_step2' || phase === 'res_step3') {
                    ctx.textAlign = "left";
                    if (isPerfectClear) {
                        ctx.fillStyle = "#ffd54f"; ctx.font = "bold 17px sans-serif";
                        ctx.fillText("しかもパーフェクト", 250, 185);
                    }
                    ctx.fillStyle = "#ffffff"; ctx.font = "bold 25px sans-serif";
                    if (finalRankVal === 0) {
                        ctx.fillText("豆腐がもったいないです。", 250, 235);
                    } else if (finalRankVal === 1) {
                        ctx.fillText("豆腐は無事に出荷されました。", 250, 225);
                        ctx.fillText("明日もお願いします。", 250, 268);
                    } else {
                        ctx.fillText("豆腐は無事に出荷されました。", 250, 215);
                        ctx.fillText("豆腐も輝いています。", 250, 258);
                        ctx.fillText("昇進も考えときますね。", 250, 301);
                    }
                }

                if (phase === 'res_step3') {
                    ctx.save(); ctx.translate(765, 415);
                    let rankLabel = (finalRankVal === 0) ? "やり直し" : (finalRankVal === 1) ? "普通" : "豆腐";
                    let mainCol   = (finalRankVal === 0) ? "#90a4ae" : (finalRankVal === 1) ? "#81c784" : "#ffca28";
                    let subBadge  = isPerfectClear ? "パーフェクト！" : (finalRankVal === 2) ? "最高の仕上がり！" : (finalRankVal === 1) ? "出荷完了！" : "もう一度挑戦！";

                    if (finalRankVal >= 2) {
                        ctx.fillStyle = "#ffffff";
                        const stars = new Array({ x: -115, y: -25, r: 22 }, { x: 115, y: 10, r: 18 }, { x: 75, y: -38, r: 14 });
                        stars.forEach(st => {
                            ctx.beginPath();
                            for (let i = 0; i < 8; i++) {
                                let rad = (i % 2 === 0) ? st.r : st.r * 0.3;
                                let a = (i / 8) * Math.PI * 2;
                                ctx.lineTo(st.x + Math.cos(a) * rad, st.y + Math.sin(a) * rad);
                            }
                            ctx.closePath(); ctx.fill();
                        });
                    }

                    ctx.save(); ctx.transform(1, 0, -0.18, 1, 0, 0);
                    ctx.font = "900 58px sans-serif"; ctx.textAlign = "center";
                    ctx.lineWidth = 10; ctx.strokeStyle = "#3e2723"; ctx.strokeText(rankLabel, 0, 0);
                    ctx.fillStyle = mainCol; ctx.fillText(rankLabel, 0, 0);
                    ctx.restore();

                    ctx.fillStyle = (finalRankVal === 0) ? "#546e7a" : "#ffb300";
                    ctx.beginPath(); ctx.roundRect(-105, 18, 210, 28, 14); ctx.fill();
                    ctx.fillStyle = (finalRankVal === 0) ? "#ffffff" : "#212121";
                    ctx.font = "bold 15px sans-serif"; ctx.textAlign = "center";
                    ctx.fillText(subBadge, 0, 37);
                    ctx.restore();
                }

                ctx.fillStyle = "#777777"; ctx.font = "13px sans-serif"; ctx.textAlign = "left";
                ctx.fillText("クリック / [Space] で次へ", 65, 475);
            } else {
                ctx.save(); ctx.translate(470, 230);
                if (finalRankVal === 0) {
                    drawTofuBlock(ctx, -45, 20, 1.3, true, false);
                    drawTofuBlock(ctx, 40, 22, 1.3, true, false);
                    drawTofuBlock(ctx, 0, -8, 1.4, true, false);
                } else if (finalRankVal === 1) {
                    const boxes = new Array({ x: -60, y: 12 }, { x: 60, y: 12 }, { x: 0, y: -44 });
                    boxes.forEach(b => {
                        ctx.fillStyle = "#d7b889"; ctx.strokeStyle = "#8c6d23"; ctx.lineWidth = 3;
                        ctx.fillRect(b.x - 54, b.y - 28, 108, 56); ctx.strokeRect(b.x - 54, b.y - 28, 108, 56);
                        ctx.fillStyle = "#5d4037"; ctx.font = "bold 20px sans-serif"; ctx.textAlign = "center";
                        ctx.fillText("豆腐", b.x, b.y + 7);
                    });
                } else {
                    ctx.fillStyle = "#ffffff"; ctx.strokeStyle = "#b0bec5"; ctx.lineWidth = 3;
                    ctx.beginPath(); ctx.moveTo(-110, 24); ctx.lineTo(110, 24); ctx.lineTo(85, 38); ctx.lineTo(-85, 38);
                    ctx.closePath(); ctx.fill(); ctx.stroke();
                    drawTofuBlock(ctx, 0, -4, 1.75, false, false);
                    ctx.strokeStyle = "#ffd54f"; ctx.lineWidth = 3;
                    for (let i = 0; i < 8; i++) {
                        let a = (i / 8) * Math.PI * 2;
                        ctx.beginPath(); ctx.moveTo(Math.cos(a) * 62, Math.sin(a) * 48 - 10);
                        ctx.lineTo(Math.cos(a) * 86, Math.sin(a) * 66 - 10); ctx.stroke();
                    }
                }
                ctx.restore();

                ctx.fillStyle = "#ffffff"; ctx.font = "bold 30px sans-serif"; ctx.textAlign = "center";
                let caption = (finalRankVal === 0) ? "給料から引いときます。"
                            : (finalRankVal === 1) ? "明日も頑張ろう。"
                            : "まるで宝石だ。";
                ctx.fillText(caption, 470, 355);

                ctx.fillStyle = "#777777"; ctx.font = "13px sans-serif";
                ctx.fillText("クリック / [Space] で戻る", 470, 465);
            }
            ctx.restore();
            return;
        }
        // ★ 3. 練習＆本番 工場プレイ画面
        ctx.fillStyle = "#d5ceb9"; ctx.fillRect(0, 0, 940, 290);
        ctx.fillStyle = "#dfd8c5"; ctx.fillRect(0, 290, 940, 230);

        drawGear(ctx, 210, 138, 44, 12, gearAngle, "#c7bea6");
        drawGear(ctx, 288, 174, 33, 9, -gearAngle * (12 / 9) + 0.2, "#bdb399");

        let pcY = 86 - pcBounce * 12;
        ctx.fillStyle = "#b0a792"; ctx.fillRect(432, pcY + 80, 116, 10);
        ctx.fillStyle = "#5c564c"; ctx.fillRect(440, pcY, 100, 68);
        ctx.fillStyle = pcOn ? "#fcfaf2" : "#2b2b2b";
        ctx.fillRect(445, pcY + 5, 90, 56);
        if (pcOn) {
            ctx.fillStyle = "#4a4a4a"; ctx.font = "bold 10px sans-serif"; ctx.textAlign = "center";
            ctx.fillText("とうふ", 490, pcY + 24);
            ctx.fillStyle = "#e9d7a5"; ctx.fillRect(465, pcY + 31, 50, 4);
        }

        let effectiveNow = isPaused ? pauseStartTime : (performance.now() / 1000);
        let curBeat = (effectiveNow - modeStartTime) / BEAT_SEC;
        let stepBeat = Math.floor(curBeat) + Math.min(1, (curBeat - Math.floor(curBeat)) * 4.5);
        let beltShiftFront = (stepBeat * 140) % 36;
        let beltShiftBack  = (stepBeat * 90) % 30;

        // 【奥側】パックレーン
        ctx.fillStyle = "#8f8775"; ctx.fillRect(0, 236, 940, 24);
        ctx.fillStyle = "#c2baa6"; ctx.fillRect(0, 240, 940, 16);
        ctx.fillStyle = "#a39a84";
        for (let bx = -beltShiftBack; bx < 940; bx += 30) {
            ctx.fillRect(bx, 236, 6, 4);
        }
        for (let rx = 40; rx <= 880; rx += 90) {
            ctx.fillStyle = "#6e6657"; ctx.beginPath(); ctx.arc(rx, 248, 5.5, 0, Math.PI * 2); ctx.fill();
            ctx.strokeStyle = "#c2baa6"; ctx.lineWidth = 1.5;
            let ang = -beltShiftBack * 0.15;
            ctx.beginPath(); ctx.moveTo(rx, 248); ctx.lineTo(rx + Math.cos(ang) * 4.5, 248 + Math.sin(ang) * 4.5); ctx.stroke();
        }
        ctx.fillStyle = "#827a69"; ctx.strokeStyle = "#4a4a4a"; ctx.lineWidth = 2;
        ctx.fillRect(890, 192, 50, 68); ctx.strokeRect(890, 192, 50, 68);
        ctx.fillStyle = "#2b2a28"; ctx.fillRect(890, 202, 11, 32);

        // 【手前側】豆腐レーン
        ctx.fillStyle = "#9e9684"; ctx.fillRect(0, 382, 595, 42);
        ctx.fillStyle = "#e6decb"; ctx.fillRect(0, 388, 590, 30);
        ctx.fillStyle = "#b5ac96";
        for (let fx = beltShiftFront - 36; fx < 590; fx += 36) {
            ctx.fillRect(fx, 382, 8, 6);
        }
        for (let lx = 95; lx <= 555; lx += 110) {
            ctx.fillStyle = "#7a7262"; ctx.beginPath(); ctx.arc(lx, 403, 10, 0, Math.PI * 2); ctx.fill();
            ctx.strokeStyle = "#e6decb"; ctx.lineWidth = 2;
            let ang = beltShiftFront * 0.12;
            ctx.beginPath(); ctx.moveTo(lx, 403); ctx.lineTo(lx + Math.cos(ang) * 8, 403 + Math.sin(ang) * 8); ctx.stroke();
        }

        // T字機械
        let ty = 382 - pistonKick * 56;
        ctx.fillStyle = "#b8b09c"; ctx.strokeStyle = "#4a4a4a"; ctx.lineWidth = 3;
        ctx.fillRect(635, ty + 16, 30, 145); ctx.strokeRect(635, ty + 16, 30, 145);
        ctx.fillStyle = pistonKick > 0.1 ? "#e9d7a5" : "#ffffff";
        ctx.fillRect(606, ty, 88, 20); ctx.strokeRect(606, ty, 88, 20);
        allNotes.forEach(n => {
            let packProgress = (curBeat - (n.targetBeat - n.packLead)) / n.packLead;
            let packX = 890 - packProgress * 240;

            let rawProg = (curBeat - n.spawnTofuBeat) / 3.0;
            let stepProg = (Math.floor(rawProg * 3) + Math.min(1, ((rawProg * 3) - Math.floor(rawProg * 3)) * 4.5)) / 3;
            let tofuX = -40 + stepProg * 690;

            if (packProgress >= 0 && packX >= -100) {
                ctx.save(); ctx.translate(packX, 229); ctx.scale(0.82, 0.82);
                drawPackTray(ctx, 0, 0); ctx.restore();
            }

            if (n.hitState === 'none') {
                if (rawProg >= 0 && rawProg <= 1.25) {
                    drawTofuBlock(ctx, tofuX, 363, 1.08, false, n.isGold);
                }
            } else if (n.hitState === 'good' || n.hitState === 'perf') {
                if (packX >= -100) {
                    let flyX = 650 + (packX - 650) * n.flyT;
                    let flyY = 363 - Math.sin(n.flyT * Math.PI) * 95 - n.flyT * 151;
                    let flyScale = 1.08 - n.flyT * 0.26;
                    drawTofuBlock(ctx, flyX, flyY, flyScale, false, n.isGold);

                    if (n.shineTimer > 0) {
                        let ratio = n.shineTimer / 0.45;
                        let flashScale = Math.sin(ratio * Math.PI);
                        ctx.save();
                        ctx.translate(flyX, flyY);
                        ctx.globalAlpha = ratio;
                        ctx.strokeStyle = "#ffd54f";
                        ctx.lineWidth = 3.5;
                        ctx.beginPath();
                        ctx.moveTo(-36 * flashScale, 0); ctx.lineTo(36 * flashScale, 0);
                        ctx.moveTo(0, -28 * flashScale); ctx.lineTo(0, 28 * flashScale);
                        ctx.stroke();

                        ctx.fillStyle = "#ffffff";
                        ctx.beginPath();
                        ctx.arc(0, 0, 10 * flashScale, 0, Math.PI * 2);
                        ctx.fill();
                        ctx.restore();
                    }
                }
            } else if (n.hitState === 'miss') {
                if (n.fallT < 1.3) {
                    drawTofuBlock(ctx, n.missX, 363 + n.fallT * 185, 1.08, true, n.isGold);
                }
            }
        });

        splashes.forEach(s => {
            ctx.save(); ctx.globalAlpha = Math.max(0, s.life / s.maxLife);
            ctx.fillStyle = "#ffffff";
            ctx.beginPath(); ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2); ctx.fill();
            ctx.restore();
        });

        if (phase === 'practice') {
            ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
            ctx.strokeStyle = "#b8b2a0"; ctx.lineWidth = 2.5;
            ctx.beginPath(); ctx.roundRect(190, 16, 540, 44, 22); ctx.fill(); ctx.stroke();

            ctx.fillStyle = "#4a4a4a"; ctx.font = "bold 16px sans-serif"; ctx.textAlign = "center";
            let statusText = isDemoMode ? "【お手本実演中】" : `成功：${pracSuccessCount} / 3`;
            ctx.fillText(`${PRACTICE_MODES.at(pracTypeIdx).label}　${statusText}`, 460, 44);

            ctx.fillStyle = isDemoMode ? "#ffb300" : "#ffffff";
            ctx.strokeStyle = "#8c6d23"; ctx.lineWidth = 2.5;
            ctx.beginPath(); ctx.roundRect(775, 16, 140, 44, 22); ctx.fill(); ctx.stroke();
            ctx.fillStyle = isDemoMode ? "#212121" : "#8c6d23";
            ctx.font = "bold 14px sans-serif";
            ctx.fillText(isDemoMode ? "練習に戻る" : "お手本 (D)", 845, 43);

            ctx.fillStyle = "rgba(255, 255, 255, 0.88)";
            ctx.strokeStyle = "#8c6d23"; ctx.lineWidth = 2;
            ctx.beginPath(); ctx.roundRect(18, 468, 165, 38, 19); ctx.fill(); ctx.stroke();
            ctx.fillStyle = "#5d4037"; ctx.font = "bold 15px sans-serif";
            ctx.fillText("[s]でスキップ", 100, 492);
            ctx.textAlign = "left";
        }

        if (isPaused) {
            ctx.fillStyle = "rgba(0, 0, 0, 0.58)";
            ctx.fillRect(0, 0, 940, 520);

            ctx.fillStyle = "#fcfaf2";
            ctx.strokeStyle = "#4a4a4a";
            ctx.lineWidth = 4;
            ctx.beginPath(); ctx.roundRect(300, 125, 340, 275, 24); ctx.fill(); ctx.stroke();

            ctx.fillStyle = "#4a4a4a";
            ctx.font = "900 24px sans-serif";
            ctx.textAlign = "center";
            ctx.fillText("PAUSE", 470, 172);

            const menuItems = new Array("再開する", "最初からやり直す", "やめる");
            menuItems.forEach((label, idx) => {
                let y = 232 + idx * 58;
                let selected = (idx === pauseMenuIdx);
                if (selected) {
                    ctx.fillStyle = "rgba(255, 202, 40, 0.25)";
                    ctx.beginPath(); ctx.roundRect(330, y - 26, 280, 44, 14); ctx.fill();
                    ctx.fillStyle = "#d97706";
                    ctx.font = "900 26px sans-serif";
                    ctx.fillText("▶ " + label, 470, y + 4);
                } else {
                    ctx.fillStyle = "#6e6657";
                    ctx.font = "bold 19px sans-serif";
                    ctx.fillText(label, 470, y + 2);
                }
            });
            ctx.textAlign = "left";
        }

        if (phase === 'fade_to_prod' || phase === 'fade_to_res') {
            let alpha = Math.min(1, stateTimer / 0.7);
            ctx.fillStyle = `rgba(17, 17, 17, ${alpha})`;
            ctx.fillRect(0, 0, 940, 520);
        }

        ctx.restore();
    };
})();
// ==========================================
// 2つ目のゲーム：大豆選別 (1-2)
// ==========================================
window.RIZUMU_GAMES = window.RIZUMU_GAMES || {};

(function() {
    let noiseBuffer = null;
    function getNoiseBuffer() {
        if (noiseBuffer) return noiseBuffer;
        ensureAudio();
        const sr = audioCtx.sampleRate;
        const buf = audioCtx.createBuffer(1, sr * 0.25, sr);
        const data = buf.getChannelData(0);
        for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
        noiseBuffer = buf;
        return buf;
    }

    function playTone(type, freq = 440, dur = 0.14) {
        try {
            ensureAudio();
            let dest = (typeof masterOut !== 'undefined' && masterOut) ? masterOut : audioCtx.destination;
            let now = audioCtx.currentTime;
            let bgmVol = getBgmVol();
            let seVol  = getSeVol();

            if (type === 'jingle') {
                const seq = new Array(
                    { t: 0.00, d: 0.10, f: new Array(329.63, 659.25) },
                    { t: 0.11, d: 0.10, f: new Array(392.00, 783.99) },
                    { t: 0.22, d: 0.10, f: new Array(440.00, 880.00) },
                    { t: 0.34, d: 0.55, f: new Array(246.94, 493.88, 659.25, 987.77) }
                );
                seq.forEach(s => s.f.forEach((hz, i) => {
                    let o = audioCtx.createOscillator(), g = audioCtx.createGain();
                    o.type = (i === 0) ? 'sawtooth' : 'triangle';
                    o.frequency.setValueAtTime(hz, now + s.t);
                    g.gain.setValueAtTime(0.001, now + s.t);
                    g.gain.linearRampToValueAtTime((i === 0 ? 0.08 : 0.09) * seVol, now + s.t + 0.012);
                    g.gain.exponentialRampToValueAtTime(0.001, now + s.t + s.d);
                    o.connect(g); g.connect(dest);
                    o.start(now + s.t); o.stop(now + s.t + s.d + 0.02);
                }));
                return;
            }

            if (type === 'kiran') {
                new Array(1760.00, 2349.32).forEach((hz, idx) => {
                    let o = audioCtx.createOscillator(), g = audioCtx.createGain();
                    o.type = 'sine'; o.frequency.setValueAtTime(hz, now + idx * 0.035);
                    g.gain.setValueAtTime(0.09 * seVol, now + idx * 0.035);
                    g.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.035 + 0.18);
                    o.connect(g); g.connect(dest); o.start(now + idx * 0.035); o.stop(now + idx * 0.035 + 0.20);
                });
                return;
            }

            if (type === 'intro_count') {
                new Array(329.63, 659.25).forEach((hz, i) => {
                    let o = audioCtx.createOscillator(), g = audioCtx.createGain();
                    o.type = (i === 0) ? 'sine' : 'triangle';
                    o.frequency.setValueAtTime(hz, now);
                    g.gain.setValueAtTime(0.001, now);
                    g.gain.linearRampToValueAtTime((i === 0 ? 0.09 : 0.07) * seVol, now + 0.01);
                    g.gain.exponentialRampToValueAtTime(0.001, now + 0.10);
                    o.connect(g); g.connect(dest);
                    o.start(now); o.stop(now + 0.11);
                });
                return;
            }

            if (type === 'bell') {
                new Array(2093.00, 2637.02, 3135.96).forEach((hz, idx) => {
                    let o = audioCtx.createOscillator(), g = audioCtx.createGain();
                    o.type = 'sine';
                    o.frequency.setValueAtTime(hz, now + idx * 0.032);
                    g.gain.setValueAtTime(0.001, now + idx * 0.032);
                    g.gain.linearRampToValueAtTime(0.11 * seVol, now + idx * 0.032 + 0.008);
                    g.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.032 + 0.24);
                    o.connect(g); g.connect(dest);
                    o.start(now + idx * 0.032); o.stop(now + idx * 0.032 + 0.25);
                });
                return;
            }

            if (type === 'rank_bad') {
                new Array(146.83, 138.59).forEach(hz => {
                    let o = audioCtx.createOscillator(), g = audioCtx.createGain();
                    o.type = 'sawtooth'; o.frequency.setValueAtTime(hz, now);
                    o.frequency.linearRampToValueAtTime(hz * 0.75, now + 0.85);
                    g.gain.setValueAtTime(0.11 * seVol, now);
                    g.gain.exponentialRampToValueAtTime(0.001, now + 0.9);
                    o.connect(g); g.connect(dest); o.start(now); o.stop(now + 0.92);
                });
                return;
            }
            if (type === 'rank_normal') {
                new Array({ t: 0, f: 440.00, d: 0.14 }, { t: 0.15, f: 392.00, d: 0.28 }).forEach(n => {
                    let o = audioCtx.createOscillator(), g = audioCtx.createGain();
                    o.type = 'triangle'; o.frequency.setValueAtTime(n.f, now + n.t);
                    g.gain.setValueAtTime(0.16 * seVol, now + n.t);
                    g.gain.exponentialRampToValueAtTime(0.001, now + n.t + n.d);
                    o.connect(g); g.connect(dest); o.start(now + n.t); o.stop(now + n.t + n.d + 0.02);
                });
                return;
            }
            if (type === 'rank_tofu') {
                new Array({ t: 0, f: 440.00, d: 0.20 }, { t: 0.22, f: 554.37, d: 0.55 }).forEach(n => {
                    let o = audioCtx.createOscillator(), g = audioCtx.createGain();
                    o.type = 'triangle'; o.frequency.setValueAtTime(n.f, now + n.t);
                    g.gain.setValueAtTime(0.18 * seVol, now + n.t);
                    g.gain.exponentialRampToValueAtTime(0.001, now + n.t + n.d);
                    o.connect(g); g.connect(dest); o.start(now + n.t); o.stop(now + n.t + n.d + 0.02);
                });
                return;
            }
            if (type === 'rock_kick') {
                let o = audioCtx.createOscillator(), g = audioCtx.createGain();
                o.type = 'sine'; o.frequency.setValueAtTime(140, now);
                o.frequency.exponentialRampToValueAtTime(42, now + 0.09);
                g.gain.setValueAtTime(0.16 * bgmVol, now);
                g.gain.exponentialRampToValueAtTime(0.001, now + 0.10);
                o.connect(g); g.connect(dest); o.start(now); o.stop(now + 0.11);
                return;
            }
            if (type === 'rock_snare') {
                let src = audioCtx.createBufferSource(), g = audioCtx.createGain();
                let filt = audioCtx.createBiquadFilter();
                filt.type = 'highpass'; filt.frequency.setValueAtTime(900, now);
                src.buffer = getNoiseBuffer();
                g.gain.setValueAtTime(0.12 * bgmVol, now);
                g.gain.exponentialRampToValueAtTime(0.001, now + 0.11);
                src.connect(filt); filt.connect(g); g.connect(dest);
                src.start(now); src.stop(now + 0.12);
                return;
            }

            let o = audioCtx.createOscillator(), g = audioCtx.createGain();
            if (type === 'throw_good') {
                o.type = 'sine'; o.frequency.setValueAtTime(659.25, now);
                o.frequency.exponentialRampToValueAtTime(880.00, now + 0.06);
                g.gain.setValueAtTime(0.14 * seVol, now);
                g.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
                o.connect(g); g.connect(dest); o.start(now); o.stop(now + 0.09);
            } else if (type === 'throw_bad') {
                o.type = 'triangle'; o.frequency.setValueAtTime(246.94, now);
                o.frequency.exponentialRampToValueAtTime(185.00, now + 0.07);
                g.gain.setValueAtTime(0.15 * seVol, now);
                g.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
                o.connect(g); g.connect(dest); o.start(now); o.stop(now + 0.10);
            } else if (type === 'hit_flick') {
                o.type = 'triangle'; o.frequency.setValueAtTime(587.33, now);
                o.frequency.exponentialRampToValueAtTime(1174.66, now + 0.08);
                g.gain.setValueAtTime(0.20 * seVol, now);
                g.gain.exponentialRampToValueAtTime(0.001, now + 0.11);
                o.connect(g); g.connect(dest); o.start(now); o.stop(now + 0.12);
            } else if (type === 'basket_in') {
                o.type = 'sine'; o.frequency.setValueAtTime(587.33, now);
                o.frequency.exponentialRampToValueAtTime(1174.66, now + 0.10);
                g.gain.setValueAtTime(0.18 * seVol, now);
                g.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
                o.connect(g); g.connect(dest); o.start(now); o.stop(now + 0.15);
            } else if (type === 'miss') {
                o.type = 'sawtooth'; o.frequency.setValueAtTime(145, now);
                o.frequency.linearRampToValueAtTime(85, now + 0.15);
                g.gain.setValueAtTime(0.15 * seVol, now);
                g.gain.exponentialRampToValueAtTime(0.001, now + 0.17);
                o.connect(g); g.connect(dest); o.start(now); o.stop(now + 0.18);
            } else if (type === 'rock_bass') {
                o.type = 'triangle'; o.frequency.setValueAtTime(freq, now);
                g.gain.setValueAtTime(0.10 * bgmVol, now);
                g.gain.exponentialRampToValueAtTime(0.001, now + dur);
                o.connect(g); g.connect(dest); o.start(now); o.stop(now + dur + 0.02);
            }
        } catch (e) {}
    }
    const BPM = 132;
    const BEAT_SEC = 60 / BPM;
    const FLIGHT_BEATS = 1.0;

    const PRACTICE_MODES = new Array(
        {
            label: "1：いい大豆 [N]で籠へ・悪い大豆 [Space]で弾く",
            lenBeats: 6.0,
            hasBell: false,
            items: new Array(
                { hitOff: 2.0, kind: 'good', isGold: false },
                { hitOff: 3.0, kind: 'bad',  isGold: false }
            )
        },
        {
            label: "2：チリリン♪ → いい大豆 [N]・悪い・悪い [Space]",
            lenBeats: 8.0,
            hasBell: true,
            bellOff: 1.0,
            items: new Array(
                { hitOff: 3.0, kind: 'good', isGold: false },
                { hitOff: 4.0, kind: 'bad',  isGold: false },
                { hitOff: 5.0, kind: 'bad',  isGold: false }
            )
        }
    );

    function makePat(type, goldFirst = false) {
        if (type === 1) {
            return {
                len: 4.0,
                hasBell: false,
                items: new Array(
                    { hitOff: 2.0, kind: 'good', isGold: false },
                    { hitOff: 3.0, kind: 'bad',  isGold: false }
                )
            };
        } else {
            return {
                len: 8.0,
                hasBell: true,
                bellOff: 1.0,
                items: new Array(
                    { hitOff: 3.0, kind: 'good', isGold: goldFirst },
                    { hitOff: 4.0, kind: 'bad',  isGold: false },
                    { hitOff: 5.0, kind: 'bad',  isGold: false }
                )
            };
        }
    }

    const PROD_BLOCKS = new Array(
        makePat(1),
        makePat(1),
        makePat(2),
        makePat(1),
        makePat(1),
        makePat(2),
        makePat(1),
        makePat(2),
        makePat(1),
        makePat(1),
        makePat(2),
        makePat(2),
        makePat(1),
        makePat(2, true),
        makePat(1)
    );


    const ROCK_BASS = new Array(
        164.81, 164.81, 196.00, 220.00,
        246.94, 220.00, 196.00, 146.83,
        164.81, 164.81, 246.94, 220.00,
        196.00, 164.81, 146.83, 123.47
    );
    let phase = 'eyecatch';
    let stateTimer = 0;

    let isPaused = false;
    let pauseMenuIdx = 0;
    let pauseStartTime = 0;

    let pracTypeIdx = 0;
    let pracSuccessCount = 0;
    let pracBlockHadError = false;
    let pracClearWait = false;
    let isDemoMode = false;

    let prodIdx = 0;
    let blockStartBeat = 0;
    let blockEndBeat = 0;

    let totalNotesCount = 0;
    let successNotesCount = 0;
    let perfectNotesCount = 0;
    let goldMissed = false;
    let emptyMissCount = 0;

    let finalRankVal = 0;
    let isPerfectClear = false;
    let resStepTimer = 0;

    let modeStartTime = 0;
    let lastHalfBeat = -1;
    let allBells = new Array();
    let allBeans = new Array();
    let particles = new Array();

    let spatulaAngle = 0;
    let basketSplashTimer = 0;
    let eyecatchFlickPlayed = false;
    let eyecatchKiranPlayed = false;
    let pcOn = false;
    let pcBounce = 0;

    function togglePause() {
        if (phase !== 'practice' && phase !== 'prod') return;
        if (!isPaused) {
            isPaused = true;
            pauseMenuIdx = 0;
            pauseStartTime = performance.now() / 1000;
            playPikon(587.33);
        } else {
            isPaused = false;
            modeStartTime += (performance.now() / 1000) - pauseStartTime;
            playPikon(659.25);
        }
    }

    function executePauseAction(idx) {
        if (idx === 0) {
            isPaused = false;
            modeStartTime += (performance.now() / 1000) - pauseStartTime;
            playPikon(659.25);
        } else if (idx === 1) {
            isPaused = false;
            playPikon(659.25);
            window.RIZUMU_GAMES["1-2"].start();
        } else if (idx === 2) {
            isPaused = false;
            phase = 'stopped';
            playPikon(523.25);
            if (typeof window.quitRizumuGame === 'function') {
                window.quitRizumuGame();
            } else if (typeof window.finishRizumuGame === 'function') {
                window.finishRizumuGame(-1);
            }
        }
    }

    function addSparkles(x, y, col, count) {
        for (let i = 0; i < count; i++) {
            let a = Math.random() * Math.PI * 2;
            let spd = 65 + Math.random() * 125;
            particles.push({
                x: x, y: y,
                vx: Math.cos(a) * spd,
                vy: Math.sin(a) * spd - 40,
                life: 0.42 + Math.random() * 0.15,
                maxLife: 0.57,
                size: 3 + Math.random() * 2.5,
                color: col
            });
        }
    }

    function queueBlock(startBeat, blk) {
        if (blk.hasBell) {
            allBells.push({ beat: startBeat + blk.bellOff, played: false });
        }
        blk.items.forEach(it => {
            let tBeat = startBeat + it.hitOff;
            allBeans.push({
                kind: it.kind,
                isGold: !!it.isGold,
                spawnBeat: tBeat - FLIGHT_BEATS,
                targetBeat: tBeat,
                thrown: false,
                state: 'flying',
                animT: 0,
                missX: 620,
                missY: 275
            });
        });
    }

    function setupPracticeStep() {
        pracSuccessCount = 0;
        pracBlockHadError = false;
        pracClearWait = false;
        allBells = new Array();
        allBeans = new Array();
        lastHalfBeat = -1;
        modeStartTime = performance.now() / 1000;
        const pm = PRACTICE_MODES.at(pracTypeIdx);
        blockStartBeat = 0;
        blockEndBeat = pm.lenBeats;
        queueBlock(0, pm);
    }

    function toggleDemoMode() {
        isDemoMode = !isDemoMode;
        playPikon(isDemoMode ? 783.99 : 587.33);
        setupPracticeStep();
    }

    function enterProductionWithFade() {
        isDemoMode = false;
        pracClearWait = false;
        phase = 'fade_to_prod';
        stateTimer = 0;
        allBells = new Array();
        allBeans = new Array();
    }

    function beginProductionActual() {
        phase = 'prod';
        prodIdx = 0;
        modeStartTime = performance.now() / 1000;
        lastHalfBeat = -1;
        allBells = new Array();
        allBeans = new Array();
        pcOn = true;

        totalNotesCount = 0;
        successNotesCount = 0;
        perfectNotesCount = 0;
        goldMissed = false;
        emptyMissCount = 0;

        const b = PROD_BLOCKS.at(0);
        blockStartBeat = 8.0;
        blockEndBeat = 8.0 + b.len;
        queueBlock(8.0, b);
    }

    function computeFinalResult() {
        let effectiveTotal = totalNotesCount + emptyMissCount;
        let rate = effectiveTotal > 0 ? (successNotesCount / effectiveTotal) * 100 : 0;

        isPerfectClear = (totalNotesCount > 0 && perfectNotesCount === totalNotesCount && emptyMissCount === 0 && !goldMissed);

        if (rate <= 40) {
            finalRankVal = 0;
        } else if (rate <= 85 || goldMissed) {
            finalRankVal = 1;
        } else {
            finalRankVal = isPerfectClear ? 3 : 2;
        }

        phase = 'fade_to_res';
        stateTimer = 0;
    }
    function triggerSortAction(actionType) {
        if (phase !== 'practice' && phase !== 'prod') return;
        if (phase === 'practice' && (isDemoMode || pracClearWait)) return;

        let curBeat = ((performance.now() / 1000) - modeStartTime) / BEAT_SEC;

        let best = null, minDiff = 999;
        allBeans.forEach(b => {
            if (b.state === 'flying') {
                let d = Math.abs(curBeat - b.targetBeat);
                if (d < minDiff) { minDiff = d; best = b; }
            }
        });

        if (best && minDiff <= 0.38) {
            let isPerf = (minDiff <= 0.16);
            if (actionType === 'basket') {
                spatulaAngle = 0.55;
                if (best.kind === 'good') {
                    best.state = 'basket_in';
                    best.animT = 0;
                    playTone('basket_in');
                    basketSplashTimer = 0.45;
                    addSparkles(620, 415, best.isGold ? "#ffd54f" : "#81d4fa", isPerf ? 16 : 9);
                    if (phase === 'prod') {
                        totalNotesCount++;
                        successNotesCount++;
                        if (isPerf) { perfectNotesCount++; pcBounce = 1.0; }
                    }
                } else {
                    best.state = 'basket_in';
                    best.animT = 0;
                    playTone('miss');
                    if (phase === 'prod') totalNotesCount++;
                    else { pracSuccessCount = 0; pracBlockHadError = true; }
                }
            } else {
                spatulaAngle = -1.35;
                if (best.kind === 'bad') {
                    best.state = 'flicked';
                    best.animT = 0;
                    playTone('hit_flick');
                    addSparkles(620, 275, isPerf ? "#ffd54f" : "#ffffff", isPerf ? 14 : 8);
                    if (phase === 'prod') {
                        totalNotesCount++;
                        successNotesCount++;
                        if (isPerf) { perfectNotesCount++; pcBounce = 1.0; }
                    }
                } else {
                    best.state = 'flicked';
                    best.animT = 0;
                    playTone('miss');
                    if (phase === 'prod') {
                        totalNotesCount++;
                        if (best.isGold) goldMissed = true;
                    } else {
                        pracSuccessCount = 0;
                        pracBlockHadError = true;
                    }
                }
            }
        } else {
            spatulaAngle = (actionType === 'basket') ? 0.55 : -1.35;
            playTone('miss');
            if (phase === 'prod') {
                emptyMissCount++;
            } else if (phase === 'practice') {
                pracSuccessCount = 0;
                pracBlockHadError = true;
            }
        }
    }

    window.RIZUMU_GAMES["1-2"] = {
        start() {
            phase = 'eyecatch';
            stateTimer = 0;
            isPaused = false;
            pauseMenuIdx = 0;
            pracTypeIdx = 0;
            pracSuccessCount = 0;
            pracBlockHadError = false;
            pracClearWait = false;
            isDemoMode = false;
            spatulaAngle = 0;
            basketSplashTimer = 0;
            eyecatchFlickPlayed = false;
            eyecatchKiranPlayed = false;
            pcOn = false;
            pcBounce = 0;
            particles = new Array();
            allBells = new Array();
            allBeans = new Array();
            playTone('jingle');

            if (!window._rizumu12KeyDown) {
                window._rizumu12KeyDown = function(ev) {
                    if (phase === 'stopped' || phase === 'done') return;
                    if (ev.repeat) return;
                    if (ev.key === 'm' || ev.key === 'M' || ev.code === 'KeyM') {
                        if (phase === 'practice' || phase === 'prod') {
                            ev.preventDefault();
                            togglePause();
                        }
                        return;
                    }
                    if (isPaused) {
                        if (ev.code === 'ArrowUp' || ev.key === 'w' || ev.key === 'W') {
                            ev.preventDefault();
                            pauseMenuIdx = (pauseMenuIdx + 2) % 3;
                            playPikon(523.25);
                        } else if (ev.code === 'ArrowDown' || ev.key === 's' || ev.key === 'S') {
                            ev.preventDefault();
                            pauseMenuIdx = (pauseMenuIdx + 1) % 3;
                            playPikon(523.25);
                        } else if (ev.code === 'Enter') {
                            ev.preventDefault();
                            executePauseAction(pauseMenuIdx);
                        }
                        return;
                    }
                    if (ev.code === 'KeyN' || ev.key === 'n' || ev.key === 'N') {
                        if (phase === 'practice' || phase === 'prod') {
                            ev.preventDefault();
                            triggerSortAction('basket');
                        }
                    }
                };
                window.addEventListener('keydown', window._rizumu12KeyDown);
            }
        },
        stop() {
            phase = 'stopped';
            isPaused = false;
            if (window._rizumu12KeyDown) {
                window.removeEventListener('keydown', window._rizumu12KeyDown);
                window._rizumu12KeyDown = null;
            }
        },
        onInput(kind, e) {
            if (isPaused) {
                if (kind === 'key' && !e.repeat && e.code === 'Space') {
                    executePauseAction(pauseMenuIdx);
                } else if (kind === 'pointer') {
                    const cvs = e.target;
                    const rect = cvs.getBoundingClientRect();
                    const lx = (e.clientX - rect.left) * (940 / rect.width);
                    const ly = (e.clientY - rect.top) * (520 / rect.height);
                    if (lx >= 330 && lx <= 610) {
                        if (ly >= 200 && ly <= 252) { pauseMenuIdx = 0; executePauseAction(0); }
                        else if (ly >= 260 && ly <= 312) { pauseMenuIdx = 1; executePauseAction(1); }
                        else if (ly >= 320 && ly <= 372) { pauseMenuIdx = 2; executePauseAction(2); }
                    }
                }
                return;
            }

            if (kind === 'key') {
                if (e.repeat) return;
                if ((e.key === 's' || e.key === 'S') && phase === 'practice') {
                    playPikon(659.25);
                    enterProductionWithFade();
                    return;
                }
                if ((e.key === 'd' || e.key === 'D') && phase === 'practice') {
                    toggleDemoMode();
                    return;
                }
                if (e.code !== 'Space') return;
            }

            if (kind === 'pointer' && phase === 'practice') {
                const cvs = e.target;
                const rect = cvs.getBoundingClientRect();
                const lx = (e.clientX - rect.left) * (940 / rect.width);
                const ly = (e.clientY - rect.top) * (520 / rect.height);
                if (lx >= 18 && lx <= 185 && ly >= 468 && ly <= 510) {
                    playPikon(659.25);
                    enterProductionWithFade();
                    return;
                }
                if (lx >= 775 && lx <= 915 && ly >= 16 && ly <= 60) {
                    toggleDemoMode();
                    return;
                }
            }

            if (phase === 'res_step1' && resStepTimer > 0.25) {
                playPikon(587.33); phase = 'res_step2'; resStepTimer = 0; return;
            }
            if (phase === 'res_step2' && resStepTimer > 0.35) {
                phase = 'res_step3'; resStepTimer = 0;
                if (finalRankVal === 0) playTone('rank_bad');
                else if (finalRankVal === 1) playTone('rank_normal');
                else playTone('rank_tofu');
                return;
            }
            if (phase === 'res_step3' && resStepTimer > 0.45) {
                playPikon(587.33); phase = 'res_card'; resStepTimer = 0; return;
            }
            if (phase === 'res_card' && resStepTimer > 0.45) {
                playPikon(659.25); phase = 'done';
                window.finishRizumuGame(finalRankVal);
                return;
            }

            if (phase !== 'practice' && phase !== 'prod') return;

            if (kind === 'pointer' && e.button === 2) {
                triggerSortAction('basket');
            } else {
                triggerSortAction('flick');
            }
        }
    };
    window.RIZUMU_GAMES["1-2"].update = function(dt) {
        if (isPaused) return;

        if (Math.abs(spatulaAngle) > 0.01) {
            spatulaAngle *= Math.pow(0.001, dt);
        }
        if (basketSplashTimer > 0) basketSplashTimer = Math.max(0, basketSplashTimer - dt);
        if (pcBounce > 0) pcBounce = Math.max(0, pcBounce - dt * 4.5);

        for (let i = particles.length - 1; i >= 0; i--) {
            let p = particles[i];
            p.x += p.vx * dt; p.y += p.vy * dt; p.vy += 280 * dt; p.life -= dt;
            if (p.life <= 0) particles.splice(i, 1);
        }

        if (phase === 'eyecatch') {
            stateTimer += dt;
            if (!eyecatchFlickPlayed && stateTimer >= 1.15) {
                eyecatchFlickPlayed = true;
                playTone('hit_flick');
            }
            if (!eyecatchKiranPlayed && stateTimer >= 1.58) {
                eyecatchKiranPlayed = true;
                playTone('kiran');
            }
            if (stateTimer >= 3.6) {
                phase = 'practice';
                pracTypeIdx = 0;
                isDemoMode = false;
                setupPracticeStep();
            }
            return;
        }

        if (phase === 'fade_to_prod') {
            stateTimer += dt;
            if (stateTimer >= 1.1) beginProductionActual();
            return;
        }

        if (phase === 'fade_to_res') {
            stateTimer += dt;
            if (stateTimer >= 1.1) {
                phase = 'res_step1';
                resStepTimer = 0;
                playPikon(523.25);
            }
            return;
        }

        if (phase === 'res_step1' || phase === 'res_step2' || phase === 'res_step3' || phase === 'res_card') {
            resStepTimer += dt;
            return;
        }

        if (phase !== 'practice' && phase !== 'prod') return;

        let nowSec = performance.now() / 1000;
        let curBeat = (nowSec - modeStartTime) / BEAT_SEC;

        let halfBeatInt = Math.floor(curBeat * 2);
        if (halfBeatInt !== lastHalfBeat && halfBeatInt >= 0) {
            lastHalfBeat = halfBeatInt;
            if (phase === 'prod') {
                let idx16 = halfBeatInt % 16;
                playTone('rock_bass', ROCK_BASS.at(idx16), 0.19);
                if (idx16 % 4 === 0) playTone('rock_kick');
                else if (idx16 % 4 === 2) playTone('rock_snare');

                if (halfBeatInt % 2 === 0) {
                    let beatInt = Math.floor(halfBeatInt / 2);
                    if (beatInt >= 4 && beatInt <= 7) {
                        playTone('intro_count');
                    }
                }
            }
        }

        allBells.forEach(bl => {
            if (!bl.played && curBeat >= bl.beat) {
                bl.played = true;
                playTone('bell');
            }
        });

        for (let i = allBeans.length - 1; i >= 0; i--) {
            let b = allBeans[i];

            if (!b.thrown && curBeat >= b.spawnBeat) {
                b.thrown = true;
                if (b.kind === 'good') playTone('throw_good');
                else playTone('throw_bad');
            }

            if (phase === 'practice' && isDemoMode && b.state === 'flying' && curBeat >= b.targetBeat) {
                if (b.kind === 'good') {
                    b.state = 'basket_in';
                    b.animT = 0;
                    spatulaAngle = 0.55;
                    playTone('basket_in');
                    basketSplashTimer = 0.45;
                    addSparkles(620, 415, "#81d4fa", 14);
                } else {
                    b.state = 'flicked';
                    b.animT = 0;
                    spatulaAngle = -1.35;
                    playTone('hit_flick');
                    addSparkles(620, 275, "#ffd54f", 14);
                }
            }

            if (b.state === 'flying' && curBeat > b.targetBeat + 0.38) {
                let p = (curBeat - b.spawnBeat) / FLIGHT_BEATS;
                b.missX = -30 + p * 650;
                b.missY = 310 - Math.sin(Math.min(1.2, p) * Math.PI) * 185 + Math.max(0, p - 1) * 140;
                b.state = 'missed';
                b.animT = 0;
                playTone('miss');
                if (phase === 'prod') {
                    totalNotesCount++;
                    if (b.isGold) goldMissed = true;
                } else {
                    pracBlockHadError = true;
                }
            }

            if (b.state === 'basket_in' || b.state === 'flicked' || b.state === 'missed') {
                b.animT += dt * 4.5;
                if (b.animT > 1.2) allBeans.splice(i, 1);
            }
        }

        if (curBeat >= blockEndBeat) {
            if (phase === 'practice') {
                if (isDemoMode) {
                    const pm = PRACTICE_MODES.at(pracTypeIdx);
                    blockStartBeat = blockEndBeat;
                    blockEndBeat = blockStartBeat + pm.lenBeats;
                    queueBlock(blockStartBeat, pm);
                    return;
                }

                if (!pracClearWait) {
                    if (!pracBlockHadError) pracSuccessCount++;
                    pracBlockHadError = false;
                    if (pracSuccessCount >= 3) {
                        pracClearWait = true;
                    } else {
                        const pm = PRACTICE_MODES.at(pracTypeIdx);
                        blockStartBeat = blockEndBeat;
                        blockEndBeat = blockStartBeat + pm.lenBeats;
                        queueBlock(blockStartBeat, pm);
                    }
                }

                if (pracClearWait && allBeans.length === 0) {
                    pracClearWait = false;
                    pracTypeIdx++;
                    if (pracTypeIdx >= PRACTICE_MODES.length) {
                        enterProductionWithFade();
                        return;
                    }
                    setupPracticeStep();
                }
            } else if (phase === 'prod') {
                prodIdx++;
                if (prodIdx < PROD_BLOCKS.length) {
                    const nb = PROD_BLOCKS.at(prodIdx);
                    blockStartBeat = blockEndBeat;
                    blockEndBeat = blockStartBeat + nb.len;
                    queueBlock(blockStartBeat, nb);
                } else if (curBeat >= blockEndBeat + 2.5) {
                    computeFinalResult();
                }
            }
        }
    };
    function drawBean(ctx, x, y, scale, kind, isGold = false) {
        ctx.save();
        ctx.translate(x, y);
        ctx.scale(scale, scale);

        if (isGold) {
            ctx.shadowColor = "#ffd54f";
            ctx.shadowBlur = 18;
            ctx.fillStyle = "#ffca28";
            ctx.strokeStyle = "#9c6f00";
            ctx.lineWidth = 2.5;
            ctx.beginPath(); ctx.ellipse(0, 0, 22, 16, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
            ctx.shadowBlur = 0;
            ctx.fillStyle = "#fffde7";
            ctx.beginPath(); ctx.ellipse(-7, -5, 7, 4, -0.3, 0, Math.PI * 2); ctx.fill();
        } else if (kind === 'good') {
            ctx.fillStyle = "#fffdf5";
            ctx.strokeStyle = "#8a795d";
            ctx.lineWidth = 2.5;
            ctx.beginPath(); ctx.ellipse(0, 0, 20, 15, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
            ctx.fillStyle = "#ffffff";
            ctx.beginPath(); ctx.ellipse(-6, -4, 6, 3.5, -0.3, 0, Math.PI * 2); ctx.fill();
        } else {
            ctx.fillStyle = "#594f47";
            ctx.strokeStyle = "#26201b";
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            ctx.moveTo(-19, 0);
            ctx.quadraticCurveTo(-15, -16, 2, -13);
            ctx.quadraticCurveTo(20, -11, 18, 3);
            ctx.quadraticCurveTo(12, 15, -4, 13);
            ctx.quadraticCurveTo(-18, 12, -19, 0);
            ctx.closePath(); ctx.fill(); ctx.stroke();
            ctx.fillStyle = "#362e28";
            ctx.beginPath(); ctx.arc(5, -3, 3.5, 0, Math.PI * 2); ctx.fill();
        }
        ctx.restore();
    }

    function drawSpatula(ctx, x, y, ang) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(ang);
        ctx.fillStyle = "#c9935b";
        ctx.strokeStyle = "#4e3418";
        ctx.lineWidth = 3;
        ctx.beginPath(); ctx.roundRect(0, -9, 76, 18, 7); ctx.fill(); ctx.stroke();
        ctx.fillStyle = "#e3b57e";
        ctx.beginPath(); ctx.roundRect(-88, -24, 92, 48, 12); ctx.fill(); ctx.stroke();
        ctx.strokeStyle = "rgba(92, 61, 30, 0.25)";
        ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(-74, -10); ctx.lineTo(-10, -10); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(-74, 10); ctx.lineTo(-10, 10); ctx.stroke();
        ctx.restore();
    }

    function drawBottomBlueBasket(ctx, x, y, splashT) {
        ctx.save();
        ctx.translate(x, y);
        ctx.fillStyle = "#b3e5fc";
        ctx.beginPath(); ctx.ellipse(0, 0, 72, 18, 0, 0, Math.PI * 2); ctx.fill();

        ctx.fillStyle = "#29b6f6";
        ctx.strokeStyle = "#0277bd";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(-76, 0);
        ctx.quadraticCurveTo(-66, 54, 0, 54);
        ctx.quadraticCurveTo(66, 54, 76, 0);
        ctx.closePath();
        ctx.fill(); ctx.stroke();

        ctx.strokeStyle = "#81d4fa";
        ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(-58, 18); ctx.lineTo(58, 18); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(-42, 36); ctx.lineTo(42, 36); ctx.stroke();

        ctx.strokeStyle = "#01579b";
        ctx.lineWidth = 3.5;
        ctx.beginPath(); ctx.ellipse(0, 0, 76, 17, 0, 0, Math.PI * 2); ctx.stroke();

        if (splashT > 0) {
            let p = 1 - (splashT / 0.45);
            ctx.strokeStyle = "#0288d1";
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            ctx.moveTo(-24 - p * 22, -6 - Math.sin(p * Math.PI) * 28);
            ctx.lineTo(-32 - p * 28, -14 - Math.sin(p * Math.PI) * 32);
            ctx.moveTo(24 + p * 22, -6 - Math.sin(p * Math.PI) * 28);
            ctx.lineTo(32 + p * 28, -14 - Math.sin(p * Math.PI) * 32);
            ctx.stroke();
        }
        ctx.restore();
    }

    function drawHiddenTofuPC(ctx, x, y, isOn, bounce) {
        ctx.save();
        ctx.translate(x, y - bounce * 8);
        ctx.scale(0.45, 0.45);
        ctx.fillStyle = "#b0a792"; ctx.fillRect(-58, 72, 116, 10);
        ctx.fillStyle = "#5c564c"; ctx.fillRect(-50, 0, 100, 68);
        ctx.fillStyle = isOn ? "#fcfaf2" : "#2b2b2b";
        ctx.fillRect(-45, 5, 90, 56);
        if (isOn) {
            ctx.fillStyle = "#4a4a4a"; ctx.font = "bold 11px sans-serif"; ctx.textAlign = "center";
            ctx.fillText("とうふ", 0, 26);
            ctx.fillStyle = "#e9d7a5"; ctx.fillRect(-25, 34, 50, 4);
        }
        ctx.restore();
    }
    window.RIZUMU_GAMES["1-2"].draw = function(ctx, canvas) {
        ctx.save();
        ctx.scale(canvas.width / 940, canvas.height / 520);
        ctx.clearRect(0, 0, 940, 520);

        if (phase === 'eyecatch') {
            ctx.fillStyle = "#ffffff"; ctx.fillRect(0, 0, 940, 520);

            ctx.save();
            ctx.font = "900 72px 'Hiragino Kaku Gothic ProN', Meiryo, sans-serif";
            ctx.textAlign = "left";
            ctx.textBaseline = "alphabetic";
            for (let s = 18; s >= 1; s--) {
                ctx.fillStyle = `rgba(180, 175, 165, ${0.035 * (19 - s)})`;
                ctx.fillText("大豆選別", 155 - s * 4.5, 435 + s * 3.2);
            }
            ctx.fillStyle = "#1a1a1a";
            ctx.fillText("大豆選別", 155, 435);
            ctx.restore();

            let hitTime = 1.15;
            let beanX = 560, beanY = 235, spAng = 0.25;
            if (stateTimer < hitTime) {
                let fallT = Math.min(1, stateTimer / 0.65);
                beanY = 60 + fallT * fallT * 175;
            } else {
                let flyT = (stateTimer - hitTime) * 2.6;
                spAng = 0.25 - Math.max(0, 1.0 - (stateTimer - hitTime) * 3.5) * 1.65;
                beanX = 560 - flyT * 520;
                beanY = 235 - flyT * 240;
            }
            if (beanX > -80 && beanY > -80) {
                drawBean(ctx, beanX, beanY, 1.45, 'bad', false);
            }
            drawSpatula(ctx, 675, 255, spAng);

            if (stateTimer >= 1.58 && stateTimer <= 2.02) {
                let ratio = (stateTimer - 1.58) / 0.44;
                let kSc = Math.sin(ratio * Math.PI);
                ctx.save();
                ctx.translate(46, 46);
                ctx.globalAlpha = 1 - ratio * 0.3;
                ctx.strokeStyle = "#ffca28";
                ctx.lineWidth = 4;
                ctx.beginPath();
                ctx.moveTo(-36 * kSc, 0); ctx.lineTo(36 * kSc, 0);
                ctx.moveTo(0, -36 * kSc); ctx.lineTo(0, 36 * kSc);
                ctx.moveTo(-18 * kSc, -18 * kSc); ctx.lineTo(18 * kSc, 18 * kSc);
                ctx.moveTo(18 * kSc, -18 * kSc); ctx.lineTo(-18 * kSc, 18 * kSc);
                ctx.stroke();
                ctx.fillStyle = "#ffffff";
                ctx.beginPath(); ctx.arc(0, 0, 8 * kSc, 0, Math.PI * 2); ctx.fill();
                ctx.restore();
            }

            if (stateTimer >= hitTime) {
                let fadeAlpha = Math.min(1, (stateTimer - hitTime) / 0.85);
                ctx.save();
                ctx.globalAlpha = fadeAlpha;
                ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
                ctx.strokeStyle = "#8c8474";
                ctx.lineWidth = 2;
                ctx.beginPath(); ctx.roundRect(755, 466, 162, 36, 18); ctx.fill(); ctx.stroke();
                ctx.fillStyle = "#4a4a4a";
                ctx.font = "bold 15px sans-serif";
                ctx.textAlign = "center";
                ctx.fillText("[m]でポーズ", 836, 489);
                ctx.restore();
            }

            ctx.restore();
            return;
        }
        if (phase === 'res_step1' || phase === 'res_step2' || phase === 'res_step3' || phase === 'res_card') {
            ctx.fillStyle = "#0a0a0a"; ctx.fillRect(0, 0, 940, 520);

            if (phase === 'res_step1' || phase === 'res_step2' || phase === 'res_step3') {
                ctx.fillStyle = "#ffffff";
                ctx.beginPath(); ctx.roundRect(65, 52, 260, 44, 22); ctx.fill();
                ctx.fillStyle = "#111111"; ctx.font = "bold 19px sans-serif"; ctx.textAlign = "center";
                ctx.fillText("大豆職人より", 195, 81);

                if (phase === 'res_step2' || phase === 'res_step3') {
                    ctx.textAlign = "left";
                    if (isPerfectClear) {
                        ctx.fillStyle = "#ffd54f"; ctx.font = "bold 17px sans-serif";
                        ctx.fillText("しかもパーフェクト", 250, 185);
                    }
                    ctx.fillStyle = "#ffffff"; ctx.font = "bold 25px sans-serif";
                    if (finalRankVal === 0) {
                        ctx.fillText("良い豆と悪い豆が混ざってるよ。", 250, 235);
                        ctx.fillText("これじゃ豆腐が作れないね。", 250, 278);
                    } else if (finalRankVal === 1) {
                        ctx.fillText("なかなかいい選別だったよ。", 250, 225);
                        ctx.fillText("次はもっとリズムに乗っていこう。", 250, 268);
                    } else {
                        ctx.fillText("最高の豆が揃ったよ！", 250, 215);
                        ctx.fillText("これなら極上の絹豆腐ができるね。", 250, 258);
                        ctx.fillText("腕を上げたじゃないか。", 250, 301);
                    }
                }

                if (phase === 'res_step3') {
                    ctx.save(); ctx.translate(765, 415);
                    let rankLabel = (finalRankVal === 0) ? "やり直し" : (finalRankVal === 1) ? "普通" : "豆腐";
                    let mainCol   = (finalRankVal === 0) ? "#90a4ae" : (finalRankVal === 1) ? "#81c784" : "#ffca28";
                    let subBadge  = isPerfectClear ? "パーフェクト！" : (finalRankVal === 2) ? "最高の仕上がり！" : (finalRankVal === 1) ? "選別完了！" : "もう一度挑戦！";

                    if (finalRankVal >= 2) {
                        ctx.fillStyle = "#ffffff";
                        new Array({ x: -115, y: -25, r: 22 }, { x: 115, y: 10, r: 18 }, { x: 75, y: -38, r: 14 }).forEach(st => {
                            ctx.beginPath();
                            for (let i = 0; i < 8; i++) {
                                let rad = (i % 2 === 0) ? st.r : st.r * 0.3;
                                let a = (i / 8) * Math.PI * 2;
                                ctx.lineTo(st.x + Math.cos(a) * rad, st.y + Math.sin(a) * rad);
                            }
                            ctx.closePath(); ctx.fill();
                        });
                    }

                    ctx.save(); ctx.transform(1, 0, -0.18, 1, 0, 0);
                    ctx.font = "900 58px sans-serif"; ctx.textAlign = "center";
                    ctx.lineWidth = 10; ctx.strokeStyle = "#3e2723"; ctx.strokeText(rankLabel, 0, 0);
                    ctx.fillStyle = mainCol; ctx.fillText(rankLabel, 0, 0);
                    ctx.restore();

                    ctx.fillStyle = (finalRankVal === 0) ? "#546e7a" : "#ffb300";
                    ctx.beginPath(); ctx.roundRect(-105, 18, 210, 28, 14); ctx.fill();
                    ctx.fillStyle = (finalRankVal === 0) ? "#ffffff" : "#212121";
                    ctx.font = "bold 15px sans-serif"; ctx.textAlign = "center";
                    ctx.fillText(subBadge, 0, 37);
                    ctx.restore();
                }

                ctx.fillStyle = "#777777"; ctx.font = "13px sans-serif"; ctx.textAlign = "left";
                ctx.fillText("クリック / [Space] で次へ", 65, 475);
            } else {
                ctx.save(); ctx.translate(470, 230);
                if (finalRankVal === 0) {
                    drawBean(ctx, -45, 18, 1.5, 'bad', false);
                    drawBean(ctx, 45, 18, 1.5, 'bad', false);
                    drawBean(ctx, 0, -14, 1.6, 'bad', false);
                } else if (finalRankVal === 1) {
                    drawBean(ctx, -55, 12, 1.55, 'good', false);
                    drawBean(ctx, 55, 12, 1.55, 'good', false);
                    drawBean(ctx, 0, -24, 1.65, 'good', false);
                } else {
                    drawBean(ctx, 0, -4, 2.2, 'good', true);
                    ctx.strokeStyle = "#ffd54f"; ctx.lineWidth = 3;
                    for (let i = 0; i < 8; i++) {
                        let a = (i / 8) * Math.PI * 2;
                        ctx.beginPath(); ctx.moveTo(Math.cos(a) * 62, Math.sin(a) * 48 - 4);
                        ctx.lineTo(Math.cos(a) * 86, Math.sin(a) * 66 - 4); ctx.stroke();
                    }
                }
                ctx.restore();

                ctx.fillStyle = "#ffffff"; ctx.font = "bold 30px sans-serif"; ctx.textAlign = "center";
                let caption = (finalRankVal === 0) ? "選別は豆腐の命だ。"
                            : (finalRankVal === 1) ? "いい仕事するね。"
                            : "まさに黄金比。";
                ctx.fillText(caption, 470, 355);

                ctx.fillStyle = "#777777"; ctx.font = "13px sans-serif";
                ctx.fillText("クリック / [Space] で戻る", 470, 465);
            }
            ctx.restore();
            return;
        }
        ctx.fillStyle = "#fcfbf7";
        ctx.fillRect(0, 0, 940, 520);

        drawHiddenTofuPC(ctx, 470, 110, pcOn, pcBounce);

        drawBottomBlueBasket(ctx, 620, 425, basketSplashTimer);

        let effectiveNow = isPaused ? pauseStartTime : (performance.now() / 1000);
        let curBeat = (effectiveNow - modeStartTime) / BEAT_SEC;

        allBeans.forEach(b => {
            if (b.state === 'flying') {
                let p = (curBeat - b.spawnBeat) / FLIGHT_BEATS;
                if (p < 0) return;
                let bx = -30 + p * 650;
                let arcLift = Math.sin(Math.min(1.0, p) * Math.PI) * 185;
                let baseLineY = 310 - Math.min(1.0, p) * 35;
                let overDrop = (p > 1.0) ? Math.pow(p - 1.0, 1.5) * 420 : 0;
                let by = baseLineY - arcLift + overDrop;
                drawBean(ctx, bx, by, 1.15, b.kind, b.isGold);
            } else if (b.state === 'basket_in') {
                let bx = 620;
                let by = 275 + b.animT * 155;
                let sc = Math.max(0.6, 1.15 - b.animT * 0.45);
                if (b.animT < 1.05) {
                    drawBean(ctx, bx, by, sc, b.kind, b.isGold);
                }
            } else if (b.state === 'flicked') {
                let bx = 620 - b.animT * 580;
                let by = 275 - b.animT * 360;
                drawBean(ctx, bx, by, 1.15, b.kind, b.isGold);
            } else if (b.state === 'missed') {
                let bx = b.missX + b.animT * 70;
                let by = b.missY + b.animT * 240;
                drawBean(ctx, bx, by, 1.15, b.kind, b.isGold);
            }
        });

        drawSpatula(ctx, 725, 292, spatulaAngle);

        particles.forEach(p => {
            ctx.save(); ctx.globalAlpha = Math.max(0, p.life / p.maxLife);
            ctx.fillStyle = p.color;
            ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill();
            ctx.restore();
        });
        if (phase === 'practice') {
            ctx.fillStyle = "rgba(255, 255, 255, 0.92)";
            ctx.strokeStyle = "#b8b2a0"; ctx.lineWidth = 2.5;
            ctx.beginPath(); ctx.roundRect(140, 16, 615, 44, 22); ctx.fill(); ctx.stroke();

            ctx.fillStyle = "#4a4a4a"; ctx.font = "bold 15px sans-serif"; ctx.textAlign = "center";
            let statusText = isDemoMode ? "【お手本実演中】" : `成功：${pracSuccessCount} / 3`;
            ctx.fillText(`${PRACTICE_MODES.at(pracTypeIdx).label}　${statusText}`, 447, 44);

            ctx.fillStyle = isDemoMode ? "#ffb300" : "#ffffff";
            ctx.strokeStyle = "#8c6d23"; ctx.lineWidth = 2.5;
            ctx.beginPath(); ctx.roundRect(775, 16, 140, 44, 22); ctx.fill(); ctx.stroke();
            ctx.fillStyle = isDemoMode ? "#212121" : "#8c6d23";
            ctx.font = "bold 14px sans-serif";
            ctx.fillText(isDemoMode ? "練習に戻る" : "お手本 (D)", 845, 43);

            ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
            ctx.strokeStyle = "#8c6d23"; ctx.lineWidth = 2;
            ctx.beginPath(); ctx.roundRect(18, 468, 165, 38, 19); ctx.fill(); ctx.stroke();
            ctx.fillStyle = "#5d4037"; ctx.font = "bold 15px sans-serif";
            ctx.fillText("[s]でスキップ", 100, 492);
            ctx.textAlign = "left";
        }

        if (isPaused) {
            ctx.fillStyle = "rgba(0, 0, 0, 0.58)";
            ctx.fillRect(0, 0, 940, 520);

            ctx.fillStyle = "#fcfaf2";
            ctx.strokeStyle = "#4a4a4a";
            ctx.lineWidth = 4;
            ctx.beginPath(); ctx.roundRect(300, 125, 340, 275, 24); ctx.fill(); ctx.stroke();

            ctx.fillStyle = "#4a4a4a";
            ctx.font = "900 24px sans-serif";
            ctx.textAlign = "center";
            ctx.fillText("PAUSE", 470, 172);

            const menuItems = new Array("再開する", "最初からやり直す", "やめる");
            menuItems.forEach((label, idx) => {
                let y = 232 + idx * 58;
                let selected = (idx === pauseMenuIdx);
                if (selected) {
                    ctx.fillStyle = "rgba(255, 202, 40, 0.25)";
                    ctx.beginPath(); ctx.roundRect(330, y - 26, 280, 44, 14); ctx.fill();
                    ctx.fillStyle = "#d97706";
                    ctx.font = "900 26px sans-serif";
                    ctx.fillText("▶ " + label, 470, y + 4);
                } else {
                    ctx.fillStyle = "#6e6657";
                    ctx.font = "bold 19px sans-serif";
                    ctx.fillText(label, 470, y + 2);
                }
            });
            ctx.textAlign = "left";
        }

        if (phase === 'fade_to_prod' || phase === 'fade_to_res') {
            let alpha = Math.min(1, stateTimer / 0.7);
            ctx.fillStyle = `rgba(17, 17, 17, ${alpha})`;
            ctx.fillRect(0, 0, 940, 520);
        }

        ctx.restore();
    };
})();
// ==========================================
// 3つ目のゲーム：にがり打ち (1-3)
// ==========================================
window.RIZUMU_GAMES = window.RIZUMU_GAMES || {};

(function() {
    function playTone(type, freq = 440, dur = 0.14) {
        try {
            ensureAudio();
            let dest = (typeof masterOut !== 'undefined' && masterOut) ? masterOut : audioCtx.destination;
            let now = audioCtx.currentTime;
            let bgmVol = getBgmVol();
            let seVol  = getSeVol();

            if (type === 'jingle') {
                // はたらくまんじゅう風の軽快で少し不思議な和風ポップジングル
                const seq = new Array(
                    { t: 0.00, d: 0.11, f: new Array(392.00, 783.99) },
                    { t: 0.12, d: 0.11, f: new Array(440.00, 880.00) },
                    { t: 0.24, d: 0.11, f: new Array(523.25, 1046.50) },
                    { t: 0.38, d: 0.14, f: new Array(493.88, 987.77) },
                    { t: 0.54, d: 0.55, f: new Array(293.66, 440.00, 587.33, 880.00) }
                );
                seq.forEach(s => s.f.forEach((hz, i) => {
                    let o = audioCtx.createOscillator(), g = audioCtx.createGain();
                    o.type = (i === 0) ? 'sine' : 'triangle';
                    o.frequency.setValueAtTime(hz, now + s.t);
                    g.gain.setValueAtTime(0.001, now + s.t);
                    g.gain.linearRampToValueAtTime((i === 0 ? 0.10 : 0.08) * seVol, now + s.t + 0.015);
                    g.gain.exponentialRampToValueAtTime(0.001, now + s.t + s.d);
                    o.connect(g); g.connect(dest);
                    o.start(now + s.t); o.stop(now + s.t + s.d + 0.02);
                }));
                return;
            }

            if (type === 'intro_count') {
                new Array(293.66, 587.33).forEach((hz, i) => {
                    let o = audioCtx.createOscillator(), g = audioCtx.createGain();
                    o.type = (i === 0) ? 'sine' : 'triangle';
                    o.frequency.setValueAtTime(hz, now);
                    g.gain.setValueAtTime(0.001, now);
                    g.gain.linearRampToValueAtTime((i === 0 ? 0.09 : 0.07) * seVol, now + 0.01);
                    g.gain.exponentialRampToValueAtTime(0.001, now + 0.10);
                    o.connect(g); g.connect(dest);
                    o.start(now); o.stop(now + 0.11);
                });
                return;
            }

            if (type === 'voice_count') {
                // ラスト前の「1・2・3・4」掛け声風シンセ音
                let o = audioCtx.createOscillator(), g = audioCtx.createGain();
                o.type = 'triangle';
                o.frequency.setValueAtTime(freq, now);
                o.frequency.exponentialRampToValueAtTime(freq * 1.12, now + 0.09);
                g.gain.setValueAtTime(0.16 * seVol, now);
                g.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
                o.connect(g); g.connect(dest);
                o.start(now); o.stop(now + 0.15);
                return;
            }

            if (type === 'rank_bad') {
                new Array(146.83, 138.59).forEach(hz => {
                    let o = audioCtx.createOscillator(), g = audioCtx.createGain();
                    o.type = 'triangle'; o.frequency.setValueAtTime(hz, now);
                    o.frequency.linearRampToValueAtTime(hz * 0.78, now + 0.85);
                    g.gain.setValueAtTime(0.16 * seVol, now);
                    g.gain.exponentialRampToValueAtTime(0.001, now + 0.9);
                    o.connect(g); g.connect(dest); o.start(now); o.stop(now + 0.92);
                });
                return;
            }
            if (type === 'rank_normal') {
                new Array({ t: 0, f: 440.00, d: 0.14 }, { t: 0.15, f: 392.00, d: 0.28 }).forEach(n => {
                    let o = audioCtx.createOscillator(), g = audioCtx.createGain();
                    o.type = 'triangle'; o.frequency.setValueAtTime(n.f, now + n.t);
                    g.gain.setValueAtTime(0.16 * seVol, now + n.t);
                    g.gain.exponentialRampToValueAtTime(0.001, now + n.t + n.d);
                    o.connect(g); g.connect(dest); o.start(now + n.t); o.stop(now + n.t + n.d + 0.02);
                });
                return;
            }
            if (type === 'rank_tofu') {
                new Array({ t: 0, f: 440.00, d: 0.20 }, { t: 0.22, f: 587.33, d: 0.55 }).forEach(n => {
                    let o = audioCtx.createOscillator(), g = audioCtx.createGain();
                    o.type = 'triangle'; o.frequency.setValueAtTime(n.f, now + n.t);
                    g.gain.setValueAtTime(0.18 * seVol, now + n.t);
                    g.gain.exponentialRampToValueAtTime(0.001, now + n.t + n.d);
                    o.connect(g); g.connect(dest); o.start(now + n.t); o.stop(now + n.t + n.d + 0.02);
                });
                return;
            }
            let o = audioCtx.createOscillator(), g = audioCtx.createGain();
            if (type === 'cue_pocha') {
                // 豆乳が注がれる音（ぽちゃ）
                o.type = 'sine';
                o.frequency.setValueAtTime(340, now);
                o.frequency.exponentialRampToValueAtTime(520, now + 0.07);
                g.gain.setValueAtTime(0.15 * seVol, now);
                g.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
                o.connect(g); g.connect(dest); o.start(now); o.stop(now + 0.10);
            } else if (type === 'cue_bocchan') {
                // 長押し合図の大きな豆乳音（ボッチャン！）
                o.type = 'triangle';
                o.frequency.setValueAtTime(240, now);
                o.frequency.exponentialRampToValueAtTime(480, now + 0.14);
                g.gain.setValueAtTime(0.19 * seVol, now);
                g.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
                o.connect(g); g.connect(dest); o.start(now); o.stop(now + 0.19);
            } else if (type === 'cue_popo') {
                // 16連打ち用の軽快な豆乳音（ぽ）
                o.type = 'sine';
                o.frequency.setValueAtTime(420, now);
                o.frequency.exponentialRampToValueAtTime(620, now + 0.045);
                g.gain.setValueAtTime(0.13 * seVol, now);
                g.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
                o.connect(g); g.connect(dest); o.start(now); o.stop(now + 0.07);
            } else if (type === 'hit_pon') {
                // 裏拍でにがりを打つ音（ポン！）
                o.type = 'sine';
                o.frequency.setValueAtTime(freq || 783.99, now);
                o.frequency.exponentialRampToValueAtTime((freq || 783.99) * 1.35, now + 0.08);
                g.gain.setValueAtTime(0.20 * seVol, now);
                g.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
                o.connect(g); g.connect(dest); o.start(now); o.stop(now + 0.13);
            } else if (type === 'hit_pocchan_hold') {
                // 長押しでにがりをたっぷり注ぎ始めた音（ぽっ…）
                o.type = 'triangle';
                o.frequency.setValueAtTime(587.33, now);
                o.frequency.linearRampToValueAtTime(783.99, now + 0.25);
                g.gain.setValueAtTime(0.16 * seVol, now);
                g.gain.exponentialRampToValueAtTime(0.001, now + 0.30);
                o.connect(g); g.connect(dest); o.start(now); o.stop(now + 0.32);
            } else if (type === 'hit_pocchan_end') {
                // 長押し完了の弾ける水滴音（…ちゃん！）
                new Array(880.00, 1174.66).forEach((hz, idx) => {
                    let oh = audioCtx.createOscillator(), gh = audioCtx.createGain();
                    oh.type = 'sine';
                    oh.frequency.setValueAtTime(hz, now + idx * 0.025);
                    gh.gain.setValueAtTime(0.18 * seVol, now + idx * 0.025);
                    gh.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.025 + 0.16);
                    oh.connect(gh); gh.connect(dest); oh.start(now + idx * 0.025); oh.stop(now + idx * 0.025 + 0.18);
                });
            } else if (type === 'miss') {
                o.type = 'sawtooth';
                o.frequency.setValueAtTime(140, now);
                o.frequency.linearRampToValueAtTime(85, now + 0.15);
                g.gain.setValueAtTime(0.15 * seVol, now);
                g.gain.exponentialRampToValueAtTime(0.001, now + 0.17);
                o.connect(g); g.connect(dest); o.start(now); o.stop(now + 0.18);
            } else if (type === 'wa_bass') {
                o.type = 'triangle';
                o.frequency.setValueAtTime(freq, now);
                g.gain.setValueAtTime(0.095 * bgmVol, now);
                g.gain.exponentialRampToValueAtTime(0.001, now + dur);
                o.connect(g); g.connect(dest); o.start(now); o.stop(now + dur + 0.02);
            } else if (type === 'wa_taiko') {
                o.type = 'sine';
                o.frequency.setValueAtTime(freq || 110, now);
                o.frequency.exponentialRampToValueAtTime(48, now + 0.09);
                g.gain.setValueAtTime(0.13 * bgmVol, now);
                g.gain.exponentialRampToValueAtTime(0.001, now + 0.10);
                o.connect(g); g.connect(dest); o.start(now); o.stop(now + 0.11);
            }
        } catch (e) {}
    }
    const BPM = 120;
    const BEAT_SEC = 60 / BPM;
    const HOLD_MIN_SEC = 0.24; // 長押し判定の最小時間（約0.5拍）

    function makeNigariBlock(type, isGoldFinal = false) {
        if (type === 1) {
            // 1：（ぽちゃ・ぽちゃ・ぽちゃ）ポン・ポン・ポン ← 裏拍3連
            return {
                len: 6.0,
                cues: new Array(
                    { off: 1.0, kind: 'pocha' },
                    { off: 2.0, kind: 'pocha' },
                    { off: 3.0, kind: 'pocha' }
                ),
                hits: new Array(
                    { off: 1.5, kind: 'tap',  isGold: false },
                    { off: 2.5, kind: 'tap',  isGold: false },
                    { off: 3.5, kind: 'tap',  isGold: false }
                )
            };
        } else if (type === 2) {
            // 2：（ぽちゃん・[休み]・ぽちゃ・ぽちゃ）ポン・ウン・ポン・ポン ← 1連＋1拍あけ2連
            return {
                len: 6.0,
                cues: new Array(
                    { off: 1.0, kind: 'pocha' },
                    { off: 3.0, kind: 'pocha' },
                    { off: 4.0, kind: 'pocha' }
                ),
                hits: new Array(
                    { off: 1.5, kind: 'tap',  isGold: false },
                    { off: 3.5, kind: 'tap',  isGold: false },
                    { off: 4.5, kind: 'tap',  isGold: false }
                )
            };
        } else if (type === 3) {
            // 3：（ぽちゃ・ぽちゃ・ボッチャン）ポン・ポン・ぽっちゃん ← 2連後長押し
            return {
                len: 6.0,
                cues: new Array(
                    { off: 1.0, kind: 'pocha' },
                    { off: 2.0, kind: 'pocha' },
                    { off: 3.0, kind: 'bocchan' }
                ),
                hits: new Array(
                    { off: 1.5, kind: 'tap',  isGold: false },
                    { off: 2.5, kind: 'tap',  isGold: false },
                    { off: 3.5, kind: 'hold', isGold: false }
                )
            };
        } else if (type === 4) {
            // 4：（ぽぽぽぽ×16 ×2）ポポポポ×16 ×2 ← 本番限定16連打ち×2セット（0.5拍ごとの裏拍連打）
            let cues = new Array();
            let hits = new Array();
            // 1セット目（16連）
            for (let k = 0; k < 16; k++) {
                let b = 1.0 + k * 0.5;
                cues.push({ off: b, kind: 'popo' });
                hits.push({ off: b + 0.25, kind: 'rapid', isGold: false });
            }
            // 2セット目（1拍あけて16連）
            for (let k = 0; k < 16; k++) {
                let b = 10.0 + k * 0.5;
                cues.push({ off: b, kind: 'popo' });
                hits.push({ off: b + 0.25, kind: 'rapid', isGold: false });
            }
            return {
                len: 20.0,
                cues: cues,
                hits: hits
            };
        } else {
            // 5：（1・2・3・4・ぽちゃん）ウン・ウン・ウン・ウン・ポン ← 4拍あけ決め
            return {
                len: 8.0,
                cues: new Array(
                    { off: 1.0, kind: 'count', hz: 392.00 },
                    { off: 2.0, kind: 'count', hz: 440.00 },
                    { off: 3.0, kind: 'count', hz: 493.88 },
                    { off: 4.0, kind: 'count', hz: 523.25 },
                    { off: 5.0, kind: 'pocha' }
                ),
                hits: new Array(
                    { off: 5.5, kind: 'tap', isGold: isGoldFinal }
                )
            };
        }
    }

    const PRACTICE_MODES = new Array(
        Object.assign({ label: "1：（ぽちゃ×3）裏拍で ポン・ポン・ポン！" }, makeNigariBlock(1)),
        Object.assign({ label: "2：（ぽちゃん・ぽちゃ×2）ポン・ウン・ポン・ポン！" }, makeNigariBlock(2)),
        Object.assign({ label: "3：（ぽちゃ×2・ボッチャン）ポン・ポン・ぽっちゃん[長押し]！" }, makeNigariBlock(3))
    );

    // 本番構成：全184拍（BPM120で約1分32秒のボリューム！）
    const PROD_BLOCKS = new Array(
        makeNigariBlock(1),
        makeNigariBlock(1),
        makeNigariBlock(2),
        makeNigariBlock(2),
        makeNigariBlock(3),
        makeNigariBlock(1),
        makeNigariBlock(2),
        makeNigariBlock(3),
        makeNigariBlock(4),        // 中盤の山場：16連打ち×2セット！
        makeNigariBlock(1),
        makeNigariBlock(2),
        makeNigariBlock(3),
        makeNigariBlock(2),
        makeNigariBlock(3),
        makeNigariBlock(4),        // 終盤の山場：16連打ち×2セット！
        makeNigariBlock(3),
        makeNigariBlock(5, true)   // ラストの決め：（1・2・3・4・ぽちゃん）ウンウンウンウンポン！
    );

    // 和風グルーヴのベースライン（ニロ抜きヨナ抜き音階）
    const WA_BASS = new Array(
        146.83, 146.83, 174.61, 196.00,
        220.00, 196.00, 174.61, 130.81
    );
    let phase = 'eyecatch';
    let stateTimer = 0;

    let isPaused = false;
    let pauseMenuIdx = 0;
    let pauseStartTime = 0;

    let pracTypeIdx = 0;
    let pracSuccessCount = 0;
    let pracBlockHadError = false;
    let pracClearWait = false;
    let isDemoMode = false;

    let prodIdx = 0;
    let blockStartBeat = 0;
    let blockEndBeat = 0;

    let totalNotesCount = 0;
    let successNotesCount = 0;
    let perfectNotesCount = 0;
    let goldMissed = false;
    let emptyMissCount = 0;

    let finalRankVal = 0;
    let isPerfectClear = false;
    let resStepTimer = 0;

    let modeStartTime = 0;
    let lastBeatInt = -1;
    let allCues = new Array();
    let allHits = new Array();
    let ripples = new Array();
    let drops = new Array();

    let isHoldingKey = false;
    let holdStartSec = 0;
    let activeHoldHit = null;

    let ladleTilt = 0;     // 左側の豆乳柄杓の傾き
    let bottleDrop = 0;    // 右側のにがり小瓶の押し下げ
    let eyecatchPoseShown = false;
    let pcOn = false;
    let pcBounce = 0;

    function togglePause() {
        if (phase !== 'practice' && phase !== 'prod') return;
        if (!isPaused) {
            isPaused = true;
            isHoldingKey = false;
            activeHoldHit = null;
            pauseMenuIdx = 0;
            pauseStartTime = performance.now() / 1000;
            playPikon(587.33);
        } else {
            isPaused = false;
            modeStartTime += (performance.now() / 1000) - pauseStartTime;
            playPikon(659.25);
        }
    }

    function executePauseAction(idx) {
        if (idx === 0) {
            isPaused = false;
            modeStartTime += (performance.now() / 1000) - pauseStartTime;
            playPikon(659.25);
        } else if (idx === 1) {
            isPaused = false;
            playPikon(659.25);
            window.RIZUMU_GAMES["1-3"].start();
        } else if (idx === 2) {
            isPaused = false;
            phase = 'stopped';
            playPikon(523.25);
            if (typeof window.quitRizumuGame === 'function') {
                window.quitRizumuGame();
            } else if (typeof window.finishRizumuGame === 'function') {
                window.finishRizumuGame(-1);
            }
        }
    }

    function spawnRipple(x, y, col, maxR) {
        ripples.push({ x: x, y: y, r: 8, maxR: maxR, alpha: 0.9, color: col });
    }

    function spawnDrop(x, y, isGold, big = false) {
        drops.push({
            x: x, y: y,
            vy: 420,
            targetY: 315,
            isGold: isGold,
            big: big,
            done: false
        });
    }

    function queueBlock(startBeat, blk) {
        blk.cues.forEach(c => {
            allCues.push({
                beat: startBeat + c.off,
                kind: c.kind,
                hz: c.hz || 440,
                played: false
            });
        });
        blk.hits.forEach(h => {
            allHits.push({
                targetBeat: startBeat + h.off,
                kind: h.kind, // 'tap' | 'hold' | 'rapid'
                isGold: !!h.isGold,
                state: 'pending', // 'pending' | 'holding' | 'done' | 'missed'
                isPerf: false,
                demoReleaseBeat: 0
            });
        });
    }

    function setupPracticeStep() {
        pracSuccessCount = 0;
        pracBlockHadError = false;
        pracClearWait = false;
        isHoldingKey = false;
        activeHoldHit = null;
        allCues = new Array();
        allHits = new Array();
        lastBeatInt = -1;
        modeStartTime = performance.now() / 1000;
        const pm = PRACTICE_MODES.at(pracTypeIdx);
        blockStartBeat = 0;
        blockEndBeat = pm.len;
        queueBlock(0, pm);
    }

    function toggleDemoMode() {
        isDemoMode = !isDemoMode;
        playPikon(isDemoMode ? 783.99 : 587.33);
        setupPracticeStep();
    }

    function enterProductionWithFade() {
        isDemoMode = false;
        pracClearWait = false;
        isHoldingKey = false;
        activeHoldHit = null;
        phase = 'fade_to_prod';
        stateTimer = 0;
        allCues = new Array();
        allHits = new Array();
    }

    function beginProductionActual() {
        phase = 'prod';
        prodIdx = 0;
        modeStartTime = performance.now() / 1000;
        lastBeatInt = -1;
        allCues = new Array();
        allHits = new Array();
        pcOn = true;

        totalNotesCount = 0;
        successNotesCount = 0;
        perfectNotesCount = 0;
        goldMissed = false;
        emptyMissCount = 0;

        const b = PROD_BLOCKS.at(0);
        blockStartBeat = 8.0;
        blockEndBeat = 8.0 + b.len;
        queueBlock(8.0, b);
    }

    function computeFinalResult() {
        let effectiveTotal = totalNotesCount + emptyMissCount;
        let rate = effectiveTotal > 0 ? (successNotesCount / effectiveTotal) * 100 : 0;

        isPerfectClear = (totalNotesCount > 0 && perfectNotesCount === totalNotesCount && emptyMissCount === 0 && !goldMissed);

        if (rate <= 40) {
            finalRankVal = 0;
        } else if (rate <= 85 || goldMissed) {
            finalRankVal = 1;
        } else {
            finalRankVal = isPerfectClear ? 3 : 2;
        }

        phase = 'fade_to_res';
        stateTimer = 0;
    }
    function handleHoldRelease() {
        if (!isHoldingKey) return;
        let dur = (performance.now() / 1000) - holdStartSec;
        isHoldingKey = false;

        if (!activeHoldHit) return;
        let h = activeHoldHit;
        activeHoldHit = null;

        if (h.state === 'holding') {
            if (dur >= HOLD_MIN_SEC) {
                h.state = 'done';
                playTone('hit_pocchan_end');
                spawnDrop(540, 210, h.isGold, true);
                spawnRipple(540, 315, "#81d4fa", 95);
                if (phase === 'prod') {
                    totalNotesCount++;
                    successNotesCount++;
                    if (h.isPerf) { perfectNotesCount++; pcBounce = 1.0; }
                }
            } else {
                // 長押しが短すぎて「ぽっちゃん」にならなかった（ミス）
                h.state = 'missed';
                playTone('miss');
                if (phase === 'prod') {
                    totalNotesCount++;
                } else {
                    pracSuccessCount = 0;
                    pracBlockHadError = true;
                }
            }
        }
    }

    window.RIZUMU_GAMES["1-3"] = {
        start() {
            phase = 'eyecatch';
            stateTimer = 0;
            isPaused = false;
            pauseMenuIdx = 0;
            pracTypeIdx = 0;
            pracSuccessCount = 0;
            pracBlockHadError = false;
            pracClearWait = false;
            isDemoMode = false;
            isHoldingKey = false;
            activeHoldHit = null;
            ladleTilt = 0;
            bottleDrop = 0;
            pcOn = false;
            pcBounce = 0;
            ripples = new Array();
            drops = new Array();
            allCues = new Array();
            allHits = new Array();
            playTone('jingle');

            if (!window._rizumu13KeyDown) {
                window._rizumu13KeyDown = function(ev) {
                    if (phase === 'stopped' || phase === 'done') return;
                    if (ev.repeat) return;
                    if (ev.key === 'm' || ev.key === 'M' || ev.code === 'KeyM') {
                        if (phase === 'practice' || phase === 'prod') {
                            ev.preventDefault();
                            togglePause();
                        }
                        return;
                    }
                    if (isPaused) {
                        if (ev.code === 'ArrowUp' || ev.key === 'w' || ev.key === 'W') {
                            ev.preventDefault();
                            pauseMenuIdx = (pauseMenuIdx + 2) % 3;
                            playPikon(523.25);
                        } else if (ev.code === 'ArrowDown' || ev.key === 's' || ev.key === 'S') {
                            ev.preventDefault();
                            pauseMenuIdx = (pauseMenuIdx + 1) % 3;
                            playPikon(523.25);
                        } else if (ev.code === 'Enter') {
                            ev.preventDefault();
                            executePauseAction(pauseMenuIdx);
                        }
                    }
                };
                window._rizumu13Release = function() {
                    if (isHoldingKey) {
                        handleHoldRelease();
                    }
                };
                window.addEventListener('keydown', window._rizumu13KeyDown);
                window.addEventListener('keyup', window._rizumu13Release);
                window.addEventListener('pointerup', window._rizumu13Release);
            }
        },
        stop() {
            phase = 'stopped';
            isPaused = false;
            isHoldingKey = false;
            if (window._rizumu13KeyDown) {
                window.removeEventListener('keydown', window._rizumu13KeyDown);
                window.removeEventListener('keyup', window._rizumu13Release);
                window.removeEventListener('pointerup', window._rizumu13Release);
                window._rizumu13KeyDown = null;
                window._rizumu13Release = null;
            }
        },
        onInput(kind, e) {
            if (isPaused) {
                if (kind === 'key' && !e.repeat && e.code === 'Space') {
                    executePauseAction(pauseMenuIdx);
                } else if (kind === 'pointer') {
                    const cvs = e.target;
                    const rect = cvs.getBoundingClientRect();
                    const lx = (e.clientX - rect.left) * (940 / rect.width);
                    const ly = (e.clientY - rect.top) * (520 / rect.height);
                    if (lx >= 330 && lx <= 610) {
                        if (ly >= 200 && ly <= 252) { pauseMenuIdx = 0; executePauseAction(0); }
                        else if (ly >= 260 && ly <= 312) { pauseMenuIdx = 1; executePauseAction(1); }
                        else if (ly >= 320 && ly <= 372) { pauseMenuIdx = 2; executePauseAction(2); }
                    }
                }
                return;
            }

            if (kind === 'key') {
                if (e.repeat) return;
                if ((e.key === 's' || e.key === 'S') && phase === 'practice') {
                    playPikon(659.25);
                    enterProductionWithFade();
                    return;
                }
                if ((e.key === 'd' || e.key === 'D') && phase === 'practice') {
                    toggleDemoMode();
                    return;
                }
                if (e.code !== 'Space') return;
            }

            if (kind === 'pointer' && phase === 'practice') {
                const cvs = e.target;
                const rect = cvs.getBoundingClientRect();
                const lx = (e.clientX - rect.left) * (940 / rect.width);
                const ly = (e.clientY - rect.top) * (520 / rect.height);
                if (lx >= 18 && lx <= 185 && ly >= 468 && ly <= 510) {
                    playPikon(659.25);
                    enterProductionWithFade();
                    return;
                }
                if (lx >= 775 && lx <= 915 && ly >= 16 && ly <= 60) {
                    toggleDemoMode();
                    return;
                }
            }

            if (phase === 'res_step1' && resStepTimer > 0.25) {
                playPikon(587.33); phase = 'res_step2'; resStepTimer = 0; return;
            }
            if (phase === 'res_step2' && resStepTimer > 0.35) {
                phase = 'res_step3'; resStepTimer = 0;
                if (finalRankVal === 0) playTone('rank_bad');
                else if (finalRankVal === 1) playTone('rank_normal');
                else playTone('rank_tofu');
                return;
            }
            if (phase === 'res_step3' && resStepTimer > 0.45) {
                playPikon(587.33); phase = 'res_card'; resStepTimer = 0; return;
            }
            if (phase === 'res_card' && resStepTimer > 0.45) {
                playPikon(659.25); phase = 'done';
                window.finishRizumuGame(finalRankVal);
                return;
            }

            if (phase !== 'practice' && phase !== 'prod') return;
            if (phase === 'practice' && (isDemoMode || pracClearWait)) return;

            let nowSec = performance.now() / 1000;
            let curBeat = (nowSec - modeStartTime) / BEAT_SEC;
            bottleDrop = 1.0;

            let best = null, minDiff = 999;
            allHits.forEach(h => {
                if (h.state === 'pending') {
                    let d = Math.abs(curBeat - h.targetBeat);
                    if (d < minDiff) { minDiff = d; best = h; }
                }
            });

            // 16連打ち時は判定窓を少しタイトに、通常時は広めに設定
            let maxWin = (best && best.kind === 'rapid') ? 0.24 : 0.35;

            if (best && minDiff <= maxWin) {
                let isPerf = (minDiff <= 0.14);
                if (best.kind === 'hold') {
                    // 長押しノーツの開始（ぽっ…）
                    best.state = 'holding';
                    best.isPerf = isPerf;
                    isHoldingKey = true;
                    holdStartSec = nowSec;
                    activeHoldHit = best;
                    playTone('hit_pocchan_hold');
                    spawnDrop(540, 205, best.isGold, false);
                } else {
                    // 単押し（ポン！）または16連打ち（ポ！）
                    best.state = 'done';
                    let pitch = (best.kind === 'rapid') ? 987.77 : 783.99;
                    playTone('hit_pon', pitch);
                    spawnDrop(540, 205, best.isGold, false);
                    spawnRipple(540, 315, best.isGold ? "#ffd54f" : "#ffffff", best.kind === 'rapid' ? 42 : 70);
                    if (phase === 'prod') {
                        totalNotesCount++;
                        successNotesCount++;
                        if (isPerf) { perfectNotesCount++; pcBounce = 1.0; }
                    }
                }
            } else {
                playTone('miss');
                if (phase === 'prod') {
                    emptyMissCount++;
                } else if (phase === 'practice') {
                    pracSuccessCount = 0;
                    pracBlockHadError = true;
                }
            }
        }
    };
    window.RIZUMU_GAMES["1-3"].update = function(dt) {
        if (isPaused) return;

        if (ladleTilt > 0) ladleTilt = Math.max(0, ladleTilt - dt * 5.0);
        if (bottleDrop > 0) bottleDrop = Math.max(0, bottleDrop - dt * 6.5);
        if (pcBounce > 0) pcBounce = Math.max(0, pcBounce - dt * 4.5);

        for (let i = ripples.length - 1; i >= 0; i--) {
            let rp = ripples[i];
            rp.r += dt * 110;
            rp.alpha = Math.max(0, 1 - (rp.r / rp.maxR));
            if (rp.r >= rp.maxR) ripples.splice(i, 1);
        }

        for (let i = drops.length - 1; i >= 0; i--) {
            let dr = drops[i];
            dr.y += dr.vy * dt;
            if (dr.y >= dr.targetY) {
                drops.splice(i, 1);
            }
        }

        if (phase === 'eyecatch') {
            stateTimer += dt;
            if (stateTimer >= 3.6) {
                phase = 'practice';
                pracTypeIdx = 0;
                isDemoMode = false;
                setupPracticeStep();
            }
            return;
        }

        if (phase === 'fade_to_prod') {
            stateTimer += dt;
            if (stateTimer >= 1.1) beginProductionActual();
            return;
        }

        if (phase === 'fade_to_res') {
            stateTimer += dt;
            if (stateTimer >= 1.1) {
                phase = 'res_step1';
                resStepTimer = 0;
                playPikon(523.25);
            }
            return;
        }

        if (phase === 'res_step1' || phase === 'res_step2' || phase === 'res_step3' || phase === 'res_card') {
            resStepTimer += dt;
            return;
        }

        if (phase !== 'practice' && phase !== 'prod') return;

        let nowSec = performance.now() / 1000;
        let curBeat = (nowSec - modeStartTime) / BEAT_SEC;

        // 和風グルーヴ伴奏（表拍に和太鼓ドン・裏拍にベースで裏拍が取りやすい設計）
        let beatInt = Math.floor(curBeat);
        if (beatInt !== lastBeatInt && beatInt >= 0) {
            lastBeatInt = beatInt;
            if (phase === 'prod') {
                let idx8 = beatInt % 8;
                playTone('wa_taiko', (beatInt % 2 === 0) ? 110 : 146.83);
                playTone('wa_bass', WA_BASS.at(idx8), 0.36);

                if (beatInt >= 4 && beatInt <= 7) {
                    playTone('intro_count');
                }
            }
        }

        // 表拍の合図再生（豆乳が注がれる音＆ラスト前カウント）
        allCues.forEach(c => {
            if (!c.played && curBeat >= c.beat) {
                c.played = true;
                if (c.kind === 'pocha') {
                    ladleTilt = 1.0;
                    playTone('cue_pocha');
                    spawnRipple(410, 318, "#fffdf5", 65);
                } else if (c.kind === 'bocchan') {
                    ladleTilt = 1.3;
                    playTone('cue_bocchan');
                    spawnRipple(410, 318, "#ffe082", 105);
                } else if (c.kind === 'popo') {
                    ladleTilt = 0.7;
                    playTone('cue_popo');
                    spawnRipple(410, 318, "#fffdf5", 40);
                } else if (c.kind === 'count') {
                    playTone('voice_count', c.hz);
                }
            }
        });

        // 長押しを一定時間（0.48秒）押し続けた場合の自動完了処理
        if (isHoldingKey && activeHoldHit && activeHoldHit.state === 'holding') {
            if ((nowSec - holdStartSec) >= 0.48) {
                handleHoldRelease();
            }
        }

        for (let i = allHits.length - 1; i >= 0; i--) {
            let h = allHits[i];

            // お手本モードの自動実演
            if (phase === 'practice' && isDemoMode && h.state === 'pending' && curBeat >= h.targetBeat) {
                bottleDrop = 1.0;
                if (h.kind === 'hold') {
                    h.state = 'holding';
                    h.demoReleaseBeat = h.targetBeat + 0.65;
                    playTone('hit_pocchan_hold');
                    spawnDrop(540, 205, false, false);
                } else {
                    h.state = 'done';
                    playTone('hit_pon', 783.99);
                    spawnDrop(540, 205, false, false);
                    spawnRipple(540, 315, "#ffffff", 70);
                }
            }
            if (phase === 'practice' && isDemoMode && h.state === 'holding' && curBeat >= h.demoReleaseBeat) {
                h.state = 'done';
                playTone('hit_pocchan_end');
                spawnDrop(540, 210, false, true);
                spawnRipple(540, 315, "#81d4fa", 95);
            }

            // 見逃しミス判定
            let missLimit = (h.kind === 'rapid') ? 0.25 : 0.36;
            if (h.state === 'pending' && curBeat > h.targetBeat + missLimit) {
                h.state = 'missed';
                playTone('miss');
                if (phase === 'prod') {
                    totalNotesCount++;
                    if (h.isGold) goldMissed = true;
                } else {
                    pracBlockHadError = true;
                }
            }

            if (h.state === 'done' || h.state === 'missed') {
                allHits.splice(i, 1);
            }
        }

        if (curBeat >= blockEndBeat) {
            if (phase === 'practice') {
                if (isDemoMode) {
                    const pm = PRACTICE_MODES.at(pracTypeIdx);
                    blockStartBeat = blockEndBeat;
                    blockEndBeat = blockStartBeat + pm.len;
                    queueBlock(blockStartBeat, pm);
                    return;
                }

                if (!pracClearWait) {
                    if (!pracBlockHadError) pracSuccessCount++;
                    pracBlockHadError = false;
                    if (pracSuccessCount >= 3) {
                        pracClearWait = true;
                    } else {
                        const pm = PRACTICE_MODES.at(pracTypeIdx);
                        blockStartBeat = blockEndBeat;
                        blockEndBeat = blockStartBeat + pm.len;
                        queueBlock(blockStartBeat, pm);
                    }
                }

                if (pracClearWait && allHits.length === 0) {
                    pracClearWait = false;
                    pracTypeIdx++;
                    if (pracTypeIdx >= PRACTICE_MODES.length) {
                        enterProductionWithFade();
                        return;
                    }
                    setupPracticeStep();
                }
            } else if (phase === 'prod') {
                prodIdx++;
                if (prodIdx < PROD_BLOCKS.length) {
                    const nb = PROD_BLOCKS.at(prodIdx);
                    blockStartBeat = blockEndBeat;
                    blockEndBeat = blockStartBeat + nb.len;
                    queueBlock(blockStartBeat, nb);
                } else if (curBeat >= blockEndBeat + 2.5) {
                    computeFinalResult();
                }
            }
        }
    };
    function drawSoyMilkTub(ctx, x, y, ripplesList) {
        ctx.save();
        ctx.translate(x, y);

        // 桶の側面（木目調）
        ctx.fillStyle = "#c9965b";
        ctx.strokeStyle = "#5c3d1e";
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(-210, 0);
        ctx.lineTo(-190, 125);
        ctx.quadraticCurveTo(0, 152, 190, 125);
        ctx.lineTo(210, 0);
        ctx.closePath();
        ctx.fill(); ctx.stroke();

        // タガ（竹の輪）
        ctx.strokeStyle = "#8c6239";
        ctx.lineWidth = 7;
        ctx.beginPath();
        ctx.quadraticCurveTo(-198, 46, 0, 58);
        ctx.quadraticCurveTo(198, 46, 204, 42);
        ctx.stroke();

        // 桶のフチと豆乳の表面
        ctx.fillStyle = "#e3b882";
        ctx.strokeStyle = "#5c3d1e";
        ctx.lineWidth = 4;
        ctx.beginPath(); ctx.ellipse(0, 0, 210, 44, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();

        ctx.fillStyle = "#fcfaf2";
        ctx.beginPath(); ctx.ellipse(0, 3, 194, 36, 0, 0, Math.PI * 2); ctx.fill();

        // 波紋エフェクト
        ripplesList.forEach(rp => {
            ctx.save();
            ctx.globalAlpha = rp.alpha;
            ctx.strokeStyle = rp.color;
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.ellipse(rp.x - x, rp.y - y, rp.r, rp.r * 0.25, 0, 0, Math.PI * 2);
            ctx.stroke();
            ctx.restore();
        });

        ctx.restore();
    }

    function drawSoyLadle(ctx, x, y, tilt) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(tilt * 0.48);

        // 柄杓の持ち手
        ctx.fillStyle = "#d4a36a";
        ctx.strokeStyle = "#5c3d1e";
        ctx.lineWidth = 3;
        ctx.beginPath(); ctx.roundRect(-150, -7, 130, 14, 6); ctx.fill(); ctx.stroke();

        // 柄杓のカップ
        ctx.fillStyle = "#e6bc8a";
        ctx.beginPath(); ctx.roundRect(-24, -18, 48, 36, 8); ctx.fill(); ctx.stroke();

        // 注がれる豆乳の筋
        if (tilt > 0.15) {
            ctx.fillStyle = "#ffffff";
            ctx.beginPath();
            ctx.moveTo(22, 2);
            ctx.quadraticCurveTo(56, 28, 62, 118);
            ctx.lineTo(48, 118);
            ctx.quadraticCurveTo(44, 34, 18, 12);
            ctx.closePath();
            ctx.fill();
        }
        ctx.restore();
    }

    function drawNigariBottle(ctx, x, y, dropOffset) {
        ctx.save();
        ctx.translate(x, y + dropOffset * 24);
        ctx.rotate(-0.45);

        // ガラス小瓶（にがり）
        ctx.fillStyle = "rgba(225, 245, 254, 0.9)";
        ctx.strokeStyle = "#0277bd";
        ctx.lineWidth = 3;
        ctx.beginPath(); ctx.roundRect(-22, -45, 44, 72, 12); ctx.fill(); ctx.stroke();

        // 中のにがり液
        ctx.fillStyle = "rgba(129, 212, 250, 0.65)";
        ctx.beginPath(); ctx.roundRect(-18, -12, 36, 35, 8); ctx.fill();

        // 瓶の口
        ctx.fillStyle = "#b3e5fc";
        ctx.fillRect(-9, 27, 18, 14);
        ctx.strokeRect(-9, 27, 18, 14);

        // ラベル
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(-15, -26, 30, 22);
        ctx.fillStyle = "#01579b";
        ctx.font = "bold 10px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("にがり", 0, -11);

        ctx.restore();
    }

    function drawHiddenTofuPC(ctx, x, y, isOn, bounce) {
        ctx.save();
        ctx.translate(x, y - bounce * 8);
        ctx.scale(0.45, 0.45);
        ctx.fillStyle = "#b0a792"; ctx.fillRect(-58, 72, 116, 10);
        ctx.fillStyle = "#5c564c"; ctx.fillRect(-50, 0, 100, 68);
        ctx.fillStyle = isOn ? "#fcfaf2" : "#2b2b2b";
        ctx.fillRect(-45, 5, 90, 56);
        if (isOn) {
            ctx.fillStyle = "#4a4a4a"; ctx.font = "bold 11px sans-serif"; ctx.textAlign = "center";
            ctx.fillText("とうふ", 0, 26);
            ctx.fillStyle = "#e9d7a5"; ctx.fillRect(-25, 34, 50, 4);
        }
        ctx.restore();
    }
    window.RIZUMU_GAMES["1-3"].draw = function(ctx, canvas) {
        ctx.save();
        ctx.scale(canvas.width / 940, canvas.height / 520);
        ctx.clearRect(0, 0, 940, 520);

        // ★ 1. 『はたらくまんじゅう』オマージュ静止アイキャッチ（動きなし・音とロゴで魅せる）
        if (phase === 'eyecatch') {
            // 濃いチャコールグレーの横縞テクスチャ背景
            ctx.fillStyle = "#484848";
            ctx.fillRect(0, 0, 940, 520);
            ctx.fillStyle = "rgba(255, 255, 255, 0.03)";
            for (let y = 0; y < 520; y += 6) {
                ctx.fillRect(0, y, 940, 2);
            }

            // 中央に「にがり打ち」の丸文字＋絡み合う白いリボンライン（完全静止）
            ctx.save();
            ctx.translate(470, 260);

            // 背景をくねる太いリボンライン
            ctx.strokeStyle = "#b0b0b0";
            ctx.lineWidth = 14;
            ctx.lineCap = "round";
            ctx.beginPath();
            ctx.moveTo(-250, -35);
            ctx.bezierCurveTo(-130, -90, -20, 45, 95, -40);
            ctx.bezierCurveTo(175, -95, 235, 30, 265, -25);
            ctx.stroke();

            ctx.strokeStyle = "#efefef";
            ctx.lineWidth = 12;
            ctx.beginPath();
            ctx.moveTo(-235, 42);
            ctx.bezierCurveTo(-110, 15, 10, 95, 125, 25);
            ctx.bezierCurveTo(195, -15, 240, 65, 275, 40);
            ctx.stroke();

            // 白とライトグレーが交互に並ぶ丸文字「に が り 打 ち」
            const chars = new Array(
                { ch: "に", x: -185, y: 8,  col: "#f5f5f5", size: 84 },
                { ch: "が", x: -92,  y: 14, col: "#bdbdbd", size: 82 },
                { ch: "り", x: -2,   y: 6,  col: "#f5f5f5", size: 86 },
                { ch: "打", x: 92,   y: 12, col: "#bdbdbd", size: 84 },
                { ch: "ち", x: 185,  y: 8,  col: "#f5f5f5", size: 84 }
            );
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            chars.forEach(item => {
                ctx.font = `900 ${item.size}px 'Hiragino Maru Gothic ProN', 'Hiragino Kaku Gothic ProN', sans-serif`;
                ctx.lineWidth = 10;
                ctx.strokeStyle = "#333333";
                ctx.strokeText(item.ch, item.x, item.y);
                ctx.fillStyle = item.col;
                ctx.fillText(item.ch, item.x, item.y);
            });

            // ラインの上下にちょこんと乗る可愛い豆・豆腐の顔アイコン（静止）
            const faces = new Array({ x: -135, y: -56, r: 22 }, { x: 52, y: 66, r: 17 });
            faces.forEach(fc => {
                ctx.fillStyle = "#ffffff";
                ctx.strokeStyle = "#333333";
                ctx.lineWidth = 3;
                ctx.beginPath(); ctx.ellipse(fc.x, fc.y, fc.r * 1.15, fc.r * 0.9, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
                ctx.fillStyle = "#333333";
                ctx.beginPath(); ctx.arc(fc.x - fc.r * 0.35, fc.y - 2, 2.5, 0, Math.PI * 2); ctx.fill();
                ctx.beginPath(); ctx.arc(fc.x + fc.r * 0.35, fc.y - 2, 2.5, 0, Math.PI * 2); ctx.fill();
                ctx.strokeStyle = "#333333";
                ctx.lineWidth = 2;
                ctx.beginPath(); ctx.arc(fc.x, fc.y + 2, fc.r * 0.45, 0.15 * Math.PI, 0.85 * Math.PI); ctx.stroke();
            });

            ctx.restore();

            // 右下に「[m]でポーズ」がゆっくり現れる
            if (stateTimer >= 1.15) {
                let fadeAlpha = Math.min(1, (stateTimer - 1.15) / 0.85);
                ctx.save();
                ctx.globalAlpha = fadeAlpha;
                ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
                ctx.strokeStyle = "#333333";
                ctx.lineWidth = 2;
                ctx.beginPath(); ctx.roundRect(755, 466, 162, 36, 18); ctx.fill(); ctx.stroke();
                ctx.fillStyle = "#333333";
                ctx.font = "bold 15px sans-serif";
                ctx.textAlign = "center";
                ctx.fillText("[m]でポーズ", 836, 489);
                ctx.restore();
            }

            ctx.restore();
            return;
        }
        if (phase === 'res_step1' || phase === 'res_step2' || phase === 'res_step3' || phase === 'res_card') {
            ctx.fillStyle = "#0a0a0a"; ctx.fillRect(0, 0, 940, 520);

            if (phase === 'res_step1' || phase === 'res_step2' || phase === 'res_step3') {
                ctx.fillStyle = "#ffffff";
                ctx.beginPath(); ctx.roundRect(65, 52, 260, 44, 22); ctx.fill();
                ctx.fillStyle = "#111111"; ctx.font = "bold 19px sans-serif"; ctx.textAlign = "center";
                ctx.fillText("にがりの達人より", 195, 81);

                if (phase === 'res_step2' || phase === 'res_step3') {
                    ctx.textAlign = "left";
                    if (isPerfectClear) {
                        ctx.fillStyle = "#ffd54f"; ctx.font = "bold 17px sans-serif";
                        ctx.fillText("しかもパーフェクト", 250, 185);
                    }
                    ctx.fillStyle = "#ffffff"; ctx.font = "bold 25px sans-serif";
                    if (finalRankVal === 0) {
                        ctx.fillText("にがりのタイミングがバラバラだ。", 250, 235);
                        ctx.fillText("これではうまく固まらないぞ。", 250, 278);
                    } else if (finalRankVal === 1) {
                        ctx.fillText("まずまずの打ち込みだったな。", 250, 225);
                        ctx.fillText("裏拍をもっと感じてみよう。", 250, 268);
                    } else {
                        ctx.fillText("見事なにがり打ちだった！", 250, 215);
                        ctx.fillText("ぷるぷるの極上絹ごしになるぞ。", 250, 258);
                        ctx.fillText("達人の領域に近づいたな！", 250, 301);
                    }
                }

                if (phase === 'res_step3') {
                    ctx.save(); ctx.translate(765, 415);
                    let rankLabel = (finalRankVal === 0) ? "やり直し" : (finalRankVal === 1) ? "普通" : "豆腐";
                    let mainCol   = (finalRankVal === 0) ? "#90a4ae" : (finalRankVal === 1) ? "#81c784" : "#ffca28";
                    let subBadge  = isPerfectClear ? "パーフェクト！" : (finalRankVal === 2) ? "最高の仕上がり！" : (finalRankVal === 1) ? "打ち込み完了！" : "もう一度挑戦！";

                    if (finalRankVal >= 2) {
                        ctx.fillStyle = "#ffffff";
                        new Array({ x: -115, y: -25, r: 22 }, { x: 115, y: 10, r: 18 }, { x: 75, y: -38, r: 14 }).forEach(st => {
                            ctx.beginPath();
                            for (let i = 0; i < 8; i++) {
                                let rad = (i % 2 === 0) ? st.r : st.r * 0.3;
                                let a = (i / 8) * Math.PI * 2;
                                ctx.lineTo(st.x + Math.cos(a) * rad, st.y + Math.sin(a) * rad);
                            }
                            ctx.closePath(); ctx.fill();
                        });
                    }

                    ctx.save(); ctx.transform(1, 0, -0.18, 1, 0, 0);
                    ctx.font = "900 58px sans-serif"; ctx.textAlign = "center";
                    ctx.lineWidth = 10; ctx.strokeStyle = "#3e2723"; ctx.strokeText(rankLabel, 0, 0);
                    ctx.fillStyle = mainCol; ctx.fillText(rankLabel, 0, 0);
                    ctx.restore();

                    ctx.fillStyle = (finalRankVal === 0) ? "#546e7a" : "#ffb300";
                    ctx.beginPath(); ctx.roundRect(-105, 18, 210, 28, 14); ctx.fill();
                    ctx.fillStyle = (finalRankVal === 0) ? "#ffffff" : "#212121";
                    ctx.font = "bold 15px sans-serif"; ctx.textAlign = "center";
                    ctx.fillText(subBadge, 0, 37);
                    ctx.restore();
                }

                ctx.fillStyle = "#777777"; ctx.font = "13px sans-serif"; ctx.textAlign = "left";
                ctx.fillText("クリック / [Space] で次へ", 65, 475);
            } else {
                ctx.save(); ctx.translate(470, 230);
                if (finalRankVal === 0) {
                    drawNigariBottle(ctx, 0, -10, 0);
                    ctx.strokeStyle = "#90a4ae"; ctx.lineWidth = 3;
                    ctx.beginPath(); ctx.moveTo(-40, 40); ctx.lineTo(40, 40); ctx.stroke();
                } else if (finalRankVal === 1) {
                    drawSoyMilkTub(ctx, 0, -25, new Array());
                } else {
                    drawSoyMilkTub(ctx, 0, -25, new Array({ x: 0, y: -22, r: 95, maxR: 120, alpha: 0.9, color: "#ffd54f" }));
                    ctx.strokeStyle = "#ffd54f"; ctx.lineWidth = 3;
                    for (let i = 0; i < 8; i++) {
                        let a = (i / 8) * Math.PI * 2;
                        ctx.beginPath(); ctx.moveTo(Math.cos(a) * 110, Math.sin(a) * 55 - 10);
                        ctx.lineTo(Math.cos(a) * 145, Math.sin(a) * 75 - 10); ctx.stroke();
                    }
                }
                ctx.restore();

                ctx.fillStyle = "#ffffff"; ctx.font = "bold 30px sans-serif"; ctx.textAlign = "center";
                let caption = (finalRankVal === 0) ? "焦らず裏拍を待つのだ。"
                            : (finalRankVal === 1) ? "いい波紋が出てきたな。"
                            : "神業のにがり打ち！";
                ctx.fillText(caption, 470, 365);

                ctx.fillStyle = "#777777"; ctx.font = "13px sans-serif";
                ctx.fillText("クリック / [Space] で戻る", 470, 465);
            }
            ctx.restore();
            return;
        }
        // ★ 3. プレイ画面（穏やかな和風豆腐工房）
        ctx.fillStyle = "#ede6d3";
        ctx.fillRect(0, 0, 940, 350);
        ctx.fillStyle = "#d9ceb2";
        ctx.fillRect(0, 350, 940, 170);

        // 奥の隠れ豆腐パソコン
        drawHiddenTofuPC(ctx, 470, 86, pcOn, pcBounce);

        // 中央の大きな豆乳桶
        drawSoyMilkTub(ctx, 470, 315, ripples);

        // 落下中のにがり水滴
        drops.forEach(dr => {
            ctx.save();
            ctx.fillStyle = dr.isGold ? "#ffca28" : "#29b6f6";
            ctx.beginPath();
            ctx.arc(dr.x, dr.y, dr.big ? 11 : 6, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        });

        // 左側の豆乳柄杓（表拍で傾いて豆乳を注ぐ）
        drawSoyLadle(ctx, 355, 205, ladleTilt);

        // 右側のにがり小瓶（裏拍で押し下げてにがりを打ち込む）
        drawNigariBottle(ctx, 565, 175, bottleDrop);

        if (phase === 'practice') {
            ctx.fillStyle = "rgba(255, 255, 255, 0.92)";
            ctx.strokeStyle = "#b8b2a0"; ctx.lineWidth = 2.5;
            ctx.beginPath(); ctx.roundRect(120, 16, 635, 44, 22); ctx.fill(); ctx.stroke();

            ctx.fillStyle = "#4a4a4a"; ctx.font = "bold 14.5px sans-serif"; ctx.textAlign = "center";
            let statusText = isDemoMode ? "【お手本実演中】" : `成功：${pracSuccessCount} / 3`;
            ctx.fillText(`${PRACTICE_MODES.at(pracTypeIdx).label}　${statusText}`, 437, 44);

            // 右上：お手本 / 練習に戻るボタン
            ctx.fillStyle = isDemoMode ? "#ffb300" : "#ffffff";
            ctx.strokeStyle = "#8c6d23"; ctx.lineWidth = 2.5;
            ctx.beginPath(); ctx.roundRect(775, 16, 140, 44, 22); ctx.fill(); ctx.stroke();
            ctx.fillStyle = isDemoMode ? "#212121" : "#8c6d23";
            ctx.font = "bold 14px sans-serif";
            ctx.fillText(isDemoMode ? "練習に戻る" : "お手本 (D)", 845, 43);

            // 左下：「[s]でスキップ」表示
            ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
            ctx.strokeStyle = "#8c6d23"; ctx.lineWidth = 2;
            ctx.beginPath(); ctx.roundRect(18, 468, 165, 38, 19); ctx.fill(); ctx.stroke();
            ctx.fillStyle = "#5d4037"; ctx.font = "bold 15px sans-serif";
            ctx.fillText("[s]でスキップ", 100, 492);
            ctx.textAlign = "left";
        }

        // ★ ポーズ画面オーバーレイ（画面中央・選択中の項目を少し大きく強調）
        if (isPaused) {
            ctx.fillStyle = "rgba(0, 0, 0, 0.58)";
            ctx.fillRect(0, 0, 940, 520);

            ctx.fillStyle = "#fcfaf2";
            ctx.strokeStyle = "#4a4a4a";
            ctx.lineWidth = 4;
            ctx.beginPath(); ctx.roundRect(300, 125, 340, 275, 24); ctx.fill(); ctx.stroke();

            ctx.fillStyle = "#4a4a4a";
            ctx.font = "900 24px sans-serif";
            ctx.textAlign = "center";
            ctx.fillText("PAUSE", 470, 172);

            const menuItems = new Array("再開する", "最初からやり直す", "やめる");
            menuItems.forEach((label, idx) => {
                let y = 232 + idx * 58;
                let selected = (idx === pauseMenuIdx);
                if (selected) {
                    ctx.fillStyle = "rgba(255, 202, 40, 0.25)";
                    ctx.beginPath(); ctx.roundRect(330, y - 26, 280, 44, 14); ctx.fill();
                    ctx.fillStyle = "#d97706";
                    ctx.font = "900 26px sans-serif";
                    ctx.fillText("▶ " + label, 470, y + 4);
                } else {
                    ctx.fillStyle = "#6e6657";
                    ctx.font = "bold 19px sans-serif";
                    ctx.fillText(label, 470, y + 2);
                }
            });
            ctx.textAlign = "left";
        }

        if (phase === 'fade_to_prod' || phase === 'fade_to_res') {
            let alpha = Math.min(1, stateTimer / 0.7);
            ctx.fillStyle = `rgba(17, 17, 17, ${alpha})`;
            ctx.fillRect(0, 0, 940, 520);
        }

        ctx.restore();
    };
})();
