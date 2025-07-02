const cds = require('@sap/cds');

// 커스텀 엔드포인트 설정
cds.on('bootstrap', (app) => {
    // 홈페이지
    app.get('/', (req, res) => {
        res.send(`
            <html>
                <head>
                    <title>CAP Service - Test 0701</title>
                    <style>
                        body { font-family: Arial, sans-serif; margin: 40px; }
                        h1 { color: #0070f3; }
                        ul { line-height: 1.6; }
                        a { color: #0070f3; text-decoration: none; }
                        a:hover { text-decoration: underline; }
                    </style>
                </head>
                <body>
                    <h1>CAP Service is running successfully!</h1>
                    <p>Available endpoints:</p>
                    <ul>
                        <li><a href="/odata/v4/catalog"> Catalog Service (OData V4)</a></li>
                        <li><a href="/health"> Health Check</a></li>
                        <li><a href="/project1"> Project1 App</a></li>
                    </ul>
                    <p><em>Service Status: ✅ Active</em></p>
                </body>
            </html>
        `);
    });

    // 헬스체크
    app.get('/health', (req, res) => {
        res.json({
            status: 'OK',
            timestamp: new Date().toISOString(),
            service: 'CAP Interaction Service',
            version: '1.0.0',
            environment: process.env.NODE_ENV || 'development'
        });
    });
});

// 기본 CAP 서버 시작
module.exports = cds.server; 