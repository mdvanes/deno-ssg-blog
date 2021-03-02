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
            "hash": "65a47a1f142b1cf385a0d7a0f8444bb277a10eae",
            "asyncDeps": [
                {
                    "url": "/style/index.css",
                    "hash": "03b4fa715bfecf59e4e5ec8deb9f721217b8ffb0",
                    "isDynamic": true,
                    "isStyle": true
                }
            ]
        }
    ],
    "renderMode": "ssr"
});
