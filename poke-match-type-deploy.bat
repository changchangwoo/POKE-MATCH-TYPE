@echo off
chcp 65001 > nul
cd /d %~dp0

@REM echo ▶ React 앱 빌드 중... 무슨 이유로 빌드시 배치 종료. 빌드 후 배치 돌릴필요 있음
@REM npm run build || goto ERROR

echo ▶ S3에 업로드 중...
aws s3 sync dist/ s3://poke-match-type --delete || goto ERROR

echo ▶ CloudFront 캐시 무효화 중...
aws cloudfront create-invalidation --distribution-id E3EXB4QV6QQ6Y0 --paths "/*" || goto ERROR

echo ✅ 배포 완료!
pause
exit

:ERROR
echo ❌ 오류 발생! 배포 실패
pause
exit /b 1
