// load-test.js
import http from "k6/http";
import { sleep, check } from "k6";

// --- Configuration ---
// This section defines the "shape" of your test.
// We'll ramp up to 100 users over a minute, stay there for a minute, then ramp down.
export const options = {
  stages: [
    { duration: "30s", target: 250 }, // Ramp up to 50 users over 30 seconds
    { duration: "1m", target: 500 }, // Ramp up from 50 to 100 users over 1 minute
    { duration: "1m", target: 500 }, // Stay at 100 users for 1 minute
    { duration: "30s", target: 0 }, // Ramp down to 0 users
  ],
  // Define thresholds for success. If these aren't met, the test will fail.
  thresholds: {
    http_req_failed: ["rate<0.01"], // Error rate should be less than 1%
    http_req_duration: ["p(95)<1000"], // 95% of requests should be below 1000ms (1 second)
  },
};

// --- The Virtual User (VU) Code ---
// This is the code that each of your 100 concurrent users will run on a loop.
export default function () {
  const BASE_URL = "https://clarityvue.com"; // IMPORTANT: Use your deployed production URL

  // 1. Visit the homepage
  const homeRes = http.get(BASE_URL);
  check(homeRes, { "homepage was 200": (r) => r.status === 200 });

  // 2. "Think" for a bit
  sleep(3);

  // 3. Visit a sample portfolio page
  const portfolioRes = http.get(
    `${BASE_URL}/u/akalmady/3a2f788e-237c-4dbd-8d2e-b70280897297`
  ); // Change to a real public user on your site
  check(portfolioRes, { "portfolio page was 200": (r) => r.status === 200 });

  sleep(5);
}
