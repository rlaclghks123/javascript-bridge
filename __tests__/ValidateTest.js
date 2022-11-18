const Validate = require('../src/utils/Validate');

describe('예외 테스트', () => {
  test.each(['2', '0', '-3', '25'])('다리의 길이 예외 테스트', () => {
    expect((input) => {
      Validate.validateSizeRange(input);
    }).toThrow('[ERROR] 다리 길이는 3부터 20 사이의 숫자여야 합니다.');
  });

  test.each(['u', 'd', '3', '0', 'UU', 'dD'])('이동할 칸에 대한 입력값 예외 테스트', () => {
    expect((input) => {
      Validate.validateMovePosition(input);
    }).toThrow('[ERROR] 이동할 칸은 위 : U 또는 아래 : D인 문자로 입력해주세요.');
  });

  test.each(['r', 'q', '3', 'Rr', 'qQ', 'Q.', ' Q'])(
    '재시작 혹은 종료에 대한 입력값 예외 테스트',
    () => {
      expect((input) => {
        Validate.validateRetryOfQuit(input);
      }).toThrow('[ERROR] 재시도는 R, 종료는 Q인 문자로 입력해주세요.');
    }
  );

  describe('유효성 검사 통과 테스트', () => {
    test.each(['3', '6', '10', '16', '19', '20'])('다리의 길이 입력값 통과 테스트', (input) => {
      const result = Validate.validateSizeRange(input);
      expect(result).toBeTruthy();
    });

    test.each(['U', 'D'])('이동할 칸 입력값 통과 테스트', (input) => {
      const result = Validate.validateMovePosition(input);
      expect(result).toBeTruthy();
    });

    test.each(['R', 'Q'])('재시도 혹은 종료에 대한 입력값 통과 테스트', (input) => {
      const result = Validate.validateRetryOfQuit(input);
      expect(result).toBeTruthy();
    });
  });
});