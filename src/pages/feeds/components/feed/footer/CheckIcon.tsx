import { motion } from 'framer-motion';

const 원_길이 = Math.ceil(2 * Math.PI * 35);

const 원_애니메이션_시간 = 0.7;
const 원_애니메이션 = {
  ease: 'easeOut',
  duration: 원_애니메이션_시간,
};

const 체크박스_길이 = 90;
const 체크박스_애니메이션 = {
  duration: 0.75,
  delay: 원_애니메이션_시간,
  ease: [0.5, 0, 0.4, 1],
};

export function CheckIcon() {
  return (
    <motion.svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.circle
        cx={40}
        cy={40}
        r={35}
        stroke="url(#paint0_linear)"
        strokeWidth={5}
        strokeDashoffset={0}
        strokeDasharray={원_길이}
        initial={{
          strokeDashoffset: 원_길이,
        }}
        animate={{
          strokeDashoffset: 0,
        }}
        transition={원_애니메이션}
        style={{
          transform: 'rotate3d(-1,1,0,180deg)',
          transformOrigin: 'center',
        }}
      />
      <motion.path
        d="M23 41L36.125 54L58 28"
        strokeWidth={5}
        stroke="url(#paint1_linear)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={체크박스_길이}
        initial={{
          strokeDashoffset: 체크박스_길이,
        }}
        animate={{
          strokeDashoffset: 0,
        }}
        transition={체크박스_애니메이션}
      />
      <defs>
        <linearGradient
          id="paint0_linear"
          x1="40"
          y1="0"
          x2="40"
          y2="80"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0236DC" />
          <stop offset="1" stopColor="#02EB2E" />
        </linearGradient>
        <linearGradient
          id="paint1_linear"
          x1="41"
          y1="24"
          x2="40.9268"
          y2="56.2458"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0236DC" />
          <stop offset="1" stopColor="#02EB2E" />
        </linearGradient>
      </defs>
    </motion.svg>
  );
}
