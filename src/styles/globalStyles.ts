import { css } from "@emotion/react";

export const globalStyles = css`
    :root {
        /* 컬러 */
        --point : #EB9191;
        --primary : #F8F9FA;
        --border : #d9d9d9;
        /* 타입 */
        --water : #2992ff;
        --grass : #66a945;
        --poision: #735198;
        --normal : #949495;
        --fighter : #e09c40;
        --fly : #a2c3e7;
        --electronic : #fbb917;
        --esper : #dd6b7b;
        --ground : #9c7743;
        --ice : #6dc83b;
        --rock : #bfb889;
        --dragon : #535ca8;
        --bug : #9fa244;
        --shadow : #4c4948;
        --ghosst : #684870;
        --pairy : #dab4d4;
        --iron : #69a9c7;
        --fire : #e56c3e;
        --stela : #ffffff;
        /* 폰트 사이즈 */
        @media screen and (max-width: 600) {
            --fontLarge : 16px;
            --fontMedium : 14px; 
        }
    }
  `;