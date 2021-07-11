# ETOOS

<h1> ETOOS Daily Test Managing System</h1>
<h3>bug list</h3>
<ul>
  <li> 1. 1주차 1페이지 extract_Table 진행 안함</li>
                // - 간헐적 오류인듯
                // waitForTimeout 줘서 해결

                // 2. 1주차 11번 페이지에서 extract_Table 후 이런 경고가 뜸
                //(node:39295) UnhandledPromiseRejectionWarning: ReferenceError: document is not defined
                // 미해결

                // 3. 1주차 1페이지 extract_Table 후 오류 코드 

                // (node:39577) UnhandledPromiseRejectionWarning: Error: No node found for selector: #records_form > div > img:nth-child(5)
                // 미확인

                // 4. TimeoutError: waiting for selector `#ui-datepicker-div > table > tbody > tr:nth-child(2) > td:nth-child(4) > a` failed: timeout 30000ms exceeded

                // 5. 주차별 1page 만 탐색하고 다음 주차로 넘어가는 오류 발생
  </ul>
