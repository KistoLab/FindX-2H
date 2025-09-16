export declare const config: {
    livekit: {
        apiKey: string;
        apiSecret: string;
        wsUrl: string;
        httpUrl: string;
    };
    server: {
        port: number;
        nodeEnv: string;
        corsOrigin: string;
    };
    database: {
        mongodbUri: string;
    };
    websocket: {
        port: number;
    };
};
export declare const validateConfig: () => void;
//# sourceMappingURL=environment.d.ts.map