import type {Config} from 'tailwindcss';
export default {content:['./app/**/*.{ts,tsx}','./components/**/*.{ts,tsx}'],theme:{extend:{colors:{ink:'#0F1218',accent:'#2B4BF2'},fontFamily:{sans:['var(--font-sans)','system-ui','sans-serif']}}},plugins:[]} satisfies Config;
