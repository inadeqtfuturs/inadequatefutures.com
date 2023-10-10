import React, { useEffect, useRef, useState } from 'react';
import canvasSketch from 'canvas-sketch'; 
import Random from 'canvas-sketch-util/random';
import { styled, keyframes } from '@stitches';

Random.setSeed(Random.getRandomSeed());

const settings = {
  pixelsPerInch: 300,
  suffix: Random.getSeed(),
  styleCanvas: false,
  scaleToView: true,
  dimensions: [4,4],
  units: 'in',
  orientation: 'landscape'
};

const sketch = ({ width, height }) => {
  const sliceCount = 30000;
  const slices = Array.from(new Array(sliceCount)).map((_, i, list) => {
    const t = i / Math.max(1, sliceCount - 1);

    const t2 = list.length <= 1 ? 0 : i / (list.length - 1);

    const noiseAngle = t2 * Math.PI * 2;
    const nx = Math.cos(noiseAngle);
    const ny = Math.sin(noiseAngle);

    const nf = 0.05 + Random.range(0, 0.5);
    const noise = Random.noise2D(nx * nf, ny * nf);
    const noise01 = noise * 0.75 + 0.5;

    // plot x/y coordinates along a circular path
    const r = 1.5;
    const angle = Math.PI * 2 * t;
    const x = width / 2 + Math.cos(angle) * r;
    const y = height / 2 + Math.sin(angle) * r;
    return {
      alpha: Math.abs(Random.range(0, 0.75) * (1 - noise01)),
      color: 'black',
      lineWidth: Random.range(0.005, 0.02) * 0.1,
      length: Random.gaussian() * noise01,
      angle: Random.gaussian(0, 1),
      x,
      y
    };
  });

  return ({ context }) => {
    /* context.globalCompositeOperation = 'source-over'; */

    context.fillStyle = 'transparent';
    context.fillRect(0, 0, width, height);

    slices.forEach(slice => {
      context.save();
      context.beginPath();
      context.translate(slice.x, slice.y);
      context.rotate(slice.angle);
      context.lineTo(slice.length / 2, 0);
      context.lineTo(-slice.length / 2, 0);
      context.lineWidth = slice.lineWidth;
      context.strokeStyle = slice.color;
      context.globalAlpha = slice.alpha;
      context.stroke();
      context.restore();
    });
    const v = width / 2;

    const gradient = context.createRadialGradient(v, v, 0, v, v, v);
    gradient.addColorStop(0,'rgba(249, 250, 251, 0)');
    gradient.addColorStop(0.9,'rgba(249, 250, 251, 0)');
    gradient.addColorStop(1,'#F9FAFB');
    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);

  };
};

const rotate = keyframes({
  '100%': { transform: 'rotate(360deg)' },
});

const CanvasWrapper = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  aspectRatio: '1 / 1',
  width: '100%',
  'canvas': {
    animation: `${rotate} 360s infinite linear`
  },

  '&.loading': {
    opacity: 0
  },

  '&.loaded': {
    opacity: 1,
    transition: 'opacity 1s'
  }
});


function Canvas() {
  const [loaded, setLoaded] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    canvasSketch(sketch, {
      ...settings,
      canvas: canvasRef.current
    }, [canvasRef]).then(() => {
      setLoaded(true);
    });
  }, []);

  return (
    <CanvasWrapper className={loaded ? 'loaded' : 'loading'}>
      <canvas className="canvas" ref={canvasRef} style={{ maxWidth: '100%', height: '100%'}} />
    </CanvasWrapper>

  ); 
}

export default Canvas;
