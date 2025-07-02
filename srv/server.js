const cds = require('@sap/cds');

// 서버 시작 전 설정
cds.on('bootstrap', (app) => {
    // 기본 라우트 핸들러
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
                        <li><a href="/odata/v4/catalog">📊 Catalog Service (OData V4)</a></li>
                        <li><a href="/health">❤️ Health Check</a></li>
                        <li><a href="/project1">📱 Project1 App</a></li>
                    </ul>
                    <p><em>Service Status: ✅ Active</em></p>
                </body>
            </html>
        `);
    });

    // 헬스체크 엔드포인트
    app.get('/health', (req, res) => {
        res.json({
            status: 'OK',
            timestamp: new Date().toISOString(),
            service: 'CAP Interaction Service',
            version: '1.0.0',
            environment: process.env.NODE_ENV || 'development'
        });
    });

    // 404 에러 처리
    app.use((req, res, next) => {
        if (!res.headersSent) {
            res.status(404).json({
                error: 'Not Found',
                message: `Path ${req.path} not found`,
                availableEndpoints: [
                    '/odata/v4/catalog',
                    '/health',
                    '/project1'
                ]
            });
        }
    });
});

module.exports = cds.server; 