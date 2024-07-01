import { ImageResponse } from 'next/og';
import FavIcon from '@/assets/svg/Icon/Award';

export const runtime = 'edge';
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          background: 'black',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          borderRadius: '100%',
        }}
      >
        <FavIcon />
      </div>
    ),
    {
      ...size,
    }
  );
}
