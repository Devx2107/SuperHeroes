# React Bits adaptations

These effects are adapted from [React Bits](https://reactbits.dev/) by David Haz, using source revision [`310fc737fadcaa149a4e06fb088fc95332dc8bfb`](https://github.com/DavidHDev/react-bits/tree/310fc737fadcaa149a4e06fb088fc95332dc8bfb). The upstream license is preserved in [LICENSE.md](LICENSE.md).

- [Decrypted Text](https://github.com/DavidHDev/react-bits/blob/310fc737fadcaa149a4e06fb088fc95332dc8bfb/src/content/TextAnimations/DecryptedText/DecryptedText.jsx): bounded sequential character reveal and hover replay, with stable accessible text and reserved layout width.
- [Magnet](https://github.com/DavidHDev/react-bits/blob/310fc737fadcaa149a4e06fb088fc95332dc8bfb/src/content/Animations/Magnet/Magnet.jsx): pointer attraction with a fixed outer hit area, capped travel, and the existing Framer Motion spring engine.
- [Click Spark](https://github.com/DavidHDev/react-bits/blob/310fc737fadcaa149a4e06fb088fc95332dc8bfb/src/content/Animations/ClickSpark/ClickSpark.jsx): radial spark drawing and easing, integrated into the existing canvas with at most eight live bursts.
- [Glare Hover](https://github.com/DavidHDev/react-bits/blob/310fc737fadcaa149a4e06fb088fc95332dc8bfb/src/content/Animations/GlareHover/GlareHover.jsx): a diagonal light band, adapted to a CSS hover/focus sweep over the existing roster buttons.
- [Scroll Velocity](https://github.com/DavidHDev/react-bits/blob/310fc737fadcaa149a4e06fb088fc95332dc8bfb/src/content/TextAnimations/ScrollVelocity/ScrollVelocity.jsx): looping text driven by scroll velocity, with pause/resume, hover pause, visibility checks, and static reduced-motion rendering.

The adaptations use Legendrium's shared motion preferences, accents, typography, and installed dependencies. They are integrated application effects, not a standalone redistribution of the React Bits component library. No new npm packages are required.
