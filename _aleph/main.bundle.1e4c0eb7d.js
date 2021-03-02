var bootstrap = __ALEPH.pack["https://deno.land/x/aleph@v0.3.0-alpha.1/framework/react/bootstrap.ts"].default;
bootstrap({
    "baseUrl": "/",
    "defaultLocale": "en",
    "locales": [],
    "routes": [
        {
            "path": "/publications",
            "module": {
                "url": "/pages/publications.tsx",
                "hash": "ed5d18bc9d34a5de2ef5f5f539c3dcc20996d528",
                "asyncDeps": [
                    {
                        "url": "#useDeno-60Sh4cbIqM0B2aiJaHLqIafa4mw",
                        "hash": "60Sh4cbIqM0B2aiJaHLqIafa4mw",
                        "isData": true
                    },
                    {
                        "url": "#useDeno-nR7Nlwnd0i2d4AdRkDvHfeY7UY",
                        "hash": "nR7Nlwnd0i2d4AdRkDvHfeY7UY",
                        "isData": true
                    }
                ]
            }
        },
        {
            "path": "/",
            "module": {
                "url": "/pages/index.tsx",
                "hash": "1ce88fc55a1c59b9792d18561dc6d95ae7655155",
                "asyncDeps": [
                    {
                        "url": "#useDeno-6G3UgSqfHlVo85M60IRbxdFdQao",
                        "hash": "6G3UgSqfHlVo85M60IRbxdFdQao",
                        "isData": true
                    },
                    {
                        "url": "#useDeno-60Sh4cbIqM0B2aiJaHLqIafa4mw",
                        "hash": "60Sh4cbIqM0B2aiJaHLqIafa4mw",
                        "isData": true
                    },
                    {
                        "url": "#useDeno-nR7Nlwnd0i2d4AdRkDvHfeY7UY",
                        "hash": "nR7Nlwnd0i2d4AdRkDvHfeY7UY",
                        "isData": true
                    }
                ]
            }
        }
    ],
    "sharedModules": [
        {
            "url": "/app.tsx",
            "hash": "950b6f7e1f405e0edb877ed474a2ad07ef8ad042",
            "asyncDeps": [
                {
                    "url": "/style/index.css",
                    "hash": "24b456af67e963b34d6448b7c6ca22941980ddd4",
                    "isDynamic": true,
                    "isStyle": true
                }
            ]
        }
    ],
    "renderMode": "ssr"
});
