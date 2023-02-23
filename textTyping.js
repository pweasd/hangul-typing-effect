const HANGUL_OFFSET = 0xac00;
const CHOSEONG_START = 0x1100;
const JUNGSEONG_START = 0x1161;
const JONGSEONG_START = 0x11a8;
const HANGUL_LAST = 11172;

function splitKorean(text) {
  const result = [...text].map((value, i) => {
    const dividedStr = [];

    const code = text.charCodeAt(i);
    if (code < HANGUL_OFFSET || code > HANGUL_OFFSET + HANGUL_LAST) {
      return text.charAt(i);
    }

    const index = code - HANGUL_OFFSET;
    const jongseong = index % 28;
    const jungseong = ((index - jongseong) / 28) % 21;
    const choseong = ((index - jongseong) / 28 - jungseong) / 21;

    dividedStr.push(String.fromCharCode(CHOSEONG_START + choseong));
    dividedStr.push(String.fromCharCode(JUNGSEONG_START + jungseong));

    if (jongseong === 0) {
      dividedStr.push('');
    } else {
      dividedStr.push(String.fromCharCode(JONGSEONG_START + jongseong - 1));
    }

    const combined = dividedStr.reduce((acc, value, index, str) => {
      if (index === 0) {
        acc.push(value);
        return acc;
      }

      if (index === 1) {
        acc.push(
          String.fromCharCode(str[0].charCodeAt(0), value.charCodeAt(0))
        );
        return acc;
      }

      if (index === 2) {
        if (value === '') {
          acc.push(value);
        } else {
          acc.push(
            String.fromCharCode(
              str[0].charCodeAt(0),
              str[1].charCodeAt(0),
              value.charCodeAt(0)
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

export function waitForMs(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function textTyping(element, text, speed) {
  const splitText = splitKorean(text);
  let remain = '';
  for (let i = 0; i < splitText.length; i++) {
    const charSet = splitText[i];
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
