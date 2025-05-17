import { css } from "@emotion/react";

export const globalStyles = css`
  :root {
    /* 컬러 */
    /* --point: #eb9191; */
    --point: grey;
    --primary: #f8f9fa;
    --border: #d9d9d9;
    /* 타입 */
    --type1: #949495; /* normal */
    --type2: #e09c40; /* fighting */
    --type3: #a2c3e7; /* flying */
    --type4: #735198; /* poison */
    --type5: #9c7743; /* ground */
    --type6: #bfb889; /* rock */
    --type7: #9fa244; /* bug */
    --type8: #684870; /* ghost */
    --type9: #69a9c7; /* steel */
    --type10: #e56c3e; /* fire */
    --type11: #2992ff; /* water */
    --type12: #66a945; /* grass */
    --type13: #fbb917; /* electric */
    --type14: #dd6b7b; /* psychic */
    --type15: #42D8FF; /* ice */
    --type16: #535ca8; /* dragon */
    --type17: #4c4948; /* dark */
    --type18: #dab4d4; /* fairy */
    --type19: #ffffff; /* unknown */
    --type20: #4c4948; /* shadow */

    /* 폰트 사이즈 */
    @media screen and (max-width: 600) {
      --fontLarge: 16px;
      --fontMedium: 14px;
    }
  }
`;
