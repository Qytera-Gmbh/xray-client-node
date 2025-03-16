export interface TestStatus {
  /**
   * @example "#95C160"
   */
  color: string;
  /**
   * @example "The test run/iteration has passed"
   */
  description: string;
  /**
   * @example true
   */
  final: boolean;
  /**
   * @example 0
   */
  id: number;
  /**
   * @example "PASS"
   */
  name: string;
  /**
   * @example 0
   */
  rank: number;
  /**
   * @example "OK"
   */
  requirementStatusName: string;
}

export interface TestStepStatus {
  /**
   * @example "#95C160"
   */
  color: string;
  /**
   * @example "The test step has passed"
   */
  description: string;
  /**
   * @example 0
   */
  id: number;
  /**
   * @example "PASS"
   */
  name: string;
  /**
   * @example 0
   */
  rank: number;
  /**
   * @example 0
   */
  testStatusId: number;
}
