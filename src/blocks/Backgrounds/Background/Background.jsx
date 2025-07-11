import { useRef, useEffect } from "react";

const Background = ({
  hue = 294,
  xOffset = 0,
  speed = 1,
  intensity = 2,
  size = 1.5,
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resolutionScale = 0.5;

    const resizeCanvas = () => {
      canvas.width = canvas.clientWidth * resolutionScale;
      canvas.height = canvas.clientHeight * resolutionScale;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const gl = canvas.getContext("webgl", { powerPreference: "low-power" });
    if (!gl) {
      console.error("WebGL not supported");
      return;
    }


    const vertexShaderSource = `
      attribute vec2 aPosition;
      void main() {
        gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `;

    const fragmentShaderSource = `
      precision mediump float;
      uniform vec2 iResolution;
      uniform float iTime;
      uniform float uHue;
      uniform float uXOffset;
      uniform float uSpeed;
      uniform float uIntensity;
      uniform float uSize;

      #define OCTAVE_COUNT 6

      vec3 hsv2rgb(vec3 c) {
          vec3 rgb = clamp(abs(mod(c.x * 6.0 + vec3(0.0,4.0,2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
          return c.z * mix(vec3(1.0), rgb, c.y);
      }

      float hash12(vec2 p) {
          vec3 p3 = fract(vec3(p.xyx) * 0.1031);
          p3 += dot(p3, p3.yzx + 33.33);
          return fract((p3.x + p3.y) * p3.z);
      }

      mat2 rotate2d(float angle) {
          float c = cos(angle);
          float s = sin(angle);
          return mat2(c, -s, s, c);
      }

      float noise(vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          float a = hash12(i);
          float b = hash12(i + vec2(1.0, 0.0));
          float c = hash12(i + vec2(0.0, 1.0));
          float d = hash12(i + vec2(1.0, 1.0));
          vec2 u = f * f * (3.0 - 2.0 * f);
          return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
      }

      float fbm(vec2 p) {
          float value = 0.0;
          float amp = 0.5;
          for (int i = 0; i < OCTAVE_COUNT; i++) {
              value += amp * noise(p);
              p *= rotate2d(0.5);
              p *= 2.0;
              amp *= 0.5;
          }
          return value;
      }

      void mainImage(out vec4 fragColor, in vec2 fragCoord) {
          vec2 uv = fragCoord / iResolution.xy;
          uv = 2.0 * uv - 1.0;
          uv.x *= iResolution.x / iResolution.y;
          uv.x += uXOffset;

          float noiseOffset = fbm(uv * uSize + iTime * uSpeed);
          uv += 1.5 * (noiseOffset - 0.5);

          float dist = abs(uv.x);
          float animatedHue = mod(uHue + sin(iTime * 0.5) * 20.0, 360.0);
          vec3 baseColor = hsv2rgb(vec3(animatedHue / 360.0, 0.6, 0.9));

          float glow = pow(0.04 / (dist + 0.01), 1.4);
          vec3 col = baseColor * glow * uIntensity;
          col = pow(col, vec3(0.9));
          fragColor = vec4(col, 1.0);
      }

      void main() {
          vec4 color;
          mainImage(color, gl_FragCoord.xy);
          gl_FragColor = color;
      }
    `;


    const compileShader = (source, type) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER);
    const fragmentShader = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program); 


    const vertices = new Float32Array([
      -1, -1, 1, -1, -1, 1,
      -1, 1, 1, -1, 1, 1,
    ]);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const aPos = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);


    const resLoc = gl.getUniformLocation(program, "iResolution");
    const timeLoc = gl.getUniformLocation(program, "iTime");
    const hueLoc = gl.getUniformLocation(program, "uHue");
    const xOffLoc = gl.getUniformLocation(program, "uXOffset");
    const speedLoc = gl.getUniformLocation(program, "uSpeed");
    const intensityLoc = gl.getUniformLocation(program, "uIntensity");
    const sizeLoc = gl.getUniformLocation(program, "uSize");

    const start = performance.now();
    let lastTime = 0;
    const fpsCap = 45;
    const frameInterval = 1000 / fpsCap;

    const render = () => {
      const now = performance.now();
      const delta = now - lastTime;
      if (delta < frameInterval) {
        requestAnimationFrame(render);
        return;
      }
      lastTime = now;

      resizeCanvas();
      gl.viewport(0, 0, canvas.width, canvas.height);

      gl.uniform2f(resLoc, canvas.width, canvas.height);
      gl.uniform1f(timeLoc, (now - start) / 1000);
      gl.uniform1f(hueLoc, hue);
      gl.uniform1f(xOffLoc, xOffset);
      gl.uniform1f(speedLoc, speed);
      gl.uniform1f(intensityLoc, intensity);
      gl.uniform1f(sizeLoc, size);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      requestAnimationFrame(render);
    };

    requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [hue, xOffset, speed, intensity, size]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full absolute top-0 left-0"
      style={{ imageRendering: "pixelated" }}
    />
  );
};

export default Background;
