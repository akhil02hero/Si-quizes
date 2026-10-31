export interface PracticeChapter {
  /** Two-digit chapter number in the book, e.g. '04'. */
  id: string;
  name: string;
  questionCount: number;
}

/** One subject book, e.g. Biology. */
export interface PracticeCategory {
  id: string;
  name: string;
  chapters: readonly PracticeChapter[];
}

/** One test inside a chapter: a run of at most TEST_SIZE questions. */
export interface PracticeTestInfo {
  /** 1-based test number within the chapter. */
  number: number;
  /** Positions of its first and last question in the chapter, 1-based. */
  from: number;
  to: number;
  questionCount: number;
  seconds: number;
}
