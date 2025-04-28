import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';

export default {
  input: 'src/index.ts', // o tu entrada principal
  output: [
    {
      file: 'dist/niubiz.umd.js',
      format: 'umd',
      name: 'Niubiz', // Esto es el nombre de la variable global que tendrás en window.Niubiz
      sourcemap: true,
    },
    {
      file: 'dist/niubiz.esm.js',
      format: 'esm',
      sourcemap: true,
    }
  ],
  plugins: [
    resolve(),
    typescript({ tsconfig: './tsconfig.json' })
  ]
}