---
title: 'Modern Music: A Listener’s Guide'
date: 2026-05-06 14:00:00
categories:
  - Audio
tags:
  - audio
  - listening
  - peaq
  - formats
  - streaming
hero: /images/modern-music-listeners-guide-hero.webp
hero_title: 'CDs and cassettes on a white shelf, with a foreground stack of jewel cases—author photograph'
hero_alt: 'A white wooden shelf with a stack of three CD jewel cases in the foreground, a row of album spines behind them, and a column of cassette tapes in clear cases on the left—personal music media collection.'
hero_width: 1024
hero_height: 771
excerpt: >-
  The modern landscape for listening to music is rich with peaks and valleys. This guide is intended to help you navigate it. Starting from an artist's master recording, how much of that sound actually makes it to you—and how much do you lose along the way? We intend to answer that question. But first we need a way to quantify it. Let's introduce PEAQ.
---

## The Problem

The modern landscape for listening to music is rich with peaks and valleys. This guide is intended to help you navigate it. Starting from an artist's master recording, how much of that sound actually makes it to you—and how much do you lose along the way? We intend to answer that question. But first we need a way to quantify it. Let's introduce PEAQ.

## What is PEAQ?

**PEAQ** (*Perceptual Evaluation of Audio Quality*) is a standardized objective metric defined in **[ITU-R BS.1387](https://www.itu.int/rec/R-REC-BS.1387)**. It compares a **test** signal with a **reference** signal and predicts what listeners would report on a **difference grade** scale. The headline output most engineers reach for is the **Objective Difference Grade (ODG)**.

| ODG (approx.) | Everyday meaning |
| ---: | --- |
| **0.0** | **Imperceptible** difference from the reference |
| **−1.0** | **Perceptible**, usually **not annoying** |
| **−2.0** | **Slightly annoying** impairment |
| **−3.0** | **Annoying** |
| **−4.0** | **Very annoying** |

The reason that I chose PEAQ over something like data loss is that compression algorithms are pretty fantastic about reducing the size of the data without a loss in quality. Some of that has to do with the limitations of the human ear and frequencies we can't even hear, but some of it is psychoacoustics and how the brain processes sound. We know enough about what we won't perceive anyway, so we drop that bit.

---

## Physical media

With our new unit of measure, let's look at physical media.

| Medium | Typical ODG vs high-res digital ref | What swings the number hardest |
| --- | --- | --- |
| **Master tape** (studio reproduction) | **−0.1 to −0.6** | Tape speed, head wear, print-through, noise reduction |
| **CD** (Red Book playback) | **0.0 to −0.2** | Mastering chain, jitter mythology vs real boundary problems, rip accuracy |
| **Vinyl** | **−0.4 to −2.0** | Pressing, tracing, inner groove, surface |
| **Cassette** | **−1.0 to −3.0** | Tape type (Fe/Metal), Dolby calibration, azimuth, wow/flutter |
| **8-track** | **−2.5 to −3.8** | Head alignment, pad pressure, splice noise, scrape flutter |

### Insight: CDs are underrated

CDs are king of accurate reproduction in physical media because they add zero noise. They also have better dynamics and no channel bleed. If you want high accuracy media, you want a CD. That isn't to diminish the cycles of popularity with older media, but you have to acknowledge the baseline noise added by your media of choice.

---

## Digital files: lossless and common lossy encoders

What about digital files? 

| Format | Class | Typical stereo music preset | ODG vs **same** lossless ref | Notes |
| --- | --- | --- | --- | --- |
| **WAV** / **AIFF** / **FLAC** / **ALAC** / **WavPack** (lossless) | Lossless | any **44.1** or **48 kHz** master | **≈ 0.0** | Identity path when reference = that master’s PCM **before** encode (**[BS.1387](https://www.itu.int/rec/R-REC-BS.1387)**); **WavPack hybrid** adds a **separate** correction sidecar—still lossless when used as intended |
| **AAC** | Lossy | **~256 kb/s** class (e.g. TV / store “high”) | **−0.2 to −0.8** | PEAQ is widely used for **AAC** family planning; see **[Ulovec & Smutny 2018](https://www.radioeng.cz/fulltexts/2018/18_01_0342_0352.pdf)** for **broadcast** AAC/MP2 vs bitrate |
| **AAC** | Lossy | **~128 kb/s** class | **−1.0 to −2.0** | Same caveat: **codec profile** (**LC** vs **HE**) dominates as much as nominal bitrate |
| **MP3** | Lossy | **~320 kb/s** (**CBR** or **V0**) | **−0.2 to −0.8** | Same paper applies **PEAQ** to **MPEG** coders in a **defined** test harness—not every **LAME** build |
| **MP3** | Lossy | **~128 kb/s** | **−1.0 to −2.5** | **Pre-echo** and **HF** roughness usually show first |
| **Vorbis** | Lossy | **-q** / bitrate ladder on **44.1 kHz** | **−0.4 to −2.0** | **Container** name matters less than **encoder** **preset** |
| **Opus** | Lossy | **48 kHz** path (typical) | **−0.5 to −2.5** | Speech-optimized modes vs **music** change the error spectrum; **[Duong & Springer 2025](https://arxiv.org/abs/2511.11527)** surveys codecs with **PEAQ-style** scores |

### Insight: Lossless is an amazing digital copy

If you are buying digital media, make sure it's lossless—why pay for a degraded format? If you are backing up your music collection, back up to lossless.

---

## Streaming and radio

Now let’s look at **on-demand streaming** and **over-the-air radio**—terrestrial and satellite—before the signal reaches your **DAC** or **headphone** output.

| Service | Tier (illustrative) | Codec / format | Typical bitrate or resolution | Typical ODG vs lossless ref | Notes |
| --- | --- | --- | --- | --- | --- |
| **Tidal** | **HiFi (lossless)** | **FLAC** | **CD-quality** and **hi-res** where offered | **~0.0** | **Hi-Res** catalog **subset**; **hardware** limits apply |
| **Apple Music** | **Lossless** | **ALAC** | **16/44.1**–**24/192** (title-dependent) | **~0.0** | **ODG ≈ 0** only when the **path** stays **lossless** to the DAC—**not** over typical **Bluetooth** |
| **Amazon Music** | **HD** | **FLAC** (lossless) | **CD-quality** (~**16/44.1**) | **~0.0** | Requires **subscription plan** and **device** support |
| **Amazon Music** | **Ultra HD** | **FLAC** (lossless) | up to **24/192** (title-dependent) | **~0.0** | **Not** all titles; **playback** may **downsample** silently |
| **Spotify** | **Lossless** (**Premium**; **region** / **app**-dependent) | **FLAC** | **up to ~24-bit / 44.1 kHz** ([Spotify — Audio quality](https://support.spotify.com/us/article/audio-quality/)) | **~0.0** | Distinct from the **Vorbis** path below |
| **Apple Music** | **High Quality** (lossy default in many clients) | **AAC** | **~256 kb/s** | **−0.2 to −0.8** | **Lossless / Hi-Res Lossless** tiers exist when enabled |
| **Spotify** | **Low** through **Very High** (lossy ladder) | **OGG Vorbis** | **~24 kb/s** (Low / data saver) **→ ~320 kb/s** (Very High) | **−0.3 to −3.5** (setting-dependent) | **High ~160**, **Normal ~96**; **Free** vs **Premium** **caps** differ by **platform**—see **[Audio quality](https://support.spotify.com/us/article/audio-quality/)** |
| **Amazon Music** | **Standard / Best Available** (lossy path) | Often **AAC-class** in **mobile** clients | **~256 kb/s** (order-of-magnitude) | **−0.3 to −2.0** | **Wording** in-app (**SD / HD / Ultra HD**) **differs** by **market** |
| **Tidal** | **Normal** (lossy) | **AAC** (typical **mobile / web** ladder) | **~96–320 kb/s** class | **−0.4 to −2.0** | Exact **labels** (**Max** / **HiFi**) **shift** with **rebranding** |
| **FM radio** (terrestrial analog) | **Stereo**, listenable **RF** | **Analog FM** + **MPX** decode in tuner | **~50 Hz–15 kHz** class (service & tuner dependent) | **−0.4 to −2.0** | **Multipath**, **pilot** noise, **preemphasis**; **HD Radio** **digital** sidebands (where supported) replace part of the analog budget—still **lossy** vs studio master |
| **AM radio** (terrestrial analog) | Typical **regional** broadcast | **Amplitude modulation** | **~4.5–7.5 kHz** audio **bandwidth** class | **−1.2 to −3.5** | **Narrow** **bandwidth**, **electrical** **noise**, **nighttime** **skywave**; music **never** the **format’s** strength |
| **SiriusXM** | **Music** channels (illustrative) | **Satellite** / **IP** delivery, **AAC**-class **codec** (proprietary chain) | Order-of **~32**–**~256 kb/s** **class** by **era** and **channel** | **−0.6 to −2.5** | **Talk** / **traffic** **channels** often **run** **lower** **music** **rates**; **360L** / **app** vs **legacy** **radio** **HW** **can** **change** the **decode** path |

### Insight: Normalization is the sneaky second algorithm

This isn't all that your streaming service is doing. They typically have options to "normalize" sound. Read up on what your service is doing or try the settings yourself to see what sounds best.

---

## Computers and phones: built-in DACs

DAC stands for **digital-to-analog converter**.

After the stream is decoded, **something** still has to turn **PCM into voltage**. On laptops and phones that is usually a **combo codec** (DAC + headphone amp) and, on computers, often a **shared mixer**, **volume DSP**, and **driver resampler** before the chip ever sees audio. 

| Platform | What this row assumes | Typical ODG vs lab USB DAC | Why it lands there |
| --- | --- | --- | --- |
| **macOS** | Recent Apple laptop **3.5 mm** combo jack, or Mac desktop line-out class | **0.0 to −0.5** | Predictable CoreAudio routing; often clean enough that the codec chain upstream matters more |
| **iOS** | **iPad** (or rare legacy hardware) with **onboard 3.5 mm**—not Apple adapters; **iPhone → Connectors** | **0.0 to −0.4** | Apple’s **jack** implementations usually measure well; most current **iPhones** skip this row |
| **Windows** | Mass-market **Windows 11** laptop **3.5 mm** output | **−0.2 to −1.0** | Vendor DSP, “smart audio,” and Realtek stacks; ground and GPU leakage vary wildly by SKU |
| **Android** | Mid-range handset with **built-in 3.5 mm** (exclude **USB-C** audio gadgets; those live under **Connectors**) | **−0.3 to −1.2** | Highest variance: tuned flagships beat this band; cheap carrier phones often worse |

### Insight: Know your DAC

If you already own devices, **look up** how **your** DAC **measures**. If you care about music playback and you're shopping for something new, you can read reviews on which devices to avoid based on poor audio performance.

---

## Connectors

But wait there is more. We still have potentially more hurdles before we have sound!  

| Path | Dominant impairment | Typical ODG band | Honest caveat |
| --- | --- | --- | --- |
| **USB Audio Class** to **decent** **DAC** | Often **limited by** Windows mixer / Android resampling unless exclusive | **0.0 to −0.4** | Policy beats cable mythology |
| **Wi-Fi streaming** to a **renderer** (**AirPlay**, **Chromecast / Cast**, **DLNA**, **Roon** **Ready** endpoint, vendor hi-fi bridges) | **SDK** resampling, **buffer** **underruns**, **receiver** **DSP**, **proprietary** **wrappers** that **re-encode** | **0.0 to −0.8** vs **local** **lossless** when the **path** is **documented** **bit-transparent** | **“** **On** **Wi-Fi** **”** **≠** **automatic** **lossless**—check **Connect**/**AirPlay** **mode** **and** **what** **the** **box** **actually** **decodes** |
| **3.5 mm analog** (phone or DAP headphone jack) | **DAC + amp** noise floor, **IMD** at high load | **0.0 to −0.6** | Phone jacks vary **wildly**; **volume** matters |
| **USB-C digital headset / USB-C → 3.5 dongle** | **Budget** DAC filter images, **USB** packet jitter debates, **power** noise | **0.0 to −0.8** | Many dongles are **fine**; some are **squeaky** on efficient IEMs |
| **Bluetooth Classic audio** | **Mandatory** codec (SBC baseline; AAC/aptX/**LC3**/LDAC variants) | **−0.5 to −2.5** vs wired phone reference | **Second** codec after streaming—**watch the cascade** |

### Insight: The connector is rarely the villain—but Bluetooth often is

The convenience of Bluetooth comes at a serious audio cost. If your have ability to send sound over usb / usbc vs bluetooth you can prevent how much noise is introduced.

---

## True wireless earbuds

Let's look at the oh so popular ear buds.

| Earbuds (class / generation) | Typical Bluetooth path | Typical ODG vs quiet-room wired reference | Notes |
| --- | --- | --- | --- |
| **Sony WF-1000XM5** | **SBC** / **AAC** / **LDAC** (Classic); **LC3** (**LE** **Audio**) per **Sony** **help** | **−0.35 to −1.0** | **No** **aptX** **family** **on** **Sony’s** **published** **codec** **list** **for** **this** **model**; **LDAC** needs **“** **Prioritize** **Sound** **Quality** **”** |
| **Samsung Galaxy Buds3 Pro** (or **Buds2 Pro**) | **Samsung Seamless Codec (SSC)** on **Galaxy** phones; **AAC** / **SBC** elsewhere | **−0.4 to −1.1** | **Samsung** **stack** **unlocks** **the** **widest** **codec** **here**; **other** **phones** **fall** **back** **to** **AAC** |
| **Apple AirPods Pro (2nd gen)** | **AAC** from **iPhone** | **−0.4 to −1.0** | **Strong** **ANC** + **H2** **DSP**; **seal** **and** **Personalized** **Spatial** **blur** **coupler** **predictions** |
| **Google Pixel Buds Pro** | **AAC** / **SBC** (**Google**/**review** **sources** **do** **not** **list** **aptX** **on** **original** **Pro**); **newer** **revisions** **may** **differ** | **−0.5 to −1.1** | **Codec** **ceiling** **is** **modest** **versus** **LDAC** **earbuds** on **some** **Android** **phones** |
| **Nothing Ear (2)** — *extra budget flagship* | **AAC** / **SBC** typical | **−0.6 to −1.3** | Useful **contrast**: **price** **tiers** **chase** **codec** **diversity** **before** **driver** **quality** |
| **Apple AirPods (open, non-Pro)** | **AAC** | **−0.6 to −1.4** | **Open** **fit** **=** **no** **isolation**; **“** **hi-fi** **”** **loses** **to** **coffee** **shop** **noise** **before** **ODG** **matters** |

### Insight: Earbuds are a Bluetooth chapter wearing a jewelry case

Sony WF-1000XM5 are the rock stars of wireless earbuds.

---

## After the amp: rooms, speakers, and vehicles

**PEAQ / BS.1387** compares a **test** signal to a **reference** under conditions the model was built for—typically **codec** or **electrical** paths **before** the **listening room** takes over. Put another way, it's not intended to measure how your environment affects what you are hearing. You just need to know that it does.

---

## Conclusions

What do we do with all this? It's clear that there are many options for a good listening experience. If you're not happy with your current setup, hopefully you got some ideas on how to improve it. 

---

## References

**Definitions (best primary sources)**

- ITU-R **BS.1387** — *Method for objective measurements of perceived audio quality* ([ITU](https://www.itu.int/rec/R-REC-BS.1387)). Defines PEAQ, MOVs, and **Objective Difference Grade (ODG)** mapped from perceptual features of **reference vs test** signals.
- ITU-R **BS.1116** — *Methods for subjective assessment of small impairments* ([ITU](https://www.itu.int/rec/R-REC-BS.1116)). **Subjective Difference Grade (SDG)** scale PEAQ’s mapping is trained to predict (see **[Delgado & Herre 2022](https://arxiv.org/abs/2212.01467)**).

**Secondary / explainer**

- Wikipedia — [Perceptual Evaluation of Audio Quality](https://en.wikipedia.org/wiki/Perceptual_Evaluation_of_Audio_Quality) — compact ODG ⇄ impairment wording (**verify** against your edition of **BS.1387**).

**PEAQ applied to coders and bitrates (peer-reviewed / preprint)**

- K. Ulovec & M. Smutny, “Perceived Audio Quality Analysis in Digital Audio Broadcasting Plus System Based on PEAQ,” *Radioengineering* 27(1), 2018 ([PDF](https://www.radioeng.cz/fulltexts/2018/18_01_0342_0352.pdf)). **PEAQ** on **AAC** (multiple profiles) and **MP2** vs **bitrate**, **mono/stereo**, **speech/music**—useful precedent for how **ODG** behaves in a **fixed** lab setup (DAB+ oriented).
- P. M. Delgado & J. Herre, “Can we still use PEAQ? A Performance Analysis of the ITU Standard for the Objective Assessment of Perceived Audio Quality,” arXiv:2212.01467, 2022 ([arXiv](https://arxiv.org/abs/2212.01467)). When **ODG** is reliable, when it **lags** **modern** codecs, and how the **ANN** mapping relates to **listening-test** data.
- T. T. Duong & J. P. Springer, “Evaluation of Audio Compression Codecs,” arXiv:2511.11527, 2025 ([arXiv](https://arxiv.org/abs/2511.11527)). Survey using **PEAQ** and variants across **traditional and ML** codecs.

**Streaming product facts (not PEAQ)**

- Spotify — [Audio quality](https://support.spotify.com/us/article/audio-quality/).
- Apple — [About lossless audio in Apple Music](https://support.apple.com/118295).

**Hero image**

- Author photograph (**foreground CD stack**, **spine row**, **cassettes** on a **white shelf**), local **WebP** **`/images/modern-music-listeners-guide-hero.webp`** (**1024×771**) for the post hero and Open Graph.

*Illustrative bands in the **physical media**, **streaming**/**radio**, **DAC**, **connector**, and **earbud** tables are not taken from a single published PEAQ matrix—run **your** captures (same reference, time alignment, validated PEAQ build) if you want citeable row values.*
