import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = {
    width: 1200,
    height: 630,
};
export const contentType = 'image/png';

export default async function OGImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(to bottom right, #000000, #333333)',
                    color: 'white',
                    fontFamily: 'sans-serif',
                    textAlign: 'center',
                    padding: '40px',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '40px',
                    }}
                >
                    <img
                        src="https://alterego-repos.vercel.app/web-app-manifest-512x512.png"
                        width={120}
                        height={120}
                        alt="AlterEgo Logo"
                        style={{ marginRight: '20px' }}
                    />
                    <h1 style={{ fontSize: '60px', fontWeight: 'bold' }}>AlterEgo</h1>
                </div>
                <h2 style={{ fontSize: '36px', fontWeight: 'normal', maxWidth: '80%', marginBottom: '40px' }}>
                    Find alternative projects for your favorite GitHub repositories
                </h2>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: '20px',
                        fontSize: '24px',
                    }}
                >
                    <p>Discover • Compare • Choose</p>
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
} 