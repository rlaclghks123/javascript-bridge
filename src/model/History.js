class History {
  #tryCount;
  #moveTrace;

  constructor() {
    this.#tryCount = 1;
    this.#moveTrace = [];
  }

  getHistory() {
    return { tryCount: this.#tryCount, moveTrace: this.#moveTrace };
  }

  resetHistory() {
    this.#tryCount += 1;
    this.#moveTrace = [];
  }

  updateMoveTrace(direction, moveSuccess) {
    this.#moveTrace.push({ direction, moveSuccess });
    return this.#moveTrace;
  }
}

module.exports = History;
