(function () {
  'use strict';
  const CHO = [
    'ㄱ',
    'ㄲ',
    'ㄴ',
    'ㄷ',
    'ㄸ',
    'ㄹ',
    'ㅁ',
    'ㅂ',
    'ㅃ',
    'ㅅ',
    'ㅆ',
    'ㅇ',
    'ㅈ',
    'ㅉ',
    'ㅊ',
    'ㅋ',
    'ㅌ',
    'ㅍ',
    'ㅎ',
  ];
  const JUNG = [
    'ㅏ',
    'ㅐ',
    'ㅑ',
    'ㅒ',
    'ㅓ',
    'ㅔ',
    'ㅕ',
    'ㅖ',
    'ㅗ',
    'ㅘ',
    'ㅙ',
    'ㅚ',
    'ㅛ',
    'ㅜ',
    'ㅝ',
    'ㅞ',
    'ㅟ',
    'ㅠ',
    'ㅡ',
    'ㅢ',
    'ㅣ',
  ];
  const JONG = [
    '',
    'ㄱ',
    'ㄲ',
    'ㄳ',
    'ㄴ',
    'ㄵ',
    'ㄶ',
    'ㄷ',
    'ㄹ',
    'ㄺ',
    'ㄻ',
    'ㄼ',
    'ㄽ',
    'ㄾ',
    'ㄿ',
    'ㅀ',
    'ㅁ',
    'ㅂ',
    'ㅄ',
    'ㅅ',
    'ㅆ',
    'ㅇ',
    'ㅈ',
    'ㅊ',
    'ㅋ',
    'ㅌ',
    'ㅍ',
    'ㅎ',
  ];
  const HANGUL_OFFSET = 44032; // 0xac00;
  const HANGUL_LAST = 55203;

  function split(text) {
    const result = [...text].map((value, i) => {
      const dividedStr = [];

      const code = text.charCodeAt(i);
      if (code < HANGUL_OFFSET || code > HANGUL_LAST) {
        return text.charAt(i);
      }

      const index = code - HANGUL_OFFSET;
      const jongseong = index % 28;
      const jungseong = ((index - jongseong) / 28) % 21;
      const choseong = ((index - jongseong) / 28 - jungseong) / 21;

      dividedStr.push(CHO[choseong]);
      dividedStr.push(JUNG[jungseong]);

      if (jongseong === 0) {
        dividedStr.push('');
      } else {
        dividedStr.push(JONG[jongseong]);
      }

      const combined = dividedStr.reduce((acc, value, index) => {
        // 초성
        if (index === 0) {
          acc.push(value);
          return acc;
        }

        // 초성 + 중성
        if (index === 1) {
          acc.push(
            String.fromCharCode(HANGUL_OFFSET + choseong * 588 + jungseong * 28)
          );

          return acc;
        }

        // 초성 + 중성 + 종성
        if (index === 2) {
          if (value === '') {
            acc.push(value);
          } else {
            acc.push(
              String.fromCharCode(
                HANGUL_OFFSET + choseong * 588 + jungseong * 28 + jongseong
              )
            );
          }
          return acc;
        }
      }, []);

      return combined;
    });

    return result;
  }

  function waitForMs(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function typing(element, text, speed) {
    const splittedText = split(text);
    let remain = '';
    for (let i = 0; i < splittedText.length; i++) {
      const charSet = splittedText[i];
      for (let j = 0; j < charSet.length; j++) {
        const char = charSet[j];
        if (!char) continue;
        element.innerText = remain + char;
        await waitForMs(speed);
      }
      // 한글은 조합문자이기 때문에 '각' 이라면 [ㄱ, 가, 각]. '사' 라면 [ㅅ, 사, ''] 로 출력됨
      // 따라서 lastChar가 없다면 1번째 index의 문자를 가져와서 remain
      const lastChar = charSet[charSet.length - 1];
      if (lastChar) {
        remain += lastChar;
      } else {
        remain += charSet[1];
      }
    }
  }

  const hangulTyping = {
    split: split,
    typing: typing,
  };

  if (typeof define == 'function' && define.amd) {
    define(function () {
      return hangulTyping;
    });
  } else if (typeof module !== 'undefined') {
    module.exports = hangulTyping;
  } else {
    window.HangulTyping = hangulTyping;
  }
})();
